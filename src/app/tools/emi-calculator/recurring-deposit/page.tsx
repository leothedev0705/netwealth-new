'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { PiggyBank, IndianRupee, Percent, CalendarDays, Calculator, TrendingUp, Info } from 'lucide-react';
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

// Interest calculation options
const interestCalculationOptions = [
  { value: 'quarterly', label: 'Quarterly Compounding' },
  { value: 'monthly', label: 'Monthly Compounding' }
];

// Tax bracket options
const taxBracketOptions = [
  { value: 0, label: 'No Tax' },
  { value: 5, label: '5%' },
  { value: 10, label: '10%' },
  { value: 20, label: '20%' },
  { value: 30, label: '30%' }
];

// Bar chart component for growth visualization
const GrowthChart = ({ 
  monthlyDeposit,
  totalDeposit,
  totalInterest
}: { 
  monthlyDeposit: number,
  totalDeposit: number,
  totalInterest: number
}) => {
  const maturityAmount = totalDeposit + totalInterest;
  
  return (
    <div className="space-y-4 w-full">
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-slate-600 font-medium">Total Deposits</span>
          <span className="font-medium text-slate-700">
            {formatCurrency(totalDeposit)} ({Math.round((totalDeposit / maturityAmount) * 100)}%)
          </span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-3">
          <div 
            className="bg-green-600 h-3 rounded-full" 
            style={{ width: `${(totalDeposit / maturityAmount) * 100}%` }}
          ></div>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-slate-600 font-medium">Interest Earned</span>
          <span className="font-medium text-slate-700">
            {formatCurrency(totalInterest)} ({Math.round((totalInterest / maturityAmount) * 100)}%)
          </span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-3">
          <div 
            className="bg-green-300 h-3 rounded-full" 
            style={{ width: `${(totalInterest / maturityAmount) * 100}%` }}
          ></div>
        </div>
      </div>
      <div className="pt-2 border-t border-slate-200">
        <div className="flex justify-between text-sm">
          <span className="font-medium text-slate-600">Maturity Amount</span>
          <span className="font-semibold text-green-600 font-serif">{formatCurrency(maturityAmount)}</span>
        </div>
      </div>
    </div>
  );
};

const RecurringDepositCalculator = () => {
  const [monthlyDepositStr, setMonthlyDepositStr] = useState<string>("5000");
  const [rateStr, setRateStr] = useState<string>("6");
  const [yearsStr, setYearsStr] = useState<string>("3");
  const [monthsStr, setMonthsStr] = useState<string>("0");
  const [interestCalculation, setInterestCalculation] = useState<string>("quarterly");
  const [taxBracket, setTaxBracket] = useState<number>(0);
  const [seniorCitizen, setSeniorCitizen] = useState<boolean>(false);
  
  const [result, setResult] = useState<{
    maturityAmount: number;
    totalDeposit: number;
    totalInterest: number;
    taxOnInterest: number;
    effectiveYield: number;
    monthlyBreakdown: { month: number; deposit: number; interest: number; balance: number }[];
  } | null>(null);

  // Derived numeric values
  const monthlyDeposit = useMemo(() => parseFloat(monthlyDepositStr) || 0, [monthlyDepositStr]);
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

  const calculateRecurringDeposit = () => {
    const P = monthlyDeposit;
    const r = adjustedRate / 100;
    const n = totalMonths;
    
    let monthlyBreakdown = [];
    let balance = 0;
    let totalInterest = 0;
    
    // Calculate maturity amount based on interest calculation method
    if (interestCalculation === 'quarterly') {
      // Quarterly compounding
      const quarterlyRate = r / 4;
      
      for (let month = 1; month <= n; month++) {
        const deposit = P;
        let interest = 0;
        
        balance += deposit;
        
        // Add quarterly interest
        if (month % 3 === 0) {
          interest = balance * quarterlyRate;
          balance += interest;
          totalInterest += interest;
        }
        
        monthlyBreakdown.push({
          month,
          deposit,
          interest,
          balance
        });
      }
    } else {
      // Monthly compounding
      const monthlyRate = r / 12;
      
      for (let month = 1; month <= n; month++) {
        const deposit = P;
        balance += deposit;
        
        // Add monthly interest
        const interest = balance * monthlyRate;
        balance += interest;
        totalInterest += interest;
        
        monthlyBreakdown.push({
          month,
          deposit,
          interest,
          balance
        });
      }
    }
    
    const maturityAmount = balance;
    const totalDeposit = P * n;
    const taxOnInterest = (totalInterest * taxBracket) / 100;
    
    // Calculate effective annual yield
    const effectiveYield = (Math.pow(maturityAmount / totalDeposit, 1 / (n / 12)) - 1) * 100;
    
    setResult({
      maturityAmount,
      totalDeposit,
      totalInterest,
      taxOnInterest,
      effectiveYield,
      monthlyBreakdown
    });
  };

  // Calculate on initial render and when inputs change
  useEffect(() => {
    calculateRecurringDeposit();
  }, [monthlyDeposit, adjustedRate, totalMonths, interestCalculation, taxBracket]);

  return (
    <div className="bg-gradient-to-br from-green-50 via-white to-green-50 min-h-screen py-16 md:py-24 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <PiggyBank className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2 font-serif">Recurring Deposit Calculator</h1>
          <p className="text-slate-600 max-w-2xl mx-auto font-light tracking-wide">
            Calculate returns on your monthly recurring deposit investments.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Card */}
          <Card className="lg:col-span-1 shadow-lg border-green-100">
            <CardHeader className="bg-gradient-to-r from-green-50 to-green-100 border-b border-green-100">
              <CardTitle className="text-xl font-bold text-slate-800 font-serif">RD Details</CardTitle>
              <CardDescription className="font-medium">Adjust the values to calculate your returns</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-8">
              {/* Monthly Deposit Amount */}
              <div className="space-y-3">
                <Label htmlFor="monthlyDeposit" className="text-slate-700 font-medium flex items-center gap-2">
                  <IndianRupee className="h-4 w-4 text-green-500" /> Monthly Deposit
                </Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="monthlyDeposit"
                    type="text"
                    inputMode="decimal"
                    value={monthlyDepositStr}
                    onChange={handleInputChange(setMonthlyDepositStr, 1000000)}
                    placeholder="e.g., 5000"
                    className="flex-grow"
                  />
                  <span className="text-sm text-slate-500 font-semibold min-w-[80px] text-right">
                    {formatCurrency(monthlyDeposit)}
                  </span>
                </div>
                <Slider
                  value={[monthlyDeposit]}
                  onValueChange={handleSliderChange(setMonthlyDepositStr)}
                  min={500}
                  max={100000}
                  step={500}
                  className="[&>span]:bg-green-500"
                />
              </div>

              {/* Interest Rate */}
              <div className="space-y-3">
                <Label htmlFor="rate" className="text-slate-700 font-medium flex items-center gap-2">
                  <Percent className="h-4 w-4 text-green-500" /> Interest Rate (% p.a.)
                </Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="rate"
                    type="text"
                    inputMode="decimal"
                    value={rateStr}
                    onChange={handleInputChange(setRateStr, 15)}
                    placeholder="e.g., 6"
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
                  max={10}
                  step={0.1}
                  className="[&>span]:bg-green-500"
                />
              </div>

              {/* Time Period */}
              <div className="space-y-3">
                <Label className="text-slate-700 font-medium flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-green-500" /> Time Period
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
                        onChange={handleInputChange(setYearsStr, 10)}
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
                  Total: {totalMonths} months
                </div>
              </div>

              {/* Interest Calculation */}
              <div className="space-y-3">
                <Label className="text-slate-700 font-medium">Interest Calculation</Label>
                <div className="grid grid-cols-1 gap-2">
                  {interestCalculationOptions.map((option) => (
                    <Button
                      key={option.value}
                      type="button"
                      variant={interestCalculation === option.value ? "default" : "outline"}
                      onClick={() => setInterestCalculation(option.value)}
                      className={interestCalculation === option.value ? 
                        "bg-green-600 hover:bg-green-700" : 
                        "border-green-200 text-green-700 hover:bg-green-50"
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
                <Label className="text-slate-700 font-medium flex items-center gap-2 font-serif">
                  <Percent className="h-4 w-4 text-green-500" /> Tax Bracket
                </Label>
                <div className="grid grid-cols-3 gap-2">
                  {taxBracketOptions.map((option) => (
                    <Button
                      key={option.value}
                      type="button"
                      variant={taxBracket === option.value ? "default" : "outline"}
                      onClick={() => setTaxBracket(option.value)}
                      className={taxBracket === option.value ? 
                        "bg-green-600 hover:bg-green-700" : 
                        "border-green-200 text-green-700 hover:bg-green-50"
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
                  className="rounded border-gray-300 text-green-600 focus:ring-green-500 h-4 w-4"
                />
                <Label htmlFor="seniorCitizen" className="text-slate-700">
                  Senior Citizen (+0.5% rate)
                </Label>
              </div>

              <Button 
                onClick={calculateRecurringDeposit} 
                className="w-full bg-green-600 hover:bg-green-700 font-medium tracking-wide"
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
                <Card className="shadow-lg border-green-100">
                  <CardHeader className="bg-gradient-to-r from-green-50 to-green-100 border-b border-green-100">
                    <CardTitle className="text-xl font-bold text-slate-800 font-serif">RD Summary</CardTitle>
                    <CardDescription className="font-medium">Results based on your inputs</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div>
                          <p className="text-sm text-slate-500 mb-1 font-medium">Maturity Amount</p>
                          <p className="text-3xl font-bold text-green-600 font-serif">{formatCurrency(result.maturityAmount)}</p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-slate-500 mb-1">Total Deposits</p>
                            <p className="text-lg font-semibold text-slate-700">{formatCurrency(result.totalDeposit)}</p>
                          </div>
                          <div>
                            <p className="text-sm text-slate-500 mb-1">Total Interest</p>
                            <p className="text-lg font-semibold text-green-600">{formatCurrency(result.totalInterest)}</p>
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
                        <div className="w-full">
                          <GrowthChart 
                            monthlyDeposit={monthlyDeposit}
                            totalDeposit={result.totalDeposit}
                            totalInterest={result.totalInterest}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Monthly Breakdown */}
                <Card className="shadow-lg border-green-100">
                  <CardHeader className="bg-gradient-to-r from-green-50 to-green-100 border-b border-green-100 py-4">
                    <CardTitle className="text-lg font-bold text-slate-800 font-serif">Quarterly Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-green-200">
                        <thead>
                          <tr>
                            <th className="px-4 py-3 bg-green-50 text-left text-xs font-medium text-green-800 uppercase tracking-wider font-sans">Quarter</th>
                            <th className="px-4 py-3 bg-green-50 text-right text-xs font-medium text-green-800 uppercase tracking-wider font-sans">Deposits</th>
                            <th className="px-4 py-3 bg-green-50 text-right text-xs font-medium text-green-800 uppercase tracking-wider font-sans">Interest</th>
                            <th className="px-4 py-3 bg-green-50 text-right text-xs font-medium text-green-800 uppercase tracking-wider font-sans">Balance</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-green-100">
                          {Array.from({ length: Math.ceil(totalMonths / 3) }).map((_, index) => {
                            const quarterNumber = index + 1;
                            const monthIndex = Math.min((quarterNumber * 3) - 1, totalMonths - 1);
                            const quarterData = result.monthlyBreakdown[monthIndex];
                            
                            // Calculate quarterly deposits (3 months)
                            const startMonth = (quarterNumber - 1) * 3;
                            const endMonth = Math.min(startMonth + 2, totalMonths - 1);
                            let quarterlyDeposit = 0;
                            let quarterlyInterest = 0;
                            
                            for (let i = startMonth; i <= endMonth; i++) {
                              if (i < result.monthlyBreakdown.length) {
                                quarterlyDeposit += result.monthlyBreakdown[i].deposit;
                                quarterlyInterest += result.monthlyBreakdown[i].interest;
                              }
                            }
                            
                            // Get balance safely, default to 0 if quarterData is undefined
                            const balance = quarterData?.balance ?? 0;
                            
                            return (
                              <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-green-50/30"}>
                                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-slate-700 font-serif">Q{quarterNumber}</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-slate-700">{formatCurrency(quarterlyDeposit)}</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-green-600">{formatCurrency(quarterlyInterest)}</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-slate-700 font-medium">{formatCurrency(balance)}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>

                {/* Additional Info */}
                <Card className="shadow-lg border-rose-100">
                  <CardHeader className="bg-gradient-to-r from-rose-50 to-rose-100 border-b border-rose-100 py-4">
                    <CardTitle className="text-lg font-bold text-slate-800">Important Information</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4 text-sm text-slate-600">
                      <div className="flex gap-2">
                        <Info className="h-5 w-5 text-rose-500 flex-shrink-0 mt-0.5" />
                        <p>Recurring deposits require regular monthly payments. Missing payments may incur penalties.</p>
                      </div>
                      <div className="flex gap-2">
                        <Info className="h-5 w-5 text-rose-500 flex-shrink-0 mt-0.5" />
                        <p>TDS is applicable on interest earned if it exceeds ₹40,000 per year (₹50,000 for senior citizens).</p>
                      </div>
                      <div className="flex gap-2">
                        <Info className="h-5 w-5 text-rose-500 flex-shrink-0 mt-0.5" />
                        <p>Premature withdrawal may result in a lower interest rate than initially offered.</p>
                      </div>
                      <div className="flex gap-2">
                        <Info className="h-5 w-5 text-rose-500 flex-shrink-0 mt-0.5" />
                        <p>Senior citizens typically get an additional 0.25% to 0.5% interest rate on recurring deposits.</p>
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

export default RecurringDepositCalculator; 