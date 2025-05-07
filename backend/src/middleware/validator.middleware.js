'use strict';
const { validationResult, body } = require('express-validator');

/**
 * Validation result middleware
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

/**
 * User registration validation rules
 */
const registerValidationRules = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Please include a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
];

/**
 * User login validation rules
 */
const loginValidationRules = [
  body('email').isEmail().withMessage('Please include a valid email'),
  body('password').exists().withMessage('Password is required'),
];

/**
 * Product validation rules
 */
const productValidationRules = [
  body('name').notEmpty().withMessage('Product name is required'),
  body('price')
    .isNumeric()
    .withMessage('Price must be a number')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  body('stock')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Stock must be a positive integer'),
];

module.exports = {
  validate,
  registerValidationRules,
  loginValidationRules,
  productValidationRules,
};

