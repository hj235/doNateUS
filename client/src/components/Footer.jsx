import React from 'react';
import './Footer.css';
import logo from '../assets/logo50.png'; // Import the logo image

function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-section">
        <img src={logo} alt="Logo" className="footer-logo" />
      </div>
      <div className="footer-section">
        <p>&copy; 2024 doNateUS. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
