'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Scale, IndianRupee, Target, Info } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function RiskRewardCalculator() {
  const [entryPriceStr, setEntryPriceStr] = useState<string>("100");
  const [targetPriceStr, setTargetPriceStr] = useState<string>("120");
  const [stopLossPriceStr, setStopLossPriceStr] = useState<string>("90");
  const [positionSizeStr, setPositionSizeStr] = useState<string>("10000");

  const entryPrice = useMemo(() => parseFloat(entryPriceStr) || 0, [entryPriceStr]);
  const targetPrice = useMemo(() => parseFloat(targetPriceStr) || 0, [targetPriceStr]);
  const stopLossPrice = useMemo(() => parseFloat(stopLossPriceStr) || 0, [stopLossPriceStr]);
  const positionSize = useMemo(() => parseFloat(positionSizeStr) || 0, [positionSizeStr]);

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

  const calculateRiskReward = () => {
    if (!entryPrice || !targetPrice || !stopLossPrice || !positionSize || entryPrice <= 0) {
      return {
        riskRewardRatio: 0,
        potentialProfit: 0,
        potentialLoss: 0,
        profitPercent: 0,
        lossPercent: 0,
        shares: 0
      };
    }

    const shares = Math.floor(positionSize / entryPrice);
    const potentialProfit = shares * (targetPrice - entryPrice);
    const potentialLoss = shares * (entryPrice - stopLossPrice);
    const profitPercent = ((targetPrice - entryPrice) / entryPrice) * 100;
    const lossPercent = ((entryPrice - stopLossPrice) / entryPrice) * 100;
    const riskRewardRatio = potentialProfit / (potentialLoss || 1);

    return {
      riskRewardRatio: Number(riskRewardRatio.toFixed(2)),
      potentialProfit: Math.round(potentialProfit),
      potentialLoss: Math.round(potentialLoss),
      profitPercent: Number(profitPercent.toFixed(2)),
      lossPercent: Number(lossPercent.toFixed(2)),
      shares: shares
    };
  };

  const result = useMemo(() => calculateRiskReward(), [entryPrice, targetPrice, stopLossPrice, positionSize]);

  return (
    <div className="bg-gradient-to-br from-slate-50 via-white to-slate-100 min-h-screen py-16 md:py-24 px-6">
      <div className="container mx-auto max-w-4xl">
        <Card className="shadow-lg border-slate-200">
          <CardHeader className="bg-slate-50 border-b border-slate-200 p-6">
            <CardTitle className="text-2xl md:text-3xl font-bold text-slate-800 flex items-center gap-2">
              <Scale className="h-7 w-7 text-primary" />
              Risk/Reward Calculator
            </CardTitle>
            <CardDescription className="text-slate-500 mt-1">
              Calculate risk/reward ratio and potential returns for your trades
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-8">
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
                <Slider
                  value={[entryPrice]}
                  onValueChange={handleSliderChange(setEntryPriceStr)}
                  min={1}
                  max={1000}
                  step={1}
                  aria-label="Entry Price Slider"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="targetPrice" className="text-slate-700 font-medium flex items-center gap-2">
                  <Target className="h-4 w-4" /> Target Price
                </Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="targetPrice"
                    type="text"
                    inputMode="decimal"
                    value={targetPriceStr}
                    onChange={handleInputChange(setTargetPriceStr, 100000)}
                    placeholder="e.g., 120"
                    className="flex-grow"
                  />
                  <span className="text-sm text-slate-500 font-semibold min-w-[80px] text-right font-sans">
                    {formatCurrency(targetPrice)}
                  </span>
                </div>
                <Slider
                  value={[targetPrice]}
                  onValueChange={handleSliderChange(setTargetPriceStr)}
                  min={1}
                  max={1000}
                  step={1}
                  aria-label="Target Price Slider"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="stopLossPrice" className="text-slate-700 font-medium flex items-center gap-2">
                  <IndianRupee className="h-4 w-4" /> Stop Loss Price
                </Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="stopLossPrice"
                    type="text"
                    inputMode="decimal"
                    value={stopLossPriceStr}
                    onChange={handleInputChange(setStopLossPriceStr, 100000)}
                    placeholder="e.g., 90"
                    className="flex-grow"
                  />
                  <span className="text-sm text-slate-500 font-semibold min-w-[80px] text-right font-sans">
                    {formatCurrency(stopLossPrice)}
                  </span>
                </div>
                <Slider
                  value={[stopLossPrice]}
                  onValueChange={handleSliderChange(setStopLossPriceStr)}
                  min={1}
                  max={1000}
                  step={1}
                  aria-label="Stop Loss Price Slider"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="positionSize" className="text-slate-700 font-medium flex items-center gap-2">
                  <IndianRupee className="h-4 w-4" /> Position Size
                </Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="positionSize"
                    type="text"
                    inputMode="decimal"
                    value={positionSizeStr}
                    onChange={handleInputChange(setPositionSizeStr, 10000000)}
                    placeholder="e.g., 10000"
                    className="flex-grow"
                  />
                  <span className="text-sm text-slate-500 font-semibold min-w-[80px] text-right font-sans">
                    {formatCurrency(positionSize)}
                  </span>
                </div>
                <Slider
                  value={[positionSize]}
                  onValueChange={handleSliderChange(setPositionSizeStr)}
                  min={1000}
                  max={100000}
                  step={1000}
                  aria-label="Position Size Slider"
                />
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-slate-50 rounded-lg p-6 md:p-8 flex flex-col justify-center items-center text-center border border-slate-200 space-y-6">
                <div className="w-full">
                  <p className="text-sm text-slate-500 mb-1">Risk/Reward Ratio</p>
                  <p className="text-3xl md:text-4xl font-bold text-primary">1:{result.riskRewardRatio}</p>
                </div>
                <div className="w-full border-t border-slate-200 pt-4">
                  <p className="text-sm text-slate-500 mb-1">Potential Profit</p>
                  <p className="text-2xl font-medium text-green-600">
                    {formatCurrency(result.potentialProfit)} ({result.profitPercent}%)
                  </p>
                </div>
                <div className="w-full border-t border-slate-200 pt-4">
                  <p className="text-sm text-slate-500 mb-1">Potential Loss</p>
                  <p className="text-2xl font-medium text-red-600">
                    {formatCurrency(result.potentialLoss)} ({result.lossPercent}%)
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
                <AlertTitle className="text-blue-800">Understanding Risk/Reward</AlertTitle>
                <AlertDescription className="text-blue-700">
                  A risk/reward ratio of 1:3 or higher is generally considered good for trading. This means your potential profit is 3 times your potential loss.
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
              <li>Always set stop-loss orders to limit potential losses</li>
              <li>Consider using a minimum 1:2 risk/reward ratio</li>
              <li>Don't risk more than 1-2% of your portfolio per trade</li>
              <li>Account for trading costs in your calculations</li>
              <li>Use proper position sizing based on your risk tolerance</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 