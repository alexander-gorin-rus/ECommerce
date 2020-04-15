const express = require('express');
const router = express.Router();
const adminAuth = require('../../middleware/adminAuth');
const formidable = require('formidable');
const fs = require('fs');
const _ = require('lodash');
const FrontPage = require('../../models/frontPage');

router.post('/create-fron-page', adminAuth, (req, res) => {
  try {
    const frontPageImage = new formidable.IncomingForm();
    frontPageImage.keepExtensions = true;
    frontPageImage.parse(req, (err, fields, files) => {
      if (err) {
        return res.status(500).json({
          message: 'Изображение не может быть заргужено'
        });
      }
      let frontImage = new FrontPage(fields);
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
        frontImage.photo = fs.readFileSync(files.photo.path);
        frontImage.photo.contentType = files.photo.type;
      }
      frontImage.save((err, frontImage) => {
        if (err) {
          return res.status(500).json({
            error: [
              {
                message: 'Фото не было загружено'
              }
            ]
          });
        }
        res.json(frontImage);
      });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
