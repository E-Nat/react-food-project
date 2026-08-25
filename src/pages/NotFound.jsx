import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Compass, Search, Sparkles, UtensilsCrossed } from 'lucide-react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import { useTheme } from '../context/ThemeContext';
import './NotFound.css';

const NotFound = () => {
  const { openSearch } = useTheme();

  return (
    <div className="page-wrapper not-found-page">
      <Navbar />
      <main className="not-found-main">
        <div className="container">
          <div className="not-found-card glass-panel">
            <div className="not-found-badge">
              <Sparkles size={14} />
              <span>404 ERROR</span>
            </div>

            <div className="not-found-visual">
              <div className="not-found-halo animate-glow" />
              <div className="not-found-icon-wrap animate-float">
                <UtensilsCrossed size={64} className="not-found-utensils" />
              </div>
              <span className="not-found-number">404</span>
            </div>

            <h1 className="not-found-title">
              Looks like this dish is <span className="serif-accent">off the menu!</span>
            </h1>

            <p className="not-found-desc">
              We couldn't find the page or recipe you're looking for. It might have been moved, renamed, or is currently being seasoned in the kitchen.
            </p>

            <div className="not-found-actions">
              <Link to="/" className="btn-primary not-found-btn">
                <Home size={18} />
                <span>Return to Home</span>
              </Link>

              <Link to="/menu" className="btn-secondary not-found-btn glass-card">
                <Compass size={18} />
                <span>Explore Full Menu</span>
              </Link>

              <button 
                type="button" 
                className="btn-secondary not-found-btn glass-card"
                onClick={openSearch}
              >
                <Search size={18} />
                <span>Search Dishes</span>
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
