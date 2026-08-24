import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Tag, Gift, Flame, Copy, Check } from 'lucide-react';
import { specialOfferData } from '../../data/foodData';
import { MagneticButton } from '../animation/MagneticButton';
import './SpecialOffers.css';

const SpecialOffers = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(specialOfferData.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="section-wrapper special-offers-section" id="offers">
      <div className="container">
        <motion.div 
          className="offers-banner-card glass-panel"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Ambient Decorative Shapes */}
          <div className="offers-ambient-blob-1" aria-hidden="true" />
          <div className="offers-ambient-blob-2" aria-hidden="true" />

          <div className="offers-grid-layout">
            {/* Left Content Column */}
            <div className="offers-text-col">
              <motion.div 
                className="offers-tag-badge"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Tag size={15} />
                <span>{specialOfferData.tag}</span>
              </motion.div>

              <motion.div 
                className="offers-discount-pill"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Flame size={20} color="#FF7650" />
                <span className="discount-number">{specialOfferData.discount}</span>
                <span className="discount-label">INSTANT DISCOUNT</span>
              </motion.div>

              <motion.h2 
                className="offers-headline"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                {specialOfferData.title} <br />
                <span>{specialOfferData.subtitle}</span>
              </motion.h2>

              <motion.p 
                className="offers-description"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.4 }}
              >
                {specialOfferData.description}
              </motion.p>

              {/* Promo Code Box with Copy Interaction */}
              <motion.div 
                className="promo-code-bar"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.5 }}
                onClick={handleCopyCode}
                title="Click to copy code"
              >
                <div className="code-label">Use Code:</div>
                <div className="code-badge">
                  <span>{specialOfferData.code}</span>
                  {copied ? <Check size={14} color="var(--green)" /> : <Copy size={14} />}
                </div>
                <span className="code-validity">{copied ? 'Copied to clipboard!' : specialOfferData.validUntil}</span>
              </motion.div>

              {/* Order Button */}
              <motion.div 
                className="offers-btn-row"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.6 }}
              >
                <MagneticButton strength={0.25}>
                  <Link to="/menu" className="btn-primary offers-cta-btn">
                    <span>Order Now with 20% OFF</span>
                    <ArrowRight size={18} />
                  </Link>
                </MagneticButton>
              </motion.div>
            </div>

            {/* Right Visual Stage */}
            <div className="offers-visual-col">
              <div className="offers-image-stage">
                <div className="offers-stage-ring" />
                <motion.img
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.85, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  src="/images/hero-food.png"
                  alt="Delicious special offer meal"
                  className="offers-dish-image animate-float"
                  loading="lazy"
                />

                {/* Floating Discount Badge */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8, x: 20 }}
                  whileInView={{ opacity: 1, scale: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.5 }}
                  className="floating-discount-glass-card glass-card animate-float-reverse"
                >
                  <Gift size={20} color="var(--primary)" />
                  <div className="discount-glass-text">
                    <strong>Save 20% Today</strong>
                    <span>Applied at checkout</span>
                  </div>
                </motion.div>

                {/* Floating Food Elements */}
                <span className="offers-floating-icon icon-1" aria-hidden="true">🥑</span>
                <span className="offers-floating-icon icon-2" aria-hidden="true">🍕</span>
                <span className="offers-floating-icon icon-3" aria-hidden="true">🥗</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SpecialOffers;
