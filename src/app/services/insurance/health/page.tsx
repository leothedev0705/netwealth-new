'use client';

import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Shield, Users, Hospital, Stethoscope, BriefcaseMedical } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import LottieAnimation from '@/components/animations/LottieAnimation';
import healthInsuranceAnimation from '../../../../../public/assets/lotties/health-insurance.json';

const features = [
  {
    icon: <Shield className="h-8 w-8 text-blue-500" />,
    title: 'Comprehensive Coverage',
    description: 'From hospitalization to pre- and post-care, we have you covered.',
  },
  {
    icon: <Users className="h-8 w-8 text-blue-500" />,
    title: 'Family Plans',
    description: 'Protect your entire family under a single, affordable plan.',
  },
  {
    icon: <Hospital className="h-8 w-8 text-blue-500" />,
    title: 'Cashless Network',
    description: 'Access to a wide network of hospitals for cashless treatments.',
  },
  {
    icon: <Stethoscope className="h-8 w-8 text-blue-500" />,
    title: 'Critical Illness Cover',
    description: 'Financial protection against major life-threatening diseases.',
  },
];

const HealthInsurancePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <Link href="/services" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to All Services
          </Link>

          <header className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-16">
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-4 tracking-tight">
                Secure Your Health, Secure Your Future
              </h1>
              <p className="text-lg text-slate-600 mb-8 max-w-xl">
                Our health insurance plans are designed to provide you and your family with the best medical care without financial worries. Stay protected against rising healthcare costs.
              </p>
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg">
                Explore Plans
              </Button>
            </div>
            <div className="flex items-center justify-center">
              <LottieAnimation animationData={healthInsuranceAnimation} />
            </div>
          </header>

          <section className="py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-800">Why Choose Our Health Insurance?</h2>
              <p className="text-slate-600 mt-2">Comprehensive benefits tailored to your needs.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300 border-t-4 border-blue-500">
                  <CardHeader>
                    <div className="mx-auto bg-blue-100 rounded-full p-4 w-fit mb-4">
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
              <div className="md:col-span-2">
                <h2 className="text-3xl font-bold text-slate-800 mb-4">Ready to Get Started?</h2>
                <p className="text-slate-600 mb-6">
                  Let our experts help you find the perfect health insurance plan. Get a free quote today and take the first step towards a healthier, more secure life.
                </p>
                <div className="flex gap-4">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">Get a Free Quote</Button>
                  <Button variant="outline">Contact Us</Button>
                </div>
              </div>
              <div className="hidden md:block">
                <BriefcaseMedical className="h-48 w-48 text-blue-200" />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default HealthInsurancePage; 