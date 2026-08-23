import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Leaf, 
  Phone, 
  Mail, 
  MapPin, 
  Instagram, 
  Facebook, 
  Twitter, 
  Video,
  Clock
} from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-wrapper">
      <div className="container">
        <div className="footer-main-grid">
          {/* Brand Column */}
          <div className="footer-brand-col">
            <Link to="/" className="footer-logo">
              <span className="logo-leaf">
                <Leaf size={22} strokeWidth={2.5} />
              </span>
              <span>FOODLY</span>
              <span className="logo-dot">.</span>
            </Link>
            <p className="footer-about-text">
              Crafting unforgettable culinary memories daily with locally sourced organic ingredients, sustainable packaging, and lightning-fast delivery.
            </p>
            {/* Social Icons */}
            <div className="footer-social-row">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="Instagram">
                <Instagram size={17} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="Facebook">
                <Facebook size={17} />
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="TikTok">
                <Video size={17} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="Twitter / X">
                <Twitter size={17} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="footer-col-title">Quick Links</h3>
            <ul className="footer-links-list">
              <li><Link to="/" className="footer-link">Home</Link></li>
              <li><Link to="/menu" className="footer-link">Menu</Link></li>
              <li><Link to="/about" className="footer-link">About Us</Link></li>
              <li><Link to="/contact" className="footer-link">Contact & Location</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="footer-col-title">Services</h3>
            <ul className="footer-links-list">
              <li><Link to="/menu" className="footer-link">Online Delivery</Link></li>
              <li><Link to="/contact" className="footer-link">Catering Orders</Link></li>
              <li><Link to="/about" className="footer-link">VIP Membership</Link></li>
              <li><Link to="/contact" className="footer-link">Customer Support</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="footer-col-title">Contact & Hours</h3>
            <ul className="footer-contact-list">
              <li className="footer-contact-item">
                <Phone size={17} className="contact-icon" />
                <span>+1 (800) 456-FOOD</span>
              </li>
              <li className="footer-contact-item">
                <Mail size={17} className="contact-icon" />
                <span>hello@foodlyrestaurant.com</span>
              </li>
              <li className="footer-contact-item">
                <MapPin size={17} className="contact-icon" />
                <span>742 Evergreen Terrace, Foodie District</span>
              </li>
              <li className="footer-contact-item">
                <Clock size={17} className="contact-icon" />
                <span>Mon–Sun: 10:00 AM – 11:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <p>© 2026 FOODLY Inc. All rights reserved.</p>
          <div className="footer-legal-links">
            <span className="footer-legal-link">Privacy Policy</span>
            <span className="footer-legal-link">Terms of Service</span>
            <span className="footer-legal-link">Cookie Settings</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
