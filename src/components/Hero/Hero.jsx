import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Star, 
  Sparkles, 
  Clock, 
  ShieldCheck, 
  Flame 
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import './Hero.css';

const Hero = () => {
  const { openReservation } = useTheme();

  return (
    <section className="hero-section-wrapper" id="home">
      {/* Subtle Ambient Backdrops */}
      <div className="hero-ambient-blob-left" aria-hidden="true" />
      <div className="hero-ambient-blob-right" aria-hidden="true" />

      <div className="container hero-layout-grid">
        {/* Left Column: Text & Actions */}
        <div className="hero-text-content">
          {/* Small label with entrance animation */}
          <div className="hero-tag-badge">
            <Sparkles size={14} className="badge-sparkle" />
            <span>GOOD FOOD • GOOD MOOD</span>
          </div>

          {/* Hero heading with line-by-line reveal */}
          <h1 className="hero-main-heading">
            <span className="heading-line-wrap">
              <span className="heading-line line-1">Your Food Is</span>
            </span>
            <span className="heading-line-wrap">
              <span className="heading-line line-2 heading-accent">Waiting For You</span>
            </span>
          </h1>

          {/* Description */}
          <p className="hero-lead-description">
            Fresh ingredients, delicious flavors, and meals made to make your day better.
          </p>

          {/* Primary & Secondary Buttons */}
          <div className="hero-button-group">
            <Link to="/menu" className="btn-primary">
              <span>Explore Menu</span>
              <ArrowRight size={18} strokeWidth={2.5} />
            </Link>
            <button
              type="button"
              className="btn-secondary"
              onClick={openReservation}
            >
              <span>Book a Table</span>
            </button>
          </div>

          {/* Key Value Points */}
          <div className="hero-benefits-row">
            <div className="benefit-pill">
              <div className="benefit-icon-box">
                <Clock size={16} />
              </div>
              <span>25–30 Min Delivery</span>
            </div>

            <div className="benefit-pill">
              <div className="benefit-icon-box">
                <ShieldCheck size={16} />
              </div>
              <span>100% Fresh & Organic</span>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Food Visual */}
        <div className="hero-image-stage">
          <div className="hero-image-backdrop" aria-hidden="true" />
          <div className="hero-image-ring" aria-hidden="true" />

          {/* Live Kitchen Badge */}
          <div className="hero-floating-delivery">
            <span className="delivery-status-dot" />
            <span>Live Kitchen • Now Open</span>
          </div>

          {/* Large Hero Food Image with Entrance & Floating Animation */}
          <div className="hero-main-food-wrap">
            <img
              src="/images/hero-food.png"
              alt="Fresh artisan avocado tartine dish"
              className="hero-main-food"
              width="500"
              height="500"
            />
          </div>

          {/* Floating Card: Rating & Happy Customers */}
          <div className="hero-floating-card">
            <div className="floating-star-circle">
              <Star size={18} fill="currentColor" />
            </div>
            <div>
              <div className="floating-card-rating">
                <span>4.9</span>
                <span className="rating-max">/ 5.0</span>
              </div>
              <div className="floating-card-sub">2,400+ food lovers</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
