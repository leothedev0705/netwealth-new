'use client'; // Need client component for Sheet state

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetClose,
  SheetTrigger,
} from "@/components/ui/sheet"
// Import Calculator icon and new tool icons
import { Menu, X, Shield, TrendingUp, Home, LayoutGrid, Calculator, PiggyBank, Goal, Landmark } from 'lucide-react';
import { cn } from "@/lib/utils";

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

// Define Tools items for dropdown
const toolItems: { title: string; href: string; description: string, icon: React.ElementType }[] = [
  {
    title: "SIP Calculator",
    href: "/tools/sip-calculator",
    description: "Estimate potential returns on your Systematic Investment Plans.",
    icon: Calculator
  },
  {
    title: "Lump Sum Calculator",
    href: "/tools/lumpsum-calculator", // Placeholder route
    description: "Calculate the future value of a one-time investment.",
    icon: PiggyBank
  },
  {
    title: "EMI Calculator",
    href: "/tools/emi-calculator", // Placeholder route
    description: "Calculate your Equated Monthly Installments for loans.",
    icon: Landmark
  },
  {
    title: "Retirement Planner",
    href: "/tools/retirement-planner", // Placeholder route
    description: "Estimate the corpus needed for your retirement goals.",
    icon: Goal
  },
];


const Header = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <header className="bg-slate-900 text-slate-400 py-3 sticky top-0 z-50 shadow-md border-b border-slate-700/50">
      <div className="container mx-auto flex justify-between items-center px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2" onClick={() => setIsSheetOpen(false)}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-2xl font-bold text-white">Net Wealth India</span>
        </Link>

        {/* Desktop Navigation Links with Dropdown */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/" className={cn(
                    "inline-flex items-center justify-center rounded-md font-medium transition-colors h-10 px-4 py-2",
                    "text-lg", // Unified text size
                    "bg-transparent text-slate-400 hover:bg-slate-800 hover:text-slate-100 focus:bg-slate-800 focus:text-slate-100"
                  )}>
                  Home
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className={cn(
                    "inline-flex items-center justify-center rounded-md font-medium transition-colors h-10 px-4 py-2",
                    "text-lg", // Unified text size
                    "bg-transparent text-slate-400 hover:bg-slate-800 hover:text-slate-100 focus:bg-slate-800 focus:text-slate-100",
                    "data-[state=open]:bg-slate-800"
                  )}>
                Services
              </NavigationMenuTrigger>
              <NavigationMenuContent className="bg-slate-800 border-slate-700">
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                  {serviceItems.map((item) => (
                    <ListItem
                      key={item.title}
                      title={item.title}
                      href={item.href}
                      icon={item.icon}
                      onClick={() => setIsSheetOpen(false)} // Close sheet on mobile click
                    >
                      {item.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

             <NavigationMenuItem>
              <NavigationMenuLink asChild>
                 <Link href="/about" className={cn(
                    "inline-flex items-center justify-center rounded-md font-medium transition-colors h-10 px-4 py-2", // Removed font-semibold
                    "text-lg", // Unified text size
                    "bg-transparent text-slate-400 hover:bg-slate-800 hover:text-slate-100 focus:bg-slate-800 focus:text-slate-100"
                  )}>
                   About Us
                 </Link>
               </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                 <Link href="/insights" className={cn(
                    "inline-flex items-center justify-center rounded-md font-medium transition-colors h-10 px-4 py-2",
                    "text-lg", // Unified text size
                    "bg-transparent text-slate-400 hover:bg-slate-800 hover:text-slate-100 focus:bg-slate-800 focus:text-slate-100"
                  )}>
                   Insights
                 </Link>
               </NavigationMenuLink>
            </NavigationMenuItem>

            {/* === Tools Dropdown === */}
            <NavigationMenuItem>
               <NavigationMenuTrigger className={cn(
                    "inline-flex items-center justify-center rounded-md font-medium transition-colors h-10 px-4 py-2",
                    "text-lg", // Unified text size
                    "bg-transparent text-slate-400 hover:bg-slate-800 hover:text-slate-100 focus:bg-slate-800 focus:text-slate-100",
                    "data-[state=open]:bg-slate-800"
                  )}>
                 Tools
               </NavigationMenuTrigger>
               <NavigationMenuContent className="bg-slate-800 border-slate-700">
                 <ul className="grid w-[300px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[550px] ">
                   {toolItems.map((item) => (
                     <ListItem
                       key={item.title}
                       title={item.title}
                       href={item.href}
                       icon={item.icon}
                       onClick={() => setIsSheetOpen(false)} // Close sheet on mobile click
                     >
                       {item.description}
                     </ListItem>
                   ))}
                 </ul>
               </NavigationMenuContent>
             </NavigationMenuItem>
            {/* === END Tools Dropdown === */}

          </NavigationMenuList>
        </NavigationMenu>

        {/* Desktop Contact Button */}
        <div className="hidden md:block">
            <Button
              asChild
              variant="outline"
              className="
                text-lg
                text-slate-100 border-slate-300
                hover:bg-slate-800 hover:text-slate-100
              "
             >
              <Link href="/contact">Contact Us</Link>
            </Button>
        </div>

        {/* Mobile Menu Button & Sheet */}
        <div className="md:hidden">
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-slate-400 hover:bg-slate-800 hover:text-slate-100">
                        <Menu className="h-6 w-6" />
                        <span className="sr-only">Open menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-full max-w-xs bg-slate-900 text-slate-400 border-l border-slate-700/50 p-6">
                    <SheetHeader className="flex flex-row justify-between items-center mb-8">
                         <Link href="/" className="flex items-center space-x-2" onClick={() => setIsSheetOpen(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-xl font-bold text-white">Net Wealth India</span>
                         </Link>
                         <SheetClose asChild>
                             <Button variant="ghost" size="icon" className="text-slate-400 hover:bg-slate-800 hover:text-slate-100">
                                 <X className="h-6 w-6" />
                                 <span className="sr-only">Close menu</span>
                             </Button>
                         </SheetClose>
                    </SheetHeader>
                    <nav className="flex flex-col space-y-4 text-xl">
                         <SheetClose asChild>
                             <Link href="/" className="hover:text-primary transition-colors py-2 font-medium" onClick={() => setIsSheetOpen(false)}>Home</Link>
                         </SheetClose>
                         <SheetClose asChild>
                             <Link href="/services" className="hover:text-primary transition-colors py-2 font-medium" onClick={() => setIsSheetOpen(false)}>Services</Link>
                         </SheetClose>
                         <SheetClose asChild>
                            <Link href="/about" className="hover:text-primary transition-colors py-2 font-medium" onClick={() => setIsSheetOpen(false)}>About Us</Link>
                         </SheetClose>
                         <SheetClose asChild>
                            <Link href="/insights" className="hover:text-primary transition-colors py-2 font-medium" onClick={() => setIsSheetOpen(false)}>Insights</Link>
                         </SheetClose>
                         {/* === Update Mobile Link for Tools === */}
                         <SheetClose asChild>
                           <Link href="/tools/sip-calculator" className="hover:text-primary transition-colors py-2 font-medium" onClick={() => setIsSheetOpen(false)}>Tools</Link>
                         </SheetClose>
                         {/* === END Mobile Link === */}
                    </nav>
                     <div className="mt-8 border-t border-slate-700/50 pt-6">
                        <SheetClose asChild>
                            <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg">
                                <Link href="/contact">Contact Us</Link>
                            </Button>
                        </SheetClose>
                     </div>
                </SheetContent>
            </Sheet>
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
          onClick={onClick} // Pass onClick to Link
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
  )
})
ListItem.displayName = "ListItem"

export default Header;