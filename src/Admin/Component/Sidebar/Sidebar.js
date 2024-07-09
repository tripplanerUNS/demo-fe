import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import { RxDashboard } from "react-icons/rx";
import { MdOutlineSupportAgent } from "react-icons/md";
import { FaUserTie } from "react-icons/fa";
import { RiHotelLine } from "react-icons/ri";
import { MdDirectionsTransit } from "react-icons/md";
import { IoFastFoodOutline } from "react-icons/io5";
import { FaBox } from "react-icons/fa";

function Sidebar() {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="wrap-sidebar">
      <div className="sidebar-logo">Trip Planner Admin</div>
      <div className="wrap-sidebar-nav">
        <ul className="side-nav">
          <li className="sidebar-item">
            <Link to="/Agen&Admin/Dashboard"><RxDashboard /> Dashboard </Link>
          </li>
          <li className="sidebar-item">
            <Link to="/Agen&Admin/Agen"><MdOutlineSupportAgent /> Agen </Link>
          </li>
          <li className="sidebar-item">
            <Link to="/Agen&Admin/Pengguna"><FaUserTie /> Pengguna</Link>
          </li>
          <li className="sidebar-item dropdown">
            <span onClick={toggleDropdown}>Akomodasi</span>
            {showDropdown && (
              <ul className="dropdown-content">
                <li>
                  <Link to="/Agen&Admin/Hotel"><RiHotelLine /> Hotel</Link>
                </li>
                <li>
                  <Link to="/Agen&Admin/Transportasi"><MdDirectionsTransit /> Transportasi</Link>
                </li>
                <li>
                  <Link to="/Agen&Admin/Kuliner"><IoFastFoodOutline /> Kuliner</Link>
                </li>
              </ul>
            )}
          </li>
          <li className="sidebar-item">
            <Link to="/Agen&Admin/Paket"> <FaBox /> Paket</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;