import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import { foodCategories } from '../../data/foodData';
import './Categories.css';

const Categories = ({ onSelectCategory, activeCategory = 'All' }) => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    if (onSelectCategory) {
      onSelectCategory(category.shortName);
    } else {
      navigate(`/menu?category=${encodeURIComponent(category.shortName)}`);
    }
  };

  return (
    <section className="section-wrapper categories-master-section" id="categories">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge green">
            <Sparkles size={14} />
            <span>CATEGORIES</span>
          </div>
          <h2 className="section-title">
            Explore Our <span>Menu</span>
          </h2>
          <p className="section-subtitle">
            Discover something delicious for every mood, from crispy stone-baked pizzas to fresh organic salad bowls.
          </p>
        </div>

        {/* Categories Carousel / Grid */}
        <div className="categories-scroll-wrapper">
          <div className="categories-track">
            {foodCategories.map((cat) => {
              const isActive = activeCategory.toLowerCase() === cat.shortName.toLowerCase();
              return (
                <button
                  key={cat.id}
                  type="button"
                  className={`category-item-card bg-soft-${cat.colorTheme} ${isActive ? 'is-active' : ''}`}
                  onClick={() => handleCategoryClick(cat)}
                  aria-label={`View ${cat.name}`}
                >
                  <div className="category-image-wrap">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="category-food-img"
                      loading="lazy"
                    />
                  </div>
                  <div className="category-meta">
                    <h3 className="category-name">{cat.shortName}</h3>
                    <span className="category-count">{cat.itemsCount}+ items</span>
                  </div>
                  <div className="category-arrow-indicator">
                    <ArrowRight size={14} />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categories;
