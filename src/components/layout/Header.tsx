'use client'; // Need client component for Sheet state

import React, { useState, lazy, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Menu } from 'lucide-react';
import { cn } from "@/lib/utils";

// Lazy load the Sheet component
const Sheet = lazy(() => import("@/components/ui/sheet").then(mod => ({ default: mod.Sheet })));
const SheetContent = lazy(() => import("@/components/ui/sheet").then(mod => ({ default: mod.SheetContent })));
const SheetHeader = lazy(() => import("@/components/ui/sheet").then(mod => ({ default: mod.SheetHeader })));
const SheetClose = lazy(() => import("@/components/ui/sheet").then(mod => ({ default: mod.SheetClose })));
const SheetTrigger = lazy(() => import("@/components/ui/sheet").then(mod => ({ default: mod.SheetTrigger })));
const SheetTitle = lazy(() => import("@/components/ui/sheet").then(mod => ({ default: mod.SheetTitle })));

// Import Calculator icon and new tool icons
import { Shield, TrendingUp, Home, LayoutGrid, Calculator, PiggyBank, Goal, Landmark, CreditCard, Wallet, BarChart, FileText, Briefcase, Heart, Umbrella, Percent, Clock, ArrowRight } from 'lucide-react';

// Define Service items for dropdown
const serviceItems: { title: string; href: string; description: string, icon: React.ElementType }[] = [
  {
    title: "Services Overview",
    href: "/services",
    description: "Explore our comprehensive wealth advisory solutions.",
    icon: LayoutGrid
  },
  {
    title: "Protection",
    href: "/services#protection",
    description: "Comprehensive insurance coverage for peace of mind.",
    icon: Shield
  },
  {
    title: "Investing",
    href: "/services#investing",
    description: "Strategic wealth management and investment solutions.",
    icon: TrendingUp
  },
  {
    title: "Borrowing",
    href: "/services#borrowing",
    description: "Personalized loan options to meet your financial needs.",
    icon: Home
  },
];

// Define Credit Card items for dropdown
const creditCardItems: { title: string; href: string; description?: string, icon?: React.ElementType }[] = [
  {
    title: "Popular Credit Card",
    href: "/services/credit-cards/popular",
    icon: CreditCard
  },
  {
    title: "HDFC Bank Credit Card",
    href: "/services/credit-cards/hdfc",
    icon: CreditCard
  },
  {
    title: "SBI Credit Card",
    href: "/services/credit-cards/sbi",
    icon: CreditCard
  },
  {
    title: "IDFC Bank Credit Card",
    href: "/services/credit-cards/idfc",
    icon: CreditCard
  },
  {
    title: "Axis Bank Credit Card",
    href: "/services/credit-cards/axis",
    icon: CreditCard
  },
  {
    title: "HSBC Bank Credit Card",
    href: "/services/credit-cards/hsbc",
    icon: CreditCard
  },
  {
    title: "AU Bank Credit Card",
    href: "/services/credit-cards/au",
    icon: CreditCard
  },
  {
    title: "American Express Credit Card",
    href: "/services/credit-cards/amex",
    icon: CreditCard
  },
  {
    title: "ICICI Bank Credit Card",
    href: "/services/credit-cards/icici",
    icon: CreditCard
  },
  {
    title: "IndusInd Bank Credit Cards",
    href: "/services/credit-cards/indusind",
    icon: CreditCard
  },
];

// Define loan items for dropdown
const loanItems: { title: string; href: string; description?: string, icon?: React.ElementType }[] = [
  {
    title: "Personal Loan",
    href: "/services/loans/personal",
    icon: Wallet
  },
  {
    title: "Business Loan",
    href: "/services/loans/business",
    icon: Briefcase
  },
  {
    title: "Home Loan",
    href: "/services/loans/home",
    icon: Home
  },
  {
    title: "Gold Loan",
    href: "/services/loans/gold",
    icon: PiggyBank
  },
  {
    title: "Loan Against Property",
    href: "/services/loans/property",
    icon: Home
  },
  {
    title: "Overdraft Facility",
    href: "/services/loans/overdraft",
    icon: Wallet
  },
  {
    title: "Loan On Credit Card",
    href: "/services/loans/credit-card",
    icon: CreditCard
  },
  {
    title: "Personal Loan By Amount",
    href: "/services/loans/personal-by-amount",
    icon: Wallet
  },
  {
    title: "Personal Loan Interest Rates",
    href: "/services/loans/personal-interest-rates",
    icon: Percent
  },
  {
    title: "Home Loan Balance Transfer",
    href: "/services/loans/home-balance-transfer",
    icon: ArrowRight
  },
];

// Define Insurance items for dropdown
const insuranceItems: { title: string; href: string; description?: string, icon?: React.ElementType }[] = [
  {
    title: "Health Insurance",
    href: "/services/insurance/health",
    icon: Heart
  },
  {
    title: "Life Insurance",
    href: "/services/insurance/life",
    icon: Umbrella
  },
];

// Define EMI Calculator items for dropdown
const calculatorItems: { title: string; href: string; description?: string, icon?: React.ElementType }[] = [
  {
    title: "Home Loan EMI Calculator",
    href: "/tools/emi-calculator/home-loan",
    icon: Calculator
  },
  {
    title: "Personal Loan EMI Calculator",
    href: "/tools/emi-calculator/personal-loan",
    icon: Calculator
  },
  {
    title: "Business Loan EMI Calculator",
    href: "/tools/emi-calculator/business-loan",
    icon: Calculator
  },
  {
    title: "Compound Interest Calculator",
    href: "/tools/emi-calculator/compound-interest",
    icon: Percent
  },
  {
    title: "Loan Prepayment Calculator",
    href: "/tools/emi-calculator/loan-prepayment",
    icon: Clock
  },
  {
    title: "RD Calculator",
    href: "/tools/emi-calculator/rd",
    icon: Calculator
  },
  {
    title: "FD Calculator",
    href: "/tools/emi-calculator/fd",
    icon: Calculator
  },
];

// Define Credit Score items for dropdown
const creditScoreItems: { title: string; href: string; description?: string, icon?: React.ElementType }[] = [
  {
    title: "Check CIBIL Score by Pan Card",
    href: "/tools/credit-score/cibil-by-pan",
    icon: CreditCard
  },
  {
    title: "CIBIL Score for Banks",
    href: "/tools/credit-score/cibil-for-banks",
    icon: Landmark
  },
  {
    title: "Check Free CIBIL Score",
    href: "/tools/credit-score/free-cibil",
    icon: BarChart
  },
  {
    title: "Instant Loan Without CIBIL",
    href: "/tools/credit-score/loan-without-cibil",
    icon: Wallet
  },
  {
    title: "CIBIL Score Range",
    href: "/tools/credit-score/score-range",
    icon: BarChart
  },
  {
    title: "CIBIL Score Calculation",
    href: "/tools/credit-score/calculation",
    icon: Calculator
  },
  {
    title: "How to Improve CIBIL Score",
    href: "/tools/credit-score/improve",
    icon: TrendingUp
  },
];

const Header = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Image
              src="/assets/logo.png"
              alt="NetWealth India Logo"
              width={70}
              height={70}
              className="h-12 w-auto"
              priority
            />
            <span className="hidden font-bold text-xl sm:inline-block px-4 text-slate-800">
              NetWealth India
            </span>
          </Link>
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-slate-600 hover:text-primary">Credit Cards</NavigationMenuTrigger>
                <NavigationMenuContent className="bg-white shadow-lg rounded-lg border border-slate-200">
                  <ul className="grid w-[400px] gap-2 p-4 md:w-[500px] md:grid-cols-1 lg:w-[600px]">
                    {creditCardItems.map((item) => (
                      <li key={item.title}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={item.href}
                            className="block select-none rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-emerald-50 hover:text-primary"
                          >
                            <div className="flex items-center gap-2">
                              {item.icon && <item.icon className="h-4 w-4 text-emerald-500" />}
                              <div className="text-sm font-medium text-emerald-700">{item.title}</div>
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-slate-600 hover:text-primary">Loan</NavigationMenuTrigger>
                <NavigationMenuContent className="bg-white shadow-lg rounded-lg border border-slate-200">
                  <ul className="grid w-[400px] gap-2 p-4 md:w-[500px] md:grid-cols-1 lg:w-[600px]">
                    {loanItems.map((item) => (
                      <li key={item.title}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={item.href}
                            className="block select-none rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-emerald-50 hover:text-primary"
                          >
                            <div className="flex items-center gap-2">
                              {item.icon && <item.icon className="h-4 w-4 text-emerald-500" />}
                              <div className="text-sm font-medium text-emerald-700">{item.title}</div>
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-slate-600 hover:text-primary">Insurance</NavigationMenuTrigger>
                <NavigationMenuContent className="bg-white shadow-lg rounded-lg border border-slate-200">
                  <ul className="grid w-[400px] gap-2 p-4 md:w-[500px] md:grid-cols-1 lg:w-[600px]">
                    {insuranceItems.map((item) => (
                      <li key={item.title}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={item.href}
                            className="block select-none rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-emerald-50 hover:text-primary"
                          >
                            <div className="flex items-center gap-2">
                              {item.icon && <item.icon className="h-4 w-4 text-emerald-500" />}
                              <div className="text-sm font-medium text-emerald-700">{item.title}</div>
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-slate-600 hover:text-primary">EMI Calculator</NavigationMenuTrigger>
                <NavigationMenuContent className="bg-white shadow-lg rounded-lg border border-slate-200">
                  <ul className="grid w-[400px] gap-2 p-4 md:w-[500px] md:grid-cols-1 lg:w-[600px]">
                    {calculatorItems.map((item) => (
                      <li key={item.title}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={item.href}
                            className="block select-none rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-emerald-50 hover:text-primary"
                          >
                            <div className="flex items-center gap-2">
                              {item.icon && <item.icon className="h-4 w-4 text-emerald-500" />}
                              <div className="text-sm font-medium text-emerald-700">{item.title}</div>
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-slate-600 hover:text-primary">Credit Score</NavigationMenuTrigger>
                <NavigationMenuContent className="bg-white shadow-lg rounded-lg border border-slate-200">
                  <ul className="grid w-[400px] gap-2 p-4 md:w-[500px] md:grid-cols-1 lg:w-[600px]">
                    {creditScoreItems.map((item) => (
                      <li key={item.title}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={item.href}
                            className="block select-none rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-emerald-50 hover:text-primary"
                          >
                            <div className="flex items-center gap-2">
                              {item.icon && <item.icon className="h-4 w-4 text-emerald-500" />}
                              <div className="text-sm font-medium text-emerald-700">{item.title}</div>
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/insights" className="text-slate-600 hover:text-primary">
                    Blogs
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Mobile Menu */}
        <Suspense fallback={<div>Loading...</div>}>
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" className="ml-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0">
                <Menu className="h-6 w-6 text-slate-600" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0 bg-white pl-4 overflow-y-auto">
              <SheetHeader>
                <SheetTitle className="text-slate-800">Navigation Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col space-y-4">
                <SheetClose asChild>
                  <Link href="/" className="hover:text-primary transition-colors py-2 pl-4 font-medium text-slate-600">Home</Link>
                </SheetClose>
                
                <div className="py-2 pl-4">
                  <p className="font-medium text-emerald-700 mb-2">Credit Cards</p>
                  <div className="pl-4 space-y-2">
                    {creditCardItems.slice(0, 5).map((item) => (
                      <SheetClose key={item.title} asChild>
                        <Link
                          href={item.href}
                          className="block hover:text-primary transition-colors text-sm text-emerald-600"
                        >
                          {item.title}
                        </Link>
                      </SheetClose>
                    ))}
                  </div>
                </div>
                
                <div className="py-2 pl-4">
                  <p className="font-medium text-emerald-700 mb-2">Loans</p>
                  <div className="pl-4 space-y-2">
                    {loanItems.slice(0, 5).map((item) => (
                      <SheetClose key={item.title} asChild>
                        <Link
                          href={item.href}
                          className="block hover:text-primary transition-colors text-sm text-emerald-600"
                        >
                          {item.title}
                        </Link>
                      </SheetClose>
                    ))}
                  </div>
                </div>
                
                <div className="py-2 pl-4">
                  <p className="font-medium text-emerald-700 mb-2">Insurance</p>
                  <div className="pl-4 space-y-2">
                    {insuranceItems.map((item) => (
                      <SheetClose key={item.title} asChild>
                        <Link
                          href={item.href}
                          className="block hover:text-primary transition-colors text-sm text-emerald-600"
                        >
                          {item.title}
                        </Link>
                      </SheetClose>
                    ))}
                  </div>
                </div>
                
                <div className="py-2 pl-4">
                  <p className="font-medium text-emerald-700 mb-2">EMI Calculator</p>
                  <div className="pl-4 space-y-2">
                    {calculatorItems.slice(0, 4).map((item) => (
                      <SheetClose key={item.title} asChild>
                        <Link
                          href={item.href}
                          className="block hover:text-primary transition-colors text-sm text-emerald-600"
                        >
                          {item.title}
                        </Link>
                      </SheetClose>
                    ))}
                  </div>
                </div>
                
                <div className="py-2 pl-4">
                  <p className="font-medium text-emerald-700 mb-2">Credit Score</p>
                  <div className="pl-4 space-y-2">
                    {creditScoreItems.slice(0, 4).map((item) => (
                      <SheetClose key={item.title} asChild>
                        <Link
                          href={item.href}
                          className="block hover:text-primary transition-colors text-sm text-emerald-600"
                        >
                          {item.title}
                        </Link>
                      </SheetClose>
                    ))}
                  </div>
                </div>
                
                <SheetClose asChild>
                  <Link href="/insights" className="hover:text-primary transition-colors py-2 pl-4 font-medium text-emerald-700">Blogs</Link>
                </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>
        </Suspense>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
          </div>
          <div className="ml-auto flex items-center gap-4">
            <Link href="/about/why-choose-us">
            <button className="px-5 py-2 rounded-lg border border-slate-300 text-slate-800 font-semibold hover:bg-primary hover:text-emerald-400 transition-colors duration-200 shadow-sm">
            Why Choose Us?
              </button>
            </Link>
            <Link href="/contact">
              <button className="px-5 py-2 rounded-lg border border-slate-300 text-slate-800 font-semibold hover:bg-primary hover:text-emerald-400 transition-colors duration-200 shadow-sm">
                Sign In
              </button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

// Helper component for dropdown list items
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  Omit<React.ComponentPropsWithoutRef<"a">, "href"> & { title: string; href: string; icon: React.ElementType; onClick?: () => void } // Add onClick prop
>(({ className, title, children, icon: Icon, href, onClick, ...props }, ref) => { // Include onClick
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-700 focus:bg-slate-700 group",
            className
          )}
          // Pass onClick to Link
          onClick={onClick}
          {...props}
        >
          <div className="flex items-center gap-2">
             <Icon className="h-5 w-5 text-primary" />
             <div className="text-sm font-medium leading-none text-primary group-hover:text-white">{title}</div>
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-slate-400 group-hover:text-slate-200 pl-7">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
})
ListItem.displayName = "ListItem"

export default Header;