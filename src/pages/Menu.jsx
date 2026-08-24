import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, RotateCcw, UtensilsCrossed, Sparkles } from 'lucide-react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import FoodCard from '../components/FoodCard/FoodCard';
import { foods } from '../data/foodData';
import { Reveal } from '../components/animation/Reveal';
import { StaggerContainer, StaggerItem } from '../components/animation/StaggerContainer';
import './Menu.css';

const Menu = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCat = searchParams.get('category') || 'All';
  const initialSearch = searchParams.get('search') || '';

  const [selectedCategory, setSelectedCategory] = useState(initialCat);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [sortBy, setSortBy] = useState('popular');
  const [dietaryFilter, setDietaryFilter] = useState('All');

  const categories = [
    { name: 'All', icon: '✨' },
    { name: 'Pizza', icon: '🍕' },
    { name: 'Pasta', icon: '🍝' },
    { name: 'Burger', icon: '🍔' },
    { name: 'Salad', icon: '🥗' },
    { name: 'Seafood', icon: '🦐' },
    { name: 'Dessert', icon: '🍰' },
    { name: 'Drinks', icon: '🍹' },
  ];

  const dietaryOptions = ['All', 'Vegetarian', 'Vegan', 'Gluten-Free', 'Chef Special'];

  useEffect(() => {
    const catFromUrl = searchParams.get('category');
    if (catFromUrl) {
      setSelectedCategory(catFromUrl);
    }
    const searchFromUrl = searchParams.get('search');
    if (searchFromUrl) {
      setSearchQuery(searchFromUrl);
    }
  }, [searchParams]);

  const handleCategoryChange = (catName) => {
    setSelectedCategory(catName);
    if (catName === 'All') {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      searchParams.set('category', catName);
      setSearchParams(searchParams);
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
            <Reveal direction="up" className="menu-header-inner">
              <span className="section-badge yellow">
                <Sparkles size={14} className="badge-sparkle" />
                ARTISAN GASTRONOMY
              </span>
              <h1 className="menu-main-title">
                Handcrafted <span className="serif-accent">Culinary Menu</span>
              </h1>
              <p className="menu-main-subtitle">
                Explore our chef-curated collection cooked to order with farm-fresh organic ingredients.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Filter & Controls Bar */}
        <section className="menu-controls-section">
          <div className="container">
            <Reveal direction="up" delay={0.1} className="menu-controls-bar">
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
            </Reveal>

            {/* Category Filter Tabs */}
            <div className="menu-category-tabs-wrap">
              <div className="menu-category-tabs">
                {categories.map((cat) => (
                  <button
                    key={cat.name}
                    type="button"
                    className={`menu-cat-btn ${selectedCategory.toLowerCase() === cat.name.toLowerCase() ? 'active' : ''}`}
                    onClick={() => handleCategoryChange(cat.name)}
                  >
                    <span className="cat-btn-icon">{cat.icon}</span>
                    <span>{cat.name}</span>
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
        <section className="menu-dishes-section">
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

            <AnimatePresence mode="wait">
              {filteredFoods.length > 0 ? (
                <motion.div 
                  key={`${selectedCategory}-${sortBy}-${dietaryFilter}-${searchQuery}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="menu-grid"
                >
                  {filteredFoods.map((dish) => (
                    <FoodCard
                      key={dish.id}
                      dish={dish}
                      className="menu-card-item"
                    />
                  ))}
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="menu-no-results glass-panel"
                >
                  <div className="no-results-icon-wrap">
                    <UtensilsCrossed size={36} />
                  </div>
                  <h3>No dishes found</h3>
                  <p>We couldn't find any dishes matching your current search or filters.</p>
                  <button type="button" className="btn-primary" onClick={handleResetFilters}>
                    <span>Reset All Filters</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Menu;
