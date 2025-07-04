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
  Home,
  Car,
  Plane,
  GraduationCap,
  Banknote,
  ShoppingBag,
  Laptop,
  HeartHandshake,
  Zap
} from 'lucide-react';

// Helper function for consistent number formatting to prevent hydration mismatch
const formatNumber = (num: number): string => {
  return Math.round(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export default function PersonalLoanPage() {
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

  const loanPurposes = [
    {
      purpose: "Wedding Expenses",
      icon: HeartHandshake,
      rate: "10.50% - 24.00%",
      description: "Make your dream wedding come true",
      popularity: "High"
    },
    {
      purpose: "Travel & Vacation",
      icon: Plane,
      rate: "11.00% - 25.00%",
      description: "Explore the world without financial stress",
      popularity: "High"
    },
    {
      purpose: "Education",
      icon: GraduationCap,
      rate: "10.75% - 23.00%",
      description: "Invest in your future with quality education",
      popularity: "Medium"
    },
    {
      purpose: "Medical Emergency",
      icon: Shield,
      rate: "10.25% - 22.00%",
      description: "Quick funds for urgent medical needs",
      popularity: "High"
    },
    {
      purpose: "Home Renovation",
      icon: Home,
      rate: "10.50% - 23.50%",
      description: "Transform your living space",
      popularity: "Medium"
    },
    {
      purpose: "Vehicle Purchase",
      icon: Car,
      rate: "11.25% - 24.50%",
      description: "Buy your dream car or bike",
      popularity: "Medium"
    },
    {
      purpose: "Debt Consolidation",
      icon: Banknote,
      rate: "10.75% - 22.50%",
      description: "Combine multiple debts into one",
      popularity: "High"
    },
    {
      purpose: "Electronics Purchase",
      icon: Laptop,
      rate: "11.50% - 25.50%",
      description: "Latest gadgets and appliances",
      popularity: "Low"
    }
  ];

  const topLenders = [
    {
      name: "HDFC Bank",
      logo: "🏛️",
      interestRate: "10.50% - 24.00%",
      processingFee: "Up to 4.99%",
      loanAmount: "₹50,000 - ₹40 Lakh",
      tenure: "12-60 months",
      rating: 4.8,
      features: ["Instant approval", "Doorstep service", "Flexible EMI", "Quick disbursal"]
    },
    {
      name: "ICICI Bank",
      logo: "🏪",
      interestRate: "10.75% - 22.00%",
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
      interestRate: "10.49% - 22.00%",
      processingFee: "Up to 3.00%",
      loanAmount: "₹50,000 - ₹15 Lakh",
      tenure: "12-60 months",
      rating: 4.6,
      features: ["Instant approval", "Flexible terms", "Digital documentation", "24/7 support"]
    },
    {
      name: "Bajaj Finserv",
      logo: "💳",
      interestRate: "13.00% - 30.00%",
      processingFee: "Up to 4.13%",
      loanAmount: "₹1 Lakh - ₹35 Lakh",
      tenure: "12-96 months",
      rating: 4.4,
      features: ["Flexi loan facility", "Instant disbursal", "Part prepayment", "Digital process"]
    },
    {
      name: "Kotak Mahindra Bank",
      logo: "🏬",
      interestRate: "10.99% - 24.00%",
      processingFee: "Up to 3.50%",
      loanAmount: "₹50,000 - ₹40 Lakh",
      tenure: "12-72 months",
      rating: 4.3,
      features: ["Premium service", "Customized solutions", "Expert advisory", "Quick processing"]
    }
  ];

  const keyFeatures = [
    {
      icon: IndianRupee,
      title: "High Loan Amount",
      description: "Get up to ₹50 Lakh based on your income",
      color: "from-green-500 to-green-600"
    },
    {
      icon: Zap,
      title: "Instant Approval",
      description: "Get approval within 5 minutes",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Clock,
      title: "Quick Disbursal",
      description: "Funds transferred in 24 hours",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Shield,
      title: "Minimal Documentation",
      description: "Simple paperwork and digital process",
      color: "from-orange-500 to-orange-600"
    },
    {
      icon: Percent,
      title: "Competitive Rates",
      description: "Starting from 10.25% per annum",
      color: "from-teal-500 to-teal-600"
    },
    {
      icon: Calendar,
      title: "Flexible Tenure",
      description: "Repay over 6-96 months",
      color: "from-red-500 to-red-600"
    }
  ];

  const eligibilityRequirements = [
    {
      category: "For Salaried Individuals",
      icon: Briefcase,
      requirements: [
        "Age: 21-60 years",
        "Minimum Income: ₹15,000 per month",
        "Employment: Minimum 1 year experience",
        "CIBIL Score: 650 or above",
        "Work with reputed company/MNC"
      ]
    },
    {
      category: "For Self-Employed",
      icon: Building,
      requirements: [
        "Age: 25-65 years",
        "Minimum Income: ₹2 Lakh per annum",
        "Business vintage: Minimum 2 years",
        "CIBIL Score: 650 or above",
        "ITR for last 2 years required"
      ]
    }
  ];

  const documentsRequired = [
    {
      category: "Identity & Address Proof",
      icon: UserCheck,
      documents: [
        "Aadhaar Card (mandatory)",
        "PAN Card (mandatory)",
        "Passport (if available)",
        "Voter ID Card",
        "Driving License",
        "Utility Bills (for address)"
      ]
    },
    {
      category: "Income Proof",
      icon: FileText,
      documents: [
        "Latest 3 months salary slips",
        "Bank statements (6 months)",
        "Form 16 / ITR (last 2 years)",
        "Employment certificate",
        "Offer letter / Appointment letter",
        "Business proof (for self-employed)"
      ]
    }
  ];

  const faqs = [
    {
      question: "What is the maximum personal loan amount I can get?",
      answer: "You can get a personal loan up to ₹50 Lakh depending on your income, credit score, and repayment capacity. Most lenders offer loans up to 10-20 times your monthly salary."
    },
    {
      question: "How quickly can I get a personal loan approved?",
      answer: "Personal loans can be approved within 5 minutes to 24 hours if you meet all eligibility criteria and have the required documents. Digital lenders often provide instant approval."
    },
    {
      question: "What are the interest rates for personal loans?",
      answer: "Personal loan interest rates range from 10.25% to 30% per annum depending on your credit profile, income, loan amount, and the lender's policies."
    },
    {
      question: "Can I prepay my personal loan without penalty?",
      answer: "Yes, most lenders allow prepayment of personal loans without any penalty. Some may charge a small prepayment fee, which varies by lender."
    },
    {
      question: "What is the minimum CIBIL score required for personal loan?",
      answer: "A minimum CIBIL score of 650 is required for personal loan approval. However, a score of 750 and above increases your chances of getting better interest rates."
    },
    {
      question: "Can I use a personal loan for any purpose?",
      answer: "Yes, personal loans are multipurpose loans that can be used for wedding, travel, medical emergencies, education, debt consolidation, or any personal financial need."
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
                💳 Personal Loan Specialists
              </Badge>
              <h1 className="text-5xl font-bold mb-6 leading-tight">
                Get Instant Personal Loans for 
                <span className="text-yellow-300"> Every Need</span>
            </h1>
              <p className="text-xl mb-8 text-green-100 leading-relaxed">
                Quick approval, instant disbursal, and competitive rates with NetWealth India. Get funds within 24 hours for any personal requirement.
              </p>
              
              {/* Key Stats */}
              <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-300">₹50L+</div>
                  <div className="text-sm text-green-200">Max Loan Amount</div>
              </div>
              <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-300">5 Min</div>
                  <div className="text-sm text-green-200">Instant Approval</div>
              </div>
              <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-300">10.25%</div>
                  <div className="text-sm text-green-200">Interest From</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/20">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <CreditCard className="h-6 w-6 text-green-600" />
                Get Personal Loan Quote
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
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="employmentType" className="text-gray-700">Employment Type</Label>
                    <select
                      id="employmentType"
                      name="employmentType"
                      value={formData.employmentType}
                      onChange={handleInputChange}
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900"
                      required
                    >
                      <option value="">Select Type</option>
                      <option value="salaried">Salaried</option>
                      <option value="self-employed">Self-Employed</option>
                      <option value="business">Business Owner</option>
                      <option value="professional">Professional</option>
                    </select>
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
                      <option value="wedding">Wedding</option>
                      <option value="travel">Travel</option>
                      <option value="medical">Medical Emergency</option>
                      <option value="education">Education</option>
                      <option value="debt-consolidation">Debt Consolidation</option>
                      <option value="home-renovation">Home Renovation</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="pincode" className="text-gray-700">Pincode</Label>
                  <Input
                    id="pincode"
                    name="pincode"
                    type="text"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    className="mt-1 bg-white border-gray-300 text-gray-900"
                    placeholder="400077"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-all transform hover:scale-105"
                >
                  Get Instant Approval
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
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose Our Personal Loans?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience hassle-free personal loans with instant approval and competitive rates
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

      {/* Loan Purposes */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Popular Loan Purposes</h2>
            <p className="text-xl text-gray-600">Use personal loans for any financial need</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {loanPurposes.map((purpose, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <CardHeader>
                  <div className="bg-green-100 rounded-full p-3 w-14 h-14 mx-auto mb-3 flex items-center justify-center">
                    <purpose.icon className="h-7 w-7 text-green-600" />
                  </div>
                  <CardTitle className="text-center text-green-800 text-lg">{purpose.purpose}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-gray-600 text-center">{purpose.description}</p>
                  <div className="text-center">
                    <div className="text-sm text-gray-500">Interest Rate</div>
                    <div className="font-semibold text-green-600">{purpose.rate}</div>
                  </div>
                  <div className="text-center">
                    <Badge variant={purpose.popularity === 'High' ? 'default' : purpose.popularity === 'Medium' ? 'secondary' : 'outline'}>
                      {purpose.popularity} Demand
                    </Badge>
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
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Personal Loan EMI Calculator</h2>
            <p className="text-xl text-gray-600">Calculate your monthly EMI and plan your finances</p>
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
                  <Label className="text-gray-700 font-medium">Loan Amount: ₹{formatNumber(calculatorValues.loanAmount)}</Label>
                  <input
                    type="range"
                    min="50000"
                    max="5000000"
                    step="25000"
                    value={calculatorValues.loanAmount}
                    onChange={(e) => setCalculatorValues(prev => ({...prev, loanAmount: parseInt(e.target.value)}))}
                    className="w-full mt-2 accent-green-600"
                  />
                </div>
                
                <div>
                  <Label className="text-gray-700 font-medium">Interest Rate: {calculatorValues.interestRate}%</Label>
                  <input
                    type="range"
                    min="10"
                    max="30"
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
                    max="8"
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
                    <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-lg">
                      <div className="text-sm text-gray-600">Total Interest</div>
                      <div className="text-2xl font-bold text-orange-600">₹{formatNumber(calculateEMI.totalInterest)}</div>
                      </div>
                    <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg">
                      <div className="text-sm text-gray-600">Total Amount</div>
                      <div className="text-2xl font-bold text-purple-600">₹{formatNumber(calculateEMI.totalAmount)}</div>
                          </div>
                        </div>
                  
                  <div className="text-center p-4 bg-gradient-to-r from-green-50 to-teal-50 rounded-lg">
                    <div className="text-sm text-gray-600">Total Payable Amount</div>
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
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Top Personal Loan Lenders</h2>
            <p className="text-xl text-gray-600">Compare and choose from the best personal loan providers</p>
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
                      <div className="font-semibold">{lender.tenure}</div>
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
            <p className="text-xl text-gray-600">Get answers to common personal loan questions</p>
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
            <h2 className="text-3xl font-bold mb-4">Ready to Get Your Personal Loan?</h2>
          <p className="text-xl mb-8 text-green-100">
                          Get instant approval and quick disbursal with NetWealth India
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold">
              Apply for Personal Loan
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
