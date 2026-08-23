import React from 'react';
import { 
  ShoppingBag, 
  UtensilsCrossed, 
  Truck, 
  Sparkles 
} from 'lucide-react';
import { serviceFeatures } from '../../data/foodData';
import useScrollReveal from '../../hooks/useScrollReveal';
import './Services.css';

const iconMap = {
  ShoppingBag: ShoppingBag,
  Utensils: UtensilsCrossed,
  Truck: Truck,
  Sparkles: Sparkles,
};

const Services = () => {
  const sectionRef = useScrollReveal();

  return (
    <section className="services-section reveal-on-scroll" id="services" ref={sectionRef}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-badge">WHY CHOOSE US</span>
          <h2 className="section-title">Why Choose Us?</h2>
          <p className="section-subtitle">
            Everything you need for a better, fresher, and more delicious food experience.
          </p>
        </div>

        {/* 4 Service Cards */}
        <div className="services-grid">
          {serviceFeatures.map((service, idx) => {
            const IconComp = iconMap[service.iconName] || ShoppingBag;
            return (
              <div 
                key={service.id} 
                className={`service-card delay-${(idx % 4) + 1}`}
              >
                <div className="service-icon-wrap">
                  <IconComp size={26} strokeWidth={2.2} className="service-icon" />
                </div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-desc">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
