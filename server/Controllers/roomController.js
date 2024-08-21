const Room = require('../Models/Room'); 
const User = require('../Models/User'); 
const Teacher = require('../Models/Teacher'); 
const crypto = require('crypto'); 
const path = require('path');
const jwt = require('jsonwebtoken');

const generateUniqueRoomCode = async () => {
    let code;
    let roomExists;
    do {
        code = crypto.randomBytes(3).toString('hex').toUpperCase(); 
        roomExists = await Room.findOne({ roomCode: code });
    } while (roomExists); 
    return code;
};

// Create a new Room
exports.createRoom = async (req, res) => {
    try {
        const { roomName, roomTeacher ,refreshToken} = req.body;

        // Validate inputs
        if (!roomName || !roomTeacher) {
            return res.status(400).json({ message: 'Room name and teacher are required' });
        }

        const roomCode = await generateUniqueRoomCode();

        const newRoom = new Room({
            roomName,
            roomTeacher,
            roomCode
        });

        await newRoom.save();

        const teacher = await Teacher.findOne({ refreshToken });
        console.log(teacher)
        
        if (!teacher.rooms.includes(roomCode)) {
            teacher.rooms.push(roomCode);
            await teacher.save();
        }

        res.status(201).json({ message: "Room created successfully", room: newRoom });
    } catch (error) {
        res.status(500).json({ message: "Error creating room", error: error.message });
    }
};
// Get all Rooms
exports.getRooms = async (req, res) => {
    try {
        const rooms = await Room.find();
        res.status(200).json(rooms);
    } catch (error) {
        res.status(500).json({ message: "Error fetching rooms", error: error.message });
    }
};

// Get a single Room by ID
exports.getRoomById = async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);
        if (!room) {
            return res.status(404).json({ message: "Room not found" });
        }
        res.status(200).json(room);
    } catch (error) {
        res.status(500).json({ message: "Error fetching room", error: error.message });
    }
};


// Get Rooms by Teacher Name
exports.getRoomsByCode = async (req, res) => {
    const { roomCode } = req.body;
    try {
        const rooms = await Room.find({ roomCode });
        if (!rooms) {
            res.status(400).json({ error: 'Canot find a classroom with this code' })
        }
        res.status(200).json(rooms);
    } catch (error) {
        res.status(500).json({ error: 'Server error. Please try again later.' });
    }
};

// Get Rooms by Teacher Name
exports.getRoomsByTeacher = async (req, res) => {
    const { roomTeacher } = req.body;
    console.log('on')
    try {
        const rooms = await Room.find({ roomTeacher });
        res.status(200).json(rooms);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error. Please try again later.' });
    }
};
// Update a Room by ID
exports.updateRoom = async (req, res) => {
    try {
        const { roomName, roomTeacher } = req.body;

        if (roomName && (roomName.length < 3 || roomName.length > 50)) {
            return res.status(400).json({ message: "Room name must be between 3 and 50 characters" });
        }

        if (roomTeacher && (roomTeacher.length < 3 || roomTeacher.length > 50)) {
            return res.status(400).json({ message: "Teacher name must be between 3 and 50 characters" });
        }

        const updatedRoom = await Room.findByIdAndUpdate(
            req.params.id,
            { roomName, roomTeacher },
            { new: true, runValidators: true }
        );

        if (!updatedRoom) {
            return res.status(404).json({ message: "Room not found" });
        }

        res.status(200).json({ message: "Room updated successfully", room: updatedRoom });
    } catch (error) {
        res.status(500).json({ message: "Error updating room", error: error.message });
    }
};

// Delete a Room by ID
exports.deleteRoom = async (req, res) => {
    try {
        const deletedRoom = await Room.findByIdAndDelete(req.params.id);
        if (!deletedRoom) {
            return res.status(404).json({ message: "Room not found" });
        }
        res.status(200).json({ message: "Room deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting room", error: error.message });
    }
};






// Add a student to an existing room
exports.addStudentToRoom = async (req, res) => {
    try {
        const { roomId } = req.body;
        const { refreshToken } = req.body;

        if (!refreshToken) {
            return res.status(400).json({ message: 'Refresh token is required' });
        }

        const student = await User.findOne({ refreshToken });
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        const room = await Room.findById(roomId);
        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }

        if (!room.students.includes(student.name)) {
            room.students.push(student.name);
            await room.save();
        }

        if (!student.rooms.includes(room.roomCode)) {
            student.rooms.push(room.roomCode);
            await student.save();
        }

        res.status(200).json({ message: 'Student added successfully to the room', room });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error adding student', error: error.message });
    }
};

exports.addMaterialToRoom = async (req, res) => {
    try {
        const { roomId } = req.params;
        const { name } = req.body;
        console.log(req.body)
        const material = req.file ? req.file.filename : null; 

        const room = await Room.findById(roomId);
        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }

        room.materials.push({ name, material });

        await room.save();

        res.status(200).json({ message: 'Material added successfully', room });
    } catch (error) {
        // console.log(error);
        res.status(500).json({ message: 'Error adding material', error: error.message });
    }
};

exports.addAssignmentToRoom = async (req, res) => {
    try {
        const { roomId } = req.params;
        const { title, description, dueDate } = req.body;

        const room = await Room.findById(roomId);
        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }

        room.assignments.push({ title, description, dueDate });

        await room.save();

        res.status(200).json({ message: 'Assignment added successfully', room });
    } catch (error) {
        res.status(500).json({ message: 'Error adding assignment', error: error.message });
    }
};

exports.addCommentToRoom = async (req, res) => {
    try {
        const { roomId } = req.params;
        const { text, author } = req.body;

        const room = await Room.findById(roomId);
        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }

        const newComment = { text, author };
        room.comments.push(newComment);

        await room.save();

        res.status(200).json({ message: 'Comment added successfully', room });
    } catch (error) {
        res.status(500).json({ message: 'Error adding comment', error: error.message });
    }
};



exports.addResponseToComment = async (req, res) => {
    try {
        const { roomId } = req.params;
        const { text, author, commentId } = req.body;
        const room = await Room.findById(roomId);
        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }

        const comment = room.comments.id(commentId);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        const newResponse = { text, author };
        comment.responses.push(newResponse);

        await room.save();

        res.status(200).json({ message: 'Response added successfully', room });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error adding response', error: error.message });
    }
};
