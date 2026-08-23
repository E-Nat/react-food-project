import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { foods } from '../../data/foodData';
import FoodCard from '../FoodCard/FoodCard';
import useScrollReveal from '../../hooks/useScrollReveal';
import './PopularDishes.css';

const PopularDishes = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const sectionRef = useScrollReveal();

  const filterCategories = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Desserts', 'Drinks'];

  const filteredDishes = activeFilter === 'All'
    ? foods.slice(0, 8)
    : foods.filter((dish) => dish.filterCategory?.toLowerCase() === activeFilter.toLowerCase()).slice(0, 8);

  return (
    <section className="popular-dishes-section reveal-on-scroll" id="popular-dishes" ref={sectionRef}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-badge">POPULAR CHOICES</span>
          <h2 className="section-title">Popular Dishes</h2>
          <p className="section-subtitle">
            Discover our most loved meals, prepared fresh daily with fine ingredients and rich flavors.
          </p>
        </div>

        {/* Sliding Pill Category Filter Navigation */}
        <div className="filter-nav-wrap">
          <div className="filter-pill-container" role="tablist" aria-label="Dish category filters">
            {filterCategories.map((category) => (
              <button
                key={category}
                type="button"
                className={`filter-nav-btn ${activeFilter === category ? 'active' : ''}`}
                onClick={() => setActiveFilter(category)}
                role="tab"
                aria-selected={activeFilter === category}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Staggered Dishes Grid */}
        <div className="popular-dishes-grid">
          {filteredDishes.map((dish, idx) => (
            <FoodCard
              key={dish.id}
              food={dish}
              className={`popular-card-item delay-${(idx % 4) + 1}`}
            />
          ))}
        </div>

        {/* View All CTA */}
        <div className="popular-bottom-cta">
          <Link to="/menu" className="btn-secondary">
            <span>Explore Complete Menu</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PopularDishes;
