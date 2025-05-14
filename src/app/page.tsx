import React, { Suspense } from 'react';
import { Button } from "@/components/ui/button";
import { PlayCircle, TrendingUp, IndianRupee } from 'lucide-react';
import Image from 'next/image';
// import Partners from "@/components/home/Partners";
import AboutUs from "@/components/home/AboutUs";
import Services from "@/components/home/Services";
import FadeInUp from "@/components/animations/FadeInUp";
import CompanyCarousel from '@/components/carousel/CompanyCarousel';

// Lazy load the decorative elements
const DecorativeElements = () => (
  <div className="absolute inset-0 -z-10 opacity-10 overflow-hidden">
    <div className="absolute top-10 right-10 w-32 h-32 border-2 border-primary/50 rounded-full opacity-50"></div>
    <div className="absolute bottom-20 left-20 w-48 h-48 border-2 border-primary/20 rounded-full opacity-30"></div>
    <div className="absolute bottom-5 right-1/4 w-20 h-20 bg-primary/20 rounded-lg transform rotate-45 opacity-40"></div>

    <TrendingUp className="absolute top-[15%] left-[10%] h-12 w-12 text-primary/60 animate-[float_6s_ease-in-out_infinite]" />
    <IndianRupee className="absolute bottom-[25%] right-[15%] h-10 w-10 text-emerald-400/60 animate-[float_7s_ease-in-out_infinite_0.5s]" />
    <TrendingUp className="absolute bottom-[10%] left-[30%] h-8 w-8 text-primary/50 animate-[float_5s_ease-in-out_infinite_1s]" />
    <IndianRupee className="absolute top-[30%] right-[35%] h-16 w-16 text-emerald-400/50 animate-[float_8s_ease-in-out_infinite_0.2s]" />
  </div>
);

export default function Home() {
  return (
    <>
      <section className="bg-gradient-to-br from-green-50 to-green-100 py-20 px-6 md:py-32 relative overflow-hidden">
        <Suspense fallback={null}>
          <DecorativeElements />
        </Suspense>

        <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-6 text-center md:text-left">
            <div className="flex justify-center md:justify-start mb-6">
              <Image 
                src="/assets/Kalpvriksh.png"
                alt="Kalpvriksh - Let's Grow Together"
                width={150}
                height={150}
                className="object-contain"
                priority
              />
            </div>
            <p className="text-primary font-semibold text-sm tracking-wider uppercase flex items-center gap-2 justify-center md:justify-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              Welcome to Net Wealth India
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-green-900 leading-tight">
              Empowering your financial success journey
            </h1>
            <p className="text-lg text-green-700">
              Guiding you with expert insights and strategic solutions to achieve financial growth, stability, and long-term success.
            </p>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 mt-4 shadow-sm">
              <p className="text-green-800 font-medium">
                Trusted by Leading Insurance Companies
              </p>
              <p className="text-sm text-green-700 mt-1">
                Including Reliance, Tata AIA, Birla Sun Life, HDFC Life, and other major insurers in India
              </p>
            </div>
          </div>

          <div className="relative flex justify-center items-center mt-10 md:mt-0">
            <div className="relative w-full max-w-md h-[400px] md:h-[500px] lg:h-[600px] rounded-lg shadow-2xl overflow-hidden">
              <Image
                src="/assets/hero.png"
                alt="Financial professional ready to help with financial success"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
                quality={90}
                className="rounded-lg w-full h-full object-cover"
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
              />
            </div>
          </div>
        </div>
      </section>

      <Suspense fallback={<div className="h-96" />}>
        <FadeInUp delay={0.1}>
          <AboutUs />
        </FadeInUp>
      </Suspense>

      <Suspense fallback={<div className="h-96" />}>
        <FadeInUp delay={0.2}>
          <Services />
        </FadeInUp>
      </Suspense>

      <CompanyCarousel />

      {/* Other sections like Testimonials or CTA could go here */}
    </>
  );
}
