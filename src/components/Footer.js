import React from 'react';
import './Footer.css';
import logo from '../assets/images/google.png';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-logo">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <div className="footer-content">
        <p>© 2024 Your Company. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
