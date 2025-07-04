'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Rocket, 
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
  TrendingUp,
  TrendingDown,
  ArrowUp,
  Factory,
  Home,
  Lightbulb,
  Settings,
  Wrench,
  Truck,
  Layers,
  MapPin,
  Calendar,
  IndianRupee,
  Percent,
  Eye
} from 'lucide-react';

// Helper function for consistent number formatting to prevent hydration mismatch
const formatNumber = (num: number): string => {
  return Math.round(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export default function ProjectFundingPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    projectType: '',
    fundingAmount: '',
    projectStage: '',
    timeline: ''
  });

  const [selectedSector, setSelectedSector] = useState('');
  const [calculatorValues, setCalculatorValues] = useState({
    projectCost: 10000000,
    equityRatio: 30,
    debtRatio: 50,
    grantRatio: 20,
    interestRate: 12,
    tenure: 7
  });

  // Project funding calculator
  const calculateFunding = useMemo(() => {
    const equityAmount = (calculatorValues.projectCost * calculatorValues.equityRatio) / 100;
    const debtAmount = (calculatorValues.projectCost * calculatorValues.debtRatio) / 100;
    const grantAmount = (calculatorValues.projectCost * calculatorValues.grantRatio) / 100;
    
    const monthlyRate = calculatorValues.interestRate / 100 / 12;
    const months = calculatorValues.tenure * 12;
    
    const emi = debtAmount > 0 ? (debtAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                (Math.pow(1 + monthlyRate, months) - 1) : 0;
    
    const totalInterest = (emi * months) - debtAmount;
    
    return {
      equityAmount,
      debtAmount,
      grantAmount,
      monthlyEMI: emi,
      totalInterest,
      totalDebtCost: emi * months
    };
  }, [calculatorValues]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you! Our project funding expert will contact you within 24 hours.');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const projectTypes = [
    {
      type: "Infrastructure Development",
      icon: Building2,
      fundingRange: "₹50 Cr - ₹5000 Cr",
      avgTimeline: "5-10 years",
      avgROI: "12-18%",
      riskLevel: "Medium-High",
      description: "Large-scale infrastructure projects like highways, bridges, ports, and airports",
      keyFactors: ["Government Support", "Environmental Clearance", "Land Acquisition", "Regulatory Approval"],
      fundingSources: ["Government Grants", "Development Banks", "PPP Models", "Infrastructure Bonds"]
    },
    {
      type: "Renewable Energy",
      icon: Zap,
      fundingRange: "₹10 Cr - ₹1000 Cr",
      avgTimeline: "2-5 years",
      avgROI: "15-25%",
      riskLevel: "Medium",
      description: "Solar, wind, hydro and other renewable energy projects",
      keyFactors: ["Grid Connectivity", "Power Purchase Agreement", "Land Availability", "Technology Risk"],
      fundingSources: ["Green Bonds", "Climate Funds", "Development Finance", "Carbon Credits"]
    },
    {
      type: "Technology & Innovation",
      icon: Lightbulb,
      fundingRange: "₹1 Cr - ₹100 Cr",
      avgTimeline: "1-3 years",
      avgROI: "20-40%",
      riskLevel: "High",
      description: "R&D projects, tech startups, and innovative technology development",
      keyFactors: ["Market Validation", "Intellectual Property", "Team Expertise", "Scalability"],
      fundingSources: ["Venture Capital", "Angel Investors", "Government Schemes", "Technology Funds"]
    },
    {
      type: "Manufacturing",
      icon: Factory,
      fundingRange: "₹5 Cr - ₹500 Cr",
      avgTimeline: "2-4 years",
      avgROI: "18-28%",
      riskLevel: "Medium",
      description: "Industrial manufacturing plants and production facilities",
      keyFactors: ["Raw Material Access", "Market Demand", "Technology", "Export Potential"],
      fundingSources: ["Term Loans", "Equipment Finance", "Working Capital", "Export Credit"]
    },
    {
      type: "Real Estate",
      icon: Home,
      fundingRange: "₹20 Cr - ₹1000 Cr",
      avgTimeline: "3-6 years",
      avgROI: "15-30%",
      riskLevel: "Medium-High",
      description: "Residential and commercial real estate development projects",
      keyFactors: ["Location", "Approvals", "Market Conditions", "Construction Quality"],
      fundingSources: ["Construction Finance", "NBFC Funding", "Real Estate Funds", "Joint Ventures"]
    },
    {
      type: "Agriculture & Food",
      icon: Layers,
      fundingRange: "₹2 Cr - ₹200 Cr",
      avgTimeline: "1-3 years",
      avgROI: "12-22%",
      riskLevel: "Medium",
      description: "Agriculture technology, food processing, and agri-business projects",
      keyFactors: ["Weather Risk", "Market Linkage", "Technology Adoption", "Supply Chain"],
      fundingSources: ["Priority Sector Lending", "NABARD Funding", "Agri-Funds", "Food Processing Schemes"]
    }
  ];

  const fundingSources = [
    {
      name: "Term Loans",
      type: "Debt",
      interestRate: "9-15%",
      tenure: "5-15 years",
      amount: "₹1 Cr - ₹500 Cr",
      features: ["Fixed/Floating rates", "Flexible tenure", "Structured repayment", "Collateral based"],
      suitableFor: ["Manufacturing", "Infrastructure", "Real Estate"]
    },
    {
      name: "Venture Capital",
      type: "Equity",
      interestRate: "20-35% IRR",
      tenure: "5-8 years",
      amount: "₹5 Cr - ₹200 Cr",
      features: ["No interest", "Equity dilution", "Strategic support", "Exit planning"],
      suitableFor: ["Technology", "Innovation", "Startups"]
    },
    {
      name: "Government Grants",
      type: "Grant",
      interestRate: "0-5%",
      tenure: "3-10 years",
      amount: "₹50 L - ₹100 Cr",
      features: ["Subsidized rates", "Sector specific", "Milestone based", "Limited availability"],
      suitableFor: ["Infrastructure", "Agriculture", "Renewable Energy"]
    },
    {
      name: "Private Equity",
      type: "Equity",
      interestRate: "18-30% IRR",
      tenure: "5-10 years",
      amount: "₹25 Cr - ₹1000 Cr",
      features: ["Large tickets", "Growth capital", "Strategic guidance", "Long term"],
      suitableFor: ["Manufacturing", "Infrastructure", "Real Estate"]
    },
    {
      name: "Development Finance",
      type: "Hybrid",
      interestRate: "8-12%",
      tenure: "10-20 years",
      amount: "₹10 Cr - ₹2000 Cr",
      features: ["Long tenure", "Development focus", "Concessional rates", "Multi-currency"],
      suitableFor: ["Infrastructure", "Renewable Energy", "Social Projects"]
    },
    {
      name: "Export Credit",
      type: "Debt",
      interestRate: "6-10%",
      tenure: "1-10 years",
      amount: "₹1 Cr - ₹500 Cr",
      features: ["Export focused", "Currency hedging", "Government backing", "Competitive rates"],
      suitableFor: ["Manufacturing", "Technology", "Services"]
    }
  ];

  const projectStages = [
    {
      stage: "Concept & Planning",
      duration: "3-6 months",
      fundingNeed: "5-10%",
      activities: ["Feasibility study", "Market research", "Initial design", "Regulatory assessment"],
      fundingSources: ["Angel investors", "Government grants", "Personal funds", "Family office"],
      milestones: ["Business plan", "Regulatory approvals", "Team formation", "Initial partnerships"]
    },
    {
      stage: "Development & Design",
      duration: "6-12 months",
      fundingNeed: "15-25%",
      activities: ["Detailed engineering", "Environmental clearance", "Land acquisition", "Technology selection"],
      fundingSources: ["Venture capital", "Development banks", "Strategic investors", "Government schemes"],
      milestones: ["Detailed project report", "Environmental clearance", "Technology partnerships", "Site acquisition"]
    },
    {
      stage: "Construction & Implementation",
      duration: "18-36 months",
      fundingNeed: "50-70%",
      activities: ["Civil construction", "Equipment procurement", "Installation & commissioning", "Testing"],
      fundingSources: ["Term loans", "Construction finance", "Equipment finance", "Progress payments"],
      milestones: ["Construction completion", "Equipment installation", "Trial runs", "Quality certification"]
    },
    {
      stage: "Operations & Scale-up",
      duration: "Ongoing",
      fundingNeed: "10-20%",
      activities: ["Commercial operations", "Market expansion", "Process optimization", "Technology upgrades"],
      fundingSources: ["Working capital", "Revenue financing", "Growth capital", "Performance bonds"],
      milestones: ["Commercial operation", "Revenue targets", "Market expansion", "Profitability"]
    }
  ];

  const riskFactors = [
    {
      risk: "Market Risk",
      impact: "High",
      probability: "Medium",
      mitigation: ["Market research", "Demand contracts", "Flexible pricing", "Diversification"],
      description: "Changes in market demand, pricing, and competitive landscape"
    },
    {
      risk: "Technology Risk",
      impact: "High", 
      probability: "Medium",
      mitigation: ["Proven technology", "Technical due diligence", "Backup solutions", "Insurance"],
      description: "Technology obsolescence, performance issues, or implementation challenges"
    },
    {
      risk: "Regulatory Risk",
      impact: "Medium",
      probability: "Low",
      mitigation: ["Regulatory compliance", "Government relations", "Policy monitoring", "Legal coverage"],
      description: "Changes in regulations, policies, or compliance requirements"
    },
    {
      risk: "Financial Risk",
      impact: "High",
      probability: "Medium",
      mitigation: ["Financial planning", "Multiple funding sources", "Contingency funds", "Hedging"],
      description: "Interest rate changes, currency fluctuation, or funding availability"
    },
    {
      risk: "Execution Risk",
      impact: "Medium",
      probability: "Medium",
      mitigation: ["Experienced team", "Detailed planning", "Progress monitoring", "Quality control"],
      description: "Delays, cost overruns, or quality issues during implementation"
    },
    {
      risk: "Environmental Risk",
      impact: "Medium",
      probability: "Low",
      mitigation: ["Environmental assessment", "Compliance monitoring", "Sustainable practices", "Insurance"],
      description: "Environmental impacts, climate risks, or sustainability concerns"
    }
  ];

  const filteredProjectTypes = useMemo(() => {
    if (!selectedSector) return projectTypes;
    return projectTypes.filter(project => 
      project.type.toLowerCase().includes(selectedSector.toLowerCase())
    );
  }, [selectedSector]);

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
                🚀 Project Funding Specialists
              </Badge>
              <h1 className="text-5xl font-bold mb-6 leading-tight">
                Fund Your Vision with 
                <span className="text-yellow-300"> Strategic Project Finance</span>
              </h1>
              <p className="text-xl mb-8 text-green-100 leading-relaxed">
                From innovative startups to mega infrastructure projects, NetWealth India provides comprehensive project funding solutions. Expert structuring, diverse funding sources, and end-to-end support for your ambitious projects.
              </p>
              
              {/* Key Stats */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-300">₹2000Cr+</div>
                  <div className="text-sm text-green-200">Projects Funded</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-300">500+</div>
                  <div className="text-sm text-green-200">Successful Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-300">92%</div>
                  <div className="text-sm text-green-200">Success Rate</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/20">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Rocket className="h-6 w-6 text-green-600" />
                Get Project Funding Quote
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
                      <option value="infrastructure">Infrastructure Development</option>
                      <option value="renewable">Renewable Energy</option>
                      <option value="technology">Technology & Innovation</option>
                      <option value="manufacturing">Manufacturing</option>
                      <option value="realestate">Real Estate</option>
                      <option value="agriculture">Agriculture & Food</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="projectStage" className="text-gray-700">Project Stage</Label>
                    <select
                      id="projectStage"
                      name="projectStage"
                      value={formData.projectStage}
                      onChange={handleInputChange}
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900"
                      required
                    >
                      <option value="">Select Stage</option>
                      <option value="concept">Concept & Planning</option>
                      <option value="development">Development & Design</option>
                      <option value="construction">Construction & Implementation</option>
                      <option value="operations">Operations & Scale-up</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
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
                  <div>
                    <Label htmlFor="timeline" className="text-gray-700">Project Timeline</Label>
                    <Input
                      id="timeline"
                      name="timeline"
                      type="text"
                      value={formData.timeline}
                      onChange={handleInputChange}
                      className="mt-1 bg-white border-gray-300 text-gray-900"
                      placeholder="e.g., 24 months"
                      required
                    />
                  </div>
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

      {/* Project Types with Sector Filter */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Project Funding Solutions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive funding solutions across sectors with specialized expertise and deep market knowledge
            </p>
          </div>
          
          {/* Sector Filter */}
          <div className="flex justify-center mb-12">
            <div className="bg-gray-100 rounded-lg p-1 flex flex-wrap gap-1">
              <button
                onClick={() => setSelectedSector('')}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  selectedSector === '' ? 'bg-green-600 text-white' : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                All Sectors
              </button>
              {['Infrastructure', 'Renewable', 'Technology', 'Manufacturing', 'Real Estate', 'Agriculture'].map((sector) => (
                <button
                  key={sector}
                  onClick={() => setSelectedSector(sector)}
                  className={`px-4 py-2 rounded-md font-medium transition-colors ${
                    selectedSector === sector ? 'bg-green-600 text-white' : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  {sector}
                </button>
              ))}
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjectTypes.map((type, index) => (
              <Card key={index} className="relative overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-green-100 to-teal-100 rounded-full transform translate-x-8 -translate-y-8"></div>
                <CardHeader className="relative">
                  <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <type.icon className="h-8 w-8 text-green-600" />
                  </div>
                  <CardTitle className="text-center text-green-800 text-lg">{type.type}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
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
                  
                  <p className="text-gray-600 text-sm leading-relaxed">{type.description}</p>
                  
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-gray-700">Key Success Factors:</h4>
                    <div className="space-y-1">
                      {type.keyFactors.map((factor, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs">
                          <CheckCircle className="h-3 w-3 text-green-500" />
                          <span className="text-gray-600">{factor}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-gray-700">Funding Sources:</h4>
                    <div className="flex flex-wrap gap-1">
                      {type.fundingSources.map((source, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {source}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Project Funding Calculator */}
      <div className="py-20 bg-gradient-to-br from-slate-100 to-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Project Funding Calculator</h2>
            <p className="text-xl text-gray-600">Structure your project funding with optimal mix of equity, debt, and grants</p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            <Card className="bg-white shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-700">
                  <Calculator className="h-6 w-6" />
                  Funding Structure
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-gray-700 font-medium">Project Cost: ₹{formatNumber(calculatorValues.projectCost)}</Label>
                  <input
                    type="range"
                    min="1000000"
                    max="500000000"
                    step="1000000"
                    value={calculatorValues.projectCost}
                    onChange={(e) => setCalculatorValues(prev => ({...prev, projectCost: parseInt(e.target.value)}))}
                    className="w-full mt-2 accent-green-600"
                  />
                </div>
                
                <div>
                  <Label className="text-gray-700 font-medium">Equity Ratio: {calculatorValues.equityRatio}%</Label>
                  <input
                    type="range"
                    min="10"
                    max="70"
                    step="5"
                    value={calculatorValues.equityRatio}
                    onChange={(e) => setCalculatorValues(prev => ({
                      ...prev, 
                      equityRatio: parseInt(e.target.value),
                      debtRatio: Math.min(80, 90 - parseInt(e.target.value) - prev.grantRatio)
                    }))}
                    className="w-full mt-2 accent-green-600"
                  />
                </div>
                
                <div>
                  <Label className="text-gray-700 font-medium">Debt Ratio: {calculatorValues.debtRatio}%</Label>
                  <input
                    type="range"
                    min="10"
                    max="80"
                    step="5"
                    value={calculatorValues.debtRatio}
                    onChange={(e) => setCalculatorValues(prev => ({
                      ...prev, 
                      debtRatio: parseInt(e.target.value),
                      equityRatio: Math.max(10, 90 - parseInt(e.target.value) - prev.grantRatio)
                    }))}
                    className="w-full mt-2 accent-green-600"
                  />
                </div>
                
                <div>
                  <Label className="text-gray-700 font-medium">Grant/Subsidy: {calculatorValues.grantRatio}%</Label>
                  <input
                    type="range"
                    min="0"
                    max="40"
                    step="5"
                    value={calculatorValues.grantRatio}
                    onChange={(e) => setCalculatorValues(prev => ({
                      ...prev, 
                      grantRatio: parseInt(e.target.value),
                      debtRatio: Math.min(80, 90 - prev.equityRatio - parseInt(e.target.value))
                    }))}
                    className="w-full mt-2 accent-green-600"
                  />
                </div>
                
                <div>
                  <Label className="text-gray-700 font-medium">Interest Rate: {calculatorValues.interestRate}%</Label>
                  <input
                    type="range"
                    min="6"
                    max="18"
                    step="0.25"
                    value={calculatorValues.interestRate}
                    onChange={(e) => setCalculatorValues(prev => ({...prev, interestRate: parseFloat(e.target.value)}))}
                    className="w-full mt-2 accent-green-600"
                  />
                </div>
                
                <div>
                  <Label className="text-gray-700 font-medium">Debt Tenure: {calculatorValues.tenure} years</Label>
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
                  Funding Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg">
                      <div className="text-sm text-gray-600">Equity Funding</div>
                      <div className="text-2xl font-bold text-green-600">₹{Math.round(calculateFunding.equityAmount / 100000).toFixed(1)}L</div>
                    </div>
                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg">
                      <div className="text-sm text-gray-600">Debt Funding</div>
                      <div className="text-2xl font-bold text-blue-600">₹{Math.round(calculateFunding.debtAmount / 100000).toFixed(1)}L</div>
                    </div>
                    <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-4 rounded-lg">
                      <div className="text-sm text-gray-600">Grant/Subsidy</div>
                      <div className="text-2xl font-bold text-yellow-600">₹{Math.round(calculateFunding.grantAmount / 100000).toFixed(1)}L</div>
                    </div>
                    <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg">
                      <div className="text-sm text-gray-600">Monthly EMI</div>
                      <div className="text-2xl font-bold text-purple-600">₹{Math.round(calculateFunding.monthlyEMI / 1000).toFixed(0)}K</div>
                    </div>
                  </div>
                  
                  {/* Visual Funding Structure */}
                  <div className="relative">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">Funding Structure</h4>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <div className="w-20 text-sm text-gray-600">Equity</div>
                        <div className="flex-1 bg-gray-200 rounded-full h-4 mx-3">
                          <div 
                            className="bg-green-500 h-4 rounded-full" 
                            style={{ width: `${calculatorValues.equityRatio}%` }}
                          ></div>
                        </div>
                        <div className="w-12 text-sm font-semibold">{calculatorValues.equityRatio}%</div>
                      </div>
                      
                      <div className="flex items-center">
                        <div className="w-20 text-sm text-gray-600">Debt</div>
                        <div className="flex-1 bg-gray-200 rounded-full h-4 mx-3">
                          <div 
                            className="bg-blue-500 h-4 rounded-full" 
                            style={{ width: `${calculatorValues.debtRatio}%` }}
                          ></div>
                        </div>
                        <div className="w-12 text-sm font-semibold">{calculatorValues.debtRatio}%</div>
                      </div>
                      
                      <div className="flex items-center">
                        <div className="w-20 text-sm text-gray-600">Grants</div>
                        <div className="flex-1 bg-gray-200 rounded-full h-4 mx-3">
                          <div 
                            className="bg-yellow-500 h-4 rounded-full" 
                            style={{ width: `${calculatorValues.grantRatio}%` }}
                          ></div>
                        </div>
                        <div className="w-12 text-sm font-semibold">{calculatorValues.grantRatio}%</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between text-sm">
                      <span>Total Interest Cost:</span>
                      <span className="font-semibold">₹{(calculateFunding.totalInterest / 100000).toFixed(1)}L</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Total Debt Cost:</span>
                      <span className="font-semibold">₹{(calculateFunding.totalDebtCost / 100000).toFixed(1)}L</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold text-green-600 border-t pt-2">
                      <span>Effective Cost of Capital:</span>
                      <span>{((calculateFunding.totalInterest / calculateFunding.debtAmount) * 100 * (calculatorValues.debtRatio / 100)).toFixed(2)}%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Funding Sources Comparison */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Funding Sources Comparison</h2>
            <p className="text-xl text-gray-600">Compare different funding options to find the best fit for your project</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fundingSources.map((source, index) => (
              <Card key={index} className="hover:shadow-xl transition-shadow border-l-4 border-green-500">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl text-gray-800">{source.name}</CardTitle>
                    <Badge variant={source.type === 'Equity' ? 'default' : source.type === 'Grant' ? 'secondary' : 'outline'}>
                      {source.type}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-gray-500">Cost/Return:</span>
                      <div className="font-semibold text-green-600">{source.interestRate}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Tenure:</span>
                      <div className="font-semibold text-gray-800">{source.tenure}</div>
                    </div>
                    <div className="col-span-2">
                      <span className="text-gray-500">Amount Range:</span>
                      <div className="font-semibold text-gray-800">{source.amount}</div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-gray-600 mb-2">Key Features:</div>
                    <ul className="space-y-1">
                      {source.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-3 w-3 text-green-500" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <div className="text-sm text-gray-600 mb-2">Suitable For:</div>
                    <div className="flex flex-wrap gap-1">
                      {source.suitableFor.map((sector, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {sector}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
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
          <h2 className="text-3xl font-bold mb-4">Ready to Fund Your Next Big Project?</h2>
          <p className="text-xl mb-8 text-green-100">
                          Get strategic project funding with optimal structuring and expert guidance from NetWealth India
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold">
              Schedule Consultation
            </Button>
            <Button className="bg-green-700 hover:bg-green-800 border-2 border-green-400 px-8 py-3 text-lg font-semibold">
              Download Project Guide
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 