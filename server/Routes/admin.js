const express = require('express');
const router = express.Router();
const adminController = require('../Controllers/adminController');
const roomController = require('../Controllers/roomController');
const teacherController = require('../Controllers/teacherController');
const upload = require('../middleware/Uploads')
// add new admin 
router.post('/admin', adminController.createAdmin);
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
// admin login
router.post('/admin/login', adminController.login);
// teacher login
router.post('/teacher/login', teacherController.login);
// verifiy admin 
router.post('/admin/verify', adminController.getAdminWithRefreshToken);
// verifiy teacher 
router.post('/teacher/verify', teacherController.getTeacherWithRefreshToken);
// add assignment 
router.post('/add/assignment/:roomId', roomController.addAssignmentToRoom);
// add comment 
router.post('/add/comment/:roomId', roomController.addCommentToRoom);
// add response 
router.post('/add/response/:roomId', roomController.addResponseToComment);
// add material 
router.post('/add/material/:roomId',upload, roomController.addMaterialToRoom);

module.exports = router;
