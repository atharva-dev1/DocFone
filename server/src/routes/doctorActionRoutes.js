const express = require('express');
const router = express.Router();
const { approveAppointment, declineAppointment } = require('../controllers/doctorAppointmentController');
const { protect, authorize } = require('../middlewares/authMiddleware');

router.put('/approve/:id', protect, authorize('doctor'), approveAppointment);
router.put('/decline/:id', protect, authorize('doctor'), declineAppointment);

module.exports = router;
