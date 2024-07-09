import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.css"; // Sesuaikan dengan nama file CSS Anda
import logo from "../../Assets/Trip Plan.png";
import toast, { Toaster } from "react-hot-toast";

function Register() {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    nama: "",
    email: "",
    username: "",
    password: "",
    no_tlpn: "",
  });

  const notify = () => toast("");

  const [confirmPassword, setConfirmPassword] = useState("");
  const [registrationStatus, setRegistrationStatus] = useState("");


  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleConfirmChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (credentials.password !== confirmPassword) {
      toast.error("Konfirmasi password tidak sesuai dengan password");
      return;
    }

    try {
      // Menampilkan pesan loading
      // alert("Membuat akun anda");

      const response = await axios.post(
        `http://localhost:8000/api/auth/user/register`,
        credentials
      );
      console.log("Registration Response:", response.data);
      // Lakukan penanganan respons dari API sesuai kebutuhan aplikasi
      setRegistrationStatus("Registrasi berhasil!");
      navigate("/loginn");

      // Menampilkan pesan sukses
    } catch (error) {
      console.error("Registration Error:", error);
      // Menampilkan pesan gagal
      if (
        error.response.status === 400 &&
        error.response.data.error === "Email sudah terdaftar"
      ) {
        toast.error("Email sudah terdaftar");
      } else {
        toast.error("Registrasi gagal. Silakan coba lagi.");
      }
    }
  };
  return (
    <div className="wrap-register">
      <div className="container-register">
        <div className="row">
          <div className="image">
            <img src={logo} alt="Trip plan.png" />
          </div>

          <div className="wrap-form-register">
            <div className="column-register">
              <h2 className="register-heading">REGISTER</h2>
              <form onSubmit={handleRegister} className="form-register">
                {/* Form Components */}
                <div className="form-group">
                  <label className="label-input-register" htmlFor="nama">
                    Nama:
                  </label>
                  <input
                    className="input-input-register"
                    type="text"
                    id="nama"
                    name="nama"
                    placeholder="Masukkan nama Anda"
                    value={credentials.nama}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="label-input-register" htmlFor="email">
                    Email:
                  </label>
                  <input
                    className="input-input-register"
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Masukkan email Anda"
                    value={credentials.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="label-input-register" htmlFor="username">
                    Username:
                  </label>
                  <input
                    className="input-input-register"
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Masukkan username Anda"
                    value={credentials.username}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="label-input-register" htmlFor="password">
                    Password:
                  </label>
                  <input
                    className="input-input-register"
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Masukkan password Anda"
                    value={credentials.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="label-input-register" htmlFor="confirm">
                    Konfirmasi Password:
                  </label>
                  <input
                    className="input-input-register"
                    type="password"
                    id="confirm"
                    name="confirm"
                    placeholder="Masukkan ulang password Anda"
                    value={confirmPassword}
                    onChange={handleConfirmChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="label-input-register" htmlFor="no_tlpn">
                    Nomer Telpon:
                  </label>
                  <input
                    className="input-input-register"
                    type="text"
                    id="no_tlpn"
                    name="no_tlpn"
                    placeholder="Masukkan nomor telepon Anda"
                    value={credentials.no_tlpn}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button className="register" type="submit" onClick={notify}>
                  Register
                  <Toaster
                    position="bottom-left"
                    reverseOrder={false}
                  />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;