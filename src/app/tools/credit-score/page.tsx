import Link from 'next/link';
import { ExternalLink, Info, CreditCard, BarChart, TrendingUp, AlertCircle, Gift, HelpCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';

export default function CreditScorePage() {
  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-blue-100 min-h-screen py-16 md:py-24 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-900 mb-4">Your Guide to Understanding and Improving Your CIBIL Score</h1>
          <p className="text-lg text-blue-700 max-w-3xl mx-auto">
            Your CIBIL score is a key indicator of your financial health. Explore our tools to check your score, understand how it's calculated, and learn how to improve it for better financial opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <Card className="border-green-300 shadow-lg bg-gradient-to-br from-green-50 to-white">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-green-500/10 text-green-600 flex items-center justify-center mb-4">
                <Gift className="h-6 w-6" />
              </div>
              <CardTitle className="text-2xl font-bold text-green-900">Check Your CIBIL Score for Free</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-green-800 mb-6">
                Get your official CIBIL score and a detailed credit report instantly, without any cost. Knowing your score is the first step towards financial wellness. This is a soft inquiry and won't affect your score.
              </p>
              <Link href="/tools/credit-score/check-free-cibil">
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg font-semibold rounded-lg shadow-md transition-transform transform hover:scale-105">
                  Get Your Free Report Now <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
                  </Link>
            </CardContent>
          </Card>

          <Card className="border-blue-200 shadow-md">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center mb-4">
                <CreditCard className="h-6 w-6" />
              </div>
              <CardTitle className="text-2xl font-bold text-blue-900">CIBIL Score for Banks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-blue-800">
                <p className="text-lg">
                  Banks and financial institutions rely heavily on CIBIL scores to evaluate loan applications and determine 
                  creditworthiness. Understanding how different banks use CIBIL scores can help you prepare better for loan applications.
                </p>
                
                <h3 className="font-semibold text-xl mt-4">CIBIL Score Requirements by Bank Type:</h3>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-blue-200 mt-4">
                    <thead>
                      <tr className="bg-blue-100">
                        <th className="py-2 px-4 border-b text-left">Bank Category</th>
                        <th className="py-2 px-4 border-b text-left">Minimum Score</th>
                        <th className="py-2 px-4 border-b text-left">Ideal Score</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="py-2 px-4 border-b">Public Sector Banks</td>
                        <td className="py-2 px-4 border-b">650-700</td>
                        <td className="py-2 px-4 border-b">750+</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 border-b">Private Banks</td>
                        <td className="py-2 px-4 border-b">700-725</td>
                        <td className="py-2 px-4 border-b">775+</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 border-b">NBFCs</td>
                        <td className="py-2 px-4 border-b">650-675</td>
                        <td className="py-2 px-4 border-b">725+</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 border-b">Housing Finance Companies</td>
                        <td className="py-2 px-4 border-b">675-700</td>
                        <td className="py-2 px-4 border-b">750+</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-6">
                  <Link href="/tools/credit-score/cibil-for-banks" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                    View Detailed Bank Requirements <ExternalLink className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <Card className="border-blue-200 shadow-md">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center mb-4">
                <Info className="h-6 w-6" />
              </div>
              <CardTitle className="text-xl font-bold text-blue-900">Check CIBIL Score by PAN</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                Use your PAN card to fetch your detailed CIBIL report from authorized sources.
              </p>
              <Link href="/tools/credit-score/cibil-by-pan" className="text-blue-600 hover:underline inline-flex items-center">
                Check with PAN <ExternalLink className="ml-1 h-4 w-4" />
              </Link>
            </CardContent>
          </Card>

          <Card className="border-blue-200 shadow-md">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center mb-4">
                <BarChart className="h-6 w-6" />
              </div>
              <CardTitle className="text-xl font-bold text-blue-900">CIBIL Score Range</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p>CIBIL scores range from 300 to 900, with higher scores indicating better creditworthiness:</p>
                
                <div className="space-y-3 mt-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">Excellent (750-900)</span>
                      <span className="text-green-600 font-medium">High Approval Rate</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '100%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">Good (700-749)</span>
                      <span className="text-green-500 font-medium">Good Approval Rate</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">Fair (650-699)</span>
                      <span className="text-yellow-500 font-medium">Moderate Approval</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">Poor (600-649)</span>
                      <span className="text-orange-500 font-medium">Low Approval Rate</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-orange-500 h-2.5 rounded-full" style={{ width: '40%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">Very Poor (300-599)</span>
                      <span className="text-red-600 font-medium">Very Low Approval</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-red-600 h-2.5 rounded-full" style={{ width: '20%' }}></div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <Link href="/tools/credit-score/score-range" className="text-blue-600 hover:underline inline-flex items-center">
                    Learn more about score ranges <ExternalLink className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-200 shadow-md">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center mb-4">
                <AlertCircle className="h-6 w-6" />
              </div>
              <CardTitle className="text-xl font-bold text-blue-900">CIBIL Score Calculation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p>CIBIL score is calculated based on several key factors that reflect your credit behavior:</p>
                
                <div className="mt-4 space-y-3">
                  <div>
                    <h4 className="font-semibold">Payment History (35%)</h4>
                    <p className="text-sm text-gray-600">Your track record of repaying loans and credit card bills on time</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold">Credit Utilization (30%)</h4>
                    <p className="text-sm text-gray-600">The percentage of available credit you're using</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold">Credit Age (15%)</h4>
                    <p className="text-sm text-gray-600">The length of your credit history</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold">Credit Mix (10%)</h4>
                    <p className="text-sm text-gray-600">The variety of credit accounts you have</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold">Credit Inquiries (10%)</h4>
                    <p className="text-sm text-gray-600">The number of recent applications for credit</p>
                  </div>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-md mt-4">
                  <p className="text-sm">
                    <strong>Note:</strong> The exact algorithm used by CIBIL is proprietary, but these factors are known to 
                    significantly impact your score.
                  </p>
                </div>
                
                <div className="mt-4">
                  <Link href="/tools/credit-score/calculation" className="text-blue-600 hover:underline inline-flex items-center">
                    Detailed calculation methodology <ExternalLink className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-200 shadow-md">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6" />
              </div>
              <CardTitle className="text-xl font-bold text-blue-900">How to Improve CIBIL Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p>Improving your CIBIL score requires consistent financial discipline and strategic actions:</p>
                
                <div className="mt-4 space-y-3">
                  <div className="flex items-start">
                    <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">1</div>
                    <div>
                      <h4 className="font-semibold">Pay Bills on Time</h4>
                      <p className="text-sm text-gray-600">Set up automatic payments or reminders to ensure timely payments</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">2</div>
                    <div>
                      <h4 className="font-semibold">Reduce Credit Utilization</h4>
                      <p className="text-sm text-gray-600">Keep your credit card balances below 30% of your credit limit</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">3</div>
                    <div>
                      <h4 className="font-semibold">Avoid Multiple Loan Applications</h4>
                      <p className="text-sm text-gray-600">Too many inquiries in a short period can lower your score</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">4</div>
                    <div>
                      <h4 className="font-semibold">Maintain Old Credit Accounts</h4>
                      <p className="text-sm text-gray-600">Longer credit history positively impacts your score</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">5</div>
                    <div>
                      <h4 className="font-semibold">Dispute Errors in Credit Report</h4>
                      <p className="text-sm text-gray-600">Regularly check and correct any inaccuracies in your report</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <Link href="/tools/credit-score/improve" className="text-blue-600 hover:underline inline-flex items-center">
                    Start improving your score <ExternalLink className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-200 shadow-md">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center mb-4">
                <HelpCircle className="h-6 w-6" />
              </div>
              <CardTitle className="text-xl font-bold text-blue-900">Loan Without CIBIL Score</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                New to credit? Explore options for securing loans even without an existing CIBIL score.
              </p>
              <Link href="/tools/credit-score/loan-without-cibil" className="text-blue-600 hover:underline inline-flex items-center">
                Explore Loan Options <ExternalLink className="ml-1 h-4 w-4" />
                  </Link>
            </CardContent>
          </Card>
        </div>

        <div className="bg-blue-50 p-6 rounded-lg shadow-md mb-12">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">Check Your Free CIBIL Score Now</h2>
          <p className="text-blue-700 mb-6">
            Get instant access to your credit score and detailed report. Understand your financial standing and improve your 
            chances of loan approval.
          </p>
          <div className="flex justify-center">
            <Link href="/tools/credit-score/check" className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-lg">
              Check Credit Score <ExternalLink className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-blue-800">What is a CIBIL Score?</h3>
              <p className="mt-2 text-gray-700">
                A CIBIL Score is a three-digit number ranging from 300 to 900 that represents your creditworthiness. It is calculated 
                based on your credit history and payment behavior. The higher your score, the better your chances of loan approval 
                at favorable interest rates.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-blue-800">How often should I check my CIBIL Score?</h3>
              <p className="mt-2 text-gray-700">
                It's recommended to check your CIBIL Score at least once every quarter or before applying for any significant loan. 
                Regular monitoring helps you track improvements and identify any discrepancies that might affect your score.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-blue-800">Does checking my own CIBIL Score affect it?</h3>
              <p className="mt-2 text-gray-700">
                No, checking your own CIBIL Score is considered a "soft inquiry" and does not impact your score. Only "hard inquiries" 
                made by lenders when you apply for credit can potentially lower your score temporarily.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-blue-800">How long does it take to improve a CIBIL Score?</h3>
              <p className="mt-2 text-gray-700">
                Improving your CIBIL Score is a gradual process that typically takes 6-12 months of consistent positive credit behavior. 
                Serious negative marks like defaults or bankruptcies may take up to 7 years to be completely removed from your report.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-blue-800">Can I get a loan with a low CIBIL Score?</h3>
              <p className="mt-2 text-gray-700">
                While it's more challenging, you can still get loans with a low CIBIL Score. Some lenders offer specialized products for 
                borrowers with poor credit scores, but these typically come with higher interest rates and stricter terms. Working on 
                improving your score before applying is generally the better approach.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 