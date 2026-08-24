import React from 'react';
import { motion } from 'framer-motion';

export const FloatingElement = ({
  children,
  duration = 5,
  yOffset = 12,
  rotateOffset = 2,
  delay = 0,
  className = '',
  ...props
}) => {
  return (
    <motion.div
      animate={{
        y: [0, -yOffset, 0],
        rotate: [0, rotateOffset, -rotateOffset, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut',
        delay,
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default FloatingElement;
