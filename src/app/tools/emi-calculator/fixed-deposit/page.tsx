'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Landmark, IndianRupee, Percent, CalendarDays, Calculator, TrendingUp, Info } from 'lucide-react';
import { Button } from "@/components/ui/button";

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

// Interest payout options
const interestPayoutOptions = [
  { value: 'simple', label: 'Simple Interest' },
  { value: 'quarterly', label: 'Quarterly Compound' },
  { value: 'monthly', label: 'Monthly Compound' }
];

// Tax bracket options
const taxBracketOptions = [
  { value: 0, label: 'No Tax' },
  { value: 5, label: '5%' },
  { value: 10, label: '10%' },
  { value: 20, label: '20%' },
  { value: 30, label: '30%' }
];

const FixedDepositCalculator = () => {
  const [principalStr, setPrincipalStr] = useState<string>("100000"); // 1 Lakh
  const [rateStr, setRateStr] = useState<string>("6.5");
  const [yearsStr, setYearsStr] = useState<string>("5");
  const [monthsStr, setMonthsStr] = useState<string>("0");
  const [interestPayout, setInterestPayout] = useState<string>("quarterly"); // Default: Quarterly Compound
  const [taxBracket, setTaxBracket] = useState<number>(0); // Default: No Tax
  const [seniorCitizen, setSeniorCitizen] = useState<boolean>(false);
  
  const [result, setResult] = useState<{
    maturityAmount: number;
    totalInterest: number;
    taxOnInterest: number;
    effectiveYield: number;
    yearlyBreakdown: { year: number; interest: number; balance: number }[];
  } | null>(null);

  // Derived numeric values
  const principal = useMemo(() => parseFloat(principalStr) || 0, [principalStr]);
  const rate = useMemo(() => parseFloat(rateStr) || 0, [rateStr]);
  const years = useMemo(() => parseInt(yearsStr) || 0, [yearsStr]);
  const months = useMemo(() => parseInt(monthsStr) || 0, [monthsStr]);
  const totalMonths = useMemo(() => (years * 12) + months, [years, months]);
  
  // Adjust rate for senior citizens (typically +0.5%)
  const adjustedRate = useMemo(() => seniorCitizen ? rate + 0.5 : rate, [rate, seniorCitizen]);

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

  const calculateFixedDeposit = () => {
    const p = principal;
    const r = adjustedRate / 100;
    const t = totalMonths / 12; // Time in years
    
    let maturityAmount = 0;
    let yearlyBreakdown = [];
    
    // Calculate maturity amount based on interest payout option
    if (interestPayout === 'simple') {
      // Simple Interest: A = P(1 + rt)
      maturityAmount = p * (1 + (r * t));
      
      // Calculate yearly breakdown
      let currentBalance = p;
      for (let year = 1; year <= Math.ceil(t); year++) {
        const yearFraction = year > t ? (t - Math.floor(t)) : 1;
        const yearlyInterest = currentBalance * r * yearFraction;
        currentBalance += yearlyInterest;
        
        yearlyBreakdown.push({
          year,
          interest: yearlyInterest,
          balance: currentBalance
        });
      }
    } 
    else if (interestPayout === 'quarterly') {
      // Quarterly Compound: A = P(1 + r/4)^(4t)
      maturityAmount = p * Math.pow(1 + (r / 4), 4 * t);
      
      // Calculate yearly breakdown
      let currentBalance = p;
      for (let year = 1; year <= Math.ceil(t); year++) {
        const prevBalance = currentBalance;
        const quarters = year > t ? (t - Math.floor(t)) * 4 : 4;
        
        currentBalance = prevBalance * Math.pow(1 + (r / 4), quarters);
        
        yearlyBreakdown.push({
          year,
          interest: currentBalance - prevBalance,
          balance: currentBalance
        });
      }
    } 
    else if (interestPayout === 'monthly') {
      // Monthly Compound: A = P(1 + r/12)^(12t)
      maturityAmount = p * Math.pow(1 + (r / 12), 12 * t);
      
      // Calculate yearly breakdown
      let currentBalance = p;
      for (let year = 1; year <= Math.ceil(t); year++) {
        const prevBalance = currentBalance;
        const months = year > t ? (t - Math.floor(t)) * 12 : 12;
        
        currentBalance = prevBalance * Math.pow(1 + (r / 12), months);
        
        yearlyBreakdown.push({
          year,
          interest: currentBalance - prevBalance,
          balance: currentBalance
        });
      }
    }
    
    const totalInterest = maturityAmount - p;
    const taxOnInterest = (totalInterest * taxBracket) / 100;
    
    // Calculate effective annual yield
    const effectiveYield = (Math.pow(maturityAmount / p, 1 / t) - 1) * 100;
    
    setResult({
      maturityAmount,
      totalInterest,
      taxOnInterest,
      effectiveYield,
      yearlyBreakdown
    });
  };

  // Calculate on initial render and when inputs change
  useEffect(() => {
    calculateFixedDeposit();
  }, [principal, adjustedRate, totalMonths, interestPayout, taxBracket]);

  return (
    <div className="bg-gradient-to-br from-indigo-50 via-white to-indigo-50 min-h-screen py-16 md:py-24 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <div className="bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <Landmark className="h-8 w-8 text-indigo-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">Fixed Deposit Calculator</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Calculate maturity amount and interest earned on your fixed deposit investments.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Card */}
          <Card className="lg:col-span-1 shadow-lg border-indigo-100">
            <CardHeader className="bg-gradient-to-r from-indigo-50 to-indigo-100 border-b border-indigo-100">
              <CardTitle className="text-xl font-bold text-slate-800">FD Details</CardTitle>
              <CardDescription>Adjust the values to calculate your returns</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-8">
              {/* Principal Amount */}
              <div className="space-y-3">
                <Label htmlFor="principal" className="text-slate-700 font-medium flex items-center gap-2">
                  <IndianRupee className="h-4 w-4 text-indigo-500" /> Principal Amount
                </Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="principal"
                    type="text"
                    inputMode="decimal"
                    value={principalStr}
                    onChange={handleInputChange(setPrincipalStr, 10000000)}
                    placeholder="e.g., 100000"
                    className="flex-grow"
                  />
                  <span className="text-sm text-slate-500 font-semibold min-w-[80px] text-right">
                    {formatCompactNumber(principal)}
                  </span>
                </div>
                <Slider
                  value={[principal]}
                  onValueChange={handleSliderChange(setPrincipalStr)}
                  min={1000}
                  max={2000000}
                  step={1000}
                  className="[&>span]:bg-indigo-500"
                />
              </div>

              {/* Interest Rate */}
              <div className="space-y-3">
                <Label htmlFor="rate" className="text-slate-700 font-medium flex items-center gap-2">
                  <Percent className="h-4 w-4 text-indigo-500" /> Interest Rate (% p.a.)
                </Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="rate"
                    type="text"
                    inputMode="decimal"
                    value={rateStr}
                    onChange={handleInputChange(setRateStr, 15)}
                    placeholder="e.g., 6.5"
                    className="flex-grow"
                  />
                  <span className="text-sm text-slate-500 font-semibold min-w-[40px] text-right">
                    {adjustedRate}%
                  </span>
                </div>
                <Slider
                  value={[rate]}
                  onValueChange={handleSliderChange(setRateStr)}
                  min={3}
                  max={12}
                  step={0.1}
                  className="[&>span]:bg-indigo-500"
                />
              </div>

              {/* Time Period */}
              <div className="space-y-3">
                <Label className="text-slate-700 font-medium flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-indigo-500" /> Time Period
                </Label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="years" className="text-xs text-slate-500 mb-1 block">Years</Label>
                    <div className="flex items-center">
                      <Input
                        id="years"
                        type="text"
                        inputMode="numeric"
                        value={yearsStr}
                        onChange={handleInputChange(setYearsStr, 30)}
                        placeholder="Years"
                        className="flex-grow"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="months" className="text-xs text-slate-500 mb-1 block">Months</Label>
                    <div className="flex items-center">
                      <Input
                        id="months"
                        type="text"
                        inputMode="numeric"
                        value={monthsStr}
                        onChange={handleInputChange(setMonthsStr, 11)}
                        placeholder="Months"
                        className="flex-grow"
                      />
                    </div>
                  </div>
                </div>
                <div className="text-sm text-slate-500 text-right">
                  Total: {Math.floor(totalMonths / 12)} years, {totalMonths % 12} months
                </div>
              </div>

              {/* Interest Payout */}
              <div className="space-y-3">
                <Label className="text-slate-700 font-medium">Interest Payout</Label>
                <div className="grid grid-cols-1 gap-2">
                  {interestPayoutOptions.map((option) => (
                    <Button
                      key={option.value}
                      type="button"
                      variant={interestPayout === option.value ? "default" : "outline"}
                      onClick={() => setInterestPayout(option.value)}
                      className={interestPayout === option.value ? 
                        "bg-indigo-500 hover:bg-indigo-600" : 
                        "border-indigo-200 text-indigo-700 hover:bg-indigo-50"
                      }
                      size="sm"
                    >
                      {option.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Tax Bracket */}
              <div className="space-y-3">
                <Label className="text-slate-700 font-medium flex items-center gap-2">
                  <Percent className="h-4 w-4 text-indigo-500" /> Tax Bracket
                </Label>
                <div className="grid grid-cols-3 gap-2">
                  {taxBracketOptions.map((option) => (
                    <Button
                      key={option.value}
                      type="button"
                      variant={taxBracket === option.value ? "default" : "outline"}
                      onClick={() => setTaxBracket(option.value)}
                      className={taxBracket === option.value ? 
                        "bg-indigo-500 hover:bg-indigo-600" : 
                        "border-indigo-200 text-indigo-700 hover:bg-indigo-50"
                      }
                      size="sm"
                    >
                      {option.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Senior Citizen Option */}
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="seniorCitizen"
                  checked={seniorCitizen}
                  onChange={() => setSeniorCitizen(!seniorCitizen)}
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                />
                <Label htmlFor="seniorCitizen" className="text-slate-700">
                  Senior Citizen (+0.5% rate)
                </Label>
              </div>

              <Button 
                onClick={calculateFixedDeposit} 
                className="w-full bg-indigo-500 hover:bg-indigo-600"
              >
                Calculate
              </Button>
            </CardContent>
          </Card>

          {/* Results Section */}
          <div className="lg:col-span-2 space-y-8">
            {result && (
              <>
                {/* Summary Card */}
                <Card className="shadow-lg border-indigo-100">
                  <CardHeader className="bg-gradient-to-r from-indigo-50 to-indigo-100 border-b border-indigo-100">
                    <CardTitle className="text-xl font-bold text-slate-800">FD Summary</CardTitle>
                    <CardDescription>Results based on your inputs</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div>
                          <p className="text-sm text-slate-500 mb-1">Maturity Amount</p>
                          <p className="text-3xl font-bold text-indigo-600">{formatCurrency(result.maturityAmount)}</p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-slate-500 mb-1">Principal Amount</p>
                            <p className="text-lg font-semibold text-slate-700">{formatCurrency(principal)}</p>
                          </div>
                          <div>
                            <p className="text-sm text-slate-500 mb-1">Total Interest</p>
                            <p className="text-lg font-semibold text-indigo-600">{formatCurrency(result.totalInterest)}</p>
                          </div>
                          <div>
                            <p className="text-sm text-slate-500 mb-1">Tax on Interest</p>
                            <p className="text-lg font-semibold text-red-500">{formatCurrency(result.taxOnInterest)}</p>
                          </div>
                          <div>
                            <p className="text-sm text-slate-500 mb-1">Effective Yield</p>
                            <p className="text-lg font-semibold text-green-600">{result.effectiveYield.toFixed(2)}% p.a.</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-center">
                        <div className="bg-white p-4 rounded-lg shadow-sm border border-indigo-100 w-full">
                          <div className="flex justify-between mb-2">
                            <span className="text-sm font-medium text-slate-700">Principal</span>
                            <span className="text-sm font-medium text-slate-700">{formatCurrency(principal)}</span>
                          </div>
                          <div className="w-full bg-slate-100 rounded-full h-3 mb-4">
                            <div 
                              className="bg-indigo-500 h-3 rounded-full" 
                              style={{ width: `${(principal / result.maturityAmount) * 100}%` }}
                            ></div>
                          </div>
                          
                          <div className="flex justify-between mb-2">
                            <span className="text-sm font-medium text-slate-700">Interest Earned</span>
                            <span className="text-sm font-medium text-indigo-600">{formatCurrency(result.totalInterest)}</span>
                          </div>
                          <div className="w-full bg-slate-100 rounded-full h-3 mb-4">
                            <div 
                              className="bg-indigo-300 h-3 rounded-full" 
                              style={{ width: `${(result.totalInterest / result.maturityAmount) * 100}%` }}
                            ></div>
                          </div>
                          
                          <div className="flex justify-between mb-2">
                            <span className="text-sm font-medium text-slate-700">Tax Deduction</span>
                            <span className="text-sm font-medium text-red-500">{formatCurrency(result.taxOnInterest)}</span>
                          </div>
                          <div className="w-full bg-slate-100 rounded-full h-3">
                            <div 
                              className="bg-red-400 h-3 rounded-full" 
                              style={{ width: `${(result.taxOnInterest / result.maturityAmount) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Yearly Breakdown */}
                <Card className="shadow-lg border-indigo-100">
                  <CardHeader className="bg-gradient-to-r from-indigo-50 to-indigo-100 border-b border-indigo-100 py-4">
                    <CardTitle className="text-lg font-bold text-slate-800">Yearly Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-indigo-200">
                        <thead>
                          <tr>
                            <th className="px-4 py-3 bg-indigo-50 text-left text-xs font-medium text-indigo-800 uppercase tracking-wider">Year</th>
                            <th className="px-4 py-3 bg-indigo-50 text-right text-xs font-medium text-indigo-800 uppercase tracking-wider">Interest Earned</th>
                            <th className="px-4 py-3 bg-indigo-50 text-right text-xs font-medium text-indigo-800 uppercase tracking-wider">Balance</th>
                            <th className="px-4 py-3 bg-indigo-50 text-right text-xs font-medium text-indigo-800 uppercase tracking-wider">Growth</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-indigo-100">
                          {result.yearlyBreakdown.map((item, index) => {
                            const prevBalance = index === 0 ? principal : result.yearlyBreakdown[index - 1].balance;
                            const growth = ((item.balance - prevBalance) / prevBalance) * 100;
                            
                            return (
                              <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-indigo-50/30"}>
                                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-slate-700">{item.year}</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-indigo-600">{formatCurrency(item.interest)}</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-slate-700">{formatCurrency(item.balance)}</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-green-600">{growth.toFixed(2)}%</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>

                {/* Additional Info */}
                <Card className="shadow-lg border-indigo-100">
                  <CardHeader className="bg-gradient-to-r from-indigo-50 to-indigo-100 border-b border-indigo-100 py-4">
                    <CardTitle className="text-lg font-bold text-slate-800">Important Information</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4 text-sm text-slate-600">
                      <div className="flex gap-2">
                        <Info className="h-5 w-5 text-indigo-500 flex-shrink-0 mt-0.5" />
                        <p>TDS (Tax Deducted at Source) is applicable on interest earned if it exceeds ₹40,000 per year (₹50,000 for senior citizens).</p>
                      </div>
                      <div className="flex gap-2">
                        <Info className="h-5 w-5 text-indigo-500 flex-shrink-0 mt-0.5" />
                        <p>Premature withdrawal may result in a penalty, typically 0.5% to 1% lower interest rate.</p>
                      </div>
                      <div className="flex gap-2">
                        <Info className="h-5 w-5 text-indigo-500 flex-shrink-0 mt-0.5" />
                        <p>Interest rates are subject to change based on RBI policies and individual bank decisions.</p>
                      </div>
                      <div className="flex gap-2">
                        <Info className="h-5 w-5 text-indigo-500 flex-shrink-0 mt-0.5" />
                        <p>Senior citizens typically get an additional 0.25% to 0.5% interest rate on fixed deposits.</p>
                      </div>
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

export default FixedDepositCalculator; 