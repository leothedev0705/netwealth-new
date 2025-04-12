'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { IndianRupee, Percent, Calendar, LineChart, Info } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const SIPCalculatorPage = () => {
  const [monthlyInvestmentStr, setMonthlyInvestmentStr] = useState<string>("10000");
  const [annualRateStr, setAnnualRateStr] = useState<string>("12");
  const [yearsStr, setYearsStr] = useState<string>("10");

  const monthlyInvestment = useMemo(() => parseFloat(monthlyInvestmentStr) || 0, [monthlyInvestmentStr]);
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

  const { totalInvestment, estimatedReturns, futureValue } = useMemo(() => {
    const monthlyRate = annualRate / 12 / 100;
    const months = years * 12;
    const totalInv = monthlyInvestment * months;

    if (monthlyInvestment <= 0 || annualRate < 0 || years <= 0 || months <= 0) {
        return {
            totalInvestment: 0,
            estimatedReturns: 0,
            futureValue: 0,
        };
    }

    if (monthlyRate === 0) {
       const fv = totalInv;
       return {
         totalInvestment: totalInv,
         estimatedReturns: 0,
         futureValue: fv,
       };
    }

    const fv = monthlyInvestment * (Math.pow(1 + monthlyRate, months) - 1) / monthlyRate * (1 + monthlyRate);
    const returns = fv - totalInv;

    return {
      totalInvestment: totalInv,
      estimatedReturns: returns,
      futureValue: fv,
    };
  }, [monthlyInvestment, annualRate, years]);

  return (
    <div className="bg-gradient-to-br from-slate-50 via-white to-slate-100 min-h-screen py-16 md:py-24 px-6">
      <div className="container mx-auto max-w-4xl">
        <Card className="w-full shadow-xl border-slate-200 overflow-hidden">
          <CardHeader className="bg-slate-50 border-b border-slate-200 p-6">
            <CardTitle className="text-2xl md:text-3xl font-bold text-slate-800 flex items-center gap-2">
              <LineChart className="h-7 w-7 text-primary" />
              SIP Calculator
            </CardTitle>
            <CardDescription className="text-slate-500 mt-1">
              Estimate the future value of your Systematic Investment Plan.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-8">
              <div className="space-y-3">
                <Label htmlFor="monthlyInvestment" className="text-slate-700 font-medium flex items-center gap-2">
                  <IndianRupee className="h-4 w-4" /> Monthly Investment
                </Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="monthlyInvestment"
                    type="text"
                    inputMode="decimal"
                    value={monthlyInvestmentStr}
                    onChange={handleInputChange(setMonthlyInvestmentStr, 1000000)}
                    placeholder="e.g., 10000"
                    max={1000000}
                    className="flex-grow"
                  />
                   <span className="text-sm text-slate-500 font-semibold min-w-[80px] text-right font-sans">{formatCurrency(monthlyInvestment)}</span>
                </div>
                <Slider
                  value={[monthlyInvestment]}
                  onValueChange={handleSliderChange(setMonthlyInvestmentStr)}
                  min={500}
                  max={100000}
                  step={500}
                  aria-label="Monthly Investment Slider"
                />
                <p className="text-xs text-slate-500 mt-2 px-1">Min. investment often ₹500-₹1000. Choose an amount you can invest consistently each month.</p>
              </div>

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
                  <span className="text-sm text-slate-500 font-semibold min-w-[40px] text-right font-sans">{annualRate}%</span>
                 </div>
                 <Slider
                  value={[annualRate]}
                  onValueChange={handleSliderChange(setAnnualRateStr)}
                  min={0}
                  max={30}
                  step={0.5}
                  aria-label="Annual Rate Slider"
                 />
                 <p className="text-xs text-slate-500 mt-2 px-1">
                   SIP returns are market-linked (e.g., equity MFs historically averaged 10-15%+) and are NOT guaranteed or fixed like FD rates. RBI doesn&apos;t set SIP rates. Enter a realistic expected rate based on the investment type (equity/debt/hybrid) and understand the associated risks.
                 </p>
              </div>

              <div className="space-y-3">
                <Label htmlFor="years" className="text-slate-700 font-medium flex items-center gap-2">
                  <Calendar className="h-4 w-4" /> Investment Period (Years)
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
                  <span className="text-sm text-slate-500 font-semibold min-w-[60px] text-right font-sans">{years} Yr</span>
                 </div>
                 <Slider
                  value={[years]}
                  onValueChange={handleSliderChange(setYearsStr)}
                  min={1}
                  max={40}
                  step={1}
                  aria-label="Investment Years Slider"
                 />
                 <p className="text-xs text-slate-500 mt-2 px-1">Long-term investing (10+ yrs) harnesses compounding. Align duration with your financial goals (e.g., retirement, education).</p>
              </div>
            </div>

            <div className="bg-slate-50 rounded-lg p-6 md:p-8 flex flex-col justify-center items-center text-center border border-slate-200 space-y-6">
              <div className="w-full">
                <p className="text-sm text-slate-500 mb-1">Total Investment</p>
                <p className="text-2xl font-medium text-slate-700 font-sans">{formatCurrency(totalInvestment)}</p>
              </div>
              <div className="w-full border-t border-slate-200 pt-4">
                <p className="text-sm text-slate-500 mb-1">Estimated Returns</p>
                <p className="text-2xl font-medium text-green-600 font-sans">{formatCurrency(estimatedReturns)}</p>
              </div>
               <div className="w-full border-t border-slate-200 pt-4">
                 <p className="text-sm text-slate-500 mb-1">Projected Future Value</p>
                 <p className="text-3xl md:text-4xl font-semibold text-primary font-sans">{formatCurrency(futureValue)}</p>
               </div>
               <p className="text-xs text-slate-400 pt-4">*Calculations are estimates based on inputs and do not guarantee future returns.</p>
            </div>

            <Alert className="mt-6 border-blue-200 bg-blue-50/50">
              <Info className="h-4 w-4 text-blue-600" />
              <AlertTitle className="text-blue-800">Understanding Your Results</AlertTitle>
              <AlertDescription className="text-blue-700">
                The total investment is simply your monthly contribution multiplied by the number of months. The estimated returns are calculated based on the expected annual rate, compounded monthly. Remember, past performance doesn&apos;t guarantee future returns, and actual market returns may vary. This calculator provides an estimate for illustrative purposes. For personalized advice, consider consulting a financial advisor.
              </AlertDescription>
            </Alert>

            <div className="mt-8 text-center">
              <p className="text-slate-600 mb-3">
                Ready to take the next step? Explore investment options aligned with your goals.
              </p>
               <a href="/services#investing" className="inline-block px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-medium">
                 Explore Investment Services
               </a>
            </div>
          </CardContent>
        </Card>

        <Card className="w-full mt-10 shadow-lg border-slate-200"> 
          <CardHeader className="bg-slate-50 border-b border-slate-200 p-6">
            <CardTitle className="text-xl md:text-2xl font-bold text-slate-800 flex items-center gap-2">
              Understanding Compound Interest
            </CardTitle>
             <CardDescription className="text-slate-500 mt-1">
              The &quot;magic&quot; behind long-term wealth creation.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 md:p-8 space-y-4 text-slate-700 text-sm leading-relaxed">
            <p>
              Compound interest, often called &quot;interest on interest,&quot; is the engine that drives significant wealth growth over time, especially with regular investments like SIPs.
            </p>
            <p>
              <strong>How it works:</strong> Instead of just earning returns on your initial investment (principal), you also start earning returns on the accumulated interest itself. In simple terms:
            </p>
            <ul className="list-disc space-y-2 pl-5 text-slate-600">
              <li>You invest money (your principal).</li>
              <li>You earn returns (interest) on that principal.</li>
              <li>In the next period, you earn returns on BOTH your original principal AND the interest already earned.</li>
              <li>This cycle repeats, causing your investment to grow at an accelerating rate.</li>
            </ul>
            <p>
              <strong>Why it matters for SIPs:</strong> With SIPs, you invest regularly (e.g., monthly). Compounding works powerfully here because each new investment starts earning returns, and previous investments continue to grow with their accumulated interest. The longer your investment horizon and the higher the rate of return, the more dramatic the effect of compounding becomes.
            </p>
            <p className="text-xs text-slate-500 pt-3">
              *This calculator demonstrates the potential effect of compounding based on your inputs. Remember that actual market returns are variable.*
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SIPCalculatorPage; 