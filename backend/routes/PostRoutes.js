const express = require('express');
const router = express.Router();
const PostController = require('../controllers/PostController');

// Define route
router.post('/eventform', PostController.EventForm);
router.post('/eventguest', PostController.GuestForm);
router.post('/participants', PostController.ParticipantsForm);

module.exports = router;
