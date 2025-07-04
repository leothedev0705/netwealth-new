'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  RefreshCw, 
  Calculator, 
  CheckCircle, 
  TrendingDown,
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
  ArrowRight,
  Briefcase,
  Building,
  Home,
  Zap,
  CreditCard,
  TrendingUp,
  Activity,
  AlertCircle,
  Handshake,
  Eye,
  ThumbsUp,
  Lightbulb,
  DollarSign,
  Coins
} from 'lucide-react';

const formatNumber = (num: number): string => {
  return Math.round(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export default function HomeBalanceTransferPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    currentLoanAmount: '',
    currentEMI: '',
    currentRate: '',
    propertyValue: '',
    monthlyIncome: '',
    employmentType: '',
    pincode: '400077'
  });

  const [calculatorValues, setCalculatorValues] = useState({
    currentLoanAmount: 2500000,
    currentRate: 10.5,
    newRate: 8.5,
    remainingTenure: 15
  });

  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const calculateSavings = useMemo(() => {
    const principal = calculatorValues.currentLoanAmount;
    const currentMonthlyRate = calculatorValues.currentRate / 100 / 12;
    const newMonthlyRate = calculatorValues.newRate / 100 / 12;
    const months = calculatorValues.remainingTenure * 12;
    
    const currentEMI = (principal * currentMonthlyRate * Math.pow(1 + currentMonthlyRate, months)) / 
                       (Math.pow(1 + currentMonthlyRate, months) - 1);
    
    const newEMI = (principal * newMonthlyRate * Math.pow(1 + newMonthlyRate, months)) / 
                   (Math.pow(1 + newMonthlyRate, months) - 1);
    
    const currentTotal = currentEMI * months;
    const newTotal = newEMI * months;
    
    return {
      currentEMI,
      newEMI,
      monthlySavings: currentEMI - newEMI,
      totalSavings: currentTotal - newTotal,
      currentTotal,
      newTotal
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

  const benefits = [
    {
      icon: TrendingDown,
      title: "Lower Interest Rates",
      description: "Get up to 2% lower interest rates than your current loan",
      color: "bg-green-100 text-green-600"
    },
    {
      icon: IndianRupee,
      title: "Significant Savings",
      description: "Save lakhs in interest over the loan tenure",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: Clock,
      title: "Quick Processing",
      description: "Get approval within 7-10 days with minimal documentation",
      color: "bg-purple-100 text-purple-600"
    },
    {
      icon: Shield,
      title: "No Hidden Charges",
      description: "Transparent pricing with no surprises",
      color: "bg-orange-100 text-orange-600"
    }
  ];

  const topLenders = [
    {
      name: "HDFC Bank",
      logo: "🏛️",
      interestRate: "7.75% - 9.50%",
      processingFee: "0.50% - 1.00%",
      features: ["Top-up facility", "Doorstep service", "Quick approval"],
      rating: 4.8
    },
    {
      name: "SBI Bank",
      logo: "🏦",
      interestRate: "7.85% - 9.25%",
      processingFee: "0.25% - 0.75%",
      features: ["Government backing", "Low processing fee", "Flexible terms"],
      rating: 4.6
    },
    {
      name: "ICICI Bank",
      logo: "🏪",
      interestRate: "7.90% - 9.75%",
      processingFee: "0.75% - 1.25%",
      features: ["Digital process", "Pre-approved offers", "Balance transfer"],
      rating: 4.7
    },
    {
      name: "Axis Bank",
      logo: "🏢",
      interestRate: "8.00% - 10.00%",
      processingFee: "0.50% - 1.00%",
      features: ["Competitive rates", "Fast processing", "Relationship benefits"],
      rating: 4.5
    }
  ];

  const faqs = [
    {
      question: "What is a home loan balance transfer?",
      answer: "A home loan balance transfer allows you to move your existing home loan from one lender to another that offers better interest rates or terms. This helps you save money on interest payments and reduce your EMI burden."
    },
    {
      question: "How much can I save with a balance transfer?",
      answer: "Savings depend on the interest rate difference and remaining tenure. Even a 0.5% rate reduction can save you lakhs over the loan tenure. Use our calculator to see your potential savings."
    },
    {
      question: "What are the charges for balance transfer?",
      answer: "Common charges include processing fees (0.25% to 1.25% of loan amount), legal charges, stamp duty, and registration fees. These costs are often recovered through interest savings within 2-3 years."
    },
    {
      question: "How long does the balance transfer process take?",
      answer: "The process typically takes 15-30 days, including application, approval, legal verification, and fund transfer. Some lenders offer faster processing for pre-approved customers."
    },
    {
      question: "Can I get a top-up loan with balance transfer?",
      answer: "Yes, many lenders offer top-up loans along with balance transfer. This gives you additional funds at home loan rates, which are typically lower than personal loan rates."
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
                <RefreshCw className="h-16 w-16 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Home Loan Balance Transfer
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Switch to lower interest rates and save lakhs on your home loan
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                <Calculator className="mr-2 h-5 w-5" />
                Calculate Savings
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600">
                <FileText className="mr-2 h-5 w-5" />
                Check Eligibility
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-green-100 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <Percent className="h-10 w-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">7.75%</h3>
                <p className="text-gray-600">Starting Interest Rate</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <IndianRupee className="h-10 w-10 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">₹25 Lakh</h3>
                <p className="text-gray-600">Average Savings</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <Clock className="h-10 w-10 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">7-10 Days</h3>
                <p className="text-gray-600">Processing Time</p>
              </div>
              <div className="text-center">
                <div className="bg-orange-100 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <Shield className="h-10 w-10 text-orange-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Zero</h3>
                <p className="text-gray-600">Pre-payment Penalty</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Why Choose Home Loan Balance Transfer?
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Take advantage of lower interest rates and better terms to reduce your financial burden
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="pb-4">
                    <div className={`rounded-full p-3 w-fit ${benefit.color}`}>
                      <benefit.icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-lg">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Savings Calculator */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Balance Transfer Savings Calculator</h2>
              <p className="text-gray-600">See how much you can save with a balance transfer</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="p-6">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5 text-purple-600" />
                    Loan Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="currentLoanAmount">Current Loan Amount (₹)</Label>
                    <Input
                      id="currentLoanAmount"
                      type="number"
                      value={calculatorValues.currentLoanAmount}
                      onChange={(e) => setCalculatorValues(prev => ({ ...prev, currentLoanAmount: Number(e.target.value) }))}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="currentRate">Current Interest Rate (%)</Label>
                    <Input
                      id="currentRate"
                      type="number"
                      step="0.1"
                      value={calculatorValues.currentRate}
                      onChange={(e) => setCalculatorValues(prev => ({ ...prev, currentRate: Number(e.target.value) }))}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="newRate">New Interest Rate (%)</Label>
                    <Input
                      id="newRate"
                      type="number"
                      step="0.1"
                      value={calculatorValues.newRate}
                      onChange={(e) => setCalculatorValues(prev => ({ ...prev, newRate: Number(e.target.value) }))}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="remainingTenure">Remaining Tenure (Years)</Label>
                    <Input
                      id="remainingTenure"
                      type="number"
                      value={calculatorValues.remainingTenure}
                      onChange={(e) => setCalculatorValues(prev => ({ ...prev, remainingTenure: Number(e.target.value) }))}
                      className="mt-1"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="p-6">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2">
                    <TrendingDown className="h-5 w-5 text-green-600" />
                    Your Savings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-red-50 p-4 rounded-lg">
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-1">Current EMI</p>
                      <p className="text-xl font-bold text-red-600">₹{formatNumber(calculateSavings.currentEMI)}</p>
                    </div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-1">New EMI</p>
                      <p className="text-xl font-bold text-green-600">₹{formatNumber(calculateSavings.newEMI)}</p>
                    </div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-1">Monthly Savings</p>
                      <p className="text-xl font-bold text-blue-600">₹{formatNumber(calculateSavings.monthlySavings)}</p>
                    </div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-1">Total Savings</p>
                      <p className="text-2xl font-bold text-purple-600">₹{formatNumber(calculateSavings.totalSavings)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Top Lenders */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Top Lenders for Balance Transfer</h2>
              <p className="text-gray-600">Compare offers from leading banks</p>
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
                              <Star key={i} className={`h-4 w-4 ${i < Math.floor(lender.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                            ))}
                            <span className="text-sm text-gray-600 ml-1">{lender.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 gap-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Interest Rate</span>
                        <span className="font-semibold">{lender.interestRate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Processing Fee</span>
                        <span className="font-semibold">{lender.processingFee}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-2">Key Features:</p>
                      <div className="flex flex-wrap gap-2">
                        {lender.features.map((feature, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">{feature}</Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button className="flex-1 bg-purple-600 hover:bg-purple-700">Apply Now</Button>
                      <Button variant="outline" className="flex-1">View Details</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Apply for Balance Transfer</h2>
              <p className="text-gray-600">Get expert guidance and best rates</p>
            </div>
            <Card className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input id="fullName" name="fullName" value={formData.fullName} onChange={handleInputChange} required className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} required className="mt-1" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} required className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="currentLoanAmount">Current Loan Amount *</Label>
                    <Input id="currentLoanAmount" name="currentLoanAmount" type="number" value={formData.currentLoanAmount} onChange={handleInputChange} required className="mt-1" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="currentEMI">Current EMI *</Label>
                    <Input id="currentEMI" name="currentEMI" type="number" value={formData.currentEMI} onChange={handleInputChange} required className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="monthlyIncome">Monthly Income *</Label>
                    <Input id="monthlyIncome" name="monthlyIncome" type="number" value={formData.monthlyIncome} onChange={handleInputChange} required className="mt-1" />
                  </div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="h-5 w-5 text-blue-600" />
                    <span className="font-semibold text-blue-800">Get Expert Guidance</span>
                  </div>
                  <p className="text-sm text-blue-700">Our experts will help you find the best balance transfer deal and handle the entire process.</p>
                </div>
                <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3">
                  <CheckCircle className="mr-2 h-5 w-5" />
                  Apply for Balance Transfer
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
              <p className="text-gray-600">Get answers to common questions about balance transfers</p>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg text-gray-800">{faq.question}</CardTitle>
                      <ChevronRight className={`h-5 w-5 text-gray-500 transition-transform ${expandedFAQ === index ? 'rotate-90' : ''}`} />
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

      {/* Contact */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Ready to Save on Your Home Loan?</h2>
            <p className="text-gray-600 mb-8">Our experts are here to help you with the balance transfer process</p>
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
              <h3 className="text-2xl font-bold mb-4">Start Your Balance Transfer Today</h3>
              <p className="mb-6">Save lakhs with lower interest rates and better terms</p>
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                <Zap className="mr-2 h-5 w-5" />
                Get Best Rates Now
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 