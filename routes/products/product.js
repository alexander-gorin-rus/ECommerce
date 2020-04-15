const express = require('express');
const router = express.Router();
const formidable = require('formidable');
const fs = require('fs');
const _ = require('lodash');
const Product = require('../../models/product');
const adminAuth = require('../../middleware/adminAuth');
const multer = require('multer');

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== '.jpg' || ext !== '.png' || ext !== 'jpeg') {
      return cb(res.status(400).end('only jpg, png are allowed'), false);
    }
    cb(null, true);
  }
});

var upload = multer({ storage: storage }).single('file');

router.post('/products/uploadImage', (req, res) => {
  upload(req, res, err => {
    if (err) {
      return res.json({ success: false, err });
    }
    return res.json({
      success: true,
      image: res.req.file.path,
      fileName: res.req.file.filename
    });
  });
});

router.post('/products/create-product', adminAuth, (req, res) => {
  //save all the data we got from the client into the DB
  const product = new Product(req.body);

  product.save(err => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

// router.post('/create-product', adminAuth, async (req, res) => {
//   try {
//     let form = await new formidable.IncomingForm();
//     form.keepExtensions = true;
//     form.parse(req, (err, fields, files) => {
//       if (err) {
//         return res.status(400).json({
//           message: 'Изображение не может быть загружено'
//         });
//       }

//       const {
//         name,
//         description,
//         volume,
//         price,
//         photo,
//         quantity,
//         category
//       } = fields;

//       if (
//         !name ||
//         !description ||
//         !volume ||
//         !price ||
//         !category ||
//         !quantity
//       ) {
//         return res.status(500).json({
//           errors: [
//             {
//               msg: 'Все поля должны быть заполнены'
//             }
//           ]
//         });
//       }

//       let product = new Product(fields);

//       if (files.photo) {
//         const fileSize = 1000000;
//         if (files.photo.size > fileSize) {
//           return res.status(500).json({
//             errors: [
//               {
//                 msg:
//                   'Изображение не может быть загружено, так как превышает лимитированный размер в 1 МБ'
//               }
//             ]
//           });
//         }
//         product.photo = fs.readFileSync(files.photo.path);
//         product.photo.contentType = files.photo.type;
//       }
//       product.save((err, product) => {
//         if (err) {
//           return res.status(500).json({
//             errors: [
//               { msg: 'Произошла ошибка при внесении продукта в базу данных' }
//             ]
//           });
//         }
//         res.json(product);
//       });
//     });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// });

router.get('/get-product/:id', async (req, res) => {
  try {
    await Product.find()
      .select('-photo')
      .populate('category')
      .exec((err, product) => {
        if (err) {
          return res.status(400).json({
            errors: [{ msg: 'Такой товар не найден' }]
          });
        }
        res.json(product);
      });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.get('/products/getProducts', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ products });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.post('/products/getProducts', (req, res) => {
  Product.find().exec((err, products) => {
    if (err) {
      return res.status(400).json({
        success: false
      });
    } else {
      res.status(200).json({
        success: true,
        products
      });
    }
  });
});

// router.get('/get-products', async (req, res) => {
//   try {
//     const products = await Product.find().select('-photo');
//     res.status(200).json(products);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// });

router.put('/update-product/:productId', adminAuth, async (req, res) => {
  try {
    let form = await new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
      if (err) {
        return res.status(400).json({
          errors: [{ msg: 'Изображение не может быть загружено' }]
        });
      }
      //check all fields
      const {
        name,
        description,
        volume,
        price,
        photo,
        quantity,
        category
      } = fields;

      if (
        !name ||
        !description ||
        !volume ||
        !price ||
        !category ||
        !quantity
      ) {
        return res.status(500).json({
          errors: [{ msg: 'Все поля должны быть заполнены' }]
        });
      }

      let product = req.product;
      product = _.extend(product, fields);

      if (files.photo) {
        const fileSize = 1000000;
        if (files.photo.size > fileSize) {
          return res.status(500).json({
            errors: [
              {
                msg:
                  'Изображение не может быть загружено, так как превышает лимитированный размер в 1 МБ'
              }
            ]
          });
        }
        product.photo = fs.readFileSync(files.photo.path);
        product.photo.contentType = files.photo.type;
      }
      product.save((err, result) => {
        if (err) {
          return res.status(500).json({
            errors: [{ msg: 'Произошла ошибка при загрузке изображения' }]
          });
        }
        res.json(result);
      });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

const productById = (req, res, next, id) => {
  Product.findById(id).exec((err, product) => {
    if (err || !product) {
      return res.status(400).json({
        error: 'Такой продукт не найден'
      });
    }
    req.product = product;
    next();
  });
};

router.param('productId', productById);

router.delete('/delete-product/:productId', adminAuth, async (req, res) => {
  try {
    let product = req.product;
    product.remove();
    res.status(200).json({
      message: [{ msg: 'Товар успешно удален' }]
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
