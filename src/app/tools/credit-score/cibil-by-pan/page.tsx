import Link from 'next/link';
import { ArrowLeft, Info, Shield, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CheckByPanPage() {
  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-blue-100 min-h-screen py-16 md:py-24 px-6">
      <div className="container mx-auto max-w-4xl">
        <Link href="/tools/credit-score" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Credit Score Tools
        </Link>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-900 mb-4">Check CIBIL Score by PAN Card</h1>
          <p className="text-lg text-blue-700 max-w-3xl mx-auto">
            Get your free credit report and CIBIL score instantly by providing your PAN card details. 
            Your credit score is a critical factor in loan approvals and interest rates.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="md:col-span-2">
            <Card className="border-blue-200 shadow-md">
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div className="bg-blue-50 p-4 rounded-md border border-blue-200">
                    <div className="flex items-start">
                      <Info className="h-5 w-5 text-blue-500 mr-3 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-blue-800">Important Information</h3>
                        <p className="text-sm text-blue-700 mt-1">
                          This is a secure process that requires your PAN card and basic personal information for verification. 
                          Your data is encrypted and protected as per industry standards.
                        </p>
                      </div>
                    </div>
                  </div>

                  <form className="space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="pan" className="text-blue-800">PAN Card Number*</Label>
                      <Input 
                        id="pan" 
                        placeholder="Enter 10-digit PAN number (e.g., ABCDE1234F)" 
                        className="border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                      />
                      <p className="text-xs text-gray-500">Your PAN card number is a 10-character alphanumeric identifier</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullname" className="text-blue-800">Full Name (as per PAN)*</Label>
                        <Input 
                          id="fullname" 
                          placeholder="Enter your full name" 
                          className="border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="dob" className="text-blue-800">Date of Birth*</Label>
                        <Input 
                          id="dob" 
                          type="date" 
                          className="border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-blue-800">Email Address*</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          placeholder="Enter your email address" 
                          className="border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="mobile" className="text-blue-800">Mobile Number*</Label>
                        <Input 
                          id="mobile" 
                          placeholder="Enter 10-digit mobile number" 
                          className="border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                        />
                        <p className="text-xs text-gray-500">OTP will be sent to this number for verification</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="address" className="text-blue-800">Current Address*</Label>
                      <Input 
                        id="address" 
                        placeholder="Enter your current residential address" 
                        className="border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city" className="text-blue-800">City*</Label>
                        <Input 
                          id="city" 
                          placeholder="Enter city" 
                          className="border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="state" className="text-blue-800">State*</Label>
                        <Input 
                          id="state" 
                          placeholder="Enter state" 
                          className="border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="pincode" className="text-blue-800">PIN Code*</Label>
                        <Input 
                          id="pincode" 
                          placeholder="Enter 6-digit PIN code" 
                          className="border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 pt-2">
                      <input 
                        type="checkbox" 
                        id="consent" 
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <Label htmlFor="consent" className="text-sm text-gray-700">
                        I consent to the processing of my personal information in accordance with the <Link href="#" className="text-blue-600 hover:underline">Privacy Policy</Link> and authorize checking my credit information.
                      </Label>
                    </div>
                    
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md">
                      Get My CIBIL Score
                    </Button>
                  </form>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <div className="space-y-6">
              <Card className="border-blue-200 shadow-md">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <Shield className="h-5 w-5 text-blue-500 mr-2" />
                    <h3 className="font-semibold text-blue-800">Secure Process</h3>
                  </div>
                  <p className="text-sm text-gray-700">
                    Your data is encrypted with bank-level security. We use 256-bit SSL encryption to protect your personal information.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-blue-200 shadow-md">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <Info className="h-5 w-5 text-blue-500 mr-2" />
                    <h3 className="font-semibold text-blue-800">What You'll Get</h3>
                  </div>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                      <span>Your 3-digit CIBIL score (300-900)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                      <span>Detailed credit report</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                      <span>Loan account summary</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                      <span>Payment history analysis</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                      <span>Credit utilization insights</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-blue-200 shadow-md">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
                    <h3 className="font-semibold text-blue-800">Common Mistakes</h3>
                  </div>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li className="flex items-start">
                      <XCircle className="h-4 w-4 text-red-500 mr-2 mt-0.5" />
                      <span>Entering incorrect PAN details</span>
                    </li>
                    <li className="flex items-start">
                      <XCircle className="h-4 w-4 text-red-500 mr-2 mt-0.5" />
                      <span>Using outdated personal information</span>
                    </li>
                    <li className="flex items-start">
                      <XCircle className="h-4 w-4 text-red-500 mr-2 mt-0.5" />
                      <span>Providing unregistered mobile number</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-blue-800">Is it safe to check my CIBIL score online?</h3>
              <p className="mt-2 text-gray-700">
                Yes, it is completely safe to check your CIBIL score online through authorized platforms. We use bank-grade encryption 
                to protect your personal information. Additionally, checking your own score is considered a "soft inquiry" and does not 
                affect your credit score.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-blue-800">How long does it take to get my CIBIL score?</h3>
              <p className="mt-2 text-gray-700">
                After completing the verification process, you will receive your CIBIL score instantly on the screen. A detailed credit 
                report will also be sent to your registered email address within 24 hours.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-blue-800">Why is my PAN card required for checking CIBIL score?</h3>
              <p className="mt-2 text-gray-700">
                Your PAN card serves as a unique identifier that helps the credit bureau locate your credit history accurately. It ensures 
                that you receive the correct credit report and prevents unauthorized access to your credit information.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-blue-800">What if I don't have a credit history?</h3>
              <p className="mt-2 text-gray-700">
                If you have never taken a loan or used a credit card, you might not have a credit history, and consequently, no CIBIL score. 
                In such cases, your report will indicate "NH" (No History) or a score might not be generated. To build a credit history, 
                consider applying for a secured credit card or becoming an authorized user on someone else's credit card.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-blue-800">How often is my CIBIL score updated?</h3>
              <p className="mt-2 text-gray-700">
                CIBIL scores are typically updated monthly as lenders report your credit activity to the bureau. However, the exact timing 
                can vary depending on when your lenders submit their reports. It's advisable to check your score quarterly to monitor changes 
                and track improvements.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 