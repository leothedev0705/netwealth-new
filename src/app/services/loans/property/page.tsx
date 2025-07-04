'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Building2, 
  Calculator, 
  CheckCircle, 
  DollarSign,
  Home,
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
  Info,
  AlertCircle,
  MapPin,
  Landmark,
  Factory,
  Store,
  TreePine,
  Phone,
  Mail,
  Download,
  ArrowRight,
  IndianRupee,
  Calendar,
  TrendingUp,
  Eye,
  Building,
  Briefcase
} from 'lucide-react';

// Helper function for consistent number formatting to prevent hydration mismatch
const formatNumber = (num: number): string => {
  return Math.round(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export default function LoanAgainstPropertyPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    propertyType: '',
    loanAmount: '',
    propertyLocation: 'Ghatkopar, Mumbai',
    propertyValue: '',
    monthlyIncome: ''
  });

  const [calculatorValues, setCalculatorValues] = useState({
    propertyValue: 5000000,
    loanToValue: 70,
    interestRate: 9.5,
    tenure: 15
  });

  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  // LAP Calculator
  const calculateLAP = useMemo(() => {
    const loanAmount = (calculatorValues.propertyValue * calculatorValues.loanToValue) / 100;
    const monthlyRate = calculatorValues.interestRate / 100 / 12;
    const months = calculatorValues.tenure * 12;
    
    if (monthlyRate === 0) {
      return {
        emi: loanAmount / months,
        totalAmount: loanAmount,
        totalInterest: 0,
        loanAmount: loanAmount
      };
    }
    
    const emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                (Math.pow(1 + monthlyRate, months) - 1);
    
    return {
      emi: emi,
      totalAmount: emi * months,
      totalInterest: (emi * months) - loanAmount,
      loanAmount: loanAmount
    };
  }, [calculatorValues]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you! Our LAP specialist will contact you within 24 hours.');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const propertyTypes = [
    {
      type: "Residential Properties",
      icon: Home,
      description: "Independent houses, apartments, flats, and individual houses",
      ltv: "Up to 75%",
      riskLevel: "Low"
    },
    {
      type: "Commercial Properties",
      icon: Building2,
      description: "Offices, shops, complexes, office buildings, and hotel buildings",
      ltv: "Up to 65%",
      riskLevel: "Medium"
    },
    {
      type: "Industrial Properties",
      icon: Factory,
      description: "Manufacturing units, warehouses, and processing units",
      ltv: "Up to 60%",
      riskLevel: "Medium-High"
    },
    {
      type: "Land & Plots",
      icon: TreePine,
      description: "Agricultural land and non-agricultural land plots",
      ltv: "Up to 50%",
      riskLevel: "High"
    }
  ];

  const topLenders = [
    {
      name: "HDFC Bank",
      interestRate: "9.00% - 13.50%",
      processingFee: "0.50% + GST",
      loanAmount: "₹1 Lakh - ₹10 Crore",
      ltv: "Up to 75%",
      tenure: "Up to 20 years",
      rating: 4.8,
      features: ["Quick approval", "Flexible repayment", "Minimal documentation"]
    },
    {
      name: "ICICI Bank",
      interestRate: "9.25% - 14.00%",
      processingFee: "0.50% + GST",
      loanAmount: "₹50,000 - ₹5 Crore",
      ltv: "Up to 70%",
      tenure: "Up to 18 years",
      rating: 4.6,
      features: ["Digital process", "Competitive rates", "Expert guidance"]
    },
    {
      name: "SBI Bank",
      interestRate: "8.75% - 13.25%",
      processingFee: "0.35% + GST",
      loanAmount: "₹1 Lakh - ₹15 Crore",
      ltv: "Up to 80%",
      tenure: "Up to 25 years",
      rating: 4.4,
      features: ["Government backing", "Low interest rates", "Wide network"]
    },
    {
      name: "Axis Bank",
      interestRate: "9.50% - 14.50%",
      processingFee: "0.75% + GST",
      loanAmount: "₹1 Lakh - ₹5 Crore",
      ltv: "Up to 65%",
      tenure: "Up to 20 years",
      rating: 4.3,
      features: ["Fast processing", "Flexible terms", "Relationship manager"]
    },
    {
      name: "Kotak Mahindra Bank",
      interestRate: "9.75% - 15.00%",
      processingFee: "1.00% + GST",
      loanAmount: "₹5 Lakh - ₹10 Crore",
      ltv: "Up to 70%",
      tenure: "Up to 15 years",
      rating: 4.2,
      features: ["Premium service", "Customized solutions", "Expert advisory"]
    },
    {
      name: "PNB Housing Finance",
      interestRate: "10.25% - 16.00%",
      processingFee: "0.50% + GST",
      loanAmount: "₹1 Lakh - ₹5 Crore",
      ltv: "Up to 75%",
      tenure: "Up to 20 years",
      rating: 4.0,
      features: ["Specialized focus", "Quick disbursal", "Competitive rates"]
    }
  ];

  const faqs = [
    {
      question: "What types of properties are accepted by lenders to provide Loan Against Property (LAP)?",
      answer: "• Industrial properties, including factories, warehouses, and processing units.\n• Commercial properties, including malls, complexes, shops, office buildings, and hotel buildings.\n• Residential properties, including residential houses, apartments, flats, and individual houses.\n• Shops, factories, clinics and other properties.\n• It can also be provided against non-agricultural land.\n• LAP is also offered against unlandlordedish commission property if it's under the list of approved builders of lenders NBFCs."
    },
    {
      question: "Which bank is best for loan against property?",
      answer: "ICICI, SBI Bank, Kotak Bank, HDFC, SBI - Partner banks are some of the banks which are offering great deals on loan against property."
    },
    {
      question: "What is a mortgage loan?",
      answer: "A mortgage loan is a loan provided by banks and other financial institutions against the mortgage of property or other assets for personal as well as business purposes."
    },
    {
      question: "How can I apply for a mortgage loan?",
      answer: "You can apply for a mortgage loan through NetWealth India, through the lender's website, visiting the nearest branch of the loan provider or by calling on their customer care number."
    },
    {
      question: "What is a reverse mortgage loan?",
      answer: "A Reverse Mortgage Loan is a credit facility which provides an additional income source to senior citizens of India, who have a self-owned or unencumbered house in India. It is a financial arrangement designed for senior citizens to fulfill their funding needs."
    },
    {
      question: "What is the maximum loan tenure available under LAP?",
      answer: "Most lenders provide maximum repayment tenure of 15 to 25 years for LAP."
    },
    {
      question: "How much loan we can get against property?",
      answer: "You can get up to 90% of property's market value as loan against your property. Depending on your property's value and your repayment capacity."
    },
    {
      question: "Can NRIs avail loans against property?",
      answer: "Yes, NRIs can get LAP from a lender if they are citizens, work for a reputed organization in selected countries and own a residential/commercial property in India."
    },
    {
      question: "What is the difference between home loan and Loan Against Property?",
      answer: "A home loan is availed for the purchase/construction/renovation/repair of a residential house property whereas LAP is availed to fulfill any personal or business requirement use like a personal loan."
    },
    {
      question: "How much CIBIL score is required for loan against property?",
      answer: "Individuals with a minimum CIBIL score of 650 or above leads ideal LAP."
    },
    {
      question: "How to get a loan against property without income proof?",
      answer: "• Substantiate your income to the lender.\n• Maintain a high average monthly balance in your savings bank account.\n• Opt for a lower loan/credit limit.\n• You can also consider Pre-approved lending alternatives.\n• Apply with a co-applicant."
    },
    {
      question: "What is the process of Mortgage loan?",
      answer: "• Fill in the application form and submit it along with the required documents.\n• Lenders will verify all the details.\n• The property to be mortgaged will be evaluated by the lender.\n• After evaluation and your eligibility check, your application will be approved if you are eligible.\n• You will receive the loan agreement.\n• If you agree with all the terms and sign the document, the loan amount will be transferred to your account within a few days."
    },
    {
      question: "Can I get a mortgage loan with bad credit?",
      answer: "Yes. Being a secured loan, your application can be approved with a low credit score as well. You can also co-apply for the loan with your earning spouse or other co-applicants."
    }
  ];

  const keyFeatures = [
    {
      icon: IndianRupee,
      title: "High Loan Amount",
      description: "Get up to ₹10 Crore based on property value"
    },
    {
      icon: Percent,
      title: "Competitive Interest Rates",
      description: "Starting from 8.75% per annum"
    },
    {
      icon: Calendar,
      title: "Flexible Tenure",
      description: "Repay over 15-25 years"
    },
    {
      icon: Clock,
      title: "Quick Processing",
      description: "Get approval within 7-10 working days"
    },
    {
      icon: Shield,
      title: "Minimal Documentation",
      description: "Simple and hassle-free documentation"
    },
    {
      icon: TrendingUp,
      title: "No End-Use Restriction",
      description: "Use funds for any personal or business purpose"
    }
  ];

  const eligibilityRequirements = [
    {
      category: "For Salaried Individuals",
      requirements: [
        "Age: 21-65 years",
        "Minimum Income: ₹25,000 per month",
        "Employment: Minimum 2 years in current job",
        "CIBIL Score: 650 or above",
        "Property ownership documents"
      ]
    },
    {
      category: "For Self-Employed",
      requirements: [
        "Age: 21-65 years",
        "Minimum Income: ₹2 Lakh per annum",
        "Business vintage: Minimum 3 years",
        "CIBIL Score: 650 or above",
        "Property ownership documents"
      ]
    }
  ];

  const documentsRequired = [
    {
      category: "Personal Documents",
      documents: [
        "Identity Proof (Aadhaar/PAN/Passport)",
        "Address Proof (Utility Bills/Aadhaar)",
        "Income Proof (Salary Slips/ITR)",
        "Bank Statements (6 months)",
        "Employment Proof",
        "Photographs"
      ]
    },
    {
      category: "Property Documents",
      documents: [
        "Property Title Deed",
        "Sale Agreement",
        "Property Tax Receipts",
        "Approved Building Plan",
        "NOC from Builder/Society",
        "Property Valuation Report"
      ]
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
                🏠 Loan Against Property Specialists
              </Badge>
              <h1 className="text-5xl font-bold mb-6 leading-tight">
                Unlock Your Property's 
                <span className="text-yellow-300"> Hidden Value</span>
              </h1>
              <p className="text-xl mb-8 text-green-100 leading-relaxed">
                Get instant liquidity against your property with NetWealth India. Competitive rates starting from 9.00% with minimal documentation and quick approval.
              </p>
              
              {/* Key Stats */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-300">₹10Cr+</div>
                  <div className="text-sm text-green-200">Max Loan Amount</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-300">8.75%</div>
                  <div className="text-sm text-green-200">Interest From</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-300">90%</div>
                  <div className="text-sm text-green-200">LTV Ratio</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/20">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Building2 className="h-6 w-6 text-green-600" />
                Get LAP Quote Instantly
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
                    <Label htmlFor="propertyType" className="text-gray-700">Property Type</Label>
                    <select
                      id="propertyType"
                      name="propertyType"
                      value={formData.propertyType}
                      onChange={handleInputChange}
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900"
                      required
                    >
                      <option value="">Select Property Type</option>
                      <option value="residential">Residential Property</option>
                      <option value="commercial">Commercial Property</option>
                      <option value="industrial">Industrial Property</option>
                      <option value="land">Land/Plot</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="loanAmount" className="text-gray-700">Loan Amount Needed</Label>
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
                </div>
                
                <div className="grid grid-cols-2 gap-4">
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
                    required
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
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose Loan Against Property?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Leverage your property to get instant funds for any purpose with attractive interest rates and flexible terms
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {keyFeatures.map((feature, index) => (
              <Card key={index} className="relative overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-green-100 to-teal-100 rounded-full transform translate-x-8 -translate-y-8"></div>
                <CardHeader className="relative">
                  <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <feature.icon className="h-8 w-8 text-green-600" />
                  </div>
                  <CardTitle className="text-center text-green-800 text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Property Types */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Property Types Accepted</h2>
            <p className="text-xl text-gray-600">Wide range of properties accepted for loan against property</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {propertyTypes.map((type, index) => (
              <Card key={index} className="relative overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-green-100 to-teal-100 rounded-full transform translate-x-8 -translate-y-8"></div>
                <CardHeader className="relative">
                  <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <type.icon className="h-8 w-8 text-green-600" />
                  </div>
                  <CardTitle className="text-center text-green-800 text-lg">{type.type}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-gray-600 text-sm">{type.description}</p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-500">LTV:</span>
                      <div className="font-semibold text-green-600">{type.ltv}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Risk:</span>
                      <Badge variant={type.riskLevel === 'High' ? 'destructive' : type.riskLevel === 'Medium-High' ? 'secondary' : 'default'}>
                        {type.riskLevel}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* LAP Calculator */}
      <div className="py-20 bg-gradient-to-br from-slate-100 to-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">LAP EMI Calculator</h2>
            <p className="text-xl text-gray-600">Calculate your monthly EMI and loan eligibility</p>
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
                    min="1000000"
                    max="100000000"
                    step="100000"
                    value={calculatorValues.propertyValue}
                    onChange={(e) => setCalculatorValues(prev => ({...prev, propertyValue: parseInt(e.target.value)}))}
                    className="w-full mt-2 accent-green-600"
                  />
                </div>
                
                <div>
                  <Label className="text-gray-700 font-medium">Loan to Value: {calculatorValues.loanToValue}%</Label>
                  <input
                    type="range"
                    min="50"
                    max="90"
                    step="5"
                    value={calculatorValues.loanToValue}
                    onChange={(e) => setCalculatorValues(prev => ({...prev, loanToValue: parseInt(e.target.value)}))}
                    className="w-full mt-2 accent-green-600"
                  />
                </div>
                
                <div>
                  <Label className="text-gray-700 font-medium">Interest Rate: {calculatorValues.interestRate}%</Label>
                  <input
                    type="range"
                    min="8"
                    max="18"
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
                    min="1"
                    max="25"
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
                  Loan Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg">
                      <div className="text-sm text-gray-600">Monthly EMI</div>
                      <div className="text-2xl font-bold text-green-600">₹{formatNumber(calculateLAP.emi)}</div>
                    </div>
                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg">
                      <div className="text-sm text-gray-600">Loan Amount</div>
                      <div className="text-2xl font-bold text-blue-600">₹{formatNumber(calculateLAP.loanAmount)}</div>
                    </div>
                    <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg">
                      <div className="text-sm text-gray-600">Total Interest</div>
                      <div className="text-2xl font-bold text-green-600">₹{formatNumber(calculateLAP.totalInterest)}</div>
                    </div>
                    <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg">
                      <div className="text-sm text-gray-600">Total Amount</div>
                      <div className="text-2xl font-bold text-purple-600">₹{formatNumber(calculateLAP.totalAmount)}</div>
                    </div>
                  </div>
                  
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-sm text-gray-600">Available Loan Amount</div>
                    <div className="text-3xl font-bold text-green-600">₹{formatNumber(calculateLAP.loanAmount)}</div>
                    <div className="text-sm text-gray-500 mt-1">
                      Based on {calculatorValues.loanToValue}% LTV of property value
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
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Top LAP Lenders</h2>
            <p className="text-xl text-gray-600">Compare best loan against property offers from leading banks and NBFCs</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {topLenders.map((lender, index) => (
              <Card key={index} className="hover:shadow-xl transition-shadow border-l-4 border-green-500">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl text-gray-800">{lender.name}</CardTitle>
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
                      <span className="text-gray-500">LTV:</span>
                      <div className="font-semibold">{lender.ltv}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Tenure:</span>
                      <div className="font-semibold">{lender.tenure}</div>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Processing Fee</div>
                    <div className="text-sm font-semibold text-gray-800">{lender.processingFee}</div>
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
                      <CardTitle className="text-green-700">{category.category}</CardTitle>
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
                      <CardTitle className="text-green-700">{category.category}</CardTitle>
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

      {/* Application Process */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Simple Application Process</h2>
            <p className="text-xl text-gray-600">Get your loan approved in just 4 easy steps</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Apply Online",
                description: "Fill out our simple application form with basic details",
                icon: FileText
              },
              {
                step: "2",
                title: "Document Verification",
                description: "Submit required documents for verification",
                icon: Eye
              },
              {
                step: "3",
                title: "Property Evaluation",
                description: "Our experts will evaluate your property",
                icon: Building
              },
              {
                step: "4",
                title: "Loan Disbursal",
                description: "Get funds transferred to your account",
                icon: CheckCircle
              }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-green-100 rounded-full p-6 w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                  <step.icon className="h-10 w-10 text-green-600" />
                </div>
                <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-4 font-bold">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Everything you need to know about Loan Against Property</p>
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
                    <div className="text-gray-600 whitespace-pre-line leading-relaxed">
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
          <h2 className="text-3xl font-bold mb-4">Ready to Unlock Your Property's Value?</h2>
          <p className="text-xl mb-8 text-green-100">
                          Get competitive loan against property rates with quick approval from NetWealth India
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold">
              Apply for LAP Now
            </Button>
            <Button className="bg-green-700 hover:bg-green-800 border-2 border-green-400 px-8 py-3 text-lg font-semibold">
              Check Eligibility
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 