import React from 'react';
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
  Phone, 
  Mail, 
  MapPin,
  IndianRupee,
  Calendar,
  Users,
  Award,
  TrendingUp,
  Zap,
  ShoppingCart,
  Car,
  Plane,
  Utensils,
  Smartphone,
  Fuel,
  Coffee
} from 'lucide-react';
import { getBankCards } from '../data';

const ICICIBankCreditCardsPage = () => {
  const creditCards = getBankCards("ICICI Bank");

  const eligibilityCriteria = [
    { icon: Users, title: "Age", description: "21-65 years for primary card" },
    { icon: IndianRupee, title: "Income", description: "Minimum ₹20,000 per month" },
    { icon: Award, title: "Credit Score", description: "CIBIL score of 750 or above" },
    { icon: MapPin, title: "Location", description: "Resident of India" }
  ];

  const applicationProcess = [
    { step: 1, title: "Apply Online", description: "Fill the application form on our website" },
    { step: 2, title: "Document Verification", description: "Submit required documents for verification" },
    { step: 3, title: "Credit Assessment", description: "Our team will assess your credit profile" },
    { step: 4, title: "Approval & Delivery", description: "Get your card delivered within 7 days" }
  ];

  const keyFeatures = [
    { icon: Coffee, title: "Dining Rewards", description: "Extra rewards on dining and restaurant spends" },
    { icon: Fuel, title: "Fuel Surcharge", description: "Fuel surcharge waiver and special benefits" },
    { icon: Plane, title: "Travel Benefits", description: "Airport lounge access and travel insurance" },
    { icon: Smartphone, title: "iMobile Pay", description: "Advanced mobile banking features" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              ICICI Bank Credit Cards
            </h1>
            <p className="text-xl mb-8">
              Discover the power of rewarding with our premium credit cards
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100">
                Apply Now
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-orange-600">
                Compare Cards
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Key Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose ICICI Bank Credit Cards?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {keyFeatures.map((feature, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="bg-orange-100 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <feature.icon className="h-8 w-8 text-orange-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Credit Cards Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Our Credit Card Portfolio</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {creditCards.map((card, index) => (
                                  <Card key={index} className="hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <CreditCard className="h-8 w-8 text-orange-600" />
                      <Badge variant="secondary">{card.bank}</Badge>
                    </div>
                    <CardTitle className="text-xl">{card.card}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-600">Annual Fee</p>
                          <p className="font-semibold">₹{card.annualFee}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Joining Fee</p>
                          <p className="font-semibold">₹{card.joiningFee}</p>
                        </div>
                      </div>
                      
                      <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Rewards</p>
                        <p className="font-bold text-orange-600">{card.rewardRate}</p>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Welcome Bonus</h4>
                        <p className="text-sm text-gray-600">{card.welcomeBonus}</p>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Lounge Access</h4>
                        <p className="text-sm text-gray-600">{card.loungeAccess}</p>
                      </div>

                      {card.features && card.features.length > 0 && (
                        <div>
                          <h4 className="font-semibold mb-2">Key Features</h4>
                          <ul className="space-y-1">
                            {card.features.map((feature, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm">
                                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div>
                        <h4 className="font-semibold mb-2">Additional Info</h4>
                        <div className="space-y-1 text-sm">
                          <p><span className="font-medium">Forex Markup:</span> {card.forexMarkup}</p>
                          {card.description && <p className="text-gray-600">{card.description}</p>}
                        </div>
                      </div>

                      <Button className="w-full bg-orange-600 hover:bg-orange-700">Apply Now</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Eligibility Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Eligibility Criteria</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {eligibilityCriteria.map((criteria, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="p-6">
                    <div className="bg-orange-100 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <criteria.icon className="h-8 w-8 text-orange-600" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{criteria.title}</h3>
                    <p className="text-gray-600">{criteria.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Application Process Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Application Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {applicationProcess.map((process, index) => (
                <div key={index} className="text-center">
                  <div className="bg-orange-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    {process.step}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{process.title}</h3>
                  <p className="text-gray-600">{process.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Get in Touch</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center">
                <CardContent className="p-6">
                  <Phone className="h-8 w-8 text-orange-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Phone</h3>
                  <p className="text-gray-600">1800-1080</p>
                  <p className="text-sm text-gray-500">24/7 Customer Service</p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="p-6">
                  <Mail className="h-8 w-8 text-orange-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Email</h3>
                  <p className="text-gray-600">customer.care@icicibank.com</p>
                  <p className="text-sm text-gray-500">Response within 24 hours</p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="p-6">
                  <MapPin className="h-8 w-8 text-orange-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Branch</h3>
                  <p className="text-gray-600">Find nearest branch</p>
                  <p className="text-sm text-gray-500">4000+ branches across India</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Apply?</h2>
            <p className="text-xl mb-8">
              Join millions of satisfied customers and get your ICICI Bank credit card today
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100">
                Apply Now
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-orange-600">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ICICIBankCreditCardsPage;
