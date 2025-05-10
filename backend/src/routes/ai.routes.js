const express = require('express');
const { sendMessages } = require('../controllers/ai.controller');
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

// Route to send messages to Anthropic AI
router.post('/messages', protect, sendMessages);

module.exports = router;

