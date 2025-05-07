'use strict';

/**
 * Format error response
 * @param {string} message - Error message
 * @param {number} statusCode - HTTP status code
 * @returns {Object} Error object
 */
const formatError = (message, statusCode = 500) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

/**
 * Format success response
 * @param {Object} data - Response data
 * @param {string} message - Success message
 * @returns {Object} Success object
 */
const formatSuccess = (data, message = 'Success') => {
  return {
    success: true,
    message,
    data,
  };
};

/**
 * Pagination helper
 * @param {number} page - Current page
 * @param {number} limit - Items per page
 * @returns {Object} Pagination object with offset and limit
 */
const getPagination = (page = 1, limit = 10) => {
  const offset = (page - 1) * limit;
  return { offset, limit };
};

/**
 * Format pagination response
 * @param {Array} data - Data array
 * @param {number} page - Current page
 * @param {number} limit - Items per page
 * @param {number} total - Total items
 * @returns {Object} Paginated response
 */
const getPaginatedResponse = (data, page, limit, total) => {
  return {
    data,
    meta: {
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
      hasNextPage: page < Math.ceil(total / limit),
      hasPrevPage: page > 1,
    },
  };
};

module.exports = {
  formatError,
  formatSuccess,
  getPagination,
  getPaginatedResponse,
};

