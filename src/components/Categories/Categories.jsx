import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { foodCategories } from '../../data/foodData';
import useScrollReveal from '../../hooks/useScrollReveal';
import './Categories.css';

const Categories = () => {
  const sectionRef = useScrollReveal();

  return (
    <section className="categories-section reveal-on-scroll" id="categories" ref={sectionRef}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-badge green">VARIETY & TASTE</span>
          <h2 className="section-title">Explore Categories</h2>
          <p className="section-subtitle">
            Browse through our freshly curated culinary collections crafted daily by our master chefs.
          </p>
        </div>

        {/* 6 Category Items Grid */}
        <div className="categories-grid">
          {foodCategories.map((cat, idx) => (
            <Link
              key={cat.id}
              to={`/menu?category=${encodeURIComponent(cat.shortName)}`}
              className={`category-card delay-${(idx % 4) + 1}`}
            >
              <div className="category-thumb-wrap">
                <div className="category-thumb-bg" aria-hidden="true" />
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="category-img"
                  loading="lazy"
                />
              </div>

              <div className="category-info">
                <h3 className="category-name">{cat.shortName}</h3>
                <span className="category-count">{cat.itemsCount} Specialties</span>
                <span className="category-link-arrow">
                  <span>Explore</span>
                  <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
