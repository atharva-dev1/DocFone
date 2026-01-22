const express = require('express');
const router = express.Router();
const { bookAppointment, getAppointments, updateAppointment } = require('../controllers/appointmentController');
const { protect, authorize } = require('../middlewares/authMiddleware');

router.post('/', protect, bookAppointment);
router.get('/', protect, getAppointments);
router.put('/:id', protect, authorize('doctor', 'admin'), updateAppointment);

module.exports = router;
