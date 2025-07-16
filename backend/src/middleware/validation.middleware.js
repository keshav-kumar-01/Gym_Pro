const { body, validationResult } = require('express-validator');
const { createError } = require('../utils/error.utils');

const validationRules = {
  login: [
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 6 }),
  ],
  register: [
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 6 }),
    body('firstName').notEmpty().trim(),
    body('lastName').notEmpty().trim(),
  ],
};

const validateRequest = (validationType) => {
  return [
    ...validationRules[validationType],
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(createError(400, 'Validation failed', errors.array()));
      }
      next();
    },
  ];
};

module.exports = { validateRequest };
