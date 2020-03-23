const Admin = require('../models/admin');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

exports.signupAdmin = (req, res) => {
  const admin = new Admin(req.body);
  admin.save((err, admin) => {
    if (err) {
      return res.status(500).json({
        err: 'Админ не зарегистрирован'
      });
    }
    res.json({ admin });
  });
};

exports.signin = (req, res) => {
  //find a user by email
  const { email, password } = req.body;

  Admin.findOne({ email }, (err, admin) => {
    if (err || !admin) {
      return res.status(400).json({
        err: 'Админ с таким email не найден, пожалуйста зарегистрируйтесь'
      });
    }

    //if user exists make shure that password and email matches

    //create autentication method in user model
    if (!admin.authenticate(password)) {
      return res.status(401).json({
        error: 'Email и пароль не совпадают'
      });
    }

    //generate a signed token with user id and secret
    const token = jwt.sign({ _id: admin._id }, process.env.JwtSecret);

    //persist the token as 't' in cookie with expiry date
    res.cookie('t', token, { expire: new Date() + 999 });

    //return response with user and token to frontend
    const { _id, name, email } = admin;
    return res.json({ token, admin: { _id, name, email } });
  });
};

exports.adminById = (req, res, next, id) => {
  const admin = Admin.findById(id).exec((err, admin) => {
    if (err || !admin) {
      return res.status(400).json({ error: 'Такой пользователь не найден' });
    }
    req.profile = admin;
    next();
  });
};
