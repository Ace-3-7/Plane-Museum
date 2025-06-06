import react, { useEffect, useState } from 'react';
import axios from 'axios';
import './EditPlaneForm';
import { Zoom, ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Confirm } from 'react-admin';

const EditPlaneForm = () => {

    const [manufacturer, setManufacturer] = useState("");
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [yearOfManufacture, setYear] = useState("");
    const [countryOfOrigin, setCountry] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setUrl] = useState("");
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

    async function updatePlane(event) {
        event.preventDefault();
        try {
            const reqResponse = await axios.put("http://localhost:8080/api/planes/manage/" + localStorage.getItem("managedPlane"), {
                manufacturer: manufacturer,
                type: type,
                name: name,
                yearOfManufacture: yearOfManufacture,
                countryOfOrigin: countryOfOrigin,
                description: description,
                imageUrl: imageUrl
            })

            notifySuccess(reqResponse.data)

            setTimeout(() => {
                navigate("/planeMuseum")
            }, 1000);

        } catch (err) {

            notifyErr(err.response.data)
        }
    }

    async function deletePlane() {
        try {
            const res = await axios.delete("http://localhost:8080/api/planes/manage/" + localStorage.getItem("managedPlane"));
            notifySuccess(res.data || "Plane deleted successfully");
            setTimeout(() => {
                navigate("/planeMuseum");
            }, 1000);
        } catch (err) {
            notifyErr(err.response?.data || "Error deleting plane");
        }
    }

    useEffect(() => {
        const isLoggedIn = localStorage.getItem("isLoggedIn");
        const isAdmin = localStorage.getItem("isAdmin");
        if (isLoggedIn !== "true") {
            navigate("/login");
            return;
        }

        if (isAdmin !== "true") {
            notifyErr("Access denied!");
            navigate("/")
            return;
        }
        axios.get("http://localhost:8080/api/planes/manage/" + localStorage.getItem("managedPlane"))
            .then(response => {
                setManufacturer(response.data.manufacturer);
                setType(response.data.type);
                setName(response.data.name);
                setYear(response.data.yearOfManufacture);
                setCountry(response.data.countryOfOrigin);
                setDescription(response.data.description);
                setUrl(response.data.imageUrl);
            });

    }, []);

    const [open, setOpen] = useState(false);
    const handleClick = () => setOpen(true);
    const handleDialogClose = () => setOpen(false);
    const handleConfirm = () => {
        deletePlane();
        setOpen(false);
    };

    return (
        <div className="EditPlaneDesign">
            <form action="">
                <h1>Edit Plane</h1>
            </form>

            <ToastContainer />

            <div className="input-box">
                <label htmlFor="manufacturer">Manufacturer</label>
                <input type="text" required value={manufacturer}
                    onChange={(event) => {
                        setManufacturer(event.target.value);
                    }}
                />

            </div>

            <div className="input-box">
                <label htmlFor="name">Name</label>
                <input type="text" required value={name}
                    onChange={(event) => {
                        setName(event.target.value);
                    }}
                />

            </div>

            <div className="input-box">
                <label htmlFor="type">Type</label>
                <input type="text" required value={type}
                    onChange={(event) => {
                        setType(event.target.value);
                    }}
                />

            </div>

            <div className="input-box">
                <label htmlFor="year">Year of Manufacture</label>
                <input type="number" required value={yearOfManufacture}
                    onChange={(event) => {
                        setYear(event.target.value);
                    }}
                />

            </div>

            <div className="input-box">
                <label htmlFor="country">Country of Origin</label>
                <input type="text" required value={countryOfOrigin}
                    onChange={(event) => {
                        setCountry(event.target.value);
                    }}
                />

            </div>

            <div className="input-box">
                <label htmlFor="description">Description</label>
                <input type="text" required value={description}
                    onChange={(event) => {
                        setDescription(event.target.value);
                    }}
                />

            </div>

            <div className="input-box">
                <label htmlFor="imageUrl">Image URL</label>
                <input type="text" required value={imageUrl}
                    onChange={(event) => {
                        setUrl(event.target.value);
                    }}
                />

            </div>

            <div className="optionButtons">
                <button type="btn-update" onClick={updatePlane}>Update</button>
                <button type="btn-delete" onClick={handleClick} style={{ color: '#d83131' }}>Delete</button>
                <Confirm
                    isOpen={open}
                    title={`Delete Plane`}
                    content="Are you sure you want to delete this plane?"
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

export default EditPlaneForm; 