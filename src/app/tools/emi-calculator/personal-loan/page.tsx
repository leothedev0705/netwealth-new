'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Wallet, IndianRupee, Percent, CalendarDays, Calculator, PiggyBank, Info, BarChart2 } from 'lucide-react';
import { Button } from "@/components/ui/button";

// Bar chart component for EMI breakdown
const EMIBreakdown = ({ principal, interest }: { principal: number; interest: number }) => {
  const total = principal + interest;
  const principalPercentage = (principal / total) * 100;
  const interestPercentage = (interest / total) * 100;
  
  return (
    <div className="space-y-4 w-full">
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-slate-600">Principal</span>
          <span className="font-medium text-slate-700">{formatCurrency(principal)} ({Math.round(principalPercentage)}%)</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-3">
          <div 
            className="bg-purple-500 h-3 rounded-full" 
            style={{ width: `${principalPercentage}%` }}
          ></div>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-slate-600">Interest</span>
          <span className="font-medium text-slate-700">{formatCurrency(interest)} ({Math.round(interestPercentage)}%)</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-3">
          <div 
            className="bg-amber-500 h-3 rounded-full" 
            style={{ width: `${interestPercentage}%` }}
          ></div>
        </div>
      </div>
      <div className="pt-2 border-t border-slate-200">
        <div className="flex justify-between text-sm">
          <span className="font-medium text-slate-600">Total Payment</span>
          <span className="font-semibold text-slate-800">{formatCurrency(total)}</span>
        </div>
      </div>
    </div>
  );
};

// Format number in compact form
const formatCompactNumber = (num: number) => {
  if (num >= 10000000) {
    return (num / 10000000).toFixed(2) + ' Cr';
  } else if (num >= 100000) {
    return (num / 100000).toFixed(2) + ' L';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(2) + ' K';
  }
  return num.toFixed(0);
};

// Format currency
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-IN', { 
    style: 'currency', 
    currency: 'INR', 
    minimumFractionDigits: 0, 
    maximumFractionDigits: 0 
  }).format(value);
};

// Monthly payment schedule component
const MonthlyPaymentSchedule = ({ 
  emi, 
  months, 
  amortization 
}: { 
  emi: number, 
  months: number, 
  amortization: { principal: number, interest: number, balance: number }[] 
}) => {
  const [showAll, setShowAll] = useState(false);
  const visibleMonths = showAll ? amortization : amortization.slice(0, 6);
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-slate-800">Monthly Payment Schedule</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Month</th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">EMI</th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Principal</th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Interest</th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Balance</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {visibleMonths.map((month, index) => (
              <tr key={index} className="hover:bg-slate-50">
                <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-slate-700">{index + 1}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-slate-600">{formatCurrency(emi)}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-slate-600">{formatCurrency(month.principal)}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-slate-600">{formatCurrency(month.interest)}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-slate-600">{formatCurrency(month.balance)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!showAll && months > 6 && (
        <div className="text-center">
          <Button 
            variant="link" 
            onClick={() => setShowAll(true)}
            className="text-purple-600"
          >
            Show all {months} months
          </Button>
        </div>
      )}
    </div>
  );
};

const PersonalLoanEMICalculator = () => {
  const [loanAmountStr, setLoanAmountStr] = useState<string>("500000"); // 5 Lakhs
  const [annualRateStr, setAnnualRateStr] = useState<string>("12");
  const [yearsStr, setYearsStr] = useState<string>("3");
  const [processingFeeStr, setProcessingFeeStr] = useState<string>("1");
  const [result, setResult] = useState<{
    emi: number
    totalInterest: number
    totalPayment: number
    processingFee: number
    amortization: { principal: number, interest: number, balance: number }[]
  } | null>(null);

  // Derived numeric values
  const loanAmount = useMemo(() => parseFloat(loanAmountStr) || 0, [loanAmountStr]);
  const annualRate = useMemo(() => parseFloat(annualRateStr) || 0, [annualRateStr]);
  const years = useMemo(() => parseInt(yearsStr) || 0, [yearsStr]);
  const processingFeePercent = useMemo(() => parseFloat(processingFeeStr) || 0, [processingFeeStr]);
  const months = useMemo(() => years * 12, [years]);

  const handleSliderChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (value: number[]) => {
    setter(String(value[0]));
  };

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>, max: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (value === "" || (/^\d*\.?\d*$/.test(value) && Number(value) <= max)) {
      if (value.length > 1 && value.startsWith('0') && !value.startsWith('0.')) {
        value = value.substring(1);
      }
      setter(value);
    }
  };

  const calculateLoan = () => {
    const principal = loanAmount;
    const ratePerMonth = annualRate / (12 * 100);
    const numberOfMonths = months;
    
    // EMI = P * r * (1 + r)^n / ((1 + r)^n - 1)
    const emi = principal * ratePerMonth * Math.pow(1 + ratePerMonth, numberOfMonths) / 
      (Math.pow(1 + ratePerMonth, numberOfMonths) - 1);
    
    let remainingPrincipal = principal;
    const amortization = [];
    
    for (let i = 0; i < numberOfMonths; i++) {
      const interestForMonth = remainingPrincipal * ratePerMonth;
      const principalForMonth = emi - interestForMonth;
      remainingPrincipal -= principalForMonth;
      
      amortization.push({
        principal: principalForMonth,
        interest: interestForMonth,
        balance: remainingPrincipal > 0 ? remainingPrincipal : 0
      });
    }
    
    const totalPayment = emi * numberOfMonths;
    const totalInterest = totalPayment - principal;
    const processingFee = (principal * processingFeePercent) / 100;

    setResult({
      emi: Math.round(emi),
      totalInterest: Math.round(totalInterest),
      totalPayment: Math.round(totalPayment),
      processingFee: Math.round(processingFee),
      amortization
    });
  };

  // Calculate on initial render and when inputs change
  useEffect(() => {
    calculateLoan();
  }, [loanAmount, annualRate, years, processingFeePercent]);

  return (
    <div className="bg-gradient-to-br from-purple-50 via-white to-purple-50 min-h-screen py-16 md:py-24 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <Wallet className="h-8 w-8 text-purple-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">Personal Loan EMI Calculator</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Plan your personal loan with our easy-to-use EMI calculator. Get instant calculations for your monthly installments.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Card */}
          <Card className="lg:col-span-1 shadow-lg border-purple-100">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100 border-b border-purple-100">
              <CardTitle className="text-xl font-bold text-slate-800">Loan Details</CardTitle>
              <CardDescription>Adjust the values to calculate your EMI</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-8">
              {/* Loan Amount */}
              <div className="space-y-3">
                <Label htmlFor="loanAmount" className="text-slate-700 font-medium flex items-center gap-2">
                  <IndianRupee className="h-4 w-4 text-purple-500" /> Loan Amount
                </Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="loanAmount"
                    type="text"
                    inputMode="decimal"
                    value={loanAmountStr}
                    onChange={handleInputChange(setLoanAmountStr, 10000000)} // 1 Crore max
                    placeholder="e.g., 500000"
                    className="flex-grow"
                  />
                  <span className="text-sm text-slate-500 font-semibold min-w-[80px] text-right">
                    {formatCompactNumber(loanAmount)}
                  </span>
                </div>
                <Slider
                  value={[loanAmount]}
                  onValueChange={handleSliderChange(setLoanAmountStr)}
                  min={50000} // 50K min
                  max={2000000} // 20 Lakh max for slider
                  step={10000}
                  className="[&>span]:bg-purple-500"
                  aria-label="Loan Amount Slider"
                />
                <div className="flex justify-between text-xs text-slate-500">
                  <span>₹50K</span>
                  <span>₹20L</span>
                </div>
              </div>

              {/* Annual Interest Rate */}
              <div className="space-y-3">
                <Label htmlFor="annualRate" className="text-slate-700 font-medium flex items-center gap-2">
                  <Percent className="h-4 w-4 text-purple-500" /> Interest Rate (% p.a.)
                </Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="annualRate"
                    type="text"
                    inputMode="decimal"
                    value={annualRateStr}
                    onChange={handleInputChange(setAnnualRateStr, 30)}
                    placeholder="e.g., 12"
                    className="flex-grow"
                  />
                  <span className="text-sm text-slate-500 font-semibold min-w-[40px] text-right">
                    {annualRate}%
                  </span>
                </div>
                <Slider
                  value={[annualRate]}
                  onValueChange={handleSliderChange(setAnnualRateStr)}
                  min={8} // Min rate 8%
                  max={24} // Max rate 24%
                  step={0.1}
                  className="[&>span]:bg-purple-500"
                  aria-label="Annual Rate Slider"
                />
                <div className="flex justify-between text-xs text-slate-500">
                  <span>8%</span>
                  <span>24%</span>
                </div>
              </div>

              {/* Loan Tenure (Years) */}
              <div className="space-y-3">
                <Label htmlFor="years" className="text-slate-700 font-medium flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-purple-500" /> Loan Tenure
                </Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="years"
                    type="text"
                    inputMode="numeric"
                    value={yearsStr}
                    onChange={handleInputChange(setYearsStr, 7)} // Max 7 years
                    placeholder="e.g., 3"
                    className="flex-grow"
                  />
                  <span className="text-sm text-slate-500 font-semibold min-w-[60px] text-right">
                    {years} {years === 1 ? 'Year' : 'Years'}
                  </span>
                </div>
                <Slider
                  value={[years]}
                  onValueChange={handleSliderChange(setYearsStr)}
                  min={1}
                  max={7}
                  step={1}
                  className="[&>span]:bg-purple-500"
                  aria-label="Loan Tenure Slider"
                />
                <div className="flex justify-between text-xs text-slate-500">
                  <span>1 Yr</span>
                  <span>7 Yrs</span>
                </div>
              </div>

              {/* Processing Fee */}
              <div className="space-y-3">
                <Label htmlFor="processingFee" className="text-slate-700 font-medium flex items-center gap-2">
                  <Percent className="h-4 w-4 text-purple-500" /> Processing Fee (%)
                </Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="processingFee"
                    type="text"
                    inputMode="decimal"
                    value={processingFeeStr}
                    onChange={handleInputChange(setProcessingFeeStr, 5)}
                    placeholder="e.g., 1"
                    className="flex-grow"
                  />
                  <span className="text-sm text-slate-500 font-semibold min-w-[40px] text-right">
                    {processingFeePercent}%
                  </span>
                </div>
                <Slider
                  value={[processingFeePercent]}
                  onValueChange={handleSliderChange(setProcessingFeeStr)}
                  min={0}
                  max={3}
                  step={0.1}
                  className="[&>span]:bg-purple-500"
                  aria-label="Processing Fee Slider"
                />
                <div className="flex justify-between text-xs text-slate-500">
                  <span>0%</span>
                  <span>3%</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-purple-50/50 p-6 border-t border-purple-100">
              <Button 
                onClick={calculateLoan} 
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                <Calculator className="h-4 w-4 mr-2" /> Calculate EMI
              </Button>
            </CardFooter>
          </Card>

          {/* Results Card */}
          <Card className="lg:col-span-2 shadow-lg border-purple-100">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100 border-b border-purple-100">
              <CardTitle className="text-xl font-bold text-slate-800">Loan Summary</CardTitle>
              <CardDescription>Your personal loan repayment details</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Main Results */}
                <div className="space-y-6">
                  <div className="bg-purple-50 rounded-xl p-6 text-center">
                    <h3 className="text-sm font-medium text-slate-500 mb-1">Monthly EMI</h3>
                    <p className="text-3xl md:text-4xl font-bold text-purple-600">
                      {formatCurrency(result?.emi || 0)}
                    </p>
                    <p className="text-sm text-slate-500 mt-2">
                      for {months} months
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-50 rounded-lg p-4 text-center">
                      <h3 className="text-xs font-medium text-slate-500 mb-1">Loan Amount</h3>
                      <p className="text-lg font-semibold text-slate-700">{formatCurrency(loanAmount)}</p>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-4 text-center">
                      <h3 className="text-xs font-medium text-slate-500 mb-1">Processing Fee</h3>
                      <p className="text-lg font-semibold text-slate-700">{formatCurrency(result?.processingFee || 0)}</p>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-4 text-center">
                      <h3 className="text-xs font-medium text-slate-500 mb-1">Total Interest</h3>
                      <p className="text-lg font-semibold text-slate-700">{formatCurrency(result?.totalInterest || 0)}</p>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-4 text-center">
                      <h3 className="text-xs font-medium text-slate-500 mb-1">Total Payment</h3>
                      <p className="text-lg font-semibold text-slate-700">{formatCurrency(result?.totalPayment || 0)}</p>
                    </div>
                  </div>
                </div>
                
                {/* Chart */}
                <div className="flex flex-col justify-center">
                  <h3 className="text-lg font-semibold text-slate-800 mb-4">Payment Breakdown</h3>
                  <EMIBreakdown 
                    principal={loanAmount} 
                    interest={result?.totalInterest || 0} 
                  />
                </div>
              </div>
              
              {/* Monthly Payment Schedule */}
              {result && (
                <div className="mt-8">
                  <MonthlyPaymentSchedule 
                    emi={result.emi} 
                    months={months} 
                    amortization={result.amortization} 
                  />
                </div>
              )}
            </CardContent>
            <CardFooter className="bg-purple-50/50 p-6 border-t border-purple-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Info className="h-4 w-4 text-purple-500" />
                <p>Results are indicative. Actual EMI may vary based on bank terms.</p>
              </div>
              <Button variant="outline" className="border-purple-200 text-purple-600 hover:bg-purple-50">
                <BarChart2 className="h-4 w-4 mr-2" /> Compare rates
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        {/* Additional Info */}
        <Card className="mt-8 shadow-lg border-purple-100">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100 border-b border-purple-100">
            <CardTitle className="text-xl font-bold text-slate-800">About Personal Loans</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">Benefits of Personal Loans</h3>
                <ul className="list-disc list-inside text-slate-600 space-y-2">
                  <li>Quick disbursement with minimal documentation</li>
                  <li>No collateral or security required</li>
                  <li>Flexible loan amounts to suit your needs</li>
                  <li>Competitive interest rates based on credit profile</li>
                  <li>Convenient repayment options</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">Eligibility Criteria</h3>
                <ul className="list-disc list-inside text-slate-600 space-y-2">
                  <li>Age between 21 to 60 years</li>
                  <li>Minimum monthly income of ₹15,000</li>
                  <li>CIBIL score of 750 or above for best rates</li>
                  <li>Employment stability of at least 1 year</li>
                  <li>Indian citizenship and valid address proof</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PersonalLoanEMICalculator; 