const User = require('../models/User');
const Timetable = require('../models/Timetable');

// View other students in the same classroom
exports.getClassmates = async (req, res) => {
    try {
        const classmates = await User.find({ classroomId: req.user.classroomId, role: 'Student' });
        res.json(classmates);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// View timetable for the student's classroom (Optional)
exports.getTimetable = async (req, res) => {
    try {
        const timetable = await Timetable.find({ classroomId: req.user.classroomId });
        res.json(timetable);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};