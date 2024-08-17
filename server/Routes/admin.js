const express = require('express');
const router = express.Router();
const adminController = require('../Controllers/adminController');
const roomController = require('../Controllers/roomController');
// add new student 
router.post('/verify', adminController.verifyAdmin);
// get all students 
router.post('/check', adminController.checkAdmin);
// add room 
router.post('/room', roomController.createRoom);
// get room by teachername
router.post('/get/room/teacher', roomController.getRoomsByTeacher);


module.exports = router;
