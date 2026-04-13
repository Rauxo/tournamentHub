import React, { useState } from "react";
import logo from "../assets/tournamentHub.png";
import { Link } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar-container">
      
      <div className="logo">
        <img src={logo} alt="Tournament Hub Logo" />
      </div>

      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

      <div className={`options ${menuOpen ? "active" : ""}`}>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/organizers">Organizers</Link></li>
          <li><Link to="/results">Results</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;