'use client'; // Mark this component as a Client Component

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Shield, TrendingUp, Home, ArrowRight, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';

const servicesData = [
  {
    id: 'protection',
    icon: Shield,
    title: 'Protection',
    description:
      'Comprehensive insurance coverage (Life, General, Health) to safeguard what matters most.',
    bgColor: 'bg-teal-50',
    textColor: 'text-teal-600',
    buttonClass: 'bg-teal-500 hover:bg-teal-600',
  },
  {
    id: 'investing',
    icon: TrendingUp,
    title: 'Investing',
    description:
      'Expert advice for Mutual Funds, FDs, PMS/AIF, and portfolio management to grow your wealth.',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-600',
    buttonClass: 'bg-blue-500 hover:bg-blue-600',
  },
  {
    id: 'borrowing',
    icon: Home,
    title: 'Borrowing',
    description:
      'Personalized loan options for your dream home, property, or leveraging shares.',
    bgColor: 'bg-indigo-50',
    textColor: 'text-indigo-600',
    buttonClass: 'bg-indigo-500 hover:bg-indigo-600',
  },
];

const Services = () => {
  return (
    <section className="bg-slate-50 py-20 px-6 md:py-32">
      <div className="container mx-auto">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-1.5 text-sm font-semibold text-[#002855]">
            <Target className="h-4 w-4" />
            <span>Our Core Services</span>
          </div>
          <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-[#002855] sm:text-5xl">
            A Complete Financial Ecosystem
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            We offer a wide array of products and investment solutions tailored
            to help you build a secure and prosperous future.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {servicesData.map((service, index) => {
            const targetSectionId =
              service.id === 'protection'
                ? 'insurance'
                : service.id === 'borrowing'
                ? 'loans'
                : service.id;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg transition-shadow duration-300 hover:shadow-2xl"
              >
                <div className="flex-grow p-8">
                  <div
                    className={`mb-6 flex h-14 w-14 items-center justify-center rounded-xl ${service.bgColor}`}
                  >
                    <service.icon className={`h-8 w-8 ${service.textColor}`} />
                  </div>
                  <h3 className="text-2xl font-bold text-[#002855]">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-slate-600">{service.description}</p>
                </div>
                <div className="bg-slate-50 p-6">
                  <Link href={`/services#${targetSectionId}`}>
                    <Button className="w-full font-semibold">
                      Explore {service.title}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services; 