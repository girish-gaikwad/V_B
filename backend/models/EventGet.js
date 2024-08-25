const db = require('../config/db');

const Event = {};

Event.getAll = (callback) => {
  const query = 'SELECT event_code, event_name, start_at, end_at, status FROM event';
  db.query(query, (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results);
  });
};

module.exports = Event;
