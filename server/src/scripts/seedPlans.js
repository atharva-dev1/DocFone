const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Plan = require('../models/Plan');
const connectDB = require('../config/db');

dotenv.config({ path: '../../.env' }); // Adjust if run from different folder

const plans = [
    {
        name: 'Basic Care',
        slug: 'basic-care',
        description: 'Essential medical access for individuals.',
        price: 0,
        currency: 'INR',
        durationInMonths: 1200, // Forever ideally
        features: ['Find Doctors', 'Book Appointments', 'Basic Health Tracking'],
        isRecommended: false,
        color: 'gray'
    },
    {
        name: 'Pro Care',
        slug: 'pro-care',
        description: 'Priority access and advanced features for serious health management.',
        price: 499,
        currency: 'INR',
        durationInMonths: 1,
        features: ['Unlimited Doctor Chat', 'Video Consultations (2/mo)', 'Priority Booking', 'Ad-free Experience', 'Advanced Health Analytics'],
        isRecommended: true,
        color: 'primary'
    },
    {
        name: 'Family Care',
        slug: 'family-care',
        description: 'Complete protection for your entire family.',
        price: 999,
        currency: 'INR',
        durationInMonths: 1,
        features: ['Up to 4 Family Members', 'Unlimited Video Consults', '24/7 Priority Support', 'Home Sample Collection', 'Dedicated Care Manager'],
        isRecommended: false,
        color: 'purple'
    }
];

const seedPlans = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/medyxra');
        console.log('DB Connected for Seeding');

        await Plan.deleteMany(); // Clear existing
        console.log('Old plans cleared');

        await Plan.insertMany(plans);
        console.log('New plans seeded successfully');

        process.exit();
    } catch (error) {
        console.error('Seeding failed:', error);
        process.exit(1);
    }
};

seedPlans();
