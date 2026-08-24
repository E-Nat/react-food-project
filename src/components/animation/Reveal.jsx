import React from 'react';
import { motion } from 'framer-motion';

/**
 * Reusable Reveal component using Framer Motion
 * Consistent easing: [0.22, 1, 0.36, 1]
 * Default: opacity 0 -> 1, y 40 -> 0, duration 0.75s
 */
export const Reveal = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.75,
  className = '',
  cascade = false,
  once = true,
  scale = false,
  ...props
}) => {
  const getVariants = () => {
    let initialX = 0;
    let initialY = 0;
    let initialScale = scale ? 0.92 : 1;

    switch (direction) {
      case 'up':
        initialY = 40;
        break;
      case 'down':
        initialY = -40;
        break;
      case 'left':
        initialX = 40;
        break;
      case 'right':
        initialX = -40;
        break;
      default:
        initialY = 40;
    }

    return {
      hidden: {
        opacity: 0,
        x: initialX,
        y: initialY,
        scale: initialScale,
      },
      visible: {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        transition: {
          duration,
          delay,
          ease: [0.22, 1, 0.36, 1],
        },
      },
    };
  };

  return (
    <motion.div
      variants={getVariants()}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-40px' }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;
