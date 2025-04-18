'use client'

import React from 'react'

import { ArrowUpRight } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

interface Metric {
  label: string
  value: string
  change: string
}

interface Stock {
  name: string
  price: number
  change: string
}

interface MarketInsight {
  title: string
  metrics?: Metric[]
  stocks?: Stock[]
}

interface Tool {
  name: string
  description: string
  icon: React.ReactNode
  features: string[]
}

const tools: Tool[] = [
  {
    name: "Technical Analysis",
    description: "Advanced charting and technical indicators",
    icon: <ArrowUpRight className="h-6 w-6" />,
    features: [
      "Multiple chart types and timeframes",
      "Over 100+ technical indicators",
      "Drawing tools and annotations",
      "Custom indicator settings"
    ]
  },
  {
    name: "Market Scanner",
    description: "Real-time market screening tools",
    icon: <ArrowUpRight className="h-6 w-6" />,
    features: [
      "Pre-built scanning templates",
      "Custom scan criteria",
      "Real-time alerts",
      "Market breadth analysis"
    ]
  },
  {
    name: "Portfolio Tracker",
    description: "Track and analyze your investments",
    icon: <ArrowUpRight className="h-6 w-6" />,
    features: [
      "Real-time portfolio valuation",
      "Performance analytics",
      "Risk metrics",
      "Transaction history"
    ]
  },
  {
    name: "Trading Journal",
    description: "Document and analyze your trades",
    icon: <ArrowUpRight className="h-6 w-6" />,
    features: [
      "Trade logging and notes",
      "Performance metrics",
      "Strategy analysis",
      "Trade screenshots"
    ]
  }
]

const marketInsights: MarketInsight[] = [
  {
    title: "Market Overview",
    metrics: [
      { label: "Nifty 50", value: "19,425.35", change: "+0.62%" },
      { label: "Sensex", value: "64,958.69", change: "+0.59%" },
      { label: "Bank Nifty", value: "43,856.30", change: "+0.45%" }
    ]
  },
  {
    title: "Top Gainers",
    stocks: [
      { name: "TCS", price: 3450.75, change: "+2.8%" },
      { name: "Infosys", price: 1478.25, change: "+2.3%" },
      { name: "HDFC Bank", price: 1589.60, change: "+1.9%" }
    ]
  },
  {
    title: "Top Losers",
    stocks: [
      { name: "ITC", price: 438.90, change: "-1.5%" },
      { name: "Reliance", price: 2367.45, change: "-1.2%" },
      { name: "Bharti Airtel", price: 867.30, change: "-0.9%" }
    ]
  }
]

export default function StockMarketPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8">Stock Market Tools</h1>
      
      {/* Tools Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {tools.map((tool, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-4">
                {tool.icon}
                <div>
                  <CardTitle>{tool.name}</CardTitle>
                  <CardDescription>{tool.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2">
                {tool.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Market Insights Section */}
      <h2 className="text-3xl font-semibold mb-6">Market Insights</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {marketInsights.map((insight, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{insight.title}</CardTitle>
            </CardHeader>
            <CardContent>
              {insight.metrics && (
                <div className="space-y-4">
                  {insight.metrics.map((metric, idx) => (
                    <div key={idx} className="flex justify-between items-center">
                      <span className="text-gray-600">{metric.label}</span>
                      <div className="text-right">
                        <div className="font-semibold">{metric.value}</div>
                        <div className={metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}>
                          {metric.change}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {insight.stocks && (
                <div className="space-y-4">
                  {insight.stocks.map((stock, idx) => (
                    <div key={idx} className="flex justify-between items-center">
                      <span className="font-medium">{stock.name}</span>
                      <div className="text-right">
                        <div className="font-semibold">₹{stock.price.toFixed(2)}</div>
                        <div className={stock.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}>
                          {stock.change}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Call to Action */}
      <Card className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
        <CardContent className="py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-2">Ready to Start Trading?</h3>
              <p className="text-blue-100">Open your trading account today and access all our premium tools.</p>
            </div>
            <Button className="mt-4 md:mt-0 bg-white text-blue-700 hover:bg-blue-50">
              Open Account <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 