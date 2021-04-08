const { param } = require('express-validator');

module.exports= () => {
  return [
    param('devname')
        .not()
        .isEmpty()
        .withMessage('devname is required')
        .bail()
        .trim()
        .isLength({ min: 2 })
        .withMessage('devname is not valid')
        .customSanitizer(value => {//value.replace(/'/g, "\\'");
            return decodeURIComponent(value);
          })

    ];
}