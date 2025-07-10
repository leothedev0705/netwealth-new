'use client';

import Lottie from 'lottie-react';
import React, { useEffect, useState } from 'react';

interface LottieAnimationProps {
  animationData: any;
  className?: string;
}

const LottieAnimation: React.FC<LottieAnimationProps> = ({ animationData, className = "" }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Reduce animation complexity on mobile for better performance
  const options = {
    animationData,
    loop: true,
    autoplay: true,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
      ...(isMobile && {
        // Reduce quality on mobile for better performance
        clearCanvas: true,
        progressiveLoad: true,
        hideOnTransparent: true
      })
    }
  };

  return (
    <div className={`w-full h-full flex items-center justify-center overflow-hidden ${className}`}>
      <Lottie 
        {...options}
        style={{ 
          width: isMobile ? '90%' : '100%', 
          height: isMobile ? '90%' : '100%',
          maxWidth: isMobile ? '280px' : '100%',
          maxHeight: isMobile ? '240px' : '100%',
          objectFit: 'contain'
        }} 
      />
    </div>
  );
};

export default LottieAnimation; 