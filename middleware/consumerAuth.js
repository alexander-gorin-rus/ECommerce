const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
  const consumer_token = req.header('consumer_token');

  if (!consumer_token) {
    res
      .status(401)
      .json({ msg: 'Цифровой ключ не верен, авторизация не возможна' });
  }

  try {
    const decoded = jwt.verify(consumer_token, config.get('jwtConsumerSecret'));
    req.consumer = decoded.consumer;
    next();
  } catch (err) {
    res.status(401).json({ mag: 'Цифровой ключ не действителен' });
  }
};
