import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Star, 
  Sparkles, 
  Clock, 
  Leaf, 
  Calendar, 
  Search, 
  Truck
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import Velaris from '../Velaris/Velaris';
import { MagneticButton } from '../animation/MagneticButton';
import './Hero.css';

const Hero = () => {
  const { theme, openReservation, openSearch } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [heroScroll, setHeroScroll] = useState(0);
  const heroRef = useRef(null);
  const navigate = useNavigate();

  const isDark = theme === 'dark';

  const velarisProps = isDark
    ? {
        bg: '#08110C',
        colors: [
          '#0D1711',
          '#142319',
          '#FF7650',
          '#F5C84B'
        ]
      }
    : {
        bg: '#F7F4E9',
        colors: [
          '#E8F0E1',
          '#DDE6C9',
          '#FF7650',
          '#F5C84B'
        ]
      };

  // Mouse Parallax (Desktop Only)
  const handleMouseMove = (e) => {
    if (window.innerWidth < 992) return;
    const { clientX, clientY } = e;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const normX = (clientX - centerX) / centerX;
    const normY = (clientY - centerY) / centerY;
    setMousePos({ x: normX, y: normY });
  };

  // Scroll Progression within Hero
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = heroRef.current ? heroRef.current.offsetHeight : 800;
      const progress = Math.min(Math.max(scrollY / heroHeight, 0), 1);
      setHeroScroll(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/menu?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      openSearch();
    }
  };

  const handleTrendingClick = (cat) => {
    navigate(`/menu?category=${cat}`);
  };

  const trendingTags = [
    { label: '🍔 Classic Burger', cat: 'Burger' },
    { label: '🍕 Truffle Pizza', cat: 'Pizza' },
    { label: '🍝 Creamy Pasta', cat: 'Pasta' },
    { label: '🥗 Garden Bowl', cat: 'Salad' },
  ];

  // Dynamic parallax transforms
  const foodTransform = {
    transform: `translate(${mousePos.x * 5}px, ${mousePos.y * 5}px) scale(${1 + heroScroll * 0.08})`,
  };

  const botanicalsTransform = {
    transform: `translate(${mousePos.x * 10}px, ${mousePos.y * 10}px)`,
  };

  const cardsTransform1 = {
    transform: `translate(${mousePos.x * 7}px, ${mousePos.y * 7 - heroScroll * 16}px)`,
  };

  const cardsTransform2 = {
    transform: `translate(${mousePos.x * -7}px, ${mousePos.y * -7 + heroScroll * 16}px)`,
  };

  // Framer Motion Sequence Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemFadeUp = {
    hidden: { opacity: 0, y: 32 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const badgeVariant = {
    hidden: { opacity: 0, scale: 0.88, y: -10 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section 
      ref={heroRef}
      className="hero-master-section relative overflow-hidden" 
      id="hero"
      onMouseMove={handleMouseMove}
    >
      {/* 1. Velaris WebGL Animated Particle Universe */}
      <Velaris 
        bg={velarisProps.bg} 
        colors={velarisProps.colors} 
        mouse={mousePos}
        scroll={heroScroll}
      />

      {/* 2. Hero Content Foreground with Staggered Entrance */}
      <div className="container hero-grid-container">
        {/* Left Column: Typography, Finder & Actions */}
        <motion.div 
          className="hero-left-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Small Badge */}
          <motion.div variants={badgeVariant} className="hero-badge glass-card">
            <Sparkles size={14} className="hero-badge-icon" />
            <span>✦ GOOD FOOD • GOOD MOOD</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1 variants={itemFadeUp} className="hero-title">
            Delicious food, <br />
            <span className="hero-title-highlight">made for your mood.</span>
          </motion.h1>

          {/* Description */}
          <motion.p variants={itemFadeUp} className="hero-subtitle">
            Fresh ingredients, bold flavors, made fresh every day. Handcrafted artisan meals delivered piping hot to your table.
          </motion.p>

          {/* Instant Search Bar with Magnetic Submit */}
          <motion.form 
            variants={itemFadeUp} 
            className="hero-search-bar glass-panel" 
            onSubmit={handleSearch}
          >
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="What are you craving today? e.g. Pasta, Burger..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="hero-search-input"
            />
            <MagneticButton strength={0.2}>
              <button type="submit" className="btn-primary search-submit-btn">
                <span>Find Food</span>
                <ArrowRight size={15} />
              </button>
            </MagneticButton>
          </motion.form>

          {/* Trending Quick Chips */}
          <motion.div variants={itemFadeUp} className="hero-trending-row">
            <span className="trending-label">Trending:</span>
            {trendingTags.map((tag) => (
              <button
                key={tag.cat}
                type="button"
                className="trending-chip glass-card"
                onClick={() => handleTrendingClick(tag.cat)}
              >
                {tag.label}
              </button>
            ))}
          </motion.div>

          {/* Action Buttons */}
          <motion.div variants={itemFadeUp} className="hero-cta-group">
            <MagneticButton strength={0.25}>
              <Link to="/menu" className="btn-primary hero-btn-main">
                <span>Explore Menu</span>
                <ArrowRight size={18} />
              </Link>
            </MagneticButton>
            <MagneticButton strength={0.25}>
              <button
                type="button"
                className="btn-secondary hero-btn-sec glass-card"
                onClick={openReservation}
              >
                <Calendar size={18} color="var(--primary)" />
                <span>Book a Table</span>
              </button>
            </MagneticButton>
          </motion.div>

          {/* Trust Information Bar */}
          <motion.div variants={itemFadeUp} className="hero-trust-wrapper glass-panel">
            <div className="hero-benefit-item">
              <div className="benefit-icon-badge coral">
                <Clock size={16} />
              </div>
              <div className="benefit-text">
                <strong>25–30 Min</strong>
                <span>Fast Delivery</span>
              </div>
            </div>

            <div className="benefit-divider" />

            <div className="hero-benefit-item">
              <div className="benefit-icon-badge green">
                <Leaf size={16} />
              </div>
              <div className="benefit-text">
                <strong>100% Fresh</strong>
                <span>Ingredients</span>
              </div>
            </div>

            <div className="benefit-divider" />

            <div className="hero-trust-rating">
              <div className="trust-avatar-stack">
                <img src="/images/avatar-1.jpg" alt="Customer" className="avatar-img" />
                <img src="/images/avatar-2.jpg" alt="Customer" className="avatar-img" />
                <img src="/images/avatar-3.jpg" alt="Customer" className="avatar-img" />
              </div>
              <div className="rating-info">
                <div className="stars-row">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={13} fill="#F5C85B" color="#F5C85B" />
                  ))}
                  <strong>4.9</strong>
                </div>
                <span>2,400+ food lovers</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column: Hero Food Visual & Floating Glass Cards */}
        <div className="hero-right-visual">
          <div className="food-stage-backdrop" aria-hidden="true" />
          <div className="food-glow-ring animate-glow" aria-hidden="true" />

          {/* Floating Glass Card 1: Fast Delivery */}
          <motion.div 
            initial={{ opacity: 0, x: -30, y: -20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="floating-hero-card card-delivery glass-card animate-float"
            style={cardsTransform1}
          >
            <div className="card-icon-pill coral">
              <Truck size={18} />
            </div>
            <div className="card-details">
              <strong>25–30 min</strong>
              <span>Fast delivery</span>
            </div>
          </motion.div>

          {/* Center Main Food Image with Parallax & Scroll Zoom */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="hero-main-food-container animate-float"
            style={foodTransform}
          >
            <img
              src="/images/hero-food.png"
              alt="Artisan Avocado Tartine with Poached Egg"
              className="hero-main-dish-image"
              width="540"
              height="540"
            />
            {/* Floating Decorative Botanicals with Parallax */}
            <div className="botanicals-parallax-layer" style={botanicalsTransform}>
              <span className="decorative-leaf leaf-top" aria-hidden="true">🍃</span>
              <span className="decorative-leaf leaf-right" aria-hidden="true">🍅</span>
              <span className="decorative-leaf leaf-bottom" aria-hidden="true">🍋</span>
              <span className="decorative-leaf leaf-extra-1" aria-hidden="true">🥑</span>
              <span className="decorative-leaf leaf-extra-2" aria-hidden="true">🌶️</span>
            </div>
          </motion.div>

          {/* Floating Glass Card 2: Rating */}
          <motion.div 
            initial={{ opacity: 0, x: 30, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="floating-hero-card card-rating glass-card animate-float-reverse"
            style={cardsTransform2}
          >
            <div className="card-icon-pill yellow">
              <Star size={18} fill="#F5C85B" color="#F5C85B" />
            </div>
            <div className="card-details">
              <strong>★ 4.9 Rating</strong>
              <span>2,400+ food lovers</span>
            </div>
          </motion.div>

          {/* Floating Glass Card 3: Fresh Guarantee */}
          <motion.div 
            initial={{ opacity: 0, x: -20, y: 30 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="floating-hero-card card-fresh glass-card animate-float"
            style={cardsTransform1}
          >
            <div className="card-icon-pill green">
              <Leaf size={18} />
            </div>
            <div className="card-details">
              <strong>100% Fresh</strong>
              <span>Organic Ingredients</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 3. Smooth bottom transition */}
      <div className="hero-bottom-transition" aria-hidden="true" />
    </section>
  );
};

export default Hero;
