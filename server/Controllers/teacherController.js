const Teacher = require('../Models/Teacher');

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
