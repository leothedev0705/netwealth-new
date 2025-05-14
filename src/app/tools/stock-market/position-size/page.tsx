'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Calculator, IndianRupee, Percent, AlertTriangle, Info } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function PositionSizeCalculator() {
  const [accountSizeStr, setAccountSizeStr] = useState<string>("100000");
  const [riskPercentStr, setRiskPercentStr] = useState<string>("1");
  const [entryPriceStr, setEntryPriceStr] = useState<string>("100");
  const [stopLossPriceStr, setStopLossPriceStr] = useState<string>("95");

  const accountSize = useMemo(() => parseFloat(accountSizeStr) || 0, [accountSizeStr]);
  const riskPercent = useMemo(() => parseFloat(riskPercentStr) || 0, [riskPercentStr]);
  const entryPrice = useMemo(() => parseFloat(entryPriceStr) || 0, [entryPriceStr]);
  const stopLossPrice = useMemo(() => parseFloat(stopLossPriceStr) || 0, [stopLossPriceStr]);

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

  const calculatePositionSize = () => {
    if (!entryPrice || !stopLossPrice || entryPrice <= stopLossPrice) {
      return {
        riskAmount: 0,
        positionSize: 0,
        shares: 0,
        riskPerShare: 0
      };
    }

    const riskAmount = (accountSize * (riskPercent / 100));
    const riskPerShare = Math.abs(entryPrice - stopLossPrice);
    const shares = Math.floor(riskAmount / riskPerShare);
    const positionSize = shares * entryPrice;

    return {
      riskAmount: Math.round(riskAmount),
      positionSize: Math.round(positionSize),
      shares: shares,
      riskPerShare: riskPerShare
    };
  };

  const result = useMemo(() => calculatePositionSize(), [accountSize, riskPercent, entryPrice, stopLossPrice]);

  return (
    <div className="bg-gradient-to-br from-slate-50 via-white to-slate-100 min-h-screen py-16 md:py-24 px-6">
      <div className="container mx-auto max-w-4xl">
        <Card className="shadow-lg border-slate-200">
          <CardHeader className="bg-slate-50 border-b border-slate-200 p-6">
            <CardTitle className="text-2xl md:text-3xl font-bold text-slate-800 flex items-center gap-2">
              <Calculator className="h-7 w-7 text-primary" />
              Position Size Calculator
            </CardTitle>
            <CardDescription className="text-slate-500 mt-1">
              Calculate optimal position sizes based on your risk management rules
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-8">
              <div className="space-y-3">
                <Label htmlFor="accountSize" className="text-slate-700 font-medium flex items-center gap-2">
                  <IndianRupee className="h-4 w-4" /> Account Size
                </Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="accountSize"
                    type="text"
                    inputMode="decimal"
                    value={accountSizeStr}
                    onChange={handleInputChange(setAccountSizeStr, 10000000)}
                    placeholder="e.g., 100000"
                    className="flex-grow"
                  />
                  <span className="text-sm text-slate-500 font-semibold min-w-[80px] text-right font-sans">
                    {formatCurrency(accountSize)}
                  </span>
                </div>
                <Slider
                  value={[accountSize]}
                  onValueChange={handleSliderChange(setAccountSizeStr)}
                  min={10000}
                  max={1000000}
                  step={10000}
                  aria-label="Account Size Slider"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="riskPercent" className="text-slate-700 font-medium flex items-center gap-2">
                  <Percent className="h-4 w-4" /> Risk Per Trade (%)
                </Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="riskPercent"
                    type="text"
                    inputMode="decimal"
                    value={riskPercentStr}
                    onChange={handleInputChange(setRiskPercentStr, 5)}
                    placeholder="e.g., 1"
                    className="flex-grow"
                  />
                  <span className="text-sm text-slate-500 font-semibold min-w-[40px] text-right font-sans">
                    {riskPercent}%
                  </span>
                </div>
                <Slider
                  value={[riskPercent]}
                  onValueChange={handleSliderChange(setRiskPercentStr)}
                  min={0.1}
                  max={5}
                  step={0.1}
                  aria-label="Risk Percentage Slider"
                />
                <p className="text-xs text-slate-500 mt-2 px-1">
                  Professional traders typically risk 1-2% per trade to ensure account longevity
                </p>
              </div>

              <div className="space-y-3">
                <Label htmlFor="entryPrice" className="text-slate-700 font-medium flex items-center gap-2">
                  <IndianRupee className="h-4 w-4" /> Entry Price
                </Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="entryPrice"
                    type="text"
                    inputMode="decimal"
                    value={entryPriceStr}
                    onChange={handleInputChange(setEntryPriceStr, 100000)}
                    placeholder="e.g., 100"
                    className="flex-grow"
                  />
                  <span className="text-sm text-slate-500 font-semibold min-w-[80px] text-right font-sans">
                    {formatCurrency(entryPrice)}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="stopLossPrice" className="text-slate-700 font-medium flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" /> Stop Loss Price
                </Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="stopLossPrice"
                    type="text"
                    inputMode="decimal"
                    value={stopLossPriceStr}
                    onChange={handleInputChange(setStopLossPriceStr, 100000)}
                    placeholder="e.g., 95"
                    className="flex-grow"
                  />
                  <span className="text-sm text-slate-500 font-semibold min-w-[80px] text-right font-sans">
                    {formatCurrency(stopLossPrice)}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-slate-50 rounded-lg p-6 md:p-8 flex flex-col justify-center items-center text-center border border-slate-200 space-y-6">
                <div className="w-full">
                  <p className="text-sm text-slate-500 mb-1">Position Size</p>
                  <p className="text-3xl md:text-4xl font-bold text-primary">{formatCurrency(result.positionSize)}</p>
                </div>
                <div className="w-full border-t border-slate-200 pt-4">
                  <p className="text-sm text-slate-500 mb-1">Number of Shares</p>
                  <p className="text-2xl font-medium text-slate-700">{result.shares.toLocaleString()}</p>
                </div>
                <div className="w-full border-t border-slate-200 pt-4">
                  <p className="text-sm text-slate-500 mb-1">Risk Amount</p>
                  <p className="text-2xl font-medium text-red-600">{formatCurrency(result.riskAmount)}</p>
                </div>
                <div className="w-full border-t border-slate-200 pt-4">
                  <p className="text-sm text-slate-500 mb-1">Risk Per Share</p>
                  <p className="text-xl font-medium text-slate-700">{formatCurrency(result.riskPerShare)}</p>
                </div>
                <p className="text-xs text-slate-400 pt-4">*Calculations are rounded to the nearest share</p>
              </div>

              <Alert className="bg-blue-50 text-blue-800 border-blue-200">
                <Info className="h-4 w-4 text-blue-600" />
                <AlertTitle className="text-blue-800">Position Sizing Importance</AlertTitle>
                <AlertDescription className="text-blue-700">
                  Proper position sizing is crucial for risk management. It helps you maintain consistent risk across trades regardless of the stock price or stop loss distance, protecting your trading capital.
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-8 shadow-md border-slate-200">
          <CardHeader className="bg-slate-50 border-b border-slate-200 p-6">
            <CardTitle className="text-xl md:text-2xl font-bold text-slate-800">
              Risk Management Tips
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 md:p-8 space-y-4 text-slate-700 text-sm leading-relaxed">
            <ul className="list-disc space-y-2 pl-5 text-slate-600">
              <li>Never risk more than 1-2% of your account on a single trade</li>
              <li>Consider reducing position size in volatile market conditions</li>
              <li>Account for slippage in your calculations</li>
              <li>Use proper stop loss placement based on technical levels</li>
              <li>Adjust position size based on your win rate and risk-reward ratio</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 