'use client';

import React, { lazy, Suspense } from 'react';
import Image from 'next/image';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Phone, CheckSquare, DollarSign, Briefcase, Users, Shield } from 'lucide-react';

// Lazy load the Card components
const LazyCard = lazy(() => import("@/components/ui/card").then(mod => ({ default: mod.Card })));
const LazyCardContent = lazy(() => import("@/components/ui/card").then(mod => ({ default: mod.CardContent })));

const AboutUs = () => {
  return (
    <section className="bg-slate-50 py-20 px-6 md:py-32">
      <div className="container mx-auto grid md:grid-cols-2 gap-16 items-center">
        {/* Image Column */}
        <div className="relative">
          <div className="relative w-full max-w-[500px] mx-auto h-[500px] rounded-2xl overflow-hidden shadow-xl">
            <Image 
              src="/assets/DeskImg.png" 
              alt="Professional desk setup" 
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, 500px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6">
              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">25+ Years Experience</p>
                    <p className="text-xs text-slate-600">Serving clients since 1998</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Text Column */}
        <div className="space-y-8">
          <div>
            <p className="text-primary font-semibold text-sm tracking-wider uppercase flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              About Us
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mt-2">
              Your Trusted Partner in Financial Growth
            </h2>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-700 mb-1">Expert Guidance</h4>
                <p className="text-slate-600">With decades of experience in finance and consulting, we provide tailored strategies to help you achieve sustainable growth.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-700 mb-1">Comprehensive Solutions</h4>
                <p className="text-slate-600">From protection to investments, we structure and plan portfolios to grow, protect, and preserve your wealth efficiently.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-700 mb-1">Always Available</h4>
                <p className="text-slate-600">Reach us anytime:</p>
                <p className="text-slate-600 text-sm mt-1">📞 9930777332, 9930115558</p>
                <p className="text-slate-600 text-sm">✉️ netwealthindia05@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs; 