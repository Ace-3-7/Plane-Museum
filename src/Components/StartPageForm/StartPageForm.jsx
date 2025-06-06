import React from "react";
import { Link } from "react-router-dom";
import "./StartPageForm.css";

const StartPage = () => {
  return (

    <div className="start-wrapper" >
      <header className="start-header">
        <div className="logo">Plane Museum</div>
        <div className="nav-buttons">
          <Link to="/login" className="start-button">Login</Link>
          <Link to="/register" className="start-button">Register</Link>
        </div>
      </header>

      <main className="start-content">

        <h1>Welcome to the Plane Museum</h1>
        <p>Secure access to your account. Choose login or register.</p>
      </main>
    </div>
  );
};

export default StartPage;
