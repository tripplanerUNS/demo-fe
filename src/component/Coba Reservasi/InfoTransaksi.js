import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function InfoTransaksi() {
  const { id_reservasi } = useParams();
  const [transaksi, setTransaksi] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransaksi = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/auth/reservasi/${id_reservasi}`
        );
        console.log(response.data);
        setTransaksi(response.data.data); // Mengambil data transaksi sesuai ID reservasi
      } catch (error) {
        console.error("Error fetching transaksi data:", error);
        setError("Error fetching transaksi data");
      } finally {
        setLoading(false);
      }
    };

    fetchTransaksi();
  }, [id_reservasi]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="wrap-content-payment">
      <div className="content-payment">
        {transaksi ? (
          <>
            <h1>Transaction ID: {transaksi.id_reservasi}</h1>
            <p>Nama: {transaksi.nama}</p>
            <p>Nomor Telepon: {transaksi.nomor_telpon}</p>
            <p>Email: {transaksi.email}</p>
            <p>Alamat: {transaksi.alamat}</p>
            <p>Messages: {transaksi.messages}</p>
            <p>Jumlah Karyawan: {transaksi.jumlah_karyawan}</p>
            <p>Jumlah Hari: {transaksi.jumlah_hari}</p>
            <p>Total Harga: {transaksi.total_harga}</p>
            {/* Add any other transaction details here */}
          </>
        ) : (
          <p>Data transaksi tidak ditemukan.</p>
        )}
      </div>
    </div>
  );
}

export default InfoTransaksi;
