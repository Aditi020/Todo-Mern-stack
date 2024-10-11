import React from 'react';
import './Footer.css';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-padding">
        <div className="footer-links">
          <div className="footerlinksdiv">
            <h4>Quick Links</h4>
            <a href="/about"><p>About Todo App</p></a>
            <a href="/how-to-use"><p>How to Use</p></a>
            <a href="/faq"><p>FAQ</p></a>
          </div>

          <div className="footerlinksdiv">
            <h4>User Support</h4>
            <a href="/contact-support"><p>Contact Support</p></a>
            <a href="/feedback"><p>Feedback</p></a>
          </div>

          <div className="footerlinksdiv">
            <h4>Policies</h4>
            <a href="/terms"><p>Terms of Service</p></a>
            <a href="/privacy"><p>Privacy Policy</p></a>
            <a href="/cookie"><p>Cookie Policy</p></a>
          </div>

          <div className="footerlinksdiv">
            <h4>Follow Us</h4>
            <div className="socialmedia">
              <a href="https://facebook.com"><FaFacebook size={24} color='#ffff' /></a>
              <a href="https://twitter.com"><FaTwitter size={24} color='#ffff' style={{ marginLeft: 10 }} /></a>
              <a href="https://instagram.com"><FaInstagram size={24} color='#ffff' style={{ marginLeft: 10 }} /></a>
              <a href="https://linkedin.com"><FaLinkedin size={24} color='#ffff' style={{ marginLeft: 10 }} /></a>
            </div>
          </div>
        </div>

        <hr />

        <div className="footer-below">
          <div className="footer-copyright">
            <p>© {new Date().getFullYear()} Your Todo App. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
