const Teacher = require('../Models/Teacher');
require("dotenv").config();
const jwt = require('jsonwebtoken');

exports.createTeacher = async (req, res) => {
    try {
        const { teacherEmail, teacherPassword } = req.body;

        if (!teacherEmail || !teacherPassword) {
            return res.status(400).json({ error: 'Teacher name and password are required.' });
        }

        const newTeacher = new Teacher({
            teacherEmail,
            teacherPassword,
        });

        const savedTeacher = await newTeacher.save();
        res.status(201).json("Teacher Added");
    } catch (error) {
        console.error(error);
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(val => val.message);
            res.status(400).json({ errors });
        } else if (error.code === 11000) {
            res.status(409).json({ error: 'Duplicate entry. This teacher already exists.' });
        } else {
            res.status(500).json({ error: 'Server error. Please try again later.' });
        }
    }
};

exports.login = async (req, res) => {
    try {
        const { teacherEmail, teacherPassword } = req.body;
        const teacher = await Teacher.findOne({ teacherEmail });

        if (!teacher) {
            return res.status(404).json({ error: 'Teacher not found' });
        }
        const isMatch = teacherPassword == teacher.teacherPassword

        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const accessToken = jwt.sign(
            { teacherId: teacher._id, teacherEmail: teacher.teacherEmail },
            process.env.JWT_SECRET,
            { expiresIn: '3h' }
        );

        const refreshToken = jwt.sign(
            { teacherId: teacher._id, teacherEmail: teacher.teacherEmail },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        teacher.refreshToken = refreshToken
        await teacher.save()

        res.status(200).json({ accessToken, refreshToken });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Error logging in' });
    }
};


exports.getTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.find();
        res.status(200).json(teachers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error. Please try again later.' });
    }
};

exports.getTeacherById = async (req, res) => {
    try {
        const teacher = await Teacher.findById(req.params.id);

        if (!teacher) {
            return res.status(404).json({ error: 'Teacher not found.' });
        }

        res.status(200).json(teacher);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error. Please try again later.' });
    }
};

exports.deleteTeacher = async (req, res) => {
    try {
        const deletedTeacher = await Teacher.findByIdAndDelete(req.params.id);

        if (!deletedTeacher) {
            return res.status(404).json({ error: 'Teacher not found.' });
        }

        res.status(200).json({ message: 'Teacher deleted successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error. Please try again later.' });
    }
};

exports.verifyTeacher = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
        req.teacher = decoded; 
        next();
    } catch (error) {
        res.status(400).json({ error: 'Invalid token.' });
    }
};

exports.getTeacherWithRefreshToken = async (req, res) => {
    try {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            return res.status(400).json({ error: 'Refresh token is required.' });
        }

        const teacher = await Teacher.findOne({ refreshToken });
        if (!teacher) {
            return res.status(404).json({ error: 'Teacher not found or refresh token is invalid.' });
        }

        res.status(200).json({ message: 'Teacher found!', teacher });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error. Please try again later.' });
    }
};
