import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { 
  Leaf, 
  Search, 
  Sun, 
  Moon, 
  ShoppingBag, 
  User, 
  Menu as MenuIcon, 
  X, 
  ArrowRight,
  Sparkles,
  Calendar
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useCart } from '../../context/CartContext';
import './Navbar.css';

const Navbar = () => {
  const { theme, toggleTheme, openSearch, openReservation } = useTheme();
  const { totalCartCount, openCart } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);

      const winHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (winHeight > 0) {
        setScrollProgress((scrollY / winHeight) * 100);
      }

      if (location.pathname === '/') {
        const sections = ['home', 'menu', 'about', 'contact'];
        const scrollPosition = scrollY + 220;
        for (let i = sections.length - 1; i >= 0; i--) {
          const el = document.getElementById(sections[i]);
          if (el && el.offsetTop <= scrollPosition) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  useEffect(() => {
    setMobileMenuOpen(false);
    setProfileOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/', sectionId: 'home' },
    { name: 'Menu', path: '/menu', sectionId: 'menu' },
    { name: 'About', path: '/about', sectionId: 'about' },
    { name: 'Contact', path: '/contact', sectionId: 'contact' },
  ];

  const handleNavClick = (e, link) => {
    if (location.pathname === '/' && link.sectionId) {
      const el = document.getElementById(link.sectionId);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth' });
        setMobileMenuOpen(false);
        return;
      }
    }
    setMobileMenuOpen(false);
  };

  const handleLogoClick = (e) => {
    if (location.pathname === '/') {
      const el = document.getElementById('home');
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      {/* Top Scroll Progress Indicator */}
      <div 
        className="top-scroll-progress-line" 
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      <header className={`navbar-root ${isScrolled ? 'is-scrolled' : ''}`}>
        <div className="container">
          <div className="navbar-pill-container glass-panel">
            {/* Left: Brand Logo */}
            <Link to="/" onClick={handleLogoClick} className="navbar-logo" aria-label="FOODLY Home">
              <span className="logo-icon-badge animate-glow">
                <Leaf size={18} strokeWidth={2.6} />
              </span>
              <span className="logo-title">
                FOODLY<span className="logo-accent-dot">.</span>
              </span>
            </Link>

            {/* Center: Desktop Navigation Links with animated indicator */}
            <nav className="desktop-navigation" aria-label="Main Navigation">
              <ul className="nav-link-list">
                {navLinks.map((link) => {
                  const isCurrentActive = location.pathname === '/' 
                    ? activeSection === link.sectionId
                    : location.pathname === link.path;

                  return (
                    <li key={link.name}>
                      <NavLink
                        to={link.path}
                        onClick={(e) => handleNavClick(e, link)}
                        className={`nav-link ${isCurrentActive ? 'is-active' : ''}`}
                      >
                        <span>{link.name}</span>
                        <span className="nav-underline" aria-hidden="true" />
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Right: Actions (Desktop: Search, Theme, Cart, Profile, CTA | Mobile <= 767px: Search, Menu) */}
            <div className="navbar-actions-group">
              {/* Search Button (Always present: Desktop + Mobile) */}
              <button
                type="button"
                className="nav-action-btn search-trigger-btn"
                onClick={openSearch}
                aria-label="Search dishes"
                title="Search menu (Ctrl+K)"
              >
                <Search size={18} />
              </button>

              {/* Theme Toggle Button (Desktop & Tablet) */}
              <button
                type="button"
                className="nav-action-btn theme-toggle-btn"
                onClick={toggleTheme}
                aria-label={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
                title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
              >
                {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
              </button>

              {/* Cart Button with Count Badge (Desktop & Tablet) */}
              <button
                type="button"
                className="nav-action-btn cart-action-btn"
                onClick={openCart}
                aria-label="View Cart"
                title="Shopping Cart"
              >
                <ShoppingBag size={18} />
                {totalCartCount > 0 && (
                  <span className="navbar-cart-badge">{totalCartCount}</span>
                )}
              </button>

              {/* Profile Button with Popover (Desktop only) */}
              <div className="profile-dropdown-wrapper">
                <button
                  type="button"
                  className="nav-action-btn profile-trigger-btn"
                  onClick={() => setProfileOpen(!profileOpen)}
                  aria-label="User Profile"
                  title="My Account"
                >
                  <User size={18} />
                </button>
                {profileOpen && (
                  <div className="profile-glass-popover glass-card">
                    <div className="popover-header">
                      <Sparkles size={16} color="var(--primary)" />
                      <strong>Welcome to FOODLY!</strong>
                    </div>
                    <p className="popover-text">Enjoy fresh chef-crafted meals & daily exclusive rewards.</p>
                    <div className="popover-divider" />
                    <Link to="/menu" className="popover-link" onClick={() => setProfileOpen(false)}>
                      <span>Browse Menu</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                )}
              </div>

              {/* CTA: Book a Table (Desktop & Tablet) */}
              <button
                type="button"
                className="btn-primary navbar-cta-btn"
                onClick={openReservation}
              >
                <Calendar size={15} />
                <span>Book a Table</span>
              </button>

              {/* Mobile Hamburger Toggle (Mobile <= 767px & Tablet) */}
              <button
                type="button"
                className="mobile-hamburger-btn"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              >
                {mobileMenuOpen ? <X size={20} /> : <MenuIcon size={20} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Backdrop */}
      {mobileMenuOpen && (
        <div 
          className="mobile-drawer-backdrop" 
          onClick={() => setMobileMenuOpen(false)} 
        />
      )}

      {/* Mobile Drawer / Panel */}
      <aside className={`mobile-nav-drawer glass-panel ${mobileMenuOpen ? 'is-open' : ''}`} aria-hidden={!mobileMenuOpen}>
        <div className="drawer-header">
          <Link to="/" className="navbar-logo" onClick={() => setMobileMenuOpen(false)}>
            <span className="logo-icon-badge">
              <Leaf size={16} strokeWidth={2.6} />
            </span>
            <span className="logo-title">
              FOODLY<span className="logo-accent-dot">.</span>
            </span>
          </Link>
          <button 
            type="button" 
            className="drawer-close-btn"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="drawer-nav" aria-label="Mobile Navigation">
          {navLinks.map((link) => {
            const isCurrentActive = location.pathname === '/' 
              ? activeSection === link.sectionId
              : location.pathname === link.path;

            return (
              <NavLink
                key={link.name}
                to={link.path}
                className={`drawer-nav-item ${isCurrentActive ? 'is-active' : ''}`}
                onClick={(e) => handleNavClick(e, link)}
              >
                <span>{link.name}</span>
                <ArrowRight size={16} />
              </NavLink>
            );
          })}
        </nav>

        <div className="drawer-footer-actions">
          {/* Prominent Book a Table CTA in Mobile Menu */}
          <button
            type="button"
            className="btn-primary drawer-cta-btn"
            onClick={() => {
              setMobileMenuOpen(false);
              openReservation();
            }}
          >
            <Calendar size={16} />
            <span>Book a Table</span>
          </button>

          <div className="drawer-actions-grid">
            <button
              type="button"
              className="drawer-action-pill"
              onClick={() => {
                setMobileMenuOpen(false);
                openCart();
              }}
            >
              <ShoppingBag size={16} />
              <span>Cart {totalCartCount > 0 ? `(${totalCartCount})` : ''}</span>
            </button>

            <button
              type="button"
              className="drawer-action-pill"
              onClick={toggleTheme}
            >
              {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
              <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
            </button>

            <button
              type="button"
              className="drawer-action-pill"
              onClick={() => {
                setMobileMenuOpen(false);
                openSearch();
              }}
            >
              <Search size={16} />
              <span>Search Dishes</span>
            </button>

            <Link
              to="/menu"
              className="drawer-action-pill"
              onClick={() => setMobileMenuOpen(false)}
            >
              <User size={16} />
              <span>My Account</span>
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Navbar;
