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
  AlertCircle,
  Globe,
  Banknote,
  Receipt,
  HandCoins,
  CircleDollarSign,
  Coins,
  TrendingDown,
  Package
} from 'lucide-react';

// Helper function for consistent number formatting to prevent hydration mismatch
const formatNumber = (num: number): string => {
  return Math.round(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export default function CreditCardLoanPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    loanAmount: '',
    monthlyIncome: '',
    creditCardLimit: '',
    creditCardBank: '',
    pincode: '400077'
  });

  const [calculatorValues, setCalculatorValues] = useState({
    loanAmount: 300000,
    interestRate: 14.5,
    tenure: 2
  });

  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  // EMI Calculator
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
    alert('Thank you! Our credit card loan expert will contact you within 24 hours.');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const loanFeatures = [
    {
      feature: "Quick Processing",
      icon: Zap,
      description: "Get funds within 24-48 hours with minimal documentation",
      benefit: "Instant approval"
    },
    {
      feature: "Competitive Interest Rates",
      icon: Percent,
      description: "Lower interest rates compared to personal loans",
      benefit: "Cost effective"
    },
    {
      feature: "Flexible Repayment",
      icon: RefreshCw,
      description: "Choose tenure from 6 months to 5 years",
      benefit: "Customizable EMI"
    },
    {
      feature: "No Additional Collateral",
      icon: Shield,
      description: "Your credit card limit acts as security",
      benefit: "Hassle-free process"
    },
    {
      feature: "Continue Using Card",
      icon: CreditCard,
      description: "Keep using your credit card normally",
      benefit: "No restrictions"
    },
    {
      feature: "Prepayment Facility",
      icon: TrendingUp,
      description: "Pay off your loan early without penalties",
      benefit: "Save on interest"
    }
  ];

  const loanPurposes = [
    {
      purpose: "Debt Consolidation",
      icon: Package,
      description: "Combine multiple high-interest debts into one",
      rate: "12.50% - 18.00%"
    },
    {
      purpose: "Medical Emergency",
      icon: Shield,
      description: "Quick funds for urgent medical needs",
      rate: "13.00% - 17.00%"
    },
    {
      purpose: "Home Renovation",
      icon: Building,
      description: "Upgrade your living space",
      rate: "13.50% - 18.50%"
    },
    {
      purpose: "Education Expenses",
      icon: Award,
      description: "Fund your or your family's education",
      rate: "12.75% - 17.50%"
    },
    {
      purpose: "Business Investment",
      icon: Briefcase,
      description: "Grow your business or start a venture",
      rate: "14.00% - 19.00%"
    },
    {
      purpose: "Wedding Expenses",
      icon: Receipt,
      description: "Make your special day memorable",
      rate: "13.25% - 18.00%"
    }
  ];

  const topLenders = [
    {
      name: "HDFC Bank",
      logo: "🏛️",
      interestRate: "12.50% - 18.00%",
      processingFee: "1.00% - 3.00%",
      loanAmount: "₹50,000 - ₹20 Lakh",
      tenure: "6-60 months",
      rating: 4.8,
      features: ["Instant approval", "Digital process", "Competitive rates", "24/7 support"]
    },
    {
      name: "ICICI Bank",
      logo: "🏪",
      interestRate: "13.00% - 17.50%",
      processingFee: "1.00% - 2.50%",
      loanAmount: "₹50,000 - ₹25 Lakh",
      tenure: "6-60 months",
      rating: 4.7,
      features: ["Quick disbursal", "Online application", "Flexible EMI", "Easy documentation"]
    },
    {
      name: "SBI Bank",
      logo: "🏦",
      interestRate: "12.00% - 16.50%",
      processingFee: "0.50% - 2.00%",
      loanAmount: "₹50,000 - ₹15 Lakh",
      tenure: "6-60 months",
      rating: 4.6,
      features: ["Government backing", "Lowest rates", "Trusted brand", "Wide network"]
    },
    {
      name: "Axis Bank",
      logo: "🏢",
      interestRate: "13.50% - 18.50%",
      processingFee: "1.00% - 3.50%",
      loanAmount: "₹50,000 - ₹20 Lakh",
      tenure: "6-60 months",
      rating: 4.5,
      features: ["Digital first", "Quick approval", "Flexible terms", "Premium service"]
    }
  ];

  const eligibilityCriteria = [
    {
      category: "Individual",
      criteria: [
        "Age: 21-65 years",
        "Credit card vintage: 6+ months",
        "Monthly income: ₹15,000+",
        "Good credit score: 650+",
        "Regular credit card usage"
      ]
    },
    {
      category: "Employment",
      criteria: [
        "Salaried employees",
        "Self-employed individuals",
        "Business owners",
        "Professionals",
        "Minimum 1 year work experience"
      ]
    }
  ];

  const requiredDocuments = [
    "Identity proof (Aadhar/PAN/Passport)",
    "Address proof (Utility bill/Aadhar)",
    "Income proof (Salary slips/ITR)",
    "Bank statements (3 months)",
    "Credit card statements (3 months)",
    "Recent passport size photographs"
  ];

  const faqs = [
    {
      question: "What is a loan against credit card?",
      answer: "A loan against credit card is a personal loan offered against your existing credit card limit. You can get up to 70-80% of your credit card limit as a loan with competitive interest rates and flexible repayment terms."
    },
    {
      question: "How much loan can I get against my credit card?",
      answer: "Typically, you can get a loan amount ranging from 70-80% of your credit card limit. The exact amount depends on your credit history, repayment capacity, and the lender's internal policies."
    },
    {
      question: "What are the interest rates for credit card loans?",
      answer: "Interest rates for loans against credit cards typically range from 12% to 19% per annum, which is generally lower than personal loan rates. The rate depends on your credit profile and the lender."
    },
    {
      question: "Can I continue using my credit card after taking a loan?",
      answer: "Yes, you can continue using your credit card normally after taking a loan against it. The loan and credit card are treated as separate financial products by most lenders."
    },
    {
      question: "What happens if I don't repay the loan on time?",
      answer: "Non-payment of the loan can negatively impact your credit score and may result in penalty charges. In severe cases, the lender may also block or cancel your credit card."
    },
    {
      question: "How long does it take to get approval for a credit card loan?",
      answer: "Since you already have a relationship with the bank through your credit card, approval is typically quick - usually within 24-48 hours. Funds are disbursed within 2-3 working days."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 rounded-full p-4">
                <CreditCard className="h-16 w-16 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Loan Against Credit Card
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Get instant funds against your credit card limit. Quick approval, competitive rates, and flexible repayment options with NetWealth India.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                <Calculator className="mr-2 h-4 w-4" />
                Calculate EMI
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600">
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
                <div className="bg-purple-100 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <Percent className="h-10 w-10 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">12.5%</h3>
                <p className="text-gray-600">Starting Interest Rate</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <IndianRupee className="h-10 w-10 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">₹25 Lakh</h3>
                <p className="text-gray-600">Maximum Loan Amount</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <Clock className="h-10 w-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">24 Hrs</h3>
                <p className="text-gray-600">Quick Approval</p>
              </div>
              <div className="text-center">
                <div className="bg-orange-100 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <CreditCard className="h-10 w-10 text-orange-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">80%</h3>
                <p className="text-gray-600">Of Credit Card Limit</p>
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
              <h2 className="text-3xl font-bold mb-4">Why Choose Credit Card Loan?</h2>
              <p className="text-gray-600">Leverage your existing credit card limit for instant financial assistance</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {loanFeatures.map((feature, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="text-center">
                    <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <feature.icon className="h-8 w-8 text-purple-600" />
                    </div>
                    <CardTitle className="text-xl">{feature.feature}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-gray-600 mb-2">{feature.description}</p>
                    <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                      {feature.benefit}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* EMI Calculator */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Credit Card Loan EMI Calculator</h2>
              <p className="text-gray-600">Calculate your monthly EMI and plan your finances</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calculator className="mr-2 h-5 w-5" />
                    Calculate EMI
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="loanAmount">Loan Amount</Label>
                    <div className="relative mt-2">
                      <IndianRupee className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input 
                        type="number" 
                        className="pl-10" 
                        value={calculatorValues.loanAmount}
                        onChange={(e) => setCalculatorValues(prev => ({
                          ...prev,
                          loanAmount: parseInt(e.target.value) || 0
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
                    <Label htmlFor="tenure">Tenure (Years)</Label>
                    <div className="relative mt-2">
                      <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input 
                        type="number" 
                        className="pl-10" 
                        value={calculatorValues.tenure}
                        onChange={(e) => setCalculatorValues(prev => ({
                          ...prev,
                          tenure: parseInt(e.target.value) || 0
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
                    EMI Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Monthly EMI</span>
                      <span className="font-bold text-purple-600">₹{formatNumber(calculateEMI.emi)}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Total Interest</span>
                      <span className="font-bold">₹{formatNumber(calculateEMI.totalInterest)}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Total Amount</span>
                      <span className="font-bold">₹{formatNumber(calculateEMI.totalAmount)}</span>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-blue-700">
                      <AlertCircle className="inline mr-1 h-4 w-4" />
                      EMI calculations are approximate. Final rates may vary based on your profile and lender policies.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Loan Purposes */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">What Can You Use The Loan For?</h2>
              <p className="text-gray-600">Flexible usage for various financial needs</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loanPurposes.map((purpose, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="bg-blue-100 rounded-full p-3">
                        <purpose.icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{purpose.purpose}</CardTitle>
                        <p className="text-sm text-green-600 font-semibold">{purpose.rate}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm">{purpose.description}</p>
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
              <h2 className="text-3xl font-bold mb-4">Top Credit Card Loan Providers</h2>
              <p className="text-gray-600">Compare rates and features from leading banks</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Interest Rate</p>
                        <p className="font-semibold text-purple-600">{lender.interestRate}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Processing Fee</p>
                        <p className="font-semibold">{lender.processingFee}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Loan Amount</p>
                        <p className="font-semibold">{lender.loanAmount}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Tenure</p>
                        <p className="font-semibold">{lender.tenure}</p>
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
              <p className="text-gray-600">Check if you qualify for a credit card loan</p>
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
                    {requiredDocuments.map((doc, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-600">
                        <Download className="h-4 w-4 text-blue-500 mr-3" />
                        {doc}
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-700">
                      <AlertCircle className="inline mr-1 h-4 w-4" />
                      Credit card statements help verify your spending pattern and creditworthiness.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Apply for Credit Card Loan</h2>
              <p className="text-gray-600">Get started with your application in minutes</p>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="mr-2 h-5 w-5" />
                  Credit Card Loan Application
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
                      <Label htmlFor="loanAmount">Required Loan Amount *</Label>
                      <div className="relative">
                        <IndianRupee className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input 
                          id="loanAmount"
                          name="loanAmount"
                          type="number"
                          className="pl-10"
                          value={formData.loanAmount}
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
                      <Label htmlFor="creditCardLimit">Credit Card Limit *</Label>
                      <div className="relative">
                        <IndianRupee className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input 
                          id="creditCardLimit"
                          name="creditCardLimit"
                          type="number"
                          className="pl-10"
                          value={formData.creditCardLimit}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="creditCardBank">Credit Card Bank *</Label>
                      <select 
                        id="creditCardBank"
                        name="creditCardBank"
                        value={formData.creditCardBank}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        required
                      >
                        <option value="">Select Bank</option>
                        <option value="hdfc">HDFC Bank</option>
                        <option value="icici">ICICI Bank</option>
                        <option value="sbi">SBI Bank</option>
                        <option value="axis">Axis Bank</option>
                        <option value="kotak">Kotak Bank</option>
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
                      />
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 pt-6">
                    <Button type="submit" className="flex-1">
                      Apply for Loan
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
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-gray-600">Everything you need to know about credit card loans</p>
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
      <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Need Help with Your Credit Card Loan?</h2>
            <p className="text-xl mb-8">
              Our financial experts at NetWealth India are ready to assist you with personalized guidance
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                <Phone className="mr-2 h-4 w-4" />
                Call Now: +91 98765 43210
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600">
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