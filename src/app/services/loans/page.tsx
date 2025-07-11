'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from 'next/link';
import { 
  Building2, 
  Percent, 
  IndianRupee, 
  Calendar, 
  TrendingUp, 
  Users, 
  CreditCard, 
  Shield, 
  CheckCircle, 
  Star,
  BarChart3,
  Search,
  Clock,
  AlertCircle,
  FileText,
  Calculator,
  ThumbsUp,
  Home,
  Car,
  Briefcase,
  GraduationCap,
  ArrowRight,
  Target,
  DollarSign,
  Coins
} from 'lucide-react';

interface LoanType {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  interestRate: string;
  maxAmount: string;
  features: string[];
  href: string;
  popular: boolean;
}

const loanTypes: LoanType[] = [
  {
    id: 'personal',
    title: 'Personal Loans',
    description: 'Unsecured loans for any personal financial need',
    icon: Users,
    interestRate: '9.6% - 28%',
    maxAmount: 'Rs 40 Lakhs',
    features: ['No collateral required', 'Quick approval', 'Flexible usage', 'Easy documentation'],
    href: '/services/loans/personal',
    popular: true
  },
  {
    id: 'personal-by-amount',
    title: 'Personal Loan by Amount',
    description: 'Choose personal loans based on your specific amount needs',
    icon: DollarSign,
    interestRate: '9.6% - 26%',
    maxAmount: 'Rs 40 Lakhs',
    features: ['Amount-based options', 'Flexible terms', 'Competitive rates', 'Quick approval'],
    href: '/services/loans/personal-by-amount',
    popular: false
  },
  {
    id: 'personal-interest-rates',
    title: 'Personal Loan Interest Rates',
    description: 'Compare competitive interest rates from top lenders',
    icon: Percent,
    interestRate: '9.60% - 28%',
    maxAmount: 'Rs 40 Lakhs',
    features: ['Rate comparison', 'Best rates', 'Multiple lenders', 'Instant quotes'],
    href: '/services/loans/personal-interest-rates',
    popular: false
  },
  {
    id: 'home',
    title: 'Home Loans',
    description: 'Finance your dream home with competitive rates',
    icon: Home,
    interestRate: '7.5% - 12%',
    maxAmount: 'Rs 5 Crores',
    features: ['Lower interest rates', 'Long tenure', 'Tax benefits', 'Minimal processing fee'],
    href: '/services/loans/home',
    popular: true
  },
  {
    id: 'home-balance-transfer',
    title: 'Home Loan Balance Transfer',
    description: 'Switch to lower interest rates and save lakhs',
    icon: Building2,
    interestRate: '7.75% - 9.50%',
    maxAmount: 'No Limit',
    features: ['Lower rates', 'Quick processing', 'Top-up facility', 'No penalty'],
    href: '/services/loans/home-balance-transfer',
    popular: false
  },
  {
    id: 'car',
    title: 'Car Loans',
    description: 'Get your dream car with easy financing options',
    icon: Car,
    interestRate: '8.5% - 15%',
    maxAmount: 'Rs 2 Crores',
    features: ['Quick approval', 'Flexible tenure', 'Minimal documentation', 'Pre-approved offers'],
    href: '/services/loans/car',
    popular: false
  },
  {
    id: 'business',
    title: 'Business Loans',
    description: 'Grow your business with tailored financing solutions',
    icon: Briefcase,
    interestRate: '11% - 24%',
    maxAmount: 'Rs 50 Crores',
    features: ['Collateral-free options', 'Working capital support', 'Term loans', 'Equipment financing'],
    href: '/services/loans/business',
    popular: false
  },
  {
    id: 'education',
    title: 'Education Loans',
    description: 'Fund your education dreams with student-friendly loans',
    icon: GraduationCap,
    interestRate: '9.5% - 16%',
    maxAmount: 'Rs 1.5 Crores',
    features: ['Moratorium period', 'Tax benefits', 'Covers all expenses', 'Flexible repayment'],
    href: '/services/loans/education',
    popular: false
  },
  {
    id: 'credit-card',
    title: 'Loan Against Credit Card',
    description: 'Get instant loan against your credit card limit',
    icon: CreditCard,
    interestRate: '12.5% - 19%',
    maxAmount: 'Rs 25 Lakhs',
    features: ['Quick approval', 'Competitive rates', 'Continue using card', 'Flexible repayment'],
    href: '/services/loans/credit-card',
    popular: false
  },
  {
    id: 'overdraft',
    title: 'Overdraft Facility',
    description: 'Instant access to funds, pay interest only on usage',
    icon: Target,
    interestRate: '10.5% - 18%',
    maxAmount: 'Rs 10 Crores',
    features: ['Pay only for usage', 'Instant access', 'Flexible repayment', 'No collateral required'],
    href: '/services/loans/overdraft',
    popular: false
  },
  {
    id: 'gold',
    title: 'Gold Loans',
    description: 'Instant loans against your gold ornaments',
    icon: Coins,
    interestRate: '7% - 20%',
    maxAmount: 'Rs 5 Crores',
    features: ['Instant approval', 'No income proof', 'Flexible tenure', 'Minimal documentation'],
    href: '/services/loans/gold',
    popular: false
  }
];

const LoansOverviewPage = () => {
  const popularLoans = loanTypes.filter(loan => loan.popular);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Loans & Financing Solutions
            </h1>
            <p className="text-xl mb-8">
              Compare and choose from a wide range of loan products with best-in-class interest rates
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                <Calculator className="mr-2 h-4 w-4" />
                Check Eligibility
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                <FileText className="mr-2 h-4 w-4" />
                EMI Calculator
              </Button>
            </div>
          </div>
        </div>
      </div>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-blue-100 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <Percent className="h-10 w-10 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">7.5%</h3>
                <p className="text-gray-600">Starting Interest Rate</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <IndianRupee className="h-10 w-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Rs 50 Cr</h3>
                <p className="text-gray-600">Maximum Loan Amount</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <Clock className="h-10 w-10 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">24 Hrs</h3>
                <p className="text-gray-600">Quick Approval</p>
              </div>
              <div className="text-center">
                <div className="bg-orange-100 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-10 w-10 text-orange-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">100+</h3>
                <p className="text-gray-600">Happy Customers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Popular Loan Types</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Most sought-after loan products with competitive rates and quick approval
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {popularLoans.map((loan) => (
                <Card key={loan.id} className="hover:shadow-lg transition-shadow duration-300 group">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-100 rounded-lg p-3">
                          <loan.icon className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <CardTitle className="text-xl">{loan.title}</CardTitle>
                          <Badge variant="destructive" className="mt-1">Popular</Badge>
                        </div>
                      </div>
                      <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-600">{loan.description}</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Interest Rate</p>
                        <p className="font-semibold">{loan.interestRate}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Max Amount</p>
                        <p className="font-semibold">{loan.maxAmount}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-2">Key Features:</p>
                      <div className="flex flex-wrap gap-2">
                        {loan.features.map((feature, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Link href={loan.href}>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">
                        Apply Now
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">All Loan Types</h2>
              <p className="text-gray-600">
                Explore our complete range of financing solutions
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loanTypes.map((loan) => (
                <Card key={loan.id} className="hover:shadow-lg transition-shadow duration-300 group">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className="bg-gray-100 rounded-lg p-3">
                        <loan.icon className="h-6 w-6 text-gray-600" />
                      </div>
                      {loan.popular && (
                        <Badge variant="destructive">Popular</Badge>
                      )}
                    </div>
                    <CardTitle className="text-lg">{loan.title}</CardTitle>
                    <p className="text-sm text-gray-600">{loan.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 gap-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Rate:</span>
                        <span className="font-semibold">{loan.interestRate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Max Amount:</span>
                        <span className="font-semibold">{loan.maxAmount}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {loan.features.slice(0, 2).map((feature, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                    <Link href={loan.href}>
                      <Button className="w-full" variant="outline">
                        Learn More
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl mb-8">
              Apply for your loan today and get instant approval with competitive rates
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                <Calculator className="mr-2 h-4 w-4" />
                Calculate EMI
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                <FileText className="mr-2 h-4 w-4" />
                Apply Now
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoansOverviewPage; 