import React, { useState } from "react";
import axios from "axios";
import "./popUps.css";
import { Input } from "@chakra-ui/react";

const EventPopup = ({ onClose, onSave,formData,setFormData } ) => {

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleSubmit = () => {
    // Convert the start_at and end_at to the desired format
    const formattedStartDate = formData.start_at.replace("T", " ") + ":00";
  const formattedEndDate = formData.end_at.replace("T", " ") + ":00";

    // Update formData with the formatted dates
    const FormattedFormData = {
      ...formData,
      start_at: formattedStartDate,
      end_at: formattedEndDate,
    };

    axios
    //   .post("http://localhost:8000/post/eventform", FormattedFormData)
    //   .then((response) => {
    //     console.log(FormattedFormData);
    //     console.log("Event saved:", response.data);
    //     const id = response.data.event_id; // getting the insterted event_id from the backend.

    //     alert("Event Data fetched to database table successfully\n event_id: ",id);
        onSave(); // Trigger the color change
        onClose();
    //   })
    //   .catch((error) => {
    //     console.error("Error saving event:", error);
    //   });
  };

  const eventTypes = [
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
          <label htmlFor="event_name">Name of the event</label>
          <input
            id="event_name"
            name="event_name"
            type="text"
            value={formData.event_name}
            onChange={handleChange}
            placeholder="Event Name"
          />
          <div className="datebox">
            <label htmlFor="start_at">Start</label>
            <Input
              placeholder="Select Date and Time"
              size="md"
              type="datetime-local"
              id="start_at"
              name="start_at"
              value={formData.start_at}
              onChange={handleChange}
            />
            <label htmlFor="end_at">End</label>
            <Input
              placeholder="Select Date and Time"
              size="md"
              type="datetime-local"
              id="end_at"
              name="end_at"
              value={formData.end_at}
              onChange={handleChange}
            />
          </div>
          <label>Type of Event</label>
          <div className="event-type">
            {eventTypes.map((event) => (
              <React.Fragment key={event.id}>
                <input
                  type="radio"
                  id={event.id}
                  name="event_type"
                  value={event.label}
                  checked={formData.event_type === event.label}
                  onChange={handleChange}
                />
                <label htmlFor={event.id}>{event.label}</label>
              </React.Fragment>
            ))}
          </div>
          <div>
            <label htmlFor="assigned_to">Assigned To</label>
            <input
              id="assigned_to"
              name="assigned_to"
              type="text"
              value={formData.assigned_to}
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


export default EventPopup;

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
