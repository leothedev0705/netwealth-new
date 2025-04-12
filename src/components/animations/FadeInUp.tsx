'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface FadeInUpProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
  className?: string;
}

const FadeInUp: React.FC<FadeInUpProps> = ({
  children,
  delay = 0.2,
  duration = 0.6,
  yOffset = 20,
  className = ''
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }} // Trigger animation when 20% of the element is in view, run once
      transition={{
        delay,
        duration,
        ease: "easeOut"
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default FadeInUp; 