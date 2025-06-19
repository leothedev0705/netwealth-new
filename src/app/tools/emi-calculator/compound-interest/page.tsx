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
                    onChange={handleInputChange(setPrincipalStr, 100000000)} // 10 Crore max
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
                  min={1000} // 1K min
                  max={1000000} // 10 Lakh max for slider
                  step={1000}
                  className="[&>span]:bg-emerald-500"
                  aria-label="Principal Amount Slider"
                />
                <div className="flex justify-between text-xs text-slate-500">
                  <span>₹1K</span>
                  <span>₹10L</span>
                </div>
              </div>

              {/* Interest Rate */}
              <div className="space-y-3">
                <Label htmlFor="rate" className="text-slate-700 font-medium flex items-center gap-2">
                  <Percent className="h-4 w-4 text-emerald-500" /> Interest Rate (% p.a.)
                </Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="rate"
                    type="text"
                    inputMode="decimal"
                    value={rateStr}
                    onChange={handleInputChange(setRateStr, 30)}
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
                  min={1} // Min rate 1%
                  max={20} // Max rate 20%
                  step={0.1}
                  className="[&>span]:bg-emerald-500"
                  aria-label="Interest Rate Slider"
                />
                <div className="flex justify-between text-xs text-slate-500">
                  <span>1%</span>
                  <span>20%</span>
                </div>
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
                    onChange={handleInputChange(setYearsStr, 50)} // Max 50 years
                    placeholder="e.g., 10"
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
                  max={30}
                  step={1}
                  className="[&>span]:bg-emerald-500"
                  aria-label="Years Slider"
                />
                <div className="flex justify-between text-xs text-slate-500">
                  <span>1 Yr</span>
                  <span>30 Yrs</span>
                </div>
              </div>

              {/* Compounding Frequency */}
              <div className="space-y-3">
                <Label htmlFor="compounding" className="text-slate-700 font-medium">
                  Compounding Frequency
                </Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {compoundingOptions.map(option => (
                    <Button
                      key={option.value}
                      type="button"
                      variant={compoundFrequency === option.value ? "default" : "outline"}
                      className={compoundFrequency === option.value ? "bg-emerald-600 hover:bg-emerald-700" : "border-emerald-200 text-slate-700"}
                      onClick={() => setCompoundFrequency(option.value)}
                    >
                      {option.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Additional Contribution */}
              <div className="space-y-3">
                <Label htmlFor="additionalContribution" className="text-slate-700 font-medium">
                  Additional Contribution
                </Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="additionalContribution"
                    type="text"
                    inputMode="decimal"
                    value={additionalContributionStr}
                    onChange={handleInputChange(setAdditionalContributionStr, 10000000)} // 1 Crore max
                    placeholder="e.g., 10000"
                    className="flex-grow"
                  />
                  <span className="text-sm text-slate-500 font-semibold min-w-[80px] text-right">
                    {formatCompactNumber(additionalContribution)}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    type="button"
                    variant={contributionFrequency === 'yearly' ? "default" : "outline"}
                    className={contributionFrequency === 'yearly' ? "bg-emerald-600 hover:bg-emerald-700" : "border-emerald-200 text-slate-700"}
                    onClick={() => setContributionFrequency('yearly')}
                  >
                    Yearly
                  </Button>
                  <Button
                    type="button"
                    variant={contributionFrequency === 'monthly' ? "default" : "outline"}
                    className={contributionFrequency === 'monthly' ? "bg-emerald-600 hover:bg-emerald-700" : "border-emerald-200 text-slate-700"}
                    onClick={() => setContributionFrequency('monthly')}
                  >
                    Monthly
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-emerald-50/50 p-6 border-t border-emerald-100">
              <Button 
                onClick={calculateCompoundInterest} 
                className="w-full bg-emerald-600 hover:bg-emerald-700"
              >
                <Calculator className="h-4 w-4 mr-2" /> Calculate
              </Button>
            </CardFooter>
          </Card>

          {/* Results Card */}
          <Card className="lg:col-span-2 shadow-lg border-emerald-100">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-emerald-100 border-b border-emerald-100">
              <CardTitle className="text-xl font-bold text-slate-800">Investment Growth</CardTitle>
              <CardDescription>See how your investment grows over time</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 gap-8">
                {/* Main Results */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-emerald-50 rounded-xl p-6 text-center">
                    <h3 className="text-sm font-medium text-slate-500 mb-1">Final Amount</h3>
                    <p className="text-3xl font-bold text-emerald-600">
                      {formatCurrency(result?.finalAmount || 0)}
                    </p>
                  </div>
                  
                  <div className="bg-slate-50 rounded-xl p-6 text-center">
                    <h3 className="text-sm font-medium text-slate-500 mb-1">Total Contributions</h3>
                    <p className="text-xl font-semibold text-slate-700">{formatCurrency(result?.totalContributions || 0)}</p>
                  </div>
                  
                  <div className="bg-slate-50 rounded-xl p-6 text-center">
                    <h3 className="text-sm font-medium text-slate-500 mb-1">Total Interest</h3>
                    <p className="text-xl font-semibold text-slate-700">{formatCurrency(result?.totalInterest || 0)}</p>
                  </div>
                </div>
                
                {/* Growth Chart */}
                <div className="mt-4">
                  <h3 className="text-lg font-semibold text-slate-800 mb-4">Growth Over Time</h3>
                  {result && result.yearlyData.length > 0 && (
                    <GrowthChart 
                      principal={principal} 
                      years={years} 
                      yearlyData={result.yearlyData} 
                    />
                  )}
                </div>
                
                {/* Yearly Breakdown */}
                <div className="mt-4">
                  <h3 className="text-lg font-semibold text-slate-800 mb-4">Yearly Breakdown</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-emerald-200">
                      <thead className="bg-emerald-50">
                        <tr>
                          <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-emerald-800 uppercase tracking-wider">Year</th>
                          <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-emerald-800 uppercase tracking-wider">Balance</th>
                          <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-emerald-800 uppercase tracking-wider">Interest Earned</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-emerald-100">
                        {result?.yearlyData.slice(0, Math.min(years + 1, 11)).map((amount, index) => {
                          const prevAmount = index > 0 ? result.yearlyData[index - 1] : 0;
                          const yearlyContribution = index > 0 ? 
                            (contributionFrequency === 'yearly' ? additionalContribution : additionalContribution * 12) : 0;
                          const interestEarned = index > 0 ? amount - prevAmount - yearlyContribution : 0;
                          
                          return (
                            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-emerald-50/30'}>
                              <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-slate-700">{index}</td>
                              <td className="px-4 py-2 whitespace-nowrap text-sm text-right font-semibold text-slate-700">{formatCurrency(amount)}</td>
                              <td className="px-4 py-2 whitespace-nowrap text-sm text-right text-slate-600">{formatCurrency(interestEarned)}</td>
                            </tr>
                          );
                        })}
                        {years > 10 && (
                          <tr>
                            <td colSpan={3} className="px-4 py-2 text-center text-sm text-emerald-600">
                              <Button variant="link" className="text-emerald-600">
                                Show all {years} years
                              </Button>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-emerald-50/50 p-6 border-t border-emerald-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Info className="h-4 w-4 text-emerald-500" />
                <p>Results are indicative and don't account for taxes or inflation.</p>
              </div>
              <Button variant="outline" className="border-emerald-200 text-emerald-600 hover:bg-emerald-50">
                <BarChart2 className="h-4 w-4 mr-2" /> Compare with other investments
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        {/* Additional Info */}
        <Card className="mt-8 shadow-lg border-emerald-100">
          <CardHeader className="bg-gradient-to-r from-emerald-50 to-emerald-100 border-b border-emerald-100">
            <CardTitle className="text-xl font-bold text-slate-800">Understanding Compound Interest</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">What is Compound Interest?</h3>
                <p className="text-slate-600 mb-4">
                  Compound interest is the interest calculated on both the initial principal and the accumulated interest from previous periods. 
                  It's essentially "interest on interest" which can dramatically increase your investment over time.
                </p>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">The Formula</h3>
                <p className="text-slate-600">
                  The compound interest formula is: <br />
                  <span className="font-mono bg-slate-100 px-2 py-1 rounded text-sm">
                    A = P(1 + r/n)^(nt)
                  </span>
                  <br />
                  Where:<br />
                  A = Final amount<br />
                  P = Principal (initial investment)<br />
                  r = Annual interest rate (decimal)<br />
                  n = Compounding frequency per year<br />
                  t = Time in years
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">The Power of Compounding</h3>
                <ul className="list-disc list-inside text-slate-600 space-y-2">
                  <li>The earlier you start investing, the more time your money has to grow</li>
                  <li>Higher compounding frequency can lead to greater returns over time</li>
                  <li>Regular additional contributions can significantly boost your returns</li>
                  <li>Even small differences in interest rates can make a huge difference over long periods</li>
                  <li>The "Rule of 72" is a quick way to estimate how long it will take to double your money (72 ÷ interest rate)</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CompoundInterestCalculator; 