import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, UtensilsCrossed, Star } from 'lucide-react';
import useCountUp from '../../hooks/useCountUp';
import './AboutSection.css';

// Individual Stat Item with smooth count-up animation
const StatItem = ({ target, suffix = '', label, isDecimal = false }) => {
  const { count, elementRef } = useCountUp(target, 1800, isDecimal);

  return (
    <div ref={elementRef} className="about-stat-box glass-card">
      <span className="stat-big-number">
        {count}{suffix}
      </span>
      <span className="stat-caption">{label}</span>
    </div>
  );
};

const AboutSection = () => {
  return (
    <section className="section-wrapper about-master-section" id="about-us">
      <div className="container">
        <div className="about-grid-layout">
          {/* Left Column: Visual Collage with Floating Parallax Badges */}
          <div className="about-visual-collage">
            <div className="about-ambient-shape" aria-hidden="true" />

            <div className="collage-main-frame glass-panel">
              <img
                src="/images/hero-food.png"
                alt="Chef preparing fresh artisan dishes"
                className="collage-main-img animate-float"
                loading="lazy"
              />
            </div>

            {/* Floating Guarantee Badge 1 */}
            <div className="collage-floating-card-1 glass-card animate-float-reverse">
              <div className="card-icon-pill green">
                <UtensilsCrossed size={18} />
              </div>
              <div className="card-floating-info">
                <strong>100% Organic</strong>
                <span>Direct from local farms</span>
              </div>
            </div>

            {/* Floating Guarantee Badge 2 */}
            <div className="collage-floating-card-2 glass-card animate-float">
              <div className="card-icon-pill yellow">
                <Star size={18} fill="#F5C85B" color="#F5C85B" />
              </div>
              <div className="card-floating-info">
                <strong>5-Star Experience</strong>
                <span>Over 10,000 orders</span>
              </div>
            </div>
          </div>

          {/* Right Column: Story & Animated Statistics */}
          <div className="about-text-content">
            <div className="section-badge yellow">
              <Sparkles size={14} />
              <span>ABOUT FOODLY</span>
            </div>

            <h2 className="section-title">
              Food Made With <span>Passion & Love.</span>
            </h2>

            <p className="about-story-text">
              At FOODLY, we believe that exceptional food has the power to transform your entire day. Founded by passionate culinary artisans, our mission is to combine the freshness of farm-to-table organic ingredients with contemporary culinary techniques.
            </p>

            <p className="about-story-subtext">
              Every pizza dough is naturally fermented for 48 hours, every pasta is hand-rolled from scratch every morning, and every dish is seasoned with love and precision.
            </p>

            {/* Animated Statistics Grid */}
            <div className="about-stats-grid">
              <StatItem target={10} suffix="K+" label="Happy Customers" />
              <StatItem target={50} suffix="+" label="Dishes" />
              <StatItem target={4.9} suffix="" label="Average Rating" isDecimal={true} />
              <StatItem target={15} suffix="+" label="Expert Chefs" />
            </div>

            {/* CTA Button */}
            <div className="about-cta-row">
              <Link to="/about" className="btn-primary about-learn-btn">
                <span>Learn More About Us</span>
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
