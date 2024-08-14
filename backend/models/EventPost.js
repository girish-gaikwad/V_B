const db = require("../config/db");

class Eventform {
  static create(eventData, callback) {
    const sql = "INSERT INTO event(user_id,event_code,event_name,start_at,end_at,event_type,assigned_to) VALUES (1,?,?,?,?,?,?)";
    const values = [
        eventData.event_code,
        eventData.event_name,
        eventData.start_at,
        eventData.end_at,
        eventData.event_type,
        eventData.assigned_to,
      ];
    console.log("Executing query:", sql);
    console.log("With data:", values);
    db.query(sql, values, (err, results) => {
      if (err) {
        console.error("Database error:", err);
        return callback(err, null);
      }
      callback(null, results);
    });
  }
}
class GuestForm {
  static create(GuestData, callback) {
    const sql = "INSERT INTO event_guests(invitees_id,salutation,first_name,last_name,gender,designation,organization,email,country_code,phone_number) VALUES (?,?,?,?,?,?,?,?,?,?)";
    const values = [
        GuestData.invitees_id,
        GuestData.salutation,
        GuestData.first_name,
        GuestData.last_name,
        GuestData.gender,
        GuestData.designation,
        GuestData.organization,
        GuestData.email,
        GuestData.country_code,
        GuestData.phone_number,
      ];
    console.log("Executing query:", sql);
    console.log("With data:", values);
    db.query(sql, values, (err, results) => {
      if (err) {
        console.error("Database error:", err);
        return callback(err, null);
      }
      callback(null, results);
    });
  }
}
class ParticipantsForm {
  static create(ParticipantsData, callback) {
    const sql = "INSERT INTO event_guests(invitees_id,salutation,first_name,last_name,gender,designation,organization,email,country_code,phone_number) VALUES (?,?,?,?,?,?,?,?,?,?)";
    const values = [
        ParticipantsData.invitees_id,
        ParticipantsData.salutation,
        ParticipantsData.first_name,
        ParticipantsData.last_name,
        ParticipantsData.gender,
        ParticipantsData.designation,
        ParticipantsData.organization,
        ParticipantsData.email,
        ParticipantsData.country_code,
        ParticipantsData.phone_number,
      ];
    console.log("Executing query:", sql);
    console.log("With data:", values);
    db.query(sql, values, (err, results) => {
      if (err) {
        console.error("Database error:", err);
        return callback(err, null);
      }
      callback(null, results);
    });
  }
}

module.exports = {Eventform,GuestForm,ParticipantsForm};
