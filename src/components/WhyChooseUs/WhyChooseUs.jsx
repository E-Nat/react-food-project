import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Clock, DollarSign, Smartphone, Check, ArrowRight } from 'lucide-react';
import { whyChooseUsData } from '../../data/foodData';
import { Reveal } from '../animation/Reveal';
import { StaggerContainer, StaggerItem } from '../animation/StaggerContainer';
import './WhyChooseUs.css';

const WhyChooseUs = () => {
  const renderIcon = (iconName) => {
    switch (iconName) {
      case 'Sparkles':
        return <Sparkles size={28} />;
      case 'Clock':
        return <Clock size={28} />;
      case 'DollarSign':
        return <DollarSign size={28} />;
      case 'Smartphone':
        return <Smartphone size={28} />;
      default:
        return <Sparkles size={28} />;
    }
  };

  return (
    <section className="section-wrapper why-choose-section" id="why-choose-us">
      <div className="container">
        {/* Section Header */}
        <Reveal direction="up" className="section-header">
          <div className="section-badge yellow">
            <Sparkles size={14} />
            <span>OUR ADVANTAGES</span>
          </div>
          <h2 className="section-title">
            The FOODLY <span>Difference</span>
          </h2>
          <p className="section-subtitle">
            We hold ourselves to the highest standards of culinary quality, reliable delivery, and friendly customer satisfaction.
          </p>
        </Reveal>

        {/* 4 Feature Columns with Stagger */}
        <StaggerContainer className="why-choose-grid" staggerDelay={0.12}>
          {whyChooseUsData.map((item) => (
            <StaggerItem key={item.id}>
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className={`why-choose-card bg-soft-${item.colorTheme}`}
              >
                <div className="why-card-top">
                  <div className={`why-icon-bubble ${item.colorTheme}`}>
                    {renderIcon(item.icon)}
                  </div>
                  <span className="why-emoji-badge">{item.iconEmoji}</span>
                </div>

                <h3 className="why-card-title">{item.title}</h3>
                <p className="why-card-desc">{item.description}</p>

                <div className="why-card-check">
                  <div className="check-dot">
                    <Check size={12} color="#FFFFFF" strokeWidth={3} />
                  </div>
                  <span>Quality Guaranteed</span>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default WhyChooseUs;
