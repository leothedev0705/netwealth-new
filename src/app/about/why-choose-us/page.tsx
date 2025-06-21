'use client';

import React from 'react';
import {
  Award,
  Briefcase,
  Star,
  TrendingUp,
  Handshake,
  Globe,
  ArrowRight,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const valueProps = [
  {
    icon: Award,
    title: '15+ Years of BFSI Expertise',
    description:
      'Deep understanding of banking, insurance, and financial services, including roles at ICICI and HDFC Bank.',
  },
  {
    icon: Briefcase,
    title: 'Trusted HNI Portfolio Specialist',
    description:
      'Managed Imperia Portfolios worth over ₹120 Cr, focusing on long-term financial planning for high-net-worth clients.',
  },
  {
    icon: Star,
    title: 'Proven Track Record',
    description:
      'Recognized as an MDRT qualifier for 3 consecutive years, a global standard for financial professionals.',
  },
  {
    icon: TrendingUp,
    title: 'Holistic Financial Solutions',
    description:
      'Expertise in Mutual Funds, Insurance, FDs, and Loans to create customized and diversified investment portfolios.',
  },
  {
    icon: Handshake,
    title: 'Client-Centric Approach',
    description:
      'Focused on building long-term trust and ensuring seamless service delivery, leading to high client retention.',
  },
  {
    icon: Globe,
    title: 'Global Perspective',
    description:
      'Insights informed by international finance seminars and workshops across Europe and Asia.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function WhyChooseUsPage() {
  return (
    <div className="bg-slate-50">
      {/* Hero Section */}
      <section className="bg-white py-24 sm:py-32">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block rounded-full bg-blue-100 px-4 py-1.5 text-sm font-semibold text-[#002855]">
              Our Commitment to You
            </div>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-[#002855] sm:text-6xl">
              Why Choose NetWealth India?
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-lg text-slate-600">
              Discover what sets us apart and why clients trust us for their
              long-term financial growth and security.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Value Propositions Grid */}
      <section className="py-24 sm:py-32">
        <div className="container mx-auto px-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3"
          >
            {valueProps.map((prop) => (
              <motion.div
                key={prop.title}
                variants={itemVariants}
                className="flex flex-col items-start"
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100">
                  <prop.icon className="h-8 w-8 text-[#002855]" />
                </div>
                <h3 className="text-xl font-bold text-[#002855]">
                  {prop.title}
                </h3>
                <p className="mt-2 text-slate-600">{prop.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white">
        <div className="container mx-auto px-6 py-24 sm:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-extrabold text-[#002855] sm:text-4xl">
              Ready to Start Your Wealth Journey?
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Let's build a prosperous future together. Get in touch with our
              experts today for a personalized financial consultation.
            </p>
            <div className="mt-8">
              <Button asChild size="lg" className="bg-[#00b894] text-white hover:bg-[#00a383]">
                <Link href="/contact">
                  Contact Us <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 