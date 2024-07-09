import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import logo from "../../Assets/Trip Plan.png";
import "./coba.css";

function Cobalogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.registrationStatus === "success") {
      toast.success("Registrasi berhasil!");
    } else if (
      location.state &&
      location.state.registrationStatus === "failure"
    ) {
      toast.error("Registrasi gagal. Silakan coba lagi.");
    }
  }, [location.state]);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Email and password are required.");
      return;
    }

    try {
      // Kirim permintaan login ke server
      const response = await axios.post(
        `http://localhost:8000/api/auth/pengguna/login`,
        {
          email,
          password,
        }
      );

      // Handle respon dari server
      console.log("Login Response:", response.data);

      // Simpan username di local storage
      localStorage.setItem("pengguna", response.data.data.id_pengguna);
      console.log(localStorage);
      localStorage.setItem("username", response.data.data.username);
      console.log(localStorage);
      localStorage.setItem("token", response.data.data.token);
      console.log(localStorage);
    


      // Redirect user ke halaman beranda setelah login berhasil
      navigate("/");
    } catch (error) {
      // Tangani kesalahan jika login gagal
      console.error("Login Error:", error);
      alert("Failed to login. Please check your email and password.");
    }
  };

  return (
    <div className="wrapClogin">
      <div className="Loginn">
        <h1>Login</h1>
        <div className="imageLogin">
          <img src={logo} alt="Logo" />
        </div>
        <div className="content-loginn">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <div className="content-bawah">
          <div className="Forget">
            Don't have an account?{" "}
            <Link to="/Register" className="keluar">
              SignUp
            </Link>
          </div>
          <div className="Pilihan">
            Are you an admin or agent?{" "}
            <Link to="/Alogin" className="keluar">
              Login
            </Link>
            <Toaster position="bottom-left" reverseOrder={false} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cobalogin;