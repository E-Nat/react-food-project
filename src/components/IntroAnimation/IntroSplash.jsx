import React, { useState, useEffect } from 'react';
import { Sparkles, UtensilsCrossed } from 'lucide-react';
import './IntroSplash.css';

const IntroSplash = () => {
  const [visible, setVisible] = useState(() => {
    // Only show once per session or on first visit to keep it lightweight
    return !sessionStorage.getItem('foodly_intro_seen');
  });

  const [fadeExit, setFadeExit] = useState(false);

  useEffect(() => {
    if (!visible) return;

    // Fast 700ms timing
    const fadeTimer = setTimeout(() => {
      setFadeExit(true);
    }, 650);

    const removeTimer = setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem('foodly_intro_seen', 'true');
    }, 850);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div 
      className={`intro-splash-overlay ${fadeExit ? 'fade-out' : ''}`}
      onClick={() => setVisible(false)}
      role="banner"
      aria-label="Welcome to FOODLY"
    >
      <div className="intro-splash-content">
        <div className="intro-halo-ring" />
        <div className="intro-logo-mark">
          <UtensilsCrossed size={32} strokeWidth={2.4} className="intro-leaf-icon" />
        </div>
        <h1 className="intro-brand-name">
          FOODLY<span className="intro-dot">.</span>
        </h1>
        <p className="intro-tagline">Artisan Cuisine • Fresh Daily</p>
      </div>
    </div>
  );
};

export default IntroSplash;

