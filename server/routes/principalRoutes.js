const express = require('express');
const router = express.Router();
const principalController = require('../controllers/principalController');
const authMiddleware = require('../middleware/authMiddleware');

// Principal-specific routes
router.post('/classroom', authMiddleware('Principal'), principalController.createClassroom);
router.post('/assign-teacher', authMiddleware('Principal'), principalController.assignTeacher);
router.get('/teachers', authMiddleware('Principal'), principalController.getAllTeachers);
router.get('/students', authMiddleware('Principal'), principalController.getAllStudents);
router.put('/user/:id', authMiddleware('Principal'), principalController.updateUser);
router.delete('/user/:id', authMiddleware('Principal'), principalController.deleteUser);

module.exports = router;