'use client'; // Ensure client component for hooks

import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"; // Import Card components
import { motion } from 'framer-motion'; // Import motion
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { cn } from "@/lib/utils";
// Remove unused Link import if it exists
import {
  Shield, TrendingUp, Home, LifeBuoy, Banknote, PiggyBank, FileText, Umbrella, Library, HeartPulse, ShieldCheck, Briefcase, GraduationCap,
  Landmark, // Loans Category
  Car, // Auto Loan
  Receipt, // Rental Discounting
  Construction, // Construction Funding
  Repeat, // SIP
  Database, // Mutual Fund
  Replace, // SWP
  CandlestickChart, // Stocks
  Building, // LAP (using this, fallback Library)
  Building2 // Corporate FDs
} from 'lucide-react';
import { serviceCategories } from './data';

// Animation variants
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const ServicesPage = () => {
  const params = useParams();
  const activeCategory = params?.category as string || '';

  return (
    <>
      {/* Page Hero Section */}
      <section className="bg-gradient-to-br from-yellow-50 to-yellow-100 py-28 px-6 text-center relative overflow-hidden">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-center gap-12">
            <div className="text-left max-w-2xl">
              <p className="text-yellow-600 font-semibold text-sm tracking-wider uppercase mb-3">Our Services</p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-yellow-900 mb-5">Comprehensive Financial Solutions</h1>
              <p className="text-lg text-yellow-700 mb-6">
                We offer a wide range of financial services tailored to help you achieve your financial goals and secure your future.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-yellow-200">
                  <Image
                    src="/assets/shrikant-agarwal.png"
                    alt="Shrikant Agarwal - Founder"
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-yellow-900">Shrikant Agarwal</p>
                  <p className="text-sm text-yellow-600">Founder & CEO</p>
                </div>
              </div>
            </div>
            <div className="relative w-[300px] h-[300px] mx-auto rounded-full bg-yellow-100/90 shadow-lg p-4 flex items-center justify-center border-4 border-yellow-200">
              <Image
                src="/assets/logo.png"
                alt="Net Wealth India Logo"
                width={250}
                height={250}
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Details Sections */}
      {serviceCategories.map((category, index) => (
        <section
          key={category.id}
          id={category.id}
          className={`py-16 md:py-20 px-6 ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}
        >
          <div className="container mx-auto">
            {/* Category Header */}
            <motion.div
              className="text-center mb-12 md:mb-16 max-w-3xl mx-auto"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeIn}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-block bg-primary/10 p-4 rounded-full mb-4">
                <category.categoryIcon className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-3">{category.categoryTitle}</h2>
              <p className="text-lg text-slate-600">{category.categoryDescription}</p>
            </motion.div>

            {/* Service Items Grid */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              variants={fadeIn}
            >
              {category.items.map((item, itemIndex) => (
                <Link
                  key={itemIndex}
                  href={`/services/${category.id}/${item.title.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <Card 
                    className="text-center shadow-sm hover:shadow-lg transition-shadow duration-300 border border-slate-100 bg-white flex flex-col hover:border-primary/30"
                  >
                    <CardHeader className="items-center pt-6">
                      <div className="bg-primary/10 p-3 rounded-full mb-3 w-fit">
                        <item.icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg font-semibold text-slate-700">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <CardDescription className="text-sm leading-relaxed text-slate-500">
                        {item.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </motion.div>
          </div>
        </section>
      ))}

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-yellow-500 to-yellow-600 py-20 px-6">
        <div className="container mx-auto text-center">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
              <Image
                src="/assets/shrikant-agarwal.png"
                alt="Shrikant Agarwal - Founder"
                width={128}
                height={128}
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6 text-white">Ready to Secure Your Financial Future?</h2>
              <p className="mb-8 max-w-xl mx-auto text-yellow-100">Contact us today for a personalized consultation and discover how our comprehensive financial solutions can help you achieve your goals.</p>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 hover:text-white font-semibold" asChild>
                <a href="/contact">Get Personalized Advice</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ServicesPage; 