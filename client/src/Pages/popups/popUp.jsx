import React, { useState } from "react";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import "./popUps.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Input } from "@chakra-ui/react";
import {
  Slider,
  Button,
  Checkbox,
  Typography,
  Tooltip,
  TextField,
  FormControlLabel,
  IconButton,
} from "@mui/material";

import {
  Card,
  Box,
  Grid,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  InputAdornment,
  MenuItem,
  DialogActions,
} from "@mui/material";
import { useSwipeable } from "react-swipeable";
import { styled } from "@mui/system";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { IoPersonAddOutline } from "react-icons/io5";
import { HiOutlineXMark } from "react-icons/hi2";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const CardStack = styled("div")({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  width: "100%",
  "& > div": {
    position: "absolute",
    transition: "transform 0.3s ease",
  },
});

const ListItem = ({
  item,
  onPrev,
  onNext,
  onAdd,
  onDelete,
  onInputChange,
  handleChangeColor,
  handleClose,
}) => {
  return (
    <Card
      sx={{
        paddingLeft: "20px",
        paddingRight: "20px",
        paddingTop: "50px",
        maxWidth: "800px",
        height: "510px",
        boxShadow: 3,
        borderRadius: 2,
        // border: "solid black",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          // border: 'solid black',
          position: "absolute",
          left: "66%",
          top: "1%",
          padding: "0 10px",
        }}
      >
        <FormLabel sx={{ flexShrink: 0, width: "90px" }}>Guest Count</FormLabel>
        <p style={{ margin: "0 20px" }}> {item.id}</p>
        <IoPersonAddOutline
          onClick={onAdd}
          style={{
            width: "20px",
            height: "20px",
            cursor: "pointer",
            marginRight: "10px",
          }}
        />
        <HiOutlineXMark
          onClick={onDelete}
          style={{ width: "20px", height: "20px", cursor: "pointer" }}
        />
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={2}>
          <FormControl fullWidth>
            <FormLabel>Salutation</FormLabel>
            <TextField
              placeholder="Eg: Mr"
              variant="outlined"
              value={item.salutation}
              onChange={(e) => onInputChange("salutation", e.target.value)}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth>
            <FormLabel>First Name</FormLabel>
            <TextField
              placeholder="Eg: RIYA"
              variant="outlined"
              value={item.firstName}
              onChange={(e) => onInputChange("firstName", e.target.value)}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth>
            <FormLabel>Last Name</FormLabel>
            <TextField
              placeholder="Eg: K"
              variant="outlined"
              value={item.lastName}
              onChange={(e) => onInputChange("lastName", e.target.value)}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={12}>
          <FormControl component="fieldset" fullWidth>
            <FormLabel>Gender</FormLabel>
            <RadioGroup
              row
              value={item.gender}
              onChange={(e) => onInputChange("gender", e.target.value)}
            >
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel
                value="others"
                control={<Radio />}
                label="Others"
              />
            </RadioGroup>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={6}>
          <FormControl fullWidth>
            <FormLabel>Designation</FormLabel>
            <TextField
              select
              variant="outlined"
              value={item.designation}
              onChange={(e) => onInputChange("designation", e.target.value)}
            >
              <MenuItem value="software-developer">Software Developer</MenuItem>
              <MenuItem value="manager">Manager</MenuItem>
              <MenuItem value="designer">Designer</MenuItem>
            </TextField>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={6}>
          <FormControl fullWidth>
            <FormLabel>Organization</FormLabel>
            <TextField
              placeholder="Eg: KTC Private Limited"
              variant="outlined"
              value={item.organization}
              onChange={(e) => onInputChange("organization", e.target.value)}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={12}>
          <FormControl fullWidth>
            <FormLabel>Email</FormLabel>
            <TextField
              placeholder="Eg: John@gmail.com"
              variant="outlined"
              value={item.email}
              onChange={(e) => onInputChange("email", e.target.value)}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={2.2}>
          <FormControl fullWidth>
            <FormLabel>Country Code</FormLabel>
            <TextField
              placeholder="Eg: +91"
              variant="outlined"
              value={item.countryCode}
              onChange={(e) => onInputChange("countryCode", e.target.value)}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth>
            <FormLabel>Phone Number</FormLabel>
            <TextField
              placeholder="Eg: 9866587745"
              variant="outlined"
              value={item.phoneNumber}
              onChange={(e) => onInputChange("phoneNumber", e.target.value)}
            />
          </FormControl>
        </Grid>
      </Grid>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <DialogActions>
          <IconButton onClick={onNext}>
            <FaArrowLeft />
          </IconButton>
          <IconButton onClick={onPrev}>
            <FaArrowRight />
          </IconButton>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleChangeColor} color="primary">
            Change Color
          </Button>
        </DialogActions>
      </Box>
    </Card>
  );
};

