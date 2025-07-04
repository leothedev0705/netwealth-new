'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  DollarSign, 
  Calculator, 
  CheckCircle, 
  TrendingUp,
  PieChart,
  BarChart3,
  Target,
  ChevronRight,
  Award,
  Clock,
  Users,
  Shield,
  Star,
  FileText,
  Percent,
  IndianRupee,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Download,
  ArrowRight,
  Briefcase,
  Building,
  UserCheck,
  Eye,
  Home,
  Car,
  Plane,
  GraduationCap,
  Banknote,
  ShoppingBag,
  Laptop,
  HeartHandshake,
  Zap,
  CreditCard,
  Wallet
} from 'lucide-react';

// Helper function for consistent number formatting to prevent hydration mismatch
const formatNumber = (num: number): string => {
  return Math.round(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export default function PersonalLoanByAmountPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    loanAmount: '',
    monthlyIncome: '',
    employmentType: '',
    loanPurpose: '',
    pincode: '400077'
  });

  const [calculatorValues, setCalculatorValues] = useState({
    loanAmount: 500000,
    interestRate: 11.5,
    tenure: 3
  });

  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  // Advanced EMI Calculator
  const calculateEMI = useMemo(() => {
    const principal = calculatorValues.loanAmount;
    const monthlyRate = calculatorValues.interestRate / 100 / 12;
    const months = calculatorValues.tenure * 12;
    
    if (monthlyRate === 0) {
      return {
        emi: principal / months,
        totalAmount: principal,
        totalInterest: 0,
        loanAmount: principal
      };
    }
    
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                (Math.pow(1 + monthlyRate, months) - 1);
    
    return {
      emi: emi,
      totalAmount: emi * months,
      totalInterest: (emi * months) - principal,
      loanAmount: principal
    };
  }, [calculatorValues]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you! Our personal loan expert will contact you within 24 hours.');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const loanAmountRanges = [
    {
      range: "₹50,000 - ₹2 Lakh",
      icon: Wallet,
      rate: "9.60% - 22.00%",
      description: "Small personal needs and emergencies",
      popularity: "High",
      processingTime: "2-3 days",
      documentation: "Minimal"
    },
    {
      range: "₹2 Lakh - ₹5 Lakh",
      icon: CreditCard,
      rate: "10.25% - 23.00%",
      description: "Medium financial requirements",
      popularity: "Very High",
      processingTime: "3-5 days",
      documentation: "Standard"
    },
    {
      range: "₹5 Lakh - ₹10 Lakh",
      icon: DollarSign,
      rate: "10.50% - 24.00%",
      description: "Major life events and investments",
      popularity: "High",
      processingTime: "5-7 days",
      documentation: "Comprehensive"
    },
    {
      range: "₹10 Lakh - ₹25 Lakh",
      icon: TrendingUp,
      rate: "11.00% - 25.00%",
      description: "High-value personal financing",
      popularity: "Medium",
      processingTime: "7-10 days",
      documentation: "Detailed"
    },
    {
      range: "₹25 Lakh - ₹40 Lakh",
      icon: Target,
      rate: "11.50% - 26.00%",
      description: "Premium personal loan solutions",
      popularity: "Low",
      processingTime: "10-15 days",
      documentation: "Extensive"
    }
  ];

  const topLenders = [
    {
      name: "HDFC Bank",
      logo: "🏛️",
      interestRate: "9.60% - 24.00%",
      processingFee: "Up to 4.99%",
      loanAmount: "₹50,000 - ₹40 Lakh",
      tenure: "12-60 months",
      rating: 4.8,
      features: ["Instant approval", "Doorstep service", "Flexible EMI", "Quick disbursal"]
    },
    {
      name: "ICICI Bank",
      logo: "🏪",
      interestRate: "10.25% - 22.00%",
      processingFee: "Up to 3.50%",
      loanAmount: "₹50,000 - ₹50 Lakh",
      tenure: "12-60 months",
      rating: 4.7,
      features: ["Digital process", "Competitive rates", "Pre-approved offers", "Online tracking"]
    },
    {
      name: "SBI Bank",
      logo: "🏦",
      interestRate: "11.15% - 15.40%",
      processingFee: "Up to 1.00%",
      loanAmount: "₹50,000 - ₹20 Lakh",
      tenure: "6-72 months",
      rating: 4.5,
      features: ["Government backing", "Low processing fee", "Wide network", "Trusted brand"]
    },
    {
      name: "Axis Bank",
      logo: "🏢",
      interestRate: "10.75% - 24.00%",
      processingFee: "Up to 2.00%",
      loanAmount: "₹50,000 - ₹35 Lakh",
      tenure: "12-60 months",
      rating: 4.6,
      features: ["Fast processing", "Competitive rates", "Flexible tenure", "Easy eligibility"]
    }
  ];

  const faqs = [
    {
      question: "What is the maximum personal loan amount I can get?",
      answer: "The maximum personal loan amount depends on your income, credit score, and employment type. Generally, you can get up to 20-30 times your monthly salary, with a maximum limit of ₹40 lakhs from most lenders."
    },
    {
      question: "How is loan amount eligibility determined?",
      answer: "Loan amount eligibility is determined based on your monthly income, existing EMIs, credit score, employment stability, and repayment capacity. The debt-to-income ratio should typically be below 40-50%."
    },
    {
      question: "Can I get a personal loan of ₹50 lakhs?",
      answer: "While some banks offer personal loans up to ₹50 lakhs, it's typically available only to high-income individuals with excellent credit scores and stable employment. Most lenders cap personal loans at ₹40 lakhs."
    },
    {
      question: "What documents are required for high-value personal loans?",
      answer: "For loans above ₹10 lakhs, you'll need comprehensive documentation including salary slips, bank statements, IT returns, employment certificate, and additional income proof. Property documents may be required for very high amounts."
    },
    {
      question: "How does loan amount affect interest rates?",
      answer: "Generally, higher loan amounts may attract slightly higher interest rates due to increased risk. However, customers with excellent credit profiles might get better rates even for higher amounts."
    },
    {
      question: "Can I increase my loan amount after approval?",
      answer: "Most lenders don't allow loan amount enhancement after approval. You would need to apply for a fresh loan. However, some banks offer top-up loans to existing customers with good repayment records."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
                <DollarSign className="h-16 w-16 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Personal Loan by Amount
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Choose the perfect loan amount for your needs with competitive rates and flexible terms
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                <Calculator className="mr-2 h-5 w-5" />
                Calculate EMI
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600">
                <FileText className="mr-2 h-5 w-5" />
                Check Eligibility
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-purple-100 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <Percent className="h-10 w-10 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">9.60%</h3>
                <p className="text-gray-600">Starting Interest Rate</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <IndianRupee className="h-10 w-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">₹40 Lakh</h3>
                <p className="text-gray-600">Maximum Loan Amount</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <Clock className="h-10 w-10 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">24 Hrs</h3>
                <p className="text-gray-600">Quick Approval</p>
              </div>
              <div className="text-center">
                <div className="bg-orange-100 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-10 w-10 text-orange-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">No</h3>
                <p className="text-gray-600">Collateral Required</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Loan Amount Ranges Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Choose Your Loan Amount Range
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Different loan amounts come with different benefits and requirements. Find the perfect range for your needs.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {loanAmountRanges.map((range, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-300 group">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <range.icon className="h-8 w-8 text-purple-600" />
                      {range.popularity === "Very High" && (
                        <Badge variant="destructive" className="bg-red-500">Popular</Badge>
                      )}
                      {range.popularity === "High" && (
                        <Badge variant="secondary">In Demand</Badge>
                      )}
                    </div>
                    <CardTitle className="text-lg font-semibold text-gray-800">
                      {range.range}
                    </CardTitle>
                    <p className="text-sm text-gray-600">{range.description}</p>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">Interest Rate</span>
                        <span className="font-semibold text-purple-600">{range.rate}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">Processing Time</span>
                        <span className="text-sm font-medium">{range.processingTime}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">Documentation</span>
                        <span className="text-sm font-medium">{range.documentation}</span>
                      </div>
                      <Button className="w-full mt-4 bg-purple-600 hover:bg-purple-700">
                        Apply Now
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* EMI Calculator Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                EMI Calculator
              </h2>
              <p className="text-gray-600">
                Calculate your monthly EMI based on loan amount, interest rate, and tenure
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="p-6">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5 text-purple-600" />
                    Loan Calculator
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="loanAmount" className="text-sm font-medium">
                      Loan Amount (₹)
                    </Label>
                    <Input
                      id="loanAmount"
                      type="number"
                      value={calculatorValues.loanAmount}
                      onChange={(e) => setCalculatorValues(prev => ({
                        ...prev,
                        loanAmount: Number(e.target.value)
                      }))}
                      className="mt-1"
                    />
                    <div className="text-xs text-gray-500 mt-1">
                      Range: ₹50,000 - ₹40,00,000
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="interestRate" className="text-sm font-medium">
                      Interest Rate (% per annum)
                    </Label>
                    <Input
                      id="interestRate"
                      type="number"
                      step="0.1"
                      value={calculatorValues.interestRate}
                      onChange={(e) => setCalculatorValues(prev => ({
                        ...prev,
                        interestRate: Number(e.target.value)
                      }))}
                      className="mt-1"
                    />
                    <div className="text-xs text-gray-500 mt-1">
                      Range: 9.60% - 26.00%
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="tenure" className="text-sm font-medium">
                      Loan Tenure (Years)
                    </Label>
                    <Input
                      id="tenure"
                      type="number"
                      value={calculatorValues.tenure}
                      onChange={(e) => setCalculatorValues(prev => ({
                        ...prev,
                        tenure: Number(e.target.value)
                      }))}
                      className="mt-1"
                    />
                    <div className="text-xs text-gray-500 mt-1">
                      Range: 1 - 7 years
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="p-6">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5 text-purple-600" />
                    Loan Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-1">Monthly EMI</p>
                      <p className="text-2xl font-bold text-purple-600">
                        ₹{formatNumber(calculateEMI.emi)}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg text-center">
                      <p className="text-sm text-gray-600 mb-1">Principal Amount</p>
                      <p className="text-lg font-semibold text-blue-600">
                        ₹{formatNumber(calculateEMI.loanAmount)}
                      </p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg text-center">
                      <p className="text-sm text-gray-600 mb-1">Total Interest</p>
                      <p className="text-lg font-semibold text-green-600">
                        ₹{formatNumber(calculateEMI.totalInterest)}
                      </p>
                    </div>
                  </div>

                  <div className="bg-orange-50 p-4 rounded-lg text-center">
                    <p className="text-sm text-gray-600 mb-1">Total Amount Payable</p>
                    <p className="text-xl font-bold text-orange-600">
                      ₹{formatNumber(calculateEMI.totalAmount)}
                    </p>
                  </div>

                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    <FileText className="mr-2 h-4 w-4" />
                    Get Detailed Amortization Schedule
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Top Lenders Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Top Lenders for Personal Loans
              </h2>
              <p className="text-gray-600">
                Compare offers from leading banks and financial institutions
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {topLenders.map((lender, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{lender.logo}</div>
                        <div>
                          <CardTitle className="text-lg">{lender.name}</CardTitle>
                          <div className="flex items-center gap-1 mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < Math.floor(lender.rating)
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                            <span className="text-sm text-gray-600 ml-1">
                              {lender.rating}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-purple-600 border-purple-600">
                        Compare
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Interest Rate</p>
                        <p className="font-semibold">{lender.interestRate}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Processing Fee</p>
                        <p className="font-semibold">{lender.processingFee}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Loan Amount</p>
                        <p className="font-semibold">{lender.loanAmount}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Tenure</p>
                        <p className="font-semibold">{lender.tenure}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500 mb-2">Key Features:</p>
                      <div className="flex flex-wrap gap-2">
                        {lender.features.map((feature, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button className="flex-1 bg-purple-600 hover:bg-purple-700">
                        Apply Now
                      </Button>
                      <Button variant="outline" className="flex-1">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Apply for Personal Loan
              </h2>
              <p className="text-gray-600">
                Fill out the form below and get pre-approved within minutes
              </p>
            </div>

            <Card className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="loanAmount">Desired Loan Amount *</Label>
                    <select
                      id="loanAmount"
                      name="loanAmount"
                      value={formData.loanAmount}
                      onChange={handleInputChange}
                      required
                      className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="">Select Amount Range</option>
                      <option value="50000-200000">₹50,000 - ₹2 Lakh</option>
                      <option value="200000-500000">₹2 Lakh - ₹5 Lakh</option>
                      <option value="500000-1000000">₹5 Lakh - ₹10 Lakh</option>
                      <option value="1000000-2500000">₹10 Lakh - ₹25 Lakh</option>
                      <option value="2500000-4000000">₹25 Lakh - ₹40 Lakh</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="monthlyIncome">Monthly Income *</Label>
                    <Input
                      id="monthlyIncome"
                      name="monthlyIncome"
                      type="number"
                      value={formData.monthlyIncome}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="employmentType">Employment Type *</Label>
                    <select
                      id="employmentType"
                      name="employmentType"
                      value={formData.employmentType}
                      onChange={handleInputChange}
                      required
                      className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="">Select Employment Type</option>
                      <option value="salaried">Salaried</option>
                      <option value="self-employed">Self Employed</option>
                      <option value="professional">Professional</option>
                      <option value="business">Business Owner</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="loanPurpose">Loan Purpose *</Label>
                    <select
                      id="loanPurpose"
                      name="loanPurpose"
                      value={formData.loanPurpose}
                      onChange={handleInputChange}
                      required
                      className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="">Select Purpose</option>
                      <option value="wedding">Wedding Expenses</option>
                      <option value="travel">Travel & Vacation</option>
                      <option value="education">Education</option>
                      <option value="medical">Medical Emergency</option>
                      <option value="home-renovation">Home Renovation</option>
                      <option value="vehicle">Vehicle Purchase</option>
                      <option value="debt-consolidation">Debt Consolidation</option>
                      <option value="business">Business Purpose</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="pincode">Pincode *</Label>
                    <Input
                      id="pincode"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="h-5 w-5 text-blue-600" />
                    <span className="font-semibold text-blue-800">100% Secure Application</span>
                  </div>
                  <p className="text-sm text-blue-700">
                    Your personal information is encrypted and secure. We never share your details with third parties.
                  </p>
                </div>

                <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3">
                  <CheckCircle className="mr-2 h-5 w-5" />
                  Apply for Personal Loan
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-600">
                Get answers to common questions about personal loans by amount
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardHeader 
                    className="cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                  >
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg text-gray-800">{faq.question}</CardTitle>
                      <ChevronRight 
                        className={`h-5 w-5 text-gray-500 transition-transform ${
                          expandedFAQ === index ? 'rotate-90' : ''
                        }`}
                      />
                    </div>
                  </CardHeader>
                  {expandedFAQ === index && (
                    <CardContent className="pt-0">
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Need Help Choosing the Right Loan Amount?
            </h2>
            <p className="text-gray-600 mb-8">
              Our loan experts are here to help you find the perfect personal loan amount for your needs
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="flex flex-col items-center">
                <div className="bg-purple-100 rounded-full p-4 mb-4">
                  <Phone className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Call Us</h3>
                <p className="text-gray-600">+91 9876543210</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-blue-100 rounded-full p-4 mb-4">
                  <Mail className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Email Us</h3>
                <p className="text-gray-600">netwealthindia05@gmail.com</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-green-100 rounded-full p-4 mb-4">
                  <MapPin className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Visit Us</h3>
                <p className="text-gray-600">Mumbai, Maharashtra</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-4">Ready to Apply?</h3>
              <p className="mb-6">
                Get instant approval and competitive rates on personal loans up to ₹40 lakhs
              </p>
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                <Zap className="mr-2 h-5 w-5" />
                Apply Now - Get Instant Approval
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 