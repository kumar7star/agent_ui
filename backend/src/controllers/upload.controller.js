const path = require('path');
const fs = require('fs');

/**
 * Upload a file to the server
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} Response with upload status and file information
 */
const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ 
        success: false, 
        message: 'No file uploaded' 
      });
    }

    // Return success response with file information
    return res.status(200).json({
      success: true,
      message: 'File uploaded successfully',
      file: {
        filename: req.file.filename,
        originalname: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
        path: `/uploads/${req.file.filename}`
      }
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return res.status(500).json({
      success: false,
      message: 'Error uploading file',
      error: error.message
    });
  }
};

/**
 * Get all uploaded files
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} Response with list of files
 */
const getFiles = async (req, res) => {
  try {
    const uploadsDir = path.join(__dirname, '../../../public/uploads');
    
    // Check if directory exists
    if (!fs.existsSync(uploadsDir)) {
      return res.status(404).json({
        success: false,
        message: 'Uploads directory not found'
      });
    }

    // Read directory contents
    const files = fs.readdirSync(uploadsDir);
    
    // Map files to include full information
    const fileList = files.map(file => {
      const stats = fs.statSync(path.join(uploadsDir, file));
      return {
        filename: file,
        size: stats.size,
        createdAt: stats.birthtime,
        path: `/uploads/${file}`
      };
    });

    return res.status(200).json({
      success: true,
      count: fileList.length,
      files: fileList
    });
  } catch (error) {
    console.error('Error getting files:', error);
    return res.status(500).json({
      success: false,
      message: 'Error retrieving files',
      error: error.message
    });
  }
};

/**
 * Delete a file
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} Response with deletion status
 */
const deleteFile = async (req, res) => {
  try {
    const { filename } = req.params;
    const filePath = path.join(__dirname, '../../../public/uploads', filename);

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        success: false,
        message: 'File not found'
      });
    }

    // Delete the file
    fs.unlinkSync(filePath);

    return res.status(200).json({
      success: true,
      message: 'File deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting file:', error);
    return res.status(500).json({
      success: false,
      message: 'Error deleting file',
      error: error.message
    });
  }
};

module.exports = {
  uploadFile,
  getFiles,
  deleteFile
};

