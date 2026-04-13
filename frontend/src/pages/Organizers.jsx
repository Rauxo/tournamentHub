import React, { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import axios from "axios";
import { BASE_URL } from "../api/BaseApi";

function Organizers() {
  const [organizers, setOrganizers] = useState([]);

  useEffect(() => {
    const fetchOrganizers = async () => {
      try {
        const res = await axios.get(
          BASE_URL + "/organizers"
        );
        setOrganizers(res.data.organizers);
      } catch (err) {
        console.log(err);
      }
    };

    fetchOrganizers();
  }, []);

  return (
    <Layout>
      <div className="org-container">
        <h2>All Organizers</h2>

        <div className="org-grid">
          {organizers.map((org) => (
            <div key={org._id} className="org-card">
              <h3>{org.orgName}</h3>
              <p>📍 {org.location}</p>
              <p>📧 {org.orgMail}</p>

              <button className="org-btn">
                View Tournaments
              </button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default Organizers;