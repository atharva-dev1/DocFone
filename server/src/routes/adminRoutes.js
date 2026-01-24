const express = require('express');
const router = express.Router();
const { getAllUsers, getSystemStats, deleteUser, approveDoctor } = require('../controllers/adminController');
const { protect, authorize } = require('../middlewares/authMiddleware');

router.use(protect);

router.get('/users', authorize('super-admin'), getAllUsers);
router.get('/stats', authorize('admin', 'super-admin'), getSystemStats);
router.delete('/users/:id', authorize('super-admin'), deleteUser);
router.put('/approve-doctor/:id', authorize('admin', 'super-admin'), approveDoctor);

module.exports = router;
