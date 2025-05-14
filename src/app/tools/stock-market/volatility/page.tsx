'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { BarChart3, Activity, Calendar, Info } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function VolatilityCalculator() {
  const [pricesStr, setPricesStr] = useState<string>("100,102,98,103,97,105,99");
  const [periodStr, setPeriodStr] = useState<string>("14");

  const prices = useMemo(() => {
    return pricesStr.split(',')
      .map(price => parseFloat(price.trim()))
      .filter(price => !isNaN(price));
  }, [pricesStr]);

  const period = useMemo(() => parseInt(periodStr) || 14, [periodStr]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || /^[\d,.\s]*$/.test(value)) {
      setPricesStr(value);
    }
  };

  const handlePeriodChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (value: number[]) => {
    setter(String(value[0]));
  };

  const calculateVolatility = () => {
    if (prices.length < 2) {
      return {
        standardDeviation: 0,
        averagePrice: 0,
        atr: 0,
        volatilityPercent: 0,
        priceRange: 0
      };
    }

    // Calculate Standard Deviation
    const averagePrice = prices.reduce((a, b) => a + b, 0) / prices.length;
    const squaredDiffs = prices.map(price => Math.pow(price - averagePrice, 2));
    const variance = squaredDiffs.reduce((a, b) => a + b, 0) / prices.length;
    const standardDeviation = Math.sqrt(variance);

    // Calculate ATR components
    const ranges = [];
    for (let i = 1; i < prices.length; i++) {
      const high = Math.max(prices[i], prices[i-1]);
      const low = Math.min(prices[i], prices[i-1]);
      ranges.push(high - low);
    }
    const atr = ranges.reduce((a, b) => a + b, 0) / ranges.length;

    // Calculate price range
    const priceRange = Math.max(...prices) - Math.min(...prices);

    // Calculate volatility as percentage
    const volatilityPercent = (standardDeviation / averagePrice) * 100;

    return {
      standardDeviation: Number(standardDeviation.toFixed(2)),
      averagePrice: Number(averagePrice.toFixed(2)),
      atr: Number(atr.toFixed(2)),
      volatilityPercent: Number(volatilityPercent.toFixed(2)),
      priceRange: Number(priceRange.toFixed(2))
    };
  };

  const result = useMemo(() => calculateVolatility(), [prices]);

  return (
    <div className="bg-gradient-to-br from-slate-50 via-white to-slate-100 min-h-screen py-16 md:py-24 px-6">
      <div className="container mx-auto max-w-4xl">
        <Card className="shadow-lg border-slate-200">
          <CardHeader className="bg-slate-50 border-b border-slate-200 p-6">
            <CardTitle className="text-2xl md:text-3xl font-bold text-slate-800 flex items-center gap-2">
              <BarChart3 className="h-7 w-7 text-primary" />
              Volatility Calculator
            </CardTitle>
            <CardDescription className="text-slate-500 mt-1">
              Calculate stock volatility using standard deviation and ATR
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-8">
              <div className="space-y-3">
                <Label htmlFor="prices" className="text-slate-700 font-medium flex items-center gap-2">
                  <Activity className="h-4 w-4" /> Price Series
                </Label>
                <div className="space-y-2">
                  <Input
                    id="prices"
                    type="text"
                    value={pricesStr}
                    onChange={handleInputChange}
                    placeholder="e.g., 100,102,98,103,97,105,99"
                    className="flex-grow font-mono"
                  />
                  <p className="text-xs text-slate-500">
                    Enter comma-separated price values
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="period" className="text-slate-700 font-medium flex items-center gap-2">
                  <Calendar className="h-4 w-4" /> ATR Period
                </Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="period"
                    type="text"
                    value={periodStr}
                    onChange={(e) => setPeriodStr(e.target.value)}
                    placeholder="e.g., 14"
                    className="flex-grow"
                  />
                  <span className="text-sm text-slate-500 font-semibold min-w-[60px] text-right font-sans">
                    {period} Days
                  </span>
                </div>
                <Slider
                  value={[period]}
                  onValueChange={handlePeriodChange(setPeriodStr)}
                  min={1}
                  max={30}
                  step={1}
                  aria-label="Period Slider"
                />
                <p className="text-xs text-slate-500 mt-2 px-1">
                  Standard ATR period is 14 days
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-slate-50 rounded-lg p-6 md:p-8 flex flex-col justify-center items-center text-center border border-slate-200 space-y-6">
                <div className="w-full">
                  <p className="text-sm text-slate-500 mb-1">Volatility</p>
                  <p className="text-3xl md:text-4xl font-bold text-primary">{result.volatilityPercent}%</p>
                </div>
                <div className="w-full border-t border-slate-200 pt-4">
                  <p className="text-sm text-slate-500 mb-1">Standard Deviation</p>
                  <p className="text-2xl font-medium text-slate-700">{result.standardDeviation}</p>
                </div>
                <div className="w-full border-t border-slate-200 pt-4">
                  <p className="text-sm text-slate-500 mb-1">Average True Range (ATR)</p>
                  <p className="text-2xl font-medium text-slate-700">{result.atr}</p>
                </div>
                <div className="w-full border-t border-slate-200 pt-4">
                  <p className="text-sm text-slate-500 mb-1">Price Range</p>
                  <p className="text-xl font-medium text-slate-700">{result.priceRange}</p>
                </div>
                <p className="text-xs text-slate-400 pt-4">*Based on {prices.length} price points</p>
              </div>

              <Alert className="bg-blue-50 text-blue-800 border-blue-200">
                <Info className="h-4 w-4 text-blue-600" />
                <AlertTitle className="text-blue-800">Understanding Volatility</AlertTitle>
                <AlertDescription className="text-blue-700">
                  Volatility measures price variation over time. Higher volatility indicates larger price swings and potentially higher risk. Use this alongside other indicators for better trading decisions.
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-8 shadow-md border-slate-200">
          <CardHeader className="bg-slate-50 border-b border-slate-200 p-6">
            <CardTitle className="text-xl md:text-2xl font-bold text-slate-800">
              Volatility Analysis Tips
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 md:p-8 space-y-4 text-slate-700 text-sm leading-relaxed">
            <ul className="list-disc space-y-2 pl-5 text-slate-600">
              <li>Higher volatility often means higher risk and potential reward</li>
              <li>Use ATR for setting stop-loss levels and position sizing</li>
              <li>Compare volatility across different timeframes</li>
              <li>Consider market conditions when interpreting volatility</li>
              <li>Use volatility to adjust your trading strategy and risk management</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 