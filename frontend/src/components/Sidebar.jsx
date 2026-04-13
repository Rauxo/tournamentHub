import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">

      <h2 className="sidebar-title">Organizer</h2>

      <ul className="sidebar-menu">
        <li><Link to="/dashboard">Dashboard</Link></li>

        <li><Link to="/dashboard/add-tournament">
          Add Tournament
        </Link></li>

        <li><Link to="/dashboard/my-tournaments">
          My Tournaments
        </Link></li>

        <li><Link to="/dashboard/participants">
          Participants
        </Link></li>

        <li><Link to="/dashboard/results">
          Results
        </Link></li>
      </ul>

    </div>
  );
}

export default Sidebar;