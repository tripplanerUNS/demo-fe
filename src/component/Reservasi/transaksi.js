import React, { useState } from "react";
import "./transaksi.css";
import dumyFoto from "./../../Assets/HGS 2.webp";

const Transaksi = () => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [message, setMessage] = useState("");

  const handleOrder = () => {
    alert(
      `Order created with payment method: ${paymentMethod} and message: ${message}`
    );
  };

  return (
    <div className="container">
      <div className="header">
        <h2>TRANSACTION</h2>
      </div>
      <div className="transaction-card">
        <div className="transaction-details">
          <div className="hotel-details">
            <h3>Hotel</h3>
            <img src={dumyFoto} alt="Hotel" className="hotel-image" />
          </div>
          <div className="hotel-details">
            <p>Goldvitel Hotel Surabaya</p>
            <p>Warung selat mbak ru</p>
          </div>
          <div className="package-details">
            <h3>PAKET ASEK</h3>
            <h3>Transportasi</h3>
            <p>tanggal keberangkatan: 26-6-2024</p>
            <p>Citilink</p>
            <p>Rp 755.794</p>
            <button>Detail</button>
          </div>
        </div>
      </div>
      <div className="order-summary">
        <h3>Ringkasan Pesanan</h3>
        <p>(Summary details here)</p>
      </div>
      <div className="payment-details">
        <h3>Rincian pembayaran</h3>
        <div>
          <label>Metode pembayaran</label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="">Select Method</option>
            <option value="method1">M-banking</option>
            <option value="method2">Dana</option>
            <option value="method2">Shopeepay</option>
            <option value="method2">Qris</option>
            <option value="method2">Gopay</option>
          </select>
        </div>
        <div>
          <label>Pesan</label>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <div>
          <h3>Total pembayaran: Rp. 755.794</h3>
        </div>
        <button onClick={handleOrder}>Buat Pesanan</button>
      </div>
    </div>
  );
};

export default Transaksi;
