const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // For hashing passwords

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
        // No match regex needed for Date type.
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
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Pre-save hook to hash the password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
