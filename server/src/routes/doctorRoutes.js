const express = require('express');
const router = express.Router();
const { getDoctors, getDoctorById, updateDoctorProfile, getMyProfile } = require('../controllers/doctorController');
const { protect, authorize } = require('../middlewares/authMiddleware');

router.get('/', getDoctors);
router.get('/profile/me', protect, authorize('doctor'), getMyProfile);
router.get('/:id', getDoctorById);
router.put('/profile', protect, authorize('doctor'), updateDoctorProfile);

module.exports = router;
