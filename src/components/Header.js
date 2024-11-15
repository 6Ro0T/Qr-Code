import React from 'react';
import './Header.css';
import logo from '../assets/images/google.png';

const Header = () => {
  return (
    <header className="header">
      <div className="header-logo">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <div className="header-button">
        <button>Profile</button>
      </div>
    </header>
  );
};

export default Header;
