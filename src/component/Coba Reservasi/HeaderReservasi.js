// HeaderReservasi.js
import React from "react";
import logo from "../../Assets/Trip Plan.png";
import "./Reservasi.css";

function HeaderReservasi({ currentStep }) {
  return (
    <div className="wrap-header-reservasi">
      <div className="wrap-header-reservasi-content">
        <div className="navbar-logo-new">
          <img src={logo} alt="Logo" />
        </div>
        <div className="header-content-reservasi-stepper">
          <ul className="wrap-content-stepper">
            <li className={`content-header-stepper ${currentStep >= 1 ? 'active' : ''}`}>
              <span className="content-header-stepper-number">1</span>
              <div className="content-header-stepper-information">
                Informasi Reservasi
              </div>
            </li>
            <li className={`content-header-stepper ${currentStep >= 2 ? 'active' : ''}`}>
              <span className="content-header-stepper-number">2</span>
              <div className="content-header-stepper-information">
                Informasi Pembayaran
              </div>
            </li>
            <li className={`content-header-stepper ${currentStep >= 3 ? 'active' : ''}`}>
              <span className="content-header-stepper-number">3</span>
              <div className="content-header-stepper-information">
                Pemesanan berhasil!
              </div>
            </li>
          </ul>
        </div>
        {/* <div className="user-profile-content">
          <span className="icon-profile"></span>
          <div className="informasi-profile"></div>
        </div> */}
      </div>
    </div>
  );
}

export default HeaderReservasi;
