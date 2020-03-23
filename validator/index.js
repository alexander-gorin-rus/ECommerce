exports.userSignupValidation = (req, res, next) => {
  req.check('name', 'Необходимо ввести имя').notEmpty();
  req
    .check('email', 'Необходимо ввести почту')
    .isEmail()
    .notEmpty()
    .matches(/.+\@.+\..+/)
    .withMessage('Email введен неправильно: должен присутствовать знак @')
    .isLength({
      min: 8,
      max: 30
    });
  req.check('password', 'Необходимо ввести пароль ').notEmpty();
  req
    .check('password')
    .isLength({
      min: 6
    })
    .withMessage('Минимальное количество символов пароля - 6')
    .matches(/\d/)
    .withMessage('Пароль должен содержать минимум одну цифру');

  const errors = req.validationErrors();

  if (errors) {
    const firstError = errors.map(error => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }
  next();
};
