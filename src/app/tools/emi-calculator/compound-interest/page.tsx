'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Percent, CalendarDays, Calculator, TrendingUp, BarChart2, Info, RefreshCw } from 'lucide-react';
import { Button } from "@/components/ui/button";

// Line chart component for compound interest growth
const GrowthChart = ({ 
  principal, 
  years, 
  yearlyData 
}: { 
  principal: number, 
  years: number, 
  yearlyData: number[] 
}) => {
  const maxValue = Math.max(...yearlyData);
  const chartHeight = 200;
  const chartWidth = 500;
  
  // Calculate points for the SVG path
  const points = yearlyData.map((value, index) => {
    const x = (index / (yearlyData.length - 1)) * chartWidth;
    const y = chartHeight - (value / maxValue) * chartHeight;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[500px]">
        <svg width={chartWidth} height={chartHeight} className="overflow-visible">
          {/* Y-axis */}
          <line x1="0" y1="0" x2="0" y2={chartHeight} stroke="#cbd5e1" strokeWidth="1" />
          
          {/* X-axis */}
          <line x1="0" y1={chartHeight} x2={chartWidth} y2={chartHeight} stroke="#cbd5e1" strokeWidth="1" />
          
          {/* Data line */}
          <polyline
            points={points}
            fill="none"
            stroke="#10b981"
            strokeWidth="2"
            className="drop-shadow-md"
          />
          
          {/* Area under the curve */}
          <polyline
            points={`0,${chartHeight} ${points} ${chartWidth},${chartHeight}`}
            fill="url(#gradientFill)"
            fillOpacity="0.2"
          />
          
          {/* Gradient definition */}
          <defs>
            <linearGradient id="gradientFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
            </linearGradient>
          </defs>
          
          {/* Data points */}
          {yearlyData.map((value, index) => {
            const x = (index / (yearlyData.length - 1)) * chartWidth;
            const y = chartHeight - (value / maxValue) * chartHeight;
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r="4"
                fill="#10b981"
                className="drop-shadow-sm"
              />
            );
          })}
        </svg>
        
        {/* X-axis labels */}
        <div className="flex justify-between mt-2">
          {Array.from({ length: Math.min(6, years + 1) }).map((_, index) => {
            const yearLabel = index === 0 ? 0 : Math.ceil((index / 5) * years);
            return (
              <div key={index} className="text-xs text-slate-500">
                Year {yearLabel}
              </div>
            );
          })}
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

// Compound frequency options
const compoundingOptions = [
  { value: 1, label: 'Annually' },
  { value: 2, label: 'Semi-Annually' },
  { value: 4, label: 'Quarterly' },
  { value: 12, label: 'Monthly' },
  { value: 365, label: 'Daily' }
];

const CompoundInterestCalculator = () => {
  const [principalStr, setPrincipalStr] = useState<string>("100000"); // 1 Lakh
  const [rateStr, setRateStr] = useState<string>("8");
  const [yearsStr, setYearsStr] = useState<string>("10");
  const [compoundFrequency, setCompoundFrequency] = useState<number>(1); // Default: Annually
  const [additionalContributionStr, setAdditionalContributionStr] = useState<string>("0");
  const [contributionFrequency, setContributionFrequency] = useState<string>("yearly"); // yearly or monthly
  
  const [result, setResult] = useState<{
    finalAmount: number;
    totalInterest: number;
    totalContributions: number;
    yearlyData: number[];
  } | null>(null);

  // Derived numeric values
  const principal = useMemo(() => parseFloat(principalStr) || 0, [principalStr]);
  const rate = useMemo(() => parseFloat(rateStr) || 0, [rateStr]);
  const years = useMemo(() => parseInt(yearsStr) || 0, [yearsStr]);
  const additionalContribution = useMemo(() => parseFloat(additionalContributionStr) || 0, [additionalContributionStr]);

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

  const calculateCompoundInterest = () => {
    const p = principal;
    const r = rate / 100;
    const t = years;
    const n = compoundFrequency;
    const pmt = additionalContribution;
    
    let yearlyData = [p];
    let currentAmount = p;
    let totalContributions = p;
    
    // Calculate for each year
    for (let year = 1; year <= t; year++) {
      // For each compounding period within the year
      for (let period = 1; period <= n; period++) {
        // Add interest for this period
        currentAmount *= (1 + r / n);
        
        // Add contribution at the end of each period if applicable
        if (contributionFrequency === 'monthly') {
          // Monthly contribution (12 times per year)
          if (n >= 12) {
            // If compounding is at least monthly, add contribution every month
            if (period % (n / 12) === 0) {
              currentAmount += pmt;
              totalContributions += pmt;
            }
          } else {
            // If compounding is less frequent than monthly (e.g., quarterly, semi-annually)
            // Add accumulated monthly contributions at each compounding period
            currentAmount += pmt * (12 / n);
            totalContributions += pmt * (12 / n);
          }
        } else if (period === n) {
          // Yearly contribution (only at the end of each year)
          currentAmount += pmt;
          totalContributions += pmt;
        }
      }
      
      yearlyData.push(currentAmount);
    }
    
    const finalAmount = currentAmount;
    const totalInterest = finalAmount - totalContributions;
    
    setResult({
      finalAmount,
      totalInterest,
      totalContributions,
      yearlyData
    });
  };

  // Calculate on initial render and when inputs change
  useEffect(() => {
    calculateCompoundInterest();
  }, [principal, rate, years, compoundFrequency, additionalContribution, contributionFrequency]);

  return (
    <div className="bg-gradient-to-br from-emerald-50 via-white to-emerald-50 min-h-screen py-16 md:py-24 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <div className="bg-emerald-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="h-8 w-8 text-emerald-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">Compound Interest Calculator</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            See how your investments can grow over time with the power of compound interest.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Card */}
          <Card className="lg:col-span-1 shadow-lg border-emerald-100">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-emerald-100 border-b border-emerald-100">
              <CardTitle className="text-xl font-bold text-slate-800">Investment Details</CardTitle>
              <CardDescription>Adjust the values to calculate compound interest</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-8">
              {/* Principal Amount */}
              <div className="space-y-3">
                <Label htmlFor="principal" className="text-slate-700 font-medium flex items-center gap-2">
                  <RefreshCw className="h-4 w-4 text-emerald-500" /> Initial Investment
                </Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="principal"
                    type="text"
                    inputMode="decimal"
                    value={principalStr}
                    onChange={handleInputChange(setPrincipalStr, 100000000)}
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
                  max={5000000}
                  step={1000}
                  className="[&>span]:bg-emerald-500"
                />
              </div>

              {/* Interest Rate */}
              <div className="space-y-3">
                <Label htmlFor="rate" className="text-slate-700 font-medium flex items-center gap-2">
                  <Percent className="h-4 w-4 text-emerald-500" /> Annual Interest Rate (%)
                </Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="rate"
                    type="text"
                    inputMode="decimal"
                    value={rateStr}
                    onChange={handleInputChange(setRateStr, 50)}
                    placeholder="e.g., 8"
                    className="flex-grow"
                  />
                  <span className="text-sm text-slate-500 font-semibold min-w-[40px] text-right">
                    {rate}%
                  </span>
                </div>
                <Slider
                  value={[rate]}
                  onValueChange={handleSliderChange(setRateStr)}
                  min={1}
                  max={25}
                  step={0.1}
                  className="[&>span]:bg-emerald-500"
                />
              </div>

              {/* Time Period */}
              <div className="space-y-3">
                <Label htmlFor="years" className="text-slate-700 font-medium flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-emerald-500" /> Time Period (Years)
                </Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="years"
                    type="text"
                    inputMode="numeric"
                    value={yearsStr}
                    onChange={handleInputChange(setYearsStr, 50)}
                    placeholder="e.g., 10"
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
                  max={30}
                  step={1}
                  className="[&>span]:bg-emerald-500"
                />
              </div>

              {/* Compounding Frequency */}
              <div className="space-y-3">
                <Label className="text-slate-700 font-medium">Compounding Frequency</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {compoundingOptions.map((option) => (
                    <Button
                      key={option.value}
                      type="button"
                      variant={compoundFrequency === option.value ? "default" : "outline"}
                      onClick={() => setCompoundFrequency(option.value)}
                      className={compoundFrequency === option.value ? 
                        "bg-emerald-500 hover:bg-emerald-600" : 
                        "border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                      }
                      size="sm"
                    >
                      {option.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Additional Contribution */}
              <div className="space-y-3">
                <Label htmlFor="additionalContribution" className="text-slate-700 font-medium flex items-center gap-2">
                  <RefreshCw className="h-4 w-4 text-emerald-500" /> Additional Contribution
                </Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="additionalContribution"
                    type="text"
                    inputMode="decimal"
                    value={additionalContributionStr}
                    onChange={handleInputChange(setAdditionalContributionStr, 10000000)}
                    placeholder="e.g., 10000"
                    className="flex-grow"
                  />
                  <span className="text-sm text-slate-500 font-semibold min-w-[80px] text-right">
                    {formatCompactNumber(additionalContribution)}
                  </span>
                </div>
                <Slider
                  value={[additionalContribution]}
                  onValueChange={handleSliderChange(setAdditionalContributionStr)}
                  min={0}
                  max={500000}
                  step={1000}
                  className="[&>span]:bg-emerald-500"
                />
              </div>

              {/* Contribution Frequency */}
              <div className="space-y-3">
                <Label className="text-slate-700 font-medium">Contribution Frequency</Label>
                <div className="flex space-x-4">
                  <Button
                    type="button"
                    variant={contributionFrequency === 'yearly' ? "default" : "outline"}
                    onClick={() => setContributionFrequency('yearly')}
                    className={contributionFrequency === 'yearly' ? 
                      "bg-emerald-500 hover:bg-emerald-600" : 
                      "border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                    }
                  >
                    Yearly
                  </Button>
                  <Button
                    type="button"
                    variant={contributionFrequency === 'monthly' ? "default" : "outline"}
                    onClick={() => setContributionFrequency('monthly')}
                    className={contributionFrequency === 'monthly' ? 
                      "bg-emerald-500 hover:bg-emerald-600" : 
                      "border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                    }
                  >
                    Monthly
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-emerald-50 p-4 border-t border-emerald-100">
              <Button 
                onClick={calculateCompoundInterest} 
                className="w-full bg-emerald-500 hover:bg-emerald-600"
              >
                Calculate
              </Button>
            </CardFooter>
          </Card>

          {/* Results Section */}
          <div className="lg:col-span-2 space-y-8">
            {result && (
              <>
                {/* Summary Card */}
                <Card className="shadow-lg border-emerald-100">
                  <CardHeader className="bg-gradient-to-r from-emerald-50 to-emerald-100 border-b border-emerald-100">
                    <CardTitle className="text-xl font-bold text-slate-800">Investment Summary</CardTitle>
                    <CardDescription>Results based on your inputs</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div>
                          <p className="text-sm text-slate-500 mb-1">Future Value</p>
                          <p className="text-3xl font-bold text-emerald-600">{formatCurrency(result.finalAmount)}</p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-slate-500 mb-1">Initial Investment</p>
                            <p className="text-lg font-semibold text-slate-700">{formatCurrency(principal)}</p>
                          </div>
                          <div>
                            <p className="text-sm text-slate-500 mb-1">Total Contributions</p>
                            <p className="text-lg font-semibold text-slate-700">{formatCurrency(result.totalContributions - principal)}</p>
                          </div>
                          <div>
                            <p className="text-sm text-slate-500 mb-1">Total Interest</p>
                            <p className="text-lg font-semibold text-emerald-600">{formatCurrency(result.totalInterest)}</p>
                          </div>
                          <div>
                            <p className="text-sm text-slate-500 mb-1">Interest to Principal Ratio</p>
                            <p className="text-lg font-semibold text-slate-700">{Math.round((result.totalInterest / principal) * 100)}%</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-center">
                        <div className="bg-white p-4 rounded-lg shadow-sm border border-emerald-100 w-full">
                          <div className="flex justify-between mb-2">
                            <span className="text-sm font-medium text-slate-700">Initial Investment</span>
                            <span className="text-sm font-medium text-slate-700">{formatCurrency(principal)}</span>
                          </div>
                          <div className="w-full bg-slate-100 rounded-full h-3 mb-4">
                            <div 
                              className="bg-blue-500 h-3 rounded-full" 
                              style={{ width: `${(principal / result.finalAmount) * 100}%` }}
                            ></div>
                          </div>
                          
                          <div className="flex justify-between mb-2">
                            <span className="text-sm font-medium text-slate-700">Additional Contributions</span>
                            <span className="text-sm font-medium text-slate-700">{formatCurrency(result.totalContributions - principal)}</span>
                          </div>
                          <div className="w-full bg-slate-100 rounded-full h-3 mb-4">
                            <div 
                              className="bg-purple-500 h-3 rounded-full" 
                              style={{ width: `${((result.totalContributions - principal) / result.finalAmount) * 100}%` }}
                            ></div>
                          </div>
                          
                          <div className="flex justify-between mb-2">
                            <span className="text-sm font-medium text-slate-700">Interest Earned</span>
                            <span className="text-sm font-medium text-emerald-600">{formatCurrency(result.totalInterest)}</span>
                          </div>
                          <div className="w-full bg-slate-100 rounded-full h-3">
                            <div 
                              className="bg-emerald-500 h-3 rounded-full" 
                              style={{ width: `${(result.totalInterest / result.finalAmount) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Growth Chart */}
                <Card className="shadow-lg border-emerald-100">
                  <CardHeader className="bg-gradient-to-r from-emerald-50 to-emerald-100 border-b border-emerald-100 py-4">
                    <CardTitle className="text-lg font-bold text-slate-800">Growth Over Time</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <GrowthChart 
                      principal={principal} 
                      years={years} 
                      yearlyData={result.yearlyData} 
                    />
                  </CardContent>
                </Card>

                {/* Yearly Breakdown */}
                <Card className="shadow-lg border-emerald-100">
                  <CardHeader className="bg-gradient-to-r from-emerald-50 to-emerald-100 border-b border-emerald-100 py-4">
                    <CardTitle className="text-lg font-bold text-slate-800">Yearly Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-emerald-200">
                        <thead>
                          <tr>
                            <th className="px-4 py-3 bg-emerald-50 text-left text-xs font-medium text-emerald-800 uppercase tracking-wider">Year</th>
                            <th className="px-4 py-3 bg-emerald-50 text-right text-xs font-medium text-emerald-800 uppercase tracking-wider">Value</th>
                            <th className="px-4 py-3 bg-emerald-50 text-right text-xs font-medium text-emerald-800 uppercase tracking-wider">Interest</th>
                            <th className="px-4 py-3 bg-emerald-50 text-right text-xs font-medium text-emerald-800 uppercase tracking-wider">Growth</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-emerald-100">
                          {result.yearlyData.map((value, index) => {
                            const prevValue = index > 0 ? result.yearlyData[index - 1] : 0;
                            const yearlyInterest = index > 0 ? value - prevValue - (contributionFrequency === 'yearly' ? additionalContribution : additionalContribution * 12) : 0;
                            const yearlyGrowth = index > 0 ? ((value - prevValue) / prevValue) * 100 : 0;
                            
                            return (
                              <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-emerald-50/30"}>
                                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-slate-700">{index}</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-slate-700">{formatCurrency(value)}</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-emerald-600">
                                  {index > 0 ? formatCurrency(yearlyInterest) : "-"}
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-slate-700">
                                  {index > 0 ? `${yearlyGrowth.toFixed(2)}%` : "-"}
                                </td>
                              </tr>
                            );
                          })}
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

export default CompoundInterestCalculator; 