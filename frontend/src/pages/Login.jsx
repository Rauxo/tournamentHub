import React, { useState } from "react";
import Layout from "../layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../api/BaseApi";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    orgMail: "",
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
      const res = await axios.post(
        BASE_URL + "/auth/login",
        formData
      );

      localStorage.setItem("token", res.data.token);

      alert("Login Successful");

      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Login Failed");
    }
  };

  return (
    <Layout>
      <div className="auth-container">
        <form onSubmit={handleSubmit} className="auth-form">
          <h2>Organizer Login</h2>

          <input
            type="email"
            name="orgMail"
            placeholder="Email"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />

          <button type="submit">Login</button>
        </form>
      </div>
    </Layout>
  );
}

export default Login;