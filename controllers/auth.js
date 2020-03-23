const Admin = require('../models/admin');
const { errorHandler } = require('../utils/dbErrorHadler');
const jwt = require('jsonwebtoken'); //to generate signed token
const expressJwt = require('express-jwt'); //for authorization check

// exports.signup = (req, res) => {
//   const user = new User(req.body);
//   user.save((err, user) => {
//     if (err) {
//       return res.status(500).json({
//         err: errorHandler(err)
//       });
//     }
//     res.json({ user });
//   });
// };

// exports.signin = (req, res, next) => {
//   //find a user by email
//   const { email, password } = req.body;

//   User.findOne({ email }, (err, user) => {
//     if (err || !user) {
//       return res.status(400).json({
//         err:
//           'Пользователь с таким email не найден, пожалуйста зарегистрируйтесь'
//       });
//     }

//     //if user exists make shure that password and email matches

//     //create autentication method in user model
//     if (!user.authenticate(password)) {
//       return res.status(401).json({
//         error: 'Email и пароль не совпадают'
//       });
//     }

//     //generate a signed token with user id and secret
//     const token = jwt.sign({ _id: user._id }, process.env.JwtSecret);

//     //persist the token as 't' in cookie with expiry date
//     res.cookie('t', token, { expire: new Date() + 999 });

//     //return response with user and token to frontend
//     const { _id, name, email, role } = user;
//     return res.json({ token, user: { _id, name, email, role } });
//   });
// };

// exports.signout = (req, res) => {
//   res.clearCookie('t');
//   res.json({
//     message: 'Выход произведен успешно'
//   });
// };

exports.userProtectedRoute = expressJwt({
  secret: process.env.JwtSecret,
  userProperty: 'auth'
});

exports.isAuth = (req, res, next) => {
  let admin = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!admin) {
    res.status(403).json({
      error: 'Вход невозможен'
    });
  }
  next();
};

exports.admin = (req, res, next, id) => {
  const admin = Admin.findById(id).exec((err, admin) => {
    if (err || !admin) {
      return res.status(400).json({ error: 'Такой пользователь не найден' });
    }
    req.profile = admin;
    next();
  });
};

// exports.isAdmin = (req, res, next) => {
//   if (req.profile.role === 0) {
//     res.status(403).json({
//       error: 'Вход невозможен. Этот ресурс для администратора'
//     });
//   }
//   next();
// };
