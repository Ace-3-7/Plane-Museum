import React, { useState } from "react";
import './RegisterForm.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Zoom, ToastContainer, toast } from 'react-toastify';

const RegisterForm = () => {

  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsAdmin(event.target.checked);
    if (!isAdmin) {
      setAdminPassword("")
    }
  };

  const notifyErr = (message) => toast.error(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Zoom,
  });;

  const notifySuccess = (message) => toast.success(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Zoom,
  });


  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  async function save(event) {
    event.preventDefault();
    try {
      const reqResponse = await axios.post("http://localhost:8080/api/user/register", {
        name: name,
        email: email,
        password: password,
        adminPassword: adminPassword
      })
      notifySuccess(reqResponse.data)
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (err) {
      //alert(err.response.data)
      notifyErr(err.response.data)
    }
  }



  return (
    <div className="registerDesign">
      <form action="">
        <h1>Register</h1>

        <div>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            transition={Zoom}
          />
        </div>

        <div className="input-box">
          <input type="text" placeholder="Username" required value={name}
            onChange={(event) => {
              setName(event.target.value);
            }} />

        </div>

        <div className="input-box">
          <input type="email" placeholder="Email" required value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }} />

        </div>

        <div className="input-box">
          <input type="password" placeholder="Password" required value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }} />

        </div>

        <div className="check-admin">
          <label>
            <input type="checkbox" onChange={handleCheckboxChange} />
            I am an admin
          </label>
        </div>

        {isAdmin && (
          <div className="admin-password">
            <input type="password" placeholder="Enter admin password" value={adminPassword}
              onChange={(event) => {
                setAdminPassword(event.target.value);
              }} />

          </div>
        )}

        <button type="btn-register" onClick={save}>Register</button>

      </form>
    </div>
  );
};

export default RegisterForm;
