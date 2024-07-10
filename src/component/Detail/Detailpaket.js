import React, { useState, useEffect, useContext } from "react";
import "./Detail1.css"; // Import the CSS file
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { GlobalContext } from "../../State/globalstate"; // Import GlobalContext

function Detailpaket() {
  const { id } = useParams();
  const [paket, setPaket] = useState(null);
  const { jumlahKaryawan, jumlah,  setTotalHarga } = useContext(GlobalContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [budget, setBudget] = useState(null); // State untuk menyimpan data budget

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/auth/paket/detail/${id}`,
          {
            params: {
              jumlah_hari: jumlah,
              jumlah_employee: jumlahKaryawan,
            },
          }
        );
        if (response.status === 200) {
          setPaket(response.data.Data); // Set state untuk detail paket
          console.log("Paket data:", response.data.Data);
          setTotalHarga(response.data.Data.Total_harga);
        } else {
          setError("Detail data not found");
        }
      } catch (error) {
        setError("Error fetching detail data");
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id, jumlah, jumlahKaryawan]);

  useEffect(() => {
    const fetchBudget = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:8000/api/auth/paket/budgett/${id}`
        );
        if (response.status === 200) {
          setBudget(response.data); // Set state untuk data budget
          console.log("Budget data:", response.data);
        } else {
          setError("Budget data not found");
        }
      } catch (error) {
        setError("Error fetching budget data");
      } finally {
        setLoading(false);
      }
    };

    fetchBudget();
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
        </>
      )}

      {budget && (
        <section className="details">
          <div className="hotel-info">
            <img
              src={`http://localhost:8000/${budget.data.hotel.images[0].image}`}
              alt={budget.nama_hotel}
              className="hotel-image"
            />
            <div className="hotel-details">
              <h4>{budget.data.hotel.nama_hotel}</h4>
              <p>{budget.data.hotel.tipe_kamar}</p>
              <p>{budget.data.hotel.fasilitas}</p>
              <p>
                {budget.data.hotel.kota} <a href={budget.data.hotel.alamat}>Lihat Lokasi</a>
              </p>
              <p className="hotel-price">{budget.data.hotel.harga}</p>
            </div>
            <div className="rating">
              <p>{budget.data.hotel.rating}</p>
            </div>
          </div>

          <div className="transport-info">
            <h3>{budget.data.transportasi.jenis_transportasi}</h3>
            <div className="transport-details">
              <h4>{budget.data.transportasi.nama_transportasi}</h4>
              <div className="flight-details">
                <div className="flight-time">
                  <p>{budget.data.transportasi.berangkat}</p>
                  <p>{budget.data.transportasi.jam_keberangkatan}</p>
                </div>
                <div className="flight-time">
                  <p>{budget.data.transportasi.tujuan}</p>
                  <p>{budget.data.transportasi.jam_kedatangan}</p>
                </div>
                <div className="flight-info">
                  <p>{budget.data.transportasi.kelas}</p>
                  <p>{budget.data.transportasi.lama_perjalanan}</p>
                </div>
              </div>
            </div>
            <p className="transport-price">{budget.data.transportasi.harga}</p>
          </div>

          <div className="address-info">
            <h3>{budget.data.food.nama_kuliner}</h3>
            <p>Rating: {budget.data.food.rating}</p>
            <p>Buka: {budget.data.food.jam_buka}</p>
            <p>
              <a href={budget.data.food.alamat}>Lihat Lokasi</a>
            </p>
            <p>Kota {budget.data.food.kota}</p>
          </div>
        </section>
      )}
      <div className="footer">
        <div className="price-container">
          <p className="price">Harga Paket: {paket?.Total_harga}</p>
        </div>
          <button className="Detailpaket"><Link to={`/ReservasiInvite/${paket?.id}/${paket?.nama_paket}`}>
            Order
          </Link></button>
      </div>
    </div>
  );
}

export default Detailpaket;
