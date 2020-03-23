const jwt = require('jsonwebtoken');
const config = require('config');
const Admin = require('../models/admin');

module.exports = function(req, res, next) {
  //Get Token from header
  const token = req.header('admin_token');

  //Check if not token
  if (!token) {
    return res
      .status(401)
      .json({ msg: 'Нет цифровой подписи, авторизация отклонена' });
  }

  //Verify token
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    req.admin = decoded.admin;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Цифровая подпись не верна' });
  }
};

// exports.admin = (req, res, next, id) => {
//   const admin = Admin.findById(id).exec((err, admin) => {
//     if (err || !admin) {
//       return res.status(400).json({ error: 'Админ не найден' });
//     }
//     req.profile = admin;
//     next();
//   });
// };
