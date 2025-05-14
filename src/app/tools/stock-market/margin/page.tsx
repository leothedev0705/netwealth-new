'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Percent, IndianRupee, AlertTriangle, Info } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function MarginCalculator() {
  const [initialMarginStr, setInitialMarginStr] = useState<string>("100000");
  const [leverageStr, setLeverageStr] = useState<string>("5");
  const [entryPriceStr, setEntryPriceStr] = useState<string>("100");
  const [stopLossPriceStr, setStopLossPriceStr] = useState<string>("95");

  const initialMargin = useMemo(() => parseFloat(initialMarginStr) || 0, [initialMarginStr]);
  const leverage = useMemo(() => parseFloat(leverageStr) || 0, [leverageStr]);
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

  const calculateMargin = () => {
    if (!initialMargin || !leverage || !entryPrice || !stopLossPrice) {
      return {
        totalPositionSize: 0,
        requiredMargin: 0,
        maxLoss: 0,
        maxLossPercent: 0,
        shares: 0
      };
    }

    const totalPositionSize = initialMargin * leverage;
    const shares = Math.floor(totalPositionSize / entryPrice);
    const maxLoss = shares * Math.abs(entryPrice - stopLossPrice);
    const maxLossPercent = (maxLoss / initialMargin) * 100;
    const requiredMargin = totalPositionSize / leverage;

    return {
      totalPositionSize: Math.round(totalPositionSize),
      requiredMargin: Math.round(requiredMargin),
      maxLoss: Math.round(maxLoss),
      maxLossPercent: Number(maxLossPercent.toFixed(2)),
      shares: shares
    };
  };

  const result = useMemo(() => calculateMargin(), [initialMargin, leverage, entryPrice, stopLossPrice]);

  return (
    <div className="bg-gradient-to-br from-slate-50 via-white to-slate-100 min-h-screen py-16 md:py-24 px-6">
      <div className="container mx-auto max-w-4xl">
        <Card className="shadow-lg border-slate-200">
          <CardHeader className="bg-slate-50 border-b border-slate-200 p-6">
            <CardTitle className="text-2xl md:text-3xl font-bold text-slate-800 flex items-center gap-2">
              <Percent className="h-7 w-7 text-primary" />
              Margin Calculator
            </CardTitle>
            <CardDescription className="text-slate-500 mt-1">
              Calculate margin requirements and potential risks for leveraged trading
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-8">
              <div className="space-y-3">
                <Label htmlFor="initialMargin" className="text-slate-700 font-medium flex items-center gap-2">
                  <IndianRupee className="h-4 w-4" /> Initial Margin
                </Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="initialMargin"
                    type="text"
                    inputMode="decimal"
                    value={initialMarginStr}
                    onChange={handleInputChange(setInitialMarginStr, 10000000)}
                    placeholder="e.g., 100000"
                    className="flex-grow"
                  />
                  <span className="text-sm text-slate-500 font-semibold min-w-[80px] text-right font-sans">
                    {formatCurrency(initialMargin)}
                  </span>
                </div>
                <Slider
                  value={[initialMargin]}
                  onValueChange={handleSliderChange(setInitialMarginStr)}
                  min={10000}
                  max={1000000}
                  step={10000}
                  aria-label="Initial Margin Slider"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="leverage" className="text-slate-700 font-medium flex items-center gap-2">
                  <Percent className="h-4 w-4" /> Leverage
                </Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="leverage"
                    type="text"
                    inputMode="decimal"
                    value={leverageStr}
                    onChange={handleInputChange(setLeverageStr, 20)}
                    placeholder="e.g., 5"
                    className="flex-grow"
                  />
                  <span className="text-sm text-slate-500 font-semibold min-w-[40px] text-right font-sans">
                    {leverage}x
                  </span>
                </div>
                <Slider
                  value={[leverage]}
                  onValueChange={handleSliderChange(setLeverageStr)}
                  min={1}
                  max={20}
                  step={1}
                  aria-label="Leverage Slider"
                />
                <p className="text-xs text-slate-500 mt-2 px-1">
                  Higher leverage means higher risk and potential returns
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
                  <p className="text-sm text-slate-500 mb-1">Total Position Size</p>
                  <p className="text-3xl md:text-4xl font-bold text-primary">{formatCurrency(result.totalPositionSize)}</p>
                </div>
                <div className="w-full border-t border-slate-200 pt-4">
                  <p className="text-sm text-slate-500 mb-1">Required Margin</p>
                  <p className="text-2xl font-medium text-slate-700">{formatCurrency(result.requiredMargin)}</p>
                </div>
                <div className="w-full border-t border-slate-200 pt-4">
                  <p className="text-sm text-slate-500 mb-1">Maximum Loss</p>
                  <p className="text-2xl font-medium text-red-600">
                    {formatCurrency(result.maxLoss)} ({result.maxLossPercent}%)
                  </p>
                </div>
                <div className="w-full border-t border-slate-200 pt-4">
                  <p className="text-sm text-slate-500 mb-1">Number of Shares</p>
                  <p className="text-xl font-medium text-slate-700">{result.shares.toLocaleString()}</p>
                </div>
                <p className="text-xs text-slate-400 pt-4">*Excludes trading costs and slippage</p>
              </div>

              <Alert className="bg-blue-50 text-blue-800 border-blue-200">
                <Info className="h-4 w-4 text-blue-600" />
                <AlertTitle className="text-blue-800">Margin Trading Risks</AlertTitle>
                <AlertDescription className="text-blue-700">
                  Margin trading amplifies both gains and losses. Always use proper risk management and maintain adequate margin to avoid liquidation.
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-8 shadow-md border-slate-200">
          <CardHeader className="bg-slate-50 border-b border-slate-200 p-6">
            <CardTitle className="text-xl md:text-2xl font-bold text-slate-800">
              Margin Trading Tips
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 md:p-8 space-y-4 text-slate-700 text-sm leading-relaxed">
            <ul className="list-disc space-y-2 pl-5 text-slate-600">
              <li>Never use maximum leverage available</li>
              <li>Keep adequate buffer margin to avoid liquidation</li>
              <li>Use stop-loss orders to limit potential losses</li>
              <li>Monitor margin utilization regularly</li>
              <li>Consider reducing position size in volatile markets</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 