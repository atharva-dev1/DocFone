const asyncHandler = require('express-async-handler');
const Appointment = require('../models/Appointment');
const DoctorProfile = require('../models/DoctorProfile');

// @desc    Book an appointment
// @route   POST /api/appointments
// @access  Private
const bookAppointment = asyncHandler(async (req, res) => {
    const { doctorId, date, startTime, type, symptoms } = req.body;

    // Check availability (Simple check)
    const existingAppointment = await Appointment.findOne({
        doctor: doctorId,
        date: new Date(date),
        'slot.startTime': startTime,
        status: { $ne: 'cancelled' }
    });

    if (existingAppointment) {
        res.status(400);
        throw new Error('Slot already booked');
    }

    const appointment = await Appointment.create({
        patient: req.user._id,
        doctor: doctorId,
        date: new Date(date),
        slot: { startTime, endTime: 'TBD' }, // Logic to calculate end time needed
        type,
        symptoms,
        meetLink: `https://meet.jit.si/docfone-${Math.random().toString(36).substring(7)}`
    });

    res.status(201).json(appointment);
});

// @desc    Get appointments
// @route   GET /api/appointments
// @access  Private
const getAppointments = asyncHandler(async (req, res) => {
    let query = {};
    if (req.user.role === 'patient') {
        query.patient = req.user._id;
    } else if (req.user.role === 'doctor') {
        query.doctor = req.user._id;
    }

    const appointments = await Appointment.find(query)
        .populate('patient', 'firstName lastName profileImage')
        .populate('doctor', 'firstName lastName profileImage')
        .sort({ date: 1 });

    res.json(appointments);
});

// @desc    Update appointment status
// @route   PUT /api/appointments/:id
// @access  Private (Doctor/Admin)
const updateAppointment = asyncHandler(async (req, res) => {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
        res.status(404);
        throw new Error('Appointment not found');
    }

    // Verify ownership
    if (req.user.role !== 'admin' && appointment.doctor.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error('Not authorized');
    }

    appointment.status = req.body.status || appointment.status;
    await appointment.save();

    res.json(appointment);
});

module.exports = {
    bookAppointment,
    getAppointments,
    updateAppointment
};
