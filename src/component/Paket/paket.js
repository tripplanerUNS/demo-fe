import React, { useState, useEffect, useContext } from "react";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import "./paket.css";
import { Link } from "react-router-dom";
import { FaHotel } from "react-icons/fa6";
import { FaPlane } from "react-icons/fa";
import {
  IoMdArrowDropdownCircle,
  IoIosArrowDropupCircle,
} from "react-icons/io";
import { SlCalender } from "react-icons/sl";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { FaMoneyBill1Wave } from "react-icons/fa6";
import { GlobalContext } from "../../State/globalstate"; // Import GlobalContext
import TransportModal from "../Detail/transportmodal";

function PaketWisata({ dari, destinasi, tanggal, bugdet  }) {
  const { jumlahKaryawan, jumlah } = useContext(GlobalContext); // Use jumlahKaryawan from GlobalContext
  const [paketWisata, setPaketWisata] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading
  const [showDetails, setShowDetails] = useState(null);
  const [paketMurah, setPaketMurah] = useState(null); // State for cheapest package
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentTransportId, setCurrentTransportId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Start loading
        const response = await axios.post(
          `http://localhost:8000/api/auth/paket/budgett`,
          {
            dari: dari,
            tujuan: destinasi,
            tanggal_berangkat: tanggal,
            budget: bugdet,
            jumlah_hari: jumlah,
            jumlah_employee: jumlahKaryawan, // Use jumlahKaryawan from context
          }
        );

        if (
          response.status === 200 &&
          response.data.Data &&
          response.data.Data.length > 0
        ) {
          setPaketWisata(response.data.Data);
          setPaketMurah(response.data["Rekomendasi Paket Murah"]); // Set the cheapest package
          console.log(response.data.Data);
        } else {
          console.log("Tidak ada data yang ditemukan");
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchData();
  }, [dari, destinasi, tanggal, bugdet, jumlah, jumlahKaryawan]); // Add jumlahKaryawan as dependency

  const toggleDetails = (id) => {
    setShowDetails((prev) => (prev === id ? null : id));
  };

  const openModal = (transportId) => {
    setCurrentTransportId(transportId);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="paket-wisata-container slide-up-enter">
      <div>
        <Navbar />
      </div>
      <div className="rowPaket slide-up-enter">
        <div className="content-paket">
          <div className="judul-kota">
            {destinasi} tersedia {paketWisata.length} Paket
          </div>
          <div className="wrap-murah-list-sebelahan">
            {loading ? (
              <div className="loading-spinner"></div>
            ) : (
              <>
                <div className="wrap-rekomendasi-paket-murah">
                  <div className="rekomendasi-paket-murah">
                    <div className="paket-murah-nama">
                      <div className="judul-paket-murah">
                        {paketMurah.nama_paket}
                      </div>
                    </div>
                    <div className="paket-murah-content">
                      {paketMurah ? (
                        <div>
                          <div className="paket-murah-content-img">
                            <img
                              src={`http://localhost:8000/uploads/paket/${paketMurah.image}`}
                              alt="N"
                            />
                          </div>
                          <div className="paket-murah-content-info">
                            <div className="paket-murah-content-info-hotel">
                              <FaHotel /> {paketMurah.Hotel}
                            </div>
                            <div className="paket-murah-content-info-food">
                              {paketMurah.Food}
                            </div>
                            <div className="paket-murah-content-info-transport">
                              <FaPlane /> {paketMurah["Jenis transportasi"]}
                            </div>
                          </div>
                          <div className="paket-murah-content-info-2">
                            <div className="paket-murah-content-info-2-harga">
                              {paketMurah.Total_harga}
                            </div>
                            <div className="paket-murah-content-info-2-detail">
                              <Link
                                to={`/Detailpaket/${paketMurah.id}/${paketMurah.nama_paket}`}
                              >
                                Detail Paket
                              </Link>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <p>Loading...</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="wrap-content-paket">
                  {paketWisata.map((paket) => (
                    <div className="paket" key={paket.id}>
                      <div className="judul-paket">{paket.nama_paket}</div>
                      <div className="list-paket">
                        <div className="wrap-list-paket">
                          <div className="paketw">
                            <div className="row">
                              <div className="hotel">
                                <div>
                                  <FaHotel /> Hotel
                                </div>
                                <div className="row">
                                  <div className="gambar-paket">
                                    <img
                                      src={`http://localhost:8000/uploads/paket/${paket.image}`}
                                      alt="N"
                                    />
                                  </div>
                                  <div className="infoPaket">
                                    <Link to={`/Detail/${paket.id_hotels}`}>
                                      <p className="Hotelss">{paket.Hotel}</p>
                                    </Link>
                                    <p>{paket.Food}</p>
                                  </div>
                                </div>
                              </div>
                              <div className="column">
                                <div>
                                  <FaPlane /> Transportasi
                                </div>
                                <div className="transportasi">
                                  <p>{paket["Jenis transportasi"]}</p>
                                  <p>tanggal keberangkatan {tanggal} </p>
                                  <Link
                                    to={`/Detailtransport/${paket.id_transportasi}`}
                                  >
                                    <p>{paket.Transportasi}</p>
                                  </Link>
                                </div>
                              </div>
                              <div className="paket-container">
                                <p>{paket.Total_harga}</p>
                                <p className="pp">transportasi+hotel+kuliner</p>
                                <button className="Detailpaket">
                                  <Link
                                    to={`/Detailpaket/${paket.id}/${paket.nama_paket}`}
                                  >
                                    Detail Paket
                                  </Link>
                                </button>
                                <button
                                  className="toggle-details"
                                  onClick={() => toggleDetails(paket.id)}
                                >
                                  {showDetails === paket.id ? (
                                    <IoIosArrowDropupCircle />
                                  ) : (
                                    <IoMdArrowDropdownCircle />
                                  )}
                                </button>
                              </div>
                            </div>
                            <div
                              className={`wrap-drop-down-detail ${
                                showDetails === paket.id ? "open" : ""
                              }`}
                            >
                              <div className="drop-down-detail">
                                <h3 className="Judul-detail-paket1">
                                  {paket.nama_paket}
                                </h3>
                                <p>
                                  <SlCalender />
                                  <span>Tanggal Berangkat</span>
                                  {tanggal}
                                </p>
                                <p>
                                  <SlCalender />
                                  <span>Harga Hotel per Malam</span>
                                  {paket.Harga_hotel_per_malam}
                                </p>
                                <p>
                                  <RiMoneyDollarCircleLine />
                                  <span>Harga per Karyawan</span>
                                  {paket.Harga_paket_per_employee}
                                </p>
                                <p>
                                  <FaMoneyBill1Wave />
                                  <span>Total Harga</span>
                                  {paket.Total_harga}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <TransportModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        transportId={currentTransportId}
      />
    </div>
  );
}

export default PaketWisata;
