const express = require('express');
const router = express.Router();
const Consumer = require('../../models/consumer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const consumerAuth = require('../../middleware/consumerAuth');
const adminAuth = require('../../middleware/adminAuth');

router.post(
  '/register-consumer',
  [
    check('name', 'name is required')
      .not()
      .isEmpty(),
    check('email', 'email is required').isEmail(),
    check('password', 'password is required').isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      //see if the user exists
      let consumer = await Consumer.findOne({ email });
      if (consumer) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Клиент с таким email зарегистрирован' }] });
      }

      consumer = new Consumer({
        name,
        email,
        password
      });

      //encrypt password
      const salt = await bcrypt.genSalt(10);
      consumer.password = await bcrypt.hash(password, salt);
      await consumer.save();

      //return jsonwebtoken
      const payload = {
        consumer: {
          id: consumer.id
        }
      };

      jwt.sign(
        payload,
        config.get('jwtConsumerSecret'),
        { expiresIn: 360000 },
        (err, consumer_token) => {
          if (err) throw err;
          res.json({ consumer_token, consumer });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

router.post(
  '/auth-consumer',
  [
    check('email', 'Необходимо указать почту').isEmail(),
    check('password', 'Необходимо ввести пароль').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      //see if the user exists
      let consumer = await Consumer.findOne({ email });
      if (!consumer) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Введены неверные данные' }] });
      }

      const isMatch = await bcrypt.compare(password, consumer.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Введены неверные данные' }] });
      }

      //return jsonwebtoken
      const payload = {
        consumer: {
          id: consumer.id
        }
      };

      jwt.sign(
        payload,
        config.get('jwtConsumerSecret'),
        { expiresIn: 360000 },
        (err, consumer_token) => {
          if (err) throw err;
          res.json({ consumer_token, consumer });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

router.get('/get-consumer', consumerAuth, async (req, res) => {
  try {
    const consumer = await Consumer.findById(req.consumer.id).select(
      '-password'
    );
    res.json(consumer);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/get-consumers', adminAuth, async (req, res) => {
  try {
    const consumers = await Consumer.find().select('-password');
    res.json(consumers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// router.get('/get-consumers', adminAuth, async (req, res) => {
//   try {
//     const consumers = await Consumer.find();
//     res.status(200).json(consumers);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });

router.put('/update-consumer/:id', consumerAuth, async (req, res) => {
  try {
    await Consumer.findByIdAndUpdate(
      { _id: req.params.id },
      {
        name: req.body.name,
        email: req.body.email,
        address: req.body.address
      },
      (err, consumer) => {
        if (err) {
          res.status(400).json({
            error: 'Ошибка: не удалось изменить данные клиента'
          });
        } else {
          res.status(200).json({
            message: 'Изменения внесены успешно',
            data: consumer
          });
          consumer.save();
        }
      }
    ).select('-password');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.delete('/delete-consumer/:id', consumerAuth, async (req, res) => {
  try {
    const consumer = await Consumer.findByIdAndRemove({ _id: req.params.id });
    consumer.remove();
    res.status(200).json({
      message: 'Клиент удален успешно'
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
