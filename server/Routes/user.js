// routes/studentRoutes.js
const express = require('express');
const router = express.Router();
const studentController = require('../Controllers/userController');
const contactController = require('../Controllers/contactController');
// add new student 
router.post('/students', studentController.createUser);
router.get('/get/students', studentController.getAllUsers);
router.post('/contact', contactController.sendContact);

module.exports = router;
