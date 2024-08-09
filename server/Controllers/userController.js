const User = require('../Models/User');
const upload = require('../middleware/multerConfig'); // Assuming multerConfig.js is in a middleware folder

// Create a new user with file upload
exports.createUser = (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ error: err });
        } else {
            try {
                const { name, email, birthDate, password } = req.body;
                let profileImage = '';

                if (req.file) {
                    profileImage = req.file.path; // Save the file path
                }

                // Check if user with the same email already exists
                let user = await User.findOne({ email });
                if (user) {
                    return res.status(400).json({ error: 'User with this email already exists.' });
                }

                // Create new user
                user = new User({
                    name,
                    email,
                    birthDate,
                    password,
                    profileImage
                });

                // Save user to database
                await user.save();

                res.status(201).json({ message: 'User created successfully!', user });
            } catch (error) {
                console.error(error);
                // Check if the error is a validation error
                if (error.name === 'ValidationError') {
                    const errors = Object.values(error.errors).map(val => val.message);
                    res.status(400).json({ errors });
                } else {
                    res.status(500).json({ error: 'Server error. Please try again later.' });
                }
            }
        }
    });
};

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        // Fetch all users from the database
        const users = await User.find();

        // If no users are found, return a 404 status
        if (!users.length) {
            return res.status(404).json({ error: 'No users found.' });
        }

        // Return the list of users with a 200 status
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error. Please try again later.' });
    }
};

// Get a user by ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        // Check if the error is related to invalid ObjectId
        if (error.kind === 'ObjectId') {
            res.status(400).json({ error: 'Invalid user ID format.' });
        } else {
            res.status(500).json({ error: 'Server error. Please try again later.' });
        }
    }
};
