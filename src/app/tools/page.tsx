import { Calculator, PiggyBank, Building2, Landmark, LineChart, Coins, CreditCard } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from 'next/link';

const tools = [
  {
    name: "SIP Calculator",
    description: "Calculate your Systematic Investment Plan returns and understand the power of regular investing. Plan your investments better with detailed projections.",
    icon: <Calculator className="h-6 w-6" />,
    href: "/tools/sip-calculator",
    color: "bg-blue-500/10 text-blue-500"
  },
  {
    name: "Lumpsum Calculator",
    description: "Evaluate the future value of your one-time investments. See how your money can grow with the power of compound interest over time.",
    icon: <Coins className="h-6 w-6" />,
    href: "/tools/lumpsum-calculator",
    color: "bg-green-500/10 text-green-500"
  },
  {
    name: "Retirement Planner",
    description: "Plan your retirement with our comprehensive calculator. Estimate the corpus needed and track your progress towards a secure retirement.",
    icon: <Building2 className="h-6 w-6" />,
    href: "/tools/retirement-planner",
    color: "bg-purple-500/10 text-purple-500"
  },
  {
    name: "Financial Tools",
    description: "Access comprehensive financial calculators for loans, deposits, and investments. Make informed decisions with detailed projections and breakdowns.",
    icon: <Landmark className="h-6 w-6" />,
    href: "/tools/financial-tools",
    color: "bg-orange-500/10 text-orange-500"
  },
  {
    name: "Stock Market Tools",
    description: "Access comprehensive stock market analysis tools. Track market trends, analyze stocks, and make informed investment decisions.",
    icon: <LineChart className="h-6 w-6" />,
    href: "/tools/stock-market",
    color: "bg-red-500/10 text-red-500"
  },
  {
    name: "CIBIL Score",
    description: "Check your free CIBIL score and understand your creditworthiness. Learn how to improve your score and increase your chances of loan approval.",
    icon: <CreditCard className="h-6 w-6" />,
    href: "/tools/credit-score",
    color: "bg-blue-500/10 text-blue-500"
  },
  {
    name: "SWP Calculator",
    description: "Plan your systematic withdrawals with our SWP calculator. Understand how to structure regular withdrawals from your investments.",
    icon: <PiggyBank className="h-6 w-6" />,
    href: "/tools/swp-calculator",
    color: "bg-teal-500/10 text-teal-500"
  }
];

export default function ToolsPage() {
  return (
    <div className="bg-gradient-to-br from-green-50 via-white to-green-100 min-h-screen py-16 md:py-24 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-green-900 mb-4">Financial Planning Tools</h1>
          <p className="text-lg text-green-700">
            Powerful calculators and tools to help you make informed financial decisions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, index) => (
            <Link href={tool.href} key={index}>
              <Card className="h-full transition-all duration-300 hover:shadow-lg hover:scale-[1.02] cursor-pointer border-green-200">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg ${tool.color} flex items-center justify-center mb-4`}>
                    {tool.icon}
                  </div>
                  <CardTitle className="text-xl font-bold text-green-900">{tool.name}</CardTitle>
                  <CardDescription className="text-green-700 line-clamp-3">
                    {tool.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-primary font-medium">
                    Try Now →
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 