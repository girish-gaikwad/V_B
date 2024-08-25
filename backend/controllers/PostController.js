const {
  Eventform,
  GuestForm,
  ParticipantsForm,
  GuestAccommodationForm,
  GuestTransportForm,
  VenueRegister,
  VenueRequirement,
  invitees,
  combine_accommodation,
  combine_transport,
} = require("../models/EventPost");

exports.EventForm = async (req, res) => {
  const eventData = req.body;
  console.log("Received event data:", eventData);

  try {
    const results = await Eventform.create(eventData);
    res.status(201).json({
      message: "Event created successfully",
      event_id: results.insertId, // Send the ID to map the two tables from backend to frontend
      "Event created with event_code": eventData.event_code,
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
      "Guest created with event_code": GuestData.event_code,
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
      "Participants created with event_code": ParticipantsData.event_code,
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
      "Accommodation created with event_code": AccommodationData.event_code,
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
      "Transport created with event_code": TransportData.event_code,
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
      "VenueRegister created with event_code": VenueRegisterData.event_code,
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
      "VenueRequirement created with event_code":
        VenueRequirementData.event_code,
    });
  } catch (err) {
    console.error("Error creating VenueRequirement:", err);
    res.status(500).json({
      error: "Error creating VenueRequirement",
      details: err.message,
    });
  }
};
exports.invitees = async (req, res) => {
  const inviteesData = req.body;
  console.log("Received invitees data:", inviteesData);

  try {
    const results = await invitees.create(inviteesData);
    res.status(201).json({
      message: "invitees created successfully",
      invitees_id: results.insertId, // Send the ID to map the two tables from backend to frontend
      "invitees created with event_code": inviteesData.event_code,
    });
  } catch (err) {
    console.error("Error creating invitees:", err);
    res.status(500).json({
      error: "Error creating invitees",
      details: err.message,
    });
  }
};
exports.combine_accommodation = async (req, res) => {
  const combineaccommodationData = req.body;
  console.log("Received combine_accommodation data:", combineaccommodationData);

  try {
    const results = await combine_accommodation.create(combineaccommodationData);
    res.status(201).json({
      message: "combine_accommodation created successfully",
      combine_accommodation_id: results.insertId, // Send the ID to map the two tables from backend to frontend
      "combine_accommodation created with event_code": combineaccommodationData.event_code,
    });
  } catch (err) {
    console.error("Error creating combine_accommodation:", err);
    res.status(500).json({
      error: "Error creating combine_accommodation",
      details: err.message,
    });
  }
};
exports.combine_transport = async (req, res) => {
  const combinetransportData = req.body;
  console.log("Received combine_transport data:", combinetransportData);

  try {
    const results = await combine_transport.create(combinetransportData);
    res.status(201).json({
      message: "combine_transport created successfully",
      combine_transport_id: results.insertId, // Send the ID to map the two tables from backend to frontend
      "combine_transport created with event_code": combinetransportData.event_code,
    });
  } catch (err) {
    console.error("Error creating combine_transport:", err);
    res.status(500).json({
      error: "Error creating combine_transport",
      details: err.message,
    });
  }
};
