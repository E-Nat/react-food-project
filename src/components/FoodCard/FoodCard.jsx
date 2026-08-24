import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Heart, Plus, Check, Clock, ArrowRight, Loader2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import './FoodCard.css';

const FoodCard = ({ dish, food, className = '' }) => {
  const currentDish = dish || food;
  const { addToCart } = useCart();
  const [isLiked, setIsLiked] = useState(false);
  const [btnState, setBtnState] = useState('idle'); // 'idle' | 'adding' | 'added'

  if (!currentDish) return null;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (btnState !== 'idle') return;

    setBtnState('adding');
    setTimeout(() => {
      addToCart(currentDish, 1);
      setBtnState('added');
      setTimeout(() => setBtnState('idle'), 1800);
    }, 350);
  };

  const handleToggleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const colorClass = currentDish.colorTheme ? `bg-soft-${currentDish.colorTheme}` : 'bg-soft-cream';

  return (
    <motion.div 
      whileHover={{ y: -9 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={`food-card-root ${className}`}
    >
      {/* Top Food Visual Stage */}
      <div className={`food-card-media-wrap ${colorClass}`}>
        {/* Top Badges */}
        <div className="card-top-badges">
          {currentDish.badge && (
            <span className="card-dish-badge">{currentDish.badge}</span>
          )}
          <button
            type="button"
            className={`card-heart-btn ${isLiked ? 'is-liked' : ''}`}
            onClick={handleToggleLike}
            aria-label="Save to favorites"
          >
            <Heart size={16} fill={isLiked ? '#EFA7A5' : 'none'} color={isLiked ? '#EFA7A5' : 'currentColor'} />
          </button>
        </div>

        {/* Dish Image with link to detail */}
        <Link to={`/menu/${currentDish.id}`} className="food-image-link" aria-label={currentDish.name}>
          <img
            src={currentDish.image}
            alt={currentDish.name}
            className="food-dish-img"
            loading="lazy"
          />
        </Link>

        {/* Quick meta pills */}
        {currentDish.prepTime && (
          <div className="card-quick-pill">
            <Clock size={12} />
            <span>{currentDish.prepTime}</span>
          </div>
        )}
      </div>

      {/* Card Body Details */}
      <div className="food-card-body">
        <div className="card-category-row">
          <span className="card-category-name">{currentDish.category}</span>
          <div className="card-rating-badge">
            <Star size={13} fill="#F5C84B" color="#F5C84B" />
            <span>{currentDish.rating}</span>
            {currentDish.reviewsCount && <small>({currentDish.reviewsCount})</small>}
          </div>
        </div>

        <Link to={`/menu/${currentDish.id}`} className="card-title-link">
          <h3 className="card-food-title">{currentDish.name}</h3>
        </Link>

        <p className="card-food-desc">{currentDish.description}</p>

        {/* Card Footer: Price & Interactive Add to Cart */}
        <div className="card-footer-row">
          <div className="card-price-stack">
            <span className="price-label">Price</span>
            <span className="price-value">${Number(currentDish.price).toFixed(2)}</span>
          </div>

          <button
            type="button"
            className={`card-add-btn ${btnState === 'added' ? 'is-success' : ''} ${btnState === 'adding' ? 'is-loading' : ''}`}
            onClick={handleAddToCart}
            aria-label={`Add ${currentDish.name} to cart`}
            disabled={btnState === 'adding'}
          >
            {btnState === 'adding' ? (
              <>
                <Loader2 size={15} className="animate-spin" />
                <span className="btn-label">Adding...</span>
              </>
            ) : btnState === 'added' ? (
              <>
                <Check size={16} className="btn-check-icon" />
                <span className="btn-label">✓ Added</span>
              </>
            ) : (
              <>
                <Plus size={16} className="btn-plus-icon" />
                <span className="btn-label default-label">Add</span>
                <span className="btn-label hover-label">Add to Cart</span>
                <ArrowRight size={13} className="btn-arrow-icon" />
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default FoodCard;
