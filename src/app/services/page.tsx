'use client'; // Ensure client component for hooks

import React from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"; // Import Card components
import { motion } from 'framer-motion'; // Import motion
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

// New detailed service structure
const serviceCategories = [
  {
    id: "loans",
    categoryIcon: Landmark,
    categoryTitle: "Comprehensive Lending Solutions",
    categoryDescription: "Strategic borrowing options to achieve your financial milestones, from property acquisition to business growth.",
    items: [
      { icon: Home, title: "Home Loan", description: "Finance your dream property purchase, construction, or renovation with tailored guidance." },
      { icon: Briefcase, title: "Business Loan", description: "Structured financing solutions for business expansion, operational needs, or working capital." },
      { icon: Car, title: "Auto Loan", description: "Competitive financing options to help you acquire your desired vehicle." },
      { icon: Building, title: "Loan Against Property (LAP)", description: "Unlock the equity in your property for various financial needs like business or education." },
      { icon: Receipt, title: "Loan Against Rental Discounting", description: "Leverage future rental income for immediate liquidity needs." },
      { icon: Construction, title: "Construction Funding", description: "Financial support specifically designed for property construction projects." },
      { icon: TrendingUp, title: "IPO Funding", description: "Capitalize on Initial Public Offering opportunities with dedicated funding." },
      { icon: Landmark, title: "Loan Against Shares & Mutual Funds", description: "Access liquidity against your securities portfolio without selling your investments." }
    ]
  },
  {
    id: "insurance",
    categoryIcon: Shield,
    categoryTitle: "Robust Protection Planning",
    categoryDescription: "Secure your financial future against life's uncertainties with comprehensive insurance coverage.",
    items: [
      { icon: LifeBuoy, title: "Life Insurance", description: "Ensure financial security for your loved ones in your absence with term plans and endowment policies." },
      { icon: HeartPulse, title: "Health Insurance", description: "Protect yourself and your family from rising medical costs with comprehensive health coverage." },
      { icon: Umbrella, title: "General Insurance", description: "Safeguard your valuable assets like home, vehicles, and travel against unforeseen events." },
      { icon: PiggyBank, title: "Retirement Planning", description: "Build a secure financial future post-retirement through dedicated plans and strategies." },
      { icon: GraduationCap, title: "Education Planning", description: "Ensure your children's educational aspirations are met with targeted savings and investment plans." }
    ]
  },
  {
    id: "investment",
    categoryIcon: TrendingUp,
    categoryTitle: "Strategic Investment Management",
    categoryDescription: "Grow your wealth purposefully with diversified investment strategies tailored to your goals and risk appetite.",
    items: [
      { icon: Repeat, title: "Systematic Investment Plan (SIP)", description: "Invest regularly in mutual funds to benefit from compounding and rupee cost averaging." },
      { icon: Database, title: "Mutual Funds", description: "Access diversified portfolios across various asset classes managed by professional fund managers." },
      { icon: FileText, title: "Portfolio Management Services (PMS)", description: "Personalized equity portfolio management for sophisticated investors seeking active strategies." },
      { icon: Replace, title: "Systematic Withdrawal Plan (SWP)", description: "Generate regular income from your mutual fund investments post-retirement or for specific needs." },
      { icon: CandlestickChart, title: "Stocks (Short & Long Term)", description: "Direct equity investments in the stock market for potential growth, based on thorough market analysis." }
    ]
  },
  {
    id: "fixed-deposits",
    categoryIcon: Banknote,
    categoryTitle: "Secure Fixed Deposits",
    categoryDescription: "Reliable fixed-income options offering stability and predictable returns for conservative investors.",
    items: [
      { icon: Building2, title: "Corporate Fixed Deposits", description: "Potentially higher interest rates compared to bank FDs from reputable companies like Shriram Finance and Bajaj Finance." }
    ]
  }
];

// Animation variants (Add this back)
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const ServicesPage = () => {
  return (
    <>
      {/* Page Hero Section (Keep as is) */}
      <section className="bg-gradient-to-r from-slate-50 to-slate-100 py-24 px-6 text-center">
        <div className="container mx-auto">
          <p className="text-primary font-semibold text-sm tracking-wider uppercase mb-2">Our Wealth Advisory Services</p>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">Comprehensive Solutions for Your Financial Needs</h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Explore our diverse range of financial services designed to protect, grow, and manage your wealth effectively.
          </p>
        </div>
      </section>

      {/* Services Details Sections - Updated Loop with motion */}
      {serviceCategories.map((category, index) => (
        <section
          key={category.id}
          id={category.id}
          className={`py-16 md:py-20 px-6 ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}
        >
          <div className="container mx-auto">
            {/* Category Header */}
            <motion.div // Add motion back
              className="text-center mb-12 md:mb-16 max-w-3xl mx-auto"
              initial="initial" // Add animation props
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
            <motion.div // Add motion back
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto"
               initial="initial" // Add animation props
               whileInView="animate"
               viewport={{ once: true, amount: 0.2 }} // Trigger slightly earlier for grid
               transition={{ duration: 0.5, delay: 0.2 }} // Slight delay after header
               variants={fadeIn} // Simple fade-in for the whole grid container
            >
              {category.items.map((item, itemIndex) => (
                <Card key={itemIndex} className="text-center shadow-sm hover:shadow-lg transition-shadow duration-300 border border-slate-100 bg-white flex flex-col">
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
              ))}
            </motion.div>
          </div>
        </section>
      ))}

      {/* CTA Section (Updated Text) */}
      <section className="py-20 px-6 bg-gradient-to-r from-slate-800 to-slate-900 text-white"> 
         <div className="container mx-auto text-center">
           <h2 className="text-3xl font-bold mb-6 text-slate-100">Ready to Secure Your Financial Future?</h2>
           <p className="mb-8 max-w-xl mx-auto text-slate-300">Contact us today for a personalized consultation and discover how our comprehensive financial solutions can help you achieve your goals.</p>
           <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 hover:text-white font-semibold" asChild>
             <a href="/contact">Get Personalized Advice</a>{/* Use Link component if routing internally */}
           </Button>
         </div>
      </section>
    </>
  );
};

export default ServicesPage; 