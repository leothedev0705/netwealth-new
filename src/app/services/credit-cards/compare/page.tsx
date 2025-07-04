'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  CreditCard, 
  Shield, 
  Percent, 
  Gift, 
  Star, 
  CheckCircle, 
  X,
  TrendingUp,
  Award,
  Zap,
  Globe,
  Plane,
  ShoppingCart,
  Car,
  Smartphone,
  ArrowRight,
  GitCompare,
  Filter,
  Search,
  Heart,
  Eye,
  Sparkles,
  DollarSign,
  Calendar,
  Target
} from 'lucide-react';

const CreditCardComparePage = () => {
  const [selectedCards, setSelectedCards] = useState<string[]>([]);
  const [filterBy, setFilterBy] = useState('all');
  const [sortBy, setSortBy] = useState('rewards');

  const creditCards = [
    // IDFC Bank Cards
    {
      id: 'idfc-classic',
      bank: 'IDFC FIRST Bank',
      name: 'FIRST Classic',
      type: 'Entry Level',
      annualFee: 499,
      joiningFee: 499,
      rewardRate: 1.5,
      welcomeBonus: 500,
      loungeAccess: 4,
      fuelSurcharge: true,
      foreignFee: 0,
      color: 'from-blue-500 to-purple-600',
      bankColor: 'bg-blue-500',
      features: ['1.5% cashback', 'No forex fees', '4 lounge visits', 'Fuel benefits'],
      category: 'cashback',
      rating: 4.2
    },
    {
      id: 'idfc-millennia',
      bank: 'IDFC FIRST Bank',
      name: 'Millennia',
      type: 'Premium',
      annualFee: 1000,
      joiningFee: 1000,
      rewardRate: 2.5,
      welcomeBonus: 2000,
      loungeAccess: 8,
      fuelSurcharge: true,
      foreignFee: 0,
      color: 'from-blue-600 to-purple-700',
      bankColor: 'bg-blue-600',
      features: ['2.5% online cashback', 'No forex fees', '8 lounge visits', 'Premium benefits'],
      category: 'rewards',
      rating: 4.5
    },
    // YES Bank Cards
    {
      id: 'yes-kisan',
      bank: 'YES Bank',
      name: 'Kisan Credit Card',
      type: 'Basic',
      annualFee: 500,
      joiningFee: 500,
      rewardRate: 2.0,
      welcomeBonus: 1000,
      loungeAccess: 2,
      fuelSurcharge: true,
      foreignFee: 3.5,
      color: 'from-purple-500 to-pink-600',
      bankColor: 'bg-purple-500',
      features: ['2% rewards', 'Rural benefits', '2 lounge visits', 'Agricultural focus'],
      category: 'lifestyle',
      rating: 4.0
    },
    {
      id: 'yes-prosperity',
      bank: 'YES Bank',
      name: 'Prosperity Edge',
      type: 'Premium',
      annualFee: 1500,
      joiningFee: 1500,
      rewardRate: 4.0,
      welcomeBonus: 3000,
      loungeAccess: 6,
      fuelSurcharge: true,
      foreignFee: 2.0,
      color: 'from-purple-600 to-pink-700',
      bankColor: 'bg-purple-600',
      features: ['4% shopping rewards', 'Dining benefits', '6 lounge visits', 'Travel perks'],
      category: 'rewards',
      rating: 4.3
    },
    // HDFC Bank Cards
    {
      id: 'hdfc-moneyback',
      bank: 'HDFC Bank',
      name: 'MoneyBack+',
      type: 'Entry Level',
      annualFee: 500,
      joiningFee: 500,
      rewardRate: 2.0,
      welcomeBonus: 500,
      loungeAccess: 0,
      fuelSurcharge: true,
      foreignFee: 3.5,
      color: 'from-red-500 to-orange-600',
      bankColor: 'bg-red-500',
      features: ['2% cashback', 'Online shopping', 'Fuel benefits', 'Digital first'],
      category: 'cashback',
      rating: 4.1
    },
    {
      id: 'hdfc-regalia',
      bank: 'HDFC Bank',
      name: 'Regalia',
      type: 'Premium',
      annualFee: 2500,
      joiningFee: 2500,
      rewardRate: 3.3,
      welcomeBonus: 5000,
      loungeAccess: 12,
      fuelSurcharge: true,
      foreignFee: 2.0,
      color: 'from-red-600 to-orange-700',
      bankColor: 'bg-red-600',
      features: ['3.3% rewards', 'Dining benefits', '12 lounge visits', 'Travel insurance'],
      category: 'travel',
      rating: 4.6
    },
    // ICICI Bank Cards
    {
      id: 'icici-coral',
      bank: 'ICICI Bank',
      name: 'Coral Credit Card',
      type: 'Basic',
      annualFee: 500,
      joiningFee: 500,
      rewardRate: 2.0,
      welcomeBonus: 500,
      loungeAccess: 2,
      fuelSurcharge: true,
      foreignFee: 3.5,
      color: 'from-orange-500 to-red-600',
      bankColor: 'bg-orange-500',
      features: ['2% dining rewards', 'Fuel surcharge waiver', '2 lounge visits', 'iMobile Pay'],
      category: 'lifestyle',
      rating: 4.0
    },
    {
      id: 'icici-sapphiro',
      bank: 'ICICI Bank',
      name: 'Sapphiro',
      type: 'Premium',
      annualFee: 3500,
      joiningFee: 3500,
      rewardRate: 3.5,
      welcomeBonus: 7000,
      loungeAccess: 12,
      fuelSurcharge: true,
      foreignFee: 1.5,
      color: 'from-orange-600 to-red-700',
      bankColor: 'bg-orange-600',
      features: ['3.5% rewards', 'Premium dining', '12 lounge visits', 'Concierge service'],
      category: 'travel',
      rating: 4.4
    },
    // SBI Cards
    {
      id: 'sbi-simplyclick',
      bank: 'SBI Card',
      name: 'SimplyCLICK',
      type: 'Entry Level',
      annualFee: 499,
      joiningFee: 499,
      rewardRate: 5.0,
      welcomeBonus: 2000,
      loungeAccess: 2,
      fuelSurcharge: true,
      foreignFee: 3.5,
      color: 'from-blue-500 to-indigo-600',
      bankColor: 'bg-blue-500',
      features: ['5% online shopping', 'YONO integration', '2 lounge visits', 'Digital rewards'],
      category: 'cashback',
      rating: 4.3
    },
    {
      id: 'sbi-prime',
      bank: 'SBI Card',
      name: 'Prime',
      type: 'Premium',
      annualFee: 2999,
      joiningFee: 2999,
      rewardRate: 3.0,
      welcomeBonus: 5000,
      loungeAccess: 8,
      fuelSurcharge: true,
      foreignFee: 2.0,
      color: 'from-blue-600 to-indigo-700',
      bankColor: 'bg-blue-600',
      features: ['3% rewards', 'Travel benefits', '8 lounge visits', 'Golf privileges'],
      category: 'travel',
      rating: 4.2
    }
  ];

  const toggleCardSelection = (cardId: string) => {
    setSelectedCards(prev => 
      prev.includes(cardId) 
        ? prev.filter(id => id !== cardId)
        : prev.length < 4 ? [...prev, cardId] : prev
    );
  };

  const filteredCards = creditCards.filter(card => 
    filterBy === 'all' || card.category === filterBy
  );

  const sortedCards = [...filteredCards].sort((a, b) => {
    switch(sortBy) {
      case 'rewards': return b.rewardRate - a.rewardRate;
      case 'fee': return a.annualFee - b.annualFee;
      case 'lounge': return b.loungeAccess - a.loungeAccess;
      case 'rating': return b.rating - a.rating;
      default: return 0;
    }
  });

  const selectedCardDetails = creditCards.filter(card => 
    selectedCards.includes(card.id)
  );

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />);
    }
    
    if (hasHalfStar) {
      stars.push(<Star key="half" className="h-4 w-4 fill-yellow-200 text-yellow-400" />);
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />);
    }
    
    return stars;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 via-purple-600/80 to-indigo-600/80"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 animate-bounce">
                <GitCompare className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent animate-fade-in">
              Compare Credit Cards
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 animate-fade-in-delay">
              Find the perfect credit card that matches your lifestyle and spending habits
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8 animate-fade-in-delay-2">
              <div className="bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 flex items-center gap-2 hover:bg-white/20 transition-all cursor-pointer">
                <Sparkles className="h-5 w-5" />
                <span>AI-Powered Comparison</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 flex items-center gap-2 hover:bg-white/20 transition-all cursor-pointer">
                <Shield className="h-5 w-5" />
                <span>Secure & Trusted</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 flex items-center gap-2 hover:bg-white/20 transition-all cursor-pointer">
                <TrendingUp className="h-5 w-5" />
                <span>Real-time Data</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Section */}
      <div className="relative -mt-16 z-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-0 text-center hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <CardContent className="p-6">
                  <div className="bg-blue-100 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <CreditCard className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{creditCards.length}+</h3>
                  <p className="text-gray-600">Credit Cards</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-0 text-center hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <CardContent className="p-6">
                  <div className="bg-green-100 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Target className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">5+</h3>
                  <p className="text-gray-600">Major Banks</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-0 text-center hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <CardContent className="p-6">
                  <div className="bg-purple-100 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Award className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">5%</h3>
                  <p className="text-gray-600">Max Rewards</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b shadow-sm mt-8">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-gray-600" />
                <select 
                  value={filterBy} 
                  onChange={(e) => setFilterBy(e.target.value)}
                  className="bg-white border-2 border-gray-200 rounded-lg px-4 py-2 focus:border-blue-500 focus:outline-none transition-colors shadow-sm"
                >
                  <option value="all">All Categories</option>
                  <option value="cashback">💰 Cashback Cards</option>
                  <option value="rewards">🎁 Rewards Cards</option>
                  <option value="travel">✈️ Travel Cards</option>
                  <option value="lifestyle">🌟 Lifestyle Cards</option>
                </select>
              </div>
              
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-gray-600" />
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white border-2 border-gray-200 rounded-lg px-4 py-2 focus:border-blue-500 focus:outline-none transition-colors shadow-sm"
                >
                  <option value="rewards">🏆 Sort by Rewards</option>
                  <option value="fee">💳 Sort by Annual Fee</option>
                  <option value="lounge">🛫 Sort by Lounge Access</option>
                  <option value="rating">⭐ Sort by Rating</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-blue-100 px-4 py-2 rounded-full">
                <span className="text-sm font-semibold text-blue-800">
                  {selectedCards.length}/4 cards selected
                </span>
              </div>
              {selectedCards.length > 0 && (
                <Button 
                  onClick={() => setSelectedCards([])}
                  variant="outline"
                  size="sm"
                  className="hover:bg-red-50 hover:text-red-600 hover:border-red-300"
                >
                  <X className="h-4 w-4 mr-1" />
                  Clear All
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Cards Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedCards.map((card, index) => (
              <div
                key={card.id}
                className={`group relative transform transition-all duration-500 hover:scale-105 animate-slide-in ${
                  selectedCards.includes(card.id) ? 'scale-105 ring-4 ring-blue-400 ring-opacity-50' : ''
                }`}
                style={{ 
                  animationDelay: `${index * 100}ms`
                }}
              >
                <Card className="h-full overflow-hidden bg-white shadow-xl hover:shadow-2xl transition-all duration-300 border-0 relative">
                  {/* Popular Badge */}
                  {card.rating >= 4.5 && (
                    <div className="absolute top-4 right-4 z-10">
                      <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0 shadow-lg">
                        🏆 Popular
                      </Badge>
                    </div>
                  )}
                  
                  <div className={`h-2 bg-gradient-to-r ${card.color}`}></div>
                  
                  <CardHeader className="relative">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`${card.bankColor} text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg`}>
                        {card.bank}
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleCardSelection(card.id)}
                          className={`p-2 rounded-full transition-all duration-300 transform hover:scale-110 ${
                            selectedCards.includes(card.id) 
                              ? 'bg-blue-500 text-white shadow-lg' 
                              : 'bg-gray-100 text-gray-600 hover:bg-blue-100'
                          }`}
                        >
                          {selectedCards.includes(card.id) ? (
                            <CheckCircle className="h-4 w-4" />
                          ) : (
                            <GitCompare className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>
                    
                    <div className="text-center mb-4">
                      <div className={`w-16 h-10 mx-auto mb-3 rounded-lg bg-gradient-to-r ${card.color} flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform`}>
                        <CreditCard className="h-6 w-6 text-white" />
                      </div>
                      <CardTitle className="text-lg font-bold text-gray-900">{card.name}</CardTitle>
                      <Badge variant="secondary" className="mt-2">{card.type}</Badge>
                      
                      {/* Rating */}
                      <div className="flex items-center justify-center gap-1 mt-2">
                        {renderStars(card.rating)}
                        <span className="text-sm text-gray-600 ml-1">({card.rating})</span>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-3 transform hover:scale-105 transition-transform">
                        <DollarSign className="h-5 w-5 text-blue-600 mx-auto mb-1" />
                        <p className="text-xs text-gray-600">Annual Fee</p>
                        <p className="font-bold text-blue-600">₹{card.annualFee}</p>
                      </div>
                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-3 transform hover:scale-105 transition-transform">
                        <Percent className="h-5 w-5 text-green-600 mx-auto mb-1" />
                        <p className="text-xs text-gray-600">Rewards</p>
                        <p className="font-bold text-green-600">{card.rewardRate}%</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {card.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm group-hover:translate-x-1 transition-transform">
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-1 bg-purple-50 px-2 py-1 rounded-full">
                        <Plane className="h-4 w-4 text-purple-500" />
                        <span className="text-sm text-purple-700 font-medium">{card.loungeAccess} visits</span>
                      </div>
                      <div className="flex items-center gap-1 bg-blue-50 px-2 py-1 rounded-full">
                        <Globe className="h-4 w-4 text-blue-500" />
                        <span className="text-sm text-blue-700 font-medium">{card.foreignFee}% forex</span>
                      </div>
                    </div>

                                        <div className="space-y-2">
                      <Button 
                        className={`w-full transition-all duration-300 transform hover:scale-105 ${
                          selectedCards.includes(card.id)
                            ? 'bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700'
                            : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'
                        }`}
                        onClick={() => toggleCardSelection(card.id)}
                      >
                        {selectedCards.includes(card.id) ? (
                          <>
                            <X className="h-4 w-4 mr-2" />
                            Remove from Compare
                          </>
                        ) : (
                          <>
                            <GitCompare className="h-4 w-4 mr-2" />
                            Add to Compare
                          </>
                        )}
                      </Button>
                      
                      <Button 
                        className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105"
                        onClick={() => window.location.href = '/apply'}
                      >
                        <Zap className="h-4 w-4 mr-2" />
                        Quick Apply
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      {selectedCards.length > 1 && (
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                  Side-by-Side Comparison
                </h2>
                <p className="text-gray-600 text-lg">Compare your selected cards in detail</p>
              </div>
              
              <div className="overflow-x-auto shadow-2xl rounded-2xl">
                <div className="inline-block min-w-full">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gradient-to-r from-gray-50 to-blue-50">
                      <tr>
                                                 <th className="px-6 py-6 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider bg-gray-100">
                           <div className="flex items-center gap-2">
                             <GitCompare className="h-5 w-5" />
                             Features
                           </div>
                         </th>
                        {selectedCardDetails.map((card) => (
                          <th key={card.id} className="px-6 py-6 text-center min-w-48">
                            <div className={`w-12 h-8 mx-auto mb-3 rounded bg-gradient-to-r ${card.color} flex items-center justify-center shadow-lg`}>
                              <CreditCard className="h-4 w-4 text-white" />
                            </div>
                            <div className="font-bold text-gray-900 mb-1">{card.name}</div>
                            <div className="text-xs text-gray-600 mb-2">{card.bank}</div>
                            <div className="flex items-center justify-center gap-1">
                              {renderStars(card.rating)}
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {[
                        { label: 'Annual Fee', key: 'annualFee', prefix: '₹', icon: DollarSign },
                        { label: 'Joining Fee', key: 'joiningFee', prefix: '₹', icon: Calendar },
                        { label: 'Reward Rate', key: 'rewardRate', suffix: '%', icon: Percent },
                        { label: 'Welcome Bonus', key: 'welcomeBonus', prefix: '₹', icon: Gift },
                        { label: 'Lounge Access', key: 'loungeAccess', suffix: ' visits/year', icon: Plane },
                        { label: 'Foreign Transaction Fee', key: 'foreignFee', suffix: '%', icon: Globe }
                      ].map((row, index) => {
                        const Icon = row.icon;
                        return (
                          <tr key={row.key} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-colors`}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              <div className="flex items-center gap-3">
                                <Icon className="h-5 w-5 text-gray-600" />
                                {row.label}
                              </div>
                            </td>
                            {selectedCardDetails.map((card) => {
                              const value = card[row.key as keyof typeof card];
                              const isLowest = row.key === 'annualFee' || row.key === 'joiningFee' || row.key === 'foreignFee';
                              const isHighest = row.key === 'rewardRate' || row.key === 'welcomeBonus' || row.key === 'loungeAccess';
                              
                              const compareValue = Number(value);
                              const allValues = selectedCardDetails.map(c => Number(c[row.key as keyof typeof c]));
                              const isBest = isLowest ? compareValue === Math.min(...allValues) : isHighest ? compareValue === Math.max(...allValues) : false;
                              
                              return (
                                <td key={card.id} className="px-6 py-4 whitespace-nowrap text-sm text-center">
                                  <span className={`inline-flex items-center px-3 py-2 rounded-full text-sm font-semibold transition-all ${
                                    isBest 
                                      ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 ring-2 ring-green-300 shadow-lg' 
                                      : 'bg-blue-100 text-blue-800'
                                  }`}>
                                    {isBest && <Star className="h-4 w-4 mr-1 fill-green-600 text-green-600" />}
                                    {row.prefix}{value}{row.suffix}
                                  </span>
                                </td>
                              );
                            })}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mt-8 text-center space-y-4">
                <div className="flex justify-center gap-4">
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg transform hover:scale-105 transition-all"
                    onClick={() => window.location.href = '/apply'}
                  >
                    <Award className="h-5 w-5 mr-2" />
                    Apply for Selected Cards
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-2 border-purple-300 text-purple-600 hover:bg-purple-50 shadow-lg transform hover:scale-105 transition-all"
                    onClick={() => window.location.href = '/favourites'}
                  >
                    <Heart className="h-5 w-5 mr-2" />
                    Save Comparison
                  </Button>
                </div>
                <p className="text-sm text-gray-500">⭐ Best values are highlighted in green</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 via-purple-600/80 to-indigo-600/80"></div>
        
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-20 h-20 bg-white/10 rounded-full animate-float"></div>
          <div className="absolute bottom-20 right-20 w-16 h-16 bg-white/10 rounded-full animate-float-delayed"></div>
          <div className="absolute top-1/2 right-1/4 w-12 h-12 bg-white/10 rounded-full animate-float"></div>
        </div>
        
        <div className="relative container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Choose Your Perfect Card?</h2>
            <p className="text-xl mb-8 text-blue-100">
              Join millions of satisfied customers who found their ideal credit card through NetWealth India
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-gray-100 shadow-xl transform hover:scale-105 transition-all"
                onClick={() => window.location.href = '/apply'}
              >
                <Zap className="h-5 w-5 mr-2" />
                Quick Apply
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 shadow-xl transform hover:scale-105 transition-all"
                onClick={() => window.location.href = '/favourites'}
              >
                <Heart className="h-5 w-5 mr-2" />
                Save Favorites
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 shadow-xl transform hover:scale-105 transition-all"
                onClick={() => window.location.href = '/services/credit-cards/compare'}
              >
                <Eye className="h-5 w-5 mr-2" />
                View All Cards
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <Shield className="h-8 w-8 mx-auto mb-2" />
                <h3 className="font-semibold mb-1">100% Secure</h3>
                <p className="text-sm text-blue-100">Bank-level security</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <Zap className="h-8 w-8 mx-auto mb-2" />
                <h3 className="font-semibold mb-1">Instant Approval</h3>
                <p className="text-sm text-blue-100">Get approved in minutes</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <Award className="h-8 w-8 mx-auto mb-2" />
                <h3 className="font-semibold mb-1">Best Rewards</h3>
                <p className="text-sm text-blue-100">Maximum cashback & points</p>
              </div>
            </div>
          </div>
        </div>
      </section>

             {/* Custom CSS for animations */}
       <style jsx>{`
         @keyframes slideInUp {
           from {
             opacity: 0;
             transform: translateY(30px);
           }
           to {
             opacity: 1;
             transform: translateY(0);
           }
         }
         
         @keyframes float {
           0%, 100% { transform: translateY(0px); }
           50% { transform: translateY(-20px); }
         }
         
         @keyframes float-delayed {
           0%, 100% { transform: translateY(0px); }
           50% { transform: translateY(-15px); }
         }
         
         .animate-slide-in {
           animation-name: slideInUp;
           animation-duration: 0.6s;
           animation-timing-function: ease-out;
           animation-fill-mode: forwards;
           opacity: 0;
         }
         
         .animate-float {
           animation: float 6s ease-in-out infinite;
         }
         
         .animate-float-delayed {
           animation: float-delayed 8s ease-in-out infinite;
         }
         
         .animate-fade-in {
           animation: slideInUp 1s ease-out forwards;
         }
         
         .animate-fade-in-delay {
           animation: slideInUp 1s ease-out 0.3s forwards;
           opacity: 0;
         }
         
         .animate-fade-in-delay-2 {
           animation: slideInUp 1s ease-out 0.6s forwards;
           opacity: 0;
         }
       `}</style>
    </div>
  );
};

export default CreditCardComparePage; 