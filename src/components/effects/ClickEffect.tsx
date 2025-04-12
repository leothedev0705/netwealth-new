'use client';

import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';

const ClickEffect = () => {
  const [clicks, setClicks] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const newClick = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
      };
      setClicks((prevClicks) => [...prevClicks, newClick]);

      // Remove the click effect after the animation duration
      setTimeout(() => {
        setClicks((prev) => prev.filter((click) => click.id !== newClick.id));
      }, 600); // Match animation duration in CSS
    };

    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, []); // Empty dependency array ensures this runs only once

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]">
      {clicks.map((click) => (
        <div
          key={click.id}
          className="click-effect absolute rounded-full"
          style={{
            left: `${click.x}px`,
            top: `${click.y}px`,
          }}
        />
      ))}
    </div>
  );
};

export default ClickEffect; 