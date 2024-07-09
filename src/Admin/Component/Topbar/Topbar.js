import React, { useState } from 'react';
import { RiNotificationLine } from 'react-icons/ri';
import { MdAccountCircle } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Topbar.css';

function Topbar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = async () => {
    try {
      // Konfirmasi sebelum logout
      const confirmLogout = window.confirm("Apakah Anda yakin ingin logout?");
      if (confirmLogout) {
        // Lakukan permintaan logout ke endpoint yang disediakan oleh backend
        await axios.post('http://127.0.0.1:8000/api/auth/admin/logout');
        console.log("Logout berhasil");
        // Redirect ke halaman utama setelah logout berhasil
        navigate('/');
      }
    } catch (error) {
      console.error("Gagal logout:", error);
      // Handle kesalahan logout jika diperlukan
    }
  };

  return (
    <div className='wrap-topbar'>
      <div className='search-topbar'>
        <input type="text" placeholder='Search...' />
      </div>
      <div className='topbar-user-profile' onClick={toggleDropdown}>
        <MdAccountCircle className="topbar-user-icon" />
        <span className="topbar-user-name">Admin</span>
        {showDropdown && (
          <div className="dropdown-menu">
          <Link to="/Profile" className="dropdown-item">Profile</Link>
          <button className="dropdown-item" onClick={handleLogout}>Logout</button>
        </div>
        )}
      </div>
      <div className='activity-topbar'>
        <RiNotificationLine className="activity-icon" />
        <span className="activity-count">5</span>
      </div>
    </div>
  );
}

export default Topbar;
