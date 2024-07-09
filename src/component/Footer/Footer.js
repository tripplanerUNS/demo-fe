import React from 'react';
import './Footer.css'; 
import logo from "../../Assets/Trip Plan.png";
import { FaInstagram, FaTwitter, FaFacebook, FaTiktok, FaYoutube } from "react-icons/fa";
import pantai from "../../Assets/pantai.jpg"

// Komponen footer
function Footer() {
    console.log('Rendering Footer component');
    return (
        <div className="footer">
                <div className='footer-column'>
                    <div className="footer-row">
                        <div className="footer-col">
                            <img src={logo} alt="logo" />
                        </div>
                        <div className="footer-col">
                            <h4>Pembayaran</h4>
                            <ul>
                                <li>Shopeepay</li>
                                <li>Gopay</li>
                                <li>Dana</li>
                                <li>Qris</li>
                                <li>M-banking</li>
                            </ul>
                        </div>
                        <div className="footer-col">
                            <h4>Follow me</h4>
                            <ul>
                                <li><FaInstagram /> Instagram</li>
                                <li><FaTwitter /> Twitter</li>
                                <li><FaFacebook /> Facebook</li>
                                <li><FaTiktok /> Tiktok</li>
                                <li><FaYoutube /> Youtube</li>
                            </ul>
                        </div>
                        <div className="footer-col">
                            <h4>Thanks To</h4>
                            <ul>
                                <li>Tuhan YME</li>
                                <li>Parent</li>
                                <li>UNS</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; 2024 Trip Planner App. All rights reserved.</p>
                </div>
        </div>
    );
}

export default Footer;