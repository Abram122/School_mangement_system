const express = require('express');
const router = express.Router();
const studentController = require('../Controllers/userController');
const contactController = require('../Controllers/contactController');
const registerController = require('../Controllers/registerController');
const roomController = require('../Controllers/roomController');
// signup 
router.post('/students', studentController.createUser);
// get student 
router.get('/get/students', studentController.getAllUsers);
// get student with refreshToken
router.post('/get/student', studentController.getStudentWithRefreshToken);
// contanct 
router.post('/contact', contactController.sendContact);
// login
router.post('/login', studentController.login);
// register
router.post('/register', registerController.createRegistration);
// get registration by registr ID 
router.post('/get/registeration', registerController.getRegistrationByRId);
// update registration by  ID 
router.put('/update/registeration', registerController.updateRegistration);
// get all registration 
router.get('/get/register', registerController.getAllRegistrations);
// get room with code 
router.post('/get/room', roomController.getRoomsByCode);
// send verification code  
router.post('/verification', studentController.sendVerification);
// check code  
router.post('/check/code', studentController.checkVerificationCode);
// logout  
router.post('/logout', studentController.logout);

module.exports = router;
