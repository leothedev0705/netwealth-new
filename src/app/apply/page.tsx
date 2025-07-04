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
  ArrowRight,
  ArrowLeft,
  Award,
  Zap,
  Globe,
  Plane,
  User,
  Phone,
  Mail,
  MapPin,
  Building,
  IndianRupee,
  Calendar,
  Upload,
  FileText,
  Camera,
  Check,
  Clock,
  Sparkles,
  Target,
  Heart,
  TrendingUp,
  AlertCircle,
  Home,
  Briefcase
} from 'lucide-react';

const QuickApplyPage = () => {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        
        <div className="relative container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
                <Zap className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Quick Apply for Credit Card</h1>
            <p className="text-xl mb-6 text-blue-100">
              Get your credit card approved in minutes with our streamlined application process
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span className="text-sm">100% Secure</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span className="text-sm">5-10 Minutes</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                <span className="text-sm">Instant Approval</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-xl border-0">
            <CardContent className="p-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Application Form Coming Soon!</h2>
                <p className="text-gray-600 mb-8">
                  We're building an amazing application experience for you. Stay tuned!
                </p>
                <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                  Get Notified
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default QuickApplyPage; 