const Register = require('../Models/Register'); 

// Create a new registration
exports.createRegistration = async (req, res) => {
    try {
        const newRegistration = new Register(req.body);
        const savedRegistration = await newRegistration.save();
        res.status(201).json(savedRegistration);
    } catch (error) {
        console.error(error);

        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(val => val.message);
            res.status(400).json({ errors });
        } else if (error.code === 11000) {  // Check for duplicate key error
            const field = Object.keys(error.keyPattern)[0];
            const duplicateValue = error.keyValue[field];
            res.status(400).json({
                error: 'This ID already in use go to regstration info page to know more',
                message: `The ${field} '${duplicateValue}' is already in use.`,
                errorResponse: {
                    index: error.index,
                    code: error.code,
                    errmsg: error.message,
                    keyPattern: error.keyPattern,
                    keyValue: error.keyValue,
                }
            });
        } else {
            res.status(500).json({ error: 'Server error. Please try again later.' });
        }
    }
};

// Get all registrations
exports.getAllRegistrations = async (req, res) => {
    try {
        const registrations = await Register.find();
        res.status(200).json(registrations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error. Please try again later.' });
    }
};

// Get a registration by ID
exports.getRegistrationById = async (req, res) => {
    try {
        const registration = await Register.findById(req.params.id);
        if (!registration) {
            return res.status(404).json({ error: 'Registration not found' });
        }
        res.status(200).json(registration);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error. Please try again later.' });
    }
};

exports.getRegistrationByRId = async (req, res) => {
    const {SID} = req.body
    try {
        const registration = await Register.findOne({ SID: SID });
        if (!registration) {
            return res.status(404).json({ error: 'Registration not found' });
        }
        res.status(200).json(registration);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error. Please try again later.' });
    }
};

// Update a registration by ID
exports.updateRegistration = async (req, res) => {
    const { _id, status, reason } = req.body
    try {
        const updatedRegistration = await Register.findById(_id)
        if (!updatedRegistration) {
            return res.status(404).json({ error: 'Registration not found' });
        }
        updatedRegistration.status = status
        updatedRegistration.rejectedResoan = reason
        await updatedRegistration.save()
        res.status(200).json(updatedRegistration);
    } catch (error) {
        console.error(error);
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(val => val.message);
            res.status(400).json({ errors });
        } else {
            res.status(500).json({ error: 'Server error. Please try again later.' });
        }
    }
};

// Delete a registration by ID
exports.deleteRegistration = async (req, res) => {
    try {
        const deletedRegistration = await Register.findByIdAndDelete(req.params.id);
        if (!deletedRegistration) {
            return res.status(404).json({ error: 'Registration not found' });
        }
        res.status(200).json({ message: 'Registration deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error. Please try again later.' });
    }
};
