'use client'

import { LineChart, Search, Filter, ArrowUpRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"

// Mock data for mutual funds
const mockFunds = [
  {
    name: "NetWealth Large Cap Growth Fund",
    category: "Large Cap",
    nav: 45.67,
    aum: "12,450 Cr",
    returns: {
      "1Y": 15.8,
      "3Y": 12.5,
      "5Y": 14.2
    },
    risk: "Moderate"
  },
  {
    name: "NetWealth Mid Cap Opportunities",
    category: "Mid Cap",
    nav: 38.92,
    aum: "5,680 Cr",
    returns: {
      "1Y": 22.4,
      "3Y": 18.9,
      "5Y": 16.8
    },
    risk: "High"
  },
  {
    name: "NetWealth Balanced Advantage",
    category: "Hybrid",
    nav: 28.45,
    aum: "8,920 Cr",
    returns: {
      "1Y": 12.6,
      "3Y": 10.8,
      "5Y": 11.5
    },
    risk: "Moderate"
  },
  {
    name: "NetWealth Tax Saver Fund",
    category: "ELSS",
    nav: 52.30,
    aum: "4,230 Cr",
    returns: {
      "1Y": 18.2,
      "3Y": 15.4,
      "5Y": 13.9
    },
    risk: "Moderate to High"
  }
]

export default function MutualFundsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredFunds = mockFunds.filter(fund => 
    fund.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === "All" || fund.category === selectedCategory)
  )

  const categories = ["All", "Large Cap", "Mid Cap", "Hybrid", "ELSS"]

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight flex items-center gap-3">
          <LineChart className="h-10 w-10" />
          Mutual Funds
        </h1>
        <p className="mt-2 text-muted-foreground text-lg">
          Explore and analyze mutual fund investments for your portfolio
        </p>
      </div>

      <div className="flex flex-col gap-8">
        {/* Search and Filter Section */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search mutual funds..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Funds List */}
        <div className="grid gap-6 md:grid-cols-2">
          {filteredFunds.map((fund, index) => (
            <Card key={index} className="hover:border-primary transition-colors">
              <CardHeader>
                <CardTitle className="flex justify-between items-start">
                  <span>{fund.name}</span>
                  <Button variant="ghost" size="icon">
                    <ArrowUpRight className="h-4 w-4" />
                  </Button>
                </CardTitle>
                <CardDescription>{fund.category} | {fund.risk} Risk</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">NAV</p>
                    <p className="text-lg font-semibold">₹ {fund.nav}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">AUM</p>
                    <p className="text-lg font-semibold">₹ {fund.aum}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-muted-foreground mb-2">Returns (%)</p>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">1Y</p>
                      <p className="text-lg font-semibold text-green-600">
                        {fund.returns["1Y"]}%
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">3Y</p>
                      <p className="text-lg font-semibold text-green-600">
                        {fund.returns["3Y"]}%
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">5Y</p>
                      <p className="text-lg font-semibold text-green-600">
                        {fund.returns["5Y"]}%
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
} 