'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
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
  Zap,
  Globe,
  Briefcase,
  TrendingDown,
  ArrowUp,
  ArrowDown,
  IndianRupee,
  Calendar,
  AlertCircle,
  Info,
  Lightbulb,
  BookOpen,
  Eye
} from 'lucide-react';

// Helper function for consistent number formatting to prevent hydration mismatch
const formatNumber = (num: number): string => {
  return Math.round(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export default function IPOServicesPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    companyName: '',
    fundingAmount: '',
    businessType: ''
  });

  const [activeTab, setActiveTab] = useState('upcoming');
  const [calculatorValues, setCalculatorValues] = useState({
    sharePrice: 100,
    numberOfShares: 1000,
    listingGains: 15,
    investmentAmount: 100000
  });

  // IPO Calculator
  const calculateIPO = useMemo(() => {
    const totalInvestment = calculatorValues.sharePrice * calculatorValues.numberOfShares;
    const listingPrice = calculatorValues.sharePrice * (1 + calculatorValues.listingGains / 100);
    const totalValue = listingPrice * calculatorValues.numberOfShares;
    const profit = totalValue - totalInvestment;
    const profitPercentage = (profit / totalInvestment) * 100;
    
    return {
      totalInvestment,
      listingPrice,
      totalValue,
      profit,
      profitPercentage
    };
  }, [calculatorValues]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you! Our IPO expert will contact you within 24 hours for consultation.');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const ipoTypes = [
    {
      type: "Mainboard IPO",
      icon: Building2,
      minSize: "₹10 Crore+",
      timeline: "4-6 months",
      listingGains: "10-30%",
      riskLevel: "Medium",
      description: "Large established companies going public on main exchanges"
    },
    {
      type: "SME IPO",
      icon: Target,
      minSize: "₹1-10 Crore",
      timeline: "2-4 months",
      listingGains: "15-50%",
      riskLevel: "High",
      description: "Small and Medium Enterprises with high growth potential"
    },
    {
      type: "QIP (Qualified Institutional Placement)",
      icon: Users,
      minSize: "₹25 Crore+",
      timeline: "1-2 months",
      listingGains: "5-15%",
      riskLevel: "Low-Medium",
      description: "Quick fundraising for listed companies from qualified investors"
    },
    {
      type: "Rights Issue",
      icon: Shield,
      minSize: "₹5 Crore+",
      timeline: "2-3 months",
      listingGains: "0-10%",
      riskLevel: "Low",
      description: "Existing shareholders get priority to buy additional shares"
    }
  ];

  const upcomingIPOs = [
    {
      company: "TechCorp Solutions",
      sector: "Technology",
      issueSize: "₹500 Cr",
      priceRange: "₹180-200",
      openDate: "15 Jan 2025",
      closeDate: "17 Jan 2025",
      listingDate: "22 Jan 2025",
      subscriptionTimes: "12.5x",
      gmp: "+₹25",
      status: "Open"
    },
    {
      company: "Green Energy Ltd",
      sector: "Renewable Energy",
      issueSize: "₹750 Cr",
      priceRange: "₹320-350",
      openDate: "20 Jan 2025",
      closeDate: "22 Jan 2025",
      listingDate: "27 Jan 2025",
      subscriptionTimes: "8.2x",
      gmp: "+₹45",
      status: "Upcoming"
    },
    {
      company: "Pharma Innovations",
      sector: "Pharmaceuticals",
      issueSize: "₹300 Cr",
      priceRange: "₹150-175",
      openDate: "25 Jan 2025",
      closeDate: "27 Jan 2025",
      listingDate: "1 Feb 2025",
      subscriptionTimes: "15.8x",
      gmp: "+₹30",
      status: "Upcoming"
    }
  ];

  const recentListings = [
    {
      company: "FinTech Pro",
      sector: "Financial Services",
      listingPrice: "₹245",
      issuePrice: "₹200",
      gains: "+22.5%",
      currentPrice: "₹267",
      marketCap: "₹2,340 Cr",
      performance: "outperform"
    },
    {
      company: "EduTech Solutions",
      sector: "Education Technology",
      listingPrice: "₹180",
      issuePrice: "₹160",
      gains: "+12.5%",
      currentPrice: "₹195",
      marketCap: "₹1,560 Cr",
      performance: "perform"
    },
    {
      company: "Food Delivery Co",
      sector: "Food & Beverages",
      listingPrice: "₹85",
      issuePrice: "₹100",
      gains: "-15.0%",
      currentPrice: "₹92",
      marketCap: "₹920 Cr",
      performance: "underperform"
    }
  ];

  const services = [
    {
      title: "IPO Advisory & Structuring",
      icon: Lightbulb,
      features: ["Business valuation", "Capital structure optimization", "Regulatory compliance", "Timeline planning"],
      price: "₹5-15 Lakh"
    },
    {
      title: "Documentation & Legal",
      icon: FileText,
      features: ["DRHP preparation", "Legal due diligence", "Regulatory filings", "Compliance management"],
      price: "₹8-20 Lakh"
    },
    {
      title: "Investor Relations",
      icon: Users,
      features: ["Roadshow planning", "Investor presentations", "Book building", "Post-listing support"],
      price: "₹10-25 Lakh"
    },
    {
      title: "Market Making & Distribution",
      icon: TrendingUp,
      features: ["Price discovery", "Underwriting", "Distribution network", "Market stabilization"],
      price: "₹15-40 Lakh"
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
                📈 IPO & Capital Market Specialists
              </Badge>
              <h1 className="text-5xl font-bold mb-6 leading-tight">
                Launch Your IPO with 
                <span className="text-yellow-300"> Expert Guidance</span>
              </h1>
              <p className="text-xl mb-8 text-green-100 leading-relaxed">
                From initial planning to successful listing, NetWealth India provides comprehensive IPO services. Strategic advisory, regulatory compliance, and market expertise for your public offering journey.
              </p>
              
              {/* Key Stats */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-300">50+</div>
                  <div className="text-sm text-green-200">Successful IPOs</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-300">₹5000Cr+</div>
                  <div className="text-sm text-green-200">Capital Raised</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-300">85%</div>
                  <div className="text-sm text-green-200">Success Rate</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/20">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-green-600" />
                IPO Consultation Request
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
                      placeholder="Your name"
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
                    <Label htmlFor="companyName" className="text-gray-700">Company Name</Label>
                    <Input
                      id="companyName"
                      name="companyName"
                      type="text"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      className="mt-1 bg-white border-gray-300 text-gray-900"
                      placeholder="Your company"
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
                      <option value="technology">Technology</option>
                      <option value="manufacturing">Manufacturing</option>
                      <option value="services">Services</option>
                      <option value="healthcare">Healthcare</option>
                      <option value="finance">Finance</option>
                      <option value="retail">Retail</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="fundingAmount" className="text-gray-700">Expected Funding Size</Label>
                  <Input
                    id="fundingAmount"
                    name="fundingAmount"
                    type="text"
                    value={formData.fundingAmount}
                    onChange={handleInputChange}
                    className="mt-1 bg-white border-gray-300 text-gray-900"
                    placeholder="₹ Amount to raise"
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-all transform hover:scale-105"
                >
                  Get IPO Consultation
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* IPO Types */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">IPO Services & Solutions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive IPO services tailored to your business needs and market conditions
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {ipoTypes.map((type, index) => (
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
                      <span className="text-gray-500">Min Size:</span>
                      <div className="font-semibold text-gray-800">{type.minSize}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Timeline:</span>
                      <div className="font-semibold text-gray-800">{type.timeline}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Avg Gains:</span>
                      <div className="font-semibold text-green-600">{type.listingGains}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Risk:</span>
                      <Badge variant={type.riskLevel === 'High' ? 'destructive' : type.riskLevel === 'Medium' ? 'secondary' : 'default'}>
                        {type.riskLevel}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{type.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* IPO Calculator */}
      <div className="py-20 bg-gradient-to-br from-slate-100 to-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">IPO Investment Calculator</h2>
            <p className="text-xl text-gray-600">Calculate potential returns on your IPO investments</p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            <Card className="bg-white shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-700">
                  <Calculator className="h-6 w-6" />
                  Investment Calculator
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-gray-700 font-medium">Share Price: ₹{calculatorValues.sharePrice}</Label>
                  <input
                    type="range"
                    min="50"
                    max="2000"
                    step="10"
                    value={calculatorValues.sharePrice}
                    onChange={(e) => setCalculatorValues(prev => ({...prev, sharePrice: parseInt(e.target.value)}))}
                    className="w-full mt-2 accent-green-600"
                  />
                </div>
                
                <div>
                  <Label className="text-gray-700 font-medium">Number of Shares: {calculatorValues.numberOfShares}</Label>
                  <input
                    type="range"
                    min="10"
                    max="10000"
                    step="10"
                    value={calculatorValues.numberOfShares}
                    onChange={(e) => setCalculatorValues(prev => ({...prev, numberOfShares: parseInt(e.target.value)}))}
                    className="w-full mt-2 accent-green-600"
                  />
                </div>
                
                <div>
                  <Label className="text-gray-700 font-medium">Expected Listing Gains: {calculatorValues.listingGains}%</Label>
                  <input
                    type="range"
                    min="-20"
                    max="100"
                    step="5"
                    value={calculatorValues.listingGains}
                    onChange={(e) => setCalculatorValues(prev => ({...prev, listingGains: parseInt(e.target.value)}))}
                    className="w-full mt-2 accent-green-600"
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-700">
                  <PieChart className="h-6 w-6" />
                  Investment Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg">
                      <div className="text-sm text-gray-600">Total Investment</div>
                      <div className="text-2xl font-bold text-green-600">₹{formatNumber(calculateIPO.totalInvestment)}</div>
                    </div>
                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg">
                      <div className="text-sm text-gray-600">Listing Price</div>
                      <div className="text-2xl font-bold text-blue-600">₹{Math.round(calculateIPO.listingPrice)}</div>
                    </div>
                    <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg">
                      <div className="text-sm text-gray-600">Total Value</div>
                      <div className="text-2xl font-bold text-green-600">₹{formatNumber(calculateIPO.totalValue)}</div>
                    </div>
                    <div className={`bg-gradient-to-r p-4 rounded-lg ${calculateIPO.profit >= 0 ? 'from-emerald-50 to-emerald-100' : 'from-red-50 to-red-100'}`}>
                      <div className="text-sm text-gray-600">Profit/Loss</div>
                      <div className={`text-2xl font-bold ${calculateIPO.profit >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                        {calculateIPO.profit >= 0 ? '+' : ''}₹{formatNumber(Math.abs(calculateIPO.profit))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">Performance Metrics</h4>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-700">Return Percentage:</span>
                        <span className={`font-bold text-lg ${calculateIPO.profitPercentage >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {calculateIPO.profitPercentage >= 0 ? '+' : ''}{calculateIPO.profitPercentage.toFixed(2)}%
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-700">Share Appreciation:</span>
                        <span className="font-bold text-lg text-green-600">
                          ₹{(calculateIPO.listingPrice - calculatorValues.sharePrice).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Live IPO Market */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Live IPO Market</h2>
            <p className="text-xl text-gray-600">Track upcoming IPOs and recent listings</p>
          </div>
          
          {/* Tab Navigation */}
          <div className="flex justify-center mb-8">
            <div className="bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setActiveTab('upcoming')}
                className={`px-6 py-2 rounded-md font-medium transition-colors ${
                  activeTab === 'upcoming' ? 'bg-green-600 text-white' : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Upcoming IPOs
              </button>
              <button
                onClick={() => setActiveTab('recent')}
                className={`px-6 py-2 rounded-md font-medium transition-colors ${
                  activeTab === 'recent' ? 'bg-green-600 text-white' : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Recent Listings
              </button>
            </div>
          </div>
          
          {/* Upcoming IPOs */}
          {activeTab === 'upcoming' && (
            <div className="grid md:grid-cols-3 gap-6">
              {upcomingIPOs.map((ipo, index) => (
                <Card key={index} className="hover:shadow-xl transition-shadow border-l-4 border-green-500">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl text-gray-800">{ipo.company}</CardTitle>
                      <Badge variant={ipo.status === 'Open' ? 'default' : 'secondary'}>
                        {ipo.status}
                      </Badge>
                    </div>
                    <p className="text-gray-600">{ipo.sector}</p>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-gray-500">Issue Size:</span>
                        <div className="font-semibold">{ipo.issueSize}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Price Range:</span>
                        <div className="font-semibold">{ipo.priceRange}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Open Date:</span>
                        <div className="font-semibold">{ipo.openDate}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Close Date:</span>
                        <div className="font-semibold">{ipo.closeDate}</div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span className="text-sm text-gray-600">Subscription:</span>
                      <span className="font-bold text-blue-600">{ipo.subscriptionTimes}</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                      <span className="text-sm text-gray-600">GMP:</span>
                      <span className="font-bold text-green-600">{ipo.gmp}</span>
                    </div>
                    <Button className="w-full bg-green-600 hover:bg-green-700">
                      Apply for IPO
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          
          {/* Recent Listings */}
          {activeTab === 'recent' && (
            <div className="grid md:grid-cols-3 gap-6">
              {recentListings.map((listing, index) => (
                <Card key={index} className="hover:shadow-xl transition-shadow border-l-4 border-green-500">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl text-gray-800">{listing.company}</CardTitle>
                      <Badge 
                        variant={listing.performance === 'outperform' ? 'default' : 
                                listing.performance === 'perform' ? 'secondary' : 'destructive'}
                      >
                        {listing.performance}
                      </Badge>
                    </div>
                    <p className="text-gray-600">{listing.sector}</p>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-gray-500">Issue Price:</span>
                        <div className="font-semibold">{listing.issuePrice}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Listing Price:</span>
                        <div className="font-semibold">{listing.listingPrice}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Current Price:</span>
                        <div className="font-semibold">{listing.currentPrice}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Market Cap:</span>
                        <div className="font-semibold">{listing.marketCap}</div>
                      </div>
                    </div>
                    <div className={`flex justify-between items-center p-2 rounded ${
                      listing.gains.includes('+') ? 'bg-green-50' : 'bg-red-50'
                    }`}>
                      <span className="text-sm text-gray-600">Listing Gains:</span>
                      <span className={`font-bold text-lg ${
                        listing.gains.includes('+') ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {listing.gains}
                      </span>
                    </div>
                    <Button className="w-full bg-green-600 hover:bg-green-700">
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Service Packages */}
      <div className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">IPO Service Packages</h2>
            <p className="text-xl text-gray-600">Comprehensive end-to-end IPO services</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-xl transition-shadow bg-white">
                <CardHeader>
                  <div className="bg-gradient-to-r from-green-100 to-teal-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <service.icon className="h-8 w-8 text-green-600" />
                  </div>
                  <CardTitle className="text-center text-green-800 text-lg">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-800">{service.price}</div>
                    <div className="text-sm text-gray-600">Starting from</div>
                  </div>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    Get Quote
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
          <h2 className="text-3xl font-bold mb-4">Ready to Go Public?</h2>
          <p className="text-xl mb-8 text-green-100">
                          Transform your private company into a public success story with NetWealth India's expert IPO services
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold">
              Schedule IPO Consultation
            </Button>
            <Button className="bg-green-700 hover:bg-green-800 border-2 border-green-400 px-8 py-3 text-lg font-semibold">
              Download IPO Guide
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 