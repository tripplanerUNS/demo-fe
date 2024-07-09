import React from 'react';
import './Profile.css';
import { FaCamera, FaCog, FaBell, FaUserCircle } from 'react-icons/fa';
import Navbar from '../Navbar/Navbar';
import Baliawesome1 from "../../Assets/BALI - awesome waterfalls near UBUD1.jpeg";
import axios from "axios";

const ProfilePengguna = () => {
  return (
    <div className="profile-container">
      <Navbar/>
        <section className="profile-section">
          <h2 style={{ textAlign: 'center' }}>Profile</h2>
          <div className="profile-card">
            <div className="profile-picture">
            <img className="img" alt={Baliawesome1} src={Baliawesome1} />
              <FaCamera className="camera-icon" />
            </div>
            <div className="profile-info">
              <p><strong>Name:</strong> User name</p>
              <p><strong>Email:</strong> mi@xpaytech.co</p>
              <p><strong>Phone Number:</strong> +20-01274318900</p>
              <p><strong>Address:</strong> 285 N Broad St, Elizabeth, NJ 07208, USA</p>
            </div>
            <div className="profile-actions">
              <button className="edit-profile-button">EDIT PROFILE</button>
            </div>
          </div>
        </section>
    </div>
  );
};

export default ProfilePengguna;