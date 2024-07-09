import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./Detail1.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

function Detailpaket() {
  const [detailData, setDetailData] = useState(null);
  const { id } = useParams(); // Mengambil id dari URL
  const navigate = useNavigate(); // Hook untuk navigasi

  useEffect(() => {
    const fetchDetailData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/auth/paket/${id}`
        ); // Menggunakan id dari URL
        console.log("Response data:", response.data); // Tambahkan console.log di sini
        setDetailData(response.data);
      } catch (error) {
        console.error("Error fetching paket data:", error);
      }
    };

    fetchDetailData();
  }, [id]);

  const handleBackClick = () => {
    navigate("/PaketWisata"); // Menggunakan navigate untuk berpindah halaman
  };

  return (
    <div>
      <Navbar />

      <div className="aon-destination-detail-wrap p-t110 aon-bg-white">
        <div className="container">
          <div className="aon-destination-detail-content">
            <div className="destination-head">
              {detailData ? (
                <div key={detailData.id_paket} className="destination-card">
                  <div className="card-content">
                    <div className="card-header">
                      <img
                        src={`http://localhost:8000/${detailData.image}`}
                        alt={`Paket Image`}
                        className="paket-image"
                      />
                    </div>
                    <div className="card-body">
                      <div className="card-Judul">
                        <h3 className="Judul-hotelss">{detailData.nama_paket}</h3>
                      </div>
                      <p>Deskripsi: {detailData.deskripsi}</p>
                      <p>Transportasi: {detailData.transportasi} ({detailData.jenis_transportasi})</p>
                      <p>Hotel: {detailData.hotel}</p>
                      <p>Kota: {detailData.kota}</p>
                      <p>Food: {detailData.food}</p>
                      <p>Harga Paket: Rp {detailData.harga_paket}</p>
                      <p>Harga Hotel: Rp {detailData.harga_hotel}</p>
                      <p>Harga Transportasi: Rp {detailData.harga_transportasi}</p>
                      <button type="button" onClick={handleBackClick}>
                        Kembali ke Halaman Paket
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Detailpaket;