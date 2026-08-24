import React, { useState, useEffect, useRef } from 'react';
import { Star, Sparkles, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { testimonialsData } from '../../data/foodData';
import './Testimonials.css';

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const autoPlayRef = useRef(null);

  // Auto-play every 5 seconds (pauses on hover)
  useEffect(() => {
    if (isPaused) return;

    autoPlayRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonialsData.length);
    }, 5000);

    return () => clearInterval(autoPlayRef.current);
  }, [isPaused]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonialsData.length);
  };

  return (
    <section className="section-wrapper testimonials-master-section" id="testimonials">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge yellow">
            <Sparkles size={14} />
            <span>REVIEWS & PRAISE</span>
          </div>
          <h2 className="section-title">
            What Our Customers <span>Say</span>
          </h2>
          <p className="section-subtitle">
            Read authentic feedback from our community of over 10,000 satisfied food enthusiasts across the city.
          </p>
        </div>

        {/* Interactive Carousel Stage */}
        <div 
          className="testimonials-carousel-stage"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Main Featured Active Card */}
          <div className="testimonials-active-card glass-panel animate-cards-in">
            <div className="quote-badge-bubble">
              <Quote size={22} color="var(--primary)" />
            </div>

            {/* 5-Star Rating */}
            <div className="testimonial-stars-row">
              {[...Array(testimonialsData[activeIndex].rating)].map((_, i) => (
                <Star key={i} size={18} fill="#F5C85B" color="#F5C85B" />
              ))}
            </div>

            {/* Quote Body */}
            <p className="testimonial-quote-body">
              "{testimonialsData[activeIndex].quote}"
            </p>

            {/* Author Meta */}
            <div className="testimonial-author-row">
              <img
                src={testimonialsData[activeIndex].avatar}
                alt={testimonialsData[activeIndex].name}
                className="testimonial-avatar"
                loading="lazy"
              />
              <div className="testimonial-author-meta">
                <h3 className="author-name">{testimonialsData[activeIndex].name}</h3>
                <span className="author-role">{testimonialsData[activeIndex].role}</span>
              </div>
            </div>
          </div>

          {/* Carousel Navigation Controls */}
          <div className="testimonials-controls-row">
            <button
              type="button"
              className="carousel-nav-btn"
              onClick={handlePrev}
              aria-label="Previous review"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Dot indicators */}
            <div className="carousel-dots-list">
              {testimonialsData.map((item, idx) => (
                <button
                  key={item.id}
                  type="button"
                  className={`carousel-dot ${activeIndex === idx ? 'is-active' : ''}`}
                  onClick={() => setActiveIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              type="button"
              className="carousel-nav-btn"
              onClick={handleNext}
              aria-label="Next review"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
