const express = require('express');
const router = express.Router();
const { getPlans, initiatePayment, verifyPayment, getMySubscription } = require('../controllers/subscriptionController');
const { protect } = require('../middlewares/authMiddleware');

router.get('/plans', getPlans);
router.post('/initiate', protect, initiatePayment);
router.post('/verify', protect, verifyPayment);
router.get('/me', protect, getMySubscription);

module.exports = router;
