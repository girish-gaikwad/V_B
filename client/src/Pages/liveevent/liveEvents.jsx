import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import { useState, useEffect } from "react";
import account from "../../Assets/account_circle.png";

import createventlogo from "../../Assets/createventlogo.png";
import person from "../../Assets/person.png";
import axios from "axios";
import download from "../../Assets/download.jpg";
import "./liveEvent.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import AspectRatio from "@mui/joy/AspectRatio";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { helix } from "ldrs";
import TreeStructure from "../flowchart/flowCharts";
import SIDEBAR from "../sidebar/sidebar";

function LiveEvent() {
  const [card, setCard] = useState(false);
  const [eventx, setEvents] = useState([]);
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
          backgroundColor: "#f6f6f6",
          width: "100vw",
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
          width: "100vw",
          backgroundColor: "#f6f6f6",
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
        <SIDEBAR />

        <div className="rightwindow">
          <div className="wcover">
            <div className="bell">
              <div className="circle">
                <img src={account} alt="Account" className="accimgx" />
              </div>
            </div>

            <div className="support">
              <div className={`change ${isDialogOpen ? "dialog-open" : ""}`}>
                <Router>
                  <Routes>
                    <Route
                      path="/"
                      element={
                        <>
                          <div className="createbutton">
                            <div>
                              {card ? (
                                <h3 className="titlename">Live events</h3>
                              ) : (
                                <h2></h2>
                              )}
                            </div>

                            <Link to={"/tree"}>
                              <button id="Cbutton">Create +</button>
                            </Link>
                          </div>
                          <div className="cardscover">
                            <div
                              className={`imgcontainer grid-container ${
                                card ? "grid fade-in" : "flex fade-in"
                              }`}
                            >
                              {card ? (
                                eventx.map((event, index) => (
                                  <Card
                                    key={index}
                                    variant="outlined"
                                    sx={{ width: "100%", height: "100%" }}
                                    className="individual-card"
                                  >
                                    <AspectRatio ratio="2.3">
                                      <img
                                        src={download}
                                        loading="lazy"
                                        alt=""
                                      />
                                    </AspectRatio>
                                    <div className="divider">
                                      <div className="data">
                                        <div className="left-data">
                                          <h2>
                                            {formatDate(event.start_at).month}
                                          </h2>
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
                                        </div>
                                      </div>
                                    </div>
                                    <Divider />
                                  </Card>
                                ))
                              ) : (
                                <img
                                  // onClick={handelcreate}
                                  src={person}
                                  alt="Person"
                                  id="personx"
                                />
                              )}
                            </div>
                          </div>
                        </>
                      }
                    />
                    <Route path="/tree" element={<TreeStructure />} />
                  </Routes>
                </Router>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LiveEvent;
