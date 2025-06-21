"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Info, Shield, Gift, TrendingUp, HelpCircle, User, FileText, Phone, Mail, Calendar } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

export default function CheckFreeCibilPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    pan: '',
    fullname: '',
    dob: '',
    email: '',
    mobile: '',
  });
  const [score, setScore] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const handleNext = () => setStep(prev => prev + 1);
  const handleBack = () => setStep(prev => prev - 1);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const randomScore = Math.floor(Math.random() * (850 - 650 + 1)) + 650;
      setScore(randomScore);
      setLoading(false);
      handleNext();
    }, 2000);
  };

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  return (
    <div className="bg-gradient-to-br from-green-50 via-white to-green-100 min-h-screen py-16 md:py-24 px-6">
      <div className="container mx-auto max-w-2xl">
        <Link href="/tools/credit-score" className="inline-flex items-center text-green-600 hover:text-green-800 mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Credit Score Tools
        </Link>

        <Card className="border-green-200 shadow-lg bg-white rounded-xl">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-green-900 mb-2">Check Your CIBIL Score for Free</h1>
              <p className="text-md text-green-700">Get your official CIBIL score and detailed credit report online, instantly and at no cost.</p>
            </div>
            
            <Progress value={progress} className="w-full mb-8" />

            {step === 1 && (
              <div className="text-center">
                <Gift className="h-16 w-16 text-green-500 mb-4 mx-auto" />
                <h2 className="text-2xl font-bold text-green-800 mb-3">Your Free CIBIL Report Awaits</h2>
                <p className="text-gray-600 mb-6">Enter a few basic details to get your comprehensive CIBIL report. This check is a soft inquiry and will not affect your credit score.</p>
                <Button onClick={handleNext} className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg font-semibold rounded-lg shadow-md transition-transform transform hover:scale-105">
                  Start Your CIBIL Check
                </Button>
                <div className="flex items-center mt-4 justify-center">
                  <Shield className="h-4 w-4 text-gray-500 mr-2" />
                  <p className="text-xs text-gray-500">100% Secure & Authorized Process</p>
                </div>
              </div>
            )}

            {step > 1 && step <= 3 && (
              <form onSubmit={step === 3 ? handleSubmit : (e) => { e.preventDefault(); handleNext(); }}>
                {step === 2 && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-center text-green-800">Personal Information</h3>
                    <div className="space-y-2">
                      <Label htmlFor="pan" className="flex items-center"><FileText className="h-4 w-4 mr-2" />PAN Card Number*</Label>
                      <Input id="pan" value={formData.pan} onChange={handleChange} placeholder="ABCDE1234F" required className="border-green-200 focus:border-green-500 focus:ring-green-500" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="fullname" className="flex items-center"><User className="h-4 w-4 mr-2" />Full Name (as per PAN)*</Label>
                      <Input id="fullname" value={formData.fullname} onChange={handleChange} placeholder="Your full name" required className="border-green-200 focus:border-green-500 focus:ring-green-500" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dob" className="flex items-center"><Calendar className="h-4 w-4 mr-2" />Date of Birth*</Label>
                      <Input id="dob" value={formData.dob} onChange={handleChange} type="date" required className="border-green-200 focus:border-green-500 focus:ring-green-500" />
                    </div>
                  </div>
                )}
                
                {step === 3 && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-center text-green-800">Contact Information</h3>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="flex items-center"><Mail className="h-4 w-4 mr-2" />Email Address*</Label>
                      <Input id="email" value={formData.email} onChange={handleChange} type="email" placeholder="you@example.com" required className="border-green-200 focus:border-green-500 focus:ring-green-500" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="mobile" className="flex items-center"><Phone className="h-4 w-4 mr-2" />Mobile Number*</Label>
                      <Input id="mobile" value={formData.mobile} onChange={handleChange} placeholder="10-digit mobile number" required className="border-green-200 focus:border-green-500 focus:ring-green-500" />
                       <p className="text-xs text-gray-500">An OTP will be sent for verification.</p>
                    </div>
                  </div>
                )}

                <div className="flex justify-between mt-8">
                  <Button type="button" variant="outline" onClick={handleBack}>Back</Button>
                  <Button type="submit" className="bg-green-600 hover:bg-green-700">
                    {step === 3 ? (loading ? 'Generating Score...' : 'Get My Score') : 'Next'}
                  </Button>
                </div>
              </form>
            )}

            {step === 4 && (
              <div className="text-center">
                {loading ? (
                  <>
                    <div className="flex justify-center items-center mb-4">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-800"></div>
                    </div>
                    <p className="text-lg text-green-800">Generating your CIBIL score...</p>
                  </>
                ) : score ? (
                  <>
                    <h2 className="text-2xl font-bold text-green-800 mb-3">Your CIBIL Score is Ready!</h2>
                    <div className="my-6">
                      <div className="inline-block bg-green-100 rounded-full p-6">
                        <p className="text-6xl font-bold text-green-700">{score}</p>
                      </div>
                      <p className="mt-2 text-lg font-medium text-green-600">
                        {score >= 750 ? "Excellent" : score >= 700 ? "Good" : "Fair"}
                      </p>
                    </div>
                    <p className="text-gray-600 mb-6">A detailed report has been sent to {formData.email}.</p>
                    <Button onClick={() => setStep(1)} className="bg-green-600 hover:bg-green-700">Check Again</Button>
                  </>
                ) : (
                  <>
                    <p className="text-lg text-red-600">Failed to fetch score. Please try again.</p>
                    <Button onClick={handleBack}>Back</Button>
                  </>
                )}
              </div>
            )}
            
          </CardContent>
        </Card>

        <div className="bg-white p-8 rounded-xl shadow-lg mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center"><HelpCircle className="h-6 w-6 mr-2 text-green-500" />Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Does checking my free CIBIL score lower it?</h3>
              <p className="mt-2 text-gray-600">No, not at all. When you check your own credit score, it's considered a "soft inquiry," which has no impact on your score. "Hard inquiries," which can affect your score, only happen when a lender or financial institution checks your score as part of a loan application.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Is the free CIBIL score accurate?</h3>
              <p className="mt-2 text-gray-600">Yes, the free CIBIL score provided by authorized platforms is the same official score that lenders see. It is fetched directly from TransUnion CIBIL, ensuring complete accuracy and reliability.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
} 