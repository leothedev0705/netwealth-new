import Link from 'next/link';
import { ArrowLeft, Calculator, Clock, PieChart, CreditCard, Search, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CibilScoreCalculationPage() {
  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-blue-100 min-h-screen py-16 md:py-24 px-6">
      <div className="container mx-auto max-w-6xl">
        <Link href="/tools/credit-score" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Credit Score Tools
        </Link>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-900 mb-4">CIBIL Score Calculation Methodology</h1>
          <p className="text-lg text-blue-700 max-w-3xl mx-auto">
            Understanding how your CIBIL score is calculated can help you make better financial decisions and improve your creditworthiness.
            Learn about the factors that influence your score and their relative importance.
          </p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md mb-12">
          <h2 className="text-2xl font-bold text-blue-900 mb-6">How CIBIL Score is Calculated</h2>
          
          <div className="space-y-4">
            <p className="text-gray-700">
              Your CIBIL score is a three-digit number ranging from 300 to 900 that represents your creditworthiness. 
              TransUnion CIBIL uses a proprietary algorithm to calculate this score based on information in your credit report. 
              While the exact formula is not publicly disclosed, several key factors are known to influence your score.
            </p>
            
            <p className="text-gray-700">
              The CIBIL score calculation takes into account your entire credit history, typically covering the last 24-36 months. 
              Recent credit behavior is given more weight than older history. The score is updated whenever lenders report new 
              information to CIBIL, which usually happens monthly.
            </p>
          </div>
          
          <div className="mt-8">
            <div className="relative w-full h-80 md:h-96">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3/4 h-3/4 rounded-full border-8 border-gray-100 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-900">CIBIL</div>
                    <div className="text-xl font-bold text-blue-700">SCORE</div>
                  </div>
                </div>
              </div>
              
              {/* Payment History Segment - 35% */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="bg-blue-600 text-white px-4 py-2 rounded-full">
                  Payment History: 35%
                </div>
              </div>
              
              {/* Credit Utilization Segment - 30% */}
              <div className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                <div className="bg-green-600 text-white px-4 py-2 rounded-full">
                  Credit Utilization: 30%
                </div>
              </div>
              
              {/* Credit Age Segment - 15% */}
              <div className="absolute bottom-0 right-1/4 transform translate-x-1/2 translate-y-1/2">
                <div className="bg-yellow-500 text-white px-4 py-2 rounded-full">
                  Credit Age: 15%
                </div>
              </div>
              
              {/* Credit Mix Segment - 10% */}
              <div className="absolute bottom-0 left-1/4 transform -translate-x-1/2 translate-y-1/2">
                <div className="bg-orange-500 text-white px-4 py-2 rounded-full">
                  Credit Mix: 10%
                </div>
              </div>
              
              {/* Credit Inquiries Segment - 10% */}
              <div className="absolute top-1/2 left-0 transform -translate-x-1/2 -translate-y-1/2">
                <div className="bg-red-500 text-white px-4 py-2 rounded-full">
                  Credit Inquiries: 10%
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <Card className="border-blue-200 shadow-md">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-blue-600/10 text-blue-600 flex items-center justify-center mb-4">
                <Calculator className="h-6 w-6" />
              </div>
              <CardTitle className="text-xl font-bold text-blue-900">Payment History (35%)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-700">
                  Your payment history is the most significant factor in your CIBIL score calculation, accounting for approximately 35% of your score. 
                  It reflects how consistently you've paid your credit obligations on time.
                </p>
                
                <h3 className="font-semibold text-blue-800 mt-4">What's Included</h3>
                <ul className="space-y-2 pl-5 list-disc text-gray-700">
                  <li>Payment status of credit cards, loans, and other debt</li>
                  <li>Presence of delinquencies, defaults, settlements, or bankruptcies</li>
                  <li>Time since delinquency and frequency of missed payments</li>
                  <li>Amount of money still owed on delinquent accounts</li>
                  <li>Number of accounts paid as agreed</li>
                </ul>
                
                <h3 className="font-semibold text-blue-800 mt-4">Impact on Score</h3>
                <div className="space-y-3 mt-2">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">30+ Days Late</span>
                      <span className="text-sm text-red-500">-80 to -110 points</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">60+ Days Late</span>
                      <span className="text-sm text-red-500">-90 to -120 points</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">90+ Days Late</span>
                      <span className="text-sm text-red-500">-110 to -150 points</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Default/Settlement</span>
                      <span className="text-sm text-red-500">-130 to -170 points</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-md mt-4">
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                    <p className="text-sm text-blue-700">
                      Even a single late payment can significantly impact your score, and the effect increases with the severity and recency of the delinquency. 
                      Negative marks can remain on your report for up to 7 years.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200 shadow-md">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-green-600/10 text-green-600 flex items-center justify-center mb-4">
                <CreditCard className="h-6 w-6" />
              </div>
              <CardTitle className="text-xl font-bold text-green-900">Credit Utilization (30%)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-700">
                  Credit utilization refers to the percentage of your available credit that you're currently using. It accounts for 
                  approximately 30% of your CIBIL score. Lower utilization rates are associated with higher scores.
                </p>
                
                <h3 className="font-semibold text-green-800 mt-4">What's Included</h3>
                <ul className="space-y-2 pl-5 list-disc text-gray-700">
                  <li>Total balance on credit cards relative to total credit limits</li>
                  <li>Utilization ratio for each individual credit card</li>
                  <li>Number of accounts with balances</li>
                  <li>Amount owed on installment loans compared to original loan amounts</li>
                </ul>
                
                <h3 className="font-semibold text-green-800 mt-4">Ideal Utilization Ratios</h3>
                <div className="space-y-3 mt-2">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Below 10%</span>
                      <span className="text-sm text-green-600">Excellent</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '100%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">10% - 30%</span>
                      <span className="text-sm text-green-500">Good</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">30% - 50%</span>
                      <span className="text-sm text-yellow-500">Fair</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">50% - 75%</span>
                      <span className="text-sm text-orange-500">Poor</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-orange-500 h-2 rounded-full" style={{ width: '40%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Above 75%</span>
                      <span className="text-sm text-red-500">Very Poor</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-red-500 h-2 rounded-full" style={{ width: '20%' }}></div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-green-50 p-4 rounded-md mt-4">
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <p className="text-sm text-green-700">
                      Credit utilization is calculated monthly when lenders report to CIBIL. Paying down balances before your statement 
                      date can quickly improve this factor and boost your score.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-yellow-200 shadow-md">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-yellow-500/10 text-yellow-500 flex items-center justify-center mb-4">
                <Clock className="h-6 w-6" />
              </div>
              <CardTitle className="text-xl font-bold text-yellow-900">Credit Age (15%)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-700">
                  The length of your credit history accounts for approximately 15% of your CIBIL score. Generally, a longer credit 
                  history indicates more experience managing credit and results in a higher score.
                </p>
                
                <h3 className="font-semibold text-yellow-800 mt-4">What's Included</h3>
                <ul className="space-y-2 pl-5 list-disc text-gray-700">
                  <li>Age of your oldest credit account</li>
                  <li>Age of your newest credit account</li>
                  <li>Average age of all your accounts</li>
                  <li>How long specific types of accounts have been established</li>
                  <li>Whether you've used certain accounts recently</li>
                </ul>
                
                <h3 className="font-semibold text-yellow-800 mt-4">Impact on Score</h3>
                <div className="space-y-3 mt-2">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Less than 6 months</span>
                      <span className="text-sm text-red-500">Very Low Impact</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">6 months - 2 years</span>
                      <span className="text-sm text-orange-500">Low Impact</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">2 - 5 years</span>
                      <span className="text-sm text-yellow-500">Moderate Impact</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">5 - 10 years</span>
                      <span className="text-sm text-green-500">High Impact</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">10+ years</span>
                      <span className="text-sm text-green-600">Very High Impact</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-yellow-50 p-4 rounded-md mt-4">
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" />
                    <p className="text-sm text-yellow-700">
                      Avoid closing your oldest credit accounts, even if you don't use them frequently. Consider keeping them active 
                      with small, regular purchases that you pay off immediately to maintain the length of your credit history.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-orange-200 shadow-md">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-orange-500/10 text-orange-500 flex items-center justify-center mb-4">
                <PieChart className="h-6 w-6" />
              </div>
              <CardTitle className="text-xl font-bold text-orange-900">Credit Mix (10%)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-700">
                  Credit mix refers to the variety of credit accounts in your portfolio and contributes approximately 10% to your CIBIL score. 
                  Having experience with different types of credit demonstrates your ability to manage various credit obligations.
                </p>
                
                <h3 className="font-semibold text-orange-800 mt-4">Types of Credit</h3>
                <ul className="space-y-2 pl-5 list-disc text-gray-700">
                  <li><strong>Revolving Credit:</strong> Credit cards, overdraft facilities</li>
                  <li><strong>Installment Loans:</strong> Personal loans, auto loans, education loans</li>
                  <li><strong>Secured Loans:</strong> Home loans, loans against property</li>
                  <li><strong>Open Credit:</strong> Charge cards that must be paid in full</li>
                </ul>
                
                <h3 className="font-semibold text-orange-800 mt-4">Ideal Credit Mix</h3>
                <p className="text-gray-700 mt-2">
                  An ideal credit mix typically includes at least one revolving account (like a credit card) and one installment account 
                  (like a personal loan or home loan). However, you should only apply for credit you actually need, not just to improve your mix.
                </p>
                
                <div className="bg-orange-50 p-4 rounded-md mt-4">
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-orange-500 mr-2 mt-0.5" />
                    <p className="text-sm text-orange-700">
                      While having a diverse credit mix can help your score, it's not advisable to take on unnecessary debt just to improve this factor. 
                      Focus on maintaining a mix of accounts that you can manage responsibly.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-red-200 shadow-md">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-red-500/10 text-red-500 flex items-center justify-center mb-4">
                <Search className="h-6 w-6" />
              </div>
              <CardTitle className="text-xl font-bold text-red-900">Credit Inquiries (10%)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-700">
                  Credit inquiries account for approximately 10% of your CIBIL score. These occur when lenders check your credit report 
                  after you apply for credit. Multiple inquiries in a short period can indicate higher credit risk.
                </p>
                
                <h3 className="font-semibold text-red-800 mt-4">Types of Inquiries</h3>
                <ul className="space-y-2 pl-5 list-disc text-gray-700">
                  <li><strong>Hard Inquiries:</strong> Occur when you apply for credit and the lender checks your report. These can impact your score.</li>
                  <li><strong>Soft Inquiries:</strong> Occur when you check your own score or when companies check your report for pre-approved offers. These don't affect your score.</li>
                </ul>
                
                <h3 className="font-semibold text-red-800 mt-4">Impact on Score</h3>
                <div className="space-y-3 mt-2">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">1 inquiry</span>
                      <span className="text-sm text-yellow-500">-5 to -10 points</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">2-3 inquiries within 3 months</span>
                      <span className="text-sm text-orange-500">-10 to -20 points</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">4+ inquiries within 3 months</span>
                      <span className="text-sm text-red-500">-20 to -40 points</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-red-50 p-4 rounded-md mt-4">
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
                    <p className="text-sm text-red-700">
                      Multiple inquiries for the same type of loan (like a home loan) within a 14-45 day period are typically counted as a single 
                      inquiry for scoring purposes, as this is recognized as rate shopping.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-200 shadow-md md:col-span-2 lg:col-span-3">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-purple-500/10 text-purple-500 flex items-center justify-center mb-4">
                <AlertCircle className="h-6 w-6" />
              </div>
              <CardTitle className="text-xl font-bold text-purple-900">Other Factors That May Affect Your Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-purple-800 mb-3">Factors That Don't Directly Affect Your Score</h3>
                  <ul className="space-y-2 pl-5 list-disc text-gray-700">
                    <li><strong>Income and Employment:</strong> Your salary and job are not reported to CIBIL and don't directly impact your score</li>
                    <li><strong>Demographic Information:</strong> Age, gender, marital status, religion, and nationality don't affect your score</li>
                    <li><strong>Checking Your Own Score:</strong> Viewing your own credit report is a "soft inquiry" and doesn't lower your score</li>
                    <li><strong>Spouse's Credit History:</strong> Your spouse's credit history doesn't affect your score unless you have joint accounts</li>
                    <li><strong>Utility Bills and Rent Payments:</strong> These typically aren't reported to CIBIL unless they go to collections</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-purple-800 mb-3">Common Misconceptions</h3>
                  <ul className="space-y-2 pl-5 list-disc text-gray-700">
                    <li><strong>Myth:</strong> Closing credit cards improves your score<br/><strong>Fact:</strong> It can actually hurt your score by increasing utilization and reducing average account age</li>
                    <li><strong>Myth:</strong> You need to carry a balance on credit cards to build credit<br/><strong>Fact:</strong> Paying in full each month is best for your score and finances</li>
                    <li><strong>Myth:</strong> All credit inquiries hurt your score equally<br/><strong>Fact:</strong> Only hard inquiries impact your score, and multiple inquiries for the same loan type within a short period count as one</li>
                    <li><strong>Myth:</strong> Having no debt gives you a perfect score<br/><strong>Fact:</strong> Having and responsibly managing some credit accounts is better for your score than having no credit history</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="bg-blue-50 p-6 rounded-lg shadow-md mb-12">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">Check Your CIBIL Score Now</h2>
          <p className="text-blue-700 mb-6">
            Now that you understand how your CIBIL score is calculated, check where you stand and identify areas for improvement.
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
              <h3 className="text-lg font-semibold text-blue-800">How often is my CIBIL score recalculated?</h3>
              <p className="mt-2 text-gray-700">
                Your CIBIL score is recalculated whenever new information is reported to the credit bureau by lenders, which typically 
                happens monthly. Most lenders report account updates around your statement date. This means your score can change 
                multiple times throughout the month as different lenders report information on different schedules.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-blue-800">Can my CIBIL score be different from different credit bureaus?</h3>
              <p className="mt-2 text-gray-700">
                Yes, your credit score can vary between different credit bureaus in India (CIBIL, Experian, Equifax, and CRIF Highmark). 
                This happens because not all lenders report to all bureaus, and each bureau may use slightly different scoring models. 
                The variations are usually minor, but it's a good practice to check your score from multiple bureaus periodically.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-blue-800">Does paying off a loan early negatively affect my CIBIL score?</h3>
              <p className="mt-2 text-gray-700">
                Paying off a loan early generally doesn't negatively affect your CIBIL score. In fact, it can be positive as it reduces 
                your overall debt burden. However, some lenders may charge prepayment penalties, and closing the account means you lose 
                that active credit line, which could slightly impact your credit mix and average account age. For most people, the financial 
                benefits of paying off a loan early outweigh any minor, temporary impact on your credit score.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-blue-800">How are joint accounts reflected in my CIBIL score?</h3>
              <p className="mt-2 text-gray-700">
                Joint accounts appear on the credit reports of all account holders, and the payment history affects everyone's credit scores 
                equally. This means if payments are made on time, both parties benefit. Conversely, if payments are missed, both credit scores 
                will suffer. It's important to maintain open communication with joint account holders about payment responsibilities, as you're 
                equally liable for the debt regardless of who makes the purchases or payments.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 