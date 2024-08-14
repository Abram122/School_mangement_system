const express = require('express');
const router = express.Router();
const studentController = require('../Controllers/userController');
const contactController = require('../Controllers/contactController');
// add new student 
router.post('/students', studentController.createUser);
// get student 
router.get('/get/students', studentController.getAllUsers);
// contanct 
router.post('/contact', contactController.sendContact);
// login
router.post('/login', studentController.login);


module.exports = router;
