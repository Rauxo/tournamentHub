import React, { useState } from "react";
import logo from "../assets/tournamentHub.png";

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
          <li>Home</li>
          <li>Organizers</li>
          <li>Results</li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;