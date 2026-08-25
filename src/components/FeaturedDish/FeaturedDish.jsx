import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Star, 
  ShoppingBag, 
  Check, 
  Clock, 
  Flame, 
  CheckCircle2,
  ChefHat
} from 'lucide-react';
import { featuredChefDish } from '../../data/foodData';
import { useCart } from '../../context/CartContext';
import { MagneticButton } from '../animation/MagneticButton';
import './FeaturedDish.css';

const FeaturedDish = () => {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleOrderFeatured = () => {
    addToCart(
      {
        id: featuredChefDish.id,
        name: featuredChefDish.name,
        category: 'Pasta',
        price: featuredChefDish.price,
        image: featuredChefDish.image,
        description: featuredChefDish.description,
      },
      1
    );
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1600);
  };

  return (
    <section className="section-wrapper featured-dish-master-section" id="featured">
      <div className="container">
        <motion.div 
          className="featured-dish-glass-stage glass-panel"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Ambient stage glow */}
          <div className="featured-ambient-glow" aria-hidden="true" />

          <div className="featured-dish-grid">
            {/* Left Column: Food Visual & Floating Details */}
            <div className="featured-visual-col">
              <div className="featured-dish-circle-wrap">
                <div className="featured-halo-ring animate-rotate" />
                <motion.img
                  initial={{ opacity: 0, scale: 0.85, x: -40 }}
                  whileInView={{ opacity: 1, scale: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  src={featuredChefDish.image}
                  alt={featuredChefDish.name}
                  className="featured-dish-image animate-float"
                  loading="lazy"
                />
                {/* Floating Botanicals */}
                <span className="featured-floating-leaf item-1">🌿</span>
                <span className="featured-floating-leaf item-2">🍄</span>
                <span className="featured-floating-leaf item-3">🧀</span>
              </div>
            </div>

            {/* Right Column: Glass Information & Order Card */}
            <div className="featured-info-col">
              <motion.div 
                className="featured-header-badge"
                initial={{ opacity: 0, scale: 0.8, x: 30 }}
                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 }}
              >
                <ChefHat size={16} />
                <span>{featuredChefDish.tag}</span>
              </motion.div>

              <motion.h2 
                className="featured-dish-title"
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.25 }}
              >
                {featuredChefDish.name}
              </motion.h2>

              <motion.p 
                className="featured-dish-desc"
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.35 }}
              >
                {featuredChefDish.description}
              </motion.p>

              {/* Rating & Prep stats */}
              <motion.div 
                className="featured-stats-row"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.45 }}
              >
                <div className="featured-stat-item">
                  <div className="stars-cluster">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={15} fill="#F5C84B" color="#F5C84B" />
                    ))}
                  </div>
                  <strong>{featuredChefDish.rating}</strong>
                  <span>({featuredChefDish.reviewsCount} reviews)</span>
                </div>

                <div className="featured-stat-divider" />

                <div className="featured-stat-item">
                  <Clock size={16} color="var(--primary)" />
                  <strong>{featuredChefDish.prepTime}</strong>
                </div>

                <div className="featured-stat-divider" />

                <div className="featured-stat-item">
                  <Flame size={16} color="var(--primary)" />
                  <strong>{featuredChefDish.calories}</strong>
                </div>
              </motion.div>

              {/* Dish Highlights */}
              <motion.div 
                className="featured-highlights-list"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.55 }}
              >
                {featuredChefDish.highlights.map((item, idx) => (
                  <div key={idx} className="highlight-row">
                    <CheckCircle2 size={16} color="var(--green)" />
                    <span>{item}</span>
                  </div>
                ))}
              </motion.div>

              {/* Price & Order Action */}
              <motion.div 
                className="featured-action-bar"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.65 }}
              >
                <div className="featured-pricing-block">
                  <span className="featured-price-current">
                    ${Number(featuredChefDish.price).toFixed(2)}
                  </span>
                  {featuredChefDish.originalPrice && (
                    <span className="featured-price-original">
                      ${Number(featuredChefDish.originalPrice).toFixed(2)}
                    </span>
                  )}
                </div>

                <MagneticButton strength={0.25}>
                  <button
                    type="button"
                    className={`btn-primary featured-order-btn ${isAdded ? 'is-success' : ''}`}
                    onClick={handleOrderFeatured}
                  >
                    {isAdded ? (
                      <>
                        <Check size={18} />
                        <span>Added to Cart!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag size={18} />
                        <span>Order Now</span>
                      </>
                    )}
                  </button>
                </MagneticButton>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedDish;
