'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { TrendingUp, IndianRupee, Calendar, Info } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function CAGRCalculator() {
  const [initialInvestmentStr, setInitialInvestmentStr] = useState<string>("100000");
  const [finalValueStr, setFinalValueStr] = useState<string>("200000");
  const [yearsStr, setYearsStr] = useState<string>("5");

  const initialInvestment = useMemo(() => parseFloat(initialInvestmentStr) || 0, [initialInvestmentStr]);
  const finalValue = useMemo(() => parseFloat(finalValueStr) || 0, [finalValueStr]);
  const years = useMemo(() => parseFloat(yearsStr) || 0, [yearsStr]);

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

  const calculateCAGR = () => {
    if (!initialInvestment || !finalValue || !years || initialInvestment <= 0 || finalValue <= 0 || years <= 0) {
      return {
        cagr: 0,
        absoluteReturn: 0,
        absoluteReturnPercent: 0,
        annualizedReturn: 0
      };
    }

    const cagr = (Math.pow(finalValue / initialInvestment, 1 / years) - 1) * 100;
    const absoluteReturn = finalValue - initialInvestment;
    const absoluteReturnPercent = (absoluteReturn / initialInvestment) * 100;
    const annualizedReturn = absoluteReturn / years;

    return {
      cagr: Number(cagr.toFixed(2)),
      absoluteReturn: Math.round(absoluteReturn),
      absoluteReturnPercent: Number(absoluteReturnPercent.toFixed(2)),
      annualizedReturn: Math.round(annualizedReturn)
    };
  };

  const result = useMemo(() => calculateCAGR(), [initialInvestment, finalValue, years]);

  return (
    <div className="bg-gradient-to-br from-slate-50 via-white to-slate-100 min-h-screen py-16 md:py-24 px-6">
      <div className="container mx-auto max-w-4xl">
        <Card className="shadow-lg border-slate-200">
          <CardHeader className="bg-slate-50 border-b border-slate-200 p-6">
            <CardTitle className="text-2xl md:text-3xl font-bold text-slate-800 flex items-center gap-2">
              <TrendingUp className="h-7 w-7 text-primary" />
              CAGR Calculator
            </CardTitle>
            <CardDescription className="text-slate-500 mt-1">
              Calculate Compound Annual Growth Rate (CAGR) for your investments
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
                    placeholder="e.g., 100000"
                    className="flex-grow"
                  />
                  <span className="text-sm text-slate-500 font-semibold min-w-[80px] text-right font-sans">
                    {formatCurrency(initialInvestment)}
                  </span>
                </div>
                <Slider
                  value={[initialInvestment]}
                  onValueChange={handleSliderChange(setInitialInvestmentStr)}
                  min={1000}
                  max={1000000}
                  step={1000}
                  aria-label="Initial Investment Slider"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="finalValue" className="text-slate-700 font-medium flex items-center gap-2">
                  <IndianRupee className="h-4 w-4" /> Final Value
                </Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="finalValue"
                    type="text"
                    inputMode="decimal"
                    value={finalValueStr}
                    onChange={handleInputChange(setFinalValueStr, 100000000)}
                    placeholder="e.g., 200000"
                    className="flex-grow"
                  />
                  <span className="text-sm text-slate-500 font-semibold min-w-[80px] text-right font-sans">
                    {formatCurrency(finalValue)}
                  </span>
                </div>
                <Slider
                  value={[finalValue]}
                  onValueChange={handleSliderChange(setFinalValueStr)}
                  min={1000}
                  max={2000000}
                  step={1000}
                  aria-label="Final Value Slider"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="years" className="text-slate-700 font-medium flex items-center gap-2">
                  <Calendar className="h-4 w-4" /> Time Period (Years)
                </Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="years"
                    type="text"
                    inputMode="decimal"
                    value={yearsStr}
                    onChange={handleInputChange(setYearsStr, 50)}
                    placeholder="e.g., 5"
                    className="flex-grow"
                  />
                  <span className="text-sm text-slate-500 font-semibold min-w-[60px] text-right font-sans">
                    {years} Yr
                  </span>
                </div>
                <Slider
                  value={[years]}
                  onValueChange={handleSliderChange(setYearsStr)}
                  min={1}
                  max={30}
                  step={1}
                  aria-label="Years Slider"
                />
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-slate-50 rounded-lg p-6 md:p-8 flex flex-col justify-center items-center text-center border border-slate-200 space-y-6">
                <div className="w-full">
                  <p className="text-sm text-slate-500 mb-1">CAGR</p>
                  <p className="text-3xl md:text-4xl font-bold text-primary">{result.cagr}%</p>
                </div>
                <div className="w-full border-t border-slate-200 pt-4">
                  <p className="text-sm text-slate-500 mb-1">Absolute Return</p>
                  <p className="text-2xl font-medium text-green-600">
                    {formatCurrency(result.absoluteReturn)} ({result.absoluteReturnPercent}%)
                  </p>
                </div>
                <div className="w-full border-t border-slate-200 pt-4">
                  <p className="text-sm text-slate-500 mb-1">Annualized Return</p>
                  <p className="text-2xl font-medium text-slate-700">{formatCurrency(result.annualizedReturn)}/year</p>
                </div>
                <p className="text-xs text-slate-400 pt-4">*CAGR provides a smoothed annual growth rate</p>
              </div>

              <Alert className="bg-blue-50 text-blue-800 border-blue-200">
                <Info className="h-4 w-4 text-blue-600" />
                <AlertTitle className="text-blue-800">Understanding CAGR</AlertTitle>
                <AlertDescription className="text-blue-700">
                  CAGR represents the geometric progression ratio that provides a constant rate of return over the time period. It smooths out volatility and gives you a clearer picture of investment performance.
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-8 shadow-md border-slate-200">
          <CardHeader className="bg-slate-50 border-b border-slate-200 p-6">
            <CardTitle className="text-xl md:text-2xl font-bold text-slate-800">
              CAGR Interpretation Tips
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 md:p-8 space-y-4 text-slate-700 text-sm leading-relaxed">
            <ul className="list-disc space-y-2 pl-5 text-slate-600">
              <li>CAGR assumes a steady growth rate and smooths out volatility</li>
              <li>Compare CAGR with relevant benchmarks (e.g., market indices)</li>
              <li>Consider the investment timeframe when interpreting CAGR</li>
              <li>Use CAGR alongside other metrics for a complete analysis</li>
              <li>Remember that past performance doesn't guarantee future returns</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 