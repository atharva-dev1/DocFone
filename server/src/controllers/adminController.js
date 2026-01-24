const User = require('../models/User');
const DoctorProfile = require('../models/DoctorProfile');
const PatientProfile = require('../models/PatientProfile');
const Appointment = require('../models/Appointment');

// @desc    Get all users (Super Admin only)
// @route   GET /api/admin/users
// @access  Private/SuperAdmin
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}).select('-password').sort('-createdAt');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get system statistics
// @route   GET /api/admin/stats
// @access  Private/Admin
const getSystemStats = async (req, res) => {
    try {
        const totalPatients = await User.countDocuments({ role: 'patient' });
        const totalDoctors = await User.countDocuments({ role: 'doctor' });
        const totalAppointments = await Appointment.countDocuments({});
        const pendingApprovals = await User.countDocuments({ role: 'doctor', isDoctorApproved: false });

        res.json({
            totalPatients,
            totalDoctors,
            totalAppointments,
            pendingApprovals
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Private/SuperAdmin
const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Prevent deleting yourself
        if (user._id.toString() === req.user.id) {
            return res.status(400).json({ message: 'Cannot delete yourself' });
        }

        // Cleanup related profiles
        if (user.role === 'patient') {
            await PatientProfile.findOneAndDelete({ user: user._id });
        } else if (user.role === 'doctor') {
            await DoctorProfile.findOneAndDelete({ user: user._id });
        }

        await user.deleteOne();
        res.json({ message: 'User removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Approve Doctor
// @route   PUT /api/admin/approve-doctor/:id
// @access  Private/Admin
const approveDoctor = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user || user.role !== 'doctor') {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        user.isDoctorApproved = true;
        await user.save();

        res.json({ message: 'Doctor approved successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllUsers,
    getSystemStats,
    deleteUser,
    approveDoctor
};
