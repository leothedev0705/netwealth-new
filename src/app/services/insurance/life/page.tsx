'use client';

import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Heart, Umbrella, TrendingUp, Lock, Award } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import LottieAnimation from '@/components/animations/LottieAnimation';
import lifeInsuranceAnimation from '../../../../../public/assets/lotties/life-insurance.json';

const features = [
  {
    icon: <Heart className="h-8 w-8 text-rose-500" />,
    title: 'Family Protection',
    description: 'Ensure your loved ones are financially secure in your absence.',
  },
  {
    icon: <TrendingUp className="h-8 w-8 text-rose-500" />,
    title: 'Wealth Creation',
    description: 'Invest in plans that offer returns along with life cover.',
  },
  {
    icon: <Lock className="h-8 w-8 text-rose-500" />,
    title: 'Tax Benefits',
    description: 'Save on taxes under Section 80C of the Income Tax Act.',
  },
  {
    icon: <Award className="h-8 w-8 text-rose-500" />,
    title: 'Guaranteed Payout',
    description: 'Receive a lump sum or regular income to cover life\'s major milestones.',
  },
];

const LifeInsurancePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <Link href="/services" className="inline-flex items-center text-rose-600 hover:text-rose-800 mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to All Services
          </Link>

          <header className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-16">
            <div className="order-2 md:order-1 flex items-center justify-center">
              <LottieAnimation animationData={lifeInsuranceAnimation} />
            </div>
            <div className="text-center md:text-left order-1 md:order-2">
              <h1 className="text-4xl md:text-5xl font-extrabold text-rose-900 mb-4 tracking-tight">
                Protecting Your Loved Ones, Securing Their Future
              </h1>
              <p className="text-lg text-slate-600 mb-8 max-w-xl">
                Life insurance is a promise to your family that their future is secure, no matter what. Discover plans that offer both protection and peace of mind.
              </p>
              <Button size="lg" className="bg-rose-600 hover:bg-rose-700 text-white shadow-lg">
                View Life Insurance Plans
              </Button>
            </div>
          </header>

          <section className="py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-800">Benefits of Life Insurance</h2>
              <p className="text-slate-600 mt-2">More than just a policy, it's a promise.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300 border-t-4 border-rose-500">
                  <CardHeader>
                    <div className="mx-auto bg-rose-100 rounded-full p-4 w-fit mb-4">
                      {feature.icon}
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mt-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <div className="hidden md:block">
                <Umbrella className="h-48 w-48 text-rose-200" />
              </div>
              <div className="md:col-span-2 text-center md:text-left">
                <h2 className="text-3xl font-bold text-slate-800 mb-4">Find the Right Plan Today</h2>
                <p className="text-slate-600 mb-6">
                  Every family is unique. Our advisors are here to help you choose a life insurance plan that fits your specific needs and budget.
                </p>
                <div className="flex gap-4 justify-center md:justify-start">
                  <Button className="bg-rose-600 hover:bg-rose-700 text-white">Compare Plans</Button>
                  <Button variant="outline">Speak to an Advisor</Button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default LifeInsurancePage; 