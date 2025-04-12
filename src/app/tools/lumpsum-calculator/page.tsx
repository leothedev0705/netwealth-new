'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { PiggyBank, IndianRupee, Percent, CalendarDays } from 'lucide-react'; // Import appropriate icons
import { cn } from "@/lib/utils";


const LumpSumCalculatorPage = () => {
  const [principalStr, setPrincipalStr] = useState<string>("100000"); // e.g., 1 Lakh
  const [annualRateStr, setAnnualRateStr] = useState<string>("12");
  const [yearsStr, setYearsStr] = useState<string>("10");

  // Derived numeric values
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

  const { totalInterest, futureValue } = useMemo(() => {
    // FV = P * (1 + r/100)^t
    if (principal <= 0 || annualRate < 0 || years <= 0) {
        return { totalInterest: 0, futureValue: 0 };
    }

    const rateDecimal = annualRate / 100;
    const fv = principal * Math.pow(1 + rateDecimal, years);
    const interest = fv - principal;

    return {
      totalInterest: interest,
      futureValue: fv,
    };
  }, [principal, annualRate, years]);

  return (
    <div className="bg-gradient-to-br from-slate-50 via-white to-slate-100 min-h-screen py-16 md:py-24 px-6">
      <div className="container mx-auto max-w-4xl">
        <Card className="w-full shadow-xl border-slate-200 overflow-hidden">
          <CardHeader className="bg-slate-50 border-b border-slate-200 p-6">
            <CardTitle className="text-2xl md:text-3xl font-bold text-slate-800 flex items-center gap-2">
              <PiggyBank className="h-7 w-7 text-primary" />
              Lump Sum Calculator
            </CardTitle>
            <CardDescription className="text-slate-500 mt-1">
              Calculate the future value of a one-time investment.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Input Section */}
            <div className="space-y-8">
              {/* Principal Amount */}
              <div className="space-y-3">
                <Label htmlFor="principal" className="text-slate-700 font-medium flex items-center gap-2">
                  <IndianRupee className="h-4 w-4" /> Principal Amount
                </Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="principal"
                    type="text"
                    inputMode="decimal"
                    value={principalStr}
                    onChange={handleInputChange(setPrincipalStr, 10000000)} // 1 Crore max example
                    placeholder="e.g., 100000"
                    max={10000000}
                    className="flex-grow"
                  />
                   <span className="text-sm text-slate-500 font-semibold min-w-[80px] text-right">
                     {formatCurrency(principal)}
                   </span>
                </div>
                <Slider
                  value={[principal]}
                  onValueChange={handleSliderChange(setPrincipalStr)}
                  min={10000} // Example min for slider
                  max={1000000} // 10 Lakh max for slider
                  step={10000}
                  aria-label="Principal Amount Slider"
                />
              </div>

              {/* Expected Annual Rate */}
              <div className="space-y-3">
                <Label htmlFor="annualRate" className="text-slate-700 font-medium flex items-center gap-2">
                  <Percent className="h-4 w-4" /> Expected Annual Rate (%)
                </Label>
                 <div className="flex items-center gap-4">
                   <Input
                    id="annualRate"
                    type="text"
                    inputMode="decimal"
                    value={annualRateStr}
                    onChange={handleInputChange(setAnnualRateStr, 30)}
                    placeholder="e.g., 12"
                    max={30}
                    step={0.1}
                    className="flex-grow"
                  />
                  <span className="text-sm text-slate-500 font-semibold min-w-[40px] text-right">
                    {annualRate}%
                  </span>
                 </div>
                 <Slider
                  value={[annualRate]}
                  onValueChange={handleSliderChange(setAnnualRateStr)}
                  min={0}
                  max={30}
                  step={0.5}
                  aria-label="Annual Rate Slider"
                />
              </div>

              {/* Investment Period */}
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
                    max={40}
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
                  max={40}
                  step={1}
                  aria-label="Investment Years Slider"
                />
              </div>
            </div>

            {/* Results Section */}
            <div className="bg-slate-50 rounded-lg p-6 md:p-8 flex flex-col justify-center items-center text-center border border-slate-200 space-y-6">
              <div className="w-full">
                <p className="text-sm text-slate-500 mb-1">Principal Amount</p>
                <p className="text-2xl font-semibold text-slate-700">{formatCurrency(principal)}</p>
              </div>
              <div className="w-full border-t border-slate-200 pt-4">
                <p className="text-sm text-slate-500 mb-1">Total Interest Earned</p>
                <p className="text-2xl font-semibold text-green-600">{formatCurrency(totalInterest)}</p>
              </div>
               <div className="w-full border-t border-slate-200 pt-4">
                 <p className="text-sm text-slate-500 mb-1">Projected Future Value</p>
                 <p className="text-3xl md:text-4xl font-bold text-primary">{formatCurrency(futureValue)}</p>
               </div>
               <p className="text-xs text-slate-400 pt-4">*Calculations are estimates based on inputs and do not guarantee future returns.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LumpSumCalculatorPage; 