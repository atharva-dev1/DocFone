const asyncHandler = require('express-async-handler');
const Tesseract = require('tesseract.js');
const Prescription = require('../models/Prescription');

// @desc    Upload a prescription
// @route   POST /api/prescriptions
// @access  Private (Patient)
const uploadPrescription = asyncHandler(async (req, res) => {
    if (!req.file) {
        res.status(400);
        throw new Error('No file uploaded');
    }

    // Perform OCR
    let extractedText = '';
    try {
        const { data: { text } } = await Tesseract.recognize(
            req.file.path,
            'eng',
            { logger: m => console.log(m) }
        );
        extractedText = text;
    } catch (error) {
        console.error('OCR Error:', error);
    }

    // Simple parser for medicine names (Mock logic for now)
    const medicines = extractedText.split('\n')
        .filter(line => line.length > 5)
        .map(line => ({ name: line.trim(), dosage: 'TBD', frequency: 'TBD' }))
        .slice(0, 5); // Take top 5 lines as potential medicines

    const prescription = await Prescription.create({
        user: req.user._id,
        imageUrl: req.file.path,
        extractedText,
        medicines,
        status: 'processed'
    });

    res.status(201).json(prescription);
});

// @desc    Get my prescriptions
// @route   GET /api/prescriptions
// @access  Private
const getMyPrescriptions = asyncHandler(async (req, res) => {
    const prescriptions = await Prescription.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(prescriptions);
});

module.exports = {
    uploadPrescription,
    getMyPrescriptions
};
