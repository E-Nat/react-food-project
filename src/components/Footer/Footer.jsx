import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Leaf, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ArrowUp,
  Linkedin,
  Github,
  Send,
  Calendar,
  Sparkles,
  Heart,
  Code2,
  ExternalLink
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import './Footer.css';

const Footer = () => {
  const { openReservation } = useTheme();
  const location = useLocation();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleHomeClick = (e) => {
    if (location.pathname === '/') {
      e.preventDefault();
      scrollToTop();
    }
  };

  return (
    <footer className="footer-master-root">
      <div className="container">
        {/* Creator Section */}
        <div className="creator-showcase-panel glass-card">
          <div className="creator-info-left">
            <div className="creator-badge">
              <Code2 size={15} color="var(--primary)" />
              <span>CRAFTED WITH PRECISION</span>
            </div>
            <h3 className="creator-title">
              Designed & Built by <span className="creator-name-highlight">E-Nat</span>
            </h3>
            <p className="creator-role-desc">
              Computer Science Student & Frontend Developer passionate about crafting modern, fluid web experiences.
            </p>
          </div>

          <div className="creator-social-links">
            <a
              href="https://www.linkedin.com/in/sokny-enat-293307377/"
              target="_blank"
              rel="noopener noreferrer"
              className="creator-social-btn glass-card"
              aria-label="LinkedIn profile of E-Nat"
              title="LinkedIn: sokny-enat"
            >
              <Linkedin size={18} />
              <span>LinkedIn</span>
              <ExternalLink size={12} className="ext-icon" />
            </a>

            <a
              href="https://github.com/E-Nat"
              target="_blank"
              rel="noopener noreferrer"
              className="creator-social-btn glass-card"
              aria-label="GitHub profile of E-Nat"
              title="GitHub: @E-Nat"
            >
              <Github size={18} />
              <span>GitHub</span>
              <ExternalLink size={12} className="ext-icon" />
            </a>

            <a
              href="https://t.me/e_nat13"
              target="_blank"
              rel="noopener noreferrer"
              className="creator-social-btn glass-card"
              aria-label="Telegram of E-Nat"
              title="Telegram: @e_nat13"
            >
              <Send size={18} />
              <span>Telegram</span>
              <ExternalLink size={12} className="ext-icon" />
            </a>
          </div>
        </div>

        {/* Footer Top Grid */}
        <div className="footer-top-grid">
          {/* Brand Column */}
          <div className="footer-brand-col">
            <Link to="/" onClick={handleHomeClick} className="footer-logo">
              <span className="footer-logo-icon">
                <Leaf size={18} strokeWidth={2.6} />
              </span>
              <span className="footer-logo-text">
                FOODLY<span className="logo-accent-dot">.</span>
              </span>
            </Link>
            <p className="footer-tagline">
              Fresh food. Better mood.
            </p>
            <p className="footer-brand-desc">
              Handcrafted artisan meals prepared fresh every day. Organic ingredients, bold flavors, and memorable culinary moments brought directly to your table.
            </p>
            {/* Social Links */}
            <div className="footer-social-row">
              <a
                href="https://www.linkedin.com/in/sokny-enat-293307377/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                aria-label="LinkedIn"
                title="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="https://github.com/E-Nat"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                aria-label="GitHub"
                title="GitHub"
              >
                <Github size={18} />
              </a>
              <a
                href="https://t.me/e_nat13"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                aria-label="Telegram"
                title="Telegram (@e_nat13)"
              >
                <Send size={17} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-links-col">
            <h4 className="footer-col-title">Quick Links</h4>
            <ul className="footer-nav-list">
              <li>
                <Link to="/" onClick={handleHomeClick} className="footer-nav-link">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/menu" className="footer-nav-link">
                  Menu
                </Link>
              </li>
              <li>
                <Link to="/about" className="footer-nav-link">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="footer-nav-link">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="footer-links-col">
            <h4 className="footer-col-title">Services</h4>
            <ul className="footer-nav-list">
              <li>
                <Link to="/menu" className="footer-nav-link">
                  Fast Delivery
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  className="footer-nav-link footer-btn-link"
                  onClick={openReservation}
                >
                  Table Reservations
                </button>
              </li>
              <li>
                <Link to="/contact" className="footer-nav-link">
                  Catering & Events
                </Link>
              </li>
              <li>
                <Link to="/menu" className="footer-nav-link">
                  Gourmet Takeaway
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="footer-contact-col">
            <h4 className="footer-col-title">Contact</h4>
            <div className="footer-contact-items">
              <div className="footer-contact-item">
                <Send size={16} className="contact-icon" />
                <a href="https://t.me/e_nat13" target="_blank" rel="noopener noreferrer" className="footer-contact-anchor">
                  Telegram: @e_nat13
                </a>
              </div>
              <div className="footer-contact-item">
                <Mail size={16} className="contact-icon" />
                <span>hello@foodly-restaurant.com</span>
              </div>
              <div className="footer-contact-item">
                <MapPin size={16} className="contact-icon" />
                <span>#128 Preah Norodom Blvd, Phnom Penh, Cambodia</span>
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
            © 2026 FOODLY. All rights reserved. • Designed & Built by <strong>E-Nat</strong>
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
