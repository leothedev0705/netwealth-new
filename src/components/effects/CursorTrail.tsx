'use client';

import React, { useEffect, useCallback, useRef } from 'react';

const MAX_TRAIL_ELEMENTS = 15; // Can reduce slightly for simpler effect
const THROTTLE_DELAY = 30; // Can be slightly faster

const CursorTrail: React.FC = () => {
  const lastTrailTime = useRef<number>(0);
  const trailElements = useRef<HTMLSpanElement[]>([]);
  const trailContainerRef = useRef<HTMLDivElement | null>(null);

  const createTrailElement = useCallback((x: number, y: number) => {
    if (!trailContainerRef.current) return;

    const now = Date.now();
    if (now - lastTrailTime.current < THROTTLE_DELAY) {
      return; 
    }
    lastTrailTime.current = now;

    const trailEl = document.createElement('span');
    // Use a different class and character
    trailEl.className = 'dot-trail-element'; 
    // trailEl.textContent = '•'; // Option 1: Dot character
    // Option 2: Empty span, styled as a circle in CSS
    trailEl.textContent = ''; 
    trailEl.style.left = `${x}px`;
    trailEl.style.top = `${y}px`;

    trailContainerRef.current.appendChild(trailEl);
    trailElements.current.push(trailEl);

    if (trailElements.current.length > MAX_TRAIL_ELEMENTS) {
      const oldEl = trailElements.current.shift();
      if (oldEl) {
          try { trailContainerRef.current.removeChild(oldEl); } catch(e) {}
      }
    }

    trailEl.addEventListener('animationend', () => {
      try {
        trailContainerRef.current?.removeChild(trailEl);
         const index = trailElements.current.indexOf(trailEl);
         if (index > -1) {
             trailElements.current.splice(index, 1);
         }
      } catch (e) {}
    });
  }, []);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
        // No offset needed for simple dot
        createTrailElement(event.clientX, event.clientY);
    };

    // Create container on mount
    const container = document.createElement('div');
    container.id = "dot-trail-container";
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.pointerEvents = 'none'; 
    container.style.zIndex = '9999';
    document.body.appendChild(container);
    trailContainerRef.current = container;

    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup on unmount
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (trailContainerRef.current) {
          try { document.body.removeChild(trailContainerRef.current); } catch(e) {}
          trailContainerRef.current = null;
      }
      trailElements.current = [];
    };
  }, [createTrailElement]);

  return null; // This component doesn't render anything itself
};

export default CursorTrail; 