'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Briefcase, IndianRupee, Percent, CalendarDays, Calculator, Building, Info, BarChart2 } from 'lucide-react';
import { Button } from "@/components/ui/button";

// Donut chart component for loan breakdown
const DonutChart = ({ principal, interest }: { principal: number; interest: number }) => {
  const total = principal + interest;
  const principalPercentage = (principal / total) * 100;
  const interestPercentage = (interest / total) * 100;
  
  // Calculate stroke dasharray and dashoffset for SVG circles
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  
  const principalDasharray = (principalPercentage / 100) * circumference;
  const interestDasharray = (interestPercentage / 100) * circumference;
  
  return (
    <div className="relative h-64 w-64 mx-auto">
      <svg viewBox="0 0 100 100" className="transform -rotate-90 h-full w-full">
        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="transparent"
          stroke="#f1f5f9"
          strokeWidth="12"
        />
        
        {/* Principal segment */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="transparent"
          stroke="#0f766e"
          strokeWidth="12"
          strokeDasharray={`${principalDasharray} ${circumference}`}
          strokeDashoffset="0"
          className="transition-all duration-700 ease-in-out"
        />
        
        {/* Interest segment */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="transparent"
          stroke="#f59e0b"
          strokeWidth="12"
          strokeDasharray={`${interestDasharray} ${circumference}`}
          strokeDashoffset={-principalDasharray}
          className="transition-all duration-700 ease-in-out"
        />
      </svg>
      
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-xs text-slate-500">Total Payment</span>
        <span className="text-xl font-bold text-slate-800">₹{formatCompactNumber(total)}</span>
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

// Payment breakdown table component
const PaymentBreakdown = ({ 
  loanAmount,
  emi,
  totalInterest,
  totalPayment,
  years
}: { 
  loanAmount: number,
  emi: number,
  totalInterest: number,
  totalPayment: number,
  years: number
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-teal-200 border border-teal-100 rounded-lg">
        <thead className="bg-teal-50">
          <tr>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-teal-800 uppercase tracking-wider">Payment Details</th>
            <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-teal-800 uppercase tracking-wider">Amount</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-teal-100">
          <tr>
            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-slate-700">Loan Amount</td>
            <td className="px-4 py-3 whitespace-nowrap text-sm text-right font-semibold text-slate-700">{formatCurrency(loanAmount)}</td>
          </tr>
          <tr className="bg-teal-50/30">
            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-slate-700">Monthly EMI</td>
            <td className="px-4 py-3 whitespace-nowrap text-sm text-right font-semibold text-teal-700">{formatCurrency(emi)}</td>
          </tr>
          <tr>
            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-slate-700">Total Interest</td>
            <td className="px-4 py-3 whitespace-nowrap text-sm text-right font-semibold text-amber-600">{formatCurrency(totalInterest)}</td>
          </tr>
          <tr className="bg-teal-50/30">
            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-slate-700">Total Amount (Principal + Interest)</td>
            <td className="px-4 py-3 whitespace-nowrap text-sm text-right font-semibold text-slate-700">{formatCurrency(totalPayment)}</td>
          </tr>
          <tr>
            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-slate-700">Loan Tenure</td>
            <td className="px-4 py-3 whitespace-nowrap text-sm text-right font-semibold text-slate-700">{years} Years ({years * 12} Months)</td>
          </tr>
          <tr className="bg-teal-50/30">
            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-slate-700">Interest to Principal Ratio</td>
            <td className="px-4 py-3 whitespace-nowrap text-sm text-right font-semibold text-slate-700">{Math.round((totalInterest / loanAmount) * 100)}%</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const BusinessLoanEMICalculator = () => {
  const [loanAmountStr, setLoanAmountStr] = useState<string>("2000000"); // 20 Lakhs
  const [annualRateStr, setAnnualRateStr] = useState<string>("14");
  const [yearsStr, setYearsStr] = useState<string>("5");
  const [processingFeeStr, setProcessingFeeStr] = useState<string>("2");
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
    <div className="bg-gradient-to-br from-teal-50 via-white to-teal-50 min-h-screen py-16 md:py-24 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <div className="bg-teal-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <Briefcase className="h-8 w-8 text-teal-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">Business Loan EMI Calculator</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Plan your business expansion with our EMI calculator. Get instant calculations for your business loan repayments.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Card */}
          <Card className="lg:col-span-1 shadow-lg border-teal-100">
            <CardHeader className="bg-gradient-to-r from-teal-50 to-teal-100 border-b border-teal-100">
              <CardTitle className="text-xl font-bold text-slate-800">Loan Parameters</CardTitle>
              <CardDescription>Adjust the values to calculate your business loan EMI</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-8">
              {/* Loan Amount */}
              <div className="space-y-3">
                <Label htmlFor="loanAmount" className="text-slate-700 font-medium flex items-center gap-2">
                  <IndianRupee className="h-4 w-4 text-teal-500" /> Loan Amount
                </Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="loanAmount"
                    type="text"
                    inputMode="decimal"
                    value={loanAmountStr}
                    onChange={handleInputChange(setLoanAmountStr, 50000000)} // 5 Crore max
                    placeholder="e.g., 2000000"
                    className="flex-grow"
                  />
                  <span className="text-sm text-slate-500 font-semibold min-w-[80px] text-right">
                    {formatCompactNumber(loanAmount)}
                  </span>
                </div>
                <Slider
                  value={[loanAmount]}
                  onValueChange={handleSliderChange(setLoanAmountStr)}
                  min={500000} // 5 Lakh min
                  max={10000000} // 1 Crore max for slider
                  step={100000}
                  className="[&>span]:bg-teal-500"
                  aria-label="Loan Amount Slider"
                />
                <div className="flex justify-between text-xs text-slate-500">
                  <span>₹5L</span>
                  <span>₹1Cr</span>
                </div>
              </div>

              {/* Annual Interest Rate */}
              <div className="space-y-3">
                <Label htmlFor="annualRate" className="text-slate-700 font-medium flex items-center gap-2">
                  <Percent className="h-4 w-4 text-teal-500" /> Interest Rate (% p.a.)
                </Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="annualRate"
                    type="text"
                    inputMode="decimal"
                    value={annualRateStr}
                    onChange={handleInputChange(setAnnualRateStr, 30)}
                    placeholder="e.g., 14"
                    className="flex-grow"
                  />
                  <span className="text-sm text-slate-500 font-semibold min-w-[40px] text-right">
                    {annualRate}%
                  </span>
                </div>
                <Slider
                  value={[annualRate]}
                  onValueChange={handleSliderChange(setAnnualRateStr)}
                  min={10} // Min rate 10%
                  max={24} // Max rate 24%
                  step={0.1}
                  className="[&>span]:bg-teal-500"
                  aria-label="Annual Rate Slider"
                />
                <div className="flex justify-between text-xs text-slate-500">
                  <span>10%</span>
                  <span>24%</span>
                </div>
              </div>

              {/* Loan Tenure (Years) */}
              <div className="space-y-3">
                <Label htmlFor="years" className="text-slate-700 font-medium flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-teal-500" /> Loan Tenure
                </Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="years"
                    type="text"
                    inputMode="numeric"
                    value={yearsStr}
                    onChange={handleInputChange(setYearsStr, 15)} // Max 15 years
                    placeholder="e.g., 5"
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
                  max={15}
                  step={1}
                  className="[&>span]:bg-teal-500"
                  aria-label="Loan Tenure Slider"
                />
                <div className="flex justify-between text-xs text-slate-500">
                  <span>1 Yr</span>
                  <span>15 Yrs</span>
                </div>
              </div>

              {/* Processing Fee */}
              <div className="space-y-3">
                <Label htmlFor="processingFee" className="text-slate-700 font-medium flex items-center gap-2">
                  <Percent className="h-4 w-4 text-teal-500" /> Processing Fee (%)
                </Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="processingFee"
                    type="text"
                    inputMode="decimal"
                    value={processingFeeStr}
                    onChange={handleInputChange(setProcessingFeeStr, 5)}
                    placeholder="e.g., 2"
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
                  max={5}
                  step={0.1}
                  className="[&>span]:bg-teal-500"
                  aria-label="Processing Fee Slider"
                />
                <div className="flex justify-between text-xs text-slate-500">
                  <span>0%</span>
                  <span>5%</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-teal-50/50 p-6 border-t border-teal-100">
              <Button 
                onClick={calculateLoan} 
                className="w-full bg-teal-600 hover:bg-teal-700"
              >
                <Calculator className="h-4 w-4 mr-2" /> Calculate EMI
              </Button>
            </CardFooter>
          </Card>

          {/* Results Card */}
          <Card className="lg:col-span-2 shadow-lg border-teal-100">
            <CardHeader className="bg-gradient-to-r from-teal-50 to-teal-100 border-b border-teal-100">
              <CardTitle className="text-xl font-bold text-slate-800">Loan Summary</CardTitle>
              <CardDescription>Your business loan repayment details</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Main Results */}
                <div className="space-y-4">
                  <div className="bg-teal-50 rounded-xl p-6 text-center">
                    <h3 className="text-sm font-medium text-slate-500 mb-1">Monthly EMI</h3>
                    <p className="text-3xl md:text-4xl font-bold text-teal-600">
                      {formatCurrency(result?.emi || 0)}
                    </p>
                    <p className="text-sm text-slate-500 mt-2">
                      for {months} months
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-amber-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-xs font-medium text-slate-500">Processing Fee</h3>
                          <p className="text-lg font-semibold text-amber-600">{formatCurrency(result?.processingFee || 0)}</p>
                        </div>
                        <div className="bg-amber-100 p-2 rounded-full">
                          <Percent className="h-5 w-5 text-amber-600" />
                        </div>
                      </div>
                    </div>
                    
                    <PaymentBreakdown
                      loanAmount={loanAmount}
                      emi={result?.emi || 0}
                      totalInterest={result?.totalInterest || 0}
                      totalPayment={result?.totalPayment || 0}
                      years={years}
                    />
                  </div>
                </div>
                
                {/* Chart */}
                <div className="flex flex-col justify-center items-center">
                  <h3 className="text-lg font-semibold text-slate-800 mb-4">Payment Distribution</h3>
                  <DonutChart 
                    principal={loanAmount} 
                    interest={result?.totalInterest || 0} 
                  />
                  <div className="flex justify-center gap-6 mt-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-teal-600"></div>
                      <span className="text-xs text-slate-600">Principal ({formatCurrency(loanAmount)})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                      <span className="text-xs text-slate-600">Interest ({formatCurrency(result?.totalInterest || 0)})</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-teal-50/50 p-6 border-t border-teal-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Info className="h-4 w-4 text-teal-500" />
                <p>Results are indicative. Actual EMI may vary based on bank terms.</p>
              </div>
              <Button variant="outline" className="border-teal-200 text-teal-600 hover:bg-teal-50">
                <Building className="h-4 w-4 mr-2" /> Compare business loan offers
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        {/* Additional Info */}
        <Card className="mt-8 shadow-lg border-teal-100">
          <CardHeader className="bg-gradient-to-r from-teal-50 to-teal-100 border-b border-teal-100">
            <CardTitle className="text-xl font-bold text-slate-800">Business Loan Information</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">Types of Business Loans</h3>
                <ul className="list-disc list-inside text-slate-600 space-y-2">
                  <li>Term Loans - Fixed amount with scheduled repayments</li>
                  <li>Working Capital Loans - For day-to-day operations</li>
                  <li>Equipment Financing - Specifically for purchasing equipment</li>
                  <li>Invoice Financing - Advances against unpaid invoices</li>
                  <li>Merchant Cash Advances - Based on future credit card sales</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">Documents Required</h3>
                <ul className="list-disc list-inside text-slate-600 space-y-2">
                  <li>Business registration documents</li>
                  <li>GST returns for the last 1-2 years</li>
                  <li>Income tax returns for the last 2-3 years</li>
                  <li>Bank statements for the last 6 months</li>
                  <li>KYC documents of directors/partners/proprietor</li>
                  <li>Business plan (for startups or new ventures)</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BusinessLoanEMICalculator; 