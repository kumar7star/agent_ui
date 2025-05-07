'use strict';
require('dotenv').config();
const { sequelize } = require('../models');

/**
 * Initialize database
 */
const initializeDatabase = async () => {
  try {
    // Test the connection
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');

    // Sync all models with the database
    // Note: In production, you should use migrations instead of sync
    if (process.env.NODE_ENV === 'development') {
      console.log('Syncing database models...');
      await sequelize.sync({ alter: true });
      console.log('Database synchronized successfully.');
    }
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

module.exports = initializeDatabase;

