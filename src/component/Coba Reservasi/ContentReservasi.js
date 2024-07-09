import React, { useState, useEffect, useContext } from "react";
import "./Reservasi.css";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { GlobalContext } from "../../State/globalstate"; // Import GlobalContext

function ContentReservasi() {
  const { id } = useParams();
  const [paket, setPaket] = useState(null);
  const { jumlahKaryawan, jumlah } = useContext(GlobalContext);
  const [budget, setBudget] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mengambil detail paket
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
          setPaket(response.data.Data); // Mengatur state untuk detail paket
          console.log("Paket data:", response.data.Data);
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

  // Mengambil data budget
  useEffect(() => {
    const fetchBudget = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:8000/api/auth/paket/budgett/${id}`
        );
        if (response.status === 200) {
          setBudget(response.data); // Mengatur state untuk data budget
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
    return <div className="loading-spinner">Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="wrap-content-reservasi">
      <div className="content-reservasi">
        {paket && (
          <>
            <img
              src={`http://localhost:8000/uploads/paket/${paket.image}`}
              alt={paket.nama_paket}
              className="main-image"
            />

            <div className="content-reservasi-title">
              <h1 className="content-reservasi-title-paket">
                {paket.nama_paket}
              </h1>
            </div>
          </>
        )}
        {budget && (
          <>
            <div className="content-reservasi-hotel">
              <div className="content-reservasi-title-hotel">
                <h1 className="content-reservasi-title-hotel">
                  {budget.hotel.nama_hotel}
                </h1>
              </div>
              <div className="content-reservasi-hotel-tipe">
                {budget.hotel.tipe_kamar}
              </div>
              <div className="content-reservasi-hotel-fasilitas">
                {budget.hotel.fasilitas}
              </div>
              <div className="content-reservasi-hotel-alamat">
                <a href={budget.hotel.alamat}>Lihat Lokasi</a>
              </div>
              <div className="content-reservasi-hotel-harga">
                Rp. {Number(budget.hotel.harga).toLocaleString()}
              </div>
            </div>
            <div className="content-reservasi-transportasi">
              <div className="content-reservasi-transportasi-title">
                <h1 className="content-reservasi-transportasi-title">
                  {budget.transportasi.nama_transportasi}
                </h1>
              </div>
              <div className="content-reservasi-transportasi-jenis">
                {budget.transportasi.nama_transportasi}
              </div>
              <div className="content-reservasi-transportasi-departure">
                <div className="content-reservasi-transportasi-departure">
                  {budget.transportasi.berangkat}
                </div>
                <div className="content-reservasi-transportasi-departure-time">
                  {budget.transportasi.jam_keberangkatan}
                </div>
              </div>
              <div className="content-reservasi-transportasi-arrival">
                <div className="content-reservasi-transportasi-arrival">
                  {budget.transportasi.tujuan}
                </div>
                <div className="content-reservasi-transportasi-arrival-time">
                  {budget.transportasi.jam_kedatangan}
                </div>
              </div>
              <div className="content-reservasi-transportasi-class">
                <div className="content-reservasi-transportasi-class">
                  {budget.transportasi.kelas}
                </div>
                <div className="content-reservasi-transportasi-class-duration">
                  {budget.transportasi.lama_perjalanan}
                </div>
              </div>
              <div className="content-reservasi-transportasi-harga">
                Rp. {Number(budget.transportasi.harga).toLocaleString()}
              </div>
            </div>
            <div className="content-reservasi-food">
              <div className="content-reservasi-food-title">
                <h1 className="content-reservasi-food-title">
                  {budget.food.nama_kuliner}
                </h1>
              </div>
              <div className="content-reservasi-food-rating">
                Rating: {budget.food.rating}
              </div>
              <div className="content-reservasi-food-alamat">
                <a href={budget.food.alamat}>Lihat Lokasi</a>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ContentReservasi;
