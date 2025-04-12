'use client';

import React, { useEffect, useRef, useCallback } from 'react';
// import { motion } from 'framer-motion';

// const MAX_TRAIL_ELEMENTS = 15; 
// const THROTTLE_DELAY = 50; // Milliseconds to throttle mouse move events

const CursorTrail: React.FC = () => {
  const trailContainerRef = useRef<HTMLDivElement | null>(null);
  const trailElementsRef = useRef<HTMLSpanElement[]>([]);
  const lastPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const animationFrameRef = useRef<number | null>(null);
  const elementIndexRef = useRef<number>(0);
  const TRAIL_LENGTH = 15; // Number of trail elements
  const FADE_DELAY = 30; // Milliseconds between element fades

  // Function to create or reuse a trail element
  const createTrailElement = useCallback((x: number, y: number) => {
    if (!trailContainerRef.current) return;

    const trailEl = trailElementsRef.current[elementIndexRef.current];
    if (trailEl) {
      trailEl.style.left = `${x}px`;
      trailEl.style.top = `${y}px`;
      trailEl.style.opacity = '1'; // Reset opacity

      // Trigger fade out after a delay
      setTimeout(() => {
        trailEl.style.opacity = '0';
      }, FADE_DELAY * TRAIL_LENGTH); // Fade out after the full trail cycle time

      elementIndexRef.current = (elementIndexRef.current + 1) % TRAIL_LENGTH;
    }
  }, []);

  // Effect to initialize trail elements and container
  useEffect(() => {
    // Create container if it doesn't exist
    const container = document.createElement('div');
    container.id = "rupee-trail-container";
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.pointerEvents = 'none';
    container.style.zIndex = '9999';
    document.body.appendChild(container);
    trailContainerRef.current = container;

    // Create trail elements
    for (let i = 0; i < TRAIL_LENGTH; i++) {
      const el = document.createElement('span');
      el.className = 'rupee-trail-element';
      el.textContent = '₹'; // Rupee symbol
      el.style.position = 'absolute';
      el.style.opacity = '0';
      el.style.transition = `opacity ${FADE_DELAY * TRAIL_LENGTH / 1000}s ease-out`; // Smooth fade
      trailContainerRef.current.appendChild(el);
      trailElementsRef.current.push(el);
    }

    // Cleanup function
    return () => {
      if (trailContainerRef.current) {
        document.body.removeChild(trailContainerRef.current);
        trailContainerRef.current = null;
      }
      trailElementsRef.current = [];
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Effect to handle mouse movement
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      lastPosRef.current = { x: event.clientX, y: event.clientY };
    };

    const updateTrail = () => {
      createTrailElement(lastPosRef.current.x, lastPosRef.current.y);
      animationFrameRef.current = requestAnimationFrame(updateTrail);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animationFrameRef.current = requestAnimationFrame(updateTrail);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [createTrailElement]);

  return null; // Component doesn't render anything itself
};

export default CursorTrail; 