import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Slider,
  InputAdornment,
  IconButton,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import FoodIcon from "@mui/icons-material/Restaurant";
import CalendarIcon from "@mui/icons-material/CalendarToday";
import LocationIcon from "@mui/icons-material/LocationOn";
import RemoveIcon from "@mui/icons-material/Remove";
import "./specialrequest.css";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays } from "date-fns"; // Importing addDays to calculate the minimum date

const SpecialRequest = () => {
  const [open, setOpen] = useState(false);
  const [selectedBox, setSelectedBox] = useState(null);
  const [barColors, setBarColors] = useState({
    car: "#ff6f61",
    soup: "#ff6f61",
    fastfood: "#ff6f61",
    add: "#ff6f61",
  });

  // States for each form
  const [soupData, setSoupData] = useState({
    food: "",
    time: "",
    venue: "",
    quantity: 0,
  });
  const [carData, setCarData] = useState({
    quantity: 0,
    vehicleType: "",
    arrival: "",
    departure: "",
  });
  const [fastfoodData, setFastfoodData] = useState({
    refreshment: "",
    time: "",
    venue: "",
    quantity: 0,
  });

  // Handle opening the dialog
  const handleClickOpen = (box) => {
    setSelectedBox(box);
    setOpen(true);
  };

  // Handle closing the dialog
  const handleClose = () => {
    setOpen(false);
  };

  // Handle form submission
  const handleSubmit = () => {
    setBarColors((prev) => ({
      ...prev,
      [selectedBox]: "#03a9f4", // Change the color to blue
    }));
    handleClose();
  };

  // Handle slider change
  const handleSliderChange = (event, newValue) => {
    switch (selectedBox) {
      case "soup":
        setSoupData((prev) => ({ ...prev, quantity: newValue }));
        break;
      case "car":
        setCarData((prev) => ({ ...prev, quantity: newValue }));
        break;
      case "fastfood":
        setFastfoodData((prev) => ({ ...prev, quantity: newValue }));
        break;
      default:
        break;
    }
  };

  // Handle increment and decrement
  const handleAdd = () => {
    switch (selectedBox) {
      case "soup":
        setSoupData((prev) => ({
          ...prev,
          quantity: Math.min(prev.quantity + 1, 100),
        }));
        break;
      case "car":
        setCarData((prev) => ({
          ...prev,
          quantity: Math.min(prev.quantity + 1, 100),
        }));
        break;
      case "fastfood":
        setFastfoodData((prev) => ({
          ...prev,
          quantity: Math.min(prev.quantity + 1, 100),
        }));
        break;
      default:
        break;
    }
  };

  const handleRemove = () => {
    switch (selectedBox) {
      case "soup":
        setSoupData((prev) => ({
          ...prev,
          quantity: Math.max(prev.quantity - 1, 0),
        }));
        break;
      case "car":
        setCarData((prev) => ({
          ...prev,
          quantity: Math.max(prev.quantity - 1, 0),
        }));
        break;
      case "fastfood":
        setFastfoodData((prev) => ({
          ...prev,
          quantity: Math.max(prev.quantity - 1, 0),
        }));
        break;
      default:
        break;
    }
  };

  // console.log(fastfoodData);
  // Render dialog content based on the selected box
  const getDialogContent = () => {
    switch (selectedBox) {
      case "soup":
        return (
          <>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Preferred food
            </Typography>
            <TextField
              value={soupData.food} // Use soupData.food here
              onChange={
                (e) =>
                  setSoupData((prev) => ({ ...prev, food: e.target.value })) // Correctly update the food property
              }
              placeholder="Eg: Chappathi"
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <FoodIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ marginBottom: 2 }}
            />

            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Time
            </Typography>



            <div
              style={{
                position: "relative",
                display: "inline-block",
                marginBottom: 4,
              }}
            >
              <DatePicker
                selected={soupData.time}
                onChange={(date) =>
                  setSoupData((prev) => ({ ...prev, time: date }))
                }
                minDate={addDays(new Date(), 1)} // Disable past dates and today's date
                showTimeSelect // Enables time selection
                dateFormat="MM/dd/yyyy h:mm aa" // Format for date and time
                customInput={
                  <input
                    type="text"
                    className="arr_input"
                    placeholder="Select date and time"
                    style={{
                      padding: "18px",
                      fontSize: "16px",
                      width: "360px",
                      borderRadius: "5px",
                      border: "solid gray 1px",
                    }}
                  />
                }
              />
              <CalendarIcon
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                  fontSize: "20px",
                }}
                onClick={() => document.querySelector(".arr_input").focus()}
              />
            </div>

            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Venue to give
            </Typography>
            <TextField
              value={soupData.venue}
              onChange={(e) =>
                setSoupData((prev) => ({ ...prev, venue: e.target.value }))
              }
              placeholder="Eg: BIT Guest House"
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <LocationIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ marginBottom: 2 }}
            />

            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Quantity
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginBottom: 2,
                width: "100%",
              }}
            >
              <Slider
                value={soupData.quantity}
                onChange={handleSliderChange}
                step={1}
                min={0}
                max={100}
                valueLabelDisplay="auto"
                sx={{ marginRight: 2 }} // Added space between slider and buttons
              />
              <div className="spbuttonsicon" onClick={handleRemove}>
                <RemoveIcon />
              </div>
              <TextField
                value={soupData.quantity}
                size="small"
                sx={{ width: 85, marginRight: 1, marginLeft: 1 }}
                InputProps={{
                  readOnly: true,
                }}
              />
              <div className="spbuttonsicon" onClick={handleAdd}>
                <AddIcon />
              </div>
            </Box>
          </>
        );
      case "car":
        return (
          <>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Quantity
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginBottom: 2,
                width: "100%",
              }}
            >
              <Slider
                value={carData.quantity}
                onChange={handleSliderChange}
                step={1}
                min={0}
                max={100}
                valueLabelDisplay="auto"
                sx={{ marginRight: 2 }} // Added space between slider and buttons
              />
              <div className="spbuttonsicon" onClick={handleRemove}>
                <RemoveIcon />
              </div>
              <TextField
                value={carData.quantity}
                size="small"
                sx={{ width: 90, marginRight: 1, marginLeft: 1 }}
                InputProps={{
                  readOnly: true,
                }}
              />
              <div className="spbuttonsicon" onClick={handleAdd}>
                <AddIcon />
              </div>
            </Box>

            <Typography variant="h6" sx={{ marginBottom: 1 }}>
              Arrival
            </Typography>

            <div
              style={{
                position: "relative",
                display: "inline-block",
                marginBottom: 4,
              }}
            >
              <DatePicker
                selected={carData.arrival}
                onChange={(date) =>
                  setCarData((prev) => ({ ...prev, arrival: date }))
                }
                minDate={addDays(new Date(), 1)} // Disable past dates and today's date
                showTimeSelect // Enables time selection
                dateFormat="MM/dd/yyyy h:mm aa" // Format for date and time
                customInput={
                  <input
                    type="text"
                    className="arr_input"
                    placeholder="Select date and time"
                    style={{
                      padding: "18px",
                      fontSize: "16px",
                      width: "360px",
                      borderRadius: "5px",
                      border: "solid gray 1px",
                    }}
                  />
                }
              />
              <CalendarIcon
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                  fontSize: "20px",
                }}
                onClick={() => document.querySelector(".arr_input").focus()}
              />
            </div>

            <Typography variant="h6" sx={{ marginBottom: 1 }}>
              Departure
            </Typography>

            <div
              style={{
                position: "relative",
                display: "inline-block",
                marginBottom: 4,
              }}
            >
              <DatePicker
                selected={carData.departure}
                onChange={(date) =>
                  setCarData((prev) => ({ ...prev, departure: date }))
                }
                minDate={addDays(new Date(), 1)} // Disable past dates and today's date
                showTimeSelect // Enables time selection
                dateFormat="dd/MM/yyyy h:mm aa" // Format for date and time
                customInput={
                  <input
                    className="dep_input"
                    type="text"
                    placeholder="Select date and time"
                    style={{
                      padding: "18px",
                      fontSize: "16px",
                      width: "360px",
                      borderRadius: "5px",
                      border: "solid gray 1px",
                    }}
                  />
                }
              />
              <CalendarIcon
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                  fontSize: "20px",
                }}
                onClick={() => document.querySelector(".dep_input").focus()}
              />
            </div>

            <Typography variant="h6" sx={{ marginBottom: 1 }}>
              Vehicle Type
            </Typography>
            <FormControl fullWidth sx={{ marginBottom: 4 }}>
              {/* <InputLabel id="car-select-label">Select Car</InputLabel> */}
              <Select
                labelId="car-select-label"
                value={carData.vehicleType}
                onChange={(e) =>
                  setCarData((prev) => ({
                    ...prev,
                    vehicleType: e.target.value,
                  }))
                }
                label="Select Car"
                endAdornment={
                  <InputAdornment position="end">
                    <FoodIcon />
                  </InputAdornment>
                }
              >
                <MenuItem value="BMW">BMW</MenuItem>
                <MenuItem value="Audi">Audi</MenuItem>
                <MenuItem value="Mercedes">Mercedes</MenuItem>
              </Select>
            </FormControl>
          </>
        );
      case "fastfood":
        return (
          <>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Preferred Refreshment
            </Typography>
            <TextField
              value={fastfoodData.refreshment}
              onChange={(e) =>
                setFastfoodData((prev) => ({
                  ...prev,
                  refreshment: e.target.value,
                }))
              }
              placeholder="Eg: Chappathi"
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <FoodIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ marginBottom: 2 }}
            />

            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Time
            </Typography>
            <div
      style={{
        position: "relative",
        display: "inline-block",
        marginBottom: 4,
      }}
    >
      <DatePicker
        selected={fastfoodData.time}
        onChange={(date) =>
          setFastfoodData((prev) => ({ ...prev, time: date }))
        }
        minDate={addDays(new Date(), 1)} // Disable past dates and today's date
        showTimeSelect // Enables time selection
        dateFormat="MM/dd/yyyy h:mm aa" // Format for date and time
        customInput={
          <input
            type="text"
            className="arr_input"
            placeholder="Select date and time"
            style={{
              padding: "18px",
              fontSize: "16px",
              width: "360px",
              borderRadius: "5px",
              border: "solid gray 1px",
            }}
          />
        }
      />
      <CalendarIcon
        style={{
          position: "absolute",
          right: "10px",
          top: "50%",
          transform: "translateY(-50%)",
          cursor: "pointer",
          fontSize: "20px",
        }}
        onClick={() => document.querySelector(".arr_input").focus()}
      />
    </div>

            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Venue to give
            </Typography>
            <TextField
              value={fastfoodData.venue}
              onChange={(e) =>
                setFastfoodData((prev) => ({ ...prev, venue: e.target.value }))
              }
              placeholder="Eg: BIT Guest House"
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <LocationIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ marginBottom: 2 }}
            />

            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Quantity
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginBottom: 2,
                width: "100%",
              }}
            >
              <Slider
                value={fastfoodData.quantity}
                onChange={handleSliderChange}
                step={1}
                min={0}
                max={100}
                valueLabelDisplay="auto"
                sx={{ marginRight: 2 }} // Added space between slider and buttons
              />
              <div className="spbuttonsicon" onClick={handleRemove}>
                <RemoveIcon />
              </div>
              <TextField
                value={fastfoodData.quantity}
                size="small"
                sx={{ width: 85, marginRight: 1, marginLeft: 1 }}
                InputProps={{
                  readOnly: true,
                }}
              />
              <div className="spbuttonsicon" onClick={handleAdd}>
                <AddIcon />
              </div>
            </Box>
          </>
        );
      case "add":
        return <p>Add new item-related content goes here.</p>;
      default:
        return <p>Select a box to see the content.</p>;
    }
  };

  const boxes = [
    { id: "car", image: "/images/car.png" },
    { id: "soup", image: "/images/soup.png" },
    { id: "fastfood", image: "/images/fastfood.png" },
    { id: "add", icon: <AddIcon sx={{ fontSize: 40, color: "#03a9f4" }} /> },
  ];

  return (
    <div className="specialrequest">
      {boxes.map((box) => (
        <Box
          key={box.id}
          display="flex"
          flexDirection="column"
          alignItems="center"
          onClick={() => handleClickOpen(box.id)}
          sx={{
            cursor: "pointer",
            "&:hover .hover-bar": { opacity: 1 },
          }}
        >
          <div className="sr">
            {box.image ? (
              <img src={box.image} className="picsr" alt="" />
            ) : (
              box.icon
            )}
          </div>
          <Box
            className="hover-bar"
            sx={{
              height: "4px",
              width: "60%",
              backgroundColor: barColors[box.id],
              marginTop: "5px",
              opacity: 0,
              transition: "opacity 0.3s",
            }}
          />
        </Box>
      ))}

      {/* Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="xs"
        fullWidth
        sx={{
          "& .MuiPaper-root": {
            borderRadius: "16px", // Adjust the value for smoother borders
          },
        }}
      >
        {/* <DialogTitle>
          {selectedBox &&
            selectedBox.charAt(0).toUpperCase() + selectedBox.slice(1)}{" "}
          Request
        </DialogTitle> */}

        <DialogContent>{getDialogContent()}</DialogContent>
        <DialogActions>
          <div onClick={handleClose} className="spbuttons">
            Cancel
          </div>
          <div onClick={handleSubmit} className="spbuttons">
            Confirm
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SpecialRequest;
