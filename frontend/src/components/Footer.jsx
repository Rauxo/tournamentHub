import React from "react";
import logo from "../assets/tournamentHub.png";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">

      {/* Logo */}
      <div className="footer-logo">
        <img src={logo} alt="Tournament Hub Logo" />
      </div>

      {/* Links */}
      <div className="footer-links">
        <Link to="/login" className="footer-link">
          Organizer Login
        </Link>

        <Link to="/create" className="footer-link">
          Create Account
        </Link>
      </div>

      {/* Copyright */}
      <p className="footer-text">
        © {new Date().getFullYear()} Tournament Hub. All rights reserved.
      </p>

    </footer>
  );
}

export default Footer;