import type { Metadata } from "next"
import "./globals.css"
import ClickEffect from '@/components/effects/ClickEffect'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Ticker from '@/components/layout/Ticker'
import ChatWidget from '@/components/chat/ChatWidget'
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "NetWealth India",
  description: "NetWealth India - Your Trusted Partner in Wealth Management",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  themeColor: "#ffffff",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased")}>
        <ClickEffect />
        <Header />
        <Ticker />
        <main className="flex-grow">{children}</main>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  )
}
