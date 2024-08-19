const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required.'],
        trim: true,
        minlength: [3, 'Name must be at least 3 characters long.'],
        maxlength: [50, 'Name cannot exceed 50 characters.'],
        match: [/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces.']
    },
    email: {
        type: String,
        required: [true, 'Email is required.'],
        unique: [true,"this email is already in use"],
        trim: true,
        lowercase: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please enter a valid email address.']
    },
    birthDate: {
        type: Date,
        required: [true, 'Birth date is required.'],
    },
    password: {
        type: String,
        required: [true, 'Password is required.'],
        minlength: [6, 'Password must be at least 6 characters long.'],
        match: [/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/, 'Password must contain at least one letter and one number.']
    },
    profileImage: {
        type: String,
        required: [true, 'Profile image is required.']
    },
    verified: {
        type: String,
        default:''
    },
    token: {
        type: String,
        default: null
    },
    refreshToken: {
        type: String,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};


userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id, name: this.name }, process.env.JWT_SECRET, { expiresIn: '15m' }); // Access token valid for 15 minutes
    return token;
};

userSchema.methods.generateRefreshToken = function () {
    const refreshToken = crypto.randomBytes(40).toString('hex'); // Generate a random refresh token
    return refreshToken;
};
const User = mongoose.model('User', userSchema);

module.exports = User;
