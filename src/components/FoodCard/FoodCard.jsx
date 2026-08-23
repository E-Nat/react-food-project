import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Plus, Check } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import './FoodCard.css';

const FoodCard = ({ food, className = '' }) => {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(food);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1200);
  };

  return (
    <article className={`food-card ${className}`}>
      {/* Food Image Container */}
      <Link to={`/menu/${food.id}`} className="food-card-img-link" aria-label={`View ${food.name} details`}>
        <div className="food-card-img-wrap">
          <img
            src={food.image}
            alt={food.name}
            className="food-card-img"
            loading="lazy"
          />
          {food.category && (
            <span className="food-card-cat-badge">{food.category}</span>
          )}
          {food.badge && (
            <span className="food-card-corner-badge">{food.badge}</span>
          )}
        </div>
      </Link>

      {/* Food Card Content */}
      <div className="food-card-body">
        <div className="food-card-rating-row">
          <div className="food-card-stars">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={13}
                fill={i < Math.floor(food.rating) ? 'currentColor' : 'none'}
                strokeWidth={2}
                className="star-icon"
              />
            ))}
          </div>
          <span className="food-card-rating-num">{food.rating?.toFixed(1) || '4.9'}</span>
          {food.reviewsCount && (
            <span className="food-card-reviews">({food.reviewsCount})</span>
          )}
        </div>

        <Link to={`/menu/${food.id}`} className="food-card-title-link">
          <h3 className="food-card-title">{food.name}</h3>
        </Link>

        <p className="food-card-desc">{food.description}</p>

        {/* Price & Action Row */}
        <div className="food-card-footer">
          <div className="food-card-price-wrap">
            <span className="food-card-price-currency">$</span>
            <span className="food-card-price-amount">{food.price?.toFixed(2)}</span>
          </div>

          <button
            type="button"
            className={`food-card-add-btn ${isAdded ? 'added' : ''}`}
            onClick={handleAdd}
            aria-label={`Add ${food.name} to cart`}
            title={`Add ${food.name} to cart`}
          >
            {isAdded ? (
              <Check size={18} strokeWidth={2.8} />
            ) : (
              <Plus size={18} strokeWidth={2.4} />
            )}
          </button>
        </div>
      </div>
    </article>
  );
};

export default FoodCard;
