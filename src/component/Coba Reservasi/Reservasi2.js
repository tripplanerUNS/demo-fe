import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../State/globalstate";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import HeaderReservasi from "./HeaderReservasi";
import "./Reservasi.css";
import { FaPlane, FaHotel } from "react-icons/fa";
import useSnap from "../../Hook/useSnap";

function Reservasi2() {
  const { id_paket } = useParams();
  const { jumlahKaryawan, jumlah, totalHarga } = useContext(GlobalContext);
  const navigate = useNavigate();
  const [karyawanList, setKaryawanList] = useState([]);
  const [user, setUser] = useState({
    nama: "",
    nomerTelpon: "",
    email: "",
    alamat: "",
    messages: "",
  });
  const [paket, setPaket] = useState(null);
  const [loading, setLoading] = useState(false);
  const [OpenSnap, setOpenSnap] = useState(false);
  const [error, setError] = useState(null);
  const { snapEmbed } = useSnap();

  useEffect(() => {
    console.log("Jumlah Karyawan:", jumlahKaryawan);
    console.log("Jumlah Hari:", jumlah);
    console.log("Total Harga:", totalHarga);
  }, [jumlahKaryawan, jumlah, totalHarga]);

  useEffect(() => {
    const karyawanArray = Array.from({ length: jumlahKaryawan }, () => ({
      nama: "",
      nomerTelpon: "",
      email: "",
      jabatan: "",
    }));
    setKaryawanList(karyawanArray);

    const fetchPaket = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/auth/paket/budgett/${id_paket}`
        );
        if (response.data.status === "success") {
          setPaket(response.data.data);
          console.log("Paket data:", response.data.data);
        } else {
          setError("Data tidak ditemukan");
        }
      } catch (err) {
        setError("Kesalahan saat mengambil data");
      }
    };

    fetchPaket();
  }, [jumlahKaryawan, id_paket]);

  const handleInputChange = (index, field, value) => {
    const updatedKaryawanList = [...karyawanList];
    updatedKaryawanList[index][field] = value;
    setKaryawanList(updatedKaryawanList);
    console.log("Daftar Karyawan yang Diperbarui:", updatedKaryawanList);
  };

  const handleUserChange = (field, value) => {
    setUser((prevUser) => ({ ...prevUser, [field]: value }));
    console.log("Data User:", user);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        `http://localhost:8000/api/auth/reservasi/${id_paket}`,
        {
          nama: user.nama,
          nomor_telpon: user.nomerTelpon,
          email: user.email,
          alamat: user.alamat,
          messages: user.messages,
          nama_karyawan: karyawanList.map((karyawan) => karyawan.nama),
          nomor_telpon_karyawan: karyawanList.map(
            (karyawan) => karyawan.nomerTelpon
          ),
          email_karyawan: karyawanList.map((karyawan) => karyawan.email),
          jabatan_karyawan: karyawanList.map((karyawan) => karyawan.jabatan),
          jumlah_hari: jumlah,
          jumlah_karyawan: jumlahKaryawan,
          total_harga: totalHarga,
        }
      );
      if (response.status === 201) {
        setLoading(false);
        setOpenSnap(true);
        snapEmbed(response.data.data.snap_token, "snap-container", {
          onSuccess: function (result) {
            setOpenSnap(false);
            console.log("Success", result);
            navigate("/Transaksi");
          },
          onPending: function (result) {
            setOpenSnap(false);
            console.log("Pending", result);
            navigate("/Transaksi");
          },
          onClose: function () {
            setOpenSnap(false);
            navigate("/Transaksi");
          },
        });
      }
    } catch (error) {
      setLoading(false);
      console.error("Error:", error);
      setError("Terjadi kesalahan saat menyimpan reservasi");
    }
  };

  return (
    <div className="wrap-reservasi2">
      <HeaderReservasi />
      <div className="promo-banner">
        <FaPlane className="promo-icon" />
        <span className="promo-plus">+</span>
        <FaHotel className="promo-icon" />
        <span className="promo-text">
          Paket Hemat Selangkah lagi Anda akan mendapatkan penawaran terbaik.
        </span>
      </div>
      <div className="content-reservasi-non">
        {!OpenSnap && (
          <div className="wrap-reservasi2-content">
            <div className="wrap-reservasi-content-hrd">
              <div className="wrap-reservasi-content-hrd-input-booking">
                <div className="wrap-reservasi-content-hrd-input-booking-title">
                  <h1 className="wrap-reservasi-content-hrd-input-booking-title-text">
                    Detail Booking
                  </h1>
                </div>
                <div className="wrap-reservasi-content-hrd-input-booking-content">
                  <div className="wrap-reservasi-content-hrd-input-booking-content-input">
                    <input
                      type="text"
                      placeholder="Nama HRD"
                      value={user.nama}
                      onChange={(e) => handleUserChange("nama", e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Nomer HP/Telpon"
                      value={user.nomerTelpon}
                      onChange={(e) =>
                        handleUserChange("nomerTelpon", e.target.value)
                      }
                    />
                    <input
                      type="email"
                      placeholder="email"
                      value={user.email}
                      onChange={(e) =>
                        handleUserChange("email", e.target.value)
                      }
                    />
                    <input
                      type="text"
                      placeholder="Alamat Kantor"
                      value={user.alamat}
                      onChange={(e) =>
                        handleUserChange("alamat", e.target.value)
                      }
                    />
                    <input
                      type="text"
                      placeholder="Pesan"
                      value={user.messages}
                      onChange={(e) =>
                        handleUserChange("messages", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="wrap-reservasi-content-employee">
              <div className="wrap-reservasi-content-employee-input-invite-employee">
                <div className="wrap-reservasi-content-employee-input-invite-employee-title">
                  <h1 className="wrap-reservasi-content-hrd-input-invite-employee-title-text">
                    Karyawan yang kamu invite
                  </h1>
                </div>
              </div>
              <div className="wrap-reservasi-content-employee-input-booking-content">
                <div className="wrap-reservasi-content-employee-input-booking-content-input">
                  {karyawanList.map((karyawan, index) => (
                    <div key={index}>
                      <input
                        type="text"
                        placeholder="Nama"
                        value={karyawan.nama}
                        onChange={(e) =>
                          handleInputChange(index, "nama", e.target.value)
                        }
                      />
                      <input
                        type="text"
                        placeholder="Nomer Telpon"
                        value={karyawan.nomerTelpon}
                        onChange={(e) =>
                          handleInputChange(
                            index,
                            "nomerTelpon",
                            e.target.value
                          )
                        }
                      />
                      <input
                        type="email"
                        placeholder="Email"
                        value={karyawan.email}
                        onChange={(e) =>
                          handleInputChange(index, "email", e.target.value)
                        }
                      />
                      <input
                        type="text"
                        placeholder="Jabatan"
                        value={karyawan.jabatan}
                        onChange={(e) =>
                          handleInputChange(index, "jabatan", e.target.value)
                        }
                      />
                      <hr />
                    </div>
                  ))}
                </div>
              </div>
              <div className="new-wrap-reservasi-content-form-invite-buttons">
                <div className="new-wrap-reservasi-content-form-invite-button">
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    disabled={loading}
                  >
                    Kirim/Pembayaran
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {loading && (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <div className="loading-text">Mohon tunggu, sedang memuat...</div>
          </div>
        )}
        <div id="snap-container"></div>
      </div>
    </div>
  );
}

export default Reservasi2;
