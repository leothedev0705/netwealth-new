'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { IndianRupee, Percent, CalendarDays, Calculator, Info } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

const LumpSumCalculatorPage = () => {
  const [principalStr, setPrincipalStr] = useState<string>("100000");
  const [annualRateStr, setAnnualRateStr] = useState<string>("12");
  const [yearsStr, setYearsStr] = useState<string>("10");
  const [result, setResult] = useState<{
    totalInvestment: number
    totalReturns: number
    maturityValue: number
  } | null>(null);

  const principal = useMemo(() => parseFloat(principalStr) || 0, [principalStr]);
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

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);
  };

  const calculateLumpsum = () => {
    const totalInvestment = principal;
    const maturityValue = principal * Math.pow(1 + annualRate / 100, years);
    const totalReturns = maturityValue - totalInvestment;

    setResult({
      totalInvestment: Math.round(totalInvestment),
      totalReturns: Math.round(totalReturns),
      maturityValue: Math.round(maturityValue)
    });
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 via-white to-slate-100 min-h-screen py-16 md:py-24 px-6">
      <div className="container mx-auto max-w-4xl">
        <Card className="w-full shadow-xl border-slate-200 overflow-hidden">
          <CardHeader className="bg-slate-50 border-b border-slate-200 p-6">
            <CardTitle className="text-2xl md:text-3xl font-bold text-slate-800 flex items-center gap-2">
              <Calculator className="h-7 w-7 text-primary" />
              Lumpsum Calculator
            </CardTitle>
            <CardDescription className="text-slate-500 mt-1">
              Calculate returns on your one-time investments and make informed decisions
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-8">
              <div className="space-y-3">
                <Label htmlFor="principal" className="text-slate-700 font-medium flex items-center gap-2">
                  <IndianRupee className="h-4 w-4" /> Investment Amount
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
                  <span className="text-sm text-slate-500 font-semibold min-w-[80px] text-right font-sans">
                    {formatCurrency(principal)}
                  </span>
                </div>
                <Slider
                  value={[principal]}
                  onValueChange={handleSliderChange(setPrincipalStr)}
                  min={1000}
                  max={1000000}
                  step={1000}
                  aria-label="Investment Amount Slider"
                />
                <p className="text-xs text-slate-500 mt-2 px-1">
                  Enter the amount you wish to invest as a one-time investment
                </p>
              </div>

              <div className="space-y-3">
                <Label htmlFor="annualRate" className="text-slate-700 font-medium flex items-center gap-2">
                  <Percent className="h-4 w-4" /> Expected Annual Return (%)
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
                  <span className="text-sm text-slate-500 font-semibold min-w-[40px] text-right font-sans">
                    {annualRate}%
                  </span>
                </div>
                <Slider
                  value={[annualRate]}
                  onValueChange={handleSliderChange(setAnnualRateStr)}
                  min={1}
                  max={30}
                  step={0.5}
                  aria-label="Annual Return Slider"
                />
                <p className="text-xs text-slate-500 mt-2 px-1">
                  Historical returns vary by investment type. Equity has averaged 12-15% long-term, while debt typically yields 6-8%
                </p>
              </div>

              <div className="space-y-3">
                <Label htmlFor="years" className="text-slate-700 font-medium flex items-center gap-2">
                  <CalendarDays className="h-4 w-4" /> Investment Period (Years)
                </Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="years"
                    type="text"
                    inputMode="numeric"
                    value={yearsStr}
                    onChange={handleInputChange(setYearsStr, 40)}
                    placeholder="e.g., 10"
                    className="flex-grow"
                  />
                  <span className="text-sm text-slate-500 font-semibold min-w-[40px] text-right font-sans">
                    {years} Yr
                  </span>
                </div>
                <Slider
                  value={[years]}
                  onValueChange={handleSliderChange(setYearsStr)}
                  min={1}
                  max={40}
                  step={1}
                  aria-label="Investment Period Slider"
                />
                <p className="text-xs text-slate-500 mt-2 px-1">
                  Longer investment horizons typically benefit from the power of compounding
                </p>
              </div>
            </div>

            <div className="bg-slate-50 rounded-lg p-6 md:p-8 flex flex-col justify-center items-center text-center border border-slate-200 space-y-6">
              <div className="w-full">
                <p className="text-sm text-slate-500 mb-1">Total Investment</p>
                <p className="text-2xl font-medium text-slate-700">
                  {formatCurrency(result?.totalInvestment || principal)}
                </p>
              </div>
              <div className="w-full border-t border-slate-200 pt-4">
                <p className="text-sm text-slate-500 mb-1">Expected Returns</p>
                <p className="text-2xl font-medium text-green-600">
                  {formatCurrency(result?.totalReturns || 0)}
                </p>
              </div>
              <div className="w-full border-t border-slate-200 pt-4">
                <p className="text-sm text-slate-500 mb-1">Maturity Value</p>
                <p className="text-3xl md:text-4xl font-semibold text-primary">
                  {formatCurrency(result?.maturityValue || principal)}
                </p>
              </div>
              <p className="text-xs text-slate-400 pt-4">
                *Calculations are estimates based on inputs and do not guarantee future returns
              </p>
            </div>

            <Alert className="md:col-span-2 mt-6 border-blue-200 bg-blue-50/50">
              <Info className="h-4 w-4 text-blue-600" />
              <AlertTitle className="text-blue-800">Understanding Lumpsum Investment</AlertTitle>
              <AlertDescription className="text-blue-700">
                A lumpsum investment is a one-time investment that grows through compound interest. While it can potentially 
                yield higher returns compared to staggered investments in a rising market, it also carries market timing risk. 
                Consider your financial goals, risk tolerance, and market conditions when making lumpsum investments.
              </AlertDescription>
            </Alert>

            <Button onClick={calculateLumpsum} className="md:col-span-2 w-full">
              Calculate Returns
            </Button>
          </CardContent>
        </Card>

        <Card className="w-full mt-10 shadow-lg border-slate-200">
          <CardHeader className="bg-slate-50 border-b border-slate-200 p-6">
            <CardTitle className="text-xl md:text-2xl font-bold text-slate-800 flex items-center gap-2">
              Understanding Compound Growth
            </CardTitle>
            <CardDescription className="text-slate-500 mt-1">
              How your money grows over time with compound interest
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 md:p-8 space-y-4 text-slate-700 text-sm leading-relaxed">
            <p>
              <strong>The Power of Compounding:</strong> With lumpsum investments, your returns are reinvested, 
              earning additional returns on both your principal and previously earned interest.
            </p>
            <p>
              <strong>Time and Returns:</strong> The longer your investment horizon and higher the return rate, 
              the more dramatic the effect of compounding becomes.
            </p>
            <ul className="list-disc space-y-2 pl-5 text-slate-600">
              <li>Initial years may show modest growth</li>
              <li>Growth accelerates in later years</li>
              <li>Higher returns compound more effectively</li>
              <li>Regular monitoring and rebalancing is important</li>
            </ul>
            <p className="text-xs text-slate-500 pt-3">
              *Consider consulting with our financial advisors for personalized investment strategies
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LumpSumCalculatorPage; 