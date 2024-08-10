const mongoose = require('mongoose');

const TimetableSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: true,
    },
    startTime: {
        type: String,
        required: true,
    },
    endTime: {
        type: String,
        required: true,
    },
    classroomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Classroom',
    },
});

const Timetable = mongoose.model('Timetable', TimetableSchema);
module.exports = Timetable;