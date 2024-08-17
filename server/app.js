require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const studentRoutes = require('./Routes/user');
const adminRoutes = require('./Routes/admin');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = process.env.PORT ;

// Connect to MongoDB
mongoose.connect('mongodb+srv://Abram:12345@cluster0.eyraldj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(-1);
});

// Middleware for JSON parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000', 
    credentials: true 
}));
// Routes
app.use('/user', studentRoutes);
app.use('/admin', adminRoutes);

// Serve uploaded images statically
app.use(express.static('public'))

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'خطأ في الخادم الداخلي', error: err.message });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
