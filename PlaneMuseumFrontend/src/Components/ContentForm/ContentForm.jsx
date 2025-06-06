import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ContentForm.css'; 
import { useNavigate } from 'react-router-dom';

const ContentForm = () => {
  const [data, setData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false); 
  const [name, setName] = useState("");
  const [currentPlaneImageUrl, setCurrentPlaneImageUrl] = useState("");
  const [imageOpacity, setImageOpacity] = useState(0); 

  useEffect(() => {
    const adminStatus = localStorage.getItem("isAdmin") === "true";
    setIsAdmin(adminStatus);

    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn !== "true") {
      navigate("/login");
      return;
    }

    setLoading(true);
    axios.get("http://localhost:8080/api/user/manage/" + localStorage.getItem("userEmail"))
      .then(response => {
        setName(response.data);
      })
    axios.get("http://localhost:8080/api/planes")
      .then(res => {
        setData(res.data);
        if (res.data && res.data.length > 0) {
          setCurrentPlaneImageUrl(res.data[0].imageUrl);
        } else {
          setCurrentPlaneImageUrl();
        }
        setLoading(false);
        setTimeout(() => setImageOpacity(1), 50); 
      })
      .catch(err => {
        console.error("Error loading data:", err);
        setLoading(false);
        setCurrentPlaneImageUrl();
        setTimeout(() => setImageOpacity(1), 50);
      });
  }, [navigate]);

  useEffect(() => {
    if (!loading && data.length > 0 && data[currentIndex]) {
      const newImageUrl = data[currentIndex].imageUrl || "../Assets/sr71crop.png";

      if (currentPlaneImageUrl !== newImageUrl) {
        setImageOpacity(0); 

        const timer = setTimeout(() => {
          setCurrentPlaneImageUrl(newImageUrl); 
          setImageOpacity(1);                  
        }, 300); 

        return () => clearTimeout(timer);
      }
    }
  }, [currentIndex, data, loading, currentPlaneImageUrl]);

  const nextItem = () => {
    if (currentIndex < data.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const prevItem = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const logOut = () => {
    if (localStorage.getItem("isLoggedIn")) {
      localStorage.setItem("isLoggedIn", "false");
      localStorage.removeItem("isAdmin"); 
      localStorage.removeItem("userEmail");
      navigate('/');
    }
  }
  const accDetails = () => {
    navigate('/manage/user')
  }
  const adminTools = () => {
    navigate('/admin')
  }
  const editPlane = () => {
    if (data[currentIndex]) { 
      localStorage.setItem("managedPlane", data[currentIndex].id);
      navigate('/manage/plane/edit');
    }
  }
  const addPlane = () => {
    navigate('/manage/plane/add');
  }

  if (loading) {
    return <div className="loading-page-full">Loading...</div>;
  }

  return (
    <div className="contentPage"> {/* Base container with black background */}
      <div
        className="backgroundImage"
        style={{
          backgroundImage: `url("${currentPlaneImageUrl}")`,
          opacity: imageOpacity,
        }}
      ></div>
      <div className="darkeningOverlay"></div> {/* Semi-transparent black overlay */}

      <div className="contentForeground"> {/* All visible UI content */}
        <h1>Plane Museum</h1>
        <div className='accButtons'>
          <label style={{ fontSize: "x-large" }}>{name}</label>
          <button onClick={adminTools} hidden={!isAdmin}>Admin Tools</button>
          <button onClick={accDetails}>Account</button>
          <button onClick={addPlane} hidden={!isAdmin} >Add Plane</button>
          <button onClick={logOut} style={{ color: '#d83131' }}>Log out</button>
        </div>

        {data.length === 0 ? (
          <p>No data available.</p>
        ) : (
          data[currentIndex] && ( // Ensure data[currentIndex] exists before trying to render
            <div className="recordCard">
              <p><strong>Manufacturer:</strong> {data[currentIndex].manufacturer}</p>
              <p><strong>Name:</strong> {data[currentIndex].name}</p>
              <p><strong>Type:</strong> {data[currentIndex].type}</p>
              <p><strong>Year of Manufacture:</strong> {data[currentIndex].yearOfManufacture}</p>
              <p><strong>Country Of Origin:</strong> {data[currentIndex].countryOfOrigin}</p>
              <p><strong>Description:</strong> {data[currentIndex].description}</p>
              <p style={{ padding: "10vh" }} />
              <p><button onClick={editPlane} hidden={!isAdmin} >Edit Plane</button></p>
            </div>
          )
        )}

        <div className="navButtons">
          <button onClick={prevItem} disabled={currentIndex === 0}>⟵ Previous Plane</button>
          <button onClick={nextItem} disabled={currentIndex === data.length - 1}>Next Plane ⟶</button>
        </div>
      </div>
    </div>
  );
};

export default ContentForm;