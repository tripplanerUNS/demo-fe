import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import logo from "../../Assets/Trip Plan.png";
import "./coba.css";

function Adminlogin() {
  const navigate = useNavigate(); // Gunakan useNavigate
  const [activeTab, setActiveTab] = useState("tab1");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const handleLogin = async () => {
    try {
      let loginUrl = "";
      switch (activeTab) {
        case "tab1":
          loginUrl = `http://localhost:8000/api/auth/admin/login`;
          break;
        case "tab2":
          loginUrl = `http://localhost:8000/api/auth/agen/login`;
          break;
        default:
          break;
      }

      const response = await axios.post(loginUrl, {
        username,
        password,
      });

      console.log("Login Response:", response.data);

      // Handle successful login
      alert("Login berhasil!");
      navigate("/Agen&Admin/Dashboard"); // Arahkan pengguna ke halaman beranda setelah login berhasil
    } catch (error) {
      console.error("Login Error:", error);
      // Handle error jika terjadi kesalahan dalam proses login
      alert("Gagal login. Periksa kembali username dan password Anda.");
    }
  };

  return (
    <div className="wrapClogin">
      <div className="Loginn">
        <div className="tab-container">
          <div className="tab-buttons">
            <button
              className={`tab-button ${activeTab === "tab1" ? "active" : ""}`}
              onClick={() => handleTabClick("tab1")}
            >
              Admin
            </button>
            <button
              className={`tab-button ${activeTab === "tab2" ? "active" : ""}`}
              onClick={() => handleTabClick("tab2")}
            >
              Agen
            </button>
          </div>
        </div>
        <h1>Login</h1>
        <div className="imageLogin">
          <img src={logo} alt="Logo" />
        </div>
        <div className="tab-content">
          {activeTab === "tab1" && (
            <div className="content-loginn">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <br />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="masuk" onClick={handleLogin}>
                Sign In
              </button>
              <br />
            </div>
          )}
          {activeTab === "tab2" && (
            <div className="content-loginn">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <br />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="masuk" onClick={handleLogin}>
                Sign In
              </button>
              <br />
            </div>
          )}
        </div>
        <div className="content-bawah">
          <div className="Forgett">
            you are the user{" "}
            <Link to="/loginn" className="keluar">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Adminlogin;
