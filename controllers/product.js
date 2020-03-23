const formidable = require('formidable');
const fs = require('fs');
const _ = require('lodash');
const { errorHandler } = require('../utils/dbErrorHadler');
const Product = require('../models/product');

exports.productById = (req, res, next, id) => {
  Product.findById(id).exec((err, product) => {
    if (err || !product) {
      return res.status(400).json({
        error: 'Продукт не найден'
      });
    }
    req.product = product;
    next();
  });
};

exports.create = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: 'Изображение не может быть загружено'
      });
    }

    //check all fields
    const { name, description, volume, price, quantity } = fields;
    if (!name || !description || !volume || !price || !quantity) {
      return res.status(500).json({
        error: 'Все поля должны быть заполнены'
      });
    }

    let product = new Product(fields);

    if (files.photo) {
      //file size restriction
      const fileSize = 1000000;
      if (files.photo.size > fileSize) {
        return res.status(500).json({
          error: 'размер файла с изображением не должен превышать 1 МБ'
        });
      }

      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }
    product.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(error)
        });
      }
      res.json(result);
    });
  });
};

exports.getSingle = (req, res, id) => {
  req.product.photo = undefined;
  return res.json(req.product);
};

exports.list = async (req, res) => {
  /**
   * sell / arrival
   * by sell = /products?sortBy=sold&order=desc&limit=4
   * by arrival = /products?sortBy=createdAt&order=desc&limit=4
   * by price = /products?sortBy=price&order=desc
   * if no params are sent, then all products are returned
   */
  let order = req.query.order ? req.query.order : 'asc';
  let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
  let price = req.query.price ? req.query.price : '';
  let limit = req.query.limit ? parseInt(req.query.limit) : 6;

  Product.find()
    .select('-photo')
    .populate('category')
    .sort([[sortBy, order, price]])
    .limit(limit)
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({
          error: 'Товар не найден'
        });
      }
      res.json(products);
    });
};

/**
 * it will find the product based on product category
 * products in the same category will be returned
 */
exports.listRelated = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 6;
  Product.find({ _id: { $ne: req.product }, category: req.product.category })
    .limit(limit)
    .populate('category', '_id name')
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({
          error: 'Товар не найден'
        });
      }
      res.json(products);
    });
};

exports.listCategories = (req, res) => {
  Product.distinct('category', {}, (err, categories) => {
    if (err) {
      return res.status(400).json({
        error: 'Такая категория товаров не найдена'
      });
    }
    res.json(categories);
  });
};

exports.listBySearch = (req, res) => {
  /**
   * list products by search
   * we will implement product search in react frontend
   * we will show categories in checkbox and price range in radio buttons
   * as the user clicks on those checkbox and radio buttons
   * we will make api request and show the products to users based on what he wants
   */
  let order = req.body.order ? req.body.order : 'desc';
  let sortBy = req.body.sortBy ? req.body.sortBy : '_id';
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = parseInt(req.body.skip);
  let findArgs = {};

  // console.log(order, sortBy, limit, skip, req.body.filters);
  // console.log("findArgs", findArgs);

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === 'price') {
        // gte -  greater than price [0-10]
        // lte - less than
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1]
        };
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }

  Product.find(findArgs)
    .select('-photo')
    .populate('category')
    .sort([[sortBy, order]])
    .skip(skip)
    .limit(limit)
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: 'Товар не найден'
        });
      }
      res.json({
        size: data.length,
        data
      });
    });
};

exports.getPhoto = (req, res, next) => {
  if (req.product.photo.data) {
    res.set('Content-Type', req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();
};

exports.update = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: 'Изображение не может быть загружено'
      });
    }

    //check all fields
    const {
      name,
      description,
      volume,
      price,
      quantity,
      category,
      shipping
    } = fields;
    if (
      !name ||
      !description ||
      !volume ||
      !price ||
      !category ||
      !quantity ||
      !shipping
    ) {
      return res.status(500).json({
        error: 'Все поля должны быть заполнены'
      });
    }
    //end

    let product = req.product;
    product = _.extend(product, fields);

    if (files.photo) {
      //file size restriction
      const fileSize = 1000000;
      if (files.photo.size > fileSize) {
        return res.status(500).json({
          error: 'размер файла с изображением не должен превышать 1 МБ'
        });
      }
      //end

      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }
    product.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(error)
        });
      }
      res.json(result);
    });
  });
};

exports.remove = (req, res) => {
  let product = req.product;
  product.remove(err => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(error)
      });
    }
    res.json({
      message: 'Товар удален'
    });
  });
};
