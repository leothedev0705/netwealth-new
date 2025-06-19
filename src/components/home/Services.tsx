'use client'; // Mark this component as a Client Component

import React, { lazy, Suspense } from 'react';
import Link from 'next/link'; // Import Link
import Image from 'next/image'; // Import Image
import { motion } from 'framer-motion'; // Import motion
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Shield, TrendingUp, Home, ArrowRight, Target } from 'lucide-react';

const servicesData = [
  {
    id: 'protection',
    icon: Shield,
    title: "Protection",
    description: "Insurance isn't just about protection—it's about peace of mind. Comprehensive coverage (Life, General, Health, Fire, Marine) safeguarding what matters most.",
  },
  {
    id: 'investing',
    icon: TrendingUp,
    title: "Investing",
    description: "Secure your future and grow your wealth. Expert advice for Mutual Funds, Corporate FDs, PMS/AIF, Tax Planning, and portfolio management.",
  },
  {
    id: 'borrowing',
    icon: Home,
    title: "Borrowing",
    description: "Personalized loan options for your dream home or leveraging assets. Guidance through home loans, loans against property, and loans against shares.",
  },
];

// Function to create Bitcoin rain effect
const createBitcoinRain = (event: React.MouseEvent<HTMLDivElement>) => {
  const card = event.currentTarget;
  const cooldownPeriod = 2000; // 2 seconds in milliseconds
  const currentTime = Date.now();
  const lastAnimatedTimestamp = parseInt(card.dataset.lastAnimated || '0', 10);

  // Check if cooldown period has passed
  if (currentTime - lastAnimatedTimestamp < cooldownPeriod) {
    return; // Don't run animation if it ran recently
  }

  // Update the timestamp before starting the animation
  card.dataset.lastAnimated = currentTime.toString();

  const numberOfCoins = 10; // How many coins to drop
  const animationDuration = 2000; // 2 seconds in milliseconds

  for (let i = 0; i < numberOfCoins; i++) {
    const coin = document.createElement('span');
    coin.classList.add('bitcoin-rain-element');
    coin.textContent = '₿'; // Bitcoin symbol

    // Random horizontal position within the card
    const randomLeft = Math.random() * card.offsetWidth;
    coin.style.left = `${randomLeft}px`;

    // Stagger the start slightly for a more natural fall
    coin.style.animationDelay = `${Math.random() * 0.5}s`;

    card.appendChild(coin);

    // Remove the coin after the animation finishes
    setTimeout(() => {
        // Check if the coin is still a child before removing
        if (coin.parentNode === card) {
            card.removeChild(coin);
        }
    }, animationDuration + 500); // Add a small buffer
  }
};

// Lazy load the Card components
const LazyCard = lazy(() => import("@/components/ui/card").then(mod => ({ default: mod.Card })));
const LazyCardContent = lazy(() => import("@/components/ui/card").then(mod => ({ default: mod.CardContent })));
const LazyCardHeader = lazy(() => import("@/components/ui/card").then(mod => ({ default: mod.CardHeader })));
const LazyCardTitle = lazy(() => import("@/components/ui/card").then(mod => ({ default: mod.CardTitle })));
const LazyCardDescription = lazy(() => import("@/components/ui/card").then(mod => ({ default: mod.CardDescription })));

const Services = () => {
  return (
    <section className="bg-white py-20 px-6 md:py-32">
      <div className="container mx-auto">
        <div className="text-center md:text-left mb-16 max-w-3xl mx-auto md:mx-0">
          <p className="text-primary font-semibold text-sm tracking-wider uppercase flex items-center gap-2 justify-center md:justify-start mb-2">
            <Target className="h-5 w-5" />
            Our Services
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Expert Finance & Consult Services for Success
          </h2>
          <p className="text-gray-600 leading-relaxed">
             Our Wealth advisory services offer a wide array of products and investment solutions tailored to help you build a secure and prosperous future.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {servicesData.map((service, index) => {
            // Map internal ID to the actual section ID on the /services page
            const targetSectionId = service.id === 'protection' ? 'insurance' : service.id === 'borrowing' ? 'loans' : service.id;
            return (
              <Link
                key={service.id}
                href={`/services#${targetSectionId}`}
                className="block group"
              >
                <motion.div
                  className="h-full"
                  whileHover={{ 
                    rotateY: 10, 
                    rotateX: -5, 
                    scale: 1.04,
                    y: -4
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  onMouseEnter={createBitcoinRain}
                >
                  <Suspense fallback={<div className="bg-white p-6 rounded-lg shadow-md border-slate-200 animate-pulse" />}>
                    <LazyCard 
                      className="bg-gray-50 group-hover:shadow-xl transition-shadow duration-300 overflow-hidden relative rounded-xl border-gray-200 h-full flex flex-col" 
                    >
                      <LazyCardHeader>
                          <div className="mb-4 bg-green-100 p-3 rounded-full w-fit">
                            <service.icon className="h-6 w-6 text-green-700" />
                          </div>
                        <LazyCardTitle className="text-xl font-semibold text-gray-800">{service.title}</LazyCardTitle>
                      </LazyCardHeader>
                      <LazyCardContent className="flex-grow flex flex-col justify-between"> 
                        <div> 
                          <LazyCardDescription className="text-gray-600 text-sm leading-relaxed">
                            {service.description}
                          </LazyCardDescription>
                        </div>
                        <div className="mt-4 flex items-center gap-2 self-start"> 
                          <span className="text-sm text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            Click for more information
                          </span>
                          <ArrowRight className="h-5 w-5 text-green-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                        </div>
                      </LazyCardContent>
                      <div className="absolute -bottom-4 -right-4 text-[100px] font-bold text-gray-200/50 opacity-50 group-hover:opacity-100 transition-opacity duration-300 -z-0">
                         0{index + 1}
                      </div>
                    </LazyCard>
                  </Suspense>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services; 