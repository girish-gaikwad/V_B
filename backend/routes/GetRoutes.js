const express = require('express');
const router = express.Router();
const eventController = require('../controllers/GetController');

// Define route
router.get('/eventdata', eventController.getAllEvents);

module.exports = router;
