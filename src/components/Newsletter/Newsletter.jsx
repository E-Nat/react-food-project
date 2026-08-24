import React, { useState } from 'react';
import { Sparkles, Mail, ArrowRight, Check, ShieldCheck } from 'lucide-react';
import './Newsletter.css';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setIsSubscribed(false);
      }, 3500);
    }
  };

  return (
    <section className="section-wrapper newsletter-master-section" id="newsletter">
      <div className="container">
        <div className="newsletter-banner-box glass-panel">
          {/* Ambient Glows */}
          <div className="newsletter-blob-left" aria-hidden="true" />
          <div className="newsletter-blob-right" aria-hidden="true" />

          <div className="newsletter-inner-content">
            <div className="newsletter-badge">
              <Sparkles size={14} />
              <span>JOIN OUR COMMUNITY</span>
            </div>

            <h2 className="newsletter-headline">
              Stay Close To <span>Good Food.</span>
            </h2>

            <p className="newsletter-subtext">
              Get delicious updates, weekly 20% chef discounts, and secret seasonal dishes delivered straight to your inbox.
            </p>

            {/* Email Subscribe Form */}
            <form className="newsletter-form glass-card" onSubmit={handleSubmit}>
              <Mail size={18} className="mail-icon" />
              <input
                type="email"
                placeholder="Enter your email address..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="newsletter-input"
              />
              <button
                type="submit"
                className={`btn-primary newsletter-submit-btn ${isSubscribed ? 'is-success' : ''}`}
              >
                {isSubscribed ? (
                  <>
                    <Check size={18} />
                    <span>You're subscribed! 🎉</span>
                  </>
                ) : (
                  <>
                    <span>Subscribe</span>
                    <ArrowRight size={16} className="btn-arrow" />
                  </>
                )}
              </button>
            </form>

            <div className="newsletter-trust-note">
              <ShieldCheck size={15} color="var(--green)" />
              <span>No spam ever. Unsubscribe at any time with 1 click.</span>
            </div>

            {/* Floating Decorative Elements */}
            <span className="newsletter-floating-item item-1" aria-hidden="true">🍕</span>
            <span className="newsletter-floating-item item-2" aria-hidden="true">🥑</span>
            <span className="newsletter-floating-item item-3" aria-hidden="true">🍹</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
