'use client'

import React from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { LineChart, TrendingUp, Calculator, ArrowRight, BarChart3, Scale, Percent } from 'lucide-react'
import Link from 'next/link'

const tools = [
  {
    name: "Position Size Calculator",
    description: "Calculate optimal position sizes based on your risk tolerance, account size, and stop-loss levels.",
    icon: <Calculator className="h-6 w-6" />,
    href: "/tools/stock-market/position-size",
    color: "bg-blue-500/10 text-blue-500"
  },
  {
    name: "Risk/Reward Calculator",
    description: "Analyze potential trades by calculating risk-reward ratios, profit targets, and stop-loss levels.",
    icon: <Scale className="h-6 w-6" />,
    href: "/tools/stock-market/risk-reward",
    color: "bg-green-500/10 text-green-500"
  },
  {
    name: "CAGR Calculator",
    description: "Calculate Compound Annual Growth Rate for your investments over different time periods.",
    icon: <TrendingUp className="h-6 w-6" />,
    href: "/tools/stock-market/cagr",
    color: "bg-purple-500/10 text-purple-500"
  },
  {
    name: "Volatility Calculator",
    description: "Measure stock volatility using standard deviation and average true range (ATR) indicators.",
    icon: <BarChart3 className="h-6 w-6" />,
    href: "/tools/stock-market/volatility",
    color: "bg-orange-500/10 text-orange-500"
  },
  {
    name: "Margin Calculator",
    description: "Calculate required margin, leverage ratios, and potential profits/losses for margin trading.",
    icon: <Percent className="h-6 w-6" />,
    href: "/tools/stock-market/margin",
    color: "bg-red-500/10 text-red-500"
  }
]

export default function StockMarketTools() {
  return (
    <div className="bg-gradient-to-br from-slate-50 via-white to-slate-100 min-h-screen py-16 md:py-24 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <LineChart className="h-8 w-8 text-primary" />
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800">Stock Market Tools</h1>
          </div>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Professional-grade tools to help you make informed trading decisions and manage your portfolio effectively.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <Link key={tool.name} href={tool.href} className="block group">
              <Card className="h-full transition-all duration-300 hover:shadow-lg border-slate-200">
            <CardHeader>
                  <div className={`${tool.color} w-fit p-3 rounded-lg mb-4`}>
                {tool.icon}
                </div>
                  <CardTitle className="text-xl font-semibold text-slate-800 flex items-center justify-between">
                    {tool.name}
                    <ArrowRight className="h-5 w-5 text-slate-400 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
                  </CardTitle>
                  <CardDescription className="text-slate-600 mt-2">
                    {tool.description}
                  </CardDescription>
            </CardHeader>
          </Card>
            </Link>
        ))}
      </div>

        <Card className="mt-16 border-slate-200">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-slate-800">Why Use Our Stock Market Tools?</CardTitle>
            <CardDescription className="text-slate-600">
              Professional features designed to enhance your trading and investment decisions
            </CardDescription>
            </CardHeader>
            <CardContent>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <h3 className="font-semibold text-slate-800 mb-2">Precise Calculations</h3>
                <p className="text-slate-600 text-sm">
                  Get accurate results using industry-standard formulas and methodologies
                </p>
                        </div>
              <div className="text-center">
                <h3 className="font-semibold text-slate-800 mb-2">Risk Management</h3>
                <p className="text-slate-600 text-sm">
                  Make informed decisions with comprehensive risk assessment tools
                </p>
                      </div>
              <div className="text-center">
                <h3 className="font-semibold text-slate-800 mb-2">User-Friendly Design</h3>
                <p className="text-slate-600 text-sm">
                  Intuitive interface with real-time calculations and clear visualizations
                </p>
                      </div>
                    </div>
            </CardContent>
          </Card>
      </div>
    </div>
  )
} 