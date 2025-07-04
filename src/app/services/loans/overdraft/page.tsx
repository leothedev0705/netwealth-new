'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  CreditCard, 
  Calculator, 
  CheckCircle, 
  DollarSign,
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
  TrendingUp,
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
  Wallet,
  Zap,
  RefreshCw,
  TrendingDown,
  AlertCircle,
  Globe,
  Banknote,
  Receipt,
  HandCoins,
  CircleDollarSign,
  Coins
} from 'lucide-react';

// Helper function for consistent number formatting to prevent hydration mismatch
const formatNumber = (num: number): string => {
  return Math.round(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export default function OverdraftFacilityPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    overdraftLimit: '',
    monthlyIncome: '',
    accountType: '',
    bankingRelationship: '',
    pincode: '400077'
  });

  const [calculatorValues, setCalculatorValues] = useState({
    overdraftLimit: 500000,
    interestRate: 12.5,
    utilizationDays: 15
  });

  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  // Interest Calculator for Overdraft
  const calculateInterest = useMemo(() => {
    const principal = calculatorValues.overdraftLimit;
    const dailyRate = calculatorValues.interestRate / 100 / 365;
    
    const interestAmount = principal * dailyRate * calculatorValues.utilizationDays;
    
    return {
      dailyInterest: principal * dailyRate,
      totalInterest: interestAmount,
      overdraftLimit: principal,
      utilizationDays: calculatorValues.utilizationDays
    };
  }, [calculatorValues]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you! Our overdraft facility expert will contact you within 24 hours.');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const overdraftFeatures = [
    {
      feature: "Instant Liquidity",
      icon: Zap,
      description: "Access funds immediately when needed",
      benefit: "No waiting period"
    },
    {
      feature: "Pay Only for Usage",
      icon: Receipt,
      description: "Interest charged only on amount used",
      benefit: "Cost effective"
    },
    {
      feature: "Flexible Repayment",
      icon: RefreshCw,
      description: "Repay and reuse the facility multiple times",
      benefit: "Revolving credit"
    },
    {
      feature: "No Collateral Required",
      icon: Shield,
      description: "Available against salary/income proof",
      benefit: "Unsecured facility"
    },
    {
      feature: "24/7 Access",
      icon: Clock,
      description: "Access your overdraft anytime, anywhere",
      benefit: "Round the clock"
    },
    {
      feature: "Auto Renewal",
      icon: TrendingUp,
      description: "Automatic renewal based on usage pattern",
      benefit: "Hassle-free"
    }
  ];

  const overdraftTypes = [
    {
      type: "Salary Account Overdraft",
      icon: Wallet,
      limit: "₹50,000 - ₹25 Lakh",
      interestRate: "11.00% - 16.00%",
      features: ["Against salary", "Instant approval", "No documentation", "Auto-renewal"]
    },
    {
      type: "Business Current Account OD",
      icon: Building,
      limit: "₹1 Lakh - ₹10 Crore",
      interestRate: "12.00% - 18.00%",
      features: ["Working capital", "Cash flow management", "Competitive rates", "Flexible terms"]
    },
    {
      type: "Property Backed Overdraft",
      icon: Target,
      limit: "₹5 Lakh - ₹5 Crore",
      interestRate: "10.50% - 14.00%",
      features: ["Against property", "Higher limits", "Lower interest", "Long tenure"]
    },
    {
      type: "Fixed Deposit Overdraft",
      icon: Banknote,
      limit: "Up to 90% of FD",
      interestRate: "FD Rate + 2%",
      features: ["Against FD", "Lowest rates", "Instant approval", "No processing fee"]
    }
  ];

  const topLenders = [
    {
      name: "HDFC Bank",
      logo: "🏛️",
      interestRate: "11.00% - 16.00%",
      processingFee: "0.50% - 2.00%",
      overdraftLimit: "₹50,000 - ₹25 Lakh",
      features: ["Instant approval", "Digital platform", "Competitive rates", "24/7 access"],
      rating: 4.8,
      minIncome: "₹25,000/month"
    },
    {
      name: "ICICI Bank",
      logo: "🏪",
      interestRate: "11.50% - 17.00%",
      processingFee: "0.50% - 2.50%",
      overdraftLimit: "₹50,000 - ₹30 Lakh",
      features: ["Quick processing", "Online application", "Flexible terms", "Auto-renewal"],
      rating: 4.7,
      minIncome: "₹30,000/month"
    },
    {
      name: "SBI Bank",
      logo: "🏦",
      interestRate: "10.75% - 15.50%",
      processingFee: "0.35% - 1.50%",
      overdraftLimit: "₹50,000 - ₹20 Lakh",
      features: ["Government backing", "Lowest rates", "Wide network", "Trusted brand"],
      rating: 4.6,
      minIncome: "₹20,000/month"
    },
    {
      name: "Axis Bank",
      logo: "🏢",
      interestRate: "11.75% - 16.50%",
      processingFee: "0.75% - 2.00%",
      overdraftLimit: "₹50,000 - ₹25 Lakh",
      features: ["Digital first", "Quick approval", "Competitive rates", "Excellent service"],
      rating: 4.5,
      minIncome: "₹25,000/month"
    }
  ];

  const eligibilityCriteria = [
    {
      category: "Individual",
      criteria: [
        "Age: 23-65 years",
        "Minimum income: ₹20,000/month",
        "Work experience: 2+ years",
        "Good credit score: 650+",
        "Stable employment"
      ]
    },
    {
      category: "Business",
      criteria: [
        "Business vintage: 2+ years",
        "Monthly turnover: ₹50,000+",
        "Profit for last 2 years",
        "Good banking relationship",
        "Clean credit history"
      ]
    }
  ];

  const faqs = [
    {
      question: "What is an overdraft facility?",
      answer: "An overdraft facility allows you to withdraw money from your account even when your balance is zero, up to a pre-approved limit. You pay interest only on the amount you use."
    },
    {
      question: "How is interest calculated on overdraft?",
      answer: "Interest is calculated daily on the outstanding balance. You pay interest only for the days you use the overdraft facility. If you maintain a positive balance, no interest is charged."
    },
    {
      question: "What is the difference between overdraft and personal loan?",
      answer: "Overdraft is a revolving credit facility where you pay interest only on usage, while personal loans have fixed EMIs. Overdraft offers more flexibility but typically has higher interest rates."
    },
    {
      question: "Can I get an overdraft facility with a low credit score?",
      answer: "While a good credit score (650+) is preferred, some banks may offer overdraft facilities with lower scores against collateral or with a co-applicant. Terms may vary based on your credit profile."
    },
    {
      question: "What happens if I exceed my overdraft limit?",
      answer: "Exceeding your overdraft limit may result in penalty charges, transaction rejection, or additional fees. It's important to monitor your usage and stay within the approved limit."
    },
    {
      question: "How long does it take to get an overdraft facility approved?",
      answer: "For salary account holders, approval can be instant. For others, it typically takes 2-7 working days depending on documentation and verification requirements."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 rounded-full p-4">
                <CreditCard className="h-16 w-16 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Overdraft Facility
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Get instant access to funds when you need them most. Pay interest only on what you use with our flexible overdraft solutions.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100">
                <Calculator className="mr-2 h-4 w-4" />
                Calculate Interest
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-600">
                <FileText className="mr-2 h-4 w-4" />
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
                <div className="bg-green-100 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <Percent className="h-10 w-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">10.5%</h3>
                <p className="text-gray-600">Starting Interest Rate</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <IndianRupee className="h-10 w-10 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">₹10 Cr</h3>
                <p className="text-gray-600">Maximum Overdraft Limit</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <Clock className="h-10 w-10 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Instant</h3>
                <p className="text-gray-600">Access to Funds</p>
              </div>
              <div className="text-center">
                <div className="bg-orange-100 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <Receipt className="h-10 w-10 text-orange-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Usage</h3>
                <p className="text-gray-600">Pay Only for What You Use</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Choose Overdraft Facility?</h2>
              <p className="text-gray-600">Flexible credit solution that adapts to your financial needs</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {overdraftFeatures.map((feature, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="text-center">
                    <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <feature.icon className="h-8 w-8 text-green-600" />
                    </div>
                    <CardTitle className="text-xl">{feature.feature}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-gray-600 mb-2">{feature.description}</p>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      {feature.benefit}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Interest Calculator */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Overdraft Interest Calculator</h2>
              <p className="text-gray-600">Calculate your interest cost based on usage</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calculator className="mr-2 h-5 w-5" />
                    Calculate Interest
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="overdraftLimit">Overdraft Limit</Label>
                    <div className="relative mt-2">
                      <IndianRupee className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input 
                        type="number" 
                        className="pl-10" 
                        value={calculatorValues.overdraftLimit}
                        onChange={(e) => setCalculatorValues(prev => ({
                          ...prev,
                          overdraftLimit: parseInt(e.target.value) || 0
                        }))}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="interestRate">Interest Rate (% p.a.)</Label>
                    <div className="relative mt-2">
                      <Percent className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input 
                        type="number" 
                        step="0.1"
                        className="pl-10" 
                        value={calculatorValues.interestRate}
                        onChange={(e) => setCalculatorValues(prev => ({
                          ...prev,
                          interestRate: parseFloat(e.target.value) || 0
                        }))}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="utilizationDays">Usage Days</Label>
                    <div className="relative mt-2">
                      <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input 
                        type="number" 
                        className="pl-10" 
                        value={calculatorValues.utilizationDays}
                        onChange={(e) => setCalculatorValues(prev => ({
                          ...prev,
                          utilizationDays: parseInt(e.target.value) || 0
                        }))}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="mr-2 h-5 w-5" />
                    Interest Calculation
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Overdraft Limit</span>
                      <span className="font-bold">₹{formatNumber(calculateInterest.overdraftLimit)}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Daily Interest</span>
                      <span className="font-bold">₹{formatNumber(calculateInterest.dailyInterest)}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Usage Days</span>
                      <span className="font-bold">{calculateInterest.utilizationDays} days</span>
                    </div>
                    <div className="border-t pt-2">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold">Total Interest</span>
                        <span className="text-xl font-bold text-green-600">₹{formatNumber(calculateInterest.totalInterest)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-blue-700">
                      <AlertCircle className="inline mr-1 h-4 w-4" />
                      Interest is calculated daily on the outstanding balance. You pay only for the days you use the overdraft facility.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Overdraft Types */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Types of Overdraft Facilities</h2>
              <p className="text-gray-600">Choose the right overdraft solution for your needs</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {overdraftTypes.map((type, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="bg-blue-100 rounded-full p-3">
                        <type.icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{type.type}</CardTitle>
                        <p className="text-green-600 font-semibold">{type.interestRate}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Limit:</span>
                        <span className="font-semibold">{type.limit}</span>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-gray-700">Key Features:</p>
                        <ul className="space-y-1">
                          {type.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center text-sm text-gray-600">
                              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Top Lenders */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Top Overdraft Facility Providers</h2>
              <p className="text-gray-600">Compare and choose from leading financial institutions</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {topLenders.map((lender, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{lender.logo}</span>
                        <div>
                          <CardTitle className="text-lg">{lender.name}</CardTitle>
                          <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`h-4 w-4 ${i < Math.floor(lender.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                            ))}
                            <span className="text-sm text-gray-600 ml-1">({lender.rating})</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Interest Rate</span>
                        <span className="font-semibold text-green-600">{lender.interestRate}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Processing Fee</span>
                        <span className="font-semibold">{lender.processingFee}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Limit</span>
                        <span className="font-semibold">{lender.overdraftLimit}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Min Income</span>
                        <span className="font-semibold">{lender.minIncome}</span>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Key Features:</p>
                      <ul className="space-y-1">
                        {lender.features.slice(0, 2).map((feature, idx) => (
                          <li key={idx} className="flex items-center text-xs text-gray-600">
                            <CheckCircle className="h-3 w-3 text-green-500 mr-2" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <Button className="w-full" size="sm">
                      Apply Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Eligibility & Documents */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Eligibility & Documents</h2>
              <p className="text-gray-600">Check if you qualify for an overdraft facility</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <UserCheck className="mr-2 h-5 w-5" />
                    Eligibility Criteria
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {eligibilityCriteria.map((category, index) => (
                      <div key={index}>
                        <h4 className="font-semibold text-lg mb-3">{category.category}</h4>
                        <ul className="space-y-2">
                          {category.criteria.map((criterion, idx) => (
                            <li key={idx} className="flex items-center text-sm text-gray-600">
                              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                              {criterion}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="mr-2 h-5 w-5" />
                    Required Documents
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {[
                      "Identity proof (Aadhar/PAN/Passport)",
                      "Address proof (Utility bill/Aadhar)",
                      "Income proof (Salary slips/ITR)",
                      "Bank statements (6 months)",
                      "Employment proof (Appointment letter)",
                      "Recent passport size photographs"
                    ].map((doc, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-600">
                        <Download className="h-4 w-4 text-blue-500 mr-3" />
                        {doc}
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-700">
                      <AlertCircle className="inline mr-1 h-4 w-4" />
                      Additional documents may be required based on your profile and the lender's requirements.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Apply for Overdraft Facility</h2>
              <p className="text-gray-600">Get started with your overdraft application in minutes</p>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="mr-2 h-5 w-5" />
                  Overdraft Application Form
                </CardTitle>
              </CardHeader>
              <CardContent>
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
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input 
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="overdraftLimit">Required Overdraft Limit *</Label>
                      <div className="relative">
                        <IndianRupee className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input 
                          id="overdraftLimit"
                          name="overdraftLimit"
                          type="number"
                          className="pl-10"
                          value={formData.overdraftLimit}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="monthlyIncome">Monthly Income *</Label>
                      <div className="relative">
                        <IndianRupee className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input 
                          id="monthlyIncome"
                          name="monthlyIncome"
                          type="number"
                          className="pl-10"
                          value={formData.monthlyIncome}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="accountType">Account Type *</Label>
                      <select 
                        id="accountType"
                        name="accountType"
                        value={formData.accountType}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        required
                      >
                        <option value="">Select Account Type</option>
                        <option value="savings">Savings Account</option>
                        <option value="salary">Salary Account</option>
                        <option value="current">Current Account</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 pt-6">
                    <Button type="submit" className="flex-1">
                      Apply for Overdraft
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    <Button type="button" variant="outline" className="flex-1">
                      <Phone className="mr-2 h-4 w-4" />
                      Call Expert
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-gray-600">Everything you need to know about overdraft facilities</p>
            </div>
            
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <Card key={index} className="cursor-pointer hover:shadow-lg transition-shadow duration-300">
                  <CardHeader 
                    onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                    className="pb-3"
                  >
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{faq.question}</CardTitle>
                      <ChevronRight className={`h-5 w-5 transition-transform duration-200 ${expandedFAQ === index ? 'rotate-90' : ''}`} />
                    </div>
                  </CardHeader>
                  {expandedFAQ === index && (
                    <CardContent className="pt-0">
                      <p className="text-gray-600">{faq.answer}</p>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Need Help with Your Overdraft Application?</h2>
            <p className="text-xl mb-8">
              Our financial experts are ready to assist you with personalized guidance
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100">
                <Phone className="mr-2 h-4 w-4" />
                Call Now: +91 98765 43210
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-600">
                <Mail className="mr-2 h-4 w-4" />
                Email: netwealthindia05@gmail.com
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 