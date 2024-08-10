const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');
const authMiddleware = require('../middleware/authMiddleware');

// Teacher-specific routes
router.get('/students', authMiddleware('Teacher'), teacherController.getStudentsInClassroom);
router.post('/timetable', authMiddleware('Teacher'), teacherController.createTimetable); // Optional
router.put('/student/:id', authMiddleware('Teacher'), teacherController.updateStudent);
router.delete('/student/:id', authMiddleware('Teacher'), teacherController.deleteStudent);

module.exports = router;