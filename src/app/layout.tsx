import React from 'react';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Ticker from "@/components/layout/Ticker";
import Footer from "@/components/layout/Footer";
import { cn } from "@/lib/utils";
import ClickEffect from "@/components/effects/ClickEffect";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Net Wealth India - Empowering Your Financial Future",
  description: "Empowering Your Financial Future with Trusted Expertise. Financial solutions tailored to your specific needs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-serif antialiased flex flex-col",
          inter.className
        )}
      >
        <Header />
        <Ticker />
        <main className="flex-grow">{children}</main>
        <Footer />
        <ClickEffect />
      </body>
    </html>
  );
}
