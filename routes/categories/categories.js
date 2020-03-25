const express = require('express');
const router = express.Router();
const Category = require('../../models/category');
const adminAuth = require('../../middleware/adminAuth');
const { check, validationResult } = require('express-validator');

router.post(
  '/create-category',
  [
    check('name', 'Необходимо ввести название категории')
      .not()
      .isEmpty()
  ],
  adminAuth,
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({
        errors: [
          {
            msg: 'Ошибка при создании категории'
          }
        ]
      });
    }

    const { name } = req.body;

    try {
      let category = await Category.findOne({ name });
      if (category) {
        return res.status(400).json({
          errors: [
            {
              msg:
                'Такая категория уже создана, дублирование категорий не допускается'
            }
          ]
        });
      }

      category = new Category({
        name
      });
      await category.save();
      res.json(category);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

router.get('/categories', async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.get('/get-category/:id', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    res.status(200).json(category);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.put('/update-category/:id', adminAuth, async (req, res) => {
  try {
    await Category.findByIdAndUpdate(
      { _id: req.params.id },
      {
        name: req.body.name
      },
      (err, category) => {
        if (err || !category) {
          return res.status(400).json({
            error: 'Не удалось внести изменения в название категории'
          });
        } else {
          res.status(200).json({
            message: 'Название категории успешно изменено',
            data: category
          });
        }
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.delete('/delete-category/:id', adminAuth, async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    await category.remove();
    res.status(200).json({
      message: 'Категория товаров удалена успешно'
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
