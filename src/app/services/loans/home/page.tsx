'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Home, 
  Calculator, 
  CheckCircle, 
  DollarSign,
  Building2,
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
  Factory,
  Eye,
  Info,
  AlertCircle,
  CreditCard,
  UserCheck
} from 'lucide-react';

// Helper function for consistent number formatting to prevent hydration mismatch
const formatNumber = (num: number): string => {
  return Math.round(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export default function HomeLoanPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    loanAmount: '',
    propertyValue: '',
    monthlyIncome: '',
    propertyLocation: 'Ghatkopar, Mumbai',
    loanPurpose: ''
  });

  const [calculatorValues, setCalculatorValues] = useState({
    propertyValue: 5000000,
    downPayment: 20,
    interestRate: 8.5,
    tenure: 20
  });

  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  // Advanced EMI Calculator
  const calculateEMI = useMemo(() => {
    const principal = calculatorValues.propertyValue * (100 - calculatorValues.downPayment) / 100;
    const monthlyRate = calculatorValues.interestRate / 100 / 12;
    const months = calculatorValues.tenure * 12;
    
    if (monthlyRate === 0) {
      return {
        emi: principal / months,
        totalAmount: principal,
        totalInterest: 0,
        loanAmount: principal,
        downPaymentAmount: calculatorValues.propertyValue * calculatorValues.downPayment / 100
      };
    }
    
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                (Math.pow(1 + monthlyRate, months) - 1);
    
    return {
      emi: emi,
      totalAmount: emi * months,
      totalInterest: (emi * months) - principal,
      loanAmount: principal,
      downPaymentAmount: calculatorValues.propertyValue * calculatorValues.downPayment / 100
    };
  }, [calculatorValues]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you! Our home loan expert will contact you within 24 hours.');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const loanTypes = [
    {
      type: "Home Purchase Loan",
      icon: Home,
      loanAmount: "₹5 Lakh - ₹10 Crore",
      interestRate: "8.50% - 12.00%",
      tenure: "Up to 30 years",
      features: ["Ready-to-move properties", "Under-construction projects", "Resale properties"]
    },
    {
      type: "Home Construction Loan",
      icon: Building2,
      loanAmount: "₹10 Lakh - ₹5 Crore",
      interestRate: "8.75% - 12.50%",
      tenure: "Up to 25 years",
      features: ["Stage-wise disbursement", "Own land required", "Approved plans needed"]
    },
    {
      type: "Home Improvement Loan",
      icon: Award,
      loanAmount: "₹1 Lakh - ₹50 Lakh",
      interestRate: "9.00% - 13.00%",
      tenure: "Up to 15 years",
      features: ["Renovation & repair", "Interior work", "Extension projects"]
    },
    {
      type: "Plot Purchase Loan",
      icon: MapPin,
      loanAmount: "₹5 Lakh - ₹2 Crore",
      interestRate: "9.25% - 13.50%",
      tenure: "Up to 20 years",
      features: ["Residential plots", "Approved layouts", "Clear titles"]
    },
    {
      type: "Home Loan Balance Transfer",
      icon: TrendingUp,
      loanAmount: "Existing loan amount",
      interestRate: "8.25% - 11.75%",
      tenure: "Remaining tenure",
      features: ["Lower interest rates", "Additional top-up", "Better service"]
    },
    {
      type: "Top-up Home Loan",
      icon: CreditCard,
      loanAmount: "₹1 Lakh - ₹1 Crore",
      interestRate: "8.75% - 12.25%",
      tenure: "Up to 20 years",
      features: ["Against existing property", "Personal/business use", "Quick approval"]
    }
  ];

  const topLenders = [
    {
      name: "SBI Bank",
      logo: "🏦",
      interestRate: "8.50% - 11.05%",
      processingFee: "0.35% + GST",
      loanAmount: "₹1 Lakh - ₹10 Crore",
      maxTenure: "30 years",
      rating: 4.6,
      features: ["Government backing", "Lowest rates", "Wide network", "Flexible repayment"]
    },
    {
      name: "HDFC Bank",
      logo: "🏛️",
      interestRate: "8.75% - 11.50%",
      processingFee: "0.50% + GST",
      loanAmount: "₹1 Lakh - ₹10 Crore",
      maxTenure: "30 years",
      rating: 4.8,
      features: ["Quick approval", "Digital process", "Expert guidance", "Doorstep service"]
    },
    {
      name: "ICICI Bank",
      logo: "🏪",
      interestRate: "8.90% - 12.00%",
      processingFee: "0.50% + GST",
      loanAmount: "₹1 Lakh - ₹5 Crore",
      maxTenure: "30 years",
      rating: 4.7,
      features: ["Online tracking", "Competitive rates", "Fast disbursal", "Relationship benefits"]
    },
    {
      name: "Axis Bank",
      logo: "🏢",
      interestRate: "9.00% - 12.50%",
      processingFee: "0.50% + GST",
      loanAmount: "₹1 Lakh - ₹5 Crore",
      maxTenure: "30 years",
      rating: 4.5,
      features: ["Flexible EMI", "Digital documentation", "Quick processing", "Customer support"]
    },
    {
      name: "PNB Housing Finance",
      logo: "🏠",
      interestRate: "8.75% - 12.00%",
      processingFee: "0.50% + GST",
      loanAmount: "₹1 Lakh - ₹5 Crore",
      maxTenure: "30 years",
      rating: 4.4,
      features: ["Housing specialist", "Competitive rates", "Quick approval", "Flexible terms"]
    },
    {
      name: "LIC Housing Finance",
      logo: "🏘️",
      interestRate: "8.80% - 12.25%",
      processingFee: "0.50% + GST",
      loanAmount: "₹1 Lakh - ₹10 Crore",
      maxTenure: "30 years",
      rating: 4.3,
      features: ["Trusted brand", "Long tenure", "Flexible options", "Good customer service"]
    }
  ];

  const keyFeatures = [
    {
      icon: IndianRupee,
      title: "High Loan Amount",
      description: "Get up to ₹10 Crore for your dream home",
      color: "from-green-500 to-green-600"
    },
    {
      icon: Percent,
      title: "Competitive Interest Rates",
      description: "Starting from 8.50% per annum",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Calendar,
      title: "Flexible Tenure",
      description: "Repay over 10-30 years",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Clock,
      title: "Quick Processing",
      description: "Get approval within 7-15 days",
      color: "from-orange-500 to-orange-600"
    },
    {
      icon: Shield,
      title: "Minimal Documentation",
      description: "Simple and hassle-free process",
      color: "from-teal-500 to-teal-600"
    },
    {
      icon: TrendingUp,
      title: "Tax Benefits",
      description: "Save up to ₹2 Lakh in taxes annually",
      color: "from-red-500 to-red-600"
    }
  ];

  const eligibilityRequirements = [
    {
      category: "For Salaried Individuals",
      icon: Briefcase,
      requirements: [
        "Age: 21-65 years",
        "Minimum Income: ₹25,000 per month",
        "Employment: Minimum 2 years experience",
        "CIBIL Score: 700 or above",
        "Debt-to-Income Ratio: Below 50%"
      ]
    },
    {
      category: "For Self-Employed",
      icon: Building,
      requirements: [
        "Age: 21-65 years",
        "Minimum Income: ₹3 Lakh per annum",
        "Business vintage: Minimum 3 years",
        "CIBIL Score: 700 or above",
        "ITR for last 3 years required"
      ]
    }
  ];

  const documentsRequired = [
    {
      category: "Personal Documents",
      icon: UserCheck,
      documents: [
        "Identity Proof (Aadhaar/PAN/Passport)",
        "Address Proof (Utility Bills/Aadhaar)",
        "Income Proof (Salary Slips/ITR)",
        "Bank Statements (6 months)",
        "Employment Certificate",
        "Passport Size Photographs"
      ]
    },
    {
      category: "Property Documents",
      icon: Home,
      documents: [
        "Sale Agreement/Builder Agreement",
        "Property Title Documents",
        "Approved Building Plan",
        "NOC from Builder/Society",
        "Property Tax Receipts",
        "Encumbrance Certificate"
      ]
    }
  ];

  const faqs = [
    {
      question: "What is the maximum loan amount I can get for a home loan?",
      answer: "You can get up to ₹10 Crore as home loan depending on your income, property value, and repayment capacity. Most lenders offer loans up to 90% of the property value."
    },
    {
      question: "What are the interest rates for home loans?",
      answer: "Home loan interest rates range from 8.50% to 12.50% per annum. The exact rate depends on your credit score, income, loan amount, and the lender's policies."
    },
    {
      question: "How much down payment is required for a home loan?",
      answer: "Typically, you need to make a down payment of 10-20% of the property value. For properties above ₹30 lakh, the down payment is usually 20%."
    },
    {
      question: "What are the tax benefits on home loans?",
      answer: "You can claim deduction of up to ₹2 lakh on principal repayment under Section 80C and up to ₹2 lakh on interest payment under Section 24(b) of the Income Tax Act."
    },
    {
      question: "How long does it take to get a home loan approved?",
      answer: "Home loan approval typically takes 7-15 working days if all documents are in order. The process may take longer if additional verification is required."
    },
    {
      question: "Can I get a home loan for an under-construction property?",
      answer: "Yes, you can get a home loan for under-construction properties. The loan is disbursed in stages based on construction progress, and you pay only interest during the construction period."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-blue-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-green-600 via-teal-600 to-blue-700 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full transform -translate-x-1/2 translate-y-1/2"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-white/20 text-white border-white/30 mb-6">
                🏠 Home Loan Specialists
              </Badge>
              <h1 className="text-5xl font-bold mb-6 leading-tight">
                Turn Your Dream Home into 
                <span className="text-yellow-300"> Reality</span>
              </h1>
              <p className="text-xl mb-8 text-green-100 leading-relaxed">
                Get the best home loan deals with NetWealth India. Competitive rates starting from 8.50%, quick approval, and expert guidance throughout your home buying journey.
              </p>
              
              {/* Key Stats */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-300">₹10Cr+</div>
                  <div className="text-sm text-green-200">Max Loan Amount</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-300">8.50%</div>
                  <div className="text-sm text-green-200">Interest From</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-300">30 Years</div>
                  <div className="text-sm text-green-200">Max Tenure</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/20">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Home className="h-6 w-6 text-green-600" />
                Get Home Loan Quote
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName" className="text-gray-700">Full Name</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="mt-1 bg-white border-gray-300 text-gray-900"
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-gray-700">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="mt-1 bg-white border-gray-300 text-gray-900"
                      placeholder="Contact number"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="email" className="text-gray-700">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="mt-1 bg-white border-gray-300 text-gray-900"
                    placeholder="your@email.com"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="loanAmount" className="text-gray-700">Loan Amount</Label>
                    <Input
                      id="loanAmount"
                      name="loanAmount"
                      type="text"
                      value={formData.loanAmount}
                      onChange={handleInputChange}
                      className="mt-1 bg-white border-gray-300 text-gray-900"
                      placeholder="₹ Amount needed"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="propertyValue" className="text-gray-700">Property Value</Label>
                    <Input
                      id="propertyValue"
                      name="propertyValue"
                      type="text"
                      value={formData.propertyValue}
                      onChange={handleInputChange}
                      className="mt-1 bg-white border-gray-300 text-gray-900"
                      placeholder="₹ Property value"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="monthlyIncome" className="text-gray-700">Monthly Income</Label>
                    <Input
                      id="monthlyIncome"
                      name="monthlyIncome"
                      type="text"
                      value={formData.monthlyIncome}
                      onChange={handleInputChange}
                      className="mt-1 bg-white border-gray-300 text-gray-900"
                      placeholder="₹ Monthly income"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="loanPurpose" className="text-gray-700">Loan Purpose</Label>
                    <select
                      id="loanPurpose"
                      name="loanPurpose"
                      value={formData.loanPurpose}
                      onChange={handleInputChange}
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900"
                      required
                    >
                      <option value="">Select Purpose</option>
                      <option value="purchase">Home Purchase</option>
                      <option value="construction">Home Construction</option>
                      <option value="improvement">Home Improvement</option>
                      <option value="plot">Plot Purchase</option>
                      <option value="balance-transfer">Balance Transfer</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="propertyLocation" className="text-gray-700">Property Location</Label>
                  <Input
                    id="propertyLocation"
                    name="propertyLocation"
                    type="text"
                    value={formData.propertyLocation}
                    onChange={handleInputChange}
                    className="mt-1 bg-white border-gray-300 text-gray-900"
                    placeholder="Ghatkopar, Mumbai"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-all transform hover:scale-105"
                >
                  Get Expert Consultation
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Key Features */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose Our Home Loans?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get the best home loan experience with competitive rates, quick approval, and expert guidance
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {keyFeatures.map((feature, index) => (
              <Card key={index} className="relative overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${feature.color} opacity-10 rounded-full transform translate-x-8 -translate-y-8`}></div>
                <CardHeader className="relative">
                  <div className={`bg-gradient-to-r ${feature.color} rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-center text-gray-800 text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Home Loan Types */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Home Loan Types</h2>
            <p className="text-xl text-gray-600">Choose the right home loan for your needs</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loanTypes.map((type, index) => (
              <Card key={index} className="hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <CardHeader>
                  <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <type.icon className="h-8 w-8 text-green-600" />
                  </div>
                  <CardTitle className="text-center text-green-800 text-lg">{type.type}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-gray-500">Amount:</span>
                      <div className="font-semibold text-gray-800">{type.loanAmount}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Rate:</span>
                      <div className="font-semibold text-green-600">{type.interestRate}</div>
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-500 text-sm">Tenure:</span>
                    <div className="font-semibold text-gray-800">{type.tenure}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-2">Features:</div>
                    <ul className="space-y-1">
                      {type.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-3 w-3 text-green-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* EMI Calculator */}
      <div className="py-20 bg-gradient-to-br from-slate-100 to-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Home Loan EMI Calculator</h2>
            <p className="text-xl text-gray-600">Calculate your monthly EMI and plan your budget</p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            <Card className="bg-white shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-700">
                  <Calculator className="h-6 w-6" />
                  Loan Calculator
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-gray-700 font-medium">Property Value: ₹{formatNumber(calculatorValues.propertyValue)}</Label>
                  <input
                    type="range"
                    min="500000"
                    max="100000000"
                    step="100000"
                    value={calculatorValues.propertyValue}
                    onChange={(e) => setCalculatorValues(prev => ({...prev, propertyValue: parseInt(e.target.value)}))}
                    className="w-full mt-2 accent-green-600"
                  />
                </div>
                
                <div>
                  <Label className="text-gray-700 font-medium">Down Payment: {calculatorValues.downPayment}%</Label>
                  <input
                    type="range"
                    min="10"
                    max="50"
                    step="5"
                    value={calculatorValues.downPayment}
                    onChange={(e) => setCalculatorValues(prev => ({...prev, downPayment: parseInt(e.target.value)}))}
                    className="w-full mt-2 accent-green-600"
                  />
                </div>
                
                <div>
                  <Label className="text-gray-700 font-medium">Interest Rate: {calculatorValues.interestRate}%</Label>
                  <input
                    type="range"
                    min="8"
                    max="15"
                    step="0.25"
                    value={calculatorValues.interestRate}
                    onChange={(e) => setCalculatorValues(prev => ({...prev, interestRate: parseFloat(e.target.value)}))}
                    className="w-full mt-2 accent-green-600"
                  />
                </div>
                
                <div>
                  <Label className="text-gray-700 font-medium">Tenure: {calculatorValues.tenure} years</Label>
                  <input
                    type="range"
                    min="5"
                    max="30"
                    step="1"
                    value={calculatorValues.tenure}
                    onChange={(e) => setCalculatorValues(prev => ({...prev, tenure: parseInt(e.target.value)}))}
                    className="w-full mt-2 accent-green-600"
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-700">
                  <PieChart className="h-6 w-6" />
                  EMI Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg">
                      <div className="text-sm text-gray-600">Monthly EMI</div>
                      <div className="text-2xl font-bold text-green-600">₹{formatNumber(calculateEMI.emi)}</div>
                    </div>
                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg">
                      <div className="text-sm text-gray-600">Loan Amount</div>
                      <div className="text-2xl font-bold text-blue-600">₹{formatNumber(calculateEMI.loanAmount)}</div>
                    </div>
                    <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg">
                      <div className="text-sm text-gray-600">Down Payment</div>
                      <div className="text-2xl font-bold text-purple-600">₹{formatNumber(calculateEMI.downPaymentAmount)}</div>
                    </div>
                    <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-lg">
                      <div className="text-sm text-gray-600">Total Interest</div>
                      <div className="text-2xl font-bold text-orange-600">₹{formatNumber(calculateEMI.totalInterest)}</div>
                    </div>
                  </div>
                  
                  <div className="text-center p-4 bg-gradient-to-r from-green-50 to-teal-50 rounded-lg">
                    <div className="text-sm text-gray-600">Total Amount Payable</div>
                    <div className="text-3xl font-bold text-green-600">₹{formatNumber(calculateEMI.totalAmount)}</div>
                    <div className="text-sm text-gray-500 mt-1">
                      Over {calculatorValues.tenure} years
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Top Lenders */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Top Home Loan Lenders</h2>
            <p className="text-xl text-gray-600">Compare and choose from the best home loan providers</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {topLenders.map((lender, index) => (
              <Card key={index} className="hover:shadow-xl transition-shadow border-l-4 border-green-500">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{lender.logo}</div>
                      <CardTitle className="text-xl text-gray-800">{lender.name}</CardTitle>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="font-semibold">{lender.rating}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-600">Interest Rate</div>
                    <div className="text-lg font-bold text-green-600">{lender.interestRate}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Loan Amount</div>
                    <div className="text-lg font-semibold text-gray-800">{lender.loanAmount}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-gray-500">Tenure:</span>
                      <div className="font-semibold">{lender.maxTenure}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Processing Fee:</span>
                      <div className="font-semibold">{lender.processingFee}</div>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-2">Key Features</div>
                    <ul className="space-y-1">
                      {lender.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    Apply Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Eligibility & Documents */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Eligibility */}
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-8">Eligibility Requirements</h2>
              <div className="space-y-6">
                {eligibilityRequirements.map((category, index) => (
                  <Card key={index} className="bg-white shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-green-700 flex items-center gap-2">
                        <category.icon className="h-5 w-5" />
                        {category.category}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {category.requirements.map((req, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Documents Required */}
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-8">Documents Required</h2>
              <div className="space-y-6">
                {documentsRequired.map((category, index) => (
                  <Card key={index} className="bg-white shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-green-700 flex items-center gap-2">
                        <category.icon className="h-5 w-5" />
                        {category.category}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {category.documents.map((doc, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm">
                            <FileText className="h-4 w-4 text-green-500 flex-shrink-0" />
                            <span>{doc}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Get answers to common home loan questions</p>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="bg-white shadow-lg">
                <CardHeader 
                  className="cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                >
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-left text-gray-800 pr-4">{faq.question}</CardTitle>
                    <ChevronRight 
                      className={`h-5 w-5 text-green-600 transform transition-transform ${
                        expandedFAQ === index ? 'rotate-90' : ''
                      }`} 
                    />
                  </div>
                </CardHeader>
                {expandedFAQ === index && (
                  <CardContent>
                    <div className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-r from-green-600 to-teal-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Buy Your Dream Home?</h2>
          <p className="text-xl mb-8 text-green-100">
                          Get the best home loan rates and expert guidance with NetWealth India
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold">
              Apply for Home Loan
            </Button>
            <Button className="bg-green-700 hover:bg-green-800 border-2 border-green-400 px-8 py-3 text-lg font-semibold">
              Calculate EMI
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 