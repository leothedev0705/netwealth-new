'use client'

import { PiggyBank } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function SWPCalculator() {
  const [initialInvestment, setInitialInvestment] = useState<number>(1000000)
  const [monthlyWithdrawal, setMonthlyWithdrawal] = useState<number>(10000)
  const [expectedReturn, setExpectedReturn] = useState<number>(8)
  const [timePeriod, setTimePeriod] = useState<number>(15)
  const [result, setResult] = useState<{
    totalWithdrawal: number
    remainingCorpus: number
    totalReturns: number
  } | null>(null)

  const calculateSWP = () => {
    const monthlyRate = expectedReturn / (12 * 100)
    const months = timePeriod * 12
    const totalWithdrawal = monthlyWithdrawal * months
    
    // Calculate remaining corpus using SWP formula
    const remainingCorpus = initialInvestment * Math.pow(1 + monthlyRate, months) -
      monthlyWithdrawal * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate)
    
    const totalReturns = remainingCorpus + totalWithdrawal - initialInvestment

    setResult({
      totalWithdrawal: Math.round(totalWithdrawal),
      remainingCorpus: Math.round(remainingCorpus),
      totalReturns: Math.round(totalReturns)
    })
  }

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight flex items-center gap-3">
          <PiggyBank className="h-10 w-10" />
          SWP Calculator
        </h1>
        <p className="mt-2 text-muted-foreground text-lg">
          Plan your Systematic Withdrawal Plan and estimate your regular income
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Investment Details</CardTitle>
            <CardDescription>Enter your withdrawal plan parameters</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="initial">Initial Investment (₹)</Label>
              <Input
                id="initial"
                type="number"
                value={initialInvestment}
                onChange={(e) => setInitialInvestment(Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="monthly">Monthly Withdrawal (₹)</Label>
              <Input
                id="monthly"
                type="number"
                value={monthlyWithdrawal}
                onChange={(e) => setMonthlyWithdrawal(Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="return">Expected Annual Return (%)</Label>
              <Input
                id="return"
                type="number"
                value={expectedReturn}
                onChange={(e) => setExpectedReturn(Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Time Period (Years)</Label>
              <Input
                id="time"
                type="number"
                value={timePeriod}
                onChange={(e) => setTimePeriod(Number(e.target.value))}
              />
            </div>
            <Button onClick={calculateSWP} className="w-full">Calculate</Button>
          </CardContent>
        </Card>

        {result && (
          <Card>
            <CardHeader>
              <CardTitle>Results</CardTitle>
              <CardDescription>Your withdrawal plan projection</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Total Withdrawal</Label>
                <div className="text-2xl font-bold">₹ {result.totalWithdrawal.toLocaleString()}</div>
              </div>
              <div className="space-y-2">
                <Label>Total Returns</Label>
                <div className="text-2xl font-bold text-green-600">
                  ₹ {result.totalReturns.toLocaleString()}
                </div>
              </div>
              <div className="space-y-2">
                <Label>Remaining Corpus</Label>
                <div className="text-3xl font-bold text-primary">
                  ₹ {result.remainingCorpus.toLocaleString()}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
} 