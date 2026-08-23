import React, { useState } from 'react';
import { ArrowRight, Check, Award, Sparkles, Flame, Leaf, CheckCircle2 } from 'lucide-react';
import { featuredChefSpecial } from '../../data/foodData';
import { useCart } from '../../context/CartContext';
import useScrollReveal from '../../hooks/useScrollReveal';
import './FeaturedDish.css';

const FeaturedDish = () => {
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const sectionRef = useScrollReveal();

  const handleOrderSpecial = () => {
    addToCart({
      id: featuredChefSpecial.id,
      name: featuredChefSpecial.dishName,
      price: featuredChefSpecial.price,
      image: featuredChefSpecial.image,
      category: "Chef's Special",
      description: featuredChefSpecial.description,
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1400);
  };

  return (
    <section className="featured-dish-section reveal-on-scroll" id="featured" ref={sectionRef}>
      <div className="container featured-dish-grid">
        {/* Left Column: Visual Presentation with Signature Interactive Hover */}
        <div 
          className="featured-visual-box"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Decorative backdrop shapes */}
          <div className="featured-backdrop-shape" aria-hidden="true" />
          <div className="featured-accent-glow" aria-hidden="true" />
          
          <div className="featured-chef-badge">
            <span className="badge-green-dot" />
            <span>Chef's Limited Creation</span>
          </div>

          <div className="featured-image-container">
            <img
              src={featuredChefSpecial.image}
              alt={featuredChefSpecial.dishName}
              className={`featured-dish-img ${isHovered ? 'scale-up' : ''}`}
              loading="lazy"
            />

            {/* Signature Interactive Ingredient Layer (revealed smoothly on hover) */}
            <div className={`ingredient-interactive-layer ${isHovered ? 'visible' : ''}`}>
              <div className="ingredient-tag tag-top">
                <Leaf size={13} color="var(--green)" />
                <span>Wild Fresh Herbs</span>
              </div>
              <div className="ingredient-tag tag-bottom">
                <Sparkles size={13} color="var(--accent)" />
                <span>Saffron Herb Risotto</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Editorial Copy */}
        <div className="featured-info-box">
          <div className="featured-tag">
            <Award size={14} />
            <span>{featuredChefSpecial.tag}</span>
          </div>

          <h2 className="featured-title">{featuredChefSpecial.name}</h2>

          <p className="featured-desc">{featuredChefSpecial.description}</p>

          {/* Highlights */}
          <ul className="featured-highlights-list">
            {featuredChefSpecial.highlights.map((item, index) => (
              <li key={index} className="highlight-item">
                <div className="highlight-icon-circle">
                  <Check size={14} strokeWidth={2.6} />
                </div>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          {/* Price & CTA Button */}
          <div className="featured-pricing-row">
            <div className="featured-price-block">
              <span className="featured-current-price">
                ${featuredChefSpecial.price.toFixed(2)}
              </span>
              <span className="featured-orig-price">
                ${featuredChefSpecial.originalPrice.toFixed(2)}
              </span>
            </div>

            <button 
              type="button"
              className={`btn-primary ${isAdded ? 'special-added' : ''}`} 
              onClick={handleOrderSpecial}
            >
              {isAdded ? (
                <>
                  <span>Added to Cart!</span>
                  <CheckCircle2 size={18} />
                </>
              ) : (
                <>
                  <span>Try It Now</span>
                  <ArrowRight size={18} strokeWidth={2.5} />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedDish;
