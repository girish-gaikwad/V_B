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
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import FoodIcon from "@mui/icons-material/Restaurant";
import CalendarIcon from "@mui/icons-material/CalendarToday";
import LocationIcon from "@mui/icons-material/LocationOn";
import RemoveIcon from "@mui/icons-material/Remove";
import "./specialrequest.css";

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
        setSoupData((prev) => ({ ...prev, quantity: Math.min(prev.quantity + 1, 100) }));
        break;
      case "car":
        setCarData((prev) => ({ ...prev, quantity: Math.min(prev.quantity + 1, 100) }));
        break;
      case "fastfood":
        setFastfoodData((prev) => ({ ...prev, quantity: Math.min(prev.quantity + 1, 100) }));
        break;
      default:
        break;
    }
  };

  const handleRemove = () => {
    switch (selectedBox) {
      case "soup":
        setSoupData((prev) => ({ ...prev, quantity: Math.max(prev.quantity - 1, 0) }));
        break;
      case "car":
        setCarData((prev) => ({ ...prev, quantity: Math.max(prev.quantity - 1, 0) }));
        break;
      case "fastfood":
        setFastfoodData((prev) => ({ ...prev, quantity: Math.max(prev.quantity - 1, 0) }));
        break;
      default:
        break;
    }
  };

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
              value={soupData.food}
              onChange={(e) => setSoupData((prev) => ({ ...prev, food: e.target.value }))}
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
            <TextField
              value={soupData.time}
              onChange={(e) => setSoupData((prev) => ({ ...prev, time: e.target.value }))}
              placeholder="Eg: 17/02/24 / 2.00pm"
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <CalendarIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ marginBottom: 2 }}
            />

            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Venue to give
            </Typography>
            <TextField
              value={soupData.venue}
              onChange={(e) => setSoupData((prev) => ({ ...prev, venue: e.target.value }))}
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
              <IconButton onClick={handleRemove}>
                <RemoveIcon />
              </IconButton>
              <TextField
                value={soupData.quantity}
                size="small"
                sx={{ width: 65, marginRight:  1,marginLeft:  1}}
                InputProps={{
                  readOnly: true,
                }}
              />
              <IconButton onClick={handleAdd}>
                <AddIcon />
              </IconButton>
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
              <IconButton onClick={handleRemove}>
                <RemoveIcon />
              </IconButton>
              <TextField
                value={carData.quantity}
                size="small"
                sx={{ width: 65, marginRight:  1,marginLeft:  1}}
                InputProps={{
                  readOnly: true,
                }}
              />
              <IconButton onClick={handleAdd}>
                <AddIcon />
              </IconButton>
            </Box>

            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Vehicle Type
            </Typography>
            <TextField
              value={carData.vehicleType}
              onChange={(e) => setCarData((prev) => ({ ...prev, vehicleType: e.target.value }))}
              placeholder="Eg: BMW"
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
              Arrival
            </Typography>
            <TextField
              value={carData.arrival}
              onChange={(e) => setCarData((prev) => ({ ...prev, arrival: e.target.value }))}
              placeholder="Eg: 17/02/24 / 2.00pm"
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <CalendarIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ marginBottom: 2 }}
            />

            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Departure
            </Typography>
            <TextField
              value={carData.departure}
              onChange={(e) => setCarData((prev) => ({ ...prev, departure: e.target.value }))}
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
              onChange={(e) => setFastfoodData((prev) => ({ ...prev, refreshment: e.target.value }))}
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
            <TextField
              value={fastfoodData.time}
              onChange={(e) => setFastfoodData((prev) => ({ ...prev, time: e.target.value }))}
              placeholder="Eg: 17/02/24 / 2.00pm"
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <CalendarIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ marginBottom: 2 }}
            />

            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Venue to give
            </Typography>
            <TextField
              value={fastfoodData.venue}
              onChange={(e) => setFastfoodData((prev) => ({ ...prev, venue: e.target.value }))}
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
              <IconButton onClick={handleRemove}>
                <RemoveIcon />
              </IconButton>
              <TextField
                value={fastfoodData.quantity}
                size="small"
                sx={{ width: 65, marginRight:  1,marginLeft:  1}}
                InputProps={{
                  readOnly: true,
                }}
              />
              <IconButton onClick={handleAdd}>
                <AddIcon />
              </IconButton>
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
        maxWidth="xs" // Adjusts the max width of the dialog
        fullWidth // Makes sure the dialog uses the full width
      >
        <DialogTitle>
          {selectedBox &&
            selectedBox.charAt(0).toUpperCase() + selectedBox.slice(1)}{" "}
          Request
        </DialogTitle>
        <DialogContent>{getDialogContent()}</DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SpecialRequest;


