import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Hero from '../components/Hero/Hero';
import Categories from '../components/Categories/Categories';
import PopularDishes from '../components/PopularDishes/PopularDishes';
import FeaturedDish from '../components/FeaturedDish/FeaturedDish';
import SpecialOffers from '../components/SpecialOffers/SpecialOffers';
import Services from '../components/Services/Services';
import AboutSection from '../components/AboutSection/AboutSection';
import WhyChooseUs from '../components/WhyChooseUs/WhyChooseUs';
import AppPromo from '../components/AppPromo/AppPromo';
import Testimonials from '../components/Testimonials/Testimonials';
import Newsletter from '../components/Newsletter/Newsletter';
import Footer from '../components/Footer/Footer';
import useScrollReveal from '../hooks/useScrollReveal';

const Home = () => {
  // Activate automatic smooth scroll reveal observer across all sections
  useScrollReveal();

  return (
    <div className="page-wrapper home-page-root">
      {/* 1. Floating Glass Navbar */}
      <Navbar />

      <main>
        {/* 2. Hero Section with Velaris WebGL Animated Gradient */}
        <Hero />

        {/* 3. Category Section */}
        <div className="reveal-on-scroll">
          <Categories />
        </div>

        {/* 4. Popular Food */}
        <div className="reveal-on-scroll">
          <PopularDishes />
        </div>

        {/* 5. Featured Dish */}
        <div className="reveal-on-scroll">
          <FeaturedDish />
        </div>

        {/* 6. Special Offers */}
        <div className="reveal-on-scroll">
          <SpecialOffers />
        </div>

        {/* 7. Services */}
        <div className="reveal-on-scroll">
          <Services />
        </div>

        {/* 8. About FOODLY */}
        <div className="reveal-on-scroll">
          <AboutSection />
        </div>

        {/* 9. Why Choose Us */}
        <div className="reveal-on-scroll">
          <WhyChooseUs />
        </div>

        {/* 10. App Promotion */}
        <div className="reveal-on-scroll">
          <AppPromo />
        </div>

        {/* 11. Testimonials */}
        <div className="reveal-on-scroll">
          <Testimonials />
        </div>

        {/* 12. Newsletter */}
        <div className="reveal-on-scroll">
          <Newsletter />
        </div>
      </main>

      {/* 13. Footer */}
      <Footer />
    </div>
  );
};

export default Home;
