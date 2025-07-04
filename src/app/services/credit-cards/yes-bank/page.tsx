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
  Plane
} from 'lucide-react';
import { getBankCards } from '../data';

const YESBankCreditCardsPage = () => {
  const creditCards = [
    {
      name: "YES Bank Kisan Credit Card",
      type: "Entry Level",
      annualFee: "₹500",
      joiningFee: "₹500",
      rewards: "Up to 2% cashback",
      features: [
        "2% cashback on grocery purchases",
        "1% cashback on fuel transactions",
        "No foreign transaction fee",
        "Complimentary airport lounge access"
      ],
      benefits: [
        "Welcome bonus of ₹1,000",
        "Monthly grocery milestone benefits",
        "Insurance coverage up to ₹3 lakhs",
        "24/7 customer support"
      ]
    },
    {
      name: "YES Bank Prosperity Edge Credit Card",
      type: "Premium",
      annualFee: "₹1,500",
      joiningFee: "₹1,500",
      rewards: "Up to 3% rewards",
      features: [
        "3% rewards on online shopping",
        "2% rewards on dining",
        "No foreign transaction fee",
        "Unlimited airport lounge access"
      ],
      benefits: [
        "Welcome bonus of ₹3,000",
        "Quarterly milestone rewards",
        "Insurance coverage up to ₹7 lakhs",
        "Priority customer service"
      ]
    },
    {
      name: "YES Bank Marquee Credit Card",
      type: "Super Premium",
      annualFee: "₹3,000",
      joiningFee: "₹3,000",
      rewards: "Up to 4% rewards",
      features: [
        "4% rewards on premium spends",
        "2% rewards on all other spends",
        "No foreign transaction fee",
        "Unlimited airport lounge access worldwide"
      ],
      benefits: [
        "Welcome bonus of ₹7,500",
        "Quarterly milestone rewards",
        "Insurance coverage up to ₹15 lakhs",
        "Golf privileges and concierge services"
      ]
    }
  ];

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
    { step: 4, title: "Approval & Delivery", description: "Get your card delivered within 5-7 days" }
  ];

  const keyFeatures = [
    { icon: ShoppingCart, title: "Shopping Rewards", description: "Extra rewards on online and offline shopping" },
    { icon: Car, title: "Fuel Benefits", description: "Fuel surcharge waiver and cashback" },
    { icon: Plane, title: "Travel Benefits", description: "Airport lounge access and travel insurance" },
    { icon: Zap, title: "Instant Approval", description: "Get instant approval with digital KYC" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              YES Bank Credit Cards
            </h1>
            <p className="text-xl mb-8">
              Unlock endless possibilities with our premium credit cards
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                Apply Now
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600">
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
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose YES Bank Credit Cards?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {keyFeatures.map((feature, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="bg-purple-100 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <feature.icon className="h-8 w-8 text-purple-600" />
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
                      <CreditCard className="h-8 w-8 text-purple-600" />
                      <Badge variant="secondary">{card.type}</Badge>
                    </div>
                    <CardTitle className="text-xl">{card.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-600">Annual Fee</p>
                          <p className="font-semibold">{card.annualFee}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Joining Fee</p>
                          <p className="font-semibold">{card.joiningFee}</p>
                        </div>
                      </div>
                      
                      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Rewards</p>
                        <p className="font-bold text-purple-600">{card.rewards}</p>
                      </div>

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

                      <div>
                        <h4 className="font-semibold mb-2">Benefits</h4>
                        <ul className="space-y-1">
                          {card.benefits.map((benefit, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm">
                              <Star className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Button className="w-full bg-purple-600 hover:bg-purple-700">Apply Now</Button>
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
                    <div className="bg-purple-100 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <criteria.icon className="h-8 w-8 text-purple-600" />
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
                  <div className="bg-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
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
                  <Phone className="h-8 w-8 text-purple-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Phone</h3>
                  <p className="text-gray-600">1800-1200-0001</p>
                  <p className="text-sm text-gray-500">24/7 Customer Service</p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="p-6">
                  <Mail className="h-8 w-8 text-purple-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Email</h3>
                  <p className="text-gray-600">support@yesbank.in</p>
                  <p className="text-sm text-gray-500">Response within 24 hours</p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="p-6">
                  <MapPin className="h-8 w-8 text-purple-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Branch</h3>
                  <p className="text-gray-600">Find nearest branch</p>
                  <p className="text-sm text-gray-500">1000+ branches across India</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Apply?</h2>
            <p className="text-xl mb-8">
              Join millions of satisfied customers and get your YES Bank credit card today
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                Apply Now
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default YESBankCreditCardsPage;
