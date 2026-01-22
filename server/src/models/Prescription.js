const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    imageUrl: {
        type: String,
        required: true
    },
    extractedText: {
        type: String
    },
    medicines: [{
        name: String,
        dosage: String,
        frequency: String
    }],
    status: {
        type: String,
        enum: ['pending', 'processed', 'verified'],
        default: 'pending'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Prescription', prescriptionSchema);