const EventPopup = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    user_id: 1,
    event_code: "IT1002",
    event_name: "",
    start_at: "",
    end_at: "",
    event_type: "",
    assigned_to: "",
  });

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

        alert(
          "Event Data fetched to database table successfully\n event_id: "  
        );
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

// export default EventPopup;

const GuestPopup = ({ onClose, onSave }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + cards.length) % cards.length
    );
  };

  const [cards, setCards] = useState([
    {
      id: 1,
      salutation: "",
      firstName: "",
      lastName: "",
      gender: "",
      designation: "",
      organization: "",
      email: "",
      countryCode: "",
      phoneNumber: "",
    },
  ]);
  const handleAdd = () => {
    const newCard = {
      id: cards.length + 1,
      salutation: "",
      firstName: "",
      lastName: "",
      gender: "",
      designation: "",
      organization: "",
      email: "",
      countryCode: "",
      phoneNumber: "",
    };
    const newCards = [...cards];
    newCards.splice(currentIndex + 1, 0, newCard);
    setCards(newCards);
  };

  const handleDelete = () => {
    if (cards.length === 1) return; // Prevent deleting the last card
    const newCards = cards.filter((_, index) => index !== currentIndex);
    setCards(newCards);
    setCurrentIndex((prevIndex) =>
      prevIndex >= newCards.length ? 0 : prevIndex
    );
  };

  const handleInputChange = (id, field, value) => {
    const newCards = cards.map((card) =>
      card.id === id ? { ...card, [field]: value } : card
    );
    setCards(newCards);
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

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
      <div
        className=""
        style={{
          backgroundColor: "transparent",
          display: "flex",
          justifyContent: "center",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            width: "700px",
            height: "500px",
          }}
        >
          <CardStack {...swipeHandlers}>
            {cards.map((item, index) => (
              <Box
                key={item.id}
                sx={{
                  transform: `translateX(${
                    (currentIndex - index) * 40
                  }px) scale(${index === currentIndex ? 1 : 0.95})`,
                  zIndex: cards.length - Math.abs(currentIndex - index),
                  opacity: currentIndex === index ? 1 : 0.5,
                  transition: "transform 0.3s ease, opacity 0.3s ease",
                }}
              >
                <ListItem
                  item={item}
                  onPrev={handlePrev}
                  onNext={handleNext}
                  onAdd={handleAdd}
                  onDelete={handleDelete}
                  handleChangeColor={handleSubmit}
                  handleClose={onClose}
                  onInputChange={(field, value) =>
                    handleInputChange(item.id, field, value)
                  } // Corrected
                />
              </Box>
            ))}
          </CardStack>
        </Box>

        {/* <div className="popup-buttons">
          <button onClick={handleSubmit}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div> */}
      </div>
    </div>
  );
};

