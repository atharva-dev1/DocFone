const express = require('express');
const router = express.Router();
const { uploadPrescription, getMyPrescriptions } = require('../controllers/prescriptionController');
const { protect } = require('../middlewares/authMiddleware');
const { upload } = require('../config/cloudinary');

router.post('/', protect, upload.single('image'), uploadPrescription);
router.get('/', protect, getMyPrescriptions);

module.exports = router;
