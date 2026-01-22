const asyncHandler = require('express-async-handler');
const DoctorProfile = require('../models/DoctorProfile');
const User = require('../models/User');

// @desc    Get all doctors with search and filter
// @route   GET /api/doctors
// @access  Public
const getDoctors = asyncHandler(async (req, res) => {
    const { keyword, lat, lng, distance = 10 } = req.query; // distance in km

    let query = {};

    // Search by name or specialization
    if (keyword) {
        // Find users matching name
        const users = await User.find({
            $or: [
                { firstName: { $regex: keyword, $options: 'i' } },
                { lastName: { $regex: keyword, $options: 'i' } }
            ]
        }).select('_id');

        const userIds = users.map(user => user._id);

        query.$or = [
            { user: { $in: userIds } },
            { specialization: { $regex: keyword, $options: 'i' } }
        ];
    }

    // Geo location search
    if (lat && lng) {
        query.location = {
            $near: {
                $geometry: {
                    type: "Point",
                    coordinates: [parseFloat(lng), parseFloat(lat)]
                },
                $maxDistance: distance * 1000 // meters
            }
        };
    }

    const doctors = await DoctorProfile.find(query)
        .populate('user', 'firstName lastName email profileImage phone')
        .select('-availability'); // Exclude heavy data if list

    res.json(doctors);
});

// @desc    Get doctor details by ID
// @route   GET /api/doctors/:id
// @access  Public
const getDoctorById = asyncHandler(async (req, res) => {
    const doctor = await DoctorProfile.findById(req.params.id)
        .populate('user', 'firstName lastName email profileImage phone')
        .populate('reviews.user', 'firstName lastName profileImage');

    if (doctor) {
        res.json(doctor);
    } else {
        res.status(404);
        throw new Error('Doctor not found');
    }
});

// @desc    Update doctor profile
// @route   PUT /api/doctors/profile
// @access  Private (Doctor)
const updateDoctorProfile = asyncHandler(async (req, res) => {
    const doctorProfile = await DoctorProfile.findOne({ user: req.user._id });

    if (doctorProfile) {
        doctorProfile.specialization = req.body.specialization || doctorProfile.specialization;
        doctorProfile.degree = req.body.degree || doctorProfile.degree;
        doctorProfile.about = req.body.about || doctorProfile.about;
        doctorProfile.fees = req.body.fees || doctorProfile.fees;

        if (req.body.location) {
            doctorProfile.location = req.body.location; // Expecting { type: 'Point', coordinates: [lng, lat] }
        }

        // Update more fields as needed...

        const updatedProfile = await doctorProfile.save();
        res.json(updatedProfile);
    } else {
        res.status(404);
        throw new Error('Doctor profile not found');
    }
});

module.exports = {
    getDoctors,
    getDoctorById,
    updateDoctorProfile
};
