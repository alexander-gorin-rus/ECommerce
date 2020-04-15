const express = require('express');
const router = express.Router();
const adminAuth = require('../../middleware/adminAuth');
const { check, validationResult } = require('express-validator');
const CompanyName = require('../../models/companyName');

router.post(
  '/create-name',
  [
    check('name', 'Необходимо ввести название компании')
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
            msg: 'Ошибка при создании названия компании'
          }
        ]
      });
    }

    const { name } = req.body;

    try {
      compName = new CompanyName({
        name
      });
      await compName.save();
      res.json(compName);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

router.get('/get-company-names', async (req, res) => {
  try {
    const compName = await CompanyName.find();
    res.status(200).json(compName);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.get('/get-company-name/:id', async (req, res) => {
  try {
    const compName = await CompanyName.findById(req.params.id);
    res.status(200).json(compName);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.delete('/delete-company-name/:id', adminAuth, async (req, res) => {
  try {
    const compName = await CompanyName.findById(req.params.id);
    await compName.remove();
    res.status(200).json({
      message: 'Название компании успешно удалено'
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
