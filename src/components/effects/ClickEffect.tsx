'use client';

import React, { useEffect, useCallback, useRef } from 'react';

const ClickEffect: React.FC = () => {
  const clickEffectContainerRef = useRef<HTMLDivElement | null>(null);

  const createClickElement = useCallback((x: number, y: number) => {
    if (!clickEffectContainerRef.current) return;

    const clickEl = document.createElement('span');
    clickEl.className = 'rupee-click-element'; // Use different class
    clickEl.textContent = '₹';
    clickEl.style.left = `${x}px`;
    clickEl.style.top = `${y}px`;

    clickEffectContainerRef.current.appendChild(clickEl);

    // Remove after animation
    clickEl.addEventListener('animationend', () => {
      try {
        clickEffectContainerRef.current?.removeChild(clickEl);
      } catch (e) {
        // Ignore if already removed
      }
    });
  }, []);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      createClickElement(event.clientX, event.clientY);
    };

    // Create container on mount (shares properties with trail container)
    const container = document.createElement('div');
    container.id = "rupee-click-container"; // Different ID just in case
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.pointerEvents = 'none';
    container.style.zIndex = '9998'; // Below trail if needed, but handled by element z-index too
    document.body.appendChild(container);
    clickEffectContainerRef.current = container;

    window.addEventListener('click', handleClick);

    // Cleanup
    return () => {
      window.removeEventListener('click', handleClick);
      if (clickEffectContainerRef.current) {
        document.body.removeChild(clickEffectContainerRef.current);
        clickEffectContainerRef.current = null;
      }
    };
  }, [createClickElement]);

  return null; // No direct rendering
};

export default ClickEffect; 