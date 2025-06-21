import Link from 'next/link';
import { ArrowLeft, Building, AlertCircle, CheckCircle, XCircle, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CibilScoreBanksPage() {
  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-blue-100 min-h-screen py-16 md:py-24 px-6">
      <div className="container mx-auto max-w-6xl">
        <Link href="/tools/credit-score" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Credit Score Tools
        </Link>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-900 mb-4">CIBIL Score Requirements for Banks</h1>
          <p className="text-lg text-blue-700 max-w-3xl mx-auto">
            Different banks and financial institutions have varying CIBIL score requirements for loan approvals. 
            Understanding these thresholds can help you prepare better for loan applications and improve your chances of approval.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mb-12">
          <div className="flex items-start mb-6">
            <Info className="h-6 w-6 text-blue-500 mr-3 mt-1" />
            <div>
              <h2 className="text-xl font-semibold text-blue-800">Understanding Bank CIBIL Score Requirements</h2>
              <p className="text-gray-700 mt-2">
                Banks use CIBIL scores as a primary factor in their loan approval process. A higher score not only increases your chances 
                of loan approval but also helps you secure better interest rates and terms. Each bank has its own risk assessment model, 
                which includes minimum CIBIL score thresholds for different loan products.
              </p>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-blue-200">
              <thead>
                <tr className="bg-blue-100">
                  <th className="py-3 px-4 border-b text-left">Score Range</th>
                  <th className="py-3 px-4 border-b text-left">Risk Category</th>
                  <th className="py-3 px-4 border-b text-left">Loan Approval Likelihood</th>
                  <th className="py-3 px-4 border-b text-left">Interest Rate Impact</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-3 px-4 border-b font-medium">750-900</td>
                  <td className="py-3 px-4 border-b text-green-600">Excellent</td>
                  <td className="py-3 px-4 border-b">Very High (90-95%)</td>
                  <td className="py-3 px-4 border-b">Lowest Available Rates</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 border-b font-medium">700-749</td>
                  <td className="py-3 px-4 border-b text-green-500">Good</td>
                  <td className="py-3 px-4 border-b">High (75-85%)</td>
                  <td className="py-3 px-4 border-b">Competitive Rates</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 border-b font-medium">650-699</td>
                  <td className="py-3 px-4 border-b text-yellow-500">Fair</td>
                  <td className="py-3 px-4 border-b">Moderate (60-70%)</td>
                  <td className="py-3 px-4 border-b">Slightly Higher Rates</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 border-b font-medium">600-649</td>
                  <td className="py-3 px-4 border-b text-orange-500">Poor</td>
                  <td className="py-3 px-4 border-b">Low (30-50%)</td>
                  <td className="py-3 px-4 border-b">Significantly Higher Rates</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 border-b font-medium">300-599</td>
                  <td className="py-3 px-4 border-b text-red-600">Very Poor</td>
                  <td className="py-3 px-4 border-b">Very Low (5-25%)</td>
                  <td className="py-3 px-4 border-b">Highest Rates or Denial</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-blue-900 mb-6">CIBIL Score Requirements by Bank Type</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card className="border-blue-200 shadow-md">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center mb-4">
                <Building className="h-6 w-6" />
              </div>
              <CardTitle className="text-xl font-bold text-blue-900">Public Sector Banks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <p className="text-gray-700">
                  Public sector banks typically have slightly more lenient CIBIL score requirements compared to private banks. 
                  They often consider other factors like employment stability and income alongside the credit score.
                </p>
                
                <div className="space-y-4">
                  <div className="border-b pb-4">
                    <h3 className="font-semibold text-blue-800">State Bank of India (SBI)</h3>
                    <div className="mt-2 space-y-2">
                      <div className="flex justify-between">
                        <span>Home Loan</span>
                        <span className="font-medium">700+</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Personal Loan</span>
                        <span className="font-medium">720+</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Car Loan</span>
                        <span className="font-medium">700+</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Credit Card</span>
                        <span className="font-medium">680+</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-b pb-4">
                    <h3 className="font-semibold text-blue-800">Punjab National Bank (PNB)</h3>
                    <div className="mt-2 space-y-2">
                      <div className="flex justify-between">
                        <span>Home Loan</span>
                        <span className="font-medium">680+</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Personal Loan</span>
                        <span className="font-medium">700+</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Car Loan</span>
                        <span className="font-medium">675+</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Credit Card</span>
                        <span className="font-medium">670+</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-blue-800">Bank of Baroda</h3>
                    <div className="mt-2 space-y-2">
                      <div className="flex justify-between">
                        <span>Home Loan</span>
                        <span className="font-medium">685+</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Personal Loan</span>
                        <span className="font-medium">710+</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Car Loan</span>
                        <span className="font-medium">680+</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Credit Card</span>
                        <span className="font-medium">675+</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-md">
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                    <p className="text-sm text-blue-700">
                      Public sector banks may consider applications with scores 20-30 points below these thresholds if other factors 
                      like income stability and low debt-to-income ratio are favorable.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-200 shadow-md">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center mb-4">
                <Building className="h-6 w-6" />
              </div>
              <CardTitle className="text-xl font-bold text-blue-900">Private Banks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <p className="text-gray-700">
                  Private banks generally have stricter CIBIL score requirements and place greater emphasis on credit history. 
                  They offer competitive interest rates for customers with excellent credit scores.
                </p>
                
                <div className="space-y-4">
                  <div className="border-b pb-4">
                    <h3 className="font-semibold text-blue-800">HDFC Bank</h3>
                    <div className="mt-2 space-y-2">
                      <div className="flex justify-between">
                        <span>Home Loan</span>
                        <span className="font-medium">750+</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Personal Loan</span>
                        <span className="font-medium">730+</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Car Loan</span>
                        <span className="font-medium">725+</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Credit Card</span>
                        <span className="font-medium">700+</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-b pb-4">
                    <h3 className="font-semibold text-blue-800">ICICI Bank</h3>
                    <div className="mt-2 space-y-2">
                      <div className="flex justify-between">
                        <span>Home Loan</span>
                        <span className="font-medium">740+</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Personal Loan</span>
                        <span className="font-medium">725+</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Car Loan</span>
                        <span className="font-medium">720+</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Credit Card</span>
                        <span className="font-medium">700+</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-blue-800">Axis Bank</h3>
                    <div className="mt-2 space-y-2">
                      <div className="flex justify-between">
                        <span>Home Loan</span>
                        <span className="font-medium">735+</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Personal Loan</span>
                        <span className="font-medium">720+</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Car Loan</span>
                        <span className="font-medium">715+</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Credit Card</span>
                        <span className="font-medium">695+</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-md">
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                    <p className="text-sm text-blue-700">
                      Private banks offer preferential interest rates and higher credit limits for customers with scores above 775. 
                      They may also have special premium products exclusively for high credit score customers.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card className="border-blue-200 shadow-md">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center mb-4">
                <Building className="h-6 w-6" />
              </div>
              <CardTitle className="text-xl font-bold text-blue-900">Non-Banking Financial Companies (NBFCs)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <p className="text-gray-700">
                  NBFCs often have more flexible CIBIL score requirements compared to traditional banks. They may approve loans 
                  for customers with lower scores but typically charge higher interest rates to offset the risk.
                </p>
                
                <div className="space-y-4">
                  <div className="border-b pb-4">
                    <h3 className="font-semibold text-blue-800">Bajaj Finserv</h3>
                    <div className="mt-2 space-y-2">
                      <div className="flex justify-between">
                        <span>Home Loan</span>
                        <span className="font-medium">675+</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Personal Loan</span>
                        <span className="font-medium">680+</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Business Loan</span>
                        <span className="font-medium">650+</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-b pb-4">
                    <h3 className="font-semibold text-blue-800">Tata Capital</h3>
                    <div className="mt-2 space-y-2">
                      <div className="flex justify-between">
                        <span>Home Loan</span>
                        <span className="font-medium">680+</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Personal Loan</span>
                        <span className="font-medium">670+</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Car Loan</span>
                        <span className="font-medium">660+</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-blue-800">Aditya Birla Finance</h3>
                    <div className="mt-2 space-y-2">
                      <div className="flex justify-between">
                        <span>Home Loan</span>
                        <span className="font-medium">670+</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Personal Loan</span>
                        <span className="font-medium">665+</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Business Loan</span>
                        <span className="font-medium">650+</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-md">
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                    <p className="text-sm text-blue-700">
                      Some NBFCs may consider applications with scores as low as 630 for secured loans, but interest rates will 
                      be significantly higher. They often place greater emphasis on income stability and collateral value.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-200 shadow-md">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center mb-4">
                <Building className="h-6 w-6" />
              </div>
              <CardTitle className="text-xl font-bold text-blue-900">Housing Finance Companies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <p className="text-gray-700">
                  Housing Finance Companies (HFCs) specialize in home loans and typically have CIBIL score requirements that fall 
                  between those of banks and NBFCs. They often consider the property value as a significant factor.
                </p>
                
                <div className="space-y-4">
                  <div className="border-b pb-4">
                    <h3 className="font-semibold text-blue-800">LIC Housing Finance</h3>
                    <div className="mt-2 space-y-2">
                      <div className="flex justify-between">
                        <span>Home Loan</span>
                        <span className="font-medium">700+</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Home Improvement Loan</span>
                        <span className="font-medium">680+</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Loan Against Property</span>
                        <span className="font-medium">675+</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-b pb-4">
                    <h3 className="font-semibold text-blue-800">PNB Housing Finance</h3>
                    <div className="mt-2 space-y-2">
                      <div className="flex justify-between">
                        <span>Home Loan</span>
                        <span className="font-medium">690+</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Home Extension Loan</span>
                        <span className="font-medium">675+</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Loan Against Property</span>
                        <span className="font-medium">670+</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-blue-800">Indiabulls Housing Finance</h3>
                    <div className="mt-2 space-y-2">
                      <div className="flex justify-between">
                        <span>Home Loan</span>
                        <span className="font-medium">685+</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Home Construction Loan</span>
                        <span className="font-medium">680+</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Loan Against Property</span>
                        <span className="font-medium">665+</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-md">
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                    <p className="text-sm text-blue-700">
                      HFCs may be more flexible with CIBIL score requirements if the property has high value and is in a prime location. 
                      They typically require a lower loan-to-value ratio for applicants with scores below 700.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mb-12">
          <h2 className="text-2xl font-bold text-blue-900 mb-6">Tips for Loan Approval with Different CIBIL Scores</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-3">
                  <CheckCircle className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-lg">Excellent Score (750-900)</h3>
              </div>
              <ul className="space-y-2 pl-6">
                <li className="text-gray-700">Negotiate for lower interest rates</li>
                <li className="text-gray-700">Ask for fee waivers</li>
                <li className="text-gray-700">Apply for higher loan amounts</li>
                <li className="text-gray-700">Request longer repayment terms</li>
                <li className="text-gray-700">Apply for premium credit products</li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center mr-3">
                  <AlertCircle className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-lg">Average Score (650-749)</h3>
              </div>
              <ul className="space-y-2 pl-6">
                <li className="text-gray-700">Provide additional income proof</li>
                <li className="text-gray-700">Offer a larger down payment</li>
                <li className="text-gray-700">Consider a co-applicant</li>
                <li className="text-gray-700">Apply with banks where you have accounts</li>
                <li className="text-gray-700">Reduce existing debt before applying</li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center mr-3">
                  <XCircle className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-lg">Low Score (300-649)</h3>
              </div>
              <ul className="space-y-2 pl-6">
                <li className="text-gray-700">Apply for secured loans only</li>
                <li className="text-gray-700">Find a guarantor with good credit</li>
                <li className="text-gray-700">Consider NBFCs over traditional banks</li>
                <li className="text-gray-700">Start with a smaller loan amount</li>
                <li className="text-gray-700">Improve score before major applications</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 p-6 rounded-lg shadow-md mb-12">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">Check Your CIBIL Score Now</h2>
          <p className="text-blue-700 mb-6">
            Know where you stand before applying for a loan. Get your free CIBIL score and see which banks are most likely to approve your application.
          </p>
          <div className="flex justify-center">
            <Link href="/tools/credit-score/check-by-pan" className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-lg">
              Check Your CIBIL Score <ArrowLeft className="ml-2 h-5 w-5 transform rotate-180" />
            </Link>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-blue-800">Can I get a loan if my CIBIL score is below the bank's requirement?</h3>
              <p className="mt-2 text-gray-700">
                While it's challenging, you may still qualify for a loan with a lower score if you can provide additional security like collateral, 
                a co-applicant with a good credit score, or a larger down payment. Some banks also have special programs for customers with long-standing 
                relationships despite lower credit scores.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-blue-800">Do all banks check CIBIL scores for loan approval?</h3>
              <p className="mt-2 text-gray-700">
                Yes, virtually all regulated financial institutions in India check CIBIL scores before approving loans. However, some smaller 
                cooperative banks, microfinance institutions, and certain NBFCs may rely more on other factors like income stability, 
                employment history, and relationship with the institution.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-blue-800">How quickly will my CIBIL score improve after I start making regular payments?</h3>
              <p className="mt-2 text-gray-700">
                Improvement in your CIBIL score is a gradual process. Consistent on-time payments typically start showing positive effects after 
                3-6 months. However, significant improvements, especially after serious negative marks like defaults, usually take 12-18 months 
                of consistent positive credit behavior.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-blue-800">Should I apply to multiple banks simultaneously to increase my chances?</h3>
              <p className="mt-2 text-gray-700">
                It's not advisable to apply to multiple banks simultaneously as each application generates a hard inquiry on your credit report. 
                Multiple hard inquiries in a short period can temporarily lower your score and signal financial distress to lenders. Instead, 
                research thoroughly and apply selectively to institutions where you have the best chances of approval.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 