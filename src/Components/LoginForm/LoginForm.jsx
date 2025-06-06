import React, { useState } from "react";
import './LoginForm.css';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { Zoom, ToastContainer, toast } from 'react-toastify';

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const notifyErr = (message) =>
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
      transition: Zoom,
    });

  const notifySuccess = (message) =>
    toast.success(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
      transition: Zoom,
    });

  async function save(event) {
    event.preventDefault();
    try {
      const reqResponse = await axios.post("http://localhost:8080/api/user/login", {
        email: email,
        password: password,
      });

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", email);
      if (reqResponse.data === "Login successful - Admin access granted") {
        localStorage.setItem("isAdmin", "true");
      }
      else {
        localStorage.setItem("isAdmin", "false");
      }
      notifySuccess(reqResponse.data);

      setTimeout(() => {
        navigate("/planeMuseum");
      }, 1000);

    } catch (err) {
      notifyErr(err.response.data);
    }
  }

  return (
    <div className="loginDesign">
      <form onSubmit={save}>
        <h1>Login</h1>

        <ToastContainer />

        <div className="input-box">
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        <div className="input-box">
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        <button type="btn-login">Login</button>

        <p className="register-prompt">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
