import React, { useState } from 'react';
import { 
  Smartphone, 
  Star, 
  Clock, 
  CheckCircle2, 
  Search,
  Radio
} from 'lucide-react';
import './AppPromo.css';

const AppPromo = () => {
  const [activeScreenTab, setActiveScreenTab] = useState('All');

  return (
    <section className="section-wrapper app-promo-master-section" id="mobile-app">
      <div className="container">
        <div className="app-promo-glass-banner glass-panel">
          {/* Ambient Glows */}
          <div className="app-glow-top-left" aria-hidden="true" />
          <div className="app-glow-bottom-right" aria-hidden="true" />

          <div className="app-promo-grid">
            {/* Left Content Column */}
            <div className="app-promo-text-col">
              <div className="section-badge coral">
                <Smartphone size={14} />
                <span>FOODLY APP</span>
              </div>

              <h2 className="app-promo-heading">
                Your Favorite Food, <br />
                <span>Always With You.</span>
              </h2>

              <p className="app-promo-description">
                Experience ultra-fast 1-tap ordering, real-time live GPS driver tracking, exclusive chef discounts, and seamless contactless payments right in your pocket.
              </p>

              {/* Feature Points */}
              <div className="app-features-list">
                <div className="app-feature-row">
                  <CheckCircle2 size={18} color="var(--green)" />
                  <span>Real-time live kitchen & delivery tracking</span>
                </div>
                <div className="app-feature-row">
                  <CheckCircle2 size={18} color="var(--green)" />
                  <span>Exclusive in-app deals & weekly free delivery</span>
                </div>
                <div className="app-feature-row">
                  <CheckCircle2 size={18} color="var(--green)" />
                  <span>Save favorite meals & re-order in under 5 seconds</span>
                </div>
              </div>

              {/* App Store / Google Play Buttons */}
              <div className="app-download-buttons">
                {/* App Store Button */}
                <a
                  href="#download-ios"
                  className="store-download-btn"
                  onClick={(e) => e.preventDefault()}
                  aria-label="Download on App Store"
                >
                  <svg className="store-svg-icon" viewBox="0 0 24 24" width="26" height="26" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.92-2.85-.9.04-1.98.6-2.61 1.34-.56.64-1.04 1.7-0.91 2.73.99.08 2.01-.51 2.6-1.22z"/>
                  </svg>
                  <div className="store-btn-text">
                    <small>Download on the</small>
                    <strong>App Store</strong>
                  </div>
                </a>

                {/* Google Play Button */}
                <a
                  href="#download-android"
                  className="store-download-btn"
                  onClick={(e) => e.preventDefault()}
                  aria-label="Get it on Google Play"
                >
                  <svg className="store-svg-icon" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                    <path d="M3.609 1.814L13.792 12 3.61 22.186a1.99 1.99 0 0 1-.22-.924V2.738c0-.336.08-.66.22-.924zm11.31 11.31l2.586 2.586-12.01 6.934 9.424-9.52zm0-2.248L5.495 1.352l12.01 6.934-2.586 2.59zm1.414 1.124l3.86 2.228c.84.485.84 1.272 0 1.758l-3.86 2.228-2.486-2.486 2.486-2.486z"/>
                  </svg>
                  <div className="store-btn-text">
                    <small>GET IT ON</small>
                    <strong>Google Play</strong>
                  </div>
                </a>
              </div>
            </div>

            {/* Right Phone Mockup Column */}
            <div className="app-promo-visual-col">
              <div className="phone-mockup-wrapper">
                {/* Floating Glass Card 1: Live Status */}
                <div className="phone-floating-card card-status glass-card animate-float">
                  <div className="floating-status-pill green">
                    <span className="live-radar-dot animate-glow" />
                    <Clock size={16} />
                  </div>
                  <div className="floating-status-info">
                    <strong>Order on the way!</strong>
                    <span>Arriving in 18 mins</span>
                  </div>
                </div>

                {/* Phone Hardware Mockup Frame */}
                <div className="phone-hardware-bezel animate-float-gentle">
                  <div className="phone-speaker-notch" />

                  {/* Inside Screen UI */}
                  <div className="phone-screen-content">
                    {/* App Header */}
                    <div className="screen-header">
                      <div className="screen-location">
                        <small>Deliver to</small>
                        <strong>Phnom Penh City 📍</strong>
                      </div>
                      <div className="screen-avatar-mini">
                        <img src="/images/avatar-1.jpg" alt="User" />
                      </div>
                    </div>

                    {/* App Search Bar */}
                    <div className="screen-search-box">
                      <Search size={12} />
                      <span>Search delicious meals...</span>
                    </div>

                    {/* Category mini pills */}
                    <div className="screen-categories-row">
                      {['All', 'Pizza', 'Burger', 'Pasta'].map((tab) => (
                        <button
                          key={tab}
                          type="button"
                          className={`screen-pill ${activeScreenTab === tab ? 'active' : ''}`}
                          onClick={() => setActiveScreenTab(tab)}
                        >
                          {tab === 'All' ? '🔥 All' : tab === 'Pizza' ? '🍕 Pizza' : tab === 'Burger' ? '🍔 Burger' : '🍝 Pasta'}
                        </button>
                      ))}
                    </div>

                    {/* Mini Food Card 1 */}
                    <div className="screen-food-card">
                      <img src="/images/pasta.png" alt="Tagliatelle" className="screen-food-img" />
                      <div className="screen-food-info">
                        <strong>Creamy Tagliatelle</strong>
                        <span>Handmade pasta</span>
                        <div className="screen-food-price-row">
                          <span className="screen-price">$14.99</span>
                          <button type="button" className="screen-add-btn">+</button>
                        </div>
                      </div>
                    </div>

                    {/* Mini Food Card 2 */}
                    <div className="screen-food-card">
                      <img src="/images/burger.png" alt="Classic Burger" className="screen-food-img" />
                      <div className="screen-food-info">
                        <strong>Classic Burger</strong>
                        <span>Angus smash patty</span>
                        <div className="screen-food-price-row">
                          <span className="screen-price">$12.99</span>
                          <button type="button" className="screen-add-btn">+</button>
                        </div>
                      </div>
                    </div>

                    {/* Mini Bottom Nav */}
                    <div className="screen-bottom-nav">
                      <span className="screen-nav-icon active">🏠</span>
                      <span className="screen-nav-icon">🔍</span>
                      <span className="screen-nav-icon">🛍️</span>
                      <span className="screen-nav-icon">👤</span>
                    </div>
                  </div>
                </div>

                {/* Floating Glass Card 2: Rating */}
                <div className="phone-floating-card card-social glass-card animate-float-reverse">
                  <div className="floating-status-pill yellow">
                    <Star size={16} fill="#F5C85B" color="#F5C85B" />
                  </div>
                  <div className="floating-status-info">
                    <strong>4.9 ★ Rating</strong>
                    <span>50K+ Mobile Downloads</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppPromo;
