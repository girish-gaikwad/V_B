import { useState, useEffect } from "react";
import accimg from "../img/image1.png";
import logo from "../img/image.png";
import exe from "../img/exe.png";
import person from "../img/person.png";
import axios from "axios";
import "../Style/LiveEvent.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import AspectRatio from "@mui/joy/AspectRatio";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import TreeStructure from "./FlowChart";
import { helix } from "ldrs";

function Home() {
  const [card, setCard] = useState(false);
  const [eventx, setEvents] = useState([]);
  const [showNewDiv, setShowNewDiv] = useState(false);
  const [showFlowChart, setShowFlowChart] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  helix.register();

  function handleCardsView() {
    const imgtocard = document.querySelector(".imgcontainer");
    const changeDiv = document.querySelector(".change");
  
    if (eventx.length > 0 && changeDiv) {
      changeDiv.style.height = "100%";
    }
  
    if (imgtocard) {
      imgtocard.style.height = "90%";
      imgtocard.classList.remove("center"); // Remove center class when cards are shown
      imgtocard.classList.remove("flex"); // Remove flex class
      imgtocard.classList.add("grid"); // Add grid class
      imgtocard.classList.add("fade-in"); // Add fade-in class for animation
    }
  }
  

 
  // the backend logic
  useEffect(() => {
    axios
      .get(`http://localhost:8000/get/eventdata`)
      .then((response) => {
        setEvents(response.data);
        setLoading(false);
        if (response.data.length > 0) {
          setCard(true);
        }
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
        setError("503 Failed to Get Data");
        setLoading(false);
      });
  }, []);
  
  useEffect(() => {
    if (eventx.length > 0) {
      handleCardsView();
    }
  }, [eventx]);
  

  function handelcreate() {
    const elements = document.getElementsByClassName("change");

    if (elements.length > 0) {
      const element = elements[0];
      element.style.height = "100%";
    }

    const buttonElement = document.getElementById("Cbutton");
    const div = document.querySelector(".createbutton");

    if (buttonElement && div) {
      buttonElement.style.display = "none";
      div.style.display = "none";
    }

    const imgtoremove = document.getElementById("personx");
    const imgtocard = document.querySelector(".imgcontainer");

    if (imgtoremove) {
      imgtoremove.classList.add("fade-out");
    }

    if (imgtocard) {
      imgtocard.classList.add("fade-out");
    }

    setTimeout(() => {
      if (imgtoremove) {
        imgtoremove.style.display = "none";
      }
      if (imgtocard) {
        imgtocard.style.display = "none";
      }
      setShowNewDiv(true);
      setShowFlowChart(true);
    }, 500); // delay to allow fade-out animation
  }

  

  function handlePersonImageView() {
    const imgtocard = document.querySelector(".imgcontainer");
    if (imgtocard) {
      imgtocard.classList.remove("grid"); // Remove grid class
      imgtocard.classList.add("flex"); // Add flex class when person image is shown
      imgtocard.classList.add("fade-in"); // Add fade-in class for animation
    }
  }

  const timeconverter = (time) => {
    const [hours, minutes] = time.split(":");
    const h = parseInt(hours, 10);
    const period = h >= 12 ? "PM" : "AM";
    const Hour = h % 12 || 12;
    return `${Hour}:${minutes} ${period}`;
  };

  const formatDate = (isoString) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const date = new Date(isoString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return { day, month: months[parseInt(month) - 1], year };
  };

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDialogStateChange = (isOpen) => {
    setIsDialogOpen(isOpen);
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor:"#f6f6f6",
          width:"100vw"
        }}
        >
        <l-helix size="95" speed="2.5" color="rgb(29, 60, 140)"></l-helix>
      </div>
    );
  }

  if (error) {
    return (
      <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width:"100vw",
        backgroundColor:"#f6f6f6"
        }}
      >
        <l-helix size="95" speed="2.5" color="black"></l-helix>
        <p style={{ color: "red", marginTop: "30px" }}>Error: {error}</p>
      </div>
    );
  }

  return (
    <>
      <div className="box">
        <div className="sidebar">
          <div className="websitename">
            <div className="tags">
              <img src={logo} alt="Website Logo" />
              <p>Event</p>
            </div>
          </div>

          <div className="currentpage">
            <div className="tags">
              <img src={exe} alt="Create Event" />
              <p>Create Event</p>
            </div>
          </div>
        </div>

        <div className="rightwindow">
          <div className="wcover">
            <div className="bell">
              <div className="circle">
                <img src={accimg} alt="Account" className="accimgx" />
              </div>
            </div>
            <div className="support">
              <div className={`change ${isDialogOpen ? "dialog-open" : ""}`}>

                <div className="createbutton">
                  <div>
                    {card ? (
                      <h3 className="titlename">Live events</h3>
                    ) : (
                      <h2></h2>
                    )}
                  </div>
                  <button
                    id="Cbutton"
                    onClick={() => {
                      handelcreate();
                      handlePersonImageView(); // Call this to center the person image
                    }}
                  >
                    Create +
                  </button>
                </div>

                <div
                  className={`imgcontainer ${
                    card ? "grid fade-in" : "flex fade-in"
                  }`}
                >

                  {card ? (
                    eventx.map((event, index) => (
                      <Card
                        key={index}
                        variant="outlined"
                        sx={{ width: 280  }}
                        className="individual-card"
                      >
                        <AspectRatio ratio="2">
                          <img
                            src="https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?auto=format&fit=crop&w=318"
                            srcSet="https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?auto=format&fit=crop&w=318&dpr=2 2x"
                            loading="lazy"
                            alt=""
                          />
                        </AspectRatio>
                        <div className="divider">
                          <div className="data">
                            <div className="left-data">
                              <h2>{formatDate(event.start_at).month}</h2>
                              <p>
                                {formatDate(event.start_at).day} -{" "}
                                {formatDate(event.end_at).day}
                              </p>
                              <h6
                                className={
                                  event.status === 1
                                    ? "status1"
                                    : event.status === 2
                                    ? "status2"
                                    : event.status === 3
                                    ? "status3"
                                    : ""
                                }
                              >
                                {event.status === 1
                                  ? "CREATED NOW"
                                  : event.status === 2
                                  ? "IN-PROGRESS"
                                  : event.status === 3
                                  ? "ASSIGNED "
                                  : ""}
                                &nbsp;
                              </h6>
                            </div>

                            <div className="right-data">
                              <h2>{event.event_code}</h2>
                              <h5>{event.event_name}</h5>
                              {/* <p>
                                {timeconverter(event.fromtime)} -
                                {timeconverter(event.totime)}
                              </p> */}
                            </div>
                          </div>
                        </div>
                        <Divider />
                      </Card>
                    ))
                  ) : (
                    <img
                      onClick={handelcreate}
                      src={person}
                      alt="Person"
                      id="personx"
                    />
                  )}
                </div>




                {showNewDiv && (
                  <div className="flowchart">
                    <TreeStructure
                      onDialogStateChange={handleDialogStateChange}
                    />
                  </div>
                )}




                
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
