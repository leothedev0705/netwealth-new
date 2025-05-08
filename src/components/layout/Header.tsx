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
import { Shield, TrendingUp, Home, LayoutGrid, Calculator, PiggyBank, Goal, Landmark } from 'lucide-react';

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
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/about"
              className="transition-colors hover:text-primary text-slate-600"
            >
              About
            </Link>
            <Link
              href="/services"
              className="transition-colors hover:text-primary text-slate-600"
            >
              Services
            </Link>
            <Link
              href="/tools"
              className="transition-colors hover:text-primary text-slate-600"
            >
              Tools
            </Link>
            <Link
              href="/contact"
              className="transition-colors hover:text-primary text-slate-600"
            >
              Contact
            </Link>
          </nav>
        </div>

        {/* Mobile Menu */}
        <Suspense fallback={<div>Loading...</div>}>
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" className="px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0">
                <Menu className="h-6 w-6 text-slate-600" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0 bg-white">
              <SheetHeader>
                <SheetTitle className="text-slate-800">Navigation Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col space-y-4">
                <SheetClose asChild>
                  <Link href="/" className="hover:text-primary transition-colors py-2 font-medium text-slate-600">Home</Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href="/about" className="hover:text-primary transition-colors py-2 font-medium text-slate-600">About</Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href="/services" className="hover:text-primary transition-colors py-2 font-medium text-slate-600">Services</Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href="/tools" className="hover:text-primary transition-colors py-2 font-medium text-slate-600">Tools</Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href="/contact" className="hover:text-primary transition-colors py-2 font-medium text-slate-600">Contact</Link>
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
                Get Started
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