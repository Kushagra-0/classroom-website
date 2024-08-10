const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const authMiddleware = require('../middleware/authMiddleware');

// Student-specific routes
router.get('/classmates', authMiddleware('Student'), studentController.getClassmates);
router.get('/timetable', authMiddleware('Student'), studentController.getTimetable); // Optional

module.exports = router;