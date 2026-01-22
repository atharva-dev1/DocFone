const mongoose = require('mongoose');

const patientProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    age: {
        type: Number
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other']
    },
    bloodGroup: {
        type: String
    },
    height: {
        type: Number // in cm
    },
    weight: {
        type: Number // in kg
    },
    allergies: [String],
    currentMedications: [String],
    medicalHistory: [String],
    emergencyContact: {
        name: String,
        phone: String,
        relation: String
    },
    address: {
        street: String,
        city: String,
        state: String,
        zipCode: String,
        country: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('PatientProfile', patientProfileSchema);
