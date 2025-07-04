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
  Heart,
  Trash2,
  Share,
  GitCompare,
  ArrowRight,
  Award,
  Zap,
  Globe,
  Plane,
  TrendingUp,
  Sparkles,
  Target,
  Clock,
  AlertCircle,
  BookmarkPlus,
  Eye,
  Filter,
  Search,
  SortAsc,
  Download,
  Mail,
  X,
  Plus
} from 'lucide-react';

const FavouritesPage = () => {
  const [favouriteCards, setFavouriteCards] = useState([
    {
      id: 'hdfc-regalia',
      bank: 'HDFC Bank',
      name: 'Regalia Credit Card',
      type: 'Premium',
      annualFee: 2500,
      rewardRate: 3.3,
      welcomeBonus: 5000,
      loungeAccess: 12,
      color: 'from-red-600 to-orange-700',
      bankColor: 'bg-red-600',
      features: ['3.3% rewards', 'Dining benefits', '12 lounge visits', 'Travel insurance'],
      rating: 4.6,
      processingTime: '5-7 days',
      approvalRate: '90%',
      savedDate: '2024-01-15'
    },
    {
      id: 'idfc-millennia',
      bank: 'IDFC FIRST Bank',
      name: 'Millennia Credit Card',
      type: 'Premium',
      annualFee: 1000,
      rewardRate: 2.5,
      welcomeBonus: 2000,
      loungeAccess: 8,
      color: 'from-blue-600 to-purple-700',
      bankColor: 'bg-blue-600',
      features: ['2.5% online cashback', 'No forex fees', '8 lounge visits', 'Premium benefits'],
      rating: 4.5,
      processingTime: '7-10 days',
      approvalRate: '85%',
      savedDate: '2024-01-20'
    },
    {
      id: 'sbi-simplyclick',
      bank: 'SBI Card',
      name: 'SimplyCLICK Credit Card',
      type: 'Entry Level',
      annualFee: 499,
      rewardRate: 5.0,
      welcomeBonus: 2000,
      loungeAccess: 2,
      color: 'from-blue-500 to-indigo-600',
      bankColor: 'bg-blue-500',
      features: ['5% online shopping', 'YONO integration', '2 lounge visits', 'Digital rewards'],
      rating: 4.3,
      processingTime: '3-5 days',
      approvalRate: '92%',
      savedDate: '2024-01-25'
    }
  ]);

  const [selectedCards, setSelectedCards] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('savedDate');
  const [filterBy, setFilterBy] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const removeFromFavourites = (cardId: string) => {
    setFavouriteCards(prev => prev.filter(card => card.id !== cardId));
  };

  const toggleCardSelection = (cardId: string) => {
    setSelectedCards(prev => 
      prev.includes(cardId) 
        ? prev.filter(id => id !== cardId)
        : [...prev, cardId]
    );
  };

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

  const filteredAndSortedCards = favouriteCards
    .filter(card => {
      const matchesSearch = card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          card.bank.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterBy === 'all' || card.type.toLowerCase().includes(filterBy.toLowerCase());
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      switch(sortBy) {
        case 'rating': return b.rating - a.rating;
        case 'fee': return a.annualFee - b.annualFee;
        case 'rewards': return b.rewardRate - a.rewardRate;
        case 'savedDate': return new Date(b.savedDate).getTime() - new Date(a.savedDate).getTime();
        default: return 0;
      }
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        
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
                <Heart className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-pink-100 bg-clip-text text-transparent">
              My Favourite Cards
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-pink-100">
              Manage and compare your saved credit cards in one beautiful place
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 flex items-center gap-2 hover:bg-white/20 transition-all cursor-pointer">
                <BookmarkPlus className="h-5 w-5" />
                <span>Smart Organization</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 flex items-center gap-2 hover:bg-white/20 transition-all cursor-pointer">
                <GitCompare className="h-5 w-5" />
                <span>Easy Comparison</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 flex items-center gap-2 hover:bg-white/20 transition-all cursor-pointer">
                <Zap className="h-5 w-5" />
                <span>Quick Apply</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative -mt-16 z-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-0 text-center hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <CardContent className="p-6">
                  <div className="bg-pink-100 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Heart className="h-8 w-8 text-pink-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{favouriteCards.length}</h3>
                  <p className="text-gray-600">Saved Cards</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-0 text-center hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <CardContent className="p-6">
                  <div className="bg-green-100 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Star className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {favouriteCards.length > 0 ? (favouriteCards.reduce((sum, card) => sum + card.rating, 0) / favouriteCards.length).toFixed(1) : '0'}
                  </h3>
                  <p className="text-gray-600">Avg Rating</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-0 text-center hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <CardContent className="p-6">
                  <div className="bg-blue-100 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <TrendingUp className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {favouriteCards.length > 0 ? Math.max(...favouriteCards.map(card => card.rewardRate)).toFixed(1) : '0'}%
                  </h3>
                  <p className="text-gray-600">Best Rewards</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Controls Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search cards..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent w-64"
                />
              </div>
              
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="premium">Premium Cards</option>
                <option value="entry">Entry Level</option>
              </select>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="savedDate">Recently Saved</option>
                <option value="rating">Highest Rated</option>
                <option value="rewards">Best Rewards</option>
                <option value="fee">Lowest Fee</option>
              </select>
            </div>

            <div className="flex items-center gap-4">
              {selectedCards.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">{selectedCards.length} selected</span>
                                     <Button 
                     size="sm" 
                     className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
                     onClick={() => window.location.href = '/services/credit-cards/compare'}
                   >
                     <GitCompare className="h-4 w-4 mr-1" />
                     Compare
                   </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => setSelectedCards([])}
                  >
                    <X className="h-4 w-4 mr-1" />
                    Clear
                  </Button>
                </div>
              )}
              
                             <Button 
                 className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                 onClick={() => window.location.href = '/services/credit-cards/compare'}
               >
                 <Plus className="h-4 w-4 mr-2" />
                 Add More Cards
               </Button>
            </div>
          </div>

          {/* Empty State */}
          {filteredAndSortedCards.length === 0 && favouriteCards.length === 0 && (
            <Card className="shadow-xl border-0 text-center py-16">
              <CardContent>
                <div className="max-w-md mx-auto">
                  <div className="bg-gray-100 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                    <Heart className="h-12 w-12 text-gray-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">No Favourite Cards Yet</h3>
                  <p className="text-gray-600 mb-8">
                    Start building your collection by saving credit cards you're interested in
                  </p>
                                     <Button 
                     className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
                     onClick={() => window.location.href = '/services/credit-cards/compare'}
                   >
                     <Search className="h-4 w-4 mr-2" />
                     Browse Credit Cards
                   </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* No Search Results */}
          {filteredAndSortedCards.length === 0 && favouriteCards.length > 0 && (
            <Card className="shadow-xl border-0 text-center py-12">
              <CardContent>
                <div className="max-w-md mx-auto">
                  <div className="bg-gray-100 rounded-full p-6 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                    <Search className="h-10 w-10 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">No cards match your search</h3>
                  <p className="text-gray-600 mb-6">
                    Try adjusting your search or filter criteria
                  </p>
                  <Button 
                    variant="outline"
                    onClick={() => {
                      setSearchTerm('');
                      setFilterBy('all');
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Cards Grid */}
          {filteredAndSortedCards.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAndSortedCards.map((card, index) => (
                <Card 
                  key={card.id} 
                  className={`group relative overflow-hidden bg-white shadow-xl hover:shadow-2xl transition-all duration-300 border-0 hover:scale-105 ${
                    selectedCards.includes(card.id) ? 'ring-4 ring-purple-400 ring-opacity-50' : ''
                  }`}
                  style={{ 
                    animationDelay: `${index * 100}ms`,
                    animation: 'slideInUp 0.6s ease-out forwards'
                  }}
                >
                  {/* Top gradient bar */}
                  <div className={`h-2 bg-gradient-to-r ${card.color}`}></div>
                  
                  {/* Heart indicator */}
                  <div className="absolute top-4 right-4 z-10">
                    <Heart className="h-6 w-6 fill-red-500 text-red-500" />
                  </div>
                  
                  <CardHeader className="relative">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`${card.bankColor} text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg`}>
                        {card.bank}
                      </div>
                      <div className="flex items-center gap-1">
                        {renderStars(card.rating)}
                        <span className="text-xs text-gray-600 ml-1">({card.rating})</span>
                      </div>
                    </div>
                    
                    <div className="text-center mb-4">
                      <div className={`w-16 h-10 mx-auto mb-3 rounded-lg bg-gradient-to-r ${card.color} flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform`}>
                        <CreditCard className="h-6 w-6 text-white" />
                      </div>
                      <CardTitle className="text-lg font-bold text-gray-900">{card.name}</CardTitle>
                      <Badge variant="secondary" className="mt-2">{card.type}</Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-3 transform hover:scale-105 transition-transform">
                        <p className="text-xs text-gray-600">Annual Fee</p>
                        <p className="font-bold text-blue-600">₹{card.annualFee}</p>
                      </div>
                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-3 transform hover:scale-105 transition-transform">
                        <p className="text-xs text-gray-600">Rewards</p>
                        <p className="font-bold text-green-600">{card.rewardRate}%</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {card.features.slice(0, 3).map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm">
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
                        <Clock className="h-4 w-4 text-blue-500" />
                        <span className="text-sm text-blue-700 font-medium">{card.processingTime}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2 pt-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => toggleCardSelection(card.id)}
                        className={`flex-1 ${selectedCards.includes(card.id) ? 'border-purple-500 text-purple-600' : ''}`}
                      >
                        <GitCompare className="h-4 w-4 mr-1" />
                        {selectedCards.includes(card.id) ? 'Selected' : 'Compare'}
                      </Button>
                      
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => removeFromFavourites(card.id)}
                        className="text-red-600 hover:bg-red-50 hover:border-red-300"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-blue-600 hover:bg-blue-50"
                      >
                        <Share className="h-4 w-4" />
                      </Button>
                    </div>

                                         <Button 
                       className="w-full mt-4 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 transform hover:scale-105 transition-all"
                       onClick={() => window.location.href = '/apply'}
                     >
                       <Zap className="h-4 w-4 mr-2" />
                       Quick Apply
                     </Button>

                    <div className="text-xs text-gray-500 text-center">
                      Saved on {new Date(card.savedDate).toLocaleDateString()}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Action Section */}
      {favouriteCards.length > 0 && (
        <section className="py-16 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Take Action?</h2>
              <p className="text-xl mb-8 text-pink-100">
                You've saved some amazing cards. Now it's time to make your choice and apply!
              </p>
                             <div className="flex flex-wrap justify-center gap-4 mb-8">
                 <Button 
                   size="lg" 
                   className="bg-white text-purple-600 hover:bg-gray-100 shadow-xl transform hover:scale-105 transition-all"
                   onClick={() => window.location.href = '/services/credit-cards/compare'}
                 >
                   <GitCompare className="h-5 w-5 mr-2" />
                   Compare All Cards
                 </Button>
                 <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-purple-600 shadow-xl transform hover:scale-105 transition-all">
                   <Download className="h-5 w-5 mr-2" />
                   Export List
                 </Button>
                 <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-purple-600 shadow-xl transform hover:scale-105 transition-all">
                   <Mail className="h-5 w-5 mr-2" />
                   Email Report
                 </Button>
               </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <Shield className="h-8 w-8 mx-auto mb-2" />
                  <h3 className="font-semibold mb-1">Secure Storage</h3>
                  <p className="text-sm text-pink-100">Your data is safe with us</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <Heart className="h-8 w-8 mx-auto mb-2" />
                  <h3 className="font-semibold mb-1">Smart Recommendations</h3>
                  <p className="text-sm text-pink-100">AI-powered suggestions</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <Zap className="h-8 w-8 mx-auto mb-2" />
                  <h3 className="font-semibold mb-1">Quick Apply</h3>
                  <p className="text-sm text-pink-100">Apply in minutes</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

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
      `}</style>
    </div>
  );
};

export default FavouritesPage; 