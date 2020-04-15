const express = require('express');
const router = express.Router();
const adminAuth = require('../../middleware/adminAuth');
const { check, validationResult } = require('express-validator');
const Text = require('../../models/text');

router.post(
  '/create-text',
  [
    check('text', 'Необходимо ввести текст')
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
            msg: 'Ошибка при создании текста'
          }
        ]
      });
    }

    let { text } = req.body;

    try {
      text = new Text({
        text
      });
      await text.save();
      res.json(text);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

router.get('/texts', async (req, res) => {
  try {
    const text = await Text.find();
    res.status(200).json(text);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.delete('/delete-text/:id', adminAuth, async (req, res) => {
  try {
    const text = await Text.findById(req.params.id);
    await text.remove();
    res.status(200).json({
      message: 'Текст о компании успешно удален'
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
