import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Modal from 'react-modal';
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import "./Detail.css";

Modal.setAppElement('#root'); // Atur elemen root aplikasi Anda

function DetailTransport() {
  const [transportasi, setTransportasi] = useState(null);
  const { id_transportasi } = useParams();
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const fetchTransportasiData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/auth/transport/${id_transportasi}`
        );
        setTransportasi(response.data);
        setModalIsOpen(true);
      } catch (error) {
        console.error("Error fetching transportasi data:", error);
      }
    };

    fetchTransportasiData();
  }, [id_transportasi]);

  const handleBackClick = () => {
    setModalIsOpen(false);
    navigate(-1);
  };

  return (
    <div className="container-transport">
      <Navbar />
      {transportasi ? (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={handleBackClick}
          contentLabel="Detail Transportasi"
          className="modal-content"
          overlayClassName="modal-overlay"
        >
          <div className="detail-card">
            <div className="header">
              <h2>Detail Transportasi</h2>
              <span className="airline">{transportasi.nama_transportasi}</span>
            </div>
            <div className="column-content">
              <div className="row-info">
                <span className="time">{transportasi.jam_keberangkatan}</span>
                <span className="arrow">→</span>
                <span className="time">{transportasi.jam_kedatangan}</span>
              </div>
              <span className="duration">{transportasi.lama_perjalanan}</span>

              <div className="details">
                <div className="flight-info">
                  <div className="time-place">
                    <span className="time">{transportasi.jam_keberangkatan}</span>
                    <span className="place">{transportasi.berangkat}</span>
                  </div>
                  <span className="duration">{transportasi.lama_perjalanan}</span>
                  <div className="time-place">
                    <span className="time">{transportasi.jam_kedatangan}</span>
                    <span className="place">{transportasi.tujuan}</span>
                  </div>
                  <div className="class-code">
                    <span className="class">{transportasi.kelas}</span>
                    <span className="code">{transportasi.kode_penerbangan} • {transportasi.pesawat}</span>
                  </div>
                </div>
                <div className="price">
                  Rp.{transportasi.harga}
                </div>
              </div>
            </div>
            <button type="button" onClick={handleBackClick}>
              Kembali ke Halaman Paket
            </button>
          </div>
        </Modal>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default DetailTransport;
