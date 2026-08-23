import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Star, Plus, Check, ArrowRight } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useCart } from '../../context/CartContext';
import { foods } from '../../data/foodData';
import './SearchModal.css';

const SearchModal = () => {
  const { isSearchOpen, closeSearch } = useTheme();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');
  const [addedItemIds, setAddedItemIds] = useState({});
  const inputRef = useRef(null);

  const tags = ['All', 'Pizza', 'Pasta', 'Burgers', 'Salads', 'Desserts', 'Drinks'];

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 80);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setSearchTerm('');
      setSelectedTag('All');
    }
  }, [isSearchOpen]);

  // Keyboard shortcut Ctrl+K to toggle
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (isSearchOpen) closeSearch();
        else closeSearch(); // Will be triggered from context
      }
      if (e.key === 'Escape' && isSearchOpen) {
        closeSearch();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, closeSearch]);

  if (!isSearchOpen) return null;

  const filteredFoods = foods.filter((dish) => {
    const matchesTag = selectedTag === 'All' || dish.category.toLowerCase() === selectedTag.toLowerCase();
    const query = searchTerm.toLowerCase().trim();
    const matchesSearch =
      !query ||
      dish.name.toLowerCase().includes(query) ||
      dish.description.toLowerCase().includes(query) ||
      dish.category.toLowerCase().includes(query) ||
      dish.ingredients?.some((ing) => ing.toLowerCase().includes(query));

    return matchesTag && matchesSearch;
  });

  const handleDishClick = (id) => {
    closeSearch();
    navigate(`/menu/${id}`);
  };

  const handleAdd = (e, dish) => {
    e.stopPropagation();
    addToCart(dish);
    setAddedItemIds((prev) => ({ ...prev, [dish.id]: true }));
    setTimeout(() => {
      setAddedItemIds((prev) => ({ ...prev, [dish.id]: false }));
    }, 1200);
  };

  return (
    <div className="search-modal-overlay" onClick={closeSearch} role="dialog" aria-modal="true">
      <div className="search-modal-box" onClick={(e) => e.stopPropagation()}>
        {/* Search Input Bar */}
        <div className="search-input-header">
          <Search size={22} className="search-input-icon" />
          <input
            ref={inputRef}
            type="text"
            className="search-main-input"
            placeholder="Search tacos, truffle pizza, pasta, ingredients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="search-close-btn" onClick={closeSearch} aria-label="Close search">
            <X size={20} />
          </button>
        </div>

        {/* Category Quick Tags */}
        <div className="search-tags-row">
          {tags.map((tag) => (
            <button
              key={tag}
              className={`search-tag-pill ${selectedTag === tag ? 'active' : ''}`}
              onClick={() => setSelectedTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="search-results-list">
          {filteredFoods.length > 0 ? (
            filteredFoods.map((dish) => (
              <div
                key={dish.id}
                className="search-result-item"
                onClick={() => handleDishClick(dish.id)}
              >
                <img src={dish.image} alt={dish.name} className="search-dish-thumb" />

                <div className="search-dish-info">
                  <div className="search-dish-top">
                    <h4 className="search-dish-name">{dish.name}</h4>
                    <span className="search-dish-category">{dish.category}</span>
                  </div>
                  <p className="search-dish-desc">{dish.description}</p>
                  <div className="search-dish-meta">
                    <div className="search-dish-rating">
                      <Star size={13} fill="#F5A623" color="#F5A623" />
                      <span>{dish.rating}</span>
                    </div>
                    <span className="search-dish-price">${dish.price.toFixed(2)}</span>
                  </div>
                </div>

                <div className="search-dish-actions">
                  <button
                    className={`search-add-btn ${addedItemIds[dish.id] ? 'added' : ''}`}
                    onClick={(e) => handleAdd(e, dish)}
                    aria-label={`Add ${dish.name} to cart`}
                  >
                    {addedItemIds[dish.id] ? <Check size={16} /> : <Plus size={16} />}
                  </button>
                  <span className="search-view-arrow">
                    <ArrowRight size={16} />
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="search-empty-state">
              <p>No dishes found matching "<strong>{searchTerm}</strong>"</p>
              <span>Try searching for 'Pizza', 'Burger', 'Truffle', or 'Pasta'</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
