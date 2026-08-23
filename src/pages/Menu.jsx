import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, RotateCcw, UtensilsCrossed, Sparkles } from 'lucide-react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import FoodCard from '../components/FoodCard/FoodCard';
import { foods } from '../data/foodData';
import useScrollReveal from '../hooks/useScrollReveal';
import './Menu.css';

const Menu = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCat = searchParams.get('category') || 'All';

  const [selectedCategory, setSelectedCategory] = useState(initialCat);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular'); // 'popular' | 'price-low' | 'price-high' | 'rating'
  const [dietaryFilter, setDietaryFilter] = useState('All');
  const sectionRef = useScrollReveal();

  const categories = ['All', 'Pizza', 'Pasta', 'Burgers', 'Salads', 'Desserts', 'Drinks'];
  const dietaryOptions = ['All', 'Vegetarian', 'Vegan', 'Gluten-Free', 'Chef Special'];

  useEffect(() => {
    const catFromUrl = searchParams.get('category');
    if (catFromUrl) {
      setSelectedCategory(catFromUrl);
    }
  }, [searchParams]);

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    if (cat === 'All') {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: cat });
    }
  };

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setSortBy('popular');
    setDietaryFilter('All');
    setSearchParams({});
  };

  // Filter & Sort math
  const filteredFoods = foods
    .filter((dish) => {
      const matchesCat =
        selectedCategory === 'All' ||
        dish.category.toLowerCase() === selectedCategory.toLowerCase() ||
        dish.filterCategory?.toLowerCase() === selectedCategory.toLowerCase();

      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        dish.name.toLowerCase().includes(query) ||
        dish.description.toLowerCase().includes(query) ||
        dish.category.toLowerCase().includes(query) ||
        dish.ingredients?.some((i) => i.toLowerCase().includes(query));

      const matchesDietary =
        dietaryFilter === 'All' ||
        dish.dietary?.some((d) => d.toLowerCase().includes(dietaryFilter.toLowerCase())) ||
        (dietaryFilter === 'Chef Special' && dish.badge?.toLowerCase().includes('chef'));

      return matchesCat && matchesSearch && matchesDietary;
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return b.isPopular ? 1 : -1;
    });

  return (
    <div className="page-wrapper menu-page">
      <Navbar />
      <main>
        {/* Menu Hero Header */}
        <section className="menu-hero-header">
          <div className="container">
            <div className="menu-header-inner">
              <span className="section-badge">ARTISAN DINING</span>
              <h1 className="menu-main-title">Our Handcrafted Menu</h1>
              <p className="menu-main-subtitle">
                Explore our full culinary collection, cooked to order with daily farm-fresh organic ingredients.
              </p>
            </div>
          </div>
        </section>

        {/* Filter & Controls Bar */}
        <section className="menu-controls-section">
          <div className="container">
            <div className="menu-controls-bar">
              {/* Live Search Input */}
              <div className="menu-search-box">
                <Search size={18} className="menu-search-icon" />
                <input
                  type="text"
                  placeholder="Search dishes, ingredients, tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="menu-search-input"
                />
                {searchQuery && (
                  <button
                    type="button"
                    className="menu-search-clear"
                    onClick={() => setSearchQuery('')}
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Sort Dropdown */}
              <div className="menu-sort-box">
                <SlidersHorizontal size={16} className="menu-sort-icon" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="menu-sort-select"
                >
                  <option value="popular">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Category Filter Tabs */}
            <div className="menu-category-tabs-wrap">
              <div className="menu-category-tabs">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    className={`menu-cat-btn ${selectedCategory.toLowerCase() === cat.toLowerCase() ? 'active' : ''}`}
                    onClick={() => handleCategoryChange(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Dietary Tags */}
            <div className="menu-dietary-row">
              <span className="dietary-label">Dietary:</span>
              <div className="dietary-pills-list">
                {dietaryOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    className={`dietary-pill ${dietaryFilter === opt ? 'active' : ''}`}
                    onClick={() => setDietaryFilter(opt)}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Dishes Grid & Results */}
        <section className="menu-dishes-section reveal-on-scroll" ref={sectionRef}>
          <div className="container">
            <div className="menu-results-count">
              <span>Showing <strong>{filteredFoods.length}</strong> delicious items</span>
              {(selectedCategory !== 'All' || searchQuery || dietaryFilter !== 'All' || sortBy !== 'popular') && (
                <button
                  type="button"
                  className="btn-reset-filters"
                  onClick={handleResetFilters}
                >
                  <RotateCcw size={14} />
                  <span>Reset Filters</span>
                </button>
              )}
            </div>

            {filteredFoods.length > 0 ? (
              <div className="menu-grid">
                {filteredFoods.map((dish, idx) => (
                  <FoodCard
                    key={dish.id}
                    food={dish}
                    className={`menu-card-item delay-${(idx % 4) + 1}`}
                  />
                ))}
              </div>
            ) : (
              <div className="menu-no-results">
                <div className="no-results-icon-wrap">
                  <UtensilsCrossed size={36} />
                </div>
                <h3>No dishes found</h3>
                <p>We couldn't find any dishes matching your current search or filters.</p>
                <button type="button" className="btn-primary" onClick={handleResetFilters}>
                  <span>Reset All Filters</span>
                </button>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Menu;
