import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Award, 
  Leaf, 
  Heart, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  ChefHat, 
  ChevronRight, 
  Utensils, 
  Star, 
  Quote, 
  ArrowDownRight 
} from 'lucide-react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import { chefsTeam } from '../data/foodData';
import useScrollReveal from '../hooks/useScrollReveal';
import useCountUp from '../hooks/useCountUp';
import './About.css';

// Animated Stat Card component
const StatCard = ({ target, suffix = '', label, isDecimal = false }) => {
  const { count, elementRef } = useCountUp(target, 1800, isDecimal);

  return (
    <div ref={elementRef} className="about-stat-card glass-panel">
      <span className="stat-number">
        {count}{suffix}
      </span>
      <span className="stat-label">{label}</span>
    </div>
  );
};

const About = () => {
  const location = useLocation();
  const storyRef = useScrollReveal();
  const statsRef = useScrollReveal();
  const chefsRef = useScrollReveal();
  const valuesRef = useScrollReveal();
  const experienceRef = useScrollReveal();
  const ctaRef = useScrollReveal();

  const statsData = [
    { target: 10, suffix: 'K+', label: 'Happy Customers' },
    { target: 50, suffix: '+', label: 'Signature Dishes' },
    { target: 4.9, suffix: '', label: 'Average Rating', isDecimal: true },
    { target: 15, suffix: '+', label: 'Master Chefs' },
  ];

  // Deep link support on initial mount or hash change
  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
    }
  }, [location.hash]);

  // Smooth scroll handler for quick jump anchor pills
  const handleQuickJump = (e, targetId) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', `#${targetId}`);
    }
  };

  return (
    <div className="page-wrapper about-page-wrapper">
      <Navbar />

      <main className="about-main-content">
        {/* Breadcrumb Bar */}
        <div className="about-breadcrumb-bar">
          <div className="container">
            <nav className="breadcrumb-nav" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <ChevronRight size={14} aria-hidden="true" />
              <span className="breadcrumb-current">About Us</span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <section className="about-hero-section" id="hero" aria-labelledby="about-hero-heading">
          <div className="container">
            <div className="about-hero-content">
              <span className="about-badge-pill">
                <Sparkles size={14} className="badge-sparkle" aria-hidden="true" />
                <span>OUR HERITAGE & PASSION</span>
              </span>
              <h1 id="about-hero-heading" className="about-hero-title">
                Redefining the Art of <span className="serif-accent">Fresh Dining</span>
              </h1>
              <p className="about-hero-subtitle">
                At FOODLY, we believe extraordinary culinary experiences begin with wholesome organic ingredients, artisanal craftsmanship, and heartfelt hospitality.
              </p>

              {/* Section Jump Links */}
              <div className="about-hero-quick-links" aria-label="Quick section navigation">
                <a 
                  href="#story" 
                  className="about-quick-pill" 
                  onClick={(e) => handleQuickJump(e, 'story')}
                  aria-label="Jump to Our Story section"
                >
                  <span>Our Story</span>
                  <ArrowDownRight size={13} aria-hidden="true" />
                </a>
                <a 
                  href="#values" 
                  className="about-quick-pill" 
                  onClick={(e) => handleQuickJump(e, 'values')}
                  aria-label="Jump to Core Values section"
                >
                  <span>Core Values</span>
                  <ArrowDownRight size={13} aria-hidden="true" />
                </a>
                <a 
                  href="#team" 
                  className="about-quick-pill" 
                  onClick={(e) => handleQuickJump(e, 'team')}
                  aria-label="Jump to Chefs Brigade section"
                >
                  <span>Chefs Brigade</span>
                  <ArrowDownRight size={13} aria-hidden="true" />
                </a>
                <a 
                  href="#experience" 
                  className="about-quick-pill" 
                  onClick={(e) => handleQuickJump(e, 'experience')}
                  aria-label="Jump to Manifesto section"
                >
                  <span>Manifesto</span>
                  <ArrowDownRight size={13} aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Statistics Strip */}
        <section className="about-stats-section reveal-on-scroll" id="stats" ref={statsRef} aria-label="Restaurant Statistics">
          <div className="container">
            <div className="about-stats-grid">
              {statsData.map((stat, idx) => (
                <StatCard
                  key={idx}
                  target={stat.target}
                  suffix={stat.suffix}
                  label={stat.label}
                  isDecimal={stat.isDecimal}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Brand Story & Philosophy */}
        <section className="about-story-section reveal-on-scroll" id="story" ref={storyRef} aria-labelledby="story-heading">
          <div className="container about-story-grid">
            {/* Left: Food Photography Stage with Floating Badge */}
            <div className="about-story-img-stage">
              <div className="about-img-blob" aria-hidden="true" />
              <img
                src="/images/hero-food.png"
                alt="Fresh artisan kitchen salad bowl with organic greens and vibrant ingredients"
                className="about-story-food-img"
                loading="lazy"
              />
              <div className="about-story-floating-card glass-card">
                <div className="floating-icon-wrap" aria-hidden="true">
                  <Leaf size={22} color="var(--green)" />
                </div>
                <div>
                  <strong>Farm-to-Table Fresh</strong>
                  <p>100% Certified Organic Harvest</p>
                </div>
              </div>
            </div>

            {/* Right: Narrative Story */}
            <div className="about-story-text">
              <span className="section-badge green">PHILOSOPHY</span>
              <h2 id="story-heading" className="about-section-heading">
                Food Crafted For <span className="serif-accent">Modern Living</span>
              </h2>
              <p className="about-paragraph">
                Founded with a passionate ambition: bring chef-standard culinary dishes to your table with the ease, speed, and warmth of modern dining. We discarded heavy artificial additives and industrial shortcuts in favor of slow-fermented doughs, daily hand-rolled pasta, and morning-harvested produce.
              </p>
              <p className="about-paragraph">
                Every recipe in the FOODLY kitchen is thoughtfully balanced for vibrant nutrition, craveable textures, and unforgettable flavors that brighten your everyday meals.
              </p>

              <div className="about-story-features">
                <div className="story-feature-item">
                  <CheckCircle2 size={18} className="feature-check-icon" aria-hidden="true" />
                  <span>20+ Local Farm Partnerships</span>
                </div>
                <div className="story-feature-item">
                  <CheckCircle2 size={18} className="feature-check-icon" aria-hidden="true" />
                  <span>100% Biodegradable Eco-Packaging</span>
                </div>
                <div className="story-feature-item">
                  <CheckCircle2 size={18} className="feature-check-icon" aria-hidden="true" />
                  <span>Zero Artificial Preservatives</span>
                </div>
                <div className="story-feature-item">
                  <CheckCircle2 size={18} className="feature-check-icon" aria-hidden="true" />
                  <span>Fresh Handcrafted Daily Batches</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values Section */}
        <section className="about-values-section reveal-on-scroll" id="values" ref={valuesRef} aria-labelledby="values-heading">
          <div className="container">
            <div className="section-header-center">
              <span className="section-badge green">FOUNDATION</span>
              <h2 id="values-heading" className="section-title">
                Our Core <span className="serif-accent">Values</span>
              </h2>
              <p className="section-subtitle">
                The four pillars that guide our culinary philosophy, kitchen standards, and guest care every single day.
              </p>
            </div>

            <div className="values-grid">
              <article className="value-card glass-panel">
                <div className="value-icon-box green" aria-hidden="true">
                  <Leaf size={24} />
                </div>
                <h3 className="value-title">Sustainability</h3>
                <p className="value-desc">
                  We minimize kitchen waste and partner directly with ethical, certified organic farms to protect our soil and community.
                </p>
              </article>

              <article className="value-card glass-panel">
                <div className="value-icon-box coral" aria-hidden="true">
                  <Award size={24} />
                </div>
                <h3 className="value-title">Artisan Quality</h3>
                <p className="value-desc">
                  No frozen compromises. Every pizza dough is cold-fermented for 48 hours and our pasta sauces are simmered from scratch.
                </p>
              </article>

              <article className="value-card glass-panel">
                <div className="value-icon-box pink" aria-hidden="true">
                  <Heart size={24} />
                </div>
                <h3 className="value-title">Guest Delight</h3>
                <p className="value-desc">
                  Your dining joy is our highest metric. We back every dish and delivery with a 100% freshness and satisfaction guarantee.
                </p>
              </article>

              <article className="value-card glass-panel">
                <div className="value-icon-box yellow" aria-hidden="true">
                  <Sparkles size={24} />
                </div>
                <h3 className="value-title">Culinary Innovation</h3>
                <p className="value-desc">
                  Continually reimagining classic comfort meals with modern nutrient-dense twists, bold herbs, and seasonal inspirations.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* Master Chefs Brigade */}
        <section className="about-chefs-section reveal-on-scroll" id="team" ref={chefsRef} aria-labelledby="chefs-heading">
          <div className="container">
            <div className="section-header-center">
              <span className="section-badge">
                <ChefHat size={14} className="badge-sparkle" aria-hidden="true" />
                <span>CULINARY BRIGADE</span>
              </span>
              <h2 id="chefs-heading" className="section-title">
                Meet the <span className="serif-accent">Chefs Behind FOODLY</span>
              </h2>
              <p className="section-subtitle">
                A talented brigade of culinary artists dedicated to mastering authentic flavor and craft.
              </p>
            </div>

            <div className="chefs-grid">
              {chefsTeam.map((chef, idx) => (
                <article key={chef.id || idx} className={`chef-card glass-panel delay-${idx + 1}`}>
                  <div className="chef-avatar-wrap">
                    <img
                      src={chef.avatar || chef.image}
                      alt={`Portrait of ${chef.name}, ${chef.role || chef.title}`}
                      className="chef-avatar-img"
                      loading="lazy"
                    />
                    <span className="chef-experience-pill">{chef.experience}</span>
                  </div>
                  <h3 className="chef-name">{chef.name}</h3>
                  <span className="chef-role">{chef.role || chef.title}</span>
                  <p className="chef-specialty">Specialty: <strong>{chef.specialty}</strong></p>
                  {chef.bio && <p className="chef-bio-text">{chef.bio}</p>}
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Experience & Quality Callout */}
        <section className="about-experience-section reveal-on-scroll" id="experience" ref={experienceRef} aria-labelledby="manifesto-badge">
          <div className="container">
            <div className="experience-glass-banner glass-panel">
              <div className="experience-quote-icon" aria-hidden="true">
                <Quote size={32} />
              </div>
              <blockquote className="experience-quote">
                &ldquo;Dining is more than just nourishment&mdash;it is a shared celebration of flavor, craft, and human connection.&rdquo;
              </blockquote>
              <div className="experience-author-row">
                <div id="manifesto-badge" className="experience-badge">
                  <Star size={14} fill="#F5C84B" color="#F5C84B" aria-hidden="true" />
                  <span>FOODLY KITCHEN MANIFESTO</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom Call to Action */}
        <section className="about-cta-section reveal-on-scroll" id="cta" ref={ctaRef} aria-labelledby="cta-heading">
          <div className="container">
            <div className="about-cta-box glass-panel">
              <span className="about-badge-pill">
                <Utensils size={14} aria-hidden="true" />
                <span>JOIN OUR TABLE</span>
              </span>
              <h2 id="cta-heading">Experience the Flavor Difference</h2>
              <p>Reserve a table for your special evening or explore our handcrafted menu delivered fresh to your door.</p>
              <div className="about-cta-buttons">
                <Link to="/booking" className="btn-primary" aria-label="Book a Table at FOODLY">
                  <span>Book a Table</span>
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
                <Link to="/menu" className="btn-secondary" aria-label="Explore FOODLY Menu">
                  <span>Explore Menu</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
