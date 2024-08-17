const express = require('express');
const router = express.Router();
const studentController = require('../Controllers/userController');
const contactController = require('../Controllers/contactController');
const registerController = require('../Controllers/registerController');
// signup 
router.post('/students', studentController.createUser);
// get student 
router.get('/get/students', studentController.getAllUsers);
// contanct 
router.post('/contact', contactController.sendContact);
// login
router.post('/login', studentController.login);
// register
router.post('/register', registerController.createRegistration);
// get all registration 
router.get('/get/register', registerController.getAllRegistrations);

module.exports = router;
