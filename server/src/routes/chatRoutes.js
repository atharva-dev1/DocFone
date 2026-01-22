const express = require('express');
const router = express.Router();
const { accessChat, fetchChats, sendMessage, allMessages } = require('../controllers/chatController');
const { protect } = require('../middlewares/authMiddleware');

router.route('/').post(protect, accessChat);
router.route('/').get(protect, fetchChats);
router.route('/message').post(protect, sendMessage);
router.route('/:chatId').get(protect, allMessages);

module.exports = router;
