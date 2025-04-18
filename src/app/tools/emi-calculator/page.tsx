'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Landmark, IndianRupee, Percent, CalendarDays, Calculator } from 'lucide-react'; // Use Landmark icon
import { Button } from "@/components/ui/button";

const EMICalculatorPage = () => {
  const [loanAmountStr, setLoanAmountStr] = useState<string>("1000000"); // 10 Lakhs
  const [annualRateStr, setAnnualRateStr] = useState<string>("8.5");
  const [yearsStr, setYearsStr] = useState<string>("5");
  const [result, setResult] = useState<{
    emi: number
    totalInterest: number
    totalPayment: number
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

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);
  };

  const calculateEMI = () => {
    const principal = loanAmount;
    const ratePerMonth = annualRate / (12 * 100);
    const numberOfMonths = years * 12;
    
    // EMI = P * r * (1 + r)^n / ((1 + r)^n - 1)
    const emi = principal * ratePerMonth * Math.pow(1 + ratePerMonth, numberOfMonths) / 
      (Math.pow(1 + ratePerMonth, numberOfMonths) - 1);
    
    const totalPayment = emi * numberOfMonths;
    const totalInterest = totalPayment - principal;

    setResult({
      emi: Math.round(emi),
      totalInterest: Math.round(totalInterest),
      totalPayment: Math.round(totalPayment)
    });
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 via-white to-slate-100 min-h-screen py-16 md:py-24 px-6">
      <div className="container mx-auto max-w-4xl">
        <Card className="w-full shadow-xl border-slate-200 overflow-hidden">
          <CardHeader className="bg-slate-50 border-b border-slate-200 p-6">
            <CardTitle className="text-2xl md:text-3xl font-bold text-slate-800 flex items-center gap-2">
              <Calculator className="h-7 w-7 text-primary" />
              EMI Calculator
            </CardTitle>
            <CardDescription className="text-slate-500 mt-1">
              Calculate your Equated Monthly Installments for loans.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Input Section */}
            <div className="space-y-8">
              {/* Loan Amount */}
              <div className="space-y-3">
                <Label htmlFor="loanAmount" className="text-slate-700 font-medium flex items-center gap-2">
                  <IndianRupee className="h-4 w-4" /> Loan Amount
                </Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="loanAmount"
                    type="text"
                    inputMode="decimal"
                    value={loanAmountStr}
                    onChange={handleInputChange(setLoanAmountStr, 100000000)} // 10 Crore max example
                    placeholder="e.g., 1000000"
                    max={100000000}
                    className="flex-grow"
                  />
                   <span className="text-sm text-slate-500 font-semibold min-w-[80px] text-right">
                     {formatCurrency(loanAmount)}
                   </span>
                </div>
                <Slider
                  value={[loanAmount]}
                  onValueChange={handleSliderChange(setLoanAmountStr)}
                  min={50000} // Example min 50k
                  max={5000000} // 50 Lakh max for slider
                  step={10000}
                  aria-label="Loan Amount Slider"
                />
              </div>

              {/* Annual Interest Rate */}
              <div className="space-y-3">
                <Label htmlFor="annualRate" className="text-slate-700 font-medium flex items-center gap-2">
                  <Percent className="h-4 w-4" /> Annual Interest Rate (%)
                </Label>
                 <div className="flex items-center gap-4">
                   <Input
                    id="annualRate"
                    type="text"
                    inputMode="decimal"
                    value={annualRateStr}
                    onChange={handleInputChange(setAnnualRateStr, 25)} // Example max rate 25%
                    placeholder="e.g., 8.5"
                    max={25}
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
                  min={1} // Min rate 1%
                  max={25}
                  step={0.1}
                  aria-label="Annual Rate Slider"
                 />
              </div>

              {/* Loan Tenure (Years) */}
              <div className="space-y-3">
                <Label htmlFor="years" className="text-slate-700 font-medium flex items-center gap-2">
                  <CalendarDays className="h-4 w-4" /> Loan Tenure (Years)
                </Label>
                 <div className="flex items-center gap-4">
                   <Input
                    id="years"
                    type="text"
                    inputMode="numeric"
                    value={yearsStr}
                    onChange={handleInputChange(setYearsStr, 30)} // Max 30 years
                    placeholder="e.g., 5"
                    max={30}
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
                  aria-label="Loan Tenure Slider"
                 />
              </div>
            </div>

            {/* Results Section */}
            <div className="bg-slate-50 rounded-lg p-6 md:p-8 flex flex-col justify-center items-center text-center border border-slate-200 space-y-6">
              <div className="w-full">
                <p className="text-sm text-slate-500 mb-1">Monthly EMI</p>
                <p className="text-3xl md:text-4xl font-bold text-primary">{formatCurrency(result?.emi || 0)}</p>
              </div>
              <div className="w-full border-t border-slate-200 pt-4">
                <p className="text-sm text-slate-500 mb-1">Total Interest Payable</p>
                <p className="text-xl font-semibold text-slate-700">{formatCurrency(result?.totalInterest || 0)}</p>
              </div>
               <div className="w-full border-t border-slate-200 pt-4">
                 <p className="text-sm text-slate-500 mb-1">Total Payment (Principal + Interest)</p>
                 <p className="text-xl font-semibold text-slate-700">{formatCurrency(result?.totalPayment || 0)}</p>
               </div>
               <p className="text-xs text-slate-400 pt-4">*Calculations are approximate estimates.</p>
            </div>

            <Button onClick={calculateEMI} className="w-full">Calculate</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EMICalculatorPage; 