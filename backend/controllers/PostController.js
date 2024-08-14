// eventController.js
const {Eventform,GuestForm,ParticipantsForm}= require("../models/EventPost");

exports.EventForm = (req, res) => {
  const eventData = req.body;
  console.log("Received event data:", eventData);

  Eventform.create(eventData, (err, results) => {
    if (err) {
      console.error("Error creating event:", err);
      return res
        .status(500)
        .json({ error: "Error creating event", details: err.message });
    }
    res.status(201).json({
      message: "Event created successfully",
      event_id: results.insertId,   // to send the id to map the two tabe from the backend to frontend
    });
  });
};
exports.GuestForm = (req, res) => {
  const GuestData = req.body;
  console.log("Received event data:", GuestData);

  GuestForm.create(GuestData, (err, results) => {
    if (err) {
      console.error("Error creating event:", err);
      return res
        .status(500)
        .json({ error: "Error creating event", details: err.message });
    }
    res.status(201).json({
      message: "Guest created successfully",
      guest_id: results.insertId,   // to send the id to map the two tabe from the backend to frontend
    });
  });
};
exports.ParticipantsForm = (req, res) => {
  const ParticipantsData = req.body;
  console.log("Received event data:", ParticipantsData);

  ParticipantsForm.create(ParticipantsData, (err, results) => {
    if (err) {
      console.error("Error creating event:", err);
      return res
        .status(500)
        .json({ error: "Error creating event", details: err.message });
    }
    res.status(201).json({
      message: "Guest created successfully",
      guest_id: results.insertId,   // to send the id to map the two tabe from the backend to frontend
    });
  });
};
