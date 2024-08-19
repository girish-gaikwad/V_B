import React from 'react'
import Eventlogo from "../../Assets/EventLogo.png";
import createventlogo from "../../Assets/createventlogo.png";
function SIDEBAR() {
  return (
<div className="sidebar">
          <div className="websitename">
            <div className="tags">
              <img src={Eventlogo} alt="Website Logo" />
              <p>Event</p>
            </div>
          </div>

          <div className="currentpage">
            <div className="tags">
              <img src={createventlogo} alt="Create Event" />
              <p>Create Event</p>
            </div>
          </div>
        </div>

  )
}

export default SIDEBAR