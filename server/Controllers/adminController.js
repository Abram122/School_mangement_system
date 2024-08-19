const Admin = require('../Models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require("dotenv").config();

const createAdmin = async (req, res) => {
    try {
        const { admin_name, admin_password } = req.body;
        const hashedPassword = await bcrypt.hash(admin_password, 10);

        const newAdmin = new Admin({
            admin_name,
            admin_password: hashedPassword
        });

        await newAdmin.save();
        res.status(201).json({ message: 'Admin created successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error creating admin' });
    }
};

const login = async (req, res) => {
    try {
        const { admin_name, admin_password } = req.body;
        const admin = await Admin.findOne({ admin_name });

        if (!admin) {
            return res.status(404).json({ error: 'Admin not found' });
        }

        const isMatch = await bcrypt.compare(admin_password, admin.admin_password);

        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const accessToken = jwt.sign(
            { adminId: admin._id, admin_name: admin.admin_name },
            process.env.JWT_SECRET,
            { expiresIn: '3h' }
        );

        const refreshToken = jwt.sign(
            { adminId: admin._id, admin_name: admin.admin_name },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );
        admin.refreshToken = refreshToken
        await admin.save()
        res.status(200).json({ accessToken, refreshToken });
    } catch (error) {
        res.status(500).json({ error: 'Error logging in' });
    }
};

const verifyAdmin = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
        req.admin = decoded; // Attach the decoded token to the request
        next();
    } catch (error) {
        res.status(400).json({ error: 'Invalid token.' });
    }
};



const  getAdminWithRefreshToken = async (req, res) => {
    try {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            return res.status(400).json({ error: 'Refresh token is required.' });
        }

        const admin = await Admin.findOne({ refreshToken });
        if (!admin) {
            return res.status(404).json({ error: 'Admin not found or refresh token is invalid.' });
        }

        res.status(200).json({ message: 'Admin found!', admin });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error. Please try again later.' });
    }
};



module.exports = {
    createAdmin,
    login,
    verifyAdmin,
    getAdminWithRefreshToken
};
