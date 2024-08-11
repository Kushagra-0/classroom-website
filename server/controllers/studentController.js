const mongoose = require('mongoose')
const User = require('../models/User');
const Timetable = require('../models/Timetable');


exports.getStudentsInClassroom = async (req, res) => {
    const { classroomId } = req.params;
    // console.log('Fetching students for classroomId:', classroomId);

    try {
        // Convert classroomId to ObjectId using 'new'
        const students = await User.find({
            role: 'Student',
            classroomId: new mongoose.Types.ObjectId(classroomId)
        }).populate('classroomId', 'name');

        // console.log('Students found:', students);

        if (students.length === 0) {
            return res.status(404).json({ msg: 'No students found for this classroom' });
        }

        res.json(students);
    } catch (err) {
        // console.error('Error fetching students:', err.message);
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