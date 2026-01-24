const asyncHandler = require('express-async-handler');
const Appointment = require('../models/Appointment');
const DoctorProfile = require('../models/DoctorProfile');

// @desc    Approve appointment
// @route   PUT /api/doctor-actions/approve/:id
// @access  Private (Doctor)
const approveAppointment = asyncHandler(async (req, res) => {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
        res.status(404);
        throw new Error('Appointment not found');
    }

    // Verify the user is the doctor of this appointment
    // Find DoctorProfile of current user
    const doctorProfile = await DoctorProfile.findOne({ user: req.user._id });

    if (!doctorProfile) {
        res.status(401);
        throw new Error('Doctor profile not found');
    }

    // In Appointment model, 'doctor' field usually refers to UserID of doctor, NOT DoctorProfileID
    // Let's verify based on the schema I see: doctor: { type: ObjectId, ref: 'User' }
    if (appointment.doctor.toString() !== req.user._id.toString()) {
        res.status(403);
        throw new Error('Not authorized to approve this appointment');
    }

    appointment.status = 'confirmed';
    const updatedAppointment = await appointment.save();

    res.json(updatedAppointment);
});

// @desc    Decline appointment
// @route   PUT /api/doctor-actions/decline/:id
// @access  Private (Doctor)
const declineAppointment = asyncHandler(async (req, res) => {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
        res.status(404);
        throw new Error('Appointment not found');
    }

    // Verify the user is the doctor of this appointment
    if (appointment.doctor.toString() !== req.user._id.toString()) {
        res.status(403);
        throw new Error('Not authorized to decline this appointment');
    }

    appointment.status = 'cancelled';
    const updatedAppointment = await appointment.save();

    res.json(updatedAppointment);
});

module.exports = {
    approveAppointment,
    declineAppointment
};
