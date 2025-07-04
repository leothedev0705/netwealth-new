'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Percent, 
  Calculator, 
  CheckCircle, 
  TrendingUp,
  TrendingDown,
  BarChart3,
  Target,
  ChevronRight,
  Award,
  Clock,
  Users,
  Shield,
  Star,
  FileText,
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
  Wallet,
  Activity,
  PieChart,
  AlertCircle,
  Info
} from 'lucide-react';

// Helper function for consistent number formatting to prevent hydration mismatch
const formatNumber = (num: number): string => {
  return Math.round(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export default function PersonalLoanInterestRatesPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    loanAmount: '',
    monthlyIncome: '',
    employmentType: '',
    creditScore: '',
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

  const interestRateRanges = [
    {
      range: "9.60% - 12.00%",
      category: "Premium Rates",
      icon: Award,
      description: "For customers with excellent credit profiles",
      creditScore: "750+",
      income: "₹1 Lakh+",
      employment: "Salaried (MNC/PSU)",
      color: "bg-green-100 text-green-600"
    },
    {
      range: "12.01% - 16.00%",
      category: "Standard Rates",
      icon: Target,
      description: "For customers with good credit history",
      creditScore: "650-749",
      income: "₹50K+",
      employment: "Salaried/Self-employed",
      color: "bg-blue-100 text-blue-600"
    },
    {
      range: "16.01% - 20.00%",
      category: "Regular Rates",
      icon: BarChart3,
      description: "For customers with fair credit profiles",
      creditScore: "600-649",
      income: "₹30K+",
      employment: "All categories",
      color: "bg-yellow-100 text-yellow-600"
    },
    {
      range: "20.01% - 24.00%",
      category: "Higher Rates",
      icon: TrendingUp,
      description: "For customers with limited credit history",
      creditScore: "550-599",
      income: "₹25K+",
      employment: "Self-employed/New job",
      color: "bg-orange-100 text-orange-600"
    },
    {
      range: "24.01% - 28.00%",
      category: "Maximum Rates",
      icon: AlertCircle,
      description: "For customers with poor credit or high risk",
      creditScore: "Below 550",
      income: "₹20K+",
      employment: "Variable income",
      color: "bg-red-100 text-red-600"
    }
  ];

  const bankRates = [
    {
      bank: "HDFC Bank",
      logo: "🏛️",
      minRate: "9.60%",
      maxRate: "24.00%",
      processingFee: "Up to 4.99%",
      specialOffer: "0.50% cashback on EMI",
      rating: 4.8,
      features: ["Instant approval", "Doorstep service", "Pre-approved offers"]
    },
    {
      bank: "ICICI Bank",
      logo: "🏪",
      minRate: "10.25%",
      maxRate: "22.00%",
      processingFee: "Up to 3.50%",
      specialOffer: "No prepayment charges",
      rating: 4.7,
      features: ["Digital process", "Competitive rates", "Online tracking"]
    },
    {
      bank: "SBI Bank",
      logo: "🏦",
      minRate: "11.15%",
      maxRate: "15.40%",
      processingFee: "Up to 1.00%",
      specialOffer: "Low processing fee",
      rating: 4.5,
      features: ["Government backing", "Wide network", "Trusted brand"]
    },
    {
      bank: "Axis Bank",
      logo: "🏢",
      minRate: "10.75%",
      maxRate: "24.00%",
      processingFee: "Up to 2.00%",
      specialOffer: "Flexible tenure options",
      rating: 4.6,
      features: ["Fast processing", "Easy eligibility", "Mobile banking"]
    },
    {
      bank: "Kotak Mahindra",
      logo: "🏬",
      minRate: "10.99%",
      maxRate: "23.00%",
      processingFee: "Up to 3.00%",
      specialOffer: "Balance transfer facility",
      rating: 4.4,
      features: ["Quick disbursal", "Competitive rates", "Personal advisor"]
    },
    {
      bank: "YES Bank",
      logo: "🏪",
      minRate: "11.50%",
      maxRate: "25.00%",
      processingFee: "Up to 2.50%",
      specialOffer: "Special rates for women",
      rating: 4.3,
      features: ["Digital journey", "Quick approval", "Flexible terms"]
    }
  ];

  const rateFactors = [
    {
      factor: "Credit Score",
      impact: "High",
      description: "CIBIL score of 750+ gets you the best rates",
      icon: TrendingUp,
      color: "text-green-600"
    },
    {
      factor: "Monthly Income",
      impact: "High",
      description: "Higher income leads to lower interest rates",
      icon: IndianRupee,
      color: "text-blue-600"
    },
    {
      factor: "Employment Type",
      impact: "Medium",
      description: "Salaried employees get better rates than self-employed",
      icon: Briefcase,
      color: "text-purple-600"
    },
    {
      factor: "Loan Amount",
      impact: "Medium",
      description: "Higher loan amounts may attract slightly higher rates",
      icon: Wallet,
      color: "text-orange-600"
    },
    {
      factor: "Loan Tenure",
      impact: "Low",
      description: "Longer tenure may have marginally higher rates",
      icon: Calendar,
      color: "text-gray-600"
    },
    {
      factor: "Existing Relationship",
      impact: "Medium",
      description: "Existing bank customers often get preferential rates",
      icon: Users,
      color: "text-teal-600"
    }
  ];

  const faqs = [
    {
      question: "What factors determine my personal loan interest rate?",
      answer: "Your personal loan interest rate depends on several factors including your credit score, monthly income, employment type, loan amount, tenure, and relationship with the lender. A higher credit score (750+) and stable income typically qualify you for lower rates."
    },
    {
      question: "How can I get the lowest interest rate on my personal loan?",
      answer: "To get the lowest rates: maintain a high credit score (750+), have a stable income, choose a shorter tenure, apply during promotional periods, and consider banks where you have an existing relationship. Pre-approved offers often come with better rates."
    },
    {
      question: "Do interest rates vary between different banks?",
      answer: "Yes, interest rates vary significantly between banks. PSU banks like SBI typically offer lower rates but have stricter eligibility criteria. Private banks may offer higher rates but faster processing. Compare multiple lenders to find the best rate for your profile."
    },
    {
      question: "Are personal loan interest rates fixed or floating?",
      answer: "Most personal loans come with fixed interest rates, meaning your EMI remains constant throughout the loan tenure. Some banks offer floating rates that can change based on market conditions, but fixed rates are more common for personal loans."
    },
    {
      question: "Can I negotiate my personal loan interest rate?",
      answer: "Yes, you can negotiate, especially if you have a good credit score, existing relationship with the bank, or competing offers. Banks may offer rate reductions for high-value customers or during promotional periods. It's worth discussing with multiple lenders."
    },
    {
      question: "How often do personal loan interest rates change?",
      answer: "Banks review and adjust their personal loan rates regularly based on market conditions, RBI policies, and business strategy. Rates can change monthly or quarterly. Once you get a loan, your rate is typically locked for the entire tenure if it's a fixed-rate loan."
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
                <Percent className="h-16 w-16 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Personal Loan Interest Rates
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Compare competitive interest rates from top lenders and find the best deal for your needs
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                <Calculator className="mr-2 h-5 w-5" />
                Check Your Rate
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600">
                <FileText className="mr-2 h-5 w-5" />
                Compare Rates
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
                  <TrendingDown className="h-10 w-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">9.60%</h3>
                <p className="text-gray-600">Lowest Rate Available</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <Activity className="h-10 w-10 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">15.5%</h3>
                <p className="text-gray-600">Average Market Rate</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <Clock className="h-10 w-10 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">24 Hrs</h3>
                <p className="text-gray-600">Rate Confirmation</p>
              </div>
              <div className="text-center">
                <div className="bg-orange-100 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-10 w-10 text-orange-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">50+</h3>
                <p className="text-gray-600">Lender Partners</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interest Rate Ranges Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Interest Rate Ranges by Profile
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Your interest rate depends on your credit profile. Here's how rates vary across different customer categories.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {interestRateRanges.map((range, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-300 group">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <range.icon className={`h-8 w-8 ${range.color.split(' ')[1]}`} />
                      {range.category === "Premium Rates" && (
                        <Badge variant="destructive" className="bg-green-500">Best Rate</Badge>
                      )}
                      {range.category === "Standard Rates" && (
                        <Badge variant="secondary">Popular</Badge>
                      )}
                    </div>
                    <CardTitle className="text-lg font-semibold text-gray-800">
                      {range.range}
                    </CardTitle>
                    <p className="text-sm font-medium text-purple-600">{range.category}</p>
                    <p className="text-sm text-gray-600">{range.description}</p>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">Credit Score</span>
                        <span className="text-sm font-medium">{range.creditScore}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">Min Income</span>
                        <span className="text-sm font-medium">{range.income}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">Employment</span>
                        <span className="text-sm font-medium">{range.employment}</span>
                      </div>
                      <Button className="w-full mt-4 bg-purple-600 hover:bg-purple-700">
                        Check Eligibility
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

      {/* Bank Comparison Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Compare Interest Rates from Top Banks
              </h2>
              <p className="text-gray-600">
                Interest rates and features from leading financial institutions
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {bankRates.map((bank, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{bank.logo}</div>
                        <div>
                          <CardTitle className="text-lg">{bank.bank}</CardTitle>
                          <div className="flex items-center gap-1 mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < Math.floor(bank.rating)
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                            <span className="text-sm text-gray-600 ml-1">
                              {bank.rating}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg">
                      <div className="text-center">
                        <p className="text-sm text-gray-600 mb-1">Interest Rate Range</p>
                        <p className="text-xl font-bold text-purple-600">
                          {bank.minRate} - {bank.maxRate}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Processing Fee</span>
                        <span className="font-semibold">{bank.processingFee}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Special Offer</span>
                        <span className="font-semibold text-green-600">{bank.specialOffer}</span>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500 mb-2">Key Features:</p>
                      <div className="flex flex-wrap gap-2">
                        {bank.features.map((feature, idx) => (
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

      {/* Rate Factors Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Factors That Affect Your Interest Rate
              </h2>
              <p className="text-gray-600">
                Understanding what influences your personal loan interest rate
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {rateFactors.map((factor, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3">
                      <factor.icon className={`h-6 w-6 ${factor.color}`} />
                      <div>
                        <CardTitle className="text-lg">{factor.factor}</CardTitle>
                        <Badge 
                          variant={factor.impact === 'High' ? 'destructive' : factor.impact === 'Medium' ? 'default' : 'secondary'}
                          className="mt-1"
                        >
                          {factor.impact} Impact
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">{factor.description}</p>
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
                Interest Rate Impact Calculator
              </h2>
              <p className="text-gray-600">
                See how different interest rates affect your monthly EMI
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="p-6">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5 text-purple-600" />
                    Rate Impact Calculator
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
                  </div>
                </CardContent>
              </Card>

              <Card className="p-6">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5 text-purple-600" />
                    EMI Breakdown
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
                      <p className="text-sm text-gray-600 mb-1">Principal</p>
                      <p className="text-lg font-semibold text-blue-600">
                        ₹{formatNumber(calculateEMI.loanAmount)}
                      </p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg text-center">
                      <p className="text-sm text-gray-600 mb-1">Interest</p>
                      <p className="text-lg font-semibold text-green-600">
                        ₹{formatNumber(calculateEMI.totalInterest)}
                      </p>
                    </div>
                  </div>

                  <div className="bg-orange-50 p-4 rounded-lg text-center">
                    <p className="text-sm text-gray-600 mb-1">Total Payable</p>
                    <p className="text-xl font-bold text-orange-600">
                      ₹{formatNumber(calculateEMI.totalAmount)}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Get Your Personalized Rate Quote
              </h2>
              <p className="text-gray-600">
                Fill out the form below to get a personalized interest rate based on your profile
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
                    <Input
                      id="loanAmount"
                      name="loanAmount"
                      type="number"
                      value={formData.loanAmount}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                    />
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
                    <Label htmlFor="creditScore">Credit Score (if known)</Label>
                    <select
                      id="creditScore"
                      name="creditScore"
                      value={formData.creditScore}
                      onChange={handleInputChange}
                      className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="">Select Credit Score Range</option>
                      <option value="750+">750+ (Excellent)</option>
                      <option value="650-749">650-749 (Good)</option>
                      <option value="600-649">600-649 (Fair)</option>
                      <option value="550-599">550-599 (Poor)</option>
                      <option value="below-550">Below 550 (Very Poor)</option>
                      <option value="unknown">Don't Know</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      <option value="salaried-mnc">Salaried (MNC)</option>
                      <option value="salaried-psu">Salaried (PSU)</option>
                      <option value="salaried-private">Salaried (Private)</option>
                      <option value="self-employed">Self Employed</option>
                      <option value="professional">Professional</option>
                      <option value="business">Business Owner</option>
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
                    <span className="font-semibold text-blue-800">Get Instant Rate Quote</span>
                  </div>
                  <p className="text-sm text-blue-700">
                    Get personalized interest rates from multiple lenders within minutes. 100% secure and confidential.
                  </p>
                </div>

                <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3">
                  <CheckCircle className="mr-2 h-5 w-5" />
                  Get My Interest Rate Quote
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-600">
                Get answers to common questions about personal loan interest rates
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
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Need Help Understanding Interest Rates?
            </h2>
            <p className="text-gray-600 mb-8">
              Our loan experts are here to help you understand and compare interest rates from different lenders
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
              <h3 className="text-2xl font-bold mb-4">Ready to Get the Best Rate?</h3>
              <p className="mb-6">
                Compare personalized rates from top lenders and choose the best option for your needs
              </p>
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                <Zap className="mr-2 h-5 w-5" />
                Get Best Rate Now
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 