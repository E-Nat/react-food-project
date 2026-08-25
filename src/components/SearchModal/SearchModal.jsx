import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Star, Plus, Check, Clock, Flame } from 'lucide-react';
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

  const tags = [
    { label: 'All', icon: '✨' },
    { label: 'Pizza', icon: '🍕' },
    { label: 'Pasta', icon: '🍝' },
    { label: 'Burgers', icon: '🍔' },
    { label: 'Salads', icon: '🥗' },
    { label: 'Desserts', icon: '🍰' },
    { label: 'Drinks', icon: '🍹' }
  ];

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

  useEffect(() => {
    const handleKeyDown = (e) => {
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
            placeholder="Search sourdough pizza, truffle pasta, fresh bowls..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="search-close-btn" onClick={closeSearch} aria-label="Close search">
            <X size={18} />
          </button>
        </div>

        {/* Category Quick Tags */}
        <div className="search-tags-row">
          {tags.map((tag) => (
            <button
              key={tag.label}
              className={`search-tag-pill ${selectedTag === tag.label ? 'active' : ''}`}
              onClick={() => setSelectedTag(tag.label)}
            >
              <span>{tag.icon}</span>
              <span>{tag.label}</span>
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="search-results-list">
          {filteredFoods.length === 0 ? (
            <div className="search-empty-state">
              <div className="search-empty-icon">🍽️</div>
              <h4>No delicious match found.</h4>
              <p>Try searching for "Truffle", "Pizza", "Burger", or select a category tag above.</p>
            </div>
          ) : (
            filteredFoods.map((dish) => (
              <div
                key={dish.id}
                className="search-result-item"
                onClick={() => handleDishClick(dish.id)}
              >
                <img src={dish.image} alt={dish.name} className="search-result-img" />
                <div className="search-result-info">
                  <div className="search-result-top">
                    <span className="search-result-cat">{dish.category}</span>
                    <div className="search-result-rating">
                      <Star size={13} fill="currentColor" />
                      <span>{dish.rating}</span>
                    </div>
                  </div>
                  <h4 className="search-result-title">{dish.name}</h4>
                  <p className="search-result-desc">{dish.description}</p>
                  
                  <div className="search-result-meta">
                    <span className="search-result-price">${dish.price.toFixed(2)}</span>
                    <div className="search-result-tags">
                      <span className="search-meta-pill">
                        <Clock size={11} />
                        {dish.prepTime || '20m'}
                      </span>
                      <span className="search-meta-pill">
                        <Flame size={11} />
                        {dish.calories || '450'} kcal
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  className={`search-add-btn ${addedItemIds[dish.id] ? 'added' : ''}`}
                  onClick={(e) => handleAdd(e, dish)}
                  aria-label={`Add ${dish.name} to bag`}
                >
                  {addedItemIds[dish.id] ? <Check size={16} /> : <Plus size={16} />}
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="search-modal-footer">
          <div className="search-footer-hint">
            <kbd>ESC</kbd> <span>to close</span>
            <kbd>Click</kbd> <span>to view recipe</span>
          </div>
          <span className="search-results-counter">
            {filteredFoods.length} {filteredFoods.length === 1 ? 'dish' : 'dishes'} found
          </span>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;

