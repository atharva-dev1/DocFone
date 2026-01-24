const asyncHandler = require('express-async-handler');
const Plan = require('../models/Plan');
const Subscription = require('../models/Subscription');
const Transaction = require('../models/Transaction');
const User = require('../models/User');

// @desc    Get all active plans
// @route   GET /api/subscription/plans
// @access  Public
const getPlans = asyncHandler(async (req, res) => {
    const plans = await Plan.find({}).sort('price');
    res.json(plans);
});

// @desc    Initiate payment (Mock Gateway)
// @route   POST /api/subscription/initiate
// @access  Private
const initiatePayment = asyncHandler(async (req, res) => {
    const { planId, paymentMethod } = req.body;

    const plan = await Plan.findById(planId);
    if (!plan) {
        res.status(404);
        throw new Error('Plan not found');
    }

    // Create a pending transaction
    const transaction = await Transaction.create({
        user: req.user._id,
        plan: plan._id,
        amount: plan.price,
        status: 'pending',
        gatewayTransactionId: `mock_tx_${Date.now()}_${Math.floor(Math.random() * 1000)}`, // Mock ID
        paymentMethod: paymentMethod || 'card'
    });

    res.json({
        success: true,
        transactionId: transaction._id,
        amount: transaction.amount,
        currency: transaction.currency,
        orderId: transaction.gatewayTransactionId // For frontend to show
    });
});

// @desc    Verify payment and activate subscription (Mock Verification)
// @route   POST /api/subscription/verify
// @access  Private
const verifyPayment = asyncHandler(async (req, res) => {
    const { transactionId, status } = req.body; // status: 'success' or 'failed'

    const transaction = await Transaction.findById(transactionId);
    if (!transaction) {
        res.status(404);
        throw new Error('Transaction not found');
    }

    if (transaction.status === 'success') {
        res.status(400);
        throw new Error('Transaction already processed');
    }

    if (status !== 'success') {
        transaction.status = 'failed';
        await transaction.save();
        return res.json({ message: 'Payment marked as failed' });
    }

    // Mark transaction as success
    transaction.status = 'success';
    await transaction.save();

    // Calculate Expiry
    const plan = await Plan.findById(transaction.plan);
    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + plan.durationInMonths);

    // Create/Update Subscription
    // Check if user already has an active sub, if so, extend it or replace (simplifying: replace/new)
    // Deactivate old active subs
    await Subscription.updateMany(
        { user: req.user._id, status: 'active' },
        { status: 'expired' }
    );

    const subscription = await Subscription.create({
        user: req.user._id,
        plan: plan._id,
        status: 'active',
        startDate,
        endDate,
        paymentId: transaction.gatewayTransactionId
    });

    res.json({
        success: true,
        message: 'Subscription activated',
        subscription
    });
});

// @desc    Get current user subscription status
// @route   GET /api/subscription/me
// @access  Private
const getMySubscription = asyncHandler(async (req, res) => {
    const subscription = await Subscription.findOne({
        user: req.user._id,
        status: 'active',
        endDate: { $gt: new Date() } // Not expired
    }).populate('plan');

    if (!subscription) {
        return res.json(null); // No active sub
    }

    res.json(subscription);
});

module.exports = {
    getPlans,
    initiatePayment,
    verifyPayment,
    getMySubscription
};
