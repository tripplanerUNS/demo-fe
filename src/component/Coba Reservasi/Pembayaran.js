import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const PaymentPage = () => {
    const [snapToken, setSnapToken] = useState(null);
    const [orderId, setOrderId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const location = useLocation(null);
    const { state } = location;
    const { reservasi, paket } = state || {};

    useEffect(() => {
        // Buat permintaan ke endpoint Laravel untuk mendapatkan Snap Token
        const fetchSnapToken = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem('token');

                const response = await axios.post('http://localhost:8000/api/auth/paymentNew', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });

                setSnapToken(response.data.snap_token);
                setOrderId(response.data.order_id);
            } catch (error) {
                setError('Gagal mendapatkan Snap Token.');
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };

        if (reservasi && paket) {
            fetchSnapToken();
        }
    }, [reservasi, paket]);

    const handlePayment = () => {
        // Redireksi ke halaman pembayaran Midtrans menggunakan Snap Token
        if (snapToken) {
            window.snap.pay(snapToken, {
                onSuccess: function(result) {
                    alert('Pembayaran berhasil!');
                    console.log(result);
                    // Lakukan sesuatu setelah pembayaran berhasil (misalnya, update status di backend)
                },
                onPending: function(result) {
                    alert('Pembayaran sedang diproses.');
                    console.log(result);
                    // Lakukan sesuatu ketika pembayaran sedang diproses
                },
                onError: function(result) {
                    alert('Pembayaran gagal.');
                    console.error(result);
                    // Tangani kesalahan saat pembayaran gagal
                }
            });
        }
    };

    return (
        <div>
            <h2>Halaman Pembayaran</h2>
            {loading && <p>Sedang memuat...</p>}
            {error && <p>{error}</p>}
            {snapToken && (
                <div>
                    <p>Order ID: {orderId}</p>
                    <button onClick={handlePayment}>Bayar Sekarang</button>
                </div>
            )}
        </div>
    );
};


export default PaymentPage;