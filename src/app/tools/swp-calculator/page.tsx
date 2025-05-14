'use client'

import React, { useState, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Calculator, IndianRupee, Percent, Calendar, Info } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export default function SWPCalculator() {
  const [initialInvestmentStr, setInitialInvestmentStr] = useState<string>("1000000");
  const [monthlyWithdrawalStr, setMonthlyWithdrawalStr] = useState<string>("10000");
  const [expectedReturnStr, setExpectedReturnStr] = useState<string>("8");
  const [timePeriodStr, setTimePeriodStr] = useState<string>("15");

  const initialInvestment = useMemo(() => parseFloat(initialInvestmentStr) || 0, [initialInvestmentStr]);
  const monthlyWithdrawal = useMemo(() => parseFloat(monthlyWithdrawalStr) || 0, [monthlyWithdrawalStr]);
  const expectedReturn = useMemo(() => parseFloat(expectedReturnStr) || 0, [expectedReturnStr]);
  const timePeriod = useMemo(() => parseInt(timePeriodStr) || 0, [timePeriodStr]);

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

  const calculateSWP = () => {
    const monthlyRate = expectedReturn / (12 * 100);
    const months = timePeriod * 12;
    const totalWithdrawal = monthlyWithdrawal * months;
    
    // Calculate remaining corpus using SWP formula
    const remainingCorpus = initialInvestment * Math.pow(1 + monthlyRate, months) -
      monthlyWithdrawal * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
    
    const totalReturns = remainingCorpus + totalWithdrawal - initialInvestment;

    return {
      totalWithdrawal: Math.round(totalWithdrawal),
      remainingCorpus: Math.round(remainingCorpus),
      totalReturns: Math.round(totalReturns)
    };
  };

  const result = useMemo(() => calculateSWP(), [initialInvestment, monthlyWithdrawal, expectedReturn, timePeriod]);

  return (
    <div className="bg-gradient-to-br from-slate-50 via-white to-slate-100 min-h-screen py-16 md:py-24 px-6">
      <div className="container mx-auto max-w-4xl">
        <Card className="shadow-lg border-slate-200">
          <CardHeader className="bg-slate-50 border-b border-slate-200 p-6">
            <CardTitle className="text-2xl md:text-3xl font-bold text-slate-800 flex items-center gap-2">
              <Calculator className="h-7 w-7 text-primary" />
              SWP Calculator
            </CardTitle>
            <CardDescription className="text-slate-500 mt-1">
              Calculate your Systematic Withdrawal Plan and estimate your regular income stream
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-8">
              <div className="space-y-3">
                <Label htmlFor="initialInvestment" className="text-slate-700 font-medium flex items-center gap-2">
                  <IndianRupee className="h-4 w-4" /> Initial Investment
                </Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="initialInvestment"
                    type="text"
                    inputMode="decimal"
                    value={initialInvestmentStr}
                    onChange={handleInputChange(setInitialInvestmentStr, 10000000)}
                    placeholder="e.g., 1000000"
                    className="flex-grow"
                  />
                  <span className="text-sm text-slate-500 font-semibold min-w-[80px] text-right font-sans">
                    {formatCurrency(initialInvestment)}
                  </span>
                </div>
                <Slider
                  value={[initialInvestment]}
                  onValueChange={handleSliderChange(setInitialInvestmentStr)}
                  min={100000}
                  max={10000000}
                  step={100000}
                  aria-label="Initial Investment Slider"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="monthlyWithdrawal" className="text-slate-700 font-medium flex items-center gap-2">
                  <IndianRupee className="h-4 w-4" /> Monthly Withdrawal
                </Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="monthlyWithdrawal"
                    type="text"
                    inputMode="decimal"
                    value={monthlyWithdrawalStr}
                    onChange={handleInputChange(setMonthlyWithdrawalStr, 1000000)}
                    placeholder="e.g., 10000"
                    className="flex-grow"
                  />
                  <span className="text-sm text-slate-500 font-semibold min-w-[80px] text-right font-sans">
                    {formatCurrency(monthlyWithdrawal)}
                  </span>
                </div>
                <Slider
                  value={[monthlyWithdrawal]}
                  onValueChange={handleSliderChange(setMonthlyWithdrawalStr)}
                  min={5000}
                  max={500000}
                  step={5000}
                  aria-label="Monthly Withdrawal Slider"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="expectedReturn" className="text-slate-700 font-medium flex items-center gap-2">
                  <Percent className="h-4 w-4" /> Expected Annual Return (%)
                </Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="expectedReturn"
                    type="text"
                    inputMode="decimal"
                    value={expectedReturnStr}
                    onChange={handleInputChange(setExpectedReturnStr, 30)}
                    placeholder="e.g., 8"
                    className="flex-grow"
                  />
                  <span className="text-sm text-slate-500 font-semibold min-w-[40px] text-right font-sans">
                    {expectedReturn}%
                  </span>
                </div>
                <Slider
                  value={[expectedReturn]}
                  onValueChange={handleSliderChange(setExpectedReturnStr)}
                  min={1}
                  max={30}
                  step={0.5}
                  aria-label="Expected Return Slider"
                />
                <p className="text-xs text-slate-500 mt-2 px-1">
                  Consider conservative returns for withdrawal plans to ensure sustainability of your corpus
                </p>
              </div>

              <div className="space-y-3">
                <Label htmlFor="timePeriod" className="text-slate-700 font-medium flex items-center gap-2">
                  <Calendar className="h-4 w-4" /> Time Period (Years)
                </Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="timePeriod"
                    type="text"
                    inputMode="decimal"
                    value={timePeriodStr}
                    onChange={handleInputChange(setTimePeriodStr, 40)}
                    placeholder="e.g., 15"
                    className="flex-grow"
                  />
                  <span className="text-sm text-slate-500 font-semibold min-w-[60px] text-right font-sans">
                    {timePeriod} Yr
                  </span>
                </div>
                <Slider
                  value={[timePeriod]}
                  onValueChange={handleSliderChange(setTimePeriodStr)}
                  min={1}
                  max={40}
                  step={1}
                  aria-label="Time Period Slider"
                />
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-slate-50 rounded-lg p-6 md:p-8 flex flex-col justify-center items-center text-center border border-slate-200 space-y-6">
                <div className="w-full">
                  <p className="text-sm text-slate-500 mb-1">Total Withdrawal</p>
                  <p className="text-2xl font-medium text-slate-700">{formatCurrency(result.totalWithdrawal)}</p>
                </div>
                <div className="w-full border-t border-slate-200 pt-4">
                  <p className="text-sm text-slate-500 mb-1">Total Returns</p>
                  <p className="text-2xl font-medium text-green-600">{formatCurrency(result.totalReturns)}</p>
                </div>
                <div className="w-full border-t border-slate-200 pt-4">
                  <p className="text-sm text-slate-500 mb-1">Remaining Corpus</p>
                  <p className="text-3xl md:text-4xl font-semibold text-primary">{formatCurrency(result.remainingCorpus)}</p>
                </div>
                <p className="text-xs text-slate-400 pt-4">*Calculations are estimates based on inputs and do not guarantee future returns.</p>
              </div>

              <Alert className="bg-blue-50 text-blue-800 border-blue-200">
                <Info className="h-4 w-4 text-blue-600" />
                <AlertTitle className="text-blue-800">Understanding SWP</AlertTitle>
                <AlertDescription className="text-blue-700">
                  A Systematic Withdrawal Plan (SWP) allows you to withdraw a fixed amount regularly while keeping your remaining investment growing. The success of an SWP depends on choosing a sustainable withdrawal rate that allows your corpus to last through your intended period.
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-8 shadow-md border-slate-200">
          <CardHeader className="bg-slate-50 border-b border-slate-200 p-6">
            <CardTitle className="text-xl md:text-2xl font-bold text-slate-800">
              Tips for Sustainable Withdrawals
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 md:p-8 space-y-4 text-slate-700 text-sm leading-relaxed">
            <ul className="list-disc space-y-2 pl-5 text-slate-600">
              <li>Start with a conservative withdrawal rate (typically 4-6% annually)</li>
              <li>Consider inflation when planning your withdrawal strategy</li>
              <li>Maintain a diversified portfolio to balance growth and stability</li>
              <li>Review and adjust your withdrawal rate periodically based on market performance</li>
              <li>Keep an emergency fund separate from your SWP corpus</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 