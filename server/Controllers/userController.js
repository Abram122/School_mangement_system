const User = require('../Models/User');
const upload = require('../middleware/multerConfig'); 

exports.createUser = (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ error: err });
        } else {
            try {
                const { name, email, birthDate, password } = req.body;
                let profileImage = '';

                if (req.file) {
                    profileImage = req.file.filename; 
                }

                let user = await User.findOne({ email });
                if (user) {
                    return res.status(400).json({ error: 'User with this email already exists.' });
                }

                user = new User({
                    name,
                    email,
                    birthDate,
                    password,
                    profileImage
                });

                await user.save();

                const token = user.generateAuthToken();

                res.status(201).json({ message: 'User created successfully!', user, token });
            } catch (error) {
                console.error(error);
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

exports.login = async (req, res) => {
    console.log('in')
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password.' });
        }

        // Validate password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid email or password.' });
        }

        // Generate tokens
        const token = user.generateAuthToken();
        const refreshToken = user.generateRefreshToken();

        // Save tokens to the database
        user.token = token;
        user.refreshToken = refreshToken;
        await user.save();

        // Set the access token in an HTTP-only cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 15 * 60 * 1000 // 15 minutes
        });

        // Set the refresh token in an HTTP-only cookie
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        res.status(200).json({ message: 'Login successful!', token, refreshToken });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error. Please try again later.' });
    }
};

exports.refreshToken = async (req, res) => {
    try {
        const { refreshToken } = req.cookies;

        if (!refreshToken) {
            return res.status(401).json({ error: 'Refresh token not found, login again.' });
        }

        // Find the user with the matching refresh token
        const user = await User.findOne({ refreshToken });
        if (!user) {
            return res.status(403).json({ error: 'Invalid refresh token.' });
        }

        // Generate a new access token
        const newToken = user.generateAuthToken();

        // Optionally: generate a new refresh token and update the user
        const newRefreshToken = user.generateRefreshToken();
        user.token = newToken;
        user.refreshToken = newRefreshToken;
        await user.save();

        // Set the new tokens in cookies
        res.cookie('token', newToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 15 * 60 * 1000 // 15 minutes
        });

        res.cookie('refreshToken', newRefreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        res.status(200).json({ message: 'Token refreshed successfully!', token: newToken });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error. Please try again later.' });
    }
};


exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();

        if (!users.length) {
            return res.status(404).json({ error: 'No users found.' });
        }

        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error. Please try again later.' });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        if (error.kind === 'ObjectId') {
            res.status(400).json({ error: 'Invalid user ID format.' });
        } else {
            res.status(500).json({ error: 'Server error. Please try again later.' });
        }
    }
};
