'use strict';
const express = require('express');
const router = express.Router();
const {
  register,
  login,
  getProfile,
  updateProfile,
} = require('../controllers/auth.controller');
const { protect } = require('../middleware/auth.middleware');
const {
  registerValidationRules,
  loginValidationRules,
  validate,
} = require('../middleware/validator.middleware');

// Public routes
router.post('/register', registerValidationRules, validate, register);
router.post('/login', loginValidationRules, validate, login);

// Protected routes
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);

module.exports = router;

