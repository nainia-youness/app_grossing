const { check } = require('express-validator');

module.exports= () => {
  return [
    check('username')
        .not()
        .isEmpty()
        .withMessage('Username is required')
        .bail()
        .isLength({ min: 3 })
        .withMessage('Name must be atleast 3 characters long'),
    check('email', 'Email is required')
        .not()
        .isEmpty()
        .bail()
        .isEmail()
        .withMessage('Email not valid'),
    check('password', 'Password should contains 8 characters long')
        .not()
        .isEmpty()
        .withMessage('password is required')
        .bail()
        .isLength({ min: 8 })
    ];
}