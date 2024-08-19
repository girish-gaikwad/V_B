import React, { useState } from "react";
import "./flowChart.css";
import Event from "../../assets/Event.png";
import Guest from "../../assets/Guest.png";
import Participants from "../../assets/Participants.png";
import Venue from "../../assets/Venue.png";
import Transport from "../../assets/Transport.png";
import Accomodation from "../../assets/Accomodation.png";
import Food from "../../assets/Food.png";
import VenueRequirements from "../../assets/Venue Requirements.png";
import { CircularProgress } from "@mui/material";
import { EventPopup, GuestPopup, ParticipantsPopup, AccomodationPopup, TransportPopup, VenuePopup, VenueRequirementPopup } from "../popups/popUp";

const treeData = [
  {
    id: "Event",
    image: Event,
    popup: "EventPopup",
    children: [
      {
        id: "Invitees",
        image: Guest,
        children: [
          {
            id: "Guest",
            image: Guest,
            popup: "GuestPopup",
            children: [
              {
                id: "Accomodation",
                image: Accomodation,
                popup: "AccomodationPopup",
              },
              {
                id: "Transport",
                image: Transport,
                popup: "TransportPopup",
              },
            ],
          },
          {
            id: "Participants",
            image: Participants,
            popup: "ParticipantsPopup",
          },
        ],
      },
      {
        id: "Venue",
        image: Venue,
        popup: "VenuePopup",
        children: [
          {
            id: "Venue Requirements",
            image: VenueRequirements,
            popup: "VenueRequirementPopup",
          },
        ],
      },
    ],
  },
];

const TreeStructure = () => {
  const [isEventCompleted, setIsEventCompleted] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [colorMap, setColorMap] = useState({});
  const [progressMap, setProgressMap] = useState({ Invitees: 0 });
  const [changeborder, setborder] = useState({});



  // changes by girish 


  // const [formData, setFormData] = useState({
  //   user_id: 1,
  //   event_code: "IT19999",
  //   event_name: "",
  //   start_at: "",
  //   end_at: "",
  //   event_type: "",
  //   assigned_to: "",
  // });

  const handleBoxClick = (item) => {
    if (item.id === "Event" || isEventCompleted || item.id === "Invitees") {
      setSelectedItem(item);
    }
  };

  const handleSave = () => {
    setColorMap((prev) => ({
      ...prev,
      [selectedItem.id]: "#bbcbf2", // Change color to blue
    }));
    setborder((prev) => ({
      ...prev,
      [selectedItem.id]: "2.5px solid #2d5dd9", // Change border to blue
    }));
    if (selectedItem.id === "Event") {
      setIsEventCompleted(true);
    }

    // Increment progress based on which item was selected
    if (
      ["Guest", "Participants", "Accomodation", "Transport"].includes(selectedItem.id)
    ) {
      setProgressMap((prev) => ({
        ...prev,
        Invitees: Math.min(prev.Invitees + 25, 100), // Increase by 25% per node completion
      }));
    }
  };

  const renderPopup = () => {
    if (!selectedItem) return null;
    const popupProps = {
      onClose: () => setSelectedItem(null),
      onSave: handleSave,
    };
    switch (selectedItem.popup) {
      case "EventPopup":
        return <EventPopup {...popupProps} />;
      case "GuestPopup":
        return <GuestPopup {...popupProps} />;
      case "AccomodationPopup":
        return <AccomodationPopup {...popupProps} />;
      case "TransportPopup":
        return <TransportPopup {...popupProps} />;
      case "ParticipantsPopup":
        return <ParticipantsPopup {...popupProps} />;
      case "VenuePopup":
        return <VenuePopup {...popupProps} />;
      case "VenueRequirementPopup":
        return <VenueRequirementPopup {...popupProps} />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="tree">
        {treeRendering(treeData, handleBoxClick, colorMap, changeborder, progressMap)}
        {renderPopup()}
      <div className="confirmsubmit">
        <button type="submit">Confirm</button>
        <button type="submit">Re-Request</button>
        <button type="submit">Go Back</button>
      </div>
      </div>
    </>
  );
};

const treeRendering = (treeData, handleBoxClick, colorMap, changeborder, progressMap) => {
  return (
    <>
      <ul>
        {treeData.map((item) => (
          <li key={item.id} className={`${item.text} ${item.id}`}>
            <div className="logoimage" onClick={() => handleBoxClick(item)}>
              <div
                className="formbox"
                style={{
                  border: item.id !== "Invitees" ? changeborder[item.id] || "2.5px solid #f77575" : "none",
                  backgroundColor: item.id !== "Invitees" ? colorMap[item.id] || "#fe6f6f45" : "transparent",
                  cursor: item.id !== "Event" && !colorMap["Event"] && item.id !== "Invitees" ? "not-allowed" : "pointer"&&item.id === "Invitees" ? "context-menu":"",
                  position: "relative", // For positioning the CircularProgress
                }}
              >
                {item.id === "Invitees" && (
                  <CircularProgress
                  variant="determinate"
                  value={progressMap.Invitees}
                  size="105px"
                  thickness={2}
                  className="redProgress"
                  style={{ position: "absolute", top: -2, left: -2, zIndex: 1 }}
                />
                )}
                <img src={item.image} alt={item.id} style={{ zIndex: 2, position: "relative" }} />
              <h6 className="flowname">{item.id}</h6>
              </div>
            </div>
            {item.children && item.children.length ? treeRendering(item.children, handleBoxClick, colorMap, changeborder, progressMap) : null}
          </li>
        ))}
      </ul>
    </>
  );
};

export default TreeStructure;
