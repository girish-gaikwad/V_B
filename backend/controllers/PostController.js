const { Eventform, GuestForm, ParticipantsForm, GuestAccommodationForm, GuestTransportForm,VenueRegister,VenueRequirement} = require("../models/EventPost");

exports.EventForm = async (req, res) => {
  const eventData = req.body;
  console.log("Received event data:", eventData);

  try {
    const results = await Eventform.create(eventData);
    res.status(201).json({
      message: "Event created successfully",
      event_id: results.insertId, // Send the ID to map the two tables from backend to frontend
    });
  } catch (err) {
    console.error("Error creating event:", err);
    res.status(500).json({
      error: "Error creating event",
      details: err.message,
    });
  }
};

exports.GuestForm = async (req, res) => {
  const GuestData = req.body;
  console.log("Received Guest data:", GuestData);

  try {
    const results = await GuestForm.create(GuestData);
    res.status(201).json({
      message: "Guest created successfully",
      guest_id: results.insertId, // Send the ID to map the two tables from backend to frontend
    });
  } catch (err) {
    console.error("Error creating Guest:", err);
    res.status(500).json({
      error: "Error creating Guest",
      details: err.message,
    });
  }
};

exports.ParticipantsForm = async (req, res) => {
  const ParticipantsData = req.body;
  console.log("Received Participant data:", ParticipantsData);

  try {
    const results = await ParticipantsForm.create(ParticipantsData);
    res.status(201).json({
      message: "Participant created successfully",
      Participant_id: results.insertId, // Send the ID to map the two tables from backend to frontend
    });
  } catch (err) {
    console.error("Error creating Participant:", err);
    res.status(500).json({
      error: "Error creating Participant",
      details: err.message,
    });
  }
};

exports.GuestAccommodationForm = async (req, res) => {
  const AccommodationData = req.body;
  console.log("Received GuestAccommodation data:", AccommodationData);

  try {
    const results = await GuestAccommodationForm.create(AccommodationData);
    res.status(201).json({
      message: "GuestAccommodation created successfully",
      Accommodation_id: results.insertId, // Send the ID to map the two tables from backend to frontend
    });
  } catch (err) {
    console.error("Error creating GuestAccommodation:", err);
    res.status(500).json({
      error: "Error creating GuestAccommodation",
      details: err.message,
    });
  }
};

exports.GuestTransportForm = async (req, res) => {
  const TransportData = req.body;
  console.log("Received GuestTransport data:", TransportData);

  try {
    const results = await GuestTransportForm.create(TransportData);
    res.status(201).json({
      message: "GuestTransport created successfully",
      Transport_id: results.insertId, // Send the ID to map the two tables from backend to frontend
    });
  } catch (err) {
    console.error("Error creating GuestTransport:", err);
    res.status(500).json({
      error: "Error creating GuestTransport",
      details: err.message,
    });
  }
};
exports.VenueRegister = async (req, res) => {
  const VenueRegisterData = req.body;
  console.log("Received Venue data:", VenueRegisterData);

  try {
    const results = await VenueRegister.create(VenueRegisterData);
    res.status(201).json({
      message: "Venue created successfully",
      VenueBooking_id: results.insertId, // Send the ID to map the two tables from backend to frontend
    });
  } catch (err) {
    console.error("Error creating Venue:", err);
    res.status(500).json({
      error: "Error creating Venue",
      details: err.message,
    });
  }
};
exports.VenueRequirement = async (req, res) => {
  const VenueRequirementData = req.body;
  console.log("Received VenueRequirement data:", VenueRequirementData);

  try {
    const results = await VenueRequirement.create(VenueRequirementData);
    res.status(201).json({
      message: "VenueRequirement created successfully",
      VenueRequirement_id: results.insertId, // Send the ID to map the two tables from backend to frontend
    });
  } catch (err) {
    console.error("Error creating VenueRequirement:", err);
    res.status(500).json({
      error: "Error creating VenueRequirement",
      details: err.message,
    });
  }
};
