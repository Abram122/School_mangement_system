const Room = require('../Models/Room'); 
const crypto = require('crypto'); 

const generateUniqueRoomCode = async () => {
    let code;
    let roomExists;
    do {
        code = crypto.randomBytes(3).toString('hex').toUpperCase(); // Generate a 6-character hex code
        roomExists = await Room.findOne({ roomCode: code });
    } while (roomExists); // Ensure the code is unique
    return code;
};

// Create a new Room
exports.createRoom = async (req, res) => {
    try {
        const { roomName, roomTeacher } = req.body;

        if (!roomName || roomName.length < 3 || roomName.length > 50) {
            return res.status(400).json({ message: "Room name must be between 3 and 50 characters" });
        }

        if (!roomTeacher || roomTeacher.length < 3 || roomTeacher.length > 50) {
            return res.status(400).json({ message: "Teacher name must be between 3 and 50 characters" });
        }

        const roomCode = await generateUniqueRoomCode();

        const newRoom = new Room({ roomName, roomTeacher, roomCode });
        await newRoom.save();
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
