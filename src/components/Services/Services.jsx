import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Leaf, ChefHat, Heart, Sparkles, ArrowRight } from 'lucide-react';
import { servicesData } from '../../data/foodData';
import { Reveal } from '../animation/Reveal';
import { StaggerContainer, StaggerItem } from '../animation/StaggerContainer';
import './Services.css';

const Services = () => {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Truck':
        return <Truck size={28} />;
      case 'Leaf':
        return <Leaf size={28} />;
      case 'ChefHat':
        return <ChefHat size={28} />;
      case 'Heart':
        return <Heart size={28} />;
      default:
        return <Sparkles size={28} />;
    }
  };

  return (
    <section className="section-wrapper services-master-section" id="services">
      <div className="container">
        {/* Section Header */}
        <Reveal direction="up" className="section-header">
          <div className="section-badge green">
            <Sparkles size={14} />
            <span>OUR SERVICES</span>
          </div>
          <h2 className="section-title">
            Why Choose <span>FOODLY?</span>
          </h2>
          <p className="section-subtitle">
            We are dedicated to bringing culinary excellence directly to your table with unparalleled freshness, speed, and heartfelt care.
          </p>
        </Reveal>

        {/* 4 Cards Grid with Staggered Entrance */}
        <StaggerContainer className="services-grid-container" staggerDelay={0.12}>
          {servicesData.map((service) => (
            <StaggerItem key={service.id}>
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className={`service-feature-card bg-soft-${service.colorTheme}`}
              >
                <div className={`service-icon-bubble ${service.colorTheme}`}>
                  {getIcon(service.icon)}
                </div>

                <h3 className="service-card-title">
                  <span className="service-emoji">{service.iconEmoji}</span> {service.title}
                </h3>

                <p className="service-card-desc">
                  {service.description}
                </p>

                <div className="service-bottom-indicator">
                  <span>Learn more</span>
                  <ArrowRight size={14} />
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default Services;
