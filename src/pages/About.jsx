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
  Clock 
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
              <span className="section-badge">OUR STORY & PASSION</span>
              <h1 className="about-hero-title">
                Redefining the Joy of Fresh Food
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
                <Leaf size={20} color="var(--green)" />
                <div>
                  <strong>Farm-to-Table Fresh</strong>
                  <p>100% Certified Organic</p>
                </div>
              </div>
            </div>

            <div className="about-story-text">
              <span className="section-badge green">PHILOSOPHY</span>
              <h2 className="about-section-heading">
                Food Crafted For Modern Living
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
                  <span>Scratch Kitchen • Made Fresh Daily</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Master Chefs Section */}
        <section className="about-chefs-section reveal-on-scroll" ref={chefsRef}>
          <div className="container">
            <div className="section-header">
              <span className="section-badge">CULINARY MASTERS</span>
              <h2 className="section-title">Meet Our Executive Chefs</h2>
              <p className="section-subtitle">
                The creative visionaries and passionate artisans crafting our signature dishes every single day.
              </p>
            </div>

            <div className="chefs-grid">
              {chefsTeam.map((chef, idx) => (
                <div key={idx} className={`chef-card delay-${idx + 1}`}>
                  <div className="chef-avatar-wrap">
                    <img src={chef.image} alt={chef.name} className="chef-avatar-img" />
                    <span className="chef-tag">{chef.title}</span>
                  </div>
                  <h3 className="chef-name">{chef.name}</h3>
                  <span className="chef-specialty">{chef.specialty}</span>
                  <p className="chef-bio">{chef.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Core Values Section */}
        <section className="about-values-section reveal-on-scroll" ref={valuesRef}>
          <div className="container">
            <div className="section-header">
              <span className="section-badge green">OUR VALUES</span>
              <h2 className="section-title">What Drives Us</h2>
              <p className="section-subtitle">
                The founding pillars that guide every dish we prepare and every customer we serve.
              </p>
            </div>

            <div className="values-grid">
              <div className="value-card">
                <div className="value-icon-box">
                  <Leaf size={24} />
                </div>
                <h3 className="value-title">Pure Freshness</h3>
                <p className="value-desc">
                  We never freeze our dough or use artificial flavor enhancers. Everything is prepared fresh in our open kitchen each morning.
                </p>
              </div>

              <div className="value-card">
                <div className="value-icon-box">
                  <Heart size={24} />
                </div>
                <h3 className="value-title">Customer Warmth</h3>
                <p className="value-desc">
                  Hospitality is our soul. Whether you dine in our vibrant sunlit restaurant or order from home, you're treated like family.
                </p>
              </div>

              <div className="value-card">
                <div className="value-icon-box">
                  <Award size={24} />
                </div>
                <h3 className="value-title">Artisan Craft</h3>
                <p className="value-desc">
                  Master techniques honed across decades—from 48-hour sourdough fermentation to slow-simmered herbal emulsions.
                </p>
              </div>
            </div>

            {/* CTA Banner */}
            <div className="about-cta-banner">
              <div className="cta-banner-content">
                <h2>Experience the FOODLY Difference</h2>
                <p>Taste the freshness in every bite or reserve an unforgettable dining experience today.</p>
                <div className="cta-banner-btns">
                  <Link to="/menu" className="btn-primary">
                    <span>Explore Our Menu</span>
                    <ArrowRight size={18} />
                  </Link>
                  <button type="button" className="btn-secondary" onClick={openReservation}>
                    <span>Book a Table</span>
                  </button>
                </div>
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
