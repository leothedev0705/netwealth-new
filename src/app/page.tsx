import React from 'react';
import { Button } from "@/components/ui/button";
import { PlayCircle, TrendingUp, IndianRupee } from 'lucide-react';
import Image from 'next/image';
// import Partners from "@/components/home/Partners";
import AboutUs from "@/components/home/AboutUs";
import Services from "@/components/home/Services";
import FadeInUp from "@/components/animations/FadeInUp";

export default function Home() {
  return (
    <>
      {/* Hero Section - Add animation class */}
      <section className="bg-slate-900 text-slate-200 py-20 px-6 md:py-32 relative overflow-hidden animate-breathing-bg">
        {/* Background decorative elements - use primary color */}
        <div className="absolute inset-0 -z-10 opacity-10 overflow-hidden">
          <div className="absolute top-10 right-10 w-32 h-32 border-2 border-primary/50 rounded-full opacity-50"></div>
          <div className="absolute bottom-20 left-20 w-48 h-48 border-2 border-primary/20 rounded-full opacity-30"></div>
          <div className="absolute bottom-5 right-1/4 w-20 h-20 bg-primary/20 rounded-lg transform rotate-45 opacity-40"></div>

          <TrendingUp className="absolute top-[15%] left-[10%] h-12 w-12 text-primary/60 animate-[float_6s_ease-in-out_infinite]" />
          <IndianRupee className="absolute bottom-[25%] right-[15%] h-10 w-10 text-emerald-400/60 animate-[float_7s_ease-in-out_infinite_0.5s]" />
          <TrendingUp className="absolute bottom-[10%] left-[30%] h-8 w-8 text-primary/50 animate-[float_5s_ease-in-out_infinite_1s]" />
          <IndianRupee className="absolute top-[30%] right-[35%] h-16 w-16 text-emerald-400/50 animate-[float_8s_ease-in-out_infinite_0.2s]" />
        </div>

        <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
          {/* Text Content */}
          <div className="space-y-6 text-center md:text-left">
            {/* Use primary for welcome text */}
            <p className="text-primary font-semibold text-sm tracking-wider uppercase flex items-center gap-2 justify-center md:justify-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              Welcome to Net Wealth India
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Empowering your financial success journey
            </h1>
            <p className="text-lg text-slate-300"> {/* Lighter text color */}
              Guiding you with expert insights and strategic solutions to achieve financial growth, stability, and long-term success.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center md:justify-start">
               {/* Use primary color for button */}
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground transition-transform duration-200 hover:scale-[1.03]">
                Get Started
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
              </Button>
              {/* Adjust outline button */}
              <Button size="lg" variant="outline" className="border-slate-500 text-white hover:bg-white/10 hover:text-white hover:border-white/80 transition-transform duration-200 hover:scale-[1.03]">
                <PlayCircle className="mr-2 h-5 w-5" />
                Introduction
              </Button>
            </div>
          </div>

          {/* Image Content */}
          <div className="relative flex justify-center items-center mt-10 md:mt-0">
            {/* Replace gradient placeholder with the Image component */}
            <div className="relative w-full max-w-md h-[400px] md:h-[500px] lg:h-[600px] rounded-lg shadow-2xl overflow-hidden"> {/* Added relative and overflow-hidden */}
              <Image
                src="/assets/hero.png" // Use path relative to public folder
                alt="Financial professional ready to help with financial success"
                fill // Use fill to cover the container
                style={{ objectFit: 'cover' }} // Ensure the image covers the area nicely
                priority // Prioritize loading for LCP
                className="rounded-lg" // Keep the rounded corners
              />
            </div>
             {/* Use primary color for badge */}
            <div className="absolute bottom-4 -left-4 md:bottom-10 md:-left-10 bg-primary text-primary-foreground p-4 rounded-lg shadow-xl z-20">
              <p className="text-3xl font-bold">25+</p>
              <p className="text-xs">Years of experience<br/>in finance</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <FadeInUp delay={0.1}> <AboutUs /> </FadeInUp>
      {/* Services Section - Adjust delay */}
      <FadeInUp delay={0.2}> <Services /> </FadeInUp> 

      {/* Other sections like Testimonials or CTA could go here */}
    </>
  );
}
