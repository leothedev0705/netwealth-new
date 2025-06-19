'use client';
import React from 'react';
import { Award, Briefcase, Star, TrendingUp, Handshake, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

const valueProps = [
  {
    icon: <Award className="h-10 w-10 text-primary" />,
    title: 'Expertise Backed by 15+ Years in BFSI',
    description: 'Over 8+ years of experience in banking, insurance, and financial services, including roles in ICICI Prudential Life Insurance and HDFC Bank. Deep understanding of Retail Banking, HNI Portfolio Management, and Financial Advisory.'
  },
  {
    icon: <Briefcase className="h-10 w-10 text-primary" />,
    title: 'Trusted HNI Portfolio Specialist',
    description: 'Managed an Imperia Portfolio worth ₹120 Cr at HDFC Bank. Specialized in handling High Net-worth Individuals (HNIs), focusing on long-term financial planning and holistic wealth building.'
  },
  {
    icon: <Star className="h-10 w-10 text-primary" />,
    title: 'Proven Track Record',
    description: 'MDRT qualifier for 3 consecutive years (2016, 2017, 2018) – a global recognition of top-performing financial professionals. Multiple performance awards at ICICI Prudential (e.g., "Profitable Champ" across multiple years).'
  },
  {
    icon: <TrendingUp className="h-10 w-10 text-primary" />,
    title: 'Full-Spectrum Financial Solutions',
    description: 'Cross-selling expertise in Mutual Funds, Insurance, FDs, RDs, Retail Loans, and Savings/Current Accounts. Ability to create customized investment portfolios aligned with client goals.'
  },
  {
    icon: <Handshake className="h-10 w-10 text-primary" />,
    title: 'Relationship & Trust Focus',
    description: 'Senior Key Relationship Manager role involved direct engagement with clients, building trust, and ensuring seamless service delivery. Track record of client retention, repeat business, and long-term wealth management.'
  },
  {
    icon: <Globe className="h-10 w-10 text-primary" />,
    title: 'Client-Centric & Globally Aware',
    description: 'Attended international seminars and workshops in Europe, Russia, Thailand, and Bali, adding global perspective to financial planning. Multilingual professional: Fluent in English, Hindi, Marathi, Marwari, and Gujarati.'
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const card = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: { 
      type: "spring",
      stiffness: 100,
      damping: 15,
      duration: 0.4
    }
  },
};

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export default function WhyChooseUsPage() {
  return (
    <main className="min-h-screen relative flex flex-col items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-100 via-white to-emerald-100 opacity-90"
        style={{
          backgroundSize: '200% 200%',
          animation: 'gradient 12s ease-in-out infinite'
        }}
      />
      <motion.section
        initial="hidden"
        animate="show"
        variants={container}
        className="w-full max-w-6xl mx-auto px-4 py-24"
      >
        <motion.div
          variants={fadeIn}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-serif font-extrabold text-blue-900 mb-4 drop-shadow-lg tracking-tight">
            Why Choose <span className="text-primary">NetWealth India</span>?
          </h1>
          <div className="w-24 h-1 mx-auto bg-gradient-to-r from-primary to-emerald-400 rounded-full mb-6" />
          <p className="text-xl text-blue-700 max-w-2xl mx-auto mb-2 font-light">
            Discover what sets us apart and why clients trust us for their long-term financial growth and security.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-12"
          variants={container}
        >
          {valueProps.map((prop, idx) => (
            <motion.div
              key={prop.title}
              className="backdrop-blur-lg bg-white/70 rounded-3xl shadow-2xl p-10 flex flex-col items-center text-center border border-blue-100 hover:shadow-emerald-200 transition-all duration-300 transform hover:scale-105 hover:z-10 group"
              variants={card}
              whileHover={{ 
                scale: 1.03,
                transition: { duration: 0.2 }
              }}
            >
              <motion.div
                className="mb-5"
                whileHover={{ 
                  scale: 1.1,
                  transition: { duration: 0.2 }
                }}
              >
                {prop.icon}
              </motion.div>
              <h3 className="text-2xl font-serif font-bold text-blue-900 mb-2 tracking-tight">{prop.title}</h3>
              <p className="text-blue-700 text-base leading-relaxed font-light">{prop.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={fadeIn}
          className="mt-20 text-center"
        >
          <motion.a
            href="/contact"
            className="inline-block px-16 py-6 bg-emerald-600 text-white text-2xl font-bold rounded-xl shadow-xl hover:bg-emerald-500 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-emerald-300"
            whileHover={{ 
              scale: 1.05,
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.98 }}
          >
            Start Your Wealth Journey
          </motion.a>
        </motion.div>
      </motion.section>
      <style jsx global>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </main>
  );
} 