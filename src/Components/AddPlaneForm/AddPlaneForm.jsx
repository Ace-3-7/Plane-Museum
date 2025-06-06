import react, { useEffect, useState } from 'react';
import axios from 'axios';
import './AddPlaneForm.css';
import { Zoom, ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AccDetailsForm = () => {

  const [manufacturer, setManufacturer] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [year, setYear] = useState("");
  const [country, setCountry] = useState("");
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
  }, [])

  async function addPlane(event) {
    event.preventDefault();
    try {
      const reqResponse = await axios.post("http://localhost:8080/api/planes/create", {
        manufacturer: manufacturer,
        name: name,
        type: type,
        yearOfManufacture: year,
        countryOfOrigin: country,
        description: description,
        imageUrl: imageUrl
      })
      notifySuccess(reqResponse.data)

      setTimeout(() => {
        setManufacturer("")
        setName("")
        setType("")
        setYear("")
        setCountry("")
        setDescription("")
        setUrl("")
      }, 1000);

    } catch (err) {
      notifyErr(err.response.data)
    }
  }

  return (
    <div className="AddPlaneDesign">
      <form action="">
        <h1>Add Plane</h1>
        <ToastContainer />
      </form>

      <div className="input-box">
        <label htmlFor="manufacturer">Manufacturer</label>
        <input type="text" required value={manufacturer}
          onChange={(event) => {
            setManufacturer(event.target.value);
          }} />

      </div>

      <div className="input-box">
        <label htmlFor="name">Name</label>
        <input type="text" required value={name}
          onChange={(event) => {
            setName(event.target.value);
          }} />

      </div>

      <div className="input-box">
        <label htmlFor="type">Type</label>
        <input type="text" required value={type}
          onChange={(event) => {
            setType(event.target.value);
          }} />

      </div>

      <div className="input-box">
        <label htmlFor="year">Year of Manufacturing</label>
        <input type="number" required value={year}
          onChange={(event) => {
            setYear(event.target.value);
          }} />

      </div>

      <div className="input-box">
        <label htmlFor="country">Country of origin</label>
        <input type="text" required value={country}
          onChange={(event) => {
            setCountry(event.target.value);
          }} />

      </div>

      <div className="input-box">
        <label htmlFor="description">Description</label>
        <input type="text" required value={description}
          onChange={(event) => {
            setDescription(event.target.value);
          }} />

      </div>

      <div className="input-box">
        <label htmlFor="imageUrl">Image URL</label>
        <input type="text" required value={imageUrl}
          onChange={(event) => {
            setUrl(event.target.value);
          }} />

      </div>


      <button type="btn-add" onClick={addPlane}>Add Plane</button>
    </div>
  );
};
export default AccDetailsForm;