import React, { useState } from "react";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import "./popUps.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Center, Input } from "@chakra-ui/react";
import { BsFillPeopleFill } from "react-icons/bs";
import { IoIosArrowBack,IoIosArrowForward } from "react-icons/io";

import {
  Slider,
  Button,
  Checkbox,
  Typography,
  Tooltip,
  TextField,
  FormControlLabel,
  IconButton,
  Chip,
  ToggleButtonGroup,
  ToggleButton,
  InputLabel,
  Select,
  Dialog,
  DialogTitle,
  DialogContent,
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
  styled,
  Stepper,
  Step,
  StepLabel,
  Paper,
} from "@mui/material";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { IoPerson, IoPersonAddOutline } from "react-icons/io5";
import { HiOutlineXMark } from "react-icons/hi2";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import {
  ArrowBack,
  ArrowForward,
  CalendarToday,
  GroupAdd,
  GroupRemove,
  LocationOn,
  PersonAdd,
  PersonOutline,
  Undo,
} from "@mui/icons-material";

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

const ListItem = React.memo(({
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
});

const findPair = (number, pairs) => {
  for (const pair of pairs) {
    if (pair.includes(number)) {
      const index = pair.indexOf(number);
      const pairedNumber = pair[1 - index];
      if (number == pair[1]) {
        return pair[0];
      } else {
        return pair[1];
      }
    }
  }
  // console.log(`Number ${number} is not in any pair.`);
};
// const findGroupMembers = (number, pairs) => {
//   for (const group of pairs) {
//     if (group.includes(number)) {
//       // Filter out the given number from the group
//       return group.filter((id) => id !== number);
//     }
//   }
//   // console.log(`Number ${number} is not in any group.`);
//   return []; // Return an empty array if the number is not found
// };
const findGroupMembers = (number, pairs) => {
  for (const group of pairs) {
    if (group.includes(number)) {
      // Return the group excluding the specified number
      return group.filter((id) => id !== number);
    }
  }
  return []; // Return an empty array if the number is not found in any group
};



const ListItemA = React.memo(({
  cardno,
  item,
  onPrev,
  onNext,
  onInputChange,
  handleClose,
  groups,
  initialGuests,
}) => {
  const pairedman = findPair(cardno + 1, groups);
  // console.log(groups)
  return (
    <Card
      sx={{
        paddingLeft: "20px",
        paddingRight: "20px",
        // paddingTop: "50px",
        // maxWidth: "800px",
        height: "370px",
        boxShadow: 3,
        borderRadius: 2,
        // border: "solid black",
      }}
    >

<div style={{display:"flex",justifyContent:"end",alignItems:"center",}}>

<div className="options" style={{marginRight:"5px",marginTop:"5px"}}>

      {cardno + 1}
</div>

{pairedman && (
  <div className="options" style={{ marginRight: "5px", marginTop: "5px" }}>
    {pairedman}
  </div>
)}
</div>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={12}>
          <FormLabel>Arrival Time</FormLabel>

          <TextField
            style={{ width: "100%" }}
            // label="Select Date"
            type="date"
            value={item.arrivaltime}
            onChange={(e) => onInputChange("arrivaltime", e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={12}>
          <FormLabel>Arrival Time</FormLabel>

          <TextField
            style={{ width: "100%" }}
            // label="Select Date"
            type="date"
            value={item.arrivaltime}
            onChange={(e) => onInputChange("arrivaltime", e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={12}>
          <FormControl fullWidth>
            <FormLabel>Accomodaton venue</FormLabel>
            <TextField
              select
              variant="outlined"
              value={item.accomodationvenue}
              onChange={(e) =>
                onInputChange("accomodationvenue", e.target.value)
              }
            >
              <MenuItem value="Guest House">guest House</MenuItem>
              <MenuItem value="hostel">hostel</MenuItem>
              <MenuItem value="room">room</MenuItem>
            </TextField>
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
          <div className="cardsarrow" onClick={onPrev}>
          <IoIosArrowBack />
          </div>
        
          <Button style={{height:"35px", color:"white"}} >save</Button>

          <div className="cardsarrow" onClick={onNext}>
            <IoIosArrowForward  />
          </div>

        </DialogActions>
      </Box>
    </Card>
  );
});
const ListItemT = React.memo(({
  cardno,
  item,
  onPrev,
  onNext,
  onInputChange,
  handleClose,
  groups,
  initialGuests,
  // isRightEnabled,
  // isLeftEnabled
}) => {
  const [tripType, setTripType] = useState("Both");

  const handleTripTypeChange = (event, newTripType) => {
    if (newTripType !== null) {
      setTripType(newTripType);
    }
  };
  const isLeftEnabled = tripType === "Both" || tripType === "Onward";
  const isRightEnabled = tripType === "Both" || tripType === "Return";
  const pairedman = findGroupMembers(cardno + 1, groups);
  // console.log(tripType)
  return (
    <Card
      sx={{
        paddingLeft: "20px",
        paddingRight: "20px",
        // paddingTop: "50px",
        // maxWidth: "800px",
        height: "350px",
        boxShadow: 3,
        borderRadius: 2,
        // border: "solid black",
      }}
    >
      <div style={{display:"flex",justifyContent:"end",alignItems:"center",}}>

<div className="options" style={{marginRight:"5px",marginTop:"5px"}}>

      {cardno + 1}
</div>

  {pairedman.map((memberId, index) => (
        <div key={index} className="options" style={{ marginRight: '5px', marginTop: '5px' }}>
          {memberId}
        </div>
      ))}
   
</div> 

      

      <div style={{display:"flex" ,width:"100%",}}>

        <div style={{width:"60%",marginRight:"5px"}}>
          <ToggleButtonGroup
            value={tripType}
            exclusive
            onChange={handleTripTypeChange}
            aria-label="trip type"
            style={{ marginBottom: "20px" }}
            fullWidth
          >
            <ToggleButton value="Both">Both</ToggleButton>
            <ToggleButton value="Onward">Onward</ToggleButton>
            <ToggleButton value="Return">Return</ToggleButton>

            
          </ToggleButtonGroup>
        </div>



        

        <div style={{width:"20%"}}>
          <FormControl fullWidth>
            <InputLabel   id="car-select-label">Eg: Bolero</InputLabel>
            <Select 
              labelId="car-select-label"
              id="car-select" 
              sx={{ height: 42 }}
              //  value={carType}
              //  onChange={handleCarTypeChange}
              // disabled={tripType !== 'Return'}
            >
              <MenuItem value="Bolero">Bolero</MenuItem>
              <MenuItem value="Innova">Innova</MenuItem>
              <MenuItem value="Swift">Swift</MenuItem>
              <MenuItem value="Scorpio">Scorpio</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>

      <Grid container spacing={2} alignItems="center">
        {/* Left Side Input Fields */}
        <Grid item xs={6}>
          <TextField
            label="Date and Time"
            type="datetime-local"
            fullWidth
            disabled={!isLeftEnabled}
            InputLabelProps={{
              shrink: true,
            }}
              // InputProps={{
              //   startAdornment: (
              //     <IconButton>
              //       <CalendarToday />
              //     </IconButton>
              //   ),
              // }}
          />
          <TextField
            label="Location"
            fullWidth
            disabled={!isLeftEnabled}
            // InputProps={{
            //   startAdornment: (
            //     <IconButton>
            //       <LocationOn />
            //     </IconButton>
            //   ),
            // }}
            style={{ marginTop: "10px" }}
          />
          <TextField
            label="Location"
            fullWidth
            disabled={!isLeftEnabled}
            // InputProps={{
            //   startAdornment: (
            //     <IconButton>
            //       <LocationOn />
            //     </IconButton>
            //   ),
            // }}
            style={{ marginTop: "10px" }}
          />
        </Grid>

        {/* Right Side Input Fields */}
        <Grid item xs={6}>
          <TextField
            label="Date and Time"
            type="datetime-local"
            fullWidth
            disabled={!isRightEnabled}
            InputLabelProps={{
              shrink: true,
            }}
            // InputProps={{
            //   startAdornment: (
            //     <IconButton>
            //       <CalendarToday />
            //     </IconButton>
            //   ),
            // }}
          />
          <TextField
            label="Location"
            fullWidth
            disabled={!isRightEnabled}
            // InputProps={{
            //   endAdornment: (
            //     <IconButton>
            //       <LocationOn />
            //     </IconButton>
            //   ),
            // }}
            style={{ marginTop: "10px" }}
          />
          <TextField
            label="Location"
            fullWidth
            
            disabled={!isRightEnabled}
            // InputProps={{
            //   startAdornment: (
            //     <IconButton>
            //       <LocationOn />
            //     </IconButton>
            //   ),
            // }}
            style={{ marginTop: "10px" }}
          />
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
          <div className="cardsarrow" onClick={onPrev}>
          <IoIosArrowBack />
          </div>
        
          <Button style={{height:"35px", color:"white"}} >save</Button>

          <div className="cardsarrow" onClick={onNext}>
            <IoIosArrowForward  />
          </div>

        </DialogActions>
      </Box>
    </Card>
  );
});
const maxVisibleSteps = 3;

const AccomodationPopup = ({ onClose, onSave }) => {
  const [cards, setCards] = useState([
    {
      id: 1,
      salutation: "Mr",
      firstName: "girish",
      lastName: "",
      gender: "",
      designation: "",
      organization: "",
      email: "",
      countryCode: "",
      phoneNumber: "",
      arrivaltime: "",
      departuretime: "",
      accomodationvenue: "",
    },
    {
      id: 2,
      salutation: "Mr",
      firstName: "giridhar",
      lastName: "",
      gender: "",
      designation: "",
      organization: "",
      email: "",
      countryCode: "",
      phoneNumber: "",
      arrivaltime: "",
      departuretime: "",
      accomodationvenue: "",
    },
    {
      id: 3,
      salutation: "Mr",
      firstName: "dharnish",
      lastName: "",
      gender: "",
      designation: "",
      organization: "",
      email: "",
      countryCode: "",
      phoneNumber: "",
      arrivaltime: "",
      departuretime: "",
      accomodationvenue: "",
    },
    {
      id: 4,
      salutation: "Mr",
      firstName: "thaya",
      lastName: "",
      gender: "",
      designation: "",
      organization: "",
      email: "",
      countryCode: "",
      phoneNumber: "",
      arrivaltime: "",
      departuretime: "",
      accomodationvenue: "",
    },
  ]);
  const initialGuests = [...cards];
  const [currentIndex, setCurrentIndex] = useState(0);
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };
  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + cards.length) % cards.length
    );
  };
  const handleInputChange = (id, field, value) => {
    // console.log("yep iwam ");
    const initialGuests = cards.map((card) =>
      card.id === id ? { ...card, [field]: value } : card
    );
    setCards(initialGuests);
  };
  
  ////////////////

  const [guestData, setGuestData] = useState(initialGuests);
  const [groups, setGroups] = useState([]);
  const [aloneGuests, setAloneGuests] = useState([]);
  const [lastAction, setLastAction] = useState(null);
  const [selectedGuest, setSelectedGuest] = useState(null);
  const [startStep, setStartStep] = useState(0);

  const handlePairing = (guestId, pairedGuestId) => {
    const newGroup = [guestId, pairedGuestId];
    setGroups([...groups, newGroup]);
    setGuestData((prevGuestData) =>
      prevGuestData.filter((g) => !newGroup.includes(g.id))
    );
    setLastAction({ type: "pair", group: newGroup });
    setSelectedGuest(null);
  };

  const handleUndoAlone = (guestId) => {
    setAloneGuests(aloneGuests.filter((id) => id !== guestId));
    setGuestData((prevGuestData) => [
      ...prevGuestData,
      {
        id: guestId,
        name: initialGuests.find((g) => g.id === guestId).firstName,
      },
    ]);
    setLastAction(null);
  };

  const handleStayAlone = (guestId) => {
    setAloneGuests([...aloneGuests, guestId]);
    setGuestData((prevGuestData) =>
      prevGuestData.filter((g) => g.id !== guestId)
    );
    setLastAction({ type: "alone", guestId });
    setSelectedGuest(null);
  };

  const handleSelectGuestForPairing = (guestId) => {
    setSelectedGuest(guestId === selectedGuest ? null : guestId);
  };

  const unpairGroup = (group) => {
    setGroups(groups.filter((g) => g !== group));
    setGuestData((prevGuestData) => [
      ...prevGuestData,
      {
        id: group[0],
        name: initialGuests.find((g) => g.id === group[0]).firstName,
      },
      {
        id: group[1],
        name: initialGuests.find((g) => g.id === group[1]).firstName,
      },
    ]);
    setAloneGuests(
      aloneGuests.filter((id) => id !== group[0] && id !== group[1])
    );
  };

  const getUnpairableGroup = (guestId) => {
    return groups.find((group) => group.includes(guestId)) || [];
  };

  const handleNextx = () => {
    setStartStep((prev) =>
      prev + 1 >= initialGuests.length - (maxVisibleSteps - 1) ? prev : prev + 1
    );
  };

  const handleBack = () => {
    setStartStep((prev) => (prev - 1 < 0 ? 0 : prev - 1));
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

  return (
    <div className="popup-overlay">
      <div className="popup-content accomodation" onClick={(e) => e.stopPropagation()}>
        {/* <div
          style={{
            border: "solid green",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        > */}
          <Box  sx={{ width: "100%" }}>
            <Box  
              sx={{
                display: "flex",
                justifyContent: "center",
                // alignItems:"center",
                marginBottom: "20px",
                height:"180px"
              }}
            >
              <div className="arrow" onClick={handleBack} disabled={startStep === 0}>
                
                <img src="/images/icons_images/arrow_right.png" className="iconarrow" alt="" />
                
              </div>


              <Stepper 
                alternativeLabel
                nonLinear
                activeStep={-1}
                sx={{ flex: 1 }}
                // className="sus"
              >
                {cards
                  .slice(startStep, startStep + maxVisibleSteps)
                  .map((guest, index) => (

                    <Step className="sus" key={guest.id}>


                      <StepLabel 
                        StepIconComponent={() => (
                          <div className="ctd">{startStep + index + 1}</div>
                        )}
                      >
                        
                        <div className="guestNames">
                          <img className="guestImage" src="images/icons_images/bordername.png" alt="" />
                        
                        <p className="guestname">
                        {guest.salutation} . {guest.firstName}
                        </p>
                        </div>
                    
                        {getUnpairableGroup(guest.id).length > 0 && (
                          
                            <div
                              className="undoalone"
                              onClick={() =>
                                unpairGroup(getUnpairableGroup(guest.id))
                              }
                              >
                              <Undo />
                              Unpair
                              <BsFillPeopleFill /> 
                            </div>
                        
                        )}


                        {aloneGuests.includes(guest.id) && (
                        
                            <div
                            className="undoalone"
                              onClick={() => handleUndoAlone(guest.id)}
                            >
                              <Undo /> 
                              undo
                              <IoPerson />
                            </div>
                        
                        )}


                      </StepLabel>
                      <Box
                      
                        sx={{
    
    
                          textAlign: "center",
                        
                        }}
                      >
                       

                        {guestData.some((g) => g.id === guest.id) && (
                          <>
                            <Grid container spacing={1} justifyContent="center">
                              <Grid item>


                                <div className="pair"
                                 
                                  onClick={() =>
                                    handleSelectGuestForPairing(guest.id)
                                  }
                                  sx={{
                                    backgroundColor:
                                      selectedGuest === guest.id
                                        ? "lightblue"
                                        : "transparent",
                                    borderColor:
                                      selectedGuest === guest.id
                                        ? "blue"
                                        : "grey",
                                    color:
                                      selectedGuest === guest.id
                                        ? "blue"
                                        : "black",
                                    "&:hover": {
                                      backgroundColor:
                                        selectedGuest === guest.id
                                          ? "lightblue"
                                          : "transparent",
                                    },
                                  }}
                                >
                                 <BsFillPeopleFill /> 
                                </div>

                                
                              </Grid>

                              <Grid item>
                                <div className="alone"
                                  variant="outlined"
                                  size="small"
                                  color="warning"
                                  startIcon={<PersonOutline />}
                                  onClick={() => handleStayAlone(guest.id)}
                                >
                                  <IoPerson />
                                </div>
                              </Grid>
                            </Grid>

                            {selectedGuest === guest.id && (  
                              <Box sx={{ marginTop: "10px" }}>
                               


                                <Grid
                                  container
                                  spacing={1}
                                  justifyContent="center"
                                  // className="sus"
                                >



                                  {guestData
                                    .filter(
                                      (otherGuest) => otherGuest.id !== guest.id
                                    )
                                    .map((otherGuest) => (
                                      <Grid item key={otherGuest.id}>
                                        <div className="options"
                                          variant="outlined"
                                          size="small"
                                          onClick={() =>
                                            handlePairing(
                                              guest.id,
                                              otherGuest.id
                                            )
                                          }
                                        >
                                          {otherGuest.id}
                                        </div>
                                      </Grid>
                                    ))}
                                </Grid>
                              </Box>
                            )}
                          </>
                        )}
                      </Box>
                    </Step>
                  ))}


              </Stepper>






              <div
                onClick={handleNextx} className="arrow"
                disabled={startStep + maxVisibleSteps >= initialGuests.length}
              >
                <img src="/images/icons_images/arrow_right.png" className="iconarrowR" alt="" />
                {/* <ArrowForward /> */}
              </div>
            </Box>

          
          </Box>

          <div className="boss"  >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
          
                alignItems: "Center",
                position: "relative",
                width: "480px",
                height: "350px",
              }}
            >
              <CardStack >
                {cards.map((item, index) => (
                  <Box
                    key={item.id}
                    sx={{
                      transform: `translateX(${(currentIndex - index) * -40}px) scale(${index === currentIndex ? 1 : 0.95})`,
                      zIndex: cards.length - Math.abs(currentIndex - index),
                      opacity: currentIndex === index ? 1 : 0.5,
                      transition: "transform 0.3s linear, opacity 0.3s ease",
                      
                    }}
                  >
                    <ListItemA
                      item={item}
                      cardno={index}
                      onPrev={handlePrev}
                      onNext={handleNext}
                      groups={groups}
                      initialGuests={initialGuests}
                      handleChangeColor={handleSubmit}
                      handleClose={onClose}
                      onInputChange={(field, value) =>
                        handleInputChange(item.id, field, value)
                      }
                    />
                  </Box>
                ))}
              </CardStack>
            </Box>
          </div>
        <div className="popup-buttons">
          <button onClick={handleSubmit}>Confirm</button>
          {/* <button onClick={onClose}>Cancel</button> */}
        </div>
        </div>

      </div>
    // </div>
  );
};
const TransportPopup = ({ onClose, onSave }) => {
  const [cards, setCards] = useState([
    {
      id: 1,
      salutation: "",
      firstName: "girixx  ",
      lastName: "",
      gender: "",
      designation: "",
      organization: "",
      email: "",
      countryCode: "",
      phoneNumber: "",
      arrivaltime: "",
      departuretime: "",
      accomodationvenue: "",
    },
    {
      id: 2,
      salutation: "",
      firstName: "gaikwad  ",
      lastName: "",
      gender: "",
      designation: "",
      organization: "",
      email: "",
      countryCode: "",
      phoneNumber: "",
      arrivaltime: "",
      departuretime: "",
      accomodationvenue: "",
    },
    {
      id: 3,
      salutation: "",
      firstName: "gaikwad  ",
      lastName: "",
      gender: "",
      designation: "",
      organization: "",
      email: "",
      countryCode: "",
      phoneNumber: "",
      arrivaltime: "",
      departuretime: "",
      accomodationvenue: "",
    },
    {
      id: 4,
      salutation: "",
      firstName: "gaikwad  ",
      lastName: "",
      gender: "",
      designation: "",
      organization: "",
      email: "",
      countryCode: "",
      phoneNumber: "",
      arrivaltime: "",
      departuretime: "",
      accomodationvenue: "",
    },
  ]);

  // console.log(cards);
  const initialGuests = [...cards];
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNextx = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  const handlePrevx = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + cards.length) % cards.length
    );
  };

  const handleInputChange = (id, field, value) => {
    // console.log("yep iwam ");
    const initialGuests = cards.map((card) =>
      card.id === id ? { ...card, [field]: value } : card
    );
    setCards(initialGuests);
  };

  

  ////////////

  const [guestData, setGuestData] = useState(initialGuests);
  const [groups, setGroups] = useState([]);
  const [aloneGuests, setAloneGuests] = useState([]);
  const [visibleStart, setVisibleStart] = useState(0); // Start of visible range
  const [activeStep, setActiveStep] = useState(0); // Active step index
  const [pairingOptionsVisible, setPairingOptionsVisible] = useState(null); // ID of the guest whose pairing options are visible
  const visibleCount = 3; // Number of visible steps at a time

  // console.log(groups)
  // Function to find the group containing a guest
  const findGroupContainingGuest = (guestId) => {
    return groups.find((group) => group.includes(guestId));
  };

  // Function to handle pairing guests
  const handlePairing = (guestId, pairedGuestId) => {
    setGuestData((prevGuestData) => {
      const guestGroup = findGroupContainingGuest(guestId);
      const pairedGuestGroup = findGroupContainingGuest(pairedGuestId);

      let newGroups = [...groups];

      if (guestGroup && pairedGuestGroup && guestGroup !== pairedGuestGroup) {
        // Merge two groups
        const mergedGroup = Array.from(
          new Set([...guestGroup, ...pairedGuestGroup])
        );
        newGroups = newGroups.filter(
          (group) => group !== guestGroup && group !== pairedGuestGroup
        );
        newGroups.push(mergedGroup);
      } else if (guestGroup) {
        // Add pairedGuestId to guestGroup
        newGroups = newGroups.map((group) =>
          group === guestGroup
            ? Array.from(new Set([...group, pairedGuestId]))
            : group
        );
      } else if (pairedGuestGroup) {
        // Add guestId to pairedGuestGroup
        newGroups = newGroups.map((group) =>
          group === pairedGuestGroup
            ? Array.from(new Set([...group, guestId]))
            : group
        );
      } else {
        // Create a new group
        newGroups.push([guestId, pairedGuestId]);
      }

      setGroups(newGroups);

      return prevGuestData.filter((g) => !newGroups.flat().includes(g.id));
    });

    // Remove guests from aloneGuests list if they are paired
    setAloneGuests((prevAloneGuests) =>
      prevAloneGuests.filter((id) => id !== guestId && id !== pairedGuestId)
    );
  };
  // Function to handle joining a group
  const handleJoinGroup = (guestId, group) => {
    setGuestData((prevGuestData) => {
      const newGroup = [...group, guestId];

      setGroups((prevGroups) => [
        ...prevGroups.filter((g) => !g.some((id) => newGroup.includes(id))),
        newGroup,
      ]);

      return prevGuestData.filter((g) => g.id !== guestId);
    });

    // Remove guests from aloneGuests list if they join a group
    setAloneGuests((prevAloneGuests) =>
      prevAloneGuests.filter((id) => id !== guestId)
    );
  };
  // Function to handle staying alone
  const handleStayAlone = (guestId) => {
    setAloneGuests((prevAloneGuests) => [...prevAloneGuests, guestId]);
    setGuestData((prevGuestData) =>
      prevGuestData.filter((g) => g.id !== guestId)
    );

    // If guest is in a group, remove them from the group
    setGroups((prevGroups) =>
      prevGroups.map((group) => group.filter((id) => id !== guestId))
    );
  };
  // Function to handle leaving alone
  const handleLeaveAlone = (guestId) => {
    setAloneGuests((prevAloneGuests) =>
      prevAloneGuests.filter((id) => id !== guestId)
    );
    setGuestData((prevGuestData) => [
      ...prevGuestData,
      initialGuests.find((g) => g.id === guestId),
    ]);
  };
  // Function to handle leaving a group
  const handleLeaveGroup = (guestId) => {
    // Find the group that the guest is leaving
    let groupLeft = null;
  
    setGroups((prevGroups) => {
      return prevGroups
        .map((group) => {
          if (group.includes(guestId)) {
            // If the group contains the guest, remove them from the group
            groupLeft = group.filter((id) => id !== guestId);
  
            // If the group has one or fewer members, dismantle the group
            return groupLeft.length <= 1 ? [] : groupLeft;
          }
          return group;
        })
        .filter((group) => group.length > 0); // Remove any empty groups
    });
  
    if (groupLeft && groupLeft.length > 0) {
      // Add the remaining members of the group back to the available guests
      setGuestData((prevGuestData) =>
        prevGuestData
          .filter((g) => !groupLeft.includes(g.id)) // Remove remaining group members from guestData
          .concat(groupLeft.map((id) => initialGuests.find((g) => g.id === id))) // Add remaining members back to guestData
      );
    }
  
    // Finally, add the guest who left the group back to the available guests
    setGuestData((prevGuestData) => [
      ...prevGuestData,
      initialGuests.find((g) => g.id === guestId),
    ]);
  };
  
  


  
  // Function to handle the previous button click
  const handlePrev = () => {
    setVisibleStart((prev) => Math.max(prev - 1, 0));
    setActiveStep((prev) => Math.max(prev - 1, 0));
  };
  // Function to handle the next button click
  const handleNext = () => {
    const nextStep = activeStep + 1;
    setVisibleStart((prev) =>
      Math.min(prev + 1, initialGuests.length - visibleCount)
    );
    setActiveStep(nextStep);
  };
  // Function to toggle pairing options visibility
  const togglePairingOptions = (guestId) => {
    setPairingOptionsVisible((prevId) => (prevId === guestId ? null : guestId));
  };

  ////////////
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
      <div className="popup-content transport" onClick={(e) => e.stopPropagation()}>



        {/* <Box  sx={{ width: "100%", padding: "20px" }}> */}
        <Box className="a" sx={{ display: 'flex', alignItems: 'center' }}>
        {/* <IconButton onClick={handlePrev} disabled={visibleStart === 0}>
          <ArrowBack />
        </IconButton> */}

        <div
                onClick={handlePrev} className="arrow" disabled={visibleStart === 0}
              >
                <img src="/images/icons_images/arrow_right.png" className="iconarrow" alt="" />
                {/* <ArrowForward /> */}
              </div>




        <Stepper alternativeLabel nonLinear activeStep={activeStep} sx={{ flexGrow: 1 }}>
          {initialGuests.slice(visibleStart, visibleStart + visibleCount).map((guest, index) => {
            const inGroup = findGroupContainingGuest(guest.id);
            const isAlone = aloneGuests.includes(guest.id);
            const groupMembers = inGroup ? findGroupContainingGuest(guest.id) : [];

            return (
              <Step  key={guest.id}>
                <StepLabel
                  StepIconComponent={(props) => (
                    <Box
                      {...props}
                      sx={{
                        ...props.sx,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 35,
                        height: 35,
                        borderRadius: '11px',
                        boxShadow: "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
                        borderColor: 'primary.main',
                        fontSize: '14px',
                        color: 'primary.main',
                       
                      }}
                    >
                      {guest.id}
                    </Box>
                  )}
                >
<div className="guestNames">
                          <img className="guestImage" src="images/icons_images/bordername.png" alt="" />
                        
                        <p className="guestname">
                        {guest.salutation} . {guest.firstName}
                        </p>
                        </div>




                </StepLabel>



                <Box sx={{ textAlign: 'center' }}>
  <Grid container spacing={1} justifyContent="center">
    {/* Pair button should only be visible if the guest is not alone */}
    {!isAlone && (
      <Grid item>
        <div className="pair"
          
          onClick={() => togglePairingOptions(guest.id)}
        ><BsFillPeopleFill /> 
        </div>
      </Grid>
    )}

    {/* Stay Alone button always visible */}
    <Grid item>
      {!isAlone ? (
        <div className="alone"
         
         
          onClick={() => handleStayAlone(guest.id)}
          >
         <PersonOutline />
          
        </div>
      ) : (
        <div
          className="undoalone"
        onClick={() => handleLeaveAlone(guest.id)}
        >
        <Undo />
          Undo Alone
        </div>
      )}
    </Grid>
  </Grid>

  {pairingOptionsVisible === guest.id && !isAlone && (
    <Box sx={{ marginTop: '10px' }}>
      {!inGroup && (
        <Grid container spacing={1} justifyContent="center">
          {guestData
            .filter(otherGuest => otherGuest.id !== guest.id)
            .map(otherGuest => (
              <Grid item key={otherGuest.id}>
                <div
                   className="options"
                  
                  onClick={() => handlePairing(guest.id, otherGuest.id)}
                >
                
                  <Typography variant="caption" sx={{ display: 'block', marginTop: '2px' }}>
                     {otherGuest.id}
                  </Typography>
                </div>
              </Grid>
            ))}

          {groups
            .filter(group => !group.includes(guest.id))
            .map((group, index) => (
              <Grid item key={index}>


                <div
                  className="optionsjoin"
                  onClick={() => handleJoinGroup(guest.id, group)}
                  >
                  {/* <GroupAdd /> */}
                  Join - 
                  <Typography variant="caption">
                    {group.map(id => {
                      const member = initialGuests.find(g => g.id === id);
                      return member ? ` ${id}` : '';
                    }).join(' , ')}
                  </Typography>
                </div>


              </Grid>
            ))}
        </Grid>
      )}

      {inGroup && (
        <Box>
          <Typography variant="body2" sx={{ marginBottom: '5px' }}>
            Group Members:
          </Typography>
          <Grid container spacing={1} justifyContent="center">
            {groupMembers.map((memberId) => {
              const member = initialGuests.find(g => g.id === memberId);
              return (
                <div  item key={memberId}>
                  <Chip style={{marginRight:"4px"}}  label={`  ${member.id}`} />
                </div>
              );
            })}
              <div
                className="undoalone"
                onClick={() => handleLeaveGroup(guest.id)}
                >
                <GroupRemove />
                Leave Group
              </div>
          </Grid>
         
            
            
        
        </Box>
      )}
    </Box>
  )}
</Box>


              </Step>
            );
          })}
        </Stepper>






        <div
                onClick={handleNext} disabled={visibleStart + visibleCount >= initialGuests.length}
              >
                <img src="/images/icons_images/arrow_right.png" className="iconarrowR" alt="" />
                {/* <ArrowForward /> */}
              </div>


      </Box>
        {/* </Box> */}

        <div className="boss">
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              top:"80px",
              // border:"solid black",
              width: "700px",
              height: "350px",
            }}
          >
            <CardStack >
              {cards.map((item, index) => (
                <Box
                  key={item.id}
                  sx={{
                    transform: `translateX(${(currentIndex - index) * -30}px) scale(${index === currentIndex ? 1 : 0.95})`,
                    zIndex: cards.length - Math.abs(currentIndex - index),
                    opacity: currentIndex === index ? 1 : 0.5,
                    transition: "transform 0.3s linear, opacity 0.3s ease",
      
                  }}
                >
                  <ListItemT
                    item={item}
                    cardno={index}
                    onPrev={handlePrevx}
                    onNext={handleNextx}
                    groups={groups}
                    initialGuests={initialGuests}
                    handleChangeColor={handleSubmit}
                    handleClose={onClose}
                    onInputChange={(field, value) =>
                      handleInputChange(item.id, field, value)
                    }
                  />
                </Box>
              ))}
            </CardStack>
          </Box>
        </div>

        <div className="transportsave">
          <button onClick={handleSubmit}>Save</button>
          {/* <button onClick={onClose}>Cancel</button> */}
        </div>
      </div>
    </div>
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

    axios;
    //   .post("http://localhost:8000/post/eventform", FormattedFormData)
    //   .then((response) => {
    //     console.log(FormattedFormData);
    //     console.log("Event saved:", response.data);
    //     const id = response.data.event_id; // getting the insterted event_id from the backend.

    alert("Event Data fetched to database table successfully\n event_id: ");
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
          <CardStack >
            {cards.map((item, index) => (
              <Box
                key={item.id}
                sx={{
                  transform: `translateX(${(currentIndex - index) * -40}px) scale(${index === currentIndex ? 1 : 0.95})`,
zIndex: cards.length - Math.abs(currentIndex - index),
opacity: currentIndex === index ? 1 : 0.5,
transition: "transform 0.3s linear, opacity 0.3s ease",

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
  const [boyscount, setboyscount] = useState(0);
  const [girlsCount, setGirlsCount] = useState(0);
  const [maleFacultyCount, setMaleFacultyCount] = useState(0);
  const [femaleFacultyCount, setFemaleFacultyCount] = useState(0);
  const [accommodation, setAccommodation] = useState(false);

  const [HmaleFacultyCount, setHMaleFacultyCount] = useState(0);
  const [HfemaleFacultyCount, setHFemaleFacultyCount] = useState(0);
  const [HgirlsCount, setHGirlsCount] = useState(0);
  const [Hboyscount, setHboyscount] = useState(0);

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

  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => {
    setFlipped(!flipped);
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

  return (
    <div className={`popup-overlay Card box  ${flipped ? "flipped" : ""}`}>
      <div
        className="popup-content card-front"
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
          Count of External Participants
          <br />
          <br />
          {renderSlider("Count of Boys", boyscount, setboyscount)}
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
                onClick={handleFlip}
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

      <div className="card-back popup-content">
        <p onClick={handleFlip}>car</p>

        {renderSlider("Count of Boys", Hboyscount, setHboyscount)}

        {renderSlider("Count of Boys", HgirlsCount, setHGirlsCount)}

        {renderCounter(
          "Count of Female Faculty",
          HfemaleFacultyCount,
          setHFemaleFacultyCount
        )}
        {renderCounter(
          "Count of male Faculty",
          HmaleFacultyCount,
          setHMaleFacultyCount
        )}
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

  const [selectedContent, setSelectedContent] = useState([]);
  const [quantities, setQuantities] = useState({});

  const [quantityDialogOpen, setQuantityDialogOpen] = useState(false);

  const handleClick = (item) => {
    setSelectedContent((prevSelectedContent) => {
      if (prevSelectedContent.includes(item.name)) {
        const updatedSelectedContent = prevSelectedContent.filter(
          (content) => content !== item.name
        );
        const updatedQuantities = { ...quantities };
        delete updatedQuantities[item.name];
        setQuantities(updatedQuantities);
        return updatedSelectedContent;
      } else {
        return [...prevSelectedContent, item.name];
      }
    });
  };

  const handleQuantityChange = (itemName, quantity) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemName]: quantity,
    }));
  };

  const handleSubmit = () => {
    onSave(); // Trigger the save action
    onClose(); // Close the popup
  };

  const openQuantityDialog = () => {
    setQuantityDialogOpen(true);
  };

  const closeQuantityDialog = () => {
    setQuantityDialogOpen(false);
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
      <div
        className="popup-content"
        style={{ width: "80%", height: "80%" }}
        onClick={(e) => e.stopPropagation()}
      >
        <ThemeProvider theme={theme}>
          <div className="itemschoosing">
            <h3>Venue Requirements</h3>
            <h3>Select the items you need for your venue</h3>
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

              <Dialog open={quantityDialogOpen} onClose={closeQuantityDialog}>
                <DialogTitle>Selected Items and Quantities</DialogTitle>
                <DialogContent>
                  {selectedContent.map((itemName) => (
                    <div key={itemName} style={{ marginBottom: "10px" }}>
                      <Typography variant="body1">{itemName}</Typography>
                      <TextField
                        label="Quantity"
                        type="number"
                        value={quantities[itemName] || ""}
                        onChange={(e) =>
                          handleQuantityChange(itemName, e.target.value)
                        }
                        fullWidth
                      />
                    </div>
                  ))}
                </DialogContent>
                <DialogActions>
                  <Button onClick={closeQuantityDialog} color="primary">
                    Cancel
                  </Button>
                  <Button onClick={handleSubmit} color="primary">
                    Confirm
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
            <div className="popup-buttons">
              <button onClick={openQuantityDialog}>Save</button>
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
