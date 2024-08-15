const express = require('express');
const router = express.Router();
const PostController = require('../controllers/PostController');

// Define route
router.post('/eventform', PostController.EventForm);
router.post('/eventguest', PostController.GuestForm);
router.post('/participants', PostController.ParticipantsForm);
router.post('/guestaccommodation', PostController.GuestAccommodationForm);
router.post('/guesttransport', PostController.GuestTransportForm);
router.post('/venueregister', PostController.VenueRegister);
router.post('/venuerequirement', PostController.VenueRequirement);

module.exports = router;
