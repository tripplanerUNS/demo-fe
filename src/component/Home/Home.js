import React, { useState, useRef, useEffect, useContext } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import axios from "axios";
import triplane from "../../Assets/triplane.jpg";
import logo from "../../Assets/Trip Plan.png";
import "./Home.css";
import { MdSwapHorizontalCircle } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import jakarta from "../../Assets/jakarta.jpeg";
import Solo from "../../Assets/Solo.jpg";
import Bali from "../../Assets/Bali.jpg";
import Surabaya from "../../Assets/surabaya.jpeg";
import Monas from "../../Assets/Monas.jpg";
import keraton from "../../Assets/keraton.jpg";
import { GlobalContext } from "../../State/globalstate";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function formatCurrency(amount) {
  return `Rp. ${amount.toLocaleString("id-ID", { maximumFractionDigits: 0 })}`;
}

function Home({
  origin,
  setOrigin,
  destination,
  setDestination,
  budget,
  setBudget,
  berangkat,
  setBerangkat,
}) {
  const { jumlahKaryawan, setJumlahKaryawan } = useContext(GlobalContext);
  const { jumlah, setJumlah } = useContext(GlobalContext);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const popupRef = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/auth/paket/budget`,
        {
          dari: origin,
          tujuan: destination,
          tanggal_berangkat: berangkat,
          budget: budget,
          jumlah_hari: jumlah,
          jumlah_employee: jumlahKaryawan,
        }
      );

      if (response.status === 200 && response.data.length > 0) {
        navigate("/PaketWisata");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert("Mohon maaf tujuan " + destination + " belum tersedia");
      } else if (error.response && error.response.status === 400) {
        alert(
          "Maaf, budget Anda belum kami temukan untuk tujuan " + destination
        );
      } else {
        console.error("Error:", error);
        alert("Terjadi kesalahan saat memuat data");
      }
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowPopup(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const openPopup = () => {
    setShowPopup(true);
  };

  const handleSwap = () => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
  };

  const handleBerangkatChange = (e) => {
    const selectedDate = e.target.value;
    setBerangkat(selectedDate);
    setCheckIn(selectedDate);
  };

  const handleBudgetChange = (e) => {
    const value = e.target.value.replace(/[^\d]/g, "");
    setBudget(value);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="body">
      <Navbar />
      <div className="background" style={{ backgroundImage: `url(${triplane})` }}>
        <div className="judul-konten">
          <h1>
            <span className="highlight">Rencanakan </span>
            <span className="highlight1">Perjalanan</span>
            <br />
            <span className="highlight2">anda dan dapatkan </span>
            <span className="highlight3">harga termurah</span>
          </h1>
          <p className="new-p">
            <span className="new-pp">Temukan perjalanan yang tepat untuk </span>
            <span className="new-pp1">memberangkatkan </span>
            <span className="new-pp2">pekerja remote Anda ke kantor.</span>
          </p>
        </div>
        <div className="new-content">
          <div className="new-content-search">
            <div className="new-content-search-row">
              <input
                type="text"
                placeholder="Dari"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
              />
              <input
                type="text"
                placeholder="Ke"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
              <input
                type="date"
                placeholder="Tanggal Berangkat"
                value={berangkat}
                onChange={handleBerangkatChange}
              />
              <input
                type="input"
                className="form-control"
                placeholder="Jumlah hari"
                value={jumlah}
                onChange={(e) => setJumlah(e.target.value)}
              />
            </div>
            <div className="new-content-search-row">
              <input
                type="number"
                className="budget-control"
                placeholder="Max 5 karyawan"
                value={jumlahKaryawan}
                onChange={(e) => {
                  const value = e.target.value;
                  if (
                    value === "" ||
                    (parseInt(value) >= 1 && parseInt(value) <= 5)
                  ) {
                    setJumlahKaryawan(value);
                  }
                }}
              />
              <input
                type="text"
                className="budget-control"
                placeholder="Your Budget"
                value={formatCurrency(budget)}
                onChange={handleBudgetChange}
              />
            </div>
            <div className="new-content-search-button">
              <button
                className="searchButton"
                type="button"
                onClick={handleSubmit}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="wrap-bantuan-about">
        <h1 className="title">DESTINASI POPULER</h1>
        <Slider {...settings}>
          <div className="gallery-item">
            <img src={jakarta} alt="jakarta" />
            <div className="gallery-item-text">Jakarta</div>
          </div>
          <div className="gallery-item">
            <img src={Solo} alt="Solo" />
            <div className="gallery-item-text">Solo</div>
          </div>
          <div className="gallery-item">
            <img src={Surabaya} alt="Surabaya" />
            <div className="gallery-item-text">Surabaya</div>
          </div>
          <div className="gallery-item">
            <img src={Bali} alt="Bali" />
            <div className="gallery-item-text">Bali</div>
          </div>
        </Slider>
        <div className="wrap-bantuan-home">
          <section className="wrap-bantuan-home" id="bantuan">
            <div className="bantuan-home">
              <h1 className="bantuan-home-text">
                Bagaimana cara menggunakannya?
              </h1>
              <div className="wrap-content-bantuan">
                <div className="content-bantuan">
                  <div className="content-bantuan-vidio">
                    <iframe
                      width="560"
                      height="315"
                      src="https://www.youtube.com/embed/VIDEO_ID"
                      title="Tutorial Penggunaan Fitur"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div className="wrap-about-home">
          <section className="wrap-about-home" id="about">
            <div className="wrap-about-content">
              <div className="about-content">
                <h2 className="about-content-text">TENTANG</h2>
                <div className="about-content-1">
                  <div className="about-content-1-text">
                    <p>
                      Kami adalah sebuah tim yang berdedikasi untuk memberikan
                      pengalaman perjalanan yang tak terlupakan kepada setiap
                      pelanggan kami. Dengan lebih dari sepuluh tahun pengalaman
                      dalam industri perjalanan, kami telah menjadi mitra yang
                      tepercaya bagi mereka yang mencari petualangan, kenyamanan,
                      dan inspirasi. Kami percaya bahwa setiap perjalanan adalah
                      sebuah cerita yang unik, dan kami berkomitmen untuk
                      menyediakan layanan yang dapat disesuaikan dengan kebutuhan
                      dan keinginan setiap pelanggan kami.
                    </p>
                  </div>
                  <div className="about-content-1-image">
                    <img src={Monas} alt="Monas" />
                  </div>
                </div>
                <div className="about-content-2">
                  <div className="about-content-2-image">
                    <img src={keraton} alt="keraton" />
                  </div>
                  <div className="about-content-2-text">
                    <p>
                      Di dalam perjalanan kami, kami tidak hanya menawarkan destinasi
                      indah dan akomodasi yang nyaman, tetapi juga menyediakan
                      pengalaman lokal yang autentik dan aktivitas yang menginspirasi.
                      Dari petualangan alam yang menantang hingga keindahan budaya yang
                      memukau, kami menghadirkan beragam pilihan untuk memenuhi berbagai
                      minat dan preferensi. Dengan keragaman destinasi yang kami
                      tawarkan, setiap pelanggan kami dapat menemukan petualangan yang
                      sesuai dengan impian mereka.
                    </p>
                  </div>
                </div>
                <div className="about-content-3">
                  <div className="about-content-3-text">
                    <p>
                      Kami bangga menjadi bagian dari perjalanan hidup Anda dan
                      berkomitmen untuk memberikan pengalaman yang tak terlupakan
                      setiap kali Anda memilih kami sebagai mitra perjalanan Anda.
                      Dengan dukungan tim profesional kami dan layanan pelanggan yang
                      responsif, kami berusaha untuk menjadikan setiap perjalanan Anda
                      mengesankan, mulai dari perencanaan hingga pulang ke rumah.
                      Bersama kami, mari jelajahi dunia, menciptakan kenangan yang akan
                      bertahan seumur hidup.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "black" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "black" }}
      onClick={onClick}
    />
  );
}
