const User = require('../Models/User');
const VerificationCode = require('../Models/VerificationCode ');
const upload = require('../middleware/multerConfig');
const { sendVerificationEmail, generateVerificationCode } = require('../Models/emailModel');

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
                if (!name || !email || !birthDate || !password || !profileImage){ 
                    return res.status(400).json({ error: 'All fiend are required' });
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

exports.sendVerification = async (req, res) => {
    console.log('in')
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ success: false, message: 'Email is required' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const verificationCode = generateVerificationCode();

        const newVerificationCode = new VerificationCode({
            userId: user._id,
            code: verificationCode
        });

        await newVerificationCode.save();

        const emailResponse = await sendVerificationEmail(email, verificationCode);

        if (emailResponse.valid) {
            return res.status(200).json({ success: true, message: 'Verification email sent successfully' });
        } else {
            return res.status(500).json({ success: false, message: 'Failed to send verification email', error: emailResponse.error });
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: 'An error occurred', error: error.message });
    }
};

exports.checkVerificationCode = async (req, res) => {
    const { email, code } = req.body;

    if (!email || !code) {
        return res.status(400).json({ success: false, message: 'Email and code are required.' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid email or code.' });
        }

        const storedCode = await VerificationCode.findOne({ userId: user._id, code });
        if (!storedCode) {
            return res.status(400).json({ success: false, message: 'Invalid or expired verification code.' });
        }

        // Update user's verification status
        user.verified = 'verified';
        await user.save();

        return res.status(200).json({ success: true, message: 'Verification successful.' });

    } catch (error) {
        console.error('Verification error:', error);
        return res.status(500).json({ success: false, message: 'An error occurred during verification.', error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password.' });
        }
        if (user.verified !== "verified") {
            return res.status(405).json({ error: 'unverified' });
        }
        // Validate password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid email or password.' });
        }

        const token = user.generateAuthToken();
        const refreshToken = user.generateRefreshToken();

        user.token = token;
        user.refreshToken = refreshToken;
        await user.save();

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 120 * 60 * 1000 
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 
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

        const user = await User.findOne({ refreshToken });
        if (!user) {
            return res.status(403).json({ error: 'Invalid refresh token.' });
        }

        const newToken = user.generateAuthToken();

        const newRefreshToken = user.generateRefreshToken();
        user.token = newToken;
        user.refreshToken = newRefreshToken;
        await user.save();

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


exports.logout = async (req, res) => {
    try {
        res.cookie('token', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 0
        });

        res.cookie('refreshToken', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 0
        });

        res.status(200).json({ message: 'Logout successful!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error. Please try again later.' });
    }
};


exports.getStudentWithRefreshToken = async (req, res) => {
    try {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            return res.status(400).json({ error: 'Refresh token is required.' });
        }

        const user = await User.findOne({ refreshToken });
        if (!user) {
            return res.status(404).json({ error: 'User not found or refresh token is invalid.' });
        }

        res.status(200).json({ message: 'User found!', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error. Please try again later.' });
    }
};
