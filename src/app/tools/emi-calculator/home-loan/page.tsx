'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Home, IndianRupee, Percent, CalendarDays, Calculator, PiggyBank, Info } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Tooltip } from "@/components/ui/tooltip";

// Simple pie chart component
const PieChart = ({ principal, interest }: { principal: number; interest: number }) => {
  const total = principal + interest;
  const principalPercentage = (principal / total) * 100;
  const interestPercentage = (interest / total) * 100;

  return (
    <div className="relative h-48 w-48 mx-auto">
      <svg viewBox="0 0 100 100" className="h-full w-full">
        {/* Interest arc */}
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="transparent"
          stroke="#10b981"
          strokeWidth="20"
          strokeDasharray={`${interestPercentage} ${100 - interestPercentage}`}
          strokeDashoffset="25"
          className="transition-all duration-700 ease-in-out"
        />
        {/* Principal arc */}
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="transparent"
          stroke="#0ea5e9"
          strokeWidth="20"
          strokeDasharray={`${principalPercentage} ${100 - principalPercentage}`}
          strokeDashoffset={`${-interestPercentage + 25}`}
          className="transition-all duration-700 ease-in-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-xs text-slate-500">Total Payment</span>
        <span className="text-lg font-bold text-slate-800">₹{formatCompactNumber(total)}</span>
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

const HomeLoanEMICalculator = () => {
  const [loanAmountStr, setLoanAmountStr] = useState<string>("5000000"); // 50 Lakhs
  const [annualRateStr, setAnnualRateStr] = useState<string>("8.5");
  const [yearsStr, setYearsStr] = useState<string>("20");
  const [result, setResult] = useState<{
    emi: number
    totalInterest: number
    totalPayment: number
    amortization: { principal: number, interest: number, balance: number }[]
  } | null>(null);

  // Derived numeric values
  const loanAmount = useMemo(() => parseFloat(loanAmountStr) || 0, [loanAmountStr]);
  const annualRate = useMemo(() => parseFloat(annualRateStr) || 0, [annualRateStr]);
  const years = useMemo(() => parseInt(yearsStr) || 0, [yearsStr]);

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

  const calculateAmortization = () => {
    const principal = loanAmount;
    const ratePerMonth = annualRate / (12 * 100);
    const numberOfMonths = years * 12;
    
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

    setResult({
      emi: Math.round(emi),
      totalInterest: Math.round(totalInterest),
      totalPayment: Math.round(totalPayment),
      amortization
    });
  };

  // Calculate on initial render and when inputs change
  useEffect(() => {
    calculateAmortization();
  }, [loanAmount, annualRate, years]);

  // Year-wise summary for the breakdown table
  const yearWiseSummary = useMemo(() => {
    if (!result?.amortization) return [];
    
    const summary = [];
    const monthsPerYear = 12;
    
    for (let year = 0; year < years; year++) {
      const yearData = result.amortization.slice(year * monthsPerYear, (year + 1) * monthsPerYear);
      const principalPaid = yearData.reduce((sum, month) => sum + month.principal, 0);
      const interestPaid = yearData.reduce((sum, month) => sum + month.interest, 0);
      
      summary.push({
        year: year + 1,
        principalPaid,
        interestPaid,
        totalPaid: principalPaid + interestPaid,
        remainingBalance: yearData[yearData.length - 1].balance
      });
    }
    
    return summary;
  }, [result, years]);

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-blue-50 min-h-screen py-16 md:py-24 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <Home className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">Home Loan EMI Calculator</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Plan your home loan repayments with our easy-to-use EMI calculator. Adjust loan amount, interest rate, and tenure to find the perfect balance.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Card */}
          <Card className="lg:col-span-1 shadow-lg border-blue-100">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 border-b border-blue-100">
              <CardTitle className="text-xl font-bold text-slate-800">Loan Parameters</CardTitle>
              <CardDescription>Adjust the values to calculate your EMI</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-8">
              {/* Loan Amount */}
              <div className="space-y-3">
                <Label htmlFor="loanAmount" className="text-slate-700 font-medium flex items-center gap-2">
                  <IndianRupee className="h-4 w-4 text-blue-500" /> Loan Amount
                </Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="loanAmount"
                    type="text"
                    inputMode="decimal"
                    value={loanAmountStr}
                    onChange={handleInputChange(setLoanAmountStr, 100000000)} // 10 Crore max
                    placeholder="e.g., 5000000"
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
                  max={20000000} // 2 Crore max for slider
                  step={100000}
                  className="[&>span]:bg-blue-500"
                  aria-label="Loan Amount Slider"
                />
                <div className="flex justify-between text-xs text-slate-500">
                  <span>₹5L</span>
                  <span>₹2Cr</span>
                </div>
              </div>

              {/* Annual Interest Rate */}
              <div className="space-y-3">
                <Label htmlFor="annualRate" className="text-slate-700 font-medium flex items-center gap-2">
                  <Percent className="h-4 w-4 text-blue-500" /> Interest Rate (% p.a.)
                </Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="annualRate"
                    type="text"
                    inputMode="decimal"
                    value={annualRateStr}
                    onChange={handleInputChange(setAnnualRateStr, 20)}
                    placeholder="e.g., 8.5"
                    className="flex-grow"
                  />
                  <span className="text-sm text-slate-500 font-semibold min-w-[40px] text-right">
                    {annualRate}%
                  </span>
                </div>
                <Slider
                  value={[annualRate]}
                  onValueChange={handleSliderChange(setAnnualRateStr)}
                  min={5} // Min rate 5%
                  max={15} // Max rate 15%
                  step={0.1}
                  className="[&>span]:bg-blue-500"
                  aria-label="Annual Rate Slider"
                />
                <div className="flex justify-between text-xs text-slate-500">
                  <span>5%</span>
                  <span>15%</span>
                </div>
              </div>

              {/* Loan Tenure (Years) */}
              <div className="space-y-3">
                <Label htmlFor="years" className="text-slate-700 font-medium flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-blue-500" /> Loan Tenure (Years)
                </Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="years"
                    type="text"
                    inputMode="numeric"
                    value={yearsStr}
                    onChange={handleInputChange(setYearsStr, 30)} // Max 30 years
                    placeholder="e.g., 20"
                    className="flex-grow"
                  />
                  <span className="text-sm text-slate-500 font-semibold min-w-[60px] text-right">
                    {years} Years
                  </span>
                </div>
                <Slider
                  value={[years]}
                  onValueChange={handleSliderChange(setYearsStr)}
                  min={5}
                  max={30}
                  step={1}
                  className="[&>span]:bg-blue-500"
                  aria-label="Loan Tenure Slider"
                />
                <div className="flex justify-between text-xs text-slate-500">
                  <span>5 Yrs</span>
                  <span>30 Yrs</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-blue-50/50 p-6 border-t border-blue-100">
              <Button 
                onClick={calculateAmortization} 
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                <Calculator className="h-4 w-4 mr-2" /> Recalculate
              </Button>
            </CardFooter>
          </Card>

          {/* Results Card */}
          <Card className="lg:col-span-2 shadow-lg border-blue-100">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 border-b border-blue-100">
              <CardTitle className="text-xl font-bold text-slate-800">Loan Summary</CardTitle>
              <CardDescription>Your home loan repayment details</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Main Results */}
                <div className="space-y-6">
                  <div className="bg-blue-50 rounded-xl p-6 text-center">
                    <h3 className="text-sm font-medium text-slate-500 mb-1">Monthly EMI</h3>
                    <p className="text-3xl md:text-4xl font-bold text-blue-600">
                      {formatCurrency(result?.emi || 0)}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-50 rounded-lg p-4 text-center">
                      <h3 className="text-xs font-medium text-slate-500 mb-1">Principal Amount</h3>
                      <p className="text-lg font-semibold text-slate-700">{formatCurrency(loanAmount)}</p>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-4 text-center">
                      <h3 className="text-xs font-medium text-slate-500 mb-1">Total Interest</h3>
                      <p className="text-lg font-semibold text-slate-700">{formatCurrency(result?.totalInterest || 0)}</p>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-4 text-center">
                      <h3 className="text-xs font-medium text-slate-500 mb-1">Total Payment</h3>
                      <p className="text-lg font-semibold text-slate-700">{formatCurrency(result?.totalPayment || 0)}</p>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-4 text-center">
                      <h3 className="text-xs font-medium text-slate-500 mb-1">Interest to Principal</h3>
                      <p className="text-lg font-semibold text-slate-700">
                        {result ? Math.round((result.totalInterest / loanAmount) * 100) : 0}%
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Chart */}
                <div className="flex flex-col items-center justify-center">
                  <PieChart 
                    principal={loanAmount} 
                    interest={result?.totalInterest || 0} 
                  />
                  <div className="flex justify-center gap-6 mt-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      <span className="text-xs text-slate-600">Principal</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                      <span className="text-xs text-slate-600">Interest</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Year-wise Breakdown */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Year-wise Breakdown</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                      <tr>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Year</th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Principal Paid</th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Interest Paid</th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Total Payment</th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Balance</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200">
                      {yearWiseSummary.slice(0, 5).map((year) => (
                        <tr key={year.year} className="hover:bg-slate-50">
                          <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-slate-700">{year.year}</td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-slate-600">{formatCurrency(year.principalPaid)}</td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-slate-600">{formatCurrency(year.interestPaid)}</td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-slate-600">{formatCurrency(year.totalPaid)}</td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-slate-600">{formatCurrency(year.remainingBalance)}</td>
                        </tr>
                      ))}
                      {years > 5 && (
                        <tr>
                          <td colSpan={5} className="px-4 py-2 text-center text-sm text-slate-500">
                            <Button variant="link" className="text-blue-600">
                              Show all {years} years
                            </Button>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-blue-50/50 p-6 border-t border-blue-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Info className="h-4 w-4 text-blue-500" />
                <p>Results are indicative and may vary based on actual loan terms.</p>
              </div>
              <Button variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50">
                <PiggyBank className="h-4 w-4 mr-2" /> Compare with other banks
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        {/* Additional Info */}
        <Card className="mt-8 shadow-lg border-blue-100">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 border-b border-blue-100">
            <CardTitle className="text-xl font-bold text-slate-800">Home Loan EMI Explained</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">What is Home Loan EMI?</h3>
                <p className="text-slate-600 mb-4">
                  EMI (Equated Monthly Installment) is the fixed amount you pay to the bank each month towards your home loan. 
                  It consists of both principal repayment and interest payment components.
                </p>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">How is EMI calculated?</h3>
                <p className="text-slate-600">
                  EMI is calculated using the formula: <br />
                  <span className="font-mono bg-slate-100 px-2 py-1 rounded text-sm">
                    EMI = P × r × (1 + r)ⁿ ÷ [(1 + r)ⁿ - 1]
                  </span>
                  <br />
                  Where P is principal, r is monthly interest rate, and n is number of installments.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">Tips to reduce your EMI</h3>
                <ul className="list-disc list-inside text-slate-600 space-y-2">
                  <li>Opt for a longer loan tenure to reduce monthly payments</li>
                  <li>Make a larger down payment to reduce the principal amount</li>
                  <li>Look for lower interest rates or negotiate with your bank</li>
                  <li>Consider prepaying part of your loan when you have surplus funds</li>
                  <li>Maintain a good credit score to qualify for better interest rates</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HomeLoanEMICalculator; 