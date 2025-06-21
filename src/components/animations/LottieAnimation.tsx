'use client';

import Lottie from 'lottie-react';
import React from 'react';

interface LottieAnimationProps {
  animationData: any;
}

const LottieAnimation: React.FC<LottieAnimationProps> = ({ animationData }) => {
  return <Lottie animationData={animationData} loop={true} style={{ height: 400 }} />;
};

export default LottieAnimation; 