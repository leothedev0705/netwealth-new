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
  Hammer,
  PieChart,
  BarChart3,
  Home,
  Factory,
  ChevronRight,
  TrendingUp,
  Award,
  Clock,
  Users,
  Shield,
  Star,
  Building,
  Target,
  Percent,
  FileText,
  Zap
} from 'lucide-react';


// Helper function for consistent number formatting to prevent hydration mismatch
const formatNumber = (num: number): string => {
  return Math.round(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export default function ConstructionFundingPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    projectType: '',
    fundingAmount: '',
    projectLocation: 'Ghatkopar, Mumbai'
  });

  const [calculatorValues, setCalculatorValues] = useState({
    projectCost: 5000000,
    downPayment: 25,
    interestRate: 10.5,
    tenure: 5
  });

  // Advanced EMI Calculator
  const calculateEMI = useMemo(() => {
    const principal = calculatorValues.projectCost * (100 - calculatorValues.downPayment) / 100;
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
    alert('Thank you! Our construction funding expert will contact you within 24 hours.');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const constructionTypes = [
    {
      type: "Residential Construction",
      icon: Home,
      fundingRange: "₹25 Lakh - ₹25 Crore",
      avgTimeline: "18-36 months",
      avgROI: "15-25%",
      riskLevel: "Medium"
    },
    {
      type: "Commercial Construction",
      icon: Building2,
      fundingRange: "₹50 Lakh - ₹100 Crore",
      avgTimeline: "24-48 months",
      avgROI: "20-35%",
      riskLevel: "Medium-High"
    },
    {
      type: "Industrial Construction",
      icon: Factory,
      fundingRange: "₹1 Crore - ₹500 Crore",
      avgTimeline: "36-60 months",
      avgROI: "25-40%",
      riskLevel: "High"
    },
    {
      type: "Infrastructure Projects",
      icon: Building,
      fundingRange: "₹10 Crore - ₹1000 Crore",
      avgTimeline: "48-120 months",
      avgROI: "12-20%",
      riskLevel: "High"
    }
  ];

  const lenders = [
    {
      name: "HDFC Bank",
      interestRate: "9.50% - 12.00%",
      processingFee: "0.50% + GST",
      rating: 4.7,
      features: ["Stage-wise disbursal", "Technical evaluation", "Quick approvals"]
    },
    {
      name: "ICICI Bank",
      interestRate: "9.75% - 12.50%",
      processingFee: "0.50% + GST",
      rating: 4.5,
      features: ["Digital monitoring", "Flexible repayment", "Technical assistance"]
    },
    {
      name: "SBI Bank",
      interestRate: "9.25% - 11.75%",
      processingFee: "0.35% + GST",
      rating: 4.3,
      features: ["Government backing", "Low interest rates", "Extensive network"]
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
                🏗️ Construction Funding Specialists
              </Badge>
              <h1 className="text-5xl font-bold mb-6 leading-tight">
                Build Your Vision with 
                <span className="text-yellow-300"> Smart Construction Funding</span>
              </h1>
              <p className="text-xl mb-8 text-green-100 leading-relaxed">
                From residential projects to mega infrastructure developments, get competitive funding solutions with NetWealth India. Expert guidance, flexible terms, and stage-wise disbursals.
              </p>
              

              
              {/* Key Stats */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-300">₹500Cr+</div>
                  <div className="text-sm text-green-200">Projects Funded</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-300">2000+</div>
                  <div className="text-sm text-green-200">Happy Builders</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-300">9.25%</div>
                  <div className="text-sm text-green-200">Interest From</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/20">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Calculator className="h-6 w-6 text-green-600" />
                Get Construction Funding Quote
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
                    <Label htmlFor="projectType" className="text-gray-700">Project Type</Label>
                    <select
                      id="projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleInputChange}
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900"
                      required
                    >
                      <option value="">Select Project Type</option>
                      <option value="residential">Residential Construction</option>
                      <option value="commercial">Commercial Construction</option>
                      <option value="industrial">Industrial Construction</option>
                      <option value="infrastructure">Infrastructure Project</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="fundingAmount" className="text-gray-700">Funding Required</Label>
                    <Input
                      id="fundingAmount"
                      name="fundingAmount"
                      type="text"
                      value={formData.fundingAmount}
                      onChange={handleInputChange}
                      className="mt-1 bg-white border-gray-300 text-gray-900"
                      placeholder="₹ Amount needed"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="projectLocation" className="text-gray-700">Project Location</Label>
                                      <Input
                      id="projectLocation"
                      name="projectLocation"
                      type="text"
                      value={formData.projectLocation}
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

      {/* Construction Types */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Construction Funding Solutions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive funding options for every type of construction project with specialized expertise
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {constructionTypes.map((type, index) => (
              <Card key={index} className="relative overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-green-100 to-teal-100 rounded-full transform translate-x-8 -translate-y-8"></div>
                <CardHeader className="relative">
                  <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <type.icon className="h-8 w-8 text-green-600" />
                  </div>
                  <CardTitle className="text-center text-green-800 text-lg">{type.type}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-500">Funding:</span>
                      <div className="font-semibold text-gray-800">{type.fundingRange}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Timeline:</span>
                      <div className="font-semibold text-gray-800">{type.avgTimeline}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Avg ROI:</span>
                      <div className="font-semibold text-green-600">{type.avgROI}</div>
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

      {/* EMI Calculator */}
      <div className="py-20 bg-gradient-to-br from-slate-100 to-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Construction Loan Calculator</h2>
            <p className="text-xl text-gray-600">Calculate your monthly payments and total construction cost</p>
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
                  <Label className="text-gray-700 font-medium">Project Cost: ₹{formatNumber(calculatorValues.projectCost)}</Label>
                  <input
                    type="range"
                    min="1000000"
                    max="100000000"
                    step="100000"
                    value={calculatorValues.projectCost}
                    onChange={(e) => setCalculatorValues(prev => ({...prev, projectCost: parseInt(e.target.value)}))}
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
                    max="20"
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
                  Loan Breakdown
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
                    <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg">
                      <div className="text-sm text-gray-600">Total Interest</div>
                      <div className="text-2xl font-bold text-green-600">₹{formatNumber(calculateEMI.totalInterest)}</div>
                    </div>
                    <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg">
                      <div className="text-sm text-gray-600">Total Amount</div>
                      <div className="text-2xl font-bold text-purple-600">₹{formatNumber(calculateEMI.totalAmount)}</div>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">Principal vs Interest</h4>
                    <div className="flex items-center justify-center mb-4">
                      <div className="relative w-48 h-48">
                        <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 100 100">
                          <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="8" />
                          <circle
                            cx="50" cy="50" r="40" fill="none" stroke="#10b981" strokeWidth="8"
                            strokeDasharray={`${(calculateEMI.loanAmount / calculateEMI.totalAmount) * 251.2} 251.2`}
                          />
                          <circle
                            cx="50" cy="50" r="40" fill="none" stroke="#3b82f6" strokeWidth="8"
                            strokeDasharray={`${(calculateEMI.totalInterest / calculateEMI.totalAmount) * 251.2} 251.2`}
                            strokeDashoffset={`-${(calculateEMI.loanAmount / calculateEMI.totalAmount) * 251.2}`}
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-lg font-bold text-gray-800">Total</div>
                            <div className="text-sm text-gray-600">₹{(calculateEMI.totalAmount / 100000).toFixed(1)}L</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-center gap-6">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-green-500 rounded"></div>
                        <span className="text-sm">Principal ({((calculateEMI.loanAmount / calculateEMI.totalAmount) * 100).toFixed(1)}%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-blue-500 rounded"></div>
                        <span className="text-sm">Interest ({((calculateEMI.totalInterest / calculateEMI.totalAmount) * 100).toFixed(1)}%)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Lender Comparison */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Top Construction Lenders</h2>
            <p className="text-xl text-gray-600">Compare leading banks and NBFCs for construction funding</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {lenders.map((lender, index) => (
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
                    <div className="text-sm text-gray-600">Processing Fee</div>
                    <div className="text-lg font-semibold text-gray-800">{lender.processingFee}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Key Features</div>
                    <ul className="space-y-1 mt-2">
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

      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-r from-green-600 to-teal-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Construction Project?</h2>
          <p className="text-xl mb-8 text-green-100">
                          Get pre-approved construction funding with competitive rates and expert guidance from NetWealth India
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold">
              Get Expert Consultation
            </Button>
            <Button className="bg-green-700 hover:bg-green-800 border-2 border-green-400 px-8 py-3 text-lg font-semibold">
              Download Brochure
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 