import React, { useState } from "react";
import {
  Card,
  Button,
  IconButton,
  Box,
  Grid,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  InputAdornment,
  MenuItem,
  DialogActions,
  Stepper,
  Step,
  StepLabel,
  Typography,
  Paper,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { useSwipeable } from "react-swipeable";
import { styled } from "@mui/system";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { IoPersonAddOutline } from "react-icons/io5";
import { HiOutlineXMark } from "react-icons/hi2";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import {
  ArrowBack,
  ArrowForward,
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
  width: "60%",
  "& > div": {
    position: "absolute",
    transition: "transform 0.3s ease",
  },
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
  console.log(`Number ${number} is not in any pair.`);
};
const ListItem = ({
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
        height: "400px",
        boxShadow: 3,
        borderRadius: 2,
        // border: "solid black",
      }}
    >
      {cardno + 1}
      {pairedman}

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
          <IconButton onClick={onNext}>
            <FaArrowLeft />
          </IconButton>
          <IconButton onClick={onPrev}>
            <FaArrowRight />
          </IconButton>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button color="primary">Change Color</Button>
        </DialogActions>
      </Box>
    </Card>
  );
};

const maxVisibleSteps = 3;

const app = ({ handleChangeColor, handleClose }) => {
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
  ]);

  console.log(cards);
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
    console.log("yep iwam ");
    const initialGuests = cards.map((card) =>
      card.id === id ? { ...card, [field]: value } : card
    );
    setCards(initialGuests);
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  ///////////////////////

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

  // const handleStayAlone = (guestId) => {
  //   setAloneGuests([...aloneGuests, guestId]);
  //   setGuestData((prevGuestData) =>
  //     prevGuestData.filter((g) => g.id !== guestId)
  //   );
  //   setLastAction({ type: "alone", guestId });
  //   setSelectedGuest(null);
  // };

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

  // console.log(cards.firstName + "yo");
  return (
    <div
      style={{
        border: "solid green",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box sx={{ width: "100%", padding: "20px" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >



          <IconButton onClick={handleBack} disabled={startStep === 0}>
            <ArrowBack />
          </IconButton>
          <Stepper alternativeLabel nonLinear activeStep={-1} sx={{ flex: 1 }}>
            {cards
              .slice(startStep, startStep + maxVisibleSteps)
              .map((guest, index) => (
                <Step key={guest.id}>
                  <StepLabel
                    StepIconComponent={() => <div>{startStep + index + 1}</div>}
                    >
                    {guest.firstName} 
                    {/* Show Unpair button below the names if the guest is part of a group */}
                    {getUnpairableGroup(guest.id).length > 0 && (
                      <Box sx={{ marginTop: "10px" }}>
                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={<Undo />}
                          onClick={() =>
                            unpairGroup(getUnpairableGroup(guest.id))
                          }
                        >
                          Unpair
                        </Button>
                      </Box>
                    )}

                    {/* Show Undo Alone button if the guest is in the aloneGuests list */}
                    {aloneGuests.includes(guest.id) && (
                      <Box sx={{ marginTop: "10px" }}>
                        <Button
                          variant="outlined"
                          size="small"
                          color="secondary"
                          startIcon={<Undo />}
                          onClick={() => handleUndoAlone(guest.id)}
                        >
                          Undo Alone
                        </Button>
                      </Box>
                    )}
                  </StepLabel>
                  <Box
                    sx={{
                      marginTop: "10px",
                      padding: "10px",
                      textAlign: "center",
                      backgroundColor: "#f0f0f0",
                    }}
                  >
                    <Typography variant="body2" sx={{ marginBottom: "10px" }}>
                      Pairing Options
                    </Typography>

                    {guestData.some((g) => g.id === guest.id) && (
                      <>
                        <Grid container spacing={1} justifyContent="center">
                          <Grid item>
                            <Button
                              variant="outlined"
                              size="small"
                              startIcon={<PersonAdd />}
                              onClick={() =>
                                handleSelectGuestForPairing(guest.id)
                              }
                              sx={{
                                backgroundColor:
                                  selectedGuest === guest.id
                                    ? "lightblue"
                                    : "transparent",
                                borderColor:
                                  selectedGuest === guest.id ? "blue" : "grey",
                                color:
                                  selectedGuest === guest.id ? "blue" : "black",
                                "&:hover": {
                                  backgroundColor:
                                    selectedGuest === guest.id
                                      ? "lightblue"
                                      : "transparent",
                                },
                              }}
                            >
                              Pair
                            </Button>
                          </Grid>

                          <Grid item>
                            <Button
                              variant="outlined"
                              size="small"
                              color="warning"
                              startIcon={<PersonOutline />}
                              onClick={() => handleStayAlone(guest.id)}
                            >
                              Stay Alone
                            </Button>
                          </Grid>
                        </Grid>

                        {selectedGuest === guest.id && (
                          <Box sx={{ marginTop: "10px" }}>
                            <Typography variant="body2">
                              Select a guest to pair with:
                            </Typography>
                            <Grid container spacing={1} justifyContent="center">
                              {guestData
                                .filter(
                                  (otherGuest) => otherGuest.id !== guest.id
                                )
                                .map((otherGuest) => (
                                  <Grid item key={otherGuest.id}>
                                    <Button
                                      variant="outlined"
                                      size="small"
                                      onClick={() =>
                                        handlePairing(guest.id, otherGuest.id)
                                      }
                                    >
                                      {otherGuest.firstName}
                                    </Button>
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
          <IconButton
            onClick={handleNextx}
            disabled={startStep + maxVisibleSteps >= initialGuests.length}
          >
            <ArrowForward />
          </IconButton>
        </Box>

        {groups.length > 0 && (
          <Box sx={{ marginTop: "40px" }}>
            <Typography variant="h6">Paired Groups</Typography>
            {groups.map((group, index) => (
              <Paper key={index} sx={{ padding: "10px", marginTop: "10px" }}>
                <Typography>
                  Group:{" "}
                  {group
                    .map(
                      (id) => initialGuests.find((g) => g.id === id).firstName
                    )
                    .join(", ")}
                </Typography>
              </Paper>
            ))}
          </Box>
        )}
      </Box>

      <div className="boss">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            width: "900px",
            height: "500px",
          }}
        >
          <CardStack {...swipeHandlers}>
            {cards.map((item, index) => (
              <Box
                key={item.id}
                sx={{
                  transform: `translateX(${
                    (currentIndex - index) * -40
                  }px) scale(${index === currentIndex ? 1 : 0.95})`,
                  zIndex: cards.length - Math.abs(currentIndex - index),
                  opacity: currentIndex === index ? 1 : 0.5,
                  transition: "transform 0.3s ease, opacity 0.3s ease",
                }}
              >
                <ListItem
                  item={item}
                  cardno={index}
                  onPrev={handlePrev}
                  onNext={handleNext}
                  groups={groups}
                  initialGuests={initialGuests}
                  handleChangeColor={handleChangeColor}
                  handleClose={handleClose}
                  onInputChange={(field, value) =>
                    handleInputChange(item.id, field, value)
                  }
                />
              </Box>
            ))}
          </CardStack>
        </Box>
      </div>
    </div>
  );
};  

export default app;
