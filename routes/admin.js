const express = require('express');
const router = express.Router();
const {createAdmin,adminLogin,createEvent} = require('../controllers/eventController');
const Auth = require('../middleware/adminAuth');

// Admin Routes.....
router.post('/login', adminLogin);
router.post('/create', Auth, createAdmin);
router.post('/add/event', Auth, createEvent);

module.exports = router