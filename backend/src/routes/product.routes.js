'use strict';
const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
} = require('../controllers/product.controller');
const { protect, admin } = require('../middleware/auth.middleware');
const { productValidationRules, validate } = require('../middleware/validator.middleware');

// Public routes
router.get('/', getProducts);
router.get('/search', searchProducts);
router.get('/:id', getProductById);

// Protected routes (admin only)
router.post('/', protect, admin, productValidationRules, validate, createProduct);
router.put('/:id', protect, admin, productValidationRules, validate, updateProduct);
router.delete('/:id', protect, admin, deleteProduct);

module.exports = router;

