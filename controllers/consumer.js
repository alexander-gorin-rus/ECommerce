const Consumer = require('../models/consumer');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

exports.signupConsumer = (req, res) => {
  const consumer = new Consumer(req.body);
  consumer.save((err, consumer) => {
    if (err) {
      return res.status(500).json({
        err: 'Ошибка: не удалось зарегистрировать клиента'
      });
    }
    res.json({ consumer });
  });
};

exports.signin = (req, res) => {
  //find a consumer by email
  const { email, password } = req.body;

  Consumer.findOne({ email }, (err, consumer) => {
    if (err || !consumer) {
      return res.status(400).json({
        err: 'Клиент с таким email не найден, пожалуйста зарегистрируйтесь'
      });
    }

    //if consumer exists make shure that password and email matches

    //create autentication method in user model
    if (!consumer.authenticate(password)) {
      return res.status(401).json({
        error: 'Email и пароль не совпадают'
      });
    }

    //generate a signed token with user id and secret
    const token = jwt.sign({ _id: consumer._id }, process.env.CONSUMER_SECRET);

    //persist the token as 't' in cookie with expiry date
    res.cookie('c', token, { expire: new Date() + 999 });

    //return response with user and token to frontend
    const { _id, name, email } = consumer;
    return res.json({ token, consumer: { _id, name, email } });
  });
};
