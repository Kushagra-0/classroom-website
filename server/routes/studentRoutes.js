const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const authMiddleware = require('../middleware/authMiddleware');

// Student-specific routes
router.get('/classroom/:classroomId/students', studentController.getStudentsInClassroom);
router.get('/timetable', authMiddleware('Student'), studentController.getTimetable);

module.exports = router;