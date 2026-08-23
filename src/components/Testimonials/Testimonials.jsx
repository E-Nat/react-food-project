import React from 'react';
import { Star, Quote } from 'lucide-react';
import { testimonials } from '../../data/foodData';
import useScrollReveal from '../../hooks/useScrollReveal';
import './Testimonials.css';

const Testimonials = () => {
  const sectionRef = useScrollReveal();

  return (
    <section className="testimonials-section reveal-on-scroll" id="testimonials" ref={sectionRef}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-badge green">COMMUNITY LOVE</span>
          <h2 className="section-title">What Our Customers Say</h2>
          <p className="section-subtitle">
            Real stories from our food lovers across the city who enjoy our handcrafted dishes daily.
          </p>
        </div>

        {/* 3 Testimonials Grid */}
        <div className="testimonials-grid">
          {testimonials.map((t, idx) => (
            <div key={t.id} className={`testimonial-card delay-${idx + 1}`}>
              {/* Quote Icon */}
              <div className="testimonial-quote-icon">
                <Quote size={20} />
              </div>

              {/* Star Rating */}
              <div className="testimonial-rating-row">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} size={15} fill="#F5A623" color="#F5A623" />
                ))}
              </div>

              {/* Review Text */}
              <p className="testimonial-quote">"{t.review}"</p>

              {/* Customer Author */}
              <div className="testimonial-author-row">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="author-avatar"
                  loading="lazy"
                />
                <div>
                  <h3 className="author-name">{t.name}</h3>
                  <div className="author-role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
