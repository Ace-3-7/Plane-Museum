import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Confirm, email } from 'react-admin';
import './AdminToolsForm.css';

const AdminToolsForm = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [userToDelete,setUserToDelete] = useState("");
  const navigate = useNavigate();
  const currentMail = localStorage.getItem("userEmail");

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const isAdmin = localStorage.getItem("isAdmin");
   

    if (isLoggedIn !== "true") {
      navigate("/login");
      return;
    }

    if (isAdmin !== "true") {
      alert("Access denied!");
      navigate("/")
      return;
    }
    async function fetchUsers() {
      try {
        const res = await axios.get('http://localhost:8080/api/user');
        setUsers(res.data);
      } catch (err) {
        setError("No users found.");
        console.error(err);
      }
    }

    fetchUsers();
  }, []);

  const handleDeleteUserByEmail = (emailToDelete) => {
    if(((currentMail)) !== ((emailToDelete))){
      deleteUser((emailToDelete));
      console.log(`User with email ${emailToDelete} deleted.`);
    }
    else{
      alert("You're deleting your own user, there's a special page for that")
    }
  };

  async function deleteUser(emailVal) {
    try {
      const res = await axios.delete("http://localhost:8080/api/user/manage/" + ((emailVal)));
      alert(res.data || "User deleted successfully");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (err) {
      alert(err.response?.data || "Error deleting user");
    }
  }

  const [open, setOpen] = useState(false);
  const handleClick = () => setOpen(true);
  const handleDialogClose = () => setOpen(false);
  const handleConfirm = (email) => {
    handleDeleteUserByEmail(email)
    setOpen(false);
  };

  return (
    <div className="AdminToolsFormWrapper">
      <header className="start-header">
        <div className="logo">Users List</div>
      </header>


      {error && <p className="error">{error}</p>}

      <table className="AdminToolsForm">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Is admin</th>
            <th>Delete User?</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr><td colSpan="4">No users found.</td></tr>
          ) : (
            users.map((user, index) => (
              <tr key={index}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.isAdmin ? "Yes" : "No"}</td>
                <td>
                  <div className="optionButtons">
                    <button type="btn-delete" onClick={()=>{handleClick();setUserToDelete(user.email)}} style={{ color: '#d83131' }}>Delete</button>
                    <Confirm
                      isOpen={open}
                      title={`Delete User`}
                      content={"Are you sure you want to delete "+(userToDelete)}
                      confirm="Yes"
                      confirmColor="warning"
                      cancel="No"
                      ConfirmIcon="none"
                      CancelIcon="none"
                      onConfirm={()=>handleConfirm((userToDelete))}
                      onClose={handleDialogClose}
                    />
                  </div>
                </td>
              </tr>

            ))
          )}
        </tbody>
      </table>

    </div>
  );
};

export default AdminToolsForm;