const ParticipantsPopup = ({ onClose, onSave }) => {
  const [internalParticipants, setInternalParticipants] = useState(0);
  const [externalParticipants, setExternalParticipants] = useState(0);
  const [girlsCount, setGirlsCount] = useState(0);
  const [maleFacultyCount, setMaleFacultyCount] = useState(0);
  const [femaleFacultyCount, setFemaleFacultyCount] = useState(0);
  const [accommodation, setAccommodation] = useState(false);

  const handleSliderChange = (setter) => (event, newValue) => {
    setter(newValue);
  };

  const handleInputChange = (setter) => (event) => {
    setter(event.target.value === "" ? 0 : Number(event.target.value));
  };

  const handleBlur = (value, setter) => () => {
    if (value < 0) {
      setter(0);
    }
  };

  const handleAccommodationChange = () => {
    setAccommodation(!accommodation);
  };

  const renderSlider = (label, value, setter) => (
    <div style={{ marginBottom: "10px" }}>
      <label>{label}</label>
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <Slider
          value={value}
          onChange={handleSliderChange(setter)}
          aria-labelledby={`${label.toLowerCase().replace(/\s/g, "-")}-slider`}
          min={0}
          max={100}
          step={1}
          style={{ flexGrow: 1 }}
          valueLabelDisplay="auto"
        />
        <IconButton
          style={{
            borderRadius: "8px",
            border: "none",
            width: "30px",
            height: "30px",
          }}
          aria-label="decrease"
          onClick={() => setter(Math.max(0, value - 1))}
        >
          <RemoveIcon />
        </IconButton>
        <TextField
          value={value}
          onChange={handleInputChange(setter)}
          onBlur={handleBlur(value, setter)}
          style={{ width: 70 }}
          inputProps={{
            step: 1,
            min: 0,
            type: "number",
            style: { MozAppearance: "textfield" },
          }}
          InputProps={{
            inputProps: { min: 0, style: { MozAppearance: "textfield" } },
            sx: {
              "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
                WebkitAppearance: "none",
                margin: 0,
              },
              "&[type=number]": {
                MozAppearance: "textfield",
              },
            },
          }}
        />
        <IconButton
          style={{
            borderRadius: "8px",
            border: "none",
            width: "30px",
            height: "30px",
          }}
          aria-label="increase"
          onClick={() => setter(value + 1)}
        >
          <AddIcon />
        </IconButton>
      </div>
    </div>
  );

  const renderCounter = (label, value, setter) => (
    <div
      style={{
        marginBottom: "10px",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <label>{label}</label>
      <div
        style={{
          display: "flex",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "10px",
        }}
      >
        <IconButton
          style={{
            borderRadius: "8px",
            border: "none",
            width: "30px",
            height: "30px",
          }}
          aria-label="decrease"
          onClick={() => setter(Math.max(0, value - 1))}
        >
          <RemoveIcon />
        </IconButton>
        <TextField
          value={value}
          onChange={handleInputChange(setter)}
          onBlur={handleBlur(value, setter)}
          style={{ width: 50, margin: "0 10px" }}
          inputProps={{
            step: 1,
            min: 0,
            type: "number",
            style: { MozAppearance: "textfield" },
          }}
          InputProps={{
            inputProps: { min: 0, style: { MozAppearance: "textfield" } },
            sx: {
              "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
                WebkitAppearance: "none",
                margin: 0,
              },
              "&[type=number]": {
                MozAppearance: "textfield",
              },
            },
          }}
        />
        <IconButton
          style={{
            borderRadius: "8px",
            border: "none",
            width: "30px",
            height: "30px",
          }}
          aria-label="increase"
          onClick={() => setter(value + 1)}
        >
          <AddIcon />
        </IconButton>
      </div>
    </div>
  );

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
      <div
        className="popup-content"
        style={{ width: "30%" }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2>Participants Details</h2>

        <>
          <Typography variant="h5" gutterBottom>
            Participants Count
          </Typography>

          {renderSlider(
            "Count of Internal Participants",
            internalParticipants,
            setInternalParticipants
          )}
          {renderSlider(
            "Count of External Participants",
            externalParticipants,
            setExternalParticipants
          )}
          {renderSlider("Count of Girls", girlsCount, setGirlsCount)}
          <div style={{ display: "flex", gap: "10%" }}>
            {renderCounter(
              "Count of Male Faculty",
              maleFacultyCount,
              setMaleFacultyCount
            )}
            {renderCounter(
              "Count of Female Faculty",
              femaleFacultyCount,
              setFemaleFacultyCount
            )}
          </div>

          <FormControlLabel
            control={
              <Checkbox
                checked={accommodation}
                onChange={handleAccommodationChange}
                color="primary"
              />
            }
            label="Accommodation for external participants"
            style={{ marginBottom: "10px" }}
          />
        </>
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
  const [venueCount, setVenueCount] = useState(0);
  const [participantsCount, setParticipantsCount] = useState(0);
  const [venueType, setVenueType] = useState("Classrooms");

  const handleSliderChange = (setter) => (event, newValue) => {
    setter(newValue);
  };

  const handleInputChange = (setter) => (event) => {
    setter(event.target.value === "" ? 0 : Number(event.target.value));
  };

  const handleBlur = (value, setter) => () => {
    if (value < 0) {
      setter(0);
    }
  };

  const handleIncrement = (setter, value) => () => {
    setter(value + 1);
  };

  const handleDecrement = (setter, value) => () => {
    if (value > 0) {
      setter(value - 1);
    }
  };

  const handleVenueTypeChange = (type) => {
    setVenueType(type);
  };

  const renderSliderWithCounter = (label, value, setter) => (
    <div style={{ marginBottom: "20px" }}>
      <Typography variant="subtitle1">{label}</Typography>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <Slider
          value={value}
          onChange={handleSliderChange(setter)}
          aria-labelledby={`${label.toLowerCase().replace(/\s/g, "-")}-slider`}
          min={0}
          max={100}
          step={1}
          style={{ flexGrow: 1 }}
          valueLabelDisplay="auto"
        />
        <IconButton onClick={handleDecrement(setter, value)}>
          <RemoveIcon />
        </IconButton>
        <TextField
          value={value}
          onChange={handleInputChange(setter)}
          onBlur={handleBlur(value, setter)}
          style={{ width: 70 }}
          inputProps={{
            step: 1,
            min: 0,
            type: "number",
            style: { MozAppearance: "textfield" },
          }}
          InputProps={{
            inputProps: { min: 0, style: { MozAppearance: "textfield" } },
            sx: {
              "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
                WebkitAppearance: "none",
                margin: 0,
              },
              "&[type=number]": {
                MozAppearance: "textfield",
              },
            },
          }}
        />
        <IconButton onClick={handleIncrement(setter, value)}>
          <AddIcon />
        </IconButton>
      </div>
    </div>
  );

  const renderVenueTypeButton = (type, label) => (
    <Tooltip title={label} key={type}>
      <div
        onClick={() => handleVenueTypeChange(type)}
        style={{
          padding: "10px 15px",
          margin: "0 5px",
          cursor: "pointer",
          borderRadius: "4px",
          backgroundColor: venueType === type ? "#3f51b5" : "#f0f0f0",
          color: venueType === type ? "white" : "black",
          textAlign: "center",
        }}
      >
        {label}
      </div>
    </Tooltip>
  );

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
      <div
        className="popup-content"
        style={{ width: "30%", height: "50%" }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2>Venue Details</h2>
        {renderSliderWithCounter("Venue Count", venueCount, setVenueCount)}
        <Typography variant="subtitle1">Venue Type</Typography>
        <div style={{ display: "flex", marginBottom: "20px" }}>
          {renderVenueTypeButton("Classrooms", "Classrooms")}
          {renderVenueTypeButton("Seminar Hall", "Seminar Hall")}
          {renderVenueTypeButton("Auditorium", "Auditorium")}
          {renderVenueTypeButton("Labs", "Labs")}
        </div>
        {renderSliderWithCounter(
          "Total Count of Participants",
          participantsCount,
          setParticipantsCount
        )}
        <div className="popup-buttons">
          <button onClick={handleSubmit}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};
const VenueRequirementPopup = ({ onClose, onSave }) => {
  const TickIcon = () => (
    <svg
      width="35"
      height="35"
      viewBox="0 0 75 75"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M75 37.5C75 55.1775 75 64.0166 69.5081 69.5081C64.0166 75 55.1775 75 37.5 75C19.8223 75 10.9835 75 5.49176 69.5081C-1.54171e-06 64.0166 -9.4353e-07 55.1775 -6.41247e-07 37.5C-3.3896e-07 19.8223 -6.34851e-07 10.9835 5.49176 5.49176C10.9835 -2.59218e-07 19.8223 3.3896e-07 37.5 6.41247e-07C55.1775 9.4353e-07 64.0166 6.47644e-07 69.5081 5.49176C75 10.9835 75 19.8223 75 37.5ZM57.9544 18.3879C59.19 19.3292 59.4285 21.0939 58.4872 22.3295L32.7727 56.0794C32.2609 56.7514 31.4737 57.1579 30.6292 57.186C29.785 57.2141 28.9726 56.8613 28.417 56.2245L16.6313 42.7245C15.6097 41.5545 15.7302 39.7778 16.9003 38.7562C18.0705 37.7347 19.8472 37.8551 20.8687 39.0255L30.3874 49.9286L54.0128 18.9205C54.9544 17.685 56.7191 17.4465 57.9544 18.3879Z"
        fill="url(#paint0_linear_1687_8254)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_1687_8254"
          x1="37.5"
          y1="6.41247e-07"
          x2="37.5"
          y2="75"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.00666656" stopColor="#639365" />
          <stop offset="1" stopColor="#25C03E" stopOpacity="0.92" />
        </linearGradient>
      </defs>
    </svg>
  );

  const theme = createTheme({
    palette: {
      customColor: {
        main: "#2B3674",
      },
    },
  });

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

  const [selectedContent, setSelectedContent] = useState([]);

  const handleClick = (item) => {
    setSelectedContent((prevSelectedContent) => {
      if (prevSelectedContent.includes(item.name)) {
        return prevSelectedContent.filter((content) => content !== item.name);
      } else {
        return [...prevSelectedContent, item.name];
      }
    });
  };

  const items = [
    { name: "Guest chair", image: "/images/image.png" },
    { name: "Live streaming", image: "url_to_image_2" },
    { name: "Pen/pencil", image: "url_to_image_3" },
    { name: "Dais Table", image: "url_to_image_4" },
    { name: "Biometric Device", image: "url_to_image_5" },
    { name: "Scribbling Pad", image: "url_to_image_6" },
    { name: "White Board", image: "url_to_image_7" },
    { name: "Photography", image: "url_to_image_8" },
    { name: "Water Bottle", image: "url_to_image_9" },
    { name: "Help desk", image: "url_to_image_10" },
    { name: "Videography", image: "url_to_image_11" },
    { name: "Others", image: "url_to_image_12" },
    { name: "Hand Mic", image: "url_to_image_13" },
    { name: "Collar mic", image: "url_to_image_14" },
    { name: "Small momento", image: "url_to_image_15" },
    { name: "Internet Connection", image: "url_to_image_16" },
    { name: "Shawl others", image: "url_to_image_17" },
  ];

  return (
    <div className="popup-overlay">
      <div className="popup-content" style={{width:"80%",height:"80%"}} onClick={(e) => e.stopPropagation()}>
        <h2>VenueRequirements Details</h2>

        <ThemeProvider theme={theme}>
          <div className="itemschoosing">
            <h3>Select the items you need for your venue</h3>
            <h3>Venue Requirements</h3>
            <div className="flex">
              <div className="grid-container">
                {items.map((item) => (
                  <div
                    key={item.name}
                    className={`grid-item ${
                      selectedContent.includes(item.name) ? "selected" : ""
                    }`}
                    onClick={() => handleClick(item)}
                  >
                    <div
                      className="circlex"
                      style={{
                        backgroundImage: `url(${item.image})`,
                        backgroundSize: "contain",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                      }}
                    >
                      {selectedContent.includes(item.name) && <TickIcon />}
                    </div>
                    <div className="item-name">{item.name}</div>
                  </div>
                ))}
              </div>
              
            </div>
            <div className="popup-buttons">
          <button onClick={handleSubmit}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
          </div>
        </ThemeProvider>

        
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
