import React from 'react';
import { 
  Check, 
  Smartphone, 
  Download, 
  Zap, 
  Star, 
  Navigation,
  Home,
  Compass,
  ShoppingBag,
  User
} from 'lucide-react';
import useScrollReveal from '../../hooks/useScrollReveal';
import './AppPromo.css';

const AppPromo = () => {
  const sectionRef = useScrollReveal();

  return (
    <section className="app-promo-section reveal-on-scroll" id="app" ref={sectionRef}>
      <div className="container app-promo-grid">
        {/* Left Column: App Copy & Download Links */}
        <div className="app-promo-content">
          <div className="app-promo-badge">
            <Smartphone size={14} />
            <span>GOOD FOOD, ANYWHERE</span>
          </div>

          <h2 className="app-promo-title">
            Order Your Favorite Meals Whenever You Want.
          </h2>

          <p className="app-promo-desc">
            Download the FOODLY mobile app to track fresh chef meals in real-time, unlock exclusive VIP discounts, and reorder favorites in a single tap.
          </p>

          {/* Features Checklist */}
          <ul className="app-features-checklist">
            <li className="app-feature-row">
              <div className="app-check-circle">
                <Check size={14} strokeWidth={2.6} />
              </div>
              <span>Live real-time driver GPS tracking</span>
            </li>
            <li className="app-feature-row">
              <div className="app-check-circle">
                <Check size={14} strokeWidth={2.6} />
              </div>
              <span>Zero-fee delivery on all member orders</span>
            </li>
            <li className="app-feature-row">
              <div className="app-check-circle">
                <Check size={14} strokeWidth={2.6} />
              </div>
              <span>Curated weekly chef specials and secret drops</span>
            </li>
          </ul>

          {/* Store Download Buttons */}
          <div className="store-buttons-wrap">
            {/* Google Play */}
            <a href="#playstore" className="store-btn" onClick={(e) => e.preventDefault()}>
              <div className="store-icon">
                <Download size={22} />
              </div>
              <div className="store-text-group">
                <span className="store-subtitle">GET IT ON</span>
                <span className="store-title">Google Play</span>
              </div>
            </a>

            {/* App Store */}
            <a href="#appstore" className="store-btn" onClick={(e) => e.preventDefault()}>
              <div className="store-icon">
                <Smartphone size={22} />
              </div>
              <div className="store-text-group">
                <span className="store-subtitle">DOWNLOAD ON THE</span>
                <span className="store-title">App Store</span>
              </div>
            </a>
          </div>
        </div>

        {/* Right Column: Modern Phone Mockup */}
        <div className="phone-mockup-wrapper">
          {/* Floating Metric 1 */}
          <div className="app-float-badge-left">
            <div className="app-check-circle" style={{ backgroundColor: 'var(--green-light)', color: 'var(--green)' }}>
              <Zap size={16} />
            </div>
            <div>
              <div style={{ fontSize: '0.82rem', fontWeight: 800 }}>Lightning Fast</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Avg. 22 mins</div>
            </div>
          </div>

          {/* Phone Device Frame */}
          <div className="phone-device-frame">
            <div className="phone-notch" />

            <div className="phone-screen-ui">
              {/* Phone Header */}
              <div className="phone-header-row">
                <div>
                  <span style={{ fontSize: '0.68rem', color: 'var(--text-secondary)' }}>Delivering To</span>
                  <div className="phone-user-greeting">Main St, Apt 4B</div>
                </div>
                <div className="phone-avatar-dot">JS</div>
              </div>

              {/* Live Tracking Card */}
              <div className="phone-order-live-card">
                <img
                  src="/images/pasta.png"
                  alt="Order item"
                  className="phone-order-img"
                />
                <div className="phone-order-info">
                  <div className="phone-order-name">Creamy Tagliatelle</div>
                  <div className="phone-order-status">On the way • 8 mins</div>
                </div>
                <Navigation size={16} color="var(--accent)" />
              </div>

              {/* Mini Recommendations */}
              <div className="phone-section-label">
                POPULAR NEAR YOU
              </div>

              <div className="phone-mini-dishes">
                <div className="phone-dish-item">
                  <img src="/images/pizza.png" alt="Pizza" className="phone-dish-thumb" />
                  <div className="phone-dish-title">Truffle Pizza</div>
                  <div className="phone-dish-price">$21.50</div>
                </div>

                <div className="phone-dish-item">
                  <img src="/images/burger.png" alt="Burger" className="phone-dish-thumb" />
                  <div className="phone-dish-title">Smokehouse</div>
                  <div className="phone-dish-price">$16.50</div>
                </div>

                <div className="phone-dish-item">
                  <img src="/images/salad.png" alt="Salad" className="phone-dish-thumb" />
                  <div className="phone-dish-title">Power Bowl</div>
                  <div className="phone-dish-price">$14.00</div>
                </div>
              </div>

              {/* Bottom Navigation Mockup */}
              <div className="phone-bottom-nav">
                <div className="phone-nav-item active"><Home size={14} /></div>
                <div className="phone-nav-item"><Compass size={14} /></div>
                <div className="phone-nav-item"><ShoppingBag size={14} /></div>
                <div className="phone-nav-item"><User size={14} /></div>
              </div>
            </div>
          </div>

          {/* Floating Metric 2 */}
          <div className="app-float-badge-right">
            <div className="app-check-circle" style={{ backgroundColor: 'var(--accent-light)', color: 'var(--accent)' }}>
              <Star size={16} fill="currentColor" />
            </div>
            <div>
              <div style={{ fontSize: '0.82rem', fontWeight: 800 }}>4.9 App Rating</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>50k+ Downloads</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppPromo;
