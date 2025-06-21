'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Check, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const AboutUs = () => {
  const strengths = [
    'Comprehensive Financial Planning',
    'Expert Investment Advisory',
    'Personalized Insurance Solutions',
    'Retirement and Goal Planning',
  ];

  return (
    <section className="bg-white py-20 px-6 md:py-32">
      <div className="container mx-auto grid grid-cols-1 items-center gap-16 md:grid-cols-2 lg:gap-24">
        {/* Left Column: Image */}
        <div className="relative flex justify-center">
          <div className="absolute -top-8 -left-8 z-0 h-40 w-40 rounded-full bg-teal-100"></div>
          <div className="absolute -bottom-8 -right-8 z-0 h-40 w-40 rounded-full bg-blue-100"></div>
          <div className="relative z-10 h-[400px] w-[320px] sm:h-[450px] sm:w-[380px] overflow-hidden rounded-2xl border-8 border-white shadow-2xl">
            <Image
              src="/assets/shrikant-agarwal.png"
              alt="Shrikant Agarwal, Founder of NetWealth India"
              layout="fill"
              objectFit="cover"
              objectPosition="top"
              sizes="(max-width: 768px) 100vw, 380px"
            />
          </div>
        </div>

        {/* Right Column: Text Content */}
        <div className="space-y-6">
          <div className="inline-block rounded-full bg-blue-100 px-4 py-1.5 text-sm font-semibold text-[#002855]">
            Meet Our Founder
          </div>
          <h2 className="text-4xl font-extrabold tracking-tight text-[#002855] sm:text-5xl">
            Shrikant Agarwal
          </h2>
          <p className="text-lg text-slate-600">
            With over 25 years of experience in finance and consulting, Shrikant
            Agarwal leads NetWealth India with a passion for empowering
            individuals and businesses to achieve financial prosperity through
            data-driven strategies and unbiased advice.
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {strengths.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="flex-shrink-0 rounded-full bg-[#00b894] p-1.5 text-white">
                  <Check className="h-4 w-4" />
                </div>
                <span className="font-medium text-slate-700">{item}</span>
              </div>
            ))}
          </div>
          <div className="pt-4">
            <Button
              asChild
              size="lg"
              className="bg-[#002855] text-white hover:bg-blue-900"
            >
              <Link href="/about/why-choose-us">
                Learn More About Us <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs; 