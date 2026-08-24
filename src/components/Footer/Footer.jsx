import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Leaf, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ArrowUp,
  Instagram, 
  Facebook, 
  Twitter, 
  Linkedin,
  Heart
} from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="footer-master-root">
      <div className="container">
        <div className="footer-top-grid">
          {/* Brand Story Column */}
          <div className="footer-brand-col">
            <Link to="/" className="footer-logo">
              <span className="footer-logo-icon">
                <Leaf size={18} strokeWidth={2.6} />
              </span>
              <span className="footer-logo-text">
                FOODLY<span className="logo-accent-dot">.</span>
              </span>
            </Link>
            <p className="footer-brand-desc">
              Handcrafted artisan meals prepared fresh every day. Organic ingredients, bold flavors, and memorable culinary moments brought directly to your table.
            </p>
            {/* Social Icons */}
            <div className="footer-social-row">
              <a href="#instagram" className="footer-social-link" aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href="#facebook" className="footer-social-link" aria-label="Facebook">
                <Facebook size={18} />
              </a>
              <a href="#twitter" className="footer-social-link" aria-label="Twitter">
                <Twitter size={18} />
              </a>
              <a href="#linkedin" className="footer-social-link" aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-links-col">
            <h4 className="footer-col-title">Navigation</h4>
            <ul className="footer-nav-list">
              <li><Link to="/" className="footer-nav-link">Home</Link></li>
              <li><Link to="/menu" className="footer-nav-link">Menu</Link></li>
              <li><Link to="/about" className="footer-nav-link">About Us</Link></li>
              <li><Link to="/contact" className="footer-nav-link">Contact</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="footer-links-col">
            <h4 className="footer-col-title">Categories</h4>
            <ul className="footer-nav-list">
              <li><Link to="/menu?category=Burger" className="footer-nav-link">Artisan Burgers</Link></li>
              <li><Link to="/menu?category=Pizza" className="footer-nav-link">Stone-Baked Pizza</Link></li>
              <li><Link to="/menu?category=Pasta" className="footer-nav-link">Handmade Pasta</Link></li>
              <li><Link to="/menu?category=Salad" className="footer-nav-link">Organic Salads</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="footer-contact-col">
            <h4 className="footer-col-title">Find Us</h4>
            <div className="footer-contact-items">
              <div className="footer-contact-item">
                <MapPin size={16} className="contact-icon" />
                <span>#128 Preah Norodom Blvd, Phnom Penh, Cambodia</span>
              </div>
              <div className="footer-contact-item">
                <Phone size={16} className="contact-icon" />
                <span>+855 23 888 999 / +855 12 345 678</span>
              </div>
              <div className="footer-contact-item">
                <Mail size={16} className="contact-icon" />
                <span>hello@foodly-restaurant.com</span>
              </div>
              <div className="footer-contact-item">
                <Clock size={16} className="contact-icon" />
                <span>Mon – Sun: 09:00 AM – 10:30 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <p className="footer-copyright">
            © {new Date().getFullYear()} FOODLY. Handcrafted with <Heart size={13} fill="#F47752" color="#F47752" /> for food lovers everywhere.
          </p>

          <button
            type="button"
            className="footer-scroll-top-btn"
            onClick={scrollToTop}
            aria-label="Scroll back to top"
          >
            <span>Back to top</span>
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
