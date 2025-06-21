import Link from 'next/link';
import { ArrowLeft, BarChart, TrendingUp, TrendingDown, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CibilScoreRangePage() {
  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-blue-100 min-h-screen py-16 md:py-24 px-6">
      <div className="container mx-auto max-w-6xl">
        <Link href="/tools/credit-score" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Credit Score Tools
        </Link>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-900 mb-4">Understanding CIBIL Score Ranges</h1>
          <p className="text-lg text-blue-700 max-w-3xl mx-auto">
            Your CIBIL score falls between 300 and 900, with higher scores indicating better creditworthiness. 
            Learn what different score ranges mean and how they affect your financial opportunities.
          </p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md mb-12">
          <h2 className="text-2xl font-bold text-blue-900 mb-6">CIBIL Score Range Overview</h2>
          
          <div className="w-full h-16 bg-gradient-to-r from-red-500 via-yellow-400 to-green-500 rounded-lg mb-8 relative">
            <div className="absolute -top-6 left-0 text-center text-sm font-medium text-gray-600">300</div>
            <div className="absolute -top-6 left-1/4 text-center text-sm font-medium text-gray-600">500</div>
            <div className="absolute -top-6 left-1/2 text-center text-sm font-medium text-gray-600">650</div>
            <div className="absolute -top-6 left-3/4 text-center text-sm font-medium text-gray-600">750</div>
            <div className="absolute -top-6 right-0 text-center text-sm font-medium text-gray-600">900</div>
            
            <div className="absolute -bottom-6 left-0 text-center text-sm font-medium text-red-600">Very Poor</div>
            <div className="absolute -bottom-6 left-1/4 text-center text-sm font-medium text-orange-500">Poor</div>
            <div className="absolute -bottom-6 left-1/2 text-center text-sm font-medium text-yellow-500">Fair</div>
            <div className="absolute -bottom-6 left-3/4 text-center text-sm font-medium text-green-500">Good</div>
            <div className="absolute -bottom-6 right-0 text-center text-sm font-medium text-green-600">Excellent</div>
          </div>
          
          <div className="mt-12 space-y-2">
            <p className="text-gray-700">
              The CIBIL score is a three-digit number that represents your creditworthiness based on your credit history. 
              It is one of the most important factors that lenders consider when evaluating loan applications. Understanding 
              what your score means can help you make better financial decisions and improve your chances of loan approval.
            </p>
            <p className="text-gray-700">
              TransUnion CIBIL (Credit Information Bureau India Limited) calculates this score based on your credit report, 
              which includes details of your loan accounts, credit cards, payment history, credit inquiries, and other financial information.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <Card className="border-green-200 shadow-md">
            <CardHeader className="bg-green-50 border-b border-green-100">
              <div className="w-12 h-12 rounded-lg bg-green-500/10 text-green-500 flex items-center justify-center mb-4">
                <CheckCircle className="h-6 w-6" />
              </div>
              <CardTitle className="text-xl font-bold text-green-900">Excellent (750-900)</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex justify-between mb-1">
                  <span className="font-medium">Loan Approval Rate</span>
                  <span className="text-green-600 font-medium">Very High</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '95%' }}></div>
                </div>
                
                <h3 className="font-semibold text-green-800 mt-6">What This Means</h3>
                <p className="text-gray-700">
                  An excellent CIBIL score indicates exceptional credit management. You consistently pay bills on time, 
                  maintain low credit utilization, and have a stable credit history.
                </p>
                
                <h3 className="font-semibold text-green-800 mt-4">Benefits</h3>
                <ul className="space-y-2 pl-5 list-disc text-gray-700">
                  <li>Highest chance of loan approval</li>
                  <li>Access to the lowest interest rates</li>
                  <li>Higher credit limits</li>
                  <li>Preferential treatment from lenders</li>
                  <li>Fee waivers on many financial products</li>
                  <li>Pre-approved loan offers</li>
                </ul>
                
                <h3 className="font-semibold text-green-800 mt-4">Maintenance Tips</h3>
                <ul className="space-y-2 pl-5 list-disc text-gray-700">
                  <li>Continue making timely payments</li>
                  <li>Keep credit utilization below 30%</li>
                  <li>Maintain a diverse credit mix</li>
                  <li>Limit new credit applications</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-200 shadow-md">
            <CardHeader className="bg-blue-50 border-b border-blue-100">
              <div className="w-12 h-12 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6" />
              </div>
              <CardTitle className="text-xl font-bold text-blue-900">Good (700-749)</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex justify-between mb-1">
                  <span className="font-medium">Loan Approval Rate</span>
                  <span className="text-blue-600 font-medium">High</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '80%' }}></div>
                </div>
                
                <h3 className="font-semibold text-blue-800 mt-6">What This Means</h3>
                <p className="text-gray-700">
                  A good CIBIL score indicates strong credit management. You generally pay bills on time and maintain 
                  reasonable credit utilization. You may have had a few minor delays in payments.
                </p>
                
                <h3 className="font-semibold text-blue-800 mt-4">Benefits</h3>
                <ul className="space-y-2 pl-5 list-disc text-gray-700">
                  <li>Good chance of loan approval</li>
                  <li>Competitive interest rates</li>
                  <li>Decent credit limits</li>
                  <li>Access to most financial products</li>
                  <li>Some pre-approved offers</li>
                </ul>
                
                <h3 className="font-semibold text-blue-800 mt-4">Improvement Tips</h3>
                <ul className="space-y-2 pl-5 list-disc text-gray-700">
                  <li>Ensure all payments are made on time</li>
                  <li>Reduce credit utilization to below 30%</li>
                  <li>Avoid applying for multiple loans</li>
                  <li>Maintain older credit accounts</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="border-yellow-200 shadow-md">
            <CardHeader className="bg-yellow-50 border-b border-yellow-100">
              <div className="w-12 h-12 rounded-lg bg-yellow-500/10 text-yellow-500 flex items-center justify-center mb-4">
                <AlertCircle className="h-6 w-6" />
              </div>
              <CardTitle className="text-xl font-bold text-yellow-900">Fair (650-699)</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex justify-between mb-1">
                  <span className="font-medium">Loan Approval Rate</span>
                  <span className="text-yellow-600 font-medium">Moderate</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: '60%' }}></div>
                </div>
                
                <h3 className="font-semibold text-yellow-800 mt-6">What This Means</h3>
                <p className="text-gray-700">
                  A fair CIBIL score indicates average credit management. You may have had some late payments or 
                  higher credit utilization. Your credit history might be limited or have some inconsistencies.
                </p>
                
                <h3 className="font-semibold text-yellow-800 mt-4">What to Expect</h3>
                <ul className="space-y-2 pl-5 list-disc text-gray-700">
                  <li>Moderate chance of loan approval</li>
                  <li>Higher than average interest rates</li>
                  <li>Lower credit limits</li>
                  <li>May require additional documentation</li>
                  <li>Limited access to premium financial products</li>
                </ul>
                
                <h3 className="font-semibold text-yellow-800 mt-4">Improvement Tips</h3>
                <ul className="space-y-2 pl-5 list-disc text-gray-700">
                  <li>Pay all bills on time consistently</li>
                  <li>Reduce outstanding debt</li>
                  <li>Keep credit utilization below 40%</li>
                  <li>Avoid new credit applications</li>
                  <li>Check credit report for errors</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="border-orange-200 shadow-md">
            <CardHeader className="bg-orange-50 border-b border-orange-100">
              <div className="w-12 h-12 rounded-lg bg-orange-500/10 text-orange-500 flex items-center justify-center mb-4">
                <TrendingDown className="h-6 w-6" />
              </div>
              <CardTitle className="text-xl font-bold text-orange-900">Poor (600-649)</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex justify-between mb-1">
                  <span className="font-medium">Loan Approval Rate</span>
                  <span className="text-orange-600 font-medium">Low</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-orange-500 h-2.5 rounded-full" style={{ width: '35%' }}></div>
                </div>
                
                <h3 className="font-semibold text-orange-800 mt-6">What This Means</h3>
                <p className="text-gray-700">
                  A poor CIBIL score indicates problematic credit management. You likely have multiple late payments, 
                  high credit utilization, or other negative marks on your credit report.
                </p>
                
                <h3 className="font-semibold text-orange-800 mt-4">What to Expect</h3>
                <ul className="space-y-2 pl-5 list-disc text-gray-700">
                  <li>Difficulty getting loans approved</li>
                  <li>Significantly higher interest rates</li>
                  <li>Very low credit limits</li>
                  <li>May require collateral or co-signers</li>
                  <li>Limited access to most financial products</li>
                </ul>
                
                <h3 className="font-semibold text-orange-800 mt-4">Improvement Tips</h3>
                <ul className="space-y-2 pl-5 list-disc text-gray-700">
                  <li>Pay all outstanding debts</li>
                  <li>Set up automatic payments</li>
                  <li>Reduce credit card balances</li>
                  <li>Consider credit counseling</li>
                  <li>Avoid applying for new credit</li>
                  <li>Check credit report for errors</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="border-red-200 shadow-md">
            <CardHeader className="bg-red-50 border-b border-red-100">
              <div className="w-12 h-12 rounded-lg bg-red-500/10 text-red-500 flex items-center justify-center mb-4">
                <XCircle className="h-6 w-6" />
              </div>
              <CardTitle className="text-xl font-bold text-red-900">Very Poor (300-599)</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex justify-between mb-1">
                  <span className="font-medium">Loan Approval Rate</span>
                  <span className="text-red-600 font-medium">Very Low</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-red-600 h-2.5 rounded-full" style={{ width: '15%' }}></div>
                </div>
                
                <h3 className="font-semibold text-red-800 mt-6">What This Means</h3>
                <p className="text-gray-700">
                  A very poor CIBIL score indicates serious credit issues. You likely have multiple defaults, 
                  collections, or other significant negative marks on your credit report.
                </p>
                
                <h3 className="font-semibold text-red-800 mt-4">What to Expect</h3>
                <ul className="space-y-2 pl-5 list-disc text-gray-700">
                  <li>Most loan applications will be rejected</li>
                  <li>Extremely high interest rates if approved</li>
                  <li>Required collateral for any loans</li>
                  <li>Required co-signers with good credit</li>
                  <li>Very limited access to credit products</li>
                </ul>
                
                <h3 className="font-semibold text-red-800 mt-4">Recovery Tips</h3>
                <ul className="space-y-2 pl-5 list-disc text-gray-700">
                  <li>Settle outstanding debts</li>
                  <li>Consider debt consolidation</li>
                  <li>Set up strict payment schedules</li>
                  <li>Consider secured credit cards</li>
                  <li>Seek professional credit counseling</li>
                  <li>Dispute any inaccuracies in credit report</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200 shadow-md">
            <CardHeader className="bg-gray-50 border-b border-gray-100">
              <div className="w-12 h-12 rounded-lg bg-gray-500/10 text-gray-500 flex items-center justify-center mb-4">
                <BarChart className="h-6 w-6" />
              </div>
              <CardTitle className="text-xl font-bold text-gray-900">No Score / NH</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-800 mt-2">What This Means</h3>
                <p className="text-gray-700">
                  "NH" (No History) or no score indicates insufficient credit history to generate a CIBIL score. 
                  This typically happens when you have no credit accounts or very limited credit history (less than 6 months).
                </p>
                
                <h3 className="font-semibold text-gray-800 mt-4">What to Expect</h3>
                <ul className="space-y-2 pl-5 list-disc text-gray-700">
                  <li>Difficulty getting unsecured loans</li>
                  <li>Limited access to credit products</li>
                  <li>May need secured credit options</li>
                  <li>Higher interest rates due to unproven creditworthiness</li>
                  <li>Additional documentation requirements</li>
                </ul>
                
                <h3 className="font-semibold text-gray-800 mt-4">Building Credit Tips</h3>
                <ul className="space-y-2 pl-5 list-disc text-gray-700">
                  <li>Apply for a secured credit card</li>
                  <li>Become an authorized user on a family member's card</li>
                  <li>Take a small personal loan</li>
                  <li>Consider credit builder loans</li>
                  <li>Ensure utility bills are in your name</li>
                  <li>Make all payments on time</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md mb-12">
          <h2 className="text-2xl font-bold text-blue-900 mb-6">How Different CIBIL Score Ranges Affect Loan Terms</h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-blue-200">
              <thead>
                <tr className="bg-blue-50">
                  <th className="py-3 px-4 border-b text-left">Loan Feature</th>
                  <th className="py-3 px-4 border-b text-center">Excellent<br/>(750-900)</th>
                  <th className="py-3 px-4 border-b text-center">Good<br/>(700-749)</th>
                  <th className="py-3 px-4 border-b text-center">Fair<br/>(650-699)</th>
                  <th className="py-3 px-4 border-b text-center">Poor<br/>(600-649)</th>
                  <th className="py-3 px-4 border-b text-center">Very Poor<br/>(300-599)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-3 px-4 border-b font-medium">Interest Rate (Home Loan)</td>
                  <td className="py-3 px-4 border-b text-center text-green-600">6.5% - 7.5%</td>
                  <td className="py-3 px-4 border-b text-center text-green-500">7.5% - 8.5%</td>
                  <td className="py-3 px-4 border-b text-center text-yellow-500">8.5% - 9.5%</td>
                  <td className="py-3 px-4 border-b text-center text-orange-500">9.5% - 11%</td>
                  <td className="py-3 px-4 border-b text-center text-red-500">11%+ or Denied</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 border-b font-medium">Interest Rate (Personal Loan)</td>
                  <td className="py-3 px-4 border-b text-center text-green-600">10% - 12%</td>
                  <td className="py-3 px-4 border-b text-center text-green-500">12% - 14%</td>
                  <td className="py-3 px-4 border-b text-center text-yellow-500">14% - 16%</td>
                  <td className="py-3 px-4 border-b text-center text-orange-500">16% - 20%</td>
                  <td className="py-3 px-4 border-b text-center text-red-500">20%+ or Denied</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 border-b font-medium">Loan Amount (% of eligibility)</td>
                  <td className="py-3 px-4 border-b text-center text-green-600">90% - 100%</td>
                  <td className="py-3 px-4 border-b text-center text-green-500">80% - 90%</td>
                  <td className="py-3 px-4 border-b text-center text-yellow-500">70% - 80%</td>
                  <td className="py-3 px-4 border-b text-center text-orange-500">50% - 70%</td>
                  <td className="py-3 px-4 border-b text-center text-red-500">50% or Denied</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 border-b font-medium">Processing Fee</td>
                  <td className="py-3 px-4 border-b text-center text-green-600">Often Waived</td>
                  <td className="py-3 px-4 border-b text-center text-green-500">0.25% - 0.5%</td>
                  <td className="py-3 px-4 border-b text-center text-yellow-500">0.5% - 1%</td>
                  <td className="py-3 px-4 border-b text-center text-orange-500">1% - 2%</td>
                  <td className="py-3 px-4 border-b text-center text-red-500">2%+ or Denied</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 border-b font-medium">Documentation Required</td>
                  <td className="py-3 px-4 border-b text-center text-green-600">Minimal</td>
                  <td className="py-3 px-4 border-b text-center text-green-500">Standard</td>
                  <td className="py-3 px-4 border-b text-center text-yellow-500">Additional</td>
                  <td className="py-3 px-4 border-b text-center text-orange-500">Extensive</td>
                  <td className="py-3 px-4 border-b text-center text-red-500">Very Extensive</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 border-b font-medium">Approval Time</td>
                  <td className="py-3 px-4 border-b text-center text-green-600">Fast-tracked</td>
                  <td className="py-3 px-4 border-b text-center text-green-500">Quick</td>
                  <td className="py-3 px-4 border-b text-center text-yellow-500">Normal</td>
                  <td className="py-3 px-4 border-b text-center text-orange-500">Extended</td>
                  <td className="py-3 px-4 border-b text-center text-red-500">Very Long</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <p className="text-sm text-gray-600 mt-4">
            <strong>Note:</strong> These ranges are approximate and may vary by lender, loan type, and individual circumstances. 
            Interest rates are illustrative and subject to change based on market conditions.
          </p>
        </div>

        <div className="bg-blue-50 p-6 rounded-lg shadow-md mb-12">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">Check Your CIBIL Score Now</h2>
          <p className="text-blue-700 mb-6">
            Know where you stand on the CIBIL score range. Get your free credit score and detailed report to understand your financial standing.
          </p>
          <div className="flex justify-center">
            <Link href="/tools/credit-score/cibil-by-pan" className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-lg">
              Check Your CIBIL Score <ArrowLeft className="ml-2 h-5 w-5 transform rotate-180" />
            </Link>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-blue-800">Is 750 a good CIBIL score?</h3>
              <p className="mt-2 text-gray-700">
                Yes, a CIBIL score of 750 is considered excellent. It falls in the highest range (750-900) and indicates strong 
                creditworthiness. With this score, you're likely to get approved for most loans and credit cards with the best 
                available interest rates and terms.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-blue-800">How quickly can I improve my CIBIL score from poor to good?</h3>
              <p className="mt-2 text-gray-700">
                Improving your CIBIL score from poor to good typically takes 6-12 months of consistent positive credit behavior. 
                The most effective strategies include paying all bills on time, reducing credit utilization below 30%, avoiding 
                new credit applications, and addressing any errors in your credit report. Significant negative marks like defaults 
                may take longer to overcome.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-blue-800">Can my CIBIL score ever reach 900?</h3>
              <p className="mt-2 text-gray-700">
                While 900 is the maximum possible CIBIL score, it's extremely rare to achieve. Most individuals with excellent credit 
                management typically score between 800 and 850. To maximize your score, maintain a perfect payment history, keep credit 
                utilization very low (under 10%), have a long credit history, maintain a diverse mix of credit accounts, and limit new 
                credit inquiries.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-blue-800">What's the minimum CIBIL score needed for a home loan?</h3>
              <p className="mt-2 text-gray-700">
                Most lenders prefer a minimum CIBIL score of 700 for home loans, though some may approve applications with scores as low 
                as 650. However, scores below 700 typically result in higher interest rates, lower loan amounts, and stricter terms. For 
                the best home loan rates and terms, aim for a score of 750 or above.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-blue-800">Does income affect my CIBIL score?</h3>
              <p className="mt-2 text-gray-700">
                No, your income does not directly affect your CIBIL score. The score is based on your credit behavior, not your earning 
                capacity. However, income indirectly impacts your score as it affects your ability to make timely payments and manage 
                credit utilization. Lenders consider both your CIBIL score and income when evaluating loan applications.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 