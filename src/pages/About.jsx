import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Award, 
  Leaf, 
  Heart, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Users, 
  Clock,
  UtensilsCrossed,
  ChefHat
} from 'lucide-react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import { aboutStats, chefsTeam } from '../data/foodData';
import { useTheme } from '../context/ThemeContext';
import useScrollReveal from '../hooks/useScrollReveal';
import './About.css';

const About = () => {
  const { openReservation } = useTheme();
  const storyRef = useScrollReveal();
  const statsRef = useScrollReveal();
  const chefsRef = useScrollReveal();
  const valuesRef = useScrollReveal();

  return (
    <div className="page-wrapper about-page">
      <Navbar />
      <main>
        {/* About Hero */}
        <section className="about-hero-section">
          <div className="container">
            <div className="about-hero-content">
              <span className="section-badge">
                <Sparkles size={14} className="badge-sparkle" />
                OUR HERITAGE & PASSION
              </span>
              <h1 className="about-hero-title">
                Redefining the Art of <span className="serif-accent">Fresh Dining</span>
              </h1>
              <p className="about-hero-subtitle">
                At FOODLY, we believe extraordinary meals begin with wholesome organic ingredients, passionate craftsmanship, and genuine hospitality.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Strip */}
        <section className="about-stats-section reveal-on-scroll" ref={statsRef}>
          <div className="container">
            <div className="about-stats-grid">
              {aboutStats.map((stat, idx) => (
                <div key={idx} className="about-stat-card">
                  <span className="stat-number">{stat.value}</span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Brand Story & Philosophy Section */}
        <section className="about-story-section reveal-on-scroll" ref={storyRef}>
          <div className="container about-story-grid">
            <div className="about-story-img-stage">
              <div className="about-img-blob" aria-hidden="true" />
              <img
                src="/images/hero-food.png"
                alt="Fresh artisan kitchen bowl"
                className="about-story-food-img"
              />
              <div className="about-story-floating-card">
                <Leaf size={22} color="var(--green)" />
                <div>
                  <strong>Farm-to-Table Fresh</strong>
                  <p>100% Certified Organic</p>
                </div>
              </div>
            </div>

            <div className="about-story-text">
              <span className="section-badge green">PHILOSOPHY</span>
              <h2 className="about-section-heading">
                Food Crafted For <span className="serif-accent">Modern Living</span>
              </h2>
              <p className="about-paragraph">
                Founded with a simple ambition: bring chef-standard culinary dishes to your table with the ease, friendliness, and speed of modern technology. We discarded heavy preservatives and industrialized prep in favor of authentic slow-fermented doughs, daily hand-rolled pasta, and morning-harvested produce.
              </p>
              <p className="about-paragraph">
                Every single recipe in the FOODLY menu is balanced for vibrant nutrition, craveable textures, and unforgettable flavors that brighten your everyday routine.
              </p>

              <div className="about-story-features">
                <div className="story-feature-item">
                  <CheckCircle2 size={18} className="text-accent" />
                  <span>20+ Local Farm Partnerships</span>
                </div>
                <div className="story-feature-item">
                  <CheckCircle2 size={18} className="text-accent" />
                  <span>100% Biodegradable Eco-Packaging</span>
                </div>
                <div className="story-feature-item">
                  <CheckCircle2 size={18} className="text-accent" />
                  <span>Zero Artificial Preservatives</span>
                </div>
                <div className="story-feature-item">
                  <CheckCircle2 size={18} className="text-accent" />
                  <span>Fresh Handcrafted Daily Batches</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Master Chefs Team */}
        <section className="about-chefs-section reveal-on-scroll" ref={chefsRef}>
          <div className="container">
            <div className="section-header">
              <span className="section-badge">
                <ChefHat size={14} className="badge-sparkle" />
                CULINARY MASTERS
              </span>
              <h2 className="section-title">
                Meet the <span className="serif-accent">Chefs Behind FOODLY</span>
              </h2>
              <p className="section-subtitle">
                A talented brigade of passionate culinary artists dedicated to perfection in every single dish.
              </p>
            </div>

            <div className="chefs-grid">
              {chefsTeam.map((chef, idx) => (
                <div key={chef.id} className={`chef-card delay-${idx + 1}`}>
                  <div className="chef-avatar-wrap">
                    <img
                      src={chef.avatar}
                      alt={chef.name}
                      className="chef-avatar-img"
                    />
                    <span className="chef-experience-pill">{chef.experience}</span>
                  </div>
                  <h3 className="chef-name">{chef.name}</h3>
                  <span className="chef-role">{chef.role}</span>
                  <p className="chef-specialty">Specialty: <strong>{chef.specialty}</strong></p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values / Mission Section */}
        <section className="about-values-section reveal-on-scroll" ref={valuesRef}>
          <div className="container">
            <div className="section-header">
              <span className="section-badge green">FOUNDATION</span>
              <h2 className="section-title">
                Our Core <span className="serif-accent">Values</span>
              </h2>
              <p className="section-subtitle">
                The four pillars that guide our culinary philosophy, kitchen standards, and community care.
              </p>
            </div>

            <div className="values-grid">
              <div className="value-card">
                <div className="value-icon-box">
                  <Leaf size={24} />
                </div>
                <h3 className="value-title">Sustainability</h3>
                <p className="value-desc">We minimize kitchen waste and partner only with ethical, certified organic local farms.</p>
              </div>

              <div className="value-card">
                <div className="value-icon-box">
                  <Award size={24} />
                </div>
                <h3 className="value-title">Artisan Quality</h3>
                <p className="value-desc">No frozen shortcuts. Every dough is rested for 48 hours and sauces simmered to perfection.</p>
              </div>

              <div className="value-card">
                <div className="value-icon-box">
                  <Heart size={24} />
                </div>
                <h3 className="value-title">Customer Delight</h3>
                <p className="value-desc">Your dining happiness is our benchmark. We stand behind every plate with 100% satisfaction.</p>
              </div>

              <div className="value-card">
                <div className="value-icon-box">
                  <Sparkles size={24} />
                </div>
                <h3 className="value-title">Culinary Innovation</h3>
                <p className="value-desc">Continually reimagining classic comfort favorites with modern, nourishing culinary creativity.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA Banner */}
        <section className="about-cta-section">
          <div className="container">
            <div className="about-cta-box">
              <h2>Experience the Flavor Difference</h2>
              <p>Reserve a table for your special evening or order fresh meals delivered straight to your door.</p>
              <div className="about-cta-buttons">
                <button type="button" className="btn-primary" onClick={openReservation}>
                  <span>Book a Table</span>
                  <ArrowRight size={16} />
                </button>
                <Link to="/menu" className="btn-secondary">
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
