import React, { useState } from "react";
import "./flowChart.css";
import Event from "../../Assets/Event.png";
import Guest from "../../Assets/Guest.png";
import Participants from "../../Assets/Participants.png";
import Venue from "../../Assets/Venue.png";
import Transport from "../../Assets/Transport.png";
import Accomodation from "../../Assets/Accomodation.png";
import Food from "../../Assets/Food.png";
import VenueRequirements from "../../Assets/Venue Requirements.png";
import { CircularProgress } from "@mui/material";
import {
  EventPopup,
  GuestPopup,
  ParticipantsPopup,
  AccomodationPopup,
  TransportPopup,
  VenuePopup,
  VenueRequirementPopup,
} from "../popups/popUp";
import SpecialRequest from "../specialrequest/specialrequest";

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

  const [formData, setFormData] = useState({
    user_id: 1,
    event_code: "IT1002",
    event_name: "",
    start_at: "",
    end_at: "",
    event_type: "",
    assigned_to: "",
  });

  const confirm = () => {
    const formattedStartDate = formData.start_at.replace("T", " ") + ":00";
    const formattedEndDate = formData.end_at.replace("T", " ") + ":00";

    // Update formData with the formatted dates
    const FormattedFormData = {
      ...formData,
      start_at: formattedStartDate,
      end_at: formattedEndDate,
    };
    console.log(FormattedFormData);
    axios
      .post("http://localhost:8000/post/eventform", FormattedFormData)
      .then((response) => {
        console.log(FormattedFormData);
        console.log("Event saved:", response.data);
        const id = response.data.event_id; // getting the insterted event_id from the backend.

        alert(
          "Event Data fetched to database table successfully\n event_id: ",
          id
        );
        onSave(); // Trigger the color change
        onClose();
      })
      .catch((error) => {
        console.error("Error saving event:", error);
      });
  };

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
      ["Guest", "Participants", "Accomodation", "Transport"].includes(
        selectedItem.id
      )
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
        return (
          <EventPopup
            {...popupProps}
            formData={formData}
            setFormData={setFormData}
          />
        );
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
        {treeRendering(
          treeData,
          handleBoxClick,
          colorMap,
          changeborder,
          progressMap
        )}
        {renderPopup()}

        <div className="relative">
          <SpecialRequest />
        </div>
      </div>

      <div className="confirmsubmit">
        <button type="submit" onClick={confirm}>
          Confirm
        </button>
        <button type="submit">Re-Request</button>
        <button type="submit">Go Back</button>
      </div>
    </>
  );
};

const treeRendering = (
  treeData,
  handleBoxClick,
  colorMap,
  changeborder,
  progressMap
) => {
  return (
    <>
      <ul>
        {treeData.map((item) => (
          <li key={item.id} className={`${item.text} ${item.id}`}>
            <div className="logoimage" onClick={() => handleBoxClick(item)}>
              <div
                className="formbox"
                style={{
                  border:
                    item.id !== "Invitees"
                      ? changeborder[item.id] || "2.5px solid #f77575"
                      : "none",
                  backgroundColor:
                    item.id !== "Invitees"
                      ? colorMap[item.id] || "#fe6f6f45"
                      : "transparent",
                  cursor:
                    item.id !== "Event" &&
                    !colorMap["Event"] &&
                    item.id !== "Invitees"
                      ? "not-allowed"
                      : "pointer" && item.id === "Invitees"
                      ? "context-menu"
                      : "",
                  position: "relative",
                  // For positioning the CircularProgress
                }}
              >
                {item.id === "Invitees" && (
                  <>
                    <div
                      style={{
                        position: "absolute",
                        top: 1,
                        left: 3,
                        zIndex: 1,
                        border: "solif black",
                      }}
                    >
                      <CircularProgress
                        variant="determinate"
                        value={100}
                        size="80px"
                        thickness={2}
                        className="grayProgress"
                        style={{
                          position: "absolute",
                          top: 2,
                          left: 8,
                          zIndex: 1,
                          border: "solif black",
                        }}
                      />
                      <CircularProgress
                        variant="determinate"
                        value={progressMap.Invitees}
                        size="80px"
                        thickness={2}
                        className="redProgress"
                        style={{
                          position: "absolute",
                          top: 2,
                          left: 8,
                          zIndex: 1,
                          border: "solif black",
                        }}
                      />
                    </div>
                  </>
                )}
                <img
                  src={item.image}
                  alt={item.id}
                  style={{
                    // zIndex: 2,
                    position: "relative",
                    width: item.id === "Invitees" ? "70px" : "", // Reduce size only for Invitees
                    top: item.id === "Invitees" ? "12px" : "", // Reduce size only for Invitees
                    height: item.id === "Invitees" ? "auto" : "", // Adjust height to maintain aspect ratio
                  }}
                />
                <h6
                  className="flowname"
                  style={{
                    position: "relative",
                    top: item.id === "Invitees" ? "15px" : "", // Reduce
                  }}
                >
                  {item.id}
                </h6>
              </div>
            </div>
            {item.children && item.children.length
              ? treeRendering(
                  item.children,
                  handleBoxClick,
                  colorMap,
                  changeborder,
                  progressMap
                )
              : null}
          </li>
        ))}
      </ul>
    </>
  );
};

export default TreeStructure;
