import React, { useState } from 'react';
import { Send, CheckCircle2, Mail, Sparkles } from 'lucide-react';
import useScrollReveal from '../../hooks/useScrollReveal';
import './Newsletter.css';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const sectionRef = useScrollReveal();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setTimeout(() => {
        setEmail('');
        setSubmitted(false);
      }, 4500);
    }
  };

  return (
    <section className="newsletter-section reveal-on-scroll" id="newsletter" ref={sectionRef}>
      <div className="container">
        <div className="newsletter-box">
          <div className="newsletter-glow" aria-hidden="true" />

          <div className="newsletter-inner">
            <div className="newsletter-icon-badge">
              <Sparkles size={16} />
              <span>JOIN THE FOOD CLUB</span>
            </div>

            <h2 className="newsletter-title">
              Stay Updated With Deliciousness
            </h2>

            <p className="newsletter-subtitle">
              Get special member offers, seasonal menu releases, and restaurant updates delivered directly to your inbox.
            </p>

            {submitted ? (
              <div className="newsletter-success">
                <CheckCircle2 size={22} strokeWidth={2.4} />
                <span>You're in! Check your inbox soon for your 15% welcome treat.</span>
              </div>
            ) : (
              <form className="newsletter-form" onSubmit={handleSubmit}>
                <div className="newsletter-input-wrap">
                  <Mail size={18} className="newsletter-mail-icon" />
                  <input
                    type="email"
                    className="newsletter-input"
                    placeholder="Enter your email address..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn-subscribe">
                  <span>Subscribe</span>
                  <Send size={16} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
