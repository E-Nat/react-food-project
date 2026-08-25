import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Star, 
  Clock, 
  Flame, 
  ShieldCheck, 
  Plus, 
  Minus, 
  ShoppingBag, 
  CheckCircle2, 
  Sparkles,
  ChevronRight,
  Heart,
  Truck,
  Leaf
} from 'lucide-react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import FoodCard from '../components/FoodCard/FoodCard';
import { getFoodById } from '../services/api';
import { foods } from '../data/foodData';
import { useCart } from '../context/CartContext';
import './FoodDetail.css';

const FoodDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [dish, setDish] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setLoading(true);
    getFoodById(id)
      .then((data) => {
        setDish(data);
        setQuantity(1);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    if (!dish) return;
    addToCart(dish, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const relatedDishes = dish
    ? foods.filter((f) => f.id !== dish.id && (f.category === dish.category || f.isPopular)).slice(0, 4)
    : [];

  if (loading) {
    return (
      <div className="page-wrapper">
        <Navbar />
        <main className="detail-loading-state">
          <div className="loading-spinner" />
          <p>Preparing culinary dish details...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!dish) {
    return (
      <div className="page-wrapper">
        <Navbar />
        <main className="detail-error-state">
          <div className="container">
            <h2>Dish Not Found</h2>
            <p>The requested food item does not exist or has rotated out of our seasonal menu.</p>
            <Link to="/menu" className="btn-primary">
              <ArrowLeft size={16} />
              <span>Back to Menu</span>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const totalPrice = (dish.price * quantity).toFixed(2);

  return (
    <div className="page-wrapper food-detail-page">
      <Navbar />
      <main>
        {/* Breadcrumb Bar */}
        <div className="detail-breadcrumb-bar">
          <div className="container">
            <nav className="breadcrumb-nav" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <ChevronRight size={14} />
              <Link to="/menu">Menu</Link>
              <ChevronRight size={14} />
              <span className="breadcrumb-current">{dish.name}</span>
            </nav>
          </div>
        </div>

        {/* Main Product Showcase Section */}
        <section className="food-showcase-section">
          <div className="container showcase-grid">
            {/* Left Column: Big Image & Visual Badges */}
            <div className="showcase-visual-col">
              <div className="showcase-img-stage">
                <div className="showcase-bg-blob" aria-hidden="true" />
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="showcase-main-img"
                />

                {/* Favorite Heart Toggle Button */}
                <button
                  type="button"
                  className={`detail-heart-btn ${isFavorite ? 'active' : ''}`}
                  onClick={() => setIsFavorite(!isFavorite)}
                  aria-label={isFavorite ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                  <Heart
                    size={20}
                    fill={isFavorite ? 'var(--accent)' : 'none'}
                    color={isFavorite ? 'var(--accent)' : 'var(--text-secondary)'}
                  />
                </button>
              </div>

              {/* Nutrition & Quick Facts Pills */}
              <div className="showcase-facts-row">
                {dish.prepTime && (
                  <div className="fact-item-card">
                    <Clock size={18} className="fact-icon" />
                    <div>
                      <span className="fact-label">Prep Time</span>
                      <span className="fact-val">{dish.prepTime}</span>
                    </div>
                  </div>
                )}

                {dish.calories && (
                  <div className="fact-item-card">
                    <Flame size={18} className="fact-icon" />
                    <div>
                      <span className="fact-label">Calories</span>
                      <span className="fact-val">{dish.calories}</span>
                    </div>
                  </div>
                )}

                <div className="fact-item-card">
                  <Leaf size={18} className="fact-icon green" />
                  <div>
                    <span className="fact-label">Ingredients</span>
                    <span className="fact-val">100% Organic</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Title, Rating, Desc, Ingredients, Actions */}
            <div className="showcase-info-col">
              <div className="showcase-badge-row">
                <span className="detail-category-badge">{dish.category || 'Specialty'}</span>
                {dish.badge && (
                  <span className="detail-corner-badge">{dish.badge}</span>
                )}
              </div>

              <h1 className="showcase-title">{dish.name}</h1>

              {/* Rating & Reviews */}
              <div className="showcase-rating-row">
                <div className="showcase-stars">
                  <Star size={16} fill="#F5A623" color="#F5A623" />
                </div>
                <strong className="rating-bold">{dish.rating?.toFixed(1) || '4.9'}</strong>
                <span className="rating-sub">({dish.reviewsCount || 250}+ verified foodie reviews)</span>
              </div>

              {/* Price Row */}
              <div className="showcase-price-row">
                <span className="showcase-price-amount">${dish.price?.toFixed(2)}</span>
                <span className="showcase-price-note">Tax included • Cooked fresh to order</span>
              </div>

              {/* Description */}
              <p className="showcase-description">
                {dish.longDescription || dish.description}
              </p>

              {/* Dietary Tags */}
              {dish.dietary && dish.dietary.length > 0 && (
                <div className="showcase-dietary-group">
                  <span className="dietary-title">Dietary Highlights:</span>
                  <div className="dietary-badges-wrap">
                    {dish.dietary.map((tag) => (
                      <span key={tag} className="dietary-tag-badge">
                        <Sparkles size={12} />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Nutrition Soft Chips */}
              <div className="showcase-nutrition-section">
                <h3 className="nutrition-heading">Nutrition Facts:</h3>
                <div className="nutrition-chips-grid">
                  <div className="nutrition-chip chip-yellow">
                    <span className="nutrition-val">{dish.nutrition?.calories || dish.calories || '520 kcal'}</span>
                    <span className="nutrition-lbl">Calories</span>
                  </div>
                  <div className="nutrition-chip chip-green">
                    <span className="nutrition-val">{dish.nutrition?.protein || '28g'}</span>
                    <span className="nutrition-lbl">Protein</span>
                  </div>
                  <div className="nutrition-chip chip-pink">
                    <span className="nutrition-val">{dish.nutrition?.fat || '16g'}</span>
                    <span className="nutrition-lbl">Healthy Fats</span>
                  </div>
                  <div className="nutrition-chip chip-cream">
                    <span className="nutrition-val">{dish.nutrition?.carbs || '42g'}</span>
                    <span className="nutrition-lbl">Carbs</span>
                  </div>
                </div>
              </div>

              {/* Ingredients List */}
              {dish.ingredients && (
                <div className="showcase-ingredients-section">
                  <h3 className="ingredients-heading">Fresh Key Ingredients:</h3>
                  <div className="ingredients-chips-grid">
                    {dish.ingredients.map((ing, i) => (
                      <div key={i} className="ingredient-chip">
                        <span className="ingredient-bullet" />
                        <span>{ing}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}


              {/* Add to Cart Actions */}
              <div className="showcase-action-bar">
                <div className="detail-qty-picker">
                  <button
                    type="button"
                    className="qty-picker-btn"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                  >
                    <Minus size={15} />
                  </button>
                  <span className="qty-picker-num">{quantity}</span>
                  <button
                    type="button"
                    className="qty-picker-btn"
                    onClick={() => setQuantity((q) => q + 1)}
                    aria-label="Increase quantity"
                  >
                    <Plus size={15} />
                  </button>
                </div>

                <button
                  type="button"
                  className={`btn-primary detail-add-cart-btn ${isAdded ? 'added' : ''}`}
                  onClick={handleAddToCart}
                >
                  {isAdded ? (
                    <>
                      <CheckCircle2 size={18} />
                      <span>Added to Order!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={18} />
                      <span>Add to Cart • ${totalPrice}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Delivery Guarantee Pill */}
              <div className="showcase-guarantee-row">
                <div className="guarantee-item">
                  <Truck size={16} className="guarantee-icon" />
                  <span>Free delivery on orders over $35</span>
                </div>
                <div className="guarantee-item">
                  <ShieldCheck size={16} className="guarantee-icon" />
                  <span>100% Satisfaction Guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Dishes */}
        {relatedDishes.length > 0 && (
          <section className="related-dishes-section">
            <div className="container">
              <div className="related-section-header">
                <div>
                  <span className="section-badge">YOU MIGHT ALSO LOVE</span>
                  <h2 className="related-title">
                    Complementary <span className="serif-accent">Dishes</span>
                  </h2>
                </div>
                <Link to="/menu" className="related-view-all">
                  <span>View All Menu</span>
                  <ChevronRight size={16} />
                </Link>
              </div>

              <div className="related-dishes-grid">
                {relatedDishes.map((item) => (
                  <FoodCard key={item.id} food={item} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default FoodDetail;
