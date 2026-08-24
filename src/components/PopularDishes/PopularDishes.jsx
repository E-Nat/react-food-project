import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Flame, ChevronLeft, ChevronRight, Compass } from 'lucide-react';
import FoodCard from '../FoodCard/FoodCard';
import { foods } from '../../data/foodData';
import './PopularDishes.css';

const PopularDishes = () => {
  const [filterCategory, setFilterCategory] = useState('All');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const horizontalTrackRef = useRef(null);

  const filterTabs = ['All', 'Burger', 'Pizza', 'Pasta', 'Salad', 'Seafood', 'Dessert', 'Drinks'];

  const handleCategoryChange = (tab) => {
    if (tab === filterCategory) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setFilterCategory(tab);
      setIsTransitioning(false);
    }, 180);
  };

  const filteredDishes = foods.filter((dish) => {
    if (filterCategory === 'All') return true;
    return dish.category.toLowerCase() === filterCategory.toLowerCase();
  });

  const displayedDishes = filteredDishes.slice(0, 6);

  // Horizontal Food Journey Scroll Handlers
  const scrollJourney = (direction) => {
    if (horizontalTrackRef.current) {
      const scrollAmount = direction === 'left' ? -340 : 340;
      horizontalTrackRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="section-wrapper popular-dishes-section" id="popular">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge yellow">
            <Flame size={14} />
            <span>POPULAR DISHES</span>
          </div>
          <h2 className="section-title">
            Popular <span>Food</span>
          </h2>
          <p className="section-subtitle">
            Our customers' favorite dishes, handcrafted fresh every day with organic ingredients and exceptional culinary care.
          </p>
        </div>

        {/* Interactive Filter Pills */}
        <div className="popular-filter-pills-wrap">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              type="button"
              className={`popular-tab-btn ${filterCategory === tab ? 'is-active' : ''}`}
              onClick={() => handleCategoryChange(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Animated Food Cards Grid */}
        <div className={`popular-dishes-grid ${isTransitioning ? 'is-switching' : 'is-visible'}`}>
          {displayedDishes.map((dish, idx) => (
            <div key={dish.id} className={`grid-card-anim stagger-${(idx % 4) + 1}`}>
              <FoodCard dish={dish} />
            </div>
          ))}
        </div>

        {/* ==============================================================
            Horizontal Food Journey Showcase ("Explore Popular Dishes")
            ============================================================== */}
        <div className="horizontal-journey-wrapper glass-panel">
          <div className="journey-header-bar">
            <div className="journey-title-block">
              <div className="section-badge green">
                <Compass size={14} />
                <span>CULINARY JOURNEY</span>
              </div>
              <h3 className="journey-heading">
                Explore the <span>Flavor Spectrum</span>
              </h3>
              <p className="journey-sub">Scroll horizontally through our handcrafted culinary collection.</p>
            </div>

            {/* Navigation Controls */}
            <div className="journey-nav-controls">
              <button 
                type="button" 
                className="journey-arrow-btn"
                onClick={() => scrollJourney('left')}
                aria-label="Scroll left"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                type="button" 
                className="journey-arrow-btn"
                onClick={() => scrollJourney('right')}
                aria-label="Scroll right"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Horizontal Drag/Scroll Track */}
          <div className="journey-scroll-track" ref={horizontalTrackRef}>
            {foods.map((item) => (
              <div key={`journey-${item.id}`} className="journey-card-item">
                <FoodCard dish={item} />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA to Full Menu */}
        <div className="popular-bottom-cta">
          <Link to="/menu" className="btn-primary popular-explore-btn">
            <span>Explore Full Menu ({foods.length} Dishes)</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PopularDishes;
