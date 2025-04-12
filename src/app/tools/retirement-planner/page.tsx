'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Goal, User, Target, IndianRupee, Percent, TrendingUp, Hourglass, Wallet, LineChart } from 'lucide-react'; // Import new icons
import { cn } from "@/lib/utils";
// import { Separator } from "@/components/ui/separator"; // Temporarily commented out

// Function to calculate Future Value of a lump sum
const calculateFV = (pv: number, rate: number, periods: number): number => {
  if (rate === 0) return pv; // Avoid division by zero if rate is 0
  return pv * Math.pow(1 + rate, periods);
};

// Function to calculate Future Value of an annuity (regular investments)
const calculateFVA = (payment: number, rate: number, periods: number): number => {
  if (rate === 0) return payment * periods;
  return payment * ((Math.pow(1 + rate, periods) - 1) / rate);
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

const RetirementPlannerPage = () => {
  // --- Input States --- 
  const [currentAgeStr, setCurrentAgeStr] = useState<string>("30");
  const [retirementAgeStr, setRetirementAgeStr] = useState<string>("60");
  const [monthlyExpensesStr, setMonthlyExpensesStr] = useState<string>("50000");
  const [existingSavingsStr, setExistingSavingsStr] = useState<string>("500000"); // 5 Lakhs
  const [expectedReturnOnSavingsStr, setExpectedReturnOnSavingsStr] = useState<string>("10"); // Pre-retirement return rate
  const [inflationRateStr, setInflationRateStr] = useState<string>("6"); 
  const [lifeExpectancyStr, setLifeExpectancyStr] = useState<string>("85"); // Life expectancy age
  const [postRetirementReturnStr, setPostRetirementReturnStr] = useState<string>("7");
  
  // --- Derived Numeric Values --- 
  const currentAge = useMemo(() => parseInt(currentAgeStr) || 0, [currentAgeStr]);
  const retirementAge = useMemo(() => parseInt(retirementAgeStr) || 0, [retirementAgeStr]);
  const monthlyExpenses = useMemo(() => parseFloat(monthlyExpensesStr) || 0, [monthlyExpensesStr]);
  const existingSavings = useMemo(() => parseFloat(existingSavingsStr) || 0, [existingSavingsStr]);
  const expectedReturnOnSavings = useMemo(() => parseFloat(expectedReturnOnSavingsStr) / 100 || 0, [expectedReturnOnSavingsStr]); // Convert to decimal
  const inflationRate = useMemo(() => parseFloat(inflationRateStr) / 100 || 0, [inflationRateStr]); // Convert to decimal
  const lifeExpectancy = useMemo(() => parseInt(lifeExpectancyStr) || 0, [lifeExpectancyStr]);
  const postRetirementReturn = useMemo(() => parseFloat(postRetirementReturnStr) / 100 || 0, [postRetirementReturnStr]); // Convert to decimal

  // --- Input Handlers --- (Keep existing handlers)
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

   const handleIntegerInputChange = (setter: React.Dispatch<React.SetStateAction<string>>, max: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (value === "" || (/^\d+$/.test(value) && parseInt(value) <= max)) {
        if (value.length > 1 && value.startsWith('0')) {
            value = value.substring(1);
        }
        setter(value);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);
  };

  // --- Calculation Logic --- 
  const { 
    yearsToRetirement, 
    expensesAtRetirement, 
    requiredCorpus, 
    futureValueOfSavings, 
    corpusShortfall, 
    requiredMonthlySavings 
  } = useMemo(() => {
    // Basic validation
    if (currentAge <= 0 || retirementAge <= currentAge || lifeExpectancy <= retirementAge || monthlyExpenses <= 0 || inflationRate < 0 || expectedReturnOnSavings < 0 || postRetirementReturn < 0) {
      return { yearsToRetirement: 0, expensesAtRetirement: 0, requiredCorpus: 0, futureValueOfSavings: 0, corpusShortfall: 0, requiredMonthlySavings: 0 };
    }

    const yearsLeft = retirementAge - currentAge;
    const retirementYears = lifeExpectancy - retirementAge;

    // 1. Calculate inflated expenses at retirement
    const inflatedMonthlyExpenses = calculateFV(monthlyExpenses, inflationRate, yearsLeft);
    const annualExpensesAtRetirement = inflatedMonthlyExpenses * 12;
    
    // 2. Calculate corpus needed at retirement (Present Value of Annuity for retirement years)
    // Adjust post-retirement return for inflation (real rate of return)
    const realPostRetirementReturn = ((1 + postRetirementReturn) / (1 + inflationRate)) - 1;
    // Prevent division by zero or near-zero rates which can cause issues
    if (Math.abs(realPostRetirementReturn) < 0.0001) { 
         return { yearsToRetirement: yearsLeft, expensesAtRetirement: inflatedMonthlyExpenses, requiredCorpus: Infinity, futureValueOfSavings: 0, corpusShortfall: Infinity, requiredMonthlySavings: Infinity };
    }
    const corpusNeeded = calculatePVA(annualExpensesAtRetirement, realPostRetirementReturn, retirementYears);

    // 3. Calculate future value of existing savings
    const fvSavings = calculateFV(existingSavings, expectedReturnOnSavings, yearsLeft);

    // 4. Calculate shortfall
    const shortfall = Math.max(0, corpusNeeded - fvSavings); // Ensure shortfall is not negative

    // 5. Calculate required additional monthly savings (using PMT formula)
    const monthlyRateOfReturn = expectedReturnOnSavings / 12;
    const numberOfMonths = yearsLeft * 12;
     // Handle zero rate case for PMT
    const requiredSavings = shortfall > 0 ? calculatePMT(shortfall, monthlyRateOfReturn, numberOfMonths) : 0;

    return {
      yearsToRetirement: yearsLeft,
      expensesAtRetirement: inflatedMonthlyExpenses,
      requiredCorpus: corpusNeeded,
      futureValueOfSavings: fvSavings,
      corpusShortfall: shortfall,
      requiredMonthlySavings: requiredSavings,
    };
  // Add new dependencies
  }, [currentAge, retirementAge, monthlyExpenses, existingSavings, expectedReturnOnSavings, inflationRate, lifeExpectancy, postRetirementReturn]);

  return (
    <div className="bg-gradient-to-br from-slate-50 via-white to-slate-100 min-h-screen py-16 md:py-24 px-6">
       {/* Use max-w-5xl or similar for wider layout if needed */}
      <div className="container mx-auto max-w-5xl">
        <Card className="w-full shadow-xl border-slate-200 overflow-hidden">
          <CardHeader className="bg-slate-50 border-b border-slate-200 p-6">
            <CardTitle className="text-2xl md:text-3xl font-bold text-slate-800 flex items-center gap-2">
              <Goal className="h-7 w-7 text-primary" />
              Retirement Planner
            </CardTitle>
            <CardDescription className="text-slate-500 mt-1">
              Plan your retirement corpus and estimate the required savings.
            </CardDescription>
          </CardHeader>
           {/* Change to grid-cols-3 for input/results/chart */}
          <CardContent className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Input Section (lg:col-span-1) */}
            <div className="lg:col-span-1 space-y-6">
              <h3 className="text-lg font-semibold text-slate-700 border-b pb-2 mb-4">Your Details</h3>
              {/* Current Age */} 
              <div className="space-y-3">
                 <Label htmlFor="currentAge">Current Age</Label>
                 <div className="flex items-center gap-4">
                    <Input id="currentAge" type="text" inputMode="numeric" value={currentAgeStr} onChange={handleIntegerInputChange(setCurrentAgeStr, 100)} placeholder="e.g., 30" max={100} className="flex-grow"/>
                    <span className="text-sm text-slate-500 font-semibold min-w-[60px] text-right">{currentAge} Yrs</span>
                 </div>
                 <Slider value={[currentAge]} onValueChange={handleSliderChange(setCurrentAgeStr)} min={18} max={80} step={1} aria-label="Current Age Slider"/>
              </div>
              {/* Retirement Age */} 
              <div className="space-y-3">
                <Label htmlFor="retirementAge">Target Retirement Age</Label>
                <div className="flex items-center gap-4">
                  <Input id="retirementAge" type="text" inputMode="numeric" value={retirementAgeStr} onChange={handleIntegerInputChange(setRetirementAgeStr, 100)} placeholder="e.g., 60" max={100} className="flex-grow"/>
                  <span className="text-sm text-slate-500 font-semibold min-w-[60px] text-right">{retirementAge} Yrs</span>
                </div>
                <Slider value={[retirementAge]} onValueChange={handleSliderChange(setRetirementAgeStr)} min={currentAge > 0 ? currentAge + 1 : 40} max={80} step={1} aria-label="Retirement Age Slider"/>
              </div>
              {/* Life Expectancy */} 
               <div className="space-y-3">
                <Label htmlFor="lifeExpectancy" className="flex items-center gap-1"><Hourglass className="h-4 w-4 text-slate-500"/> Life Expectancy (Age)</Label>
                <div className="flex items-center gap-4">
                  <Input id="lifeExpectancy" type="text" inputMode="numeric" value={lifeExpectancyStr} onChange={handleIntegerInputChange(setLifeExpectancyStr, 120)} placeholder="e.g., 85" max={120} className="flex-grow"/>
                  <span className="text-sm text-slate-500 font-semibold min-w-[60px] text-right">{lifeExpectancy} Yrs</span>
                </div>
                <Slider value={[lifeExpectancy]} onValueChange={handleSliderChange(setLifeExpectancyStr)} min={retirementAge > 0 ? retirementAge + 1 : 65} max={100} step={1} aria-label="Life Expectancy Slider"/>
              </div>

              {/* <Separator className="my-6" /> */} {/* Temporarily commented out */} 
              <div className="pt-4 border-t border-slate-200 mt-6"> 
                <h3 className="text-lg font-semibold text-slate-700 mb-4">Financials</h3>
                {/* Monthly Expenses, Existing Savings ... */} 
                  {/* Current Monthly Expenses */}
                  <div className="space-y-3 mb-6">
                    <Label htmlFor="monthlyExpenses">Current Monthly Expenses</Label>
                    <div className="flex items-center gap-4">
                      <Input id="monthlyExpenses" type="text" inputMode="decimal" value={monthlyExpensesStr} onChange={handleInputChange(setMonthlyExpensesStr, 500000)} placeholder="e.g., 50000" max={500000} className="flex-grow"/>
                      <span className="text-sm text-slate-500 font-semibold min-w-[80px] text-right">{formatCurrency(monthlyExpenses)}</span>
                    </div>
                    <Slider value={[monthlyExpenses]} onValueChange={handleSliderChange(setMonthlyExpensesStr)} min={10000} max={200000} step={5000} aria-label="Monthly Expenses Slider"/>
                  </div>
                  {/* Existing Retirement Savings */}
                  <div className="space-y-3">
                    <Label htmlFor="existingSavings" className="flex items-center gap-1"><Wallet className="h-4 w-4 text-slate-500"/> Existing Retirement Savings</Label>
                    <div className="flex items-center gap-4">
                      <Input id="existingSavings" type="text" inputMode="decimal" value={existingSavingsStr} onChange={handleInputChange(setExistingSavingsStr, 100000000)} placeholder="e.g., 500000" max={100000000} className="flex-grow"/>
                      <span className="text-sm text-slate-500 font-semibold min-w-[80px] text-right">{formatCurrency(existingSavings)}</span>
                    </div>
                    <Slider value={[existingSavings]} onValueChange={handleSliderChange(setExistingSavingsStr)} min={0} max={10000000} step={100000} aria-label="Existing Savings Slider"/>
                  </div>
               </div>

              {/* <Separator className="my-6" /> */} {/* Temporarily commented out */} 
              <div className="pt-4 border-t border-slate-200 mt-6"> 
                <h3 className="text-lg font-semibold text-slate-700 mb-4">Assumptions</h3>
                {/* Pre-Retirement Return, Inflation, Post-Retirement Return ... */} 
                 {/* Expected Return On Savings (Pre-Retirement) */}
                  <div className="space-y-3 mb-6">
                    <Label htmlFor="expectedReturnOnSavings">Expected Annual Return (Pre-Retirement %)</Label>
                    <div className="flex items-center gap-4">
                      <Input id="expectedReturnOnSavings" type="text" inputMode="decimal" value={expectedReturnOnSavingsStr} onChange={handleInputChange(setExpectedReturnOnSavingsStr, 30)} placeholder="e.g., 10" max={30} step={0.1} className="flex-grow"/>
                      <span className="text-sm text-slate-500 font-semibold min-w-[40px] text-right">{parseFloat(expectedReturnOnSavingsStr) || 0}%</span>
                    </div>
                    <Slider value={[expectedReturnOnSavings * 100]} onValueChange={(v) => handleSliderChange(setExpectedReturnOnSavingsStr)([v[0]])} min={1} max={20} step={0.5} aria-label="Expected Return On Savings Slider"/>
                  </div>
                  {/* Expected Inflation Rate */} 
                  <div className="space-y-3 mb-6">
                    <Label htmlFor="inflationRate">Expected Inflation Rate (%)</Label>
                    <div className="flex items-center gap-4">
                      <Input id="inflationRate" type="text" inputMode="decimal" value={inflationRateStr} onChange={handleInputChange(setInflationRateStr, 20)} placeholder="e.g., 6" max={20} step={0.1} className="flex-grow"/>
                      <span className="text-sm text-slate-500 font-semibold min-w-[40px] text-right">{parseFloat(inflationRateStr) || 0}%</span>
                    </div>
                    <Slider value={[inflationRate * 100]} onValueChange={(v) => handleSliderChange(setInflationRateStr)([v[0]])} min={1} max={15} step={0.5} aria-label="Inflation Rate Slider"/>
                  </div>
                  {/* Post-Retirement Return Rate */} 
                  <div className="space-y-3">
                    <Label htmlFor="postRetirementReturn">Expected Return (Post-Retirement %)</Label>
                    <div className="flex items-center gap-4">
                      <Input id="postRetirementReturn" type="text" inputMode="decimal" value={postRetirementReturnStr} onChange={handleInputChange(setPostRetirementReturnStr, 15)} placeholder="e.g., 7" max={15} step={0.1} className="flex-grow"/>
                      <span className="text-sm text-slate-500 font-semibold min-w-[40px] text-right">{parseFloat(postRetirementReturnStr) || 0}%</span>
                    </div>
                    <Slider value={[postRetirementReturn * 100]} onValueChange={(v) => handleSliderChange(setPostRetirementReturnStr)([v[0]])} min={1} max={12} step={0.5} aria-label="Post-Retirement Return Slider"/>
                  </div>
               </div>
            </div>

            {/* Results Section (lg:col-span-2 for wider display) */}
            <div className="lg:col-span-2 space-y-6">
              {/* Summary Results Card */}
              <Card className="bg-slate-50 border-slate-200">
                 <CardHeader>
                     <CardTitle className="text-xl text-primary">Retirement Goal Summary</CardTitle>
                 </CardHeader>
                 <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="text-center p-4 rounded-lg bg-white border">
                         <p className="text-sm text-slate-500 mb-1">Years to Retirement</p>
                         <p className="text-2xl font-semibold text-slate-800">{yearsToRetirement > 0 ? `${yearsToRetirement} Years` : "-"}</p>
                     </div>
                      <div className="text-center p-4 rounded-lg bg-white border">
                         <p className="text-sm text-slate-500 mb-1">Monthly Expenses at Retirement</p>
                         <p className="text-2xl font-semibold text-slate-800">{formatCurrency(expensesAtRetirement)}</p>
                     </div>
                     <div className="text-center p-4 rounded-lg bg-white border sm:col-span-2">
                         <p className="text-sm text-slate-500 mb-1">Target Retirement Corpus</p>
                         <p className="text-3xl font-bold text-primary">{formatCurrency(requiredCorpus)}</p>
                     </div>
                 </CardContent>
              </Card>

              {/* Savings Projection Card */}
              <Card className="bg-slate-50 border-slate-200">
                 <CardHeader>
                     <CardTitle className="text-xl text-primary">Savings Projection</CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-4">
                      <div>
                         <p className="text-sm text-slate-500">Future Value of Existing Savings</p>
                         <p className="text-lg font-semibold text-slate-700">{formatCurrency(futureValueOfSavings)}</p>
                      </div>
                       {/* <Separator /> */} {/* Temporarily commented out */} 
                       <div className="border-t border-slate-200 pt-4">
                         <p className="text-sm text-slate-500">Corpus Shortfall / Surplus</p>
                         <p className={cn(
                             "text-lg font-semibold",
                             // Color red if shortfall > 0, green otherwise
                             corpusShortfall > 0 ? "text-red-600" : "text-green-600"
                             )}>
                              {/* Display shortfall amount if > 0, otherwise calculate and display surplus amount */}
                             {formatCurrency(corpusShortfall > 0 ? corpusShortfall : futureValueOfSavings - requiredCorpus)}
                             {/* Label as Shortfall or Surplus */}
                             {corpusShortfall > 0 ? " (Shortfall)" : " (Surplus)"}
                         </p>
                      </div>
                      {/* <Separator /> */} {/* Temporarily commented out */} 
                      <div className="pt-4 border-t border-slate-200 mt-4">
                        <p className="text-sm text-slate-500">Required Additional Monthly Savings</p>
                        <p className="text-2xl font-bold text-primary">
                          {corpusShortfall > 0 ? formatCurrency(requiredMonthlySavings) : formatCurrency(0)}
                         </p>
                         {corpusShortfall <= 0 && futureValueOfSavings > 0 && (
                             <p className="text-xs text-green-600 mt-1">Your existing savings are projected to meet your goal.</p>
                         )}
                       </div>
                 </CardContent>
              </Card>

                {/* Chart Placeholder Card */}
                <Card className="bg-slate-50 border-slate-200">
                    <CardHeader>
                        <CardTitle className="text-xl text-primary flex items-center gap-2">
                            <LineChart className="h-5 w-5"/> Projection Chart
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="h-60 flex items-center justify-center text-slate-400">
                        <p>(Chart visualization coming soon)</p>
                    </CardContent>
                </Card>

               <p className="text-xs text-slate-400 pt-4 text-center">*Calculations use standard financial formulas and provided assumptions. Market conditions and personal circumstances vary. Consult a financial advisor for personalized advice.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RetirementPlannerPage; 