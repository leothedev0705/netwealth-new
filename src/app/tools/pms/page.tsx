'use client'

import { Landmark, PieChart, TrendingUp, Users, Briefcase, Shield } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

// Mock data for PMS strategies
const pmsStrategies = [
  {
    name: "Multi-Cap Growth Strategy",
    description: "A diversified portfolio focusing on high-growth companies across market capitalizations",
    minInvestment: "50 Lakhs",
    returns: {
      "1Y": 18.5,
      "3Y": 15.8,
      "5Y": 16.2
    },
    risk: "High",
    features: [
      "Active portfolio management",
      "Quarterly rebalancing",
      "Focus on quality growth stocks"
    ]
  },
  {
    name: "Value Discovery Strategy",
    description: "Identifies undervalued companies with strong fundamentals and growth potential",
    minInvestment: "50 Lakhs",
    returns: {
      "1Y": 16.2,
      "3Y": 14.5,
      "5Y": 15.8
    },
    risk: "Moderate to High",
    features: [
      "Bottom-up stock selection",
      "Focus on intrinsic value",
      "Long-term investment horizon"
    ]
  },
  {
    name: "Focused Leaders Strategy",
    description: "Concentrated portfolio of market leaders with sustainable competitive advantages",
    minInvestment: "1 Crore",
    returns: {
      "1Y": 20.4,
      "3Y": 17.2,
      "5Y": 18.5
    },
    risk: "High",
    features: [
      "Concentrated portfolio of 15-20 stocks",
      "High-conviction ideas",
      "Focus on market leaders"
    ]
  }
]

const features = [
  {
    icon: <Users className="h-6 w-6" />,
    title: "Dedicated Portfolio Manager",
    description: "Personal attention from experienced portfolio managers"
  },
  {
    icon: <PieChart className="h-6 w-6" />,
    title: "Customized Strategy",
    description: "Investment strategy tailored to your goals and risk profile"
  },
  {
    icon: <TrendingUp className="h-6 w-6" />,
    title: "Active Management",
    description: "Dynamic portfolio adjustments based on market conditions"
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Risk Management",
    description: "Robust risk management framework and regular monitoring"
  },
  {
    icon: <Briefcase className="h-6 w-6" />,
    title: "Transparent Reporting",
    description: "Detailed performance reports and portfolio updates"
  }
]

export default function PMSPage() {
  return (
    <div className="container py-10">
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight flex items-center gap-3">
          <Landmark className="h-10 w-10" />
          Portfolio Management Services
        </h1>
        <p className="mt-2 text-muted-foreground text-lg">
          Professional portfolio management for high-value personalized investments
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
        {features.map((feature, index) => (
          <Card key={index} className="bg-muted/50">
            <CardHeader>
              <div className="mb-2 w-fit rounded-lg bg-primary/10 p-2 text-primary">
                {feature.icon}
              </div>
              <CardTitle className="text-xl">{feature.title}</CardTitle>
              <CardDescription>{feature.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      {/* PMS Strategies */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6">Investment Strategies</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {pmsStrategies.map((strategy, index) => (
            <Card key={index} className="flex flex-col">
              <CardHeader>
                <CardTitle>{strategy.name}</CardTitle>
                <CardDescription>{strategy.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="mb-4">
                  <p className="text-sm text-muted-foreground">Minimum Investment</p>
                  <p className="text-lg font-semibold">₹ {strategy.minInvestment}</p>
                </div>
                <div className="mb-4">
                  <p className="text-sm text-muted-foreground">Risk Profile</p>
                  <p className="text-lg font-semibold">{strategy.risk}</p>
                </div>
                <div className="mb-6">
                  <p className="text-sm text-muted-foreground mb-2">Historical Returns</p>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">1Y</p>
                      <p className="text-lg font-semibold text-green-600">
                        {strategy.returns["1Y"]}%
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">3Y</p>
                      <p className="text-lg font-semibold text-green-600">
                        {strategy.returns["3Y"]}%
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">5Y</p>
                      <p className="text-lg font-semibold text-green-600">
                        {strategy.returns["5Y"]}%
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">Key Features</p>
                  <ul className="space-y-1">
                    {strategy.features.map((feature, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground">
                        • {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <Card className="bg-primary text-primary-foreground">
        <CardHeader>
          <CardTitle className="text-2xl">Start Your Investment Journey</CardTitle>
          <CardDescription className="text-primary-foreground/80">
            Connect with our experts to create your personalized investment strategy
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="secondary" size="lg">
            Schedule a Consultation
          </Button>
        </CardContent>
      </Card>
    </div>
  )
} 