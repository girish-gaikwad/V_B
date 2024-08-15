import React, { useState } from "react";
import axios from "axios";
import "../Style/Popups.css";
import { Input } from "@chakra-ui/react";

const EventPopup = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    event_name: "",
    start_date: "",
    end_date: "",
    event_type: "",
    assigned_to: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = () => {
    // axios
    //   .post("http://localhost:8000/event-booking/event", { eventName })
    //   .then((response) => {
    //     console.log("Event saved:", response.data);
    onSave(); // Trigger the color change
    onClose();
    // })
    // .catch((error) => {
    //   console.error("Error saving event:", error);
    // });
  };
  const eventtype = [
    { id: 1, label: "Seminar" },
    { id: 2, label: "Webinar" },
    { id: 3, label: "Conference" },
    { id: 4, label: "College visit" },
    { id: 5, label: "Symposium" },
    { id: 6, label: "Meetings" },
    { id: 7, label: "Guest Lectures" },
    { id: 8, label: "Others" },
  ];
  return (
    <div className="popup-overlay">
      <div
        className="popup-content"
        onClick={(e) => e.stopPropagation()}
        style={{ width: "40%", height: "68%" }}
      >
        <h2>Register an Event</h2>
        <form className="event-form">
          <label for="eventname">Name of the event</label>
          <input
            id="eventname"
            type="text"
            // value={eventName}
            onChange={handleChange}
            placeholder="Event Name"
          />
          <div className="datebox">
            <label for="start">Start</label>
            <Input
              id="start"
              placeholder="DD-MM-YYYY hh:mm AM/PM"
              size="md"
              type="datetime-local"
              onChange={handleChange}
            />
            <label for="end">End</label>
            <Input
              id="end"
              placeholder="DD-MM-YYYY hh:mm AM/PM"
              size="md"
              type="datetime-local"
              onChange={handleChange}
            />
          </div>
          <label>Type of Event</label>
          <div className="event-type">
            {eventtype.map((event) => (
              <React.Fragment key={event.id}>
                <input
                  type="radio"
                  id={event.id}
                  name="eventtype"
                  // value={event.label}
                  onChange={handleChange}
                />
                <label htmlFor={event.id}>{event.label}</label>
              </React.Fragment>
            ))}
          </div>
          <div>
            <label for="assigned">Assigned To</label>
            <input
              id="assigned"
              type="text"
              // value={eventName}
              onChange={handleChange}
              placeholder="Team Involved"
            />
          </div>
        </form>

        <div className="popup-buttons">
          <button onClick={handleSubmit}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

const GuestPopup = ({ onClose, onSave }) => {
  const [eventName, setEventName] = useState("");

  const handleSubmit = () => {
    // axios
    //   .post("http://localhost:8000/event-booking/event", { eventName })
    //   .then((response) => {
    //     console.log("Event saved:", response.data);
    onSave(); // Trigger the color change
    onClose();
    // })
    // .catch((error) => {
    //   console.error("Error saving event:", error);
    // });
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <h2>Guest Details</h2>
        <input
          type="text"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          placeholder="Enter Event Name"
        />
        <div className="popup-buttons">
          <button onClick={handleSubmit}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

const ParticipantsPopup = ({ onClose, onSave }) => {
  const [eventName, setEventName] = useState("");

  const handleSubmit = () => {
    // axios
    //   .post("http://localhost:8000/event-booking/event", { eventName })
    //   .then((response) => {
    //     console.log("Event saved:", response.data);
    onSave(); // Trigger the color change
    onClose();
    // })
    // .catch((error) => {
    //   console.error("Error saving event:", error);
    // });
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <h2>Participants Details</h2>
        <input
          type="text"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          placeholder="Enter Event Name"
        />
        <div className="popup-buttons">
          <button onClick={handleSubmit}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

const AccomodationPopup = ({ onClose, onSave }) => {
  const [eventName, setEventName] = useState("");

  const handleSubmit = () => {
    // axios
    //   .post("http://localhost:8000/event-booking/event", { eventName })
    //   .then((response) => {
    //     console.log("Event saved:", response.data);
    onSave(); // Trigger the color change
    onClose();
    // })
    // .catch((error) => {
    //   console.error("Error saving event:", error);
    // });
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <h2>Accomodation Details</h2>
        <input
          type="text"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          placeholder="Enter Event Name"
        />
        <div className="popup-buttons">
          <button onClick={handleSubmit}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};
const TransportPopup = ({ onClose, onSave }) => {
  const [eventName, setEventName] = useState("");

  const handleSubmit = () => {
    // axios
    //   .post("http://localhost:8000/event-booking/event", { eventName })
    //   .then((response) => {
    //     console.log("Event saved:", response.data);
    onSave(); // Trigger the color change
    onClose();
    // })
    // .catch((error) => {
    //   console.error("Error saving event:", error);
    // });
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <h2>Transport Details</h2>
        <input
          type="text"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          placeholder="Enter Event Name"
        />
        <div className="popup-buttons">
          <button onClick={handleSubmit}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};
const VenuePopup = ({ onClose, onSave }) => {
  const [eventName, setEventName] = useState("");

  const handleSubmit = () => {
    // axios
    //   .post("http://localhost:8000/event-booking/event", { eventName })
    //   .then((response) => {
    //     console.log("Event saved:", response.data);
    onSave(); // Trigger the color change
    onClose();
    // })
    // .catch((error) => {
    //   console.error("Error saving event:", error);
    // });
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <h2>Venue Details</h2>
        <input
          type="text"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          placeholder="Enter Event Name"
        />
        <div className="popup-buttons">
          <button onClick={handleSubmit}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};
const VenueRequirementPopup = ({ onClose, onSave }) => {
  const [eventName, setEventName] = useState("");

  const handleSubmit = () => {
    // axios
    //   .post("http://localhost:8000/event-booking/event", { eventName })
    //   .then((response) => {
    //     console.log("Event saved:", response.data);
    onSave(); // Trigger the color change
    onClose();
    // })
    // .catch((error) => {
    //   console.error("Error saving event:", error);
    // });
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <h2>VenueRequirements Details</h2>
        <input
          type="text"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          placeholder="Enter Event Name"
        />
        <div className="popup-buttons">
          <button onClick={handleSubmit}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export {
  EventPopup,
  GuestPopup,
  ParticipantsPopup,
  AccomodationPopup,
  TransportPopup,
  VenuePopup,
  VenueRequirementPopup,
};
