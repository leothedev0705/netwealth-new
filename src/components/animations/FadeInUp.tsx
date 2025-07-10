'use client';

import React, { useEffect, useState } from 'react';
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Reduce motion for mobile devices and respect user preferences
  const shouldReduceMotion = isMobile || (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduceMotion ? 10 : yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ 
        once: true, 
        amount: isMobile ? 0.1 : 0.2, // Lower threshold for mobile
        margin: isMobile ? "-50px" : "0px" // Start animation earlier on mobile
      }}
      transition={{
        delay: shouldReduceMotion ? delay * 0.5 : delay, // Faster on mobile
        duration: shouldReduceMotion ? duration * 0.7 : duration, // Shorter duration on mobile
        ease: "easeOut"
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default FadeInUp; 