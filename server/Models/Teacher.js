const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TeacherSchema = new Schema({
    teacherEmail: {
        type: String,
        unique: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please enter a valid email address.']
    },
    teacherPassword: { type: String },
    role: {
        type: String,
        default:"teacher"
    },
    rooms: [{
        type: String,
        ref: 'Room'
    }],
    refreshToken: {
        type: String,
        default: null
    },
});

const Teacher = mongoose.model('Teacher', TeacherSchema);
module.exports = Teacher;
