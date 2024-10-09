import React from 'react';
import './Footer.css';
import { FcTodoList } from "react-icons/fc";

const Footer = () => {
  return (
    <footer className="custom-footer">
      <div className="footer-container">
        <div className="footer-brand">
          <FcTodoList size={30} className="footer-icon" style={{ filter: 'invert(41%) sepia(70%) saturate(3200%) hue-rotate(320deg) brightness(97%) contrast(102%)' }} />
          <span className="footer-brand-name">QuickList</span>
        </div>
        <p className="footer-copyright">&copy; 2024 QuickList™. All Rights Reserved.</p>
        <div className="footer-links">
          <a href="#about" className="footer-link">About</a>
          <a href="#privacy" className="footer-link">Privacy Policy</a>
          <a href="#license" className="footer-link">Licensing</a>
          <a href="#contact" className="footer-link">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
