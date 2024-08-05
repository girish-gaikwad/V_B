const db = require('../config/db');

const Event = {};

Event.getAll = (callback) => {
  const query = 'SELECT id, code, name, fromtime, totime, fromdate, todate, status FROM event';
  db.query(query, (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results);
  });
};

module.exports = Event;
