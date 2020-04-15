const express = require('express');
const router = express.Router();
const Partner = require('../../models/partners');
const adminAuth = require('../../middleware/adminAuth');
const formidable = require('formidable');
const fs = require('fs');
const _ = require('lodash');

router.post('/create-partner', adminAuth, async (req, res) => {
  try {
    const partnerForm = await new formidable.IncomingForm();
    partnerForm.keepExtensions = true;
    partnerForm.parse(req, (err, fields, files) => {
      if (err) {
        return res.status(500).json({
          msg: 'Изображение не может быть загружено'
        });
      }

      let partner = new Partner(fields);
      if (files.photo) {
        if (files.photo.size > 1000000) {
          return res.status(500).json({
            errors: [
              {
                msg:
                  'Изображение не может быть загружено, так как превышает размер в 1 МБ'
              }
            ]
          });
        }
        partner.photo = fs.readFileSync(files.photo.path);
        partner.photo.contentType = files.photo.type;
      }
      partner.save((err, partner) => {
        if (err) {
          return res.status(500).json({
            errors: [{ msg: 'Ошибка: информация о партнере не была загружена' }]
          });
        }
        res.json(partner);
      });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.get('/get-partners', async (req, res) => {
  try {
    const partners = await Partner.find().select('-photo');
    res.status(200).json(partners);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

const partnerById = (req, res, next, id) => {
  Partner.findById(id).exec((err, partner) => {
    if (err || !partner) {
      return res.status(400).json({
        error: 'Такой партнер не найден'
      });
    }
    req.partner = partner;
    next();
  });
};

router.param('partnerById', partnerById);

router.delete('/delete-partner/:partnerById', adminAuth, async (req, res) => {
  try {
    let partner = req.partner;
    partner.remove();
    res.status(200).json({
      message: [{ msg: 'Партнер успешно удален' }]
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
