'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Building2, IndianRupee, Percent, CalendarDays, Calculator, Info } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

// Function to calculate Future Value of a lump sum
const calculateFV = (pv: number, rate: number, periods: number): number => {
  if (rate === 0) return pv; // Avoid division by zero if rate is 0
  return pv * Math.pow(1 + rate, periods);
};

// Function to calculate Present Value of an annuity (corpus needed for expenses)
const calculatePVA = (payment: number, rate: number, periods: number): number => {
  if (rate === 0) return payment * periods; // Or handle as an error/edge case
  return payment * ((1 - Math.pow(1 + rate, -periods)) / rate);
};

// PMT function to calculate required periodic investment
const calculatePMT = (fv: number, rate: number, periods: number): number => {
  if (rate === 0) return fv / periods;
  return (fv * rate) / (Math.pow(1 + rate, periods) - 1);
}

const RetirementCalculator = () => {
  const [currentAge, setCurrentAge] = useState<number>(30);
  const [retirementAge, setRetirementAge] = useState<number>(60);
  const [monthlyExpense, setMonthlyExpense] = useState<number>(50000);
  const [currentSavings, setCurrentSavings] = useState<number>(1000000);
  const [monthlyInvestment, setMonthlyInvestment] = useState<number>(20000);
  const [expectedReturn, setExpectedReturn] = useState<number>(12);
  const [inflationRate, setInflationRate] = useState<number>(6);
  const [result, setResult] = useState<{
    requiredCorpus: number
    currentCorpusValue: number
    monthlyInvestmentNeeded: number
  } | null>(null);

  const calculateRetirement = () => {
    // Years until retirement
    const yearsToRetirement = retirementAge - currentAge;
    
    // Calculate future monthly expense considering inflation
    const futureMonthlyExpense = monthlyExpense * 
      Math.pow(1 + inflationRate / 100, yearsToRetirement);
    
    // Calculate required corpus (25x annual expense as a thumb rule)
    const requiredCorpus = futureMonthlyExpense * 12 * 25;
    
    // Calculate future value of current savings
    const futureSavings = currentSavings * 
      Math.pow(1 + expectedReturn / 100, yearsToRetirement);
    
    // Calculate future value of monthly investments
    const monthlyRate = expectedReturn / (12 * 100);
    const months = yearsToRetirement * 12;
    const futureInvestments = monthlyInvestment * 
      ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * 
      (1 + monthlyRate);
    
    const currentCorpusValue = futureSavings + futureInvestments;
    
    // Calculate required monthly investment to reach target
    const shortfall = Math.max(0, requiredCorpus - currentCorpusValue);
    const monthlyInvestmentNeeded = (shortfall * monthlyRate) / 
      ((Math.pow(1 + monthlyRate, months) - 1) * (1 + monthlyRate));

    setResult({
      requiredCorpus: Math.round(requiredCorpus),
      currentCorpusValue: Math.round(currentCorpusValue),
      monthlyInvestmentNeeded: Math.round(monthlyInvestmentNeeded)
    });
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 via-white to-slate-100 min-h-screen py-16 md:py-24 px-6">
      <div className="container mx-auto max-w-4xl">
        <Card className="w-full shadow-xl border-slate-200 overflow-hidden">
          <CardHeader className="bg-slate-50 border-b border-slate-200 p-6">
            <CardTitle className="text-2xl md:text-3xl font-bold text-slate-800 flex items-center gap-2">
              <Calculator className="h-7 w-7 text-primary" />
              Retirement Calculator
            </CardTitle>
            <CardDescription className="text-slate-500 mt-1">
              Plan your retirement corpus and secure your financial future
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-8">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <Label htmlFor="currentAge" className="text-slate-700 font-medium flex items-center gap-2">
                    <CalendarDays className="h-4 w-4" /> Current Age
                  </Label>
                  <div className="flex items-center gap-4">
                    <Input
                      id="currentAge"
                      type="number"
                      value={currentAge}
                      onChange={(e) => setCurrentAge(Number(e.target.value))}
                      className="flex-grow"
                    />
                    <span className="text-sm text-slate-500 font-semibold min-w-[40px] text-right font-sans">
                      {currentAge} Yr
                    </span>
                  </div>
                  <Slider
                    value={[currentAge]}
                    onValueChange={(value) => setCurrentAge(value[0])}
                    min={20}
                    max={70}
                    step={1}
                    aria-label="Current Age Slider"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="retirementAge" className="text-slate-700 font-medium flex items-center gap-2">
                    <CalendarDays className="h-4 w-4" /> Retirement Age
                  </Label>
                  <div className="flex items-center gap-4">
                    <Input
                      id="retirementAge"
                      type="number"
                      value={retirementAge}
                      onChange={(e) => setRetirementAge(Number(e.target.value))}
                      className="flex-grow"
                    />
                    <span className="text-sm text-slate-500 font-semibold min-w-[40px] text-right font-sans">
                      {retirementAge} Yr
                    </span>
                  </div>
                  <Slider
                    value={[retirementAge]}
                    onValueChange={(value) => setRetirementAge(value[0])}
                    min={40}
                    max={80}
                    step={1}
                    aria-label="Retirement Age Slider"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="monthlyExpense" className="text-slate-700 font-medium flex items-center gap-2">
                  <IndianRupee className="h-4 w-4" /> Current Monthly Expense
                </Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="monthlyExpense"
                    type="number"
                    value={monthlyExpense}
                    onChange={(e) => setMonthlyExpense(Number(e.target.value))}
                    className="flex-grow"
                  />
                  <span className="text-sm text-slate-500 font-semibold min-w-[80px] text-right font-sans">
                    ₹{monthlyExpense.toLocaleString()}
                  </span>
                </div>
                <Slider
                  value={[monthlyExpense]}
                  onValueChange={(value) => setMonthlyExpense(value[0])}
                  min={10000}
                  max={500000}
                  step={5000}
                  aria-label="Monthly Expense Slider"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="currentSavings" className="text-slate-700 font-medium flex items-center gap-2">
                  <IndianRupee className="h-4 w-4" /> Current Savings
                </Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="currentSavings"
                    type="number"
                    value={currentSavings}
                    onChange={(e) => setCurrentSavings(Number(e.target.value))}
                    className="flex-grow"
                  />
                  <span className="text-sm text-slate-500 font-semibold min-w-[80px] text-right font-sans">
                    ₹{currentSavings.toLocaleString()}
                  </span>
                </div>
                <Slider
                  value={[currentSavings]}
                  onValueChange={(value) => setCurrentSavings(value[0])}
                  min={0}
                  max={10000000}
                  step={100000}
                  aria-label="Current Savings Slider"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="monthlyInvestment" className="text-slate-700 font-medium flex items-center gap-2">
                  <IndianRupee className="h-4 w-4" /> Monthly Investment
                </Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="monthlyInvestment"
                    type="number"
                    value={monthlyInvestment}
                    onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                    className="flex-grow"
                  />
                  <span className="text-sm text-slate-500 font-semibold min-w-[80px] text-right font-sans">
                    ₹{monthlyInvestment.toLocaleString()}
                  </span>
                </div>
                <Slider
                  value={[monthlyInvestment]}
                  onValueChange={(value) => setMonthlyInvestment(value[0])}
                  min={1000}
                  max={200000}
                  step={1000}
                  aria-label="Monthly Investment Slider"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <Label htmlFor="expectedReturn" className="text-slate-700 font-medium flex items-center gap-2">
                    <Percent className="h-4 w-4" /> Expected Return
                  </Label>
                  <div className="flex items-center gap-4">
                    <Input
                      id="expectedReturn"
                      type="number"
                      value={expectedReturn}
                      onChange={(e) => setExpectedReturn(Number(e.target.value))}
                      className="flex-grow"
                    />
                    <span className="text-sm text-slate-500 font-semibold min-w-[40px] text-right font-sans">
                      {expectedReturn}%
                    </span>
                  </div>
                  <Slider
                    value={[expectedReturn]}
                    onValueChange={(value) => setExpectedReturn(value[0])}
                    min={6}
                    max={15}
                    step={0.5}
                    aria-label="Expected Return Slider"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="inflationRate" className="text-slate-700 font-medium flex items-center gap-2">
                    <Percent className="h-4 w-4" /> Inflation Rate
                  </Label>
                  <div className="flex items-center gap-4">
                    <Input
                      id="inflationRate"
                      type="number"
                      value={inflationRate}
                      onChange={(e) => setInflationRate(Number(e.target.value))}
                      className="flex-grow"
                    />
                    <span className="text-sm text-slate-500 font-semibold min-w-[40px] text-right font-sans">
                      {inflationRate}%
                    </span>
                  </div>
                  <Slider
                    value={[inflationRate]}
                    onValueChange={(value) => setInflationRate(value[0])}
                    min={2}
                    max={10}
                    step={0.5}
                    aria-label="Inflation Rate Slider"
                  />
                </div>
              </div>
            </div>

            <div className="bg-slate-50 rounded-lg p-6 md:p-8 flex flex-col justify-center items-center text-center border border-slate-200 space-y-6">
              <div className="w-full">
                <p className="text-sm text-slate-500 mb-1">Required Retirement Corpus</p>
                <p className="text-3xl md:text-4xl font-bold text-primary">
                  ₹ {result?.requiredCorpus?.toLocaleString() || '0'}
                </p>
              </div>
              <div className="w-full border-t border-slate-200 pt-4">
                <p className="text-sm text-slate-500 mb-1">Expected Corpus at Current Rate</p>
                <p className="text-2xl font-medium text-slate-700">
                  ₹ {result?.currentCorpusValue?.toLocaleString() || '0'}
                </p>
              </div>
              <div className="w-full border-t border-slate-200 pt-4">
                <p className="text-sm text-slate-500 mb-1">Required Monthly Investment</p>
                <p className="text-2xl font-medium text-green-600">
                  ₹ {result?.monthlyInvestmentNeeded?.toLocaleString() || '0'}
                </p>
              </div>
              <p className="text-xs text-slate-400 pt-4">*Calculations are estimates based on inputs and do not guarantee future returns.</p>
            </div>

            <Alert className="md:col-span-2 mt-6 border-blue-200 bg-blue-50/50">
              <Info className="h-4 w-4 text-blue-600" />
              <AlertTitle className="text-blue-800">Understanding Your Retirement Planning</AlertTitle>
              <AlertDescription className="text-blue-700">
                The required corpus is calculated based on your current expenses adjusted for inflation and expected returns. 
                We use the 25x rule of thumb, which suggests having 25 times your annual expenses saved for retirement. 
                This provides a sustainable withdrawal rate of 4% annually. Remember that these are estimates and it's 
                recommended to consult with a financial advisor for personalized retirement planning.
              </AlertDescription>
            </Alert>

            <Button onClick={calculateRetirement} className="md:col-span-2 w-full">
              Calculate Retirement Plan
            </Button>
          </CardContent>
        </Card>

        <Card className="w-full mt-10 shadow-lg border-slate-200">
          <CardHeader className="bg-slate-50 border-b border-slate-200 p-6">
            <CardTitle className="text-xl md:text-2xl font-bold text-slate-800 flex items-center gap-2">
              Understanding Retirement Planning
            </CardTitle>
            <CardDescription className="text-slate-500 mt-1">
              Key factors that influence your retirement corpus
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 md:p-8 space-y-4 text-slate-700 text-sm leading-relaxed">
            <p>
              <strong>Power of Early Planning:</strong> Starting early gives your investments more time to grow through compounding, 
              potentially requiring lower monthly investments to reach your goal.
            </p>
            <p>
              <strong>Impact of Inflation:</strong> Inflation erodes purchasing power over time. A ₹50,000 monthly expense today 
              might require significantly more in the future.
            </p>
            <ul className="list-disc space-y-2 pl-5 text-slate-600">
              <li>Consider healthcare costs that typically increase with age</li>
              <li>Account for lifestyle changes and potential family responsibilities</li>
              <li>Factor in emergency funds and insurance needs</li>
              <li>Plan for both regular expenses and occasional large expenditures</li>
            </ul>
            <p className="text-xs text-slate-500 pt-3">
              *This calculator provides a basic framework. For comprehensive retirement planning, consider consulting with our financial advisors.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RetirementCalculator; 