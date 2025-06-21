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
                    onChange={handleInputChange(setLoanAmountStr, 100000000)}
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
                  min={500000}
                  max={50000000}
                  step={100000}
                  className="[&>span]:bg-teal-500"
                />
              </div>

              {/* Annual Interest Rate */}
              <div className="space-y-3">
                <Label htmlFor="annualRate" className="text-slate-700 font-medium flex items-center gap-2">
                  <Percent className="h-4 w-4 text-teal-500" /> Annual Interest Rate (%)
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
                  min={8}
                  max={24}
                  step={0.1}
                  className="[&>span]:bg-teal-500"
                />
              </div>

              {/* Loan Tenure */}
              <div className="space-y-3">
                <Label htmlFor="years" className="text-slate-700 font-medium flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-teal-500" /> Loan Tenure (Years)
                </Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="years"
                    type="text"
                    inputMode="numeric"
                    value={yearsStr}
                    onChange={handleInputChange(setYearsStr, 15)}
                    placeholder="e.g., 5"
                    className="flex-grow"
                  />
                  <span className="text-sm text-slate-500 font-semibold min-w-[60px] text-right">
                    {years} Yr
                  </span>
                </div>
                <Slider
                  value={[years]}
                  onValueChange={handleSliderChange(setYearsStr)}
                  min={1}
                  max={15}
                  step={1}
                  className="[&>span]:bg-teal-500"
                />
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
                />
              </div>

              <Button 
                onClick={calculateLoan} 
                className="w-full bg-teal-500 hover:bg-teal-600"
              >
                Calculate
              </Button>
            </CardContent>
          </Card>

          {/* Results Section */}
          <div className="lg:col-span-2 space-y-8">
            {result && (
              <>
                {/* Donut Chart */}
                <Card className="shadow-lg border-teal-100">
                  <CardHeader className="bg-gradient-to-r from-teal-50 to-teal-100 border-b border-teal-100">
                    <CardTitle className="text-xl font-bold text-slate-800">Payment Breakdown</CardTitle>
                    <CardDescription>Visual representation of your loan</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <DonutChart 
                          principal={loanAmount} 
                          interest={result.totalInterest} 
                        />
                        <div className="flex justify-center space-x-8 mt-4">
                          <div className="flex items-center">
                            <div className="w-4 h-4 bg-teal-600 rounded-full mr-2"></div>
                            <span className="text-sm text-slate-700">Principal</span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-4 h-4 bg-amber-500 rounded-full mr-2"></div>
                            <span className="text-sm text-slate-700">Interest</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col justify-center">
                        <div className="space-y-6">
                          <div>
                            <p className="text-sm text-slate-500">Monthly EMI</p>
                            <p className="text-3xl font-bold text-teal-600">{formatCurrency(result.emi)}</p>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-slate-500">Processing Fee</p>
                              <p className="text-lg font-semibold text-slate-700">{formatCurrency(result.processingFee)}</p>
                            </div>
                            <div>
                              <p className="text-sm text-slate-500">Total Interest</p>
                              <p className="text-lg font-semibold text-amber-600">{formatCurrency(result.totalInterest)}</p>
                            </div>
                          </div>
                          <div>
                            <p className="text-sm text-slate-500">Total Payment</p>
                            <p className="text-xl font-semibold text-slate-700">{formatCurrency(result.totalPayment)}</p>
                            <p className="text-xs text-slate-500 mt-1">(Principal + Interest)</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Detailed Breakdown */}
                <Card className="shadow-lg border-teal-100">
                  <CardHeader className="bg-gradient-to-r from-teal-50 to-teal-100 border-b border-teal-100 py-4">
                    <CardTitle className="text-lg font-bold text-slate-800">Payment Details</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <PaymentBreakdown 
                      loanAmount={loanAmount}
                      emi={result.emi}
                      totalInterest={result.totalInterest}
                      totalPayment={result.totalPayment}
                      years={years}
                    />
                  </CardContent>
                </Card>

                {/* First Year Payment Schedule */}
                <Card className="shadow-lg border-teal-100">
                  <CardHeader className="bg-gradient-to-r from-teal-50 to-teal-100 border-b border-teal-100 py-4">
                    <CardTitle className="text-lg font-bold text-slate-800">First Year Payment Schedule</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-teal-200">
                        <thead className="bg-teal-50">
                          <tr>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-teal-800 uppercase tracking-wider">Month</th>
                            <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-teal-800 uppercase tracking-wider">EMI</th>
                            <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-teal-800 uppercase tracking-wider">Principal</th>
                            <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-teal-800 uppercase tracking-wider">Interest</th>
                            <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-teal-800 uppercase tracking-wider">Balance</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-teal-100">
                          {result.amortization.slice(0, 12).map((month, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-teal-50/30'}>
                              <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-slate-700">{index + 1}</td>
                              <td className="px-4 py-2 whitespace-nowrap text-sm text-right text-slate-700">{formatCurrency(result.emi)}</td>
                              <td className="px-4 py-2 whitespace-nowrap text-sm text-right text-slate-700">{formatCurrency(month.principal)}</td>
                              <td className="px-4 py-2 whitespace-nowrap text-sm text-right text-slate-700">{formatCurrency(month.interest)}</td>
                              <td className="px-4 py-2 whitespace-nowrap text-sm text-right text-slate-700">{formatCurrency(month.balance)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessLoanEMICalculator; 