const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const responseSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});


const commentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    responses: { type: [responseSchema], required: true } 
});

const materialSchema = new Schema({
    name: { type: String, required: true },
    material: { type: String}
});


const assignmentSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    dueDate: { type: Date, required: true }
});


const roomSchema = new Schema({
    roomName: { type: String, required: true },
    roomTeacher: { type: String, required: true },
    roomCode: { type: String, required: true, unique: true },
    students: [{ type: String, ref: 'User', required: true }], 
    materials: { type: [materialSchema], required: true }, 
    assignments: { type: [assignmentSchema], required: true } ,
    comments: { type: [commentSchema], required: true } 
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
