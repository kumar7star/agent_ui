const express = require('express');
const router = express.Router();
const { upload, handleUploadError } = require('../middleware/upload.middleware');
const { uploadFile, getFiles, deleteFile } = require('../controllers/upload.controller');
const { protect } = require('../middleware/auth.middleware');

// Upload a single file
router.post(
  '/file',
  protect,
  upload.single('file'),
  handleUploadError,
  uploadFile
);

// Get all uploaded files
router.get('/files', protect, getFiles);

// Delete a file
router.delete('/files/:filename', protect, deleteFile);

module.exports = router;

