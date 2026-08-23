import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { 
  Leaf, 
  Search, 
  Sun, 
  Moon, 
  ShoppingBag, 
  User, 
  Menu, 
  X, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useCart } from '../../context/CartContext';
import './Navbar.css';

const Navbar = () => {
  const { theme, toggleTheme, openSearch, openReservation } = useTheme();
  const { totalCartCount, openCart } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileTooltip, setProfileTooltip] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleProfileClick = () => {
    setProfileTooltip((prev) => !prev);
    setTimeout(() => setProfileTooltip(false), 3000);
  };

  return (
    <>
      <header className={`navbar-wrapper ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container navbar-container">
          {/* Logo */}
          <Link to="/" className="navbar-logo" aria-label="FOODLY Home">
            <span className="logo-leaf">
              <Leaf size={22} strokeWidth={2.5} />
            </span>
            <span className="logo-text">FOODLY</span>
            <span className="logo-dot">.</span>
          </Link>

          {/* Desktop Navigation Links with Active Indicator */}
          <nav className="desktop-nav" aria-label="Main Navigation">
            <ul className="navbar-links">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `nav-link-item ${isActive ? 'active' : ''}`
                    }
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Action Icons */}
          <div className="navbar-actions">
            {/* Search Trigger */}
            <button
              type="button"
              className="nav-icon-btn"
              onClick={openSearch}
              aria-label="Search dishes (Ctrl+K)"
              title="Search dishes (Ctrl+K)"
            >
              <Search size={18} />
            </button>

            {/* Light / Dark Mode Toggle */}
            <button 
              type="button"
              className="nav-icon-btn theme-toggle-btn" 
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
              title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            {/* Cart with Live Count Badge */}
            <button 
              type="button"
              className="nav-icon-btn cart-btn-wrap" 
              onClick={openCart}
              aria-label="View Shopping Cart"
              title="Shopping Cart"
            >
              <ShoppingBag size={18} />
              {totalCartCount > 0 && (
                <span className="cart-badge">{totalCartCount}</span>
              )}
            </button>

            {/* Profile Button with quick toast */}
            <div className="profile-btn-container">
              <button 
                type="button"
                className="nav-icon-btn" 
                onClick={handleProfileClick}
                aria-label="User profile"
              >
                <User size={18} />
              </button>
              {profileTooltip && (
                <div className="profile-popover">
                  <Sparkles size={14} color="var(--accent)" />
                  <span>Welcome back, Foodie Member!</span>
                </div>
              )}
            </div>

            {/* Desktop Order / Reservation Button */}
            <button
              type="button"
              className="nav-order-btn"
              onClick={openReservation}
            >
              <span>Book Table</span>
              <ArrowRight size={14} />
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              className="mobile-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation Backdrop & Panel */}
      {mobileMenuOpen && (
        <div 
          className="mobile-drawer-backdrop" 
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
      
      <div className={`mobile-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-drawer-header">
          <Link to="/" className="navbar-logo" onClick={() => setMobileMenuOpen(false)}>
            <span className="logo-leaf">
              <Leaf size={20} strokeWidth={2.5} />
            </span>
            <span className="logo-text">FOODLY</span>
            <span className="logo-dot">.</span>
          </Link>
          <button 
            className="mobile-drawer-close"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mobile-drawer-links">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `mobile-nav-link ${isActive ? 'active' : ''}`
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>{link.name}</span>
              <ArrowRight size={16} />
            </NavLink>
          ))}
        </div>

        <div className="mobile-drawer-bottom">
          <button 
            type="button"
            className="mobile-action-pill" 
            onClick={openSearch}
          >
            <Search size={16} />
            <span>Search Dishes</span>
          </button>

          <button 
            type="button"
            className="mobile-action-pill" 
            onClick={toggleTheme}
          >
            {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
            <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
          </button>

          <button 
            type="button"
            className="btn-primary" 
            style={{ width: '100%', marginTop: '0.5rem' }}
            onClick={() => {
              setMobileMenuOpen(false);
              openReservation();
            }}
          >
            <span>Book a Table</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
