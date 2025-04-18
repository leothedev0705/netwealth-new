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

const Header = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-gradient-to-r from-slate-900 to-slate-800 text-white">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold text-xl sm:inline-block px-4">
              NetWealth India
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/about"
              className="transition-colors hover:text-primary text-slate-200"
            >
              About
            </Link>
            <Link
              href="/services"
              className="transition-colors hover:text-primary text-slate-200"
            >
              Services
            </Link>
            <Link
              href="/tools"
              className="transition-colors hover:text-primary text-slate-200"
            >
              Tools
            </Link>
            <Link
              href="/contact"
              className="transition-colors hover:text-primary text-slate-200"
            >
              Contact
            </Link>
          </nav>
        </div>

        {/* Mobile Menu */}
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" className="px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <nav className="flex flex-col space-y-4">
              <SheetClose asChild>
                <Link href="/" className="hover:text-primary transition-colors py-2 font-medium">Home</Link>
              </SheetClose>
              <SheetClose asChild>
                <Link href="/about" className="hover:text-primary transition-colors py-2 font-medium">About</Link>
              </SheetClose>
              <SheetClose asChild>
                <Link href="/services" className="hover:text-primary transition-colors py-2 font-medium">Services</Link>
              </SheetClose>
              <SheetClose asChild>
                <Link href="/tools" className="hover:text-primary transition-colors py-2 font-medium">Tools</Link>
              </SheetClose>
              <SheetClose asChild>
                <Link href="/contact" className="hover:text-primary transition-colors py-2 font-medium">Contact</Link>
              </SheetClose>
            </nav>
          </SheetContent>
        </Sheet>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
          </div>
          <nav className="flex items-center">
            <Link 
              href="/contact" 
              className="px-6 py-2 mx-4 rounded border border-white text-white hover:bg-white/10 transition-colors"
            >
              Get Started
            </Link>
          </nav>
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