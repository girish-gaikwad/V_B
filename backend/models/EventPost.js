const db = require("../config/db");
class Eventform {
  static create(eventData) {
    return new Promise((resolve, reject) => {
      const sql =
        "INSERT INTO event(user_id,event_code,event_name,start_at,end_at,event_type,assigned_to) VALUES (?,?,?,?,?,?,?)";
      const values = [
        eventData.user_id,
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
          return reject(err);
        }
        resolve(results, eventData);
      });
    });
  }
}

class GuestForm {
  static create(GuestData) {
    return new Promise((resolve, reject) => {
      const sql =
        "INSERT INTO event_guests(event_code,invitees_id,salutation,first_name,last_name,gender,designation,organization,email,country_code,phone_number) VALUES (?,?,?,?,?,?,?,?,?,?,?)";
      const values = [
        GuestData.event_code,
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
          return reject(err);
        }
        resolve(results, GuestData);
      });
    });
  }
}
class ParticipantsForm {
  static create(ParticipantsData) {
    return new Promise((resolve, reject) => {
      const sql =
        "INSERT INTO event_participants(event_code,invitees_id,internal_count,ex_boys_count,ex_girls_count,male_faculty_count,female_faculty_count,accommodation_status) VALUES (?,?,?,?,?,?,?,?)";
      const values = [
        ParticipantsData.event_code,
        ParticipantsData.invitees_id,
        ParticipantsData.internal_count,
        ParticipantsData.ex_boys_count,
        ParticipantsData.ex_girls_count,
        ParticipantsData.male_faculty_count,
        ParticipantsData.female_faculty_count,
        ParticipantsData.accommodation_status,
      ];
      console.log("Executing query:", sql);
      console.log("With data:", values);

      db.query(sql, values, (err, results) => {
        if (err) {
          console.error("Database error:", err);
          return reject(err);
        }
        resolve(results, ParticipantsData);
      });
    });
  }
}
class GuestAccommodationForm {
  static create(AccommodationData) {
    return new Promise((resolve, reject) => {
      const sql =
        "INSERT INTO guest_accommodation(event_code,arrival_at,departure_at,accommodation_venue) VALUES (?,?,?,?)";
      const values = [
        AccommodationData.event_code,
        AccommodationData.arrival_at,
        AccommodationData.departure_at,
        AccommodationData.accommodation_venue,
      ];
      console.log("Executing query:", sql);
      console.log("With data:", values);
      db.query(sql, values, (err, results) => {
        if (err) {
          console.error("Database error:", err);
          return reject(err);
        }
        resolve(results, AccommodationData);
      });
    });
  }
}
class GuestTransportForm {
  static create(TransportData) {
    return new Promise((resolve, reject) => {
      const sql =
        "INSERT INTO guest_transport(event_code,arrival_at,departure_at,from_place,to_place,r_from_place,r_to_place) VALUES (?,?,?,?,?,?,?)";
      const values = [
        TransportData.event_code,
        TransportData.arrival_at,
        TransportData.departure_at,
        TransportData.from_place,
        TransportData.to_place,
        TransportData.r_from_place,
        TransportData.r_to_place,
      ];
      console.log("Executing query:", sql);
      console.log("With data:", values);
      db.query(sql, values, (err, results) => {
        if (err) {
          console.error("Database error:", err);
          return reject(err);
        }
        resolve(results, TransportData);
      });
    });
  }
}
class VenueRegister {
  static create(VenueRegisterData) {
    return new Promise((resolve, reject) => {
      const sql =
        "INSERT INTO venue_booking(event_code,venue_type,venue_name,venue_place,venue_count,capacity) VALUES (?,?,?,?,?,?)";
      const values = [
        VenueRegisterData.event_code,
        VenueRegisterData.venue_type,
        VenueRegisterData.venue_name,
        VenueRegisterData.venue_place,
        VenueRegisterData.venue_count,
        VenueRegisterData.capacity,
      ];
      console.log("Executing query:", sql);
      console.log("With data:", values);
      db.query(sql, values, (err, results) => {
        if (err) {
          console.error("Database error:", err);
          return reject(err);
        }
        resolve(results, VenueRegisterData);
      });
    });
  }
}
class VenueRequirement {
  static create(VenueRequirementData) {
    return new Promise((resolve, reject) => {
      const sql =
        "INSERT INTO venue_requirement(event_code,venue_id,guest_chair,dais_table,white_board,hand_mic,help_desk,collar_mic,internet,live_stream,biometric_device,photography,videography,large_momento,small_momento,shawl,pen_pencil,scribbling_pad,water_bottle,others) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
      const values = [
        VenueRequirementData.event_code,
        VenueRequirementData.venue_id,
        VenueRequirementData.guest_chair,
        VenueRequirementData.dais_table,
        VenueRequirementData.white_board,
        VenueRequirementData.hand_mic,
        VenueRequirementData.help_desk,
        VenueRequirementData.collar_mic,
        VenueRequirementData.internet,
        VenueRequirementData.live_stream,
        VenueRequirementData.biometric_device,
        VenueRequirementData.photography,
        VenueRequirementData.videography,
        VenueRequirementData.large_momento,
        VenueRequirementData.small_momento,
        VenueRequirementData.shawl,
        VenueRequirementData.pen_pencil,
        VenueRequirementData.scribbling_pad,
        VenueRequirementData.water_bottle,
        VenueRequirementData.others,
      ];
      console.log("Executing query:", sql);
      console.log("With data:", values);
      db.query(sql, values, (err, results) => {
        if (err) {
          console.error("Database error:", err);
          return reject(err);
        }
        resolve(results, VenueRequirementData);
      });
    });
  }
}
class invitees {
  static create(inviteesData) {
    return new Promise((resolve, reject) => {
      const sql = "INSERT INTO invitees(event_code,guest_count) VALUES (?,?)";
      const values = [
        inviteesData.event_code,
        inviteesData.guest_count,
      ];
      console.log("Executing query:", sql);
      console.log("With data:", values);
      db.query(sql, values, (err, results) => {
        if (err) {
          console.error("Database error:", err);
          return reject(err);
        }
        resolve(results, inviteesData);
      });
    });
  }
}
class combine_accommodation {
  static create(combineaccommodationData) {
    return new Promise((resolve, reject) => {
      const sql = "INSERT INTO combine_accommodation(event_code,guest_id,accommodation_id) VALUES (?,?,?)";
      const values = [
        combineaccommodationData.event_code,
        combineaccommodationData.guest_id,
        combineaccommodationData.accommodation_id,
      ];
      console.log("Executing query:", sql);
      console.log("With data:", values);
      db.query(sql, values, (err, results) => {
        if (err) {
          console.error("Database error:", err);
          return reject(err);
        }
        resolve(results, combineaccommodationData);
      });
    });
  }
}
class combine_transport {
  static create(combinetransportData) {
    return new Promise((resolve, reject) => {
      const sql = "INSERT INTO combine_transport(event_code,guest_id,transport_id) VALUES (?,?,?)";
      const values = [
        combinetransportData.event_code,
        combinetransportData.guest_id,
        combinetransportData.transport_id,
      ];
      console.log("Executing query:", sql);
      console.log("With data:", values);
      db.query(sql, values, (err, results) => {
        if (err) {
          console.error("Database error:", err);
          return reject(err);
        }
        resolve(results, combinetransportData);
      });
    });
  }
}

module.exports = {
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
};
