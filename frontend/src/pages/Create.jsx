import React, { useState } from "react";
import Layout from "../layout/Layout";
import axios from "axios";
import { BASE_URL } from "../api/BaseApi";
import { useNavigate } from "react-router-dom";

function Create() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    orgName: "",
    orgMail: "",
    location: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        BASE_URL + "/auth/create",
        formData
      );

      alert("Account Created Successfully");

      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <Layout>
      <div className="auth-container">
        <form onSubmit={handleSubmit} className="auth-form">
          <h2>Create Account</h2>

          <input name="orgName" placeholder="Organization Name" onChange={handleChange} required />
          <input name="orgMail" type="email" placeholder="Email" onChange={handleChange} required />
          <input name="location" placeholder="Location" onChange={handleChange} required />
          <input name="password" type="password" placeholder="Password" onChange={handleChange} required />

          <button type="submit">Create</button>
        </form>
      </div>
    </Layout>
  );
}

export default Create;