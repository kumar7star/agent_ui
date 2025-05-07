'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('products', [
      {
        name: 'Product 1',
        description: 'This is the first product',
        price: 19.99,
        stock: 100,
        image_url: 'https://example.com/product1.jpg',
        category: 'Electronics',
        is_active: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Product 2',
        description: 'This is the second product',
        price: 29.99,
        stock: 50,
        image_url: 'https://example.com/product2.jpg',
        category: 'Clothing',
        is_active: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Product 3',
        description: 'This is the third product',
        price: 39.99,
        stock: 75,
        image_url: 'https://example.com/product3.jpg',
        category: 'Home',
        is_active: true,
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('products', null, {});
  }
};

