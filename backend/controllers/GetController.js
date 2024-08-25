const Event = require('../models/EventGet');

exports.getAllEvents = (req, res) => {
  Event.getAll((err, events) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(events);
  });
};
