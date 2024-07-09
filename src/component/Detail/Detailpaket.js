import React, { useState, useEffect } from "react";
import "./Detail1.css"; // Import the CSS file
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

function Detailpaket() {
  const { id } = useParams();
  const [paket, setPaket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPaket = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/auth/paket/budgett/${id}`
        );
        if (response.data.status === "success") {
          setPaket(response.data.data);
        } else {
          setError("Data not found");
        }
      } catch (err) {
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchPaket();
  }, [id]);

  if (loading) {
    return <div className="loading-spinner"></div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container-detail-paket">
      <Navbar />
      {paket && (
        <>
          <img
            src={`http://localhost:8000/uploads/paket/${paket.image}`}
            alt={paket.nama_paket}
            className="main-image"
          />

          <section className="package-info">
            <h1>{paket.nama_paket}</h1>
          </section>

          <section className="destination-info">
            <h2>{paket.kota}, Jawa Timur</h2>
            <p>{paket.deskripsi}</p>
          </section>

          <section className="details">
            <div className="hotel-info">
              <img
                src={`http://localhost:8000/${paket.hotel.images[0].image}`}
                alt={paket.hotel.nama_hotel}
                className="hotel-image"
              />
              <div className="hotel-details">
                <h4>{paket.hotel.nama_hotel}</h4>
                <p>{paket.hotel.tipe_kamar}</p>
                <p>{paket.hotel.fasilitas}</p>
                <p>
                  {paket.hotel.kota}{" "}
                  <a href={paket.hotel.alamat}>Lihat Lokasi</a>
                </p>
                <p className="hotel-price">
                  Rp. {Number(paket.hotel.harga).toLocaleString()} /kamar/malam
                </p>
              </div>
              <div className="rating">
                <p>{paket.hotel.rating}</p>
              </div>
            </div>

            <div className="transport-info">
              <h3>Bundle Transportasi</h3>
              <span className="airline">{paket.transportasi.nama_transportasi}</span>
              <div className="column-content">
            <div className="row-info">
              <span className="time">{paket.transportasi.jam_keberangkatan}</span>
              <span className="arrow">→</span>
              <span className="time">{paket.transportasi.jam_kedatangan}</span>
            </div>
            <span className="duration">{paket.transportasi.lama_perjalanan}</span>

            <div className="details">
              <div className="flight-info">
                <div className="time-place">
                  <span className="time">{paket.transportasi.jam_keberangkatan}</span>
                  <span className="place">{paket.transportasi.berangkat}</span>
                </div>
                <span className="duration">{paket.transportasi.lama_perjalanan}</span>
                <div className="time-place">
                  <span className="time">{paket.transportasi.jam_kedatangan}</span>
                  <span className="place">{paket.transportasi.tujuan}</span>
                </div>
                <div className="class-code">
                  <span className="class">{paket.transportasi.kelas}</span>
                </div>
              </div>
              <div className="price">
                Rp.{paket.transportasi.harga}
              </div>
            </div>
          </div>
          </div>

            <div className="address-info">
              <h3>{paket.food.nama_kuliner}</h3>
              <p>Rating: {paket.food.rating}</p>
              <p>Buka: {paket.food.jam_buka}</p>
              <p>
                <a href={paket.food.alamat}>Lihat Lokasi</a>
              </p>
              <p>Pesan di GoFood: {paket.food.telepon}</p>
            </div>
          </section>

          <div className="price">
            <div className="price-container">
              <p className="price">
                Harga Paket: Rp. {Number(paket.harga_paket).toLocaleString()}
              </p>
            </div>
            <div className="order-container">
              <Link to={`/ReservasiInvite/${paket.id_paket}/${paket.nama_paket}`}>Order</Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Detailpaket;