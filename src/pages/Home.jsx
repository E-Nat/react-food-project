import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Hero from '../components/Hero/Hero';
import PopularDishes from '../components/PopularDishes/PopularDishes';
import FeaturedDish from '../components/FeaturedDish/FeaturedDish';
import Categories from '../components/Categories/Categories';
import AppPromo from '../components/AppPromo/AppPromo';
import Services from '../components/Services/Services';
import Testimonials from '../components/Testimonials/Testimonials';
import Newsletter from '../components/Newsletter/Newsletter';
import Footer from '../components/Footer/Footer';

const Home = () => {
  return (
    <div className="page-wrapper home-page">
      <Navbar />
      <main>
        {/* Exact Layout Sequence as per Specification */}
        <Hero />
        <PopularDishes />
        <FeaturedDish />
        <Categories />
        <AppPromo />
        <Services />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
