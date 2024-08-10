const express = require('express');
const router = express.Router();
const principalController = require('../controllers/principalController');
const authMiddleware = require('../middleware/authMiddleware');

// Principal-specific routes
router.post('/classroom', principalController.createClassroom);
router.post('/assign-teacher', principalController.assignTeacher);
router.get('/teachers', principalController.getAllTeachers);
router.get('/students', principalController.getAllStudents);
router.put('/user/:id', principalController.updateUser);
router.delete('/user/:id', principalController.deleteUser);

router.post('/create-teacher', principalController.createTeacher);
router.post('/create-student', principalController.createStudent);

module.exports = router;