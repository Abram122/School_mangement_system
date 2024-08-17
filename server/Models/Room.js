const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoomSchema = new Schema({
    roomName: {
        type: String,
        required: [true, "Room name is required"],
    },
    roomTeacher: {
        type: String,
        required: [true, "Teacher name is required"],
    },
    roomCode: {
        type: String,
        unique: true,
        required: true
    }
});

const Room = mongoose.model('Room', RoomSchema);
module.exports = Room;
