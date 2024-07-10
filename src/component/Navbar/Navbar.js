import React, { useState, useEffect } from "react";
import { HashLink as Link } from "react-router-hash-link";
import { CgProfile } from "react-icons/cg";
import { TiEdit } from "react-icons/ti";
import { IoIosListBox } from "react-icons/io";
import { GrPowerShutdown } from "react-icons/gr";
import logo from "../../Assets/Trip Plan.png";
import "./Navbar.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [username, setUsername] = useState("");
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    setUsername("");
  };

  return (
    <nav
      className={`navbar-items ${isOpen ? "open" : ""} ${
        isScrolled ? "scrolled" : ""
      }`}
    >
      <div className="navbar-logo">
        <img src={logo} alt="Logo" />
      </div>
      <div className="menu-navbar">
        <div className="toggle-button" onClick={toggleMenu}>
          &#9776;
        </div>
        <ul className={`nav-menu ${isOpen ? "open" : ""}`}>
          <li>
            <Link smooth to="#bantuan">
              Bantuan
            </Link>
          </li>
          <li>
            <Link smooth to="#about">
              About
            </Link>
          </li>
          {username ? (
            <li className="profile-menu" onClick={toggleProfileMenu}>
              <CgProfile />
              <span>{username}</span>
              {isProfileMenuOpen && (
                <ul className="profile-dropdown">
                  <li>
                    <Link to="/Profilee">
                      <TiEdit />
                      <span>Profile</span>
                    </Link>
                  </li>
                  <li>
                    <IoIosListBox />
                    <span>Pesanan Saya</span>
                  </li>
                  <li onClick={handleLogout}>
                    <GrPowerShutdown />
                    <span>Logout</span>
                  </li>
                </ul>
              )}
            </li>
          ) : (
            <>
              <li>
                <Link smooth to="/loginn">
                  Login
                </Link>
              </li>
              <li>
                <Link smooth to="/Register">
                  Daftar
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
