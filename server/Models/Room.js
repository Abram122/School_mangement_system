const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const materialSchema = new Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },  
    url: { type: String, required: true }
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
    assignments: { type: [assignmentSchema], required: true } 
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
