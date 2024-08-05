import React from "react";
import { Link } from "react-router-dom";
import "../Style/FlowChart.css";
import Event from "../Assets/Event.png";
import Guest from "../Assets/Guest.png";
import Participants from "../Assets/Participants.png";
import Venue from "../Assets/Venue.png";
import Transport from "../Assets/Transport.png";
import Accomodation from "../Assets/Accomodation.png";
import Food from "../Assets/Food.png";
import VenueRequirements from "../Assets/Venue Requirements.png";

const treeData = [
  {
    id: "Event",
    diamond: false,
    image: Event,
    route: "/event",
    children: [
      {
        id: "Guest",
        diamond: false,
        image: Guest,
        route: "/guest",
        children: [
          {
            id: "Transport",
            diamond: false,
            image: Transport,
            route: "/transport",
          },
          {
            id: "Accomodation",
            diamond: false,
            image: Accomodation,
            route: "/accomodation",
            children: [{ id: "Food", diamond: false, image: Food, route: "/food" }],
          },
        ],
      },
      {
        id: "Participants",
        diamond: false,
        image: Participants,
        route: "/participants",
        children: [
          {
            id: "Food",
            diamond: false,
            image: Food,
            route: "/food",
          },
          {
            id: "Accomodation",
            diamond: false,
            image: Accomodation,
            route: "/accomodation",
          },
        ],
      },
      {
        id: "Venue",
        diamond: false,
        image: Venue,
        route: "/venue",
        children: [
          {
            id: "Venue Requirements",
            diamond: false,
            image: VenueRequirements,
            route: "/venue-requirements",
          },
        ],
      },
    ],
  },
];

const TreeStructure = () => {
  return <div className="tree">{treeRendering(treeData)}</div>;
};

const treeRendering = (treeData) => {
  return (
    <ul>
      {treeData.map((item) => (
        <li key={item.id} className={item.text + item.id}>
          <div className="logoimage">
            {/* <Link to={item.route}> */}
              <div>
                <img src={item.image} alt={item.id} />
              </div>
              <h6 className="flowname">{item.id}</h6>
            {/* </Link> */}
          </div>
          {item.children && item.children.length ? treeRendering(item.children) : null}
        </li>
      ))}
    </ul>
  );
};

export default TreeStructure;
