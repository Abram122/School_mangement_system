const express = require('express');
const router = express.Router();
const adminController = require('../Controllers/adminController');
const roomController = require('../Controllers/roomController');
const teacherController = require('../Controllers/teacherController');
// add new student 
router.post('/verify', adminController.verifyAdmin);
// get all students 
router.post('/check', adminController.checkAdmin);
// add room 
router.post('/room', roomController.createRoom);
// get room by teachername
router.post('/get/room/teacher', roomController.getRoomsByTeacher);
// add teacher
router.post('/add/teacher', teacherController.createTeacher);
// get teachers
router.get('/get/teacher', teacherController.getTeachers);
// delete teacher
router.delete('/delete/teacher/:id', teacherController.deleteTeacher);


module.exports = router;
