'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, useAnimation } from 'framer-motion';

type Company = {
  id: string;
  name: string;
  shortName: string;
  filename: string;
};

type InsuranceCategory = 'Life_Insurance' | 'General_Insurance' | 'Health_Insurance';

type Companies = {
  lifeInsurance: Company[];
  generalInsurance: Company[];
  healthInsurance: Company[];
};

const companies: Companies = {
  lifeInsurance: [
    { id: 'lic', name: 'LIC', shortName: 'LIC', filename: 'Lic.png' },
    { id: 'sbi-life', name: 'SBI Life', shortName: 'SBI Life', filename: 'SBILife.png' },
    { id: 'pnb-metlife', name: 'PNB MetLife', shortName: 'PNB MetLife', filename: 'PnBMetLife.png' },
    { id: 'tata-aia', name: 'TATA AIA', shortName: 'TATA AIA', filename: 'TataAIA.png' },
    { id: 'icici-prudential', name: 'ICICI Prudential', shortName: 'ICICI Pru', filename: 'ICICI.png' },
    { id: 'hdfc-life', name: 'HDFC Life', shortName: 'HDFC Life', filename: 'HDFC.png' },
    { id: 'bajaj-life', name: 'Bajaj Allianz', shortName: 'Bajaj A', filename: 'BAJAJ.png' },
  ],
  generalInsurance: [
    { id: 'icici-lombard', name: 'ICICI Lombard', shortName: 'ICICI L', filename: 'ICICILOMBARD.JPG' },
    { id: 'go-digit', name: 'Go Digit', shortName: 'Go D', filename: 'GODigit.JPG' },
    { id: 'royal-sundaram', name: 'Royal Sundaram', shortName: 'Royal S', filename: 'RoyalSunadaram.JPG' },
    { id: 'hdfc-ergo', name: 'HDFC ERGO', shortName: 'HDFC E', filename: 'ERGOHDFC.JPG' },
    { id: 'tata-aig', name: 'TATA AIG', shortName: 'TATA AIG', filename: 'TATAAIG.JPG' },
  ],
  healthInsurance: [
    { id: 'care-health', name: 'Care Health', shortName: 'Care H', filename: 'Care.JPG' },
    { id: 'manipal-cigna', name: 'Manipal Cigna', shortName: 'Manipal C', filename: 'ManipalCigna.JPG' },
    { id: 'star-health', name: 'Star Health', shortName: 'Star H', filename: 'Starlife.JPG' },
    { id: 'niva-bupa', name: 'Niva Bupa', shortName: 'Niva B', filename: 'Niva.JPG' },
  ],
};

const getCategoryAnimation = (category: InsuranceCategory) => {
  switch (category) {
    case 'Life_Insurance':
      return {
        gradient: "bg-gradient-to-r from-rose-50 via-white to-rose-50",
        underlineColor: "bg-rose-600",
      };
    case 'General_Insurance':
      return {
        gradient: "bg-gradient-to-r from-blue-50 via-white to-blue-50",
        underlineColor: "bg-blue-600",
      };
    case 'Health_Insurance':
      return {
        gradient: "bg-gradient-to-r from-green-50 via-white to-green-50",
        underlineColor: "bg-green-600",
      };
  };
};

const CompanyLogo = ({ 
  filename,
  name,
  category 
}: { 
  filename: string;
  name: string;
  category: InsuranceCategory;
}) => {
  return (
    <div className="flex items-center justify-center mx-6">
      <div className="relative w-44 h-28">
        <Image
          src={`/assets/companies/${category}/${filename}`}
          alt={name}
          fill
          className="object-contain"
        />
      </div>
    </div>
  );
};

// Animation constants for consistent speed across all carousels
const CAROUSEL_ANIMATION = {
  duration: 25,
  ease: "linear" as const,
  repeat: Infinity,
  repeatType: "loop" as const,
  repeatDelay: 0,
};

const ScrollingLogos = ({ category, title }: { category: InsuranceCategory; title: string }) => {
  const controls = useAnimation();
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const { gradient, underlineColor } = getCategoryAnimation(category);
  const animationRef = useRef<any>(null);

  const getLogos = () => {
    switch (category) {
      case 'Life_Insurance':
        return ['Lic.png', 'BAJAJ.png', 'BIRLA.png', 'ICICI.png', 'TataAIA.png', 'PnBMetLife.png', 'SBILife.png'];
      case 'General_Insurance':
        return ['BAJAJGEN.JPG', 'TATAAIG.JPG', 'ERGOHDFC.JPG', 'ICICILOMBARD.JPG', 'RoyalSunadaram.JPG', 'GODigit.JPG', 'NewIndia.JPG'];
      case 'Health_Insurance':
        return ['bajajHealth.JPG', 'aiglifetata.JPG', 'HJdfcerogo.JPG', 'LombardHealth.JPG', 'Niva.JPG', 'Care.JPG', 'Starlife.JPG', 'ManipalCigna.JPG'];
      default:
        return [];
    }
  };

  const logos = getLogos();
  const triplicatedLogos = [...logos, ...logos, ...logos];

  useEffect(() => {
    if (containerRef.current) {
      const updateWidth = () => {
        if (containerRef.current) {
          const width = containerRef.current.scrollWidth / 3;
          setContainerWidth(width);
        }
      };
      updateWidth();
      window.addEventListener('resize', updateWidth);
      return () => window.removeEventListener('resize', updateWidth);
    }
  }, []);

  useEffect(() => {
    if (containerWidth > 0) {
      const startAnimation = () => {
        animationRef.current = controls.start({
          x: -containerWidth,
          transition: CAROUSEL_ANIMATION,
        });
      };

      if (!isHovered) {
        startAnimation();
      } else {
        controls.stop();
      }
    }

    return () => {
      if (animationRef.current) {
        controls.stop();
      }
    };
  }, [isHovered, containerWidth, controls]);

  return (
    <motion.div 
      className="mb-20"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="relative mb-12 text-center">
        <h3 className="text-2xl font-bold text-gray-900 inline-block">
          {title}
        </h3>
        <div className={`h-1 mt-2 mx-auto w-[60px] ${underlineColor}`} />
      </div>

      <div 
        className={`relative overflow-hidden w-full py-8 px-4 ${gradient} rounded-xl`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />
        
        <motion.div
          ref={containerRef}
          className="flex whitespace-nowrap"
          animate={controls}
          style={{ willChange: 'transform' }}
        >
          {triplicatedLogos.map((logo, index) => (
            <CompanyLogo
              key={`${logo}-${index}`}
              filename={logo}
              name={logo.split('.')[0]}
              category={category}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

const CompanyCarousel = () => {
  return (
    <section className="w-full bg-gradient-to-b from-white to-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Trusted by Leading Insurance Companies
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We partner with India's most reliable insurance providers to ensure the best coverage for our clients
          </p>
        </motion.div>

        <ScrollingLogos
          category="Life_Insurance"
          title="Life Insurance Partners"
        />

        <ScrollingLogos
          category="General_Insurance"
          title="General Insurance Partners"
        />

        <ScrollingLogos
          category="Health_Insurance"
          title="Health Insurance Partners"
        />
      </div>
    </section>
  );
};

export default CompanyCarousel; 