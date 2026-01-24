const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        enum: ['Basic Care', 'Pro Care', 'Family Care']
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        default: 'INR'
    },
    durationInMonths: {
        type: Number,
        default: 1
    },
    features: [{
        type: String
    }],
    isRecommended: {
        type: Boolean,
        default: false
    },
    color: {
        type: String, // e.g., 'primary', 'purple', 'gold'
        default: 'primary'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Plan', planSchema);
