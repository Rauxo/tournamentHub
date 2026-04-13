import axios from "axios";
import { BASE_URL } from "../api/BaseApi";
import React, { useState } from "react";
import logo from "../assets/tournamentHub.png";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");

      if (token) {
        await axios.post(
          BASE_URL + "/auth/logout",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
      }

      localStorage.removeItem("token");

      navigate("/login");
    } catch (error) {
      console.log("Logout error:", error);

      localStorage.removeItem("token");
      navigate("/login");
    }
  };

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
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/organizers">Organizers</Link>
          </li>

          {token ? (
            <>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <button onClick={handleLogout} className="nav-btn">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              {/* <li><Link to="/login">Login</Link></li>
              <li><Link to="/create">Create Account</Link></li> */}
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
