'use strict';
const { Product, Sequelize } = require('../models');
const { Op } = Sequelize;

/**
 * @desc    Get all products
 * @route   GET /api/products
 * @access  Public
 */
const getProducts = async (req, res, next) => {
  try {
    const pageSize = 10;
    const page = Number(req.query.page) || 1;
    
    const count = await Product.count({ where: { is_active: true } });
    
    const products = await Product.findAll({
      where: { is_active: true },
      limit: pageSize,
      offset: pageSize * (page - 1),
      order: [['created_at', 'DESC']],
    });

    res.json({
      products,
      page,
      pages: Math.ceil(count / pageSize),
      total: count,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get product by ID
 * @route   GET /api/products/:id
 * @access  Public
 */
const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (product && product.is_active) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create a product
 * @route   POST /api/products
 * @access  Private/Admin
 */
const createProduct = async (req, res, next) => {
  try {
    const { name, description, price, stock, image_url, category } = req.body;

    const product = await Product.create({
      name,
      description,
      price,
      stock,
      image_url,
      category,
    });

    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update a product
 * @route   PUT /api/products/:id
 * @access  Private/Admin
 */
const updateProduct = async (req, res, next) => {
  try {
    const { name, description, price, stock, image_url, category, is_active } = req.body;

    const product = await Product.findByPk(req.params.id);

    if (product) {
      product.name = name || product.name;
      product.description = description || product.description;
      product.price = price || product.price;
      product.stock = stock !== undefined ? stock : product.stock;
      product.image_url = image_url || product.image_url;
      product.category = category || product.category;
      product.is_active = is_active !== undefined ? is_active : product.is_active;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete a product
 * @route   DELETE /api/products/:id
 * @access  Private/Admin
 */
const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (product) {
      // Soft delete - just mark as inactive
      product.is_active = false;
      await product.save();
      
      // For hard delete, use:
      // await product.destroy();
      
      res.json({ message: 'Product removed' });
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Search products
 * @route   GET /api/products/search
 * @access  Public
 */
const searchProducts = async (req, res, next) => {
  try {
    const { query, category } = req.query;
    const whereClause = { is_active: true };
    
    if (query) {
      whereClause.name = { [Op.like]: `%${query}%` };
    }
    
    if (category) {
      whereClause.category = category;
    }
    
    const products = await Product.findAll({
      where: whereClause,
      order: [['created_at', 'DESC']],
    });
    
    res.json(products);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
};

