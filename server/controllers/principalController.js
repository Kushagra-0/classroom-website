const Classroom = require('../models/Classroom');
const User = require('../models/User');

// Create a new classroom
exports.createClassroom = async (req, res) => {
    const { name, startTime, endTime, days } = req.body;

    try {
        const classroom = new Classroom({
            name,
            startTime,
            endTime,
            days,
        });

        await classroom.save();
        res.json(classroom);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Assign a teacher to a classroom
exports.assignTeacher = async (req, res) => {
    const { teacherId, classroomId } = req.body;

    try {
        const teacher = await User.findById(teacherId);
        if (!teacher || teacher.role !== 'Teacher') {
            return res.status(400).json({ msg: 'Invalid teacher ID' });
        }

        const classroom = await Classroom.findById(classroomId);
        if (!classroom) {
            return res.status(400).json({ msg: 'Invalid classroom ID' });
        }

        teacher.classroomId = classroomId;
        classroom.teacherId = teacherId;

        await teacher.save();
        await classroom.save();

        res.json({ msg: 'Teacher assigned to classroom' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// View all teachers
exports.getAllTeachers = async (req, res) => {
    try {
        const teachers = await User.find({ role: 'Teacher' });
        res.json(teachers);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// View all students
exports.getAllStudents = async (req, res) => {
    try {
        const students = await User.find({ role: 'Student' });
        res.json(students);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Update teacher or student details
exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        Object.assign(user, updates);
        await user.save();

        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Delete teacher or student
exports.deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        await user.remove();
        res.json({ msg: 'User removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};