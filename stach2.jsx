import React, { useState } from 'react';
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Grid,
  Paper,
  Chip,
  IconButton,
  styled,
  Card,
  TextField,
  FormLabel,
  FormControl,
  MenuItem,
  DialogActions,
} from '@mui/material';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import { GroupAdd, PersonAdd, PersonOutline, Undo, GroupRemove, ArrowBack, ArrowForward } from '@mui/icons-material';


import { useSwipeable } from "react-swipeable";
// Sample guest data
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




const findGroupMembers = (number, pairs) => {
  for (const group of pairs) {
    if (group.includes(number)) {
      // Filter out the given number from the group
      return group.filter(id => id !== number);
    }
  }
  console.log(`Number ${number} is not in any group.`);
  return []; // Return an empty array if the number is not found
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
  const pairedman = findGroupMembers(cardno + 1, groups);
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

//////////////////





function GuestPairingStepper() {

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

  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleNextx,
    onSwipedRight: handlePrevx,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });




  //////////////
  const [guestData, setGuestData] = useState(initialGuests);
  const [groups, setGroups] = useState([]);
  const [aloneGuests, setAloneGuests] = useState([]);
  const [visibleStart, setVisibleStart] = useState(0); // Start of visible range
  const [activeStep, setActiveStep] = useState(0); // Active step index
  const [pairingOptionsVisible, setPairingOptionsVisible] = useState(null); // ID of the guest whose pairing options are visible
  const visibleCount = 3; // Number of visible steps at a time



  console.log(groups)
  // Function to find the group containing a guest
  const findGroupContainingGuest = (guestId) => {
    return groups.find(group => group.includes(guestId));
  };

  // Function to handle pairing guests
  const handlePairing = (guestId, pairedGuestId) => {
    setGuestData((prevGuestData) => {
      const guestGroup = findGroupContainingGuest(guestId);
      const pairedGuestGroup = findGroupContainingGuest(pairedGuestId);

      let newGroups = [...groups];

      if (guestGroup && pairedGuestGroup && guestGroup !== pairedGuestGroup) {
        // Merge two groups
        const mergedGroup = Array.from(new Set([...guestGroup, ...pairedGuestGroup]));
        newGroups = newGroups.filter(group => group !== guestGroup && group !== pairedGuestGroup);
        newGroups.push(mergedGroup);
      } else if (guestGroup) {
        // Add pairedGuestId to guestGroup
        newGroups = newGroups.map(group => 
          group === guestGroup ? Array.from(new Set([...group, pairedGuestId])) : group
        );
      } else if (pairedGuestGroup) {
        // Add guestId to pairedGuestGroup
        newGroups = newGroups.map(group => 
          group === pairedGuestGroup ? Array.from(new Set([...group, guestId])) : group
        );
      } else {
        // Create a new group
        newGroups.push([guestId, pairedGuestId]);
      }

      setGroups(newGroups);

      return prevGuestData.filter(g => !newGroups.flat().includes(g.id));
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

      setGroups(prevGroups => [
        ...prevGroups.filter(g => !g.some(id => newGroup.includes(id))),
        newGroup
      ]);

      return prevGuestData.filter(g => g.id !== guestId);
    });

    // Remove guests from aloneGuests list if they join a group
    setAloneGuests((prevAloneGuests) =>
      prevAloneGuests.filter((id) => id !== guestId)
    );
  };

  // Function to handle staying alone
  const handleStayAlone = (guestId) => {
    setAloneGuests((prevAloneGuests) => [...prevAloneGuests, guestId]);
    setGuestData((prevGuestData) => prevGuestData.filter(g => g.id !== guestId));

    // If guest is in a group, remove them from the group
    setGroups((prevGroups) => prevGroups.map(group => group.filter(id => id !== guestId)));
  };

  // Function to handle leaving alone
  const handleLeaveAlone = (guestId) => {
    setAloneGuests((prevAloneGuests) => prevAloneGuests.filter(id => id !== guestId));
    setGuestData((prevGuestData) => [
      ...prevGuestData,
      initialGuests.find(g => g.id === guestId)
    ]);
  };

  // Function to handle leaving a group
  const handleLeaveGroup = (guestId) => {
    setGroups((prevGroups) => prevGroups.map(group => group.filter(id => id !== guestId)).filter(group => group.length > 0));
    setGuestData((prevGuestData) => [
      ...prevGuestData,
      initialGuests.find(g => g.id === guestId)
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
    setVisibleStart((prev) => Math.min(prev + 1, initialGuests.length - visibleCount));
    setActiveStep(nextStep);
  };

  // Function to toggle pairing options visibility
  const togglePairingOptions = (guestId) => {
    setPairingOptionsVisible(prevId => (prevId === guestId ? null : guestId));
  };

  return (
    <>
    
    <Box sx={{ width: '100%', padding: '20px' }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <IconButton onClick={handlePrev} disabled={visibleStart === 0}>
          <ArrowBack />
        </IconButton>

        <Stepper alternativeLabel nonLinear activeStep={activeStep} sx={{ flexGrow: 1 }}>
          {initialGuests.slice(visibleStart, visibleStart + visibleCount).map((guest, index) => {
            const inGroup = findGroupContainingGuest(guest.id);
            const isAlone = aloneGuests.includes(guest.id);
            const groupMembers = inGroup ? findGroupContainingGuest(guest.id) : [];

            return (
              <Step key={guest.id}>
                <StepLabel
                  StepIconComponent={(props) => (
                    <Box
                      {...props}
                      sx={{
                        ...props.sx,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 24,
                        height: 24,
                        borderRadius: '50%',
                        border: '2px solid',
                        borderColor: 'primary.main',
                        fontSize: '14px',
                        color: 'primary.main',
                        backgroundColor: 'background.paper',
                      }}
                    >
                      {guest.id}
                    </Box>
                  )}
                >
                  <Typography variant="caption" sx={{ display: 'block', textAlign: 'center', marginTop: '4px' }}>
                    {guest.firstName}
                  </Typography>
                </StepLabel>
                <Box sx={{ marginTop: '10px', padding: '10px', textAlign: 'center', backgroundColor: '#f0f0f0' }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => togglePairingOptions(guest.id)}
                  >
                    {pairingOptionsVisible === guest.id ? 'Hide Options' : 'Pair'}
                  </Button>

                  {pairingOptionsVisible === guest.id && (
                    <Box sx={{ marginTop: '10px' }}>
                      {!isAlone && !inGroup && (
                        <Grid container spacing={1} justifyContent="center">
                          {guestData
                            .filter(otherGuest => otherGuest.id !== guest.id)
                            .map(otherGuest => (
                              <Grid item key={otherGuest.firstName}>
                                <Button
                                  variant="outlined"
                                  size="small"
                                  startIcon={<PersonAdd />}
                                  onClick={() => handlePairing(guest.id, otherGuest.id)}
                                >
                                  Pair with {otherGuest.firstName}
                                  <Typography variant="caption" sx={{ display: 'block', marginTop: '2px' }}>
                                    ID: {otherGuest.id}
                                  </Typography>
                                </Button>
                              </Grid>
                            ))}

                          {groups
                            .filter(group => !group.includes(guest.id))
                            .map((group, index) => (
                              <Grid item key={index}>
                                <Button
                                  variant="outlined"
                                  size="small"
                                  color="success"
                                  startIcon={<GroupAdd />}
                                  onClick={() => handleJoinGroup(guest.id, group)}
                                >
                                  Join Group
                                  <Typography variant="caption" sx={{ display: 'block', marginTop: '2px' }}>
                                    {group.map(id => {
                                      const member = initialGuests.find(g => g.id === id);
                                      return member ? `${member.name} (ID: ${id})` : '';
                                    }).join(', ')}
                                  </Typography>
                                </Button>
                              </Grid>
                            ))}

                          <Grid container spacing={1} justifyContent="center">
                            <Grid item>
                              <Button
                                variant="outlined"
                                size="small"
                                color="error"
                                startIcon={<PersonOutline />}
                                onClick={() => handleStayAlone(guest.id)}
                              >
                                Stay Alone
                              </Button>
                            </Grid>
                          </Grid>
                        </Grid>
                      )}

                      {isAlone && (
                        <Grid container spacing={1} justifyContent="center">
                          <Grid item>
                            <Button
                              variant="outlined"
                              size="small"
                              color="success"
                              startIcon={<Undo />}
                              onClick={() => handleLeaveAlone(guest.id)}
                            >
                              Undo Alone
                            </Button>
                          </Grid>
                        </Grid>
                      )}

                      {inGroup && (
                        <Box>
                          <Typography variant="body2" sx={{ marginBottom: '10px' }}>
                            Group Members:
                          </Typography>
                          <Grid container spacing={1} justifyContent="center">
                            {groupMembers.map((memberId) => {
                              const member = initialGuests.find(g => g.id === memberId);
                              return (
                                <Grid item key={memberId}>
                                  <Chip label={`${member.name} (ID: ${member.id})`} />
                                </Grid>
                              );
                            })}
                          </Grid>
                          <Grid container spacing={1} justifyContent="center" sx={{ marginTop: '10px' }}>
                            <Grid item>
                              <Button
                                variant="outlined"
                                size="small"
                                color="error"
                                startIcon={<GroupRemove />}
                                onClick={() => handleLeaveGroup(guest.id)}
                              >
                                Leave Group
                              </Button>
                            </Grid>
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

        <IconButton onClick={handleNext} disabled={visibleStart + visibleCount >= initialGuests.length}>
          <ArrowForward />
        </IconButton>
      </Box>
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
                  onPrev={handlePrevx}
                  onNext={handleNextx}
                  groups={groups}
                  initialGuests={initialGuests}
                  // handleChangeColor={handleChangeColor}
                  // handleClose={handleClose}
                  onInputChange={(field, value) =>
                    handleInputChange(item.id, field, value)
                  }
                />
              </Box>
            ))}
          </CardStack>
        </Box>
      </div>

    </>
  );
}

export default GuestPairingStepper;
