const express = require('express');
const router = express.Router();
const adminController = require('../Controllers/adminController');
const testController = require('../Controllers/testController');
// add new student 
router.post('/verify', adminController.verifyAdmin);
// get all students 
router.post('/check', adminController.checkAdmin);


module.exports = router;
