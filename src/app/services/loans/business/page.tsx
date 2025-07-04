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
  UserCheck,
  Store,
  Truck,
  Laptop,
  TrendingDown,
  CreditCard,
  Zap,
  Globe,
  Package,
  ShoppingCart,
  Wrench
} from 'lucide-react';

// Helper function for consistent number formatting to prevent hydration mismatch
const formatNumber = (num: number): string => {
  return Math.round(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export default function BusinessLoanPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    loanAmount: '',
    businessType: '',
    monthlyTurnover: '',
    businessVintage: '',
    loanPurpose: ''
  });

  const [calculatorValues, setCalculatorValues] = useState({
    loanAmount: 1000000,
    interestRate: 12.5,
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
    alert('Thank you! Our business loan expert will contact you within 24 hours.');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const loanTypes = [
    {
      type: "Working Capital Loan",
      icon: TrendingUp,
      loanAmount: "₹1 Lakh - ₹50 Crore",
      interestRate: "11.00% - 20.00%",
      tenure: "12-36 months",
      features: ["Flexible repayment", "Quick disbursal", "Overdraft facility", "Minimal documentation"]
    },
    {
      type: "Equipment Financing",
      icon: Wrench,
      loanAmount: "₹5 Lakh - ₹10 Crore",
      interestRate: "12.00% - 18.00%",
      tenure: "12-84 months",
      features: ["100% equipment financing", "Quick approval", "Flexible EMI", "Asset-backed security"]
    },
    {
      type: "Business Expansion Loan",
      icon: Globe,
      loanAmount: "₹10 Lakh - ₹25 Crore",
      interestRate: "11.50% - 19.00%",
      tenure: "12-120 months",
      features: ["Growth funding", "Competitive rates", "Long tenure", "Expert guidance"]
    },
    {
      type: "Term Loan",
      icon: Building2,
      loanAmount: "₹5 Lakh - ₹100 Crore",
      interestRate: "11.25% - 17.50%",
      tenure: "12-180 months",
      features: ["Fixed EMI", "Long-term funding", "Competitive rates", "Multiple purposes"]
    },
    {
      type: "Business Credit Line",
      icon: CreditCard,
      loanAmount: "₹1 Lakh - ₹10 Crore",
      interestRate: "12.50% - 22.00%",
      tenure: "12-60 months",
      features: ["Pay only for usage", "Instant access", "Revolving credit", "Digital platform"]
    },
    {
      type: "Invoice Financing",
      icon: Package,
      loanAmount: "₹50,000 - ₹5 Crore",
      interestRate: "13.00% - 24.00%",
      tenure: "30-180 days",
      features: ["Against invoices", "Quick processing", "Improve cash flow", "Minimal collateral"]
    }
  ];

  const topLenders = [
    {
      name: "HDFC Bank",
      logo: "🏛️",
      interestRate: "11.25% - 17.50%",
      processingFee: "0.50% - 2.00%",
      loanAmount: "₹1 Lakh - ₹100 Crore",
      maxTenure: "15 years",
      rating: 4.8,
      features: ["Digital platform", "Quick approval", "Relationship banking", "Expert advisory"]
    },
    {
      name: "ICICI Bank",
      logo: "🏪",
      interestRate: "11.50% - 18.00%",
      processingFee: "0.50% - 2.50%",
      loanAmount: "₹1 Lakh - ₹50 Crore",
      maxTenure: "10 years",
      rating: 4.7,
      features: ["Online application", "Fast processing", "Competitive rates", "Flexible terms"]
    },
    {
      name: "SBI Bank",
      logo: "🏦",
      interestRate: "10.75% - 16.50%",
      processingFee: "0.35% - 1.50%",
      loanAmount: "₹1 Lakh - ₹200 Crore",
      maxTenure: "15 years",
      rating: 4.6,
      features: ["Government backing", "Lowest rates", "Wide network", "Trusted brand"]
    },
    {
      name: "Axis Bank",
      logo: "🏢",
      interestRate: "11.75% - 19.00%",
      processingFee: "0.75% - 2.00%",
      loanAmount: "₹1 Lakh - ₹25 Crore",
      maxTenure: "12 years",
      rating: 4.5,
      features: ["Digital solutions", "Quick turnaround", "Flexible repayment", "Dedicated RM"]
    },
    {
      name: "Bajaj Finserv",
      logo: "💳",
      interestRate: "13.00% - 25.00%",
      processingFee: "1.00% - 4.00%",
      loanAmount: "₹1 Lakh - ₹30 Crore",
      maxTenure: "8 years",
      rating: 4.4,
      features: ["Instant approval", "Flexi loan facility", "Digital process", "Minimal documentation"]
    },
    {
      name: "Kotak Mahindra Bank",
      logo: "🏬",
      interestRate: "12.00% - 20.00%",
      processingFee: "0.50% - 3.00%",
      loanAmount: "₹5 Lakh - ₹50 Crore",
      maxTenure: "10 years",
      rating: 4.3,
      features: ["Customized solutions", "Expert guidance", "Premium service", "Industry expertise"]
    }
  ];

  const keyFeatures = [
    {
      icon: IndianRupee,
      title: "High Loan Amount",
      description: "Get up to ₹200 Crore for your business needs",
      color: "from-green-500 to-green-600"
    },
    {
      icon: Zap,
      title: "Quick Approval",
      description: "Get approval within 48 hours",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Clock,
      title: "Fast Disbursal",
      description: "Funds transferred in 3-7 days",
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
      description: "Starting from 10.75% per annum",
      color: "from-teal-500 to-teal-600"
    },
    {
      icon: Calendar,
      title: "Flexible Tenure",
      description: "Repay over 1-15 years",
      color: "from-red-500 to-red-600"
    }
  ];

  const eligibilityRequirements = [
    {
      category: "For Businesses",
      icon: Building2,
      requirements: [
        "Business vintage: Minimum 3 years",
        "Annual turnover: ₹40 Lakh+",
        "Business should be profitable",
        "Good credit history",
        "Valid business licenses"
      ]
    },
    {
      category: "For Directors/Partners",
      icon: UserCheck,
      requirements: [
        "Age: 21-65 years",
        "Indian resident",
        "Minimum 20% stake in business",
        "Good personal credit score",
        "Experience in the business domain"
      ]
    }
  ];

  const documentsRequired = [
    {
      category: "Business Documents",
      icon: Building,
      documents: [
        "Certificate of Incorporation",
        "Memorandum & Articles of Association",
        "Partnership Deed (if applicable)",
        "GST Registration Certificate",
        "Trade License",
        "Financial statements (3 years)",
        "Bank statements (12 months)",
        "ITR (3 years)"
      ]
    },
    {
      category: "Personal Documents",
      icon: UserCheck,
      documents: [
        "Identity Proof (Aadhaar/PAN/Passport)",
        "Address Proof (Utility Bills/Aadhaar)",
        "Director's/Partner's PAN Card",
        "Personal bank statements (6 months)",
        "Income proof",
        "Passport size photographs"
      ]
    }
  ];

  const applicationProcess = [
    {
      step: "1",
      title: "Apply Online",
      description: "Fill out our comprehensive business loan application",
      icon: FileText
    },
    {
      step: "2",
      title: "Document Verification",
      description: "Submit business and personal documents",
      icon: Eye
    },
    {
      step: "3",
      title: "Business Evaluation",
      description: "Our experts evaluate your business profile",
      icon: Building2
    },
    {
      step: "4",
      title: "Approval & Disbursal",
      description: "Get approved and receive funds quickly",
      icon: CheckCircle
    }
  ];

  const faqs = [
    {
      question: "What is the maximum business loan amount I can get?",
      answer: "You can get a business loan up to ₹200 Crore depending on your business turnover, profitability, and repayment capacity. Most lenders offer loans based on your business cash flow and credit profile."
    },
    {
      question: "What are the interest rates for business loans?",
      answer: "Business loan interest rates range from 10.75% to 25% per annum depending on your business profile, credit score, loan amount, and the lender's policies."
    },
    {
      question: "How long does it take to get a business loan approved?",
      answer: "Business loan approval typically takes 3-15 working days depending on the complexity of your business and completeness of documentation. Digital lenders can approve faster."
    },
    {
      question: "What is the minimum business vintage required?",
      answer: "Most lenders require a minimum business vintage of 3 years. However, some NBFCs may consider businesses with 1-2 years of operations for specific loan products."
    },
    {
      question: "Can I prepay my business loan without penalty?",
      answer: "Yes, most lenders allow prepayment of business loans. Some may charge a prepayment penalty of 2-4% which varies by lender and loan terms."
    },
    {
      question: "What collateral is required for business loans?",
      answer: "Collateral requirements vary by loan amount and type. Loans up to ₹1 Crore may be unsecured, while higher amounts typically require collateral like property or business assets."
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
                🏢 Business Loan Specialists
              </Badge>
              <h1 className="text-5xl font-bold mb-6 leading-tight">
                Fuel Your Business Growth with 
                <span className="text-yellow-300"> Smart Funding</span>
              </h1>
              <p className="text-xl mb-8 text-green-100 leading-relaxed">
                Get competitive business loans with NetWealth India. Quick approval, flexible terms, and expert guidance to accelerate your business growth.
              </p>
              
              {/* Key Stats */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-300">₹200Cr+</div>
                  <div className="text-sm text-green-200">Max Loan Amount</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-300">48 Hours</div>
                  <div className="text-sm text-green-200">Quick Approval</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-300">10.75%</div>
                  <div className="text-sm text-green-200">Interest From</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/20">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Building2 className="h-6 w-6 text-green-600" />
                Get Business Loan Quote
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
                    <Label htmlFor="businessType" className="text-gray-700">Business Type</Label>
                    <select
                      id="businessType"
                      name="businessType"
                      value={formData.businessType}
                      onChange={handleInputChange}
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900"
                      required
                    >
                      <option value="">Select Type</option>
                      <option value="manufacturing">Manufacturing</option>
                      <option value="trading">Trading</option>
                      <option value="services">Services</option>
                      <option value="retail">Retail</option>
                      <option value="wholesale">Wholesale</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="monthlyTurnover" className="text-gray-700">Monthly Turnover</Label>
                    <Input
                      id="monthlyTurnover"
                      name="monthlyTurnover"
                      type="text"
                      value={formData.monthlyTurnover}
                      onChange={handleInputChange}
                      className="mt-1 bg-white border-gray-300 text-gray-900"
                      placeholder="₹ Monthly turnover"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="businessVintage" className="text-gray-700">Business Vintage</Label>
                    <select
                      id="businessVintage"
                      name="businessVintage"
                      value={formData.businessVintage}
                      onChange={handleInputChange}
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900"
                      required
                    >
                      <option value="">Select Years</option>
                      <option value="1-2">1-2 years</option>
                      <option value="3-5">3-5 years</option>
                      <option value="5-10">5-10 years</option>
                      <option value="10+">10+ years</option>
                    </select>
                  </div>
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
                    <option value="working-capital">Working Capital</option>
                    <option value="equipment">Equipment Purchase</option>
                    <option value="expansion">Business Expansion</option>
                    <option value="inventory">Inventory Funding</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-all transform hover:scale-105"
                >
                  Let's go!
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
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose Our Business Loans?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Accelerate your business growth with competitive rates and flexible terms
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

      {/* Business Loan Types */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Types of Business Loans</h2>
            <p className="text-xl text-gray-600">Choose the right funding solution for your business needs</p>
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
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Business Loan EMI Calculator</h2>
            <p className="text-xl text-gray-600">Calculate your monthly EMI and plan your cash flow</p>
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
                    min="100000"
                    max="20000000"
                    step="100000"
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
                    max="25"
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
                    max="15"
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
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Top Business Loan Lenders</h2>
            <p className="text-xl text-gray-600">Compare and choose from the best business loan providers</p>
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

      {/* Application Process */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Simple Application Process</h2>
            <p className="text-xl text-gray-600">Get your business loan approved in just 4 easy steps</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {applicationProcess.map((step, index) => (
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
            <p className="text-xl text-gray-600">Get answers to common business loan questions</p>
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
          <h2 className="text-3xl font-bold mb-4">Ready to Grow Your Business?</h2>
          <p className="text-xl mb-8 text-green-100">
                          Get competitive business loan rates and expert guidance with NetWealth India
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold">
              Apply for Business Loan
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