import react, { useEffect, useState } from 'react';
import axios from 'axios';
import './AccDetailsForm.css';
import { Zoom, ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Confirm } from 'react-admin';

const AccDetailsForm = () => {


    const [name, setName] = useState("");
    const [email, setEmail] = useState(localStorage.getItem("userEmail"));
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
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


    async function update(event) {
        event.preventDefault();
        try {
            const reqResponse = await axios.put("http://localhost:8080/api/user/manage", {
                name: name,
                email: localStorage.getItem("userEmail"),
                password: password
            })

            notifySuccess(reqResponse.data)

        } catch (err) {

            notifyErr(err.response.data)
        }
    }

    async function deleteUser() {
        try {
            const res = await axios.delete("http://localhost:8080/api/user/manage/" + localStorage.getItem("userEmail"));
            notifySuccess(res.data || "User deleted successfully");
            localStorage.removeItem("isAdmin");
            localStorage.removeItem("userEmail");
            localStorage.removeItem("isLoggedIn");
            setTimeout(() => {
                navigate("/");
            }, 1000);
        } catch (err) {
            notifyErr(err.response?.data || "Error deleting user");
        }
    }

    useEffect(() => {
        const isLoggedIn = localStorage.getItem("isLoggedIn");
        if (isLoggedIn !== "true") {
            navigate("/login");
            return;
        }
        axios.get("http://localhost:8080/api/user/manage/" + localStorage.getItem("userEmail"))
            .then(response => {
                setName(response.data);
            })
    }, []);


    const [open, setOpen] = useState(false);
    const handleClick = () => setOpen(true);
    const handleDialogClose = () => setOpen(false);
    const handleConfirm = () => {
        deleteUser();
        setOpen(false);
    };


    return (
        <div className="AccountDesign">
            <form action="">
                <h1>Account Settings</h1>
            </form>

            <ToastContainer />

            <div className="input-box">
                <label htmlFor="username">Name</label>
                <input type="text" required value={name}
                    onChange={(event) => {
                        setName(event.target.value);
                    }}
                />

            </div>

            <div className="input-box">
                <label htmlFor="email">Email</label>
                <input type="email" readOnly="true"
                    required value={email}
                />

            </div>

            <div className="input-box">
                <label htmlFor="password">Password</label>
                <input type="password" required value={password}
                    placeholder="New Password (if needed)"
                    onChange={(event) => {
                        setPassword(event.target.value);
                    }} />

            </div>

            <div className="optionButtons">
                <button type="btn-update" onClick={update}>Update</button>
                <button type="btn-delete" onClick={handleClick} style={{ color: '#d83131' }}>Delete</button>
                <Confirm
                    isOpen={open}
                    title={`Delete User`}
                    content="Are you sure you want to delete your account?"
                    confirm="Yes"
                    confirmColor="warning"
                    cancel="No"
                    ConfirmIcon="none"
                    CancelIcon="none"
                    onConfirm={handleConfirm}
                    onClose={handleDialogClose}
                />
            </div>
        </div>
    );
};
export default AccDetailsForm;
