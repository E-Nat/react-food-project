import React from 'react';
import { motion } from 'framer-motion';

export const GlassCard = ({
  children,
  className = '',
  hoverLift = true,
  hoverScale = 1.02,
  hoverY = -6,
  onClick,
  ...props
}) => {
  return (
    <motion.div
      whileHover={
        hoverLift
          ? {
              y: hoverY,
              scale: hoverScale,
              transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
            }
          : undefined
      }
      whileTap={hoverLift ? { scale: 0.98 } : undefined}
      className={`glass-card ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;
