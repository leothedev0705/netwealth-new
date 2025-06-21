import Link from 'next/link';
import { ArrowLeft, TrendingUp, CheckCircle, AlertCircle, Clock, CreditCard, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ImproveScorePage() {
  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-blue-100 min-h-screen py-16 md:py-24 px-6">
      <div className="container mx-auto max-w-6xl">
        <Link href="/tools/credit-score" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Credit Score Tools
        </Link>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-900 mb-4">How to Improve Your CIBIL Score</h1>
          <p className="text-lg text-blue-700 max-w-3xl mx-auto">
            A comprehensive guide to boosting your credit score through proven strategies and responsible financial habits.
            Learn actionable steps to improve your creditworthiness and unlock better financial opportunities.
          </p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md mb-12">
          <div className="flex items-center mb-6">
            <TrendingUp className="h-8 w-8 text-blue-500 mr-3" />
            <h2 className="text-2xl font-bold text-blue-900">Understanding CIBIL Score Improvement</h2>
          </div>
          
          <div className="space-y-4">
            <p className="text-gray-700">
              Improving your CIBIL score is a gradual process that requires consistent financial discipline and strategic planning. 
              Your score isn't fixed—it's a dynamic reflection of your credit behavior that can change over time based on your actions.
            </p>
            
            <p className="text-gray-700">
              The time required to improve your score depends on your current score and the specific issues affecting it. Minor issues 
              like high credit utilization can be addressed in a few months, while serious negative marks like defaults may take years 
              to overcome completely.
            </p>
            
            <div className="bg-blue-50 p-4 rounded-md mt-4">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-blue-800">Expected Timeline for Improvement</h3>
                  <ul className="mt-2 space-y-1 text-blue-700">
                    <li><strong>Minor Issues:</strong> 3-6 months</li>
                    <li><strong>Moderate Issues:</strong> 6-12 months</li>
                    <li><strong>Serious Issues:</strong> 12-24+ months</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-blue-900 mb-6">Effective Strategies to Improve Your CIBIL Score</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card className="border-blue-200 shadow-md">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center mb-4">
                <CheckCircle className="h-6 w-6" />
              </div>
              <CardTitle className="text-xl font-bold text-blue-900">Pay Bills on Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-700">
                  Your payment history is the most significant factor in your CIBIL score calculation, accounting for approximately 35% of your score. 
                  Consistently paying your bills on time is the most effective way to improve and maintain a good credit score.
                </p>
                
                <h3 className="font-semibold text-blue-800 mt-4">Action Steps:</h3>
                <ul className="space-y-2 pl-5 list-disc text-gray-700">
                  <li><strong>Set up automatic payments</strong> for all your credit cards and loans to ensure timely payments</li>
                  <li><strong>Create payment reminders</strong> on your phone or calendar a few days before due dates</li>
                  <li><strong>Align payment due dates</strong> with your salary credit date for better cash flow management</li>
                  <li><strong>Pay at least the minimum amount due</strong> if you can't pay the full balance</li>
                  <li><strong>Contact your lender immediately</strong> if you anticipate difficulty making a payment</li>
                </ul>
                
                <div className="bg-blue-50 p-4 rounded-md mt-4">
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                    <p className="text-sm text-blue-700">
                      Even a single late payment can significantly impact your score, especially if it's recent. Payments that are 
                      30+ days late are reported to credit bureaus and can remain on your report for up to 7 years.
                    </p>
                  </div>
                </div>
                
                <div className="mt-4 border-t pt-4">
                  <h3 className="font-semibold text-blue-800">Impact Timeline:</h3>
                  <p className="text-gray-700 mt-2">
                    Establishing a consistent pattern of on-time payments will start showing positive effects after 3-6 months, 
                    with significant improvements visible after 12 months of perfect payment history.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200 shadow-md">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-green-500/10 text-green-500 flex items-center justify-center mb-4">
                <CreditCard className="h-6 w-6" />
              </div>
              <CardTitle className="text-xl font-bold text-green-900">Reduce Credit Utilization</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-700">
                  Credit utilization—the percentage of your available credit that you're using—accounts for about 30% of your CIBIL score. 
                  Lower utilization rates are associated with higher credit scores, as they indicate responsible credit management.
                </p>
                
                <h3 className="font-semibold text-green-800 mt-4">Action Steps:</h3>
                <ul className="space-y-2 pl-5 list-disc text-gray-700">
                  <li><strong>Keep your credit utilization below 30%</strong> of your total available credit</li>
                  <li><strong>Pay down existing balances</strong> aggressively, starting with high-interest cards</li>
                  <li><strong>Make multiple payments throughout the month</strong> to keep balances low</li>
                  <li><strong>Request credit limit increases</strong> on existing accounts (without hard inquiries if possible)</li>
                  <li><strong>Keep old credit cards open</strong> even if you don't use them regularly</li>
                  <li><strong>Distribute your spending</strong> across multiple cards rather than maxing out one</li>
                </ul>
                
                <div className="bg-green-50 p-4 rounded-md mt-4">
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <p className="text-sm text-green-700">
                      For optimal results, aim to keep your overall credit utilization below 30%, with individual card utilization 
                      below 50%. The ideal utilization for the highest scores is typically under 10%.
                    </p>
                  </div>
                </div>
                
                <div className="mt-4 border-t pt-4">
                  <h3 className="font-semibold text-green-800">Impact Timeline:</h3>
                  <p className="text-gray-700 mt-2">
                    Reducing your credit utilization can have one of the fastest impacts on your score. Once the lower balances are 
                    reported to CIBIL (typically at your statement closing date), you may see improvements within 30-60 days.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card className="border-yellow-200 shadow-md">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-yellow-500/10 text-yellow-500 flex items-center justify-center mb-4">
                <Clock className="h-6 w-6" />
              </div>
              <CardTitle className="text-xl font-bold text-yellow-900">Maintain Old Credit Accounts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-700">
                  The length of your credit history accounts for approximately 15% of your CIBIL score. Older accounts demonstrate 
                  a longer track record of managing credit, which can positively impact your score.
                </p>
                
                <h3 className="font-semibold text-yellow-800 mt-4">Action Steps:</h3>
                <ul className="space-y-2 pl-5 list-disc text-gray-700">
                  <li><strong>Keep your oldest credit accounts open</strong>, even if you don't use them frequently</li>
                  <li><strong>Use older cards occasionally</strong> for small purchases to keep them active</li>
                  <li><strong>Set up a small recurring payment</strong> (like a subscription) on old cards</li>
                  <li><strong>Request retention offers</strong> instead of closing accounts with annual fees</li>
                  <li><strong>Consider product changes</strong> rather than closing accounts if the current card doesn't meet your needs</li>
                </ul>
                
                <div className="bg-yellow-50 p-4 rounded-md mt-4">
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" />
                    <p className="text-sm text-yellow-700">
                      Closing an old credit card can have two negative effects: it reduces your available credit (increasing utilization) 
                      and eventually removes that account's history from your credit report, potentially shortening your average credit age.
                    </p>
                  </div>
                </div>
                
                <div className="mt-4 border-t pt-4">
                  <h3 className="font-semibold text-yellow-800">Impact Timeline:</h3>
                  <p className="text-gray-700 mt-2">
                    This is a long-term strategy. The positive impact of maintaining older accounts builds gradually over years, 
                    but the negative impact of closing them can be felt more quickly through increased utilization ratios.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-200 shadow-md">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-purple-500/10 text-purple-500 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6" />
              </div>
              <CardTitle className="text-xl font-bold text-purple-900">Limit Hard Inquiries</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-700">
                  Every time you apply for credit, the lender makes a hard inquiry on your credit report. Multiple inquiries in a 
                  short period can lower your score and signal financial distress to lenders.
                </p>
                
                <h3 className="font-semibold text-purple-800 mt-4">Action Steps:</h3>
                <ul className="space-y-2 pl-5 list-disc text-gray-700">
                  <li><strong>Apply for new credit only when necessary</strong> and when you're likely to be approved</li>
                  <li><strong>Research qualification requirements</strong> before applying to avoid unnecessary rejections</li>
                  <li><strong>Space out credit applications</strong> by at least 3-6 months when possible</li>
                  <li><strong>Shop for specific loans within a focused timeframe</strong> (14-45 days) so multiple inquiries count as one</li>
                  <li><strong>Check for pre-approved or pre-qualified offers</strong> that don't require hard inquiries</li>
                </ul>
                
                <div className="bg-purple-50 p-4 rounded-md mt-4">
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-purple-500 mr-2 mt-0.5" />
                    <p className="text-sm text-purple-700">
                      Hard inquiries remain on your credit report for 24 months, but their impact on your score diminishes significantly 
                      after the first 12 months. Checking your own credit score is a "soft inquiry" and doesn't affect your score.
                    </p>
                  </div>
                </div>
                
                <div className="mt-4 border-t pt-4">
                  <h3 className="font-semibold text-purple-800">Impact Timeline:</h3>
                  <p className="text-gray-700 mt-2">
                    The negative impact of hard inquiries is immediate but relatively small (typically 5-10 points per inquiry). 
                    As you avoid new inquiries, your score will gradually recover over 3-12 months.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Card className="border-red-200 shadow-md">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-red-500/10 text-red-500 flex items-center justify-center mb-4">
                <AlertCircle className="h-6 w-6" />
              </div>
              <CardTitle className="text-xl font-bold text-red-900">Dispute Credit Report Errors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-700">
                  Inaccuracies in your credit report can unfairly lower your score. Regularly checking your report and disputing 
                  errors can help ensure your score accurately reflects your credit behavior.
                </p>
                
                <h3 className="font-semibold text-red-800 mt-4">Common Errors:</h3>
                <ul className="space-y-2 pl-5 list-disc text-gray-700">
                  <li>Accounts that don't belong to you</li>
                  <li>Incorrect payment statuses</li>
                  <li>Duplicate accounts</li>
                  <li>Outdated information</li>
                  <li>Incorrect personal information</li>
                </ul>
                
                <h3 className="font-semibold text-red-800 mt-4">Dispute Process:</h3>
                <ol className="space-y-2 pl-5 list-decimal text-gray-700">
                  <li>Obtain your credit report</li>
                  <li>Identify errors or discrepancies</li>
                  <li>Gather supporting documentation</li>
                  <li>File a dispute with the credit bureau</li>
                  <li>Follow up after 30-45 days</li>
                </ol>
                
                <div className="mt-4 border-t pt-4">
                  <h3 className="font-semibold text-red-800">Impact Timeline:</h3>
                  <p className="text-gray-700 mt-2">
                    Credit bureaus typically have 30 days to investigate disputes. If errors are confirmed and corrected, 
                    you may see improvements in your score within 30-60 days.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-orange-200 shadow-md">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-orange-500/10 text-orange-500 flex items-center justify-center mb-4">
                <CreditCard className="h-6 w-6" />
              </div>
              <CardTitle className="text-xl font-bold text-orange-900">Diversify Credit Mix</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-700">
                  Having a mix of different types of credit accounts (revolving and installment) can positively impact your score. 
                  This factor contributes approximately 10% to your CIBIL score.
                </p>
                
                <h3 className="font-semibold text-orange-800 mt-4">Types of Credit:</h3>
                <ul className="space-y-2 pl-5 list-disc text-gray-700">
                  <li><strong>Revolving Credit:</strong> Credit cards, overdraft facilities</li>
                  <li><strong>Installment Loans:</strong> Personal loans, auto loans, home loans</li>
                  <li><strong>Secured Credit:</strong> Loans backed by collateral</li>
                  <li><strong>Unsecured Credit:</strong> Loans without collateral</li>
                </ul>
                
                <div className="bg-orange-50 p-4 rounded-md mt-4">
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-orange-500 mr-2 mt-0.5" />
                    <p className="text-sm text-orange-700">
                      Don't take on unnecessary debt just to diversify your credit mix. Only apply for credit that you actually 
                      need and can manage responsibly.
                    </p>
                  </div>
                </div>
                
                <div className="mt-4 border-t pt-4">
                  <h3 className="font-semibold text-orange-800">Impact Timeline:</h3>
                  <p className="text-gray-700 mt-2">
                    Adding a new type of credit to your mix can have a positive impact within 3-6 months, assuming you manage 
                    the new account responsibly.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-teal-200 shadow-md">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-teal-500/10 text-teal-500 flex items-center justify-center mb-4">
                <CheckCircle className="h-6 w-6" />
              </div>
              <CardTitle className="text-xl font-bold text-teal-900">Become an Authorized User</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-700">
                  Being added as an authorized user on someone else's credit card can help you build or improve your credit, 
                  especially if you have limited credit history or past credit problems.
                </p>
                
                <h3 className="font-semibold text-teal-800 mt-4">Key Considerations:</h3>
                <ul className="space-y-2 pl-5 list-disc text-gray-700">
                  <li>Choose someone with excellent payment history</li>
                  <li>Ensure the account has low utilization</li>
                  <li>Verify that the card issuer reports authorized users to credit bureaus</li>
                  <li>Establish clear expectations about card usage</li>
                  <li>Monitor the account to ensure continued positive history</li>
                </ul>
                
                <div className="bg-teal-50 p-4 rounded-md mt-4">
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-teal-500 mr-2 mt-0.5" />
                    <p className="text-sm text-teal-700">
                      As an authorized user, you benefit from the primary cardholder's credit history with that specific card. 
                      However, you're not legally responsible for the debt, and the impact on your score may be less significant 
                      than having your own accounts.
                    </p>
                  </div>
                </div>
                
                <div className="mt-4 border-t pt-4">
                  <h3 className="font-semibold text-teal-800">Impact Timeline:</h3>
                  <p className="text-gray-700 mt-2">
                    The positive impact can be seen within 30-60 days after the next reporting cycle, assuming the primary 
                    account has a good payment history and low utilization.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md mb-12">
          <h2 className="text-2xl font-bold text-blue-900 mb-6">Recovery Strategies for Specific Credit Issues</h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-blue-800 mb-3">Recovering from Late Payments</h3>
              <ul className="space-y-2 pl-5 list-disc text-gray-700">
                <li><strong>Bring all accounts current</strong> as quickly as possible</li>
                <li><strong>Request goodwill deletion</strong> for one-time late payments if you have an otherwise good history</li>
                <li><strong>Set up automatic payments</strong> to prevent future late payments</li>
                <li><strong>Build positive history</strong> to offset the negative impact over time</li>
                <li><strong>Expected recovery time:</strong> 12-24 months for significant improvement</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-blue-800 mb-3">Rebuilding After Defaults or Settlements</h3>
              <ul className="space-y-2 pl-5 list-disc text-gray-700">
                <li><strong>Settle outstanding debts</strong> and get written confirmation</li>
                <li><strong>Request "paid in full" or "settled" status</strong> on your credit report</li>
                <li><strong>Consider a secured credit card</strong> to rebuild positive history</li>
                <li><strong>Make all payments on time</strong> on current and new accounts</li>
                <li><strong>Expected recovery time:</strong> 2-7 years depending on severity</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-blue-800 mb-3">Building Credit from Scratch</h3>
              <ul className="space-y-2 pl-5 list-disc text-gray-700">
                <li><strong>Apply for a secured credit card</strong> with a reputable bank</li>
                <li><strong>Consider credit builder loans</strong> specifically designed for this purpose</li>
                <li><strong>Become an authorized user</strong> on a family member's well-established account</li>
                <li><strong>Ensure utility bills and rent payments</strong> are in your name when possible</li>
                <li><strong>Expected timeline:</strong> 6-12 months to establish initial credit history</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-blue-800 mb-3">Addressing High Credit Utilization</h3>
              <ul className="space-y-2 pl-5 list-disc text-gray-700">
                <li><strong>Create a debt repayment plan</strong> focusing on highest-interest accounts first</li>
                <li><strong>Consider debt consolidation</strong> at a lower interest rate</li>
                <li><strong>Request credit limit increases</strong> on existing accounts</li>
                <li><strong>Make multiple payments throughout the month</strong> to keep balances low</li>
                <li><strong>Expected recovery time:</strong> 1-3 months after reducing utilization</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 p-6 rounded-lg shadow-md mb-12">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">Monitor Your Progress</h2>
          <p className="text-blue-700 mb-6">
            Regularly check your CIBIL score to track improvements and identify areas that still need work. 
            Get your free credit report and detailed analysis now.
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
              <h3 className="text-lg font-semibold text-blue-800">How long does negative information stay on my credit report?</h3>
              <p className="mt-2 text-gray-700">
                In India, most negative information—including late payments, defaults, and settlements—remains on your credit report for 
                7 years from the date of the first delinquency. However, the impact of these negative marks on your score diminishes over 
                time, especially if you've established positive credit behavior since then.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-blue-800">Will closing a credit card improve my CIBIL score?</h3>
              <p className="mt-2 text-gray-700">
                Contrary to common belief, closing a credit card often doesn't improve your score and may actually lower it. This happens 
                because closing a card reduces your available credit, which can increase your overall credit utilization ratio. Additionally, 
                if it's an older account, closing it may eventually reduce the average age of your credit history. It's generally better to 
                keep cards open, especially if they have no annual fee, and use them occasionally for small purchases.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-blue-800">Can I improve my score if I have no credit history?</h3>
              <p className="mt-2 text-gray-700">
                Yes, you can build credit from scratch through several methods. Start with a secured credit card, which requires a security 
                deposit that typically becomes your credit limit. Consider credit builder loans specifically designed for this purpose. 
                Becoming an authorized user on a family member's credit card can also help establish history. Ensure utility bills and rent 
                payments are in your name when possible. With consistent responsible behavior, you can establish a good credit profile within 
                6-12 months.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-blue-800">Should I pay off collections to improve my score?</h3>
              <p className="mt-2 text-gray-700">
                Yes, paying off collections can help improve your credit score, though the impact varies based on the scoring model used. 
                While the collection account will still appear on your report for 7 years from the original delinquency date, having it 
                marked as "paid" or "settled" looks better to potential lenders than an outstanding collection. Additionally, some newer 
                scoring models ignore paid collections entirely. When paying off collections, request written confirmation of the payment 
                and verify that your credit report is updated accordingly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 