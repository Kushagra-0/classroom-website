const User = require('../models/User');
const Timetable = require('../models/Timetable');

// View students in the teacher's classroom
exports.getStudentsInClassroom = async (req, res) => {
    try {
        const students = await User.find({ classroomId: req.user.classroomId, role: 'Student' });
        res.json(students);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Create a timetable (Optional)
exports.createTimetable = async (req, res) => {
    const { subject, startTime, endTime } = req.body;

    try {
        const timetable = new Timetable({
            subject,
            startTime,
            endTime,
            classroomId: req.user.classroomId,
        });

        await timetable.save();
        res.json(timetable);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Update student details
exports.updateStudent = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const student = await User.findById(id);
        if (!student || student.role !== 'Student' || student.classroomId.toString() !== req.user.classroomId.toString()) {
            return res.status(404).json({ msg: 'Student not found' });
        }

        Object.assign(student, updates);
        await student.save();

        res.json(student);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Delete a student
exports.deleteStudent = async (req, res) => {
    const { id } = req.params;

    try {
        const student = await User.findById(id);
        if (!student || student.role !== 'Student' || student.classroomId.toString() !== req.user.classroomId.toString()) {
            return res.status(404).json({ msg: 'Student not found' });
        }

        await student.remove();
        res.json({ msg: 'Student removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};