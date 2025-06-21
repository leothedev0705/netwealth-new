'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { IndianRupee, Percent, CalendarDays, Calculator, Clock, Wallet } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const LoanPrepaymentCalculator = () => {
  // State for input values
  const [loanAmountStr, setLoanAmountStr] = useState<string>("1000000"); // 10 Lakhs
  const [annualRateStr, setAnnualRateStr] = useState<string>("8.5");
  const [yearsStr, setYearsStr] = useState<string>("20");
  const [prepaymentAmountStr, setPrepaymentAmountStr] = useState<string>("200000");
  const [prepaymentMonthStr, setPrepaymentMonthStr] = useState<string>("24"); // After 2 years
  const [prepaymentOption, setPrepaymentOption] = useState<'reduce_emi' | 'reduce_tenure'>('reduce_tenure');

  // Derived numeric values
  const loanAmount = parseFloat(loanAmountStr) || 0;
  const annualRate = parseFloat(annualRateStr) || 0;
  const years = parseInt(yearsStr) || 0;
  const prepaymentAmount = parseFloat(prepaymentAmountStr) || 0;
  const prepaymentMonth = parseInt(prepaymentMonthStr) || 0;

  // Results state
  const [result, setResult] = useState<{
    originalEmi: number;
    originalTotalInterest: number;
    originalTotalPayment: number;
    newEmi: number;
    newTotalInterest: number;
    newTotalPayment: number;
    newTenure: number;
    savings: number;
    chartData: any;
  } | null>(null);

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

  const calculatePrepayment = () => {
    const principal = loanAmount;
    const ratePerMonth = annualRate / (12 * 100);
    const totalMonths = years * 12;

    // Calculate original EMI
    const originalEmi = principal * ratePerMonth * Math.pow(1 + ratePerMonth, totalMonths) / 
      (Math.pow(1 + ratePerMonth, totalMonths) - 1);
    
    const originalTotalPayment = originalEmi * totalMonths;
    const originalTotalInterest = originalTotalPayment - principal;

    // Calculate outstanding loan balance at prepayment month
    let outstandingPrincipal = principal;
    let totalInterestPaid = 0;
    let totalPrincipalPaid = 0;
    
    for (let i = 1; i <= prepaymentMonth; i++) {
      const interestForMonth = outstandingPrincipal * ratePerMonth;
      const principalForMonth = originalEmi - interestForMonth;
      
      outstandingPrincipal -= principalForMonth;
      totalInterestPaid += interestForMonth;
      totalPrincipalPaid += principalForMonth;
    }

    // Apply prepayment
    outstandingPrincipal = Math.max(0, outstandingPrincipal - prepaymentAmount);
    
    let newEmi = originalEmi;
    let newTenure = totalMonths - prepaymentMonth;
    
    if (prepaymentOption === 'reduce_emi') {
      // Recalculate EMI with same tenure
      newEmi = outstandingPrincipal * ratePerMonth * Math.pow(1 + ratePerMonth, newTenure) / 
        (Math.pow(1 + ratePerMonth, newTenure) - 1);
    } else {
      // Calculate new tenure with same EMI
      newTenure = Math.ceil(Math.log(originalEmi / (originalEmi - outstandingPrincipal * ratePerMonth)) / 
        Math.log(1 + ratePerMonth));
    }
    
    const newTotalPayment = (prepaymentMonth * originalEmi) + (newTenure * newEmi) + prepaymentAmount;
    const newTotalInterest = newTotalPayment - principal;
    const savings = originalTotalInterest - newTotalInterest;

    // Prepare chart data
    const chartLabels = ['Original Loan', 'With Prepayment'];
    const chartData = {
      labels: chartLabels,
      datasets: [
        {
          label: 'Principal',
          data: [principal, principal],
          backgroundColor: 'rgba(255, 159, 64, 0.8)',
          borderColor: 'rgba(255, 159, 64, 1)',
          borderWidth: 1,
        },
        {
          label: 'Interest',
          data: [originalTotalInterest, newTotalInterest],
          backgroundColor: 'rgba(255, 99, 132, 0.8)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
        }
      ]
    };

    setResult({
      originalEmi: Math.round(originalEmi),
      originalTotalInterest: Math.round(originalTotalInterest),
      originalTotalPayment: Math.round(originalTotalPayment),
      newEmi: Math.round(newEmi),
      newTotalInterest: Math.round(newTotalInterest),
      newTotalPayment: Math.round(newTotalPayment),
      newTenure: Math.round(newTenure / 12 * 100) / 100, // Convert to years with 2 decimal places
      savings: Math.round(savings),
      chartData
    });
  };

  useEffect(() => {
    calculatePrepayment();
  }, []);

  return (
    <div className="bg-gradient-to-br from-orange-50 via-white to-orange-50 min-h-screen py-16 md:py-24 px-6">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <Wallet className="h-8 w-8 text-orange-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">Loan Prepayment Calculator</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Calculate how prepaying your loan can reduce your tenure or EMI and save on interest payments.
          </p>
        </div>
        
        <Card className="w-full shadow-xl border-orange-100 overflow-hidden">
          <CardHeader className="bg-orange-50 border-b border-orange-100 p-6">
            <CardTitle className="text-2xl md:text-3xl font-bold text-orange-800 flex items-center gap-2">
              <Calculator className="h-7 w-7 text-orange-500" />
              Loan Prepayment Calculator
            </CardTitle>
            <CardDescription className="text-orange-700/70 mt-1">
              Calculate how prepaying your loan can reduce your tenure or EMI
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Input Section */}
              <div className="lg:col-span-1 space-y-6">
                {/* Loan Amount */}
                <div className="space-y-3">
                  <Label htmlFor="loanAmount" className="text-slate-700 font-medium flex items-center gap-2">
                    <IndianRupee className="h-4 w-4 text-orange-500" /> Loan Amount
                  </Label>
                  <div className="flex items-center gap-4">
                    <Input
                      id="loanAmount"
                      type="text"
                      inputMode="decimal"
                      value={loanAmountStr}
                      onChange={handleInputChange(setLoanAmountStr, 100000000)}
                      placeholder="e.g., 1000000"
                      className="flex-grow"
                    />
                    <span className="text-sm text-slate-500 font-semibold min-w-[80px] text-right">
                      {formatCurrency(loanAmount)}
                    </span>
                  </div>
                  <Slider
                    value={[loanAmount]}
                    onValueChange={handleSliderChange(setLoanAmountStr)}
                    min={100000}
                    max={10000000}
                    step={10000}
                    className="[&>span]:bg-orange-500"
                  />
                </div>

                {/* Annual Interest Rate */}
                <div className="space-y-3">
                  <Label htmlFor="annualRate" className="text-slate-700 font-medium flex items-center gap-2">
                    <Percent className="h-4 w-4 text-orange-500" /> Annual Interest Rate (%)
                  </Label>
                  <div className="flex items-center gap-4">
                    <Input
                      id="annualRate"
                      type="text"
                      inputMode="decimal"
                      value={annualRateStr}
                      onChange={handleInputChange(setAnnualRateStr, 25)}
                      placeholder="e.g., 8.5"
                      className="flex-grow"
                    />
                    <span className="text-sm text-slate-500 font-semibold min-w-[40px] text-right">
                      {annualRate}%
                    </span>
                  </div>
                  <Slider
                    value={[annualRate]}
                    onValueChange={handleSliderChange(setAnnualRateStr)}
                    min={1}
                    max={20}
                    step={0.1}
                    className="[&>span]:bg-orange-500"
                  />
                </div>

                {/* Loan Tenure */}
                <div className="space-y-3">
                  <Label htmlFor="years" className="text-slate-700 font-medium flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-orange-500" /> Loan Tenure (Years)
                  </Label>
                  <div className="flex items-center gap-4">
                    <Input
                      id="years"
                      type="text"
                      inputMode="numeric"
                      value={yearsStr}
                      onChange={handleInputChange(setYearsStr, 30)}
                      placeholder="e.g., 20"
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
                    className="[&>span]:bg-orange-500"
                  />
                </div>

                {/* Prepayment Amount */}
                <div className="space-y-3">
                  <Label htmlFor="prepaymentAmount" className="text-slate-700 font-medium flex items-center gap-2">
                    <Wallet className="h-4 w-4 text-orange-500" /> Prepayment Amount
                  </Label>
                  <div className="flex items-center gap-4">
                    <Input
                      id="prepaymentAmount"
                      type="text"
                      inputMode="decimal"
                      value={prepaymentAmountStr}
                      onChange={handleInputChange(setPrepaymentAmountStr, loanAmount)}
                      placeholder="e.g., 200000"
                      className="flex-grow"
                    />
                    <span className="text-sm text-slate-500 font-semibold min-w-[80px] text-right">
                      {formatCurrency(prepaymentAmount)}
                    </span>
                  </div>
                  <Slider
                    value={[prepaymentAmount]}
                    onValueChange={handleSliderChange(setPrepaymentAmountStr)}
                    min={10000}
                    max={loanAmount / 2}
                    step={10000}
                    className="[&>span]:bg-orange-500"
                  />
                </div>

                {/* Prepayment After (months) */}
                <div className="space-y-3">
                  <Label htmlFor="prepaymentMonth" className="text-slate-700 font-medium flex items-center gap-2">
                    <Clock className="h-4 w-4 text-orange-500" /> Prepayment After (months)
                  </Label>
                  <div className="flex items-center gap-4">
                    <Input
                      id="prepaymentMonth"
                      type="text"
                      inputMode="numeric"
                      value={prepaymentMonthStr}
                      onChange={handleInputChange(setPrepaymentMonthStr, years * 12 - 1)}
                      placeholder="e.g., 24"
                      className="flex-grow"
                    />
                    <span className="text-sm text-slate-500 font-semibold min-w-[80px] text-right">
                      {prepaymentMonth} months
                    </span>
                  </div>
                  <Slider
                    value={[prepaymentMonth]}
                    onValueChange={handleSliderChange(setPrepaymentMonthStr)}
                    min={1}
                    max={years * 12 - 1}
                    step={1}
                    className="[&>span]:bg-orange-500"
                  />
                </div>

                {/* Prepayment Option */}
                <div className="space-y-3">
                  <Label className="text-slate-700 font-medium">Prepayment Option</Label>
                  <div className="flex space-x-4">
                    <Button
                      variant={prepaymentOption === 'reduce_tenure' ? "default" : "outline"}
                      onClick={() => setPrepaymentOption('reduce_tenure')}
                      className={prepaymentOption === 'reduce_tenure' ? "bg-orange-500 hover:bg-orange-600" : "border-orange-200 text-orange-700"}
                    >
                      Reduce Tenure
                    </Button>
                    <Button
                      variant={prepaymentOption === 'reduce_emi' ? "default" : "outline"}
                      onClick={() => setPrepaymentOption('reduce_emi')}
                      className={prepaymentOption === 'reduce_emi' ? "bg-orange-500 hover:bg-orange-600" : "border-orange-200 text-orange-700"}
                    >
                      Reduce EMI
                    </Button>
                  </div>
                </div>

                <Button 
                  onClick={calculatePrepayment} 
                  className="w-full bg-orange-500 hover:bg-orange-600"
                >
                  Calculate
                </Button>
              </div>

              {/* Results Section */}
              <div className="lg:col-span-2 space-y-6">
                {result && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Original Loan Details */}
                      <Card className="border-orange-100">
                        <CardHeader className="bg-orange-50 border-b border-orange-100 py-3 px-4">
                          <CardTitle className="text-lg font-semibold text-orange-800">Original Loan Details</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 space-y-3">
                          <div className="flex justify-between">
                            <span className="text-slate-600">EMI</span>
                            <span className="font-semibold">{formatCurrency(result.originalEmi)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600">Total Interest</span>
                            <span className="font-semibold">{formatCurrency(result.originalTotalInterest)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600">Total Payment</span>
                            <span className="font-semibold">{formatCurrency(result.originalTotalPayment)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600">Loan Tenure</span>
                            <span className="font-semibold">{years} years</span>
                          </div>
                        </CardContent>
                      </Card>

                      {/* After Prepayment Details */}
                      <Card className="border-orange-100">
                        <CardHeader className="bg-orange-50 border-b border-orange-100 py-3 px-4">
                          <CardTitle className="text-lg font-semibold text-orange-800">After Prepayment</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 space-y-3">
                          <div className="flex justify-between">
                            <span className="text-slate-600">EMI</span>
                            <span className="font-semibold">{formatCurrency(result.newEmi)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600">Total Interest</span>
                            <span className="font-semibold">{formatCurrency(result.newTotalInterest)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600">Total Payment</span>
                            <span className="font-semibold">{formatCurrency(result.newTotalPayment)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600">New Tenure</span>
                            <span className="font-semibold">{result.newTenure} years</span>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Savings */}
                    <Card className="border-green-100 bg-green-50">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <span className="text-green-800 font-medium">Your Total Savings</span>
                          <span className="text-2xl font-bold text-green-700">{formatCurrency(result.savings)}</span>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Chart */}
                    <Card className="border-orange-100">
                      <CardHeader className="bg-orange-50 border-b border-orange-100 py-3 px-4">
                        <CardTitle className="text-lg font-semibold text-orange-800">Loan Comparison</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4">
                        <div className="h-64">
                          <Line
                            data={{
                              labels: ['Original', 'With Prepayment'],
                              datasets: [
                                {
                                  label: 'Principal',
                                  data: [loanAmount, loanAmount],
                                  backgroundColor: 'rgba(255, 159, 64, 0.5)',
                                  borderColor: 'rgba(255, 159, 64, 1)',
                                  borderWidth: 2,
                                },
                                {
                                  label: 'Interest',
                                  data: [result.originalTotalInterest, result.newTotalInterest],
                                  backgroundColor: 'rgba(255, 99, 132, 0.5)',
                                  borderColor: 'rgba(255, 99, 132, 1)',
                                  borderWidth: 2,
                                },
                                {
                                  label: 'Total Payment',
                                  data: [result.originalTotalPayment, result.newTotalPayment],
                                  backgroundColor: 'rgba(54, 162, 235, 0.5)',
                                  borderColor: 'rgba(54, 162, 235, 1)',
                                  borderWidth: 2,
                                }
                              ]
                            }}
                            options={{
                              responsive: true,
                              maintainAspectRatio: false,
                              scales: {
                                y: {
                                  beginAtZero: true,
                                  ticks: {
                                    callback: function(value: string | number) {
                                      return '₹' + (Number(value) / 1000) + 'K';
                                    }
                                  }
                                }
                              }
                            }}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoanPrepaymentCalculator;