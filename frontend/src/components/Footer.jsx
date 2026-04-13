import React from "react";
import logo from "../assets/tournamentHub.png";

function Footer() {
  return (
    <footer className="footer">
      
      {/* Logo */}
      <div className="footer-logo">
        <img src={logo} alt="Tournament Hub Logo" />
      </div>

      {/* Text */}
      <p>© {new Date().getFullYear()} Tournament Hub. All rights reserved.</p>

    </footer>
  );
}

export default Footer;