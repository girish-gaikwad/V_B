import React, { useState } from "react";
import "../Style/FlowChart.css";
import Event from "../Assets/Event.png";
import Guest from "../Assets/Guest.png";
import Participants from "../Assets/Participants.png";
import Venue from "../Assets/Venue.png";
import Transport from "../Assets/Transport.png";
import Accomodation from "../Assets/Accomodation.png";
import Food from "../Assets/Food.png";
import VenueRequirements from "../Assets/Venue Requirements.png";

import { EventPopup, GuestPopup, ParticipantsPopup, AccomodationPopup, TransportPopup, VenuePopup, VenueRequirementPopup } from "./Popups";

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
  // **New state variable to track if the Event is completed**
  const [isEventCompleted, setIsEventCompleted] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [colorMap, setColorMap] = useState({});
  const [changeborder, setborder] = useState({});

  const handleBoxClick = (item) => {
    // **Only allow Event form to be clicked initially**
    if (item.id === "Event" || isEventCompleted) {
      setSelectedItem(item);
    }
  };

  const handleSave = () => {
    setColorMap((prev) => ({
      ...prev,
      [selectedItem.id]: "#bbcbf2",
    }));
    setborder((prev) => ({
      ...prev,
      [selectedItem.id]: "2.5px solid #2d5dd9",
    }));

    // **If the saved item is Event, mark it as completed**
    if (selectedItem.id === "Event") {
      setIsEventCompleted(true);
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
    <div className="tree">
      {treeRendering(treeData, handleBoxClick, colorMap, changeborder)}
      {renderPopup()}
    </div>
  );
};

const treeRendering = (treeData, handleBoxClick, colorMap, changeborder) => {
  return (
    <ul>
      {treeData.map((item) => (
        <li key={item.id} className={item.text + item.id}>
          <div className="logoimage" onClick={() => handleBoxClick(item)}>
            <div
              className="formbox"
              style={{
                border: changeborder[item.id] || "2.5px solid #f77575",
                backgroundColor: colorMap[item.id] || "#fe6f6f45",
                // **Disable cursor for forms other than Event when Event is not completed**
                cursor: item.id !== "Event" && !colorMap["Event"] ? "not-allowed" : "pointer",
              }}
            >
              <img src={item.image} alt={item.id} />
            </div>
            <h6 className="flowname">{item.id}</h6>
          </div>
          {item.children && item.children.length
            ? treeRendering(item.children, handleBoxClick, colorMap, changeborder)
            : null}
        </li>
      ))}
    </ul>
  );
};

export default TreeStructure;
