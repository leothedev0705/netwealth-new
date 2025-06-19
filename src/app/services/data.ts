import { LucideIcon } from 'lucide-react';
import {
  Shield, TrendingUp, Home, LifeBuoy, Banknote, PiggyBank, FileText, Umbrella, Library, HeartPulse, ShieldCheck, Briefcase, GraduationCap,
  Landmark,
  Car,
  Receipt,
  Construction,
  Repeat,
  Database,
  Replace,
  CandlestickChart,
  Building,
  Building2,
  Target,
  ChartBar,
  BookOpen,
  FileCheck,
  FileSearch,
  FileSpreadsheet,
  FileStack,
  FileBarChart,
  FilePieChart,
  FileClock,
  FileHeart,
  FileStack2,
  FileSpreadsheet2,
  FileBarChart2,
  FilePieChart2,
  FileClock2,
  FileHeart2,
  FileText2,
  FileSearch2,
  FileCheck2,
  FileSpreadsheet3,
  FileStack3,
  FileBarChart3,
  FilePieChart3,
  FileClock3,
  FileHeart3
} from 'lucide-react';

export interface ServiceItem {
  icon: LucideIcon;
  title: string;
  description: string;
  overview: string;
  guidelines: string[];
}

export interface ServiceCategory {
  id: string;
  categoryIcon: LucideIcon;
  categoryTitle: string;
  categoryDescription: string;
  items: ServiceItem[];
}

export const serviceCategories: ServiceCategory[] = [
  {
    id: "loans",
    categoryIcon: Landmark,
    categoryTitle: "Comprehensive Lending Solutions",
    categoryDescription: "Strategic borrowing options to achieve your financial milestones, from property acquisition to business growth.",
    items: [
      { 
        icon: Home, 
        title: "Home Loan", 
        description: "Finance your dream property purchase, construction, or renovation with tailored guidance.",
        overview: "Funding for buying, constructing, or renovating a residential property.",
        guidelines: [
          "Check credit score and eligibility criteria",
          "Ensure property has clear legal titles",
          "Compare interest rates and loan tenure across lenders",
          "Keep documentation ready (income proof, ID, address, property papers)"
        ]
      },
      { 
        icon: Briefcase, 
        title: "Business Loan", 
        description: "Structured financing solutions for business expansion, operational needs, or working capital.",
        overview: "Financing for expanding operations, managing cash flow, or purchasing assets.",
        guidelines: [
          "Prepare business financials and projections",
          "Maintain good credit history",
          "Assess loan purpose clearly to choose the right structure (term loan, line of credit, etc.)"
        ]
      },
      { 
        icon: Car, 
        title: "Auto Loan", 
        description: "Competitive financing options to help you acquire your desired vehicle.",
        overview: "Funds for purchasing new or used vehicles.",
        guidelines: [
          "Compare interest rates and down payment options",
          "Evaluate processing fees and prepayment charges",
          "Ensure vehicle registration and insurance are in place"
        ]
      },
      { 
        icon: Building, 
        title: "Loan Against Property (LAP)", 
        description: "Unlock the equity in your property for various financial needs like business or education.",
        overview: "Borrow funds using residential/commercial property as collateral.",
        guidelines: [
          "Property should be owned and have clear legal status",
          "Used for business or personal needs",
          "Loan amount based on property valuation and borrower profile"
        ]
      },
      { 
        icon: Receipt, 
        title: "Loan Against Rental Discounting", 
        description: "Leverage future rental income for immediate liquidity needs.",
        overview: "Avail funds against future rental receipts.",
        guidelines: [
          "Typically for commercial properties with long-term tenants",
          "Requires registered lease agreements",
          "Loan value depends on rent amount and lease duration"
        ]
      },
      { 
        icon: Construction, 
        title: "Construction Funding", 
        description: "Financial support specifically designed for property construction projects.",
        overview: "Tailored for developers to finance real estate projects.",
        guidelines: [
          "Project viability and legal approvals are essential",
          "Disbursement usually in stages",
          "Requires detailed project report (DPR) and cash flow forecast"
        ]
      },
      { 
        icon: TrendingUp, 
        title: "IPO Funding", 
        description: "Capitalize on Initial Public Offering opportunities with dedicated funding.",
        overview: "Short-term loan to invest in Initial Public Offerings.",
        guidelines: [
          "Offered for high-value IPO applications",
          "Requires margin money and repayment within a few days",
          "Subject to allotment risk"
        ]
      },
      { 
        icon: Landmark, 
        title: "Loan Against Shares & Mutual Funds", 
        description: "Access liquidity against your securities portfolio without selling your investments.",
        overview: "Leverage investment portfolio without selling it.",
        guidelines: [
          "Only approved securities are eligible",
          "Loan-to-value ratio (LTV) depends on the asset",
          "Ensure monitoring of pledged portfolio for margin calls"
        ]
      }
    ]
  },
  {
    id: "insurance",
    categoryIcon: Shield,
    categoryTitle: "Robust Protection Planning",
    categoryDescription: "Secure your financial future against life's uncertainties with comprehensive insurance coverage.",
    items: [
      { 
        icon: ShieldCheck, 
        title: "Robust Protection Planning", 
        description: "Comprehensive financial safeguard through insurance.",
        overview: "Holistic approach to financial protection and risk management.",
        guidelines: [
          "Combine life, health, and asset insurance for holistic coverage",
          "Evaluate risks and liabilities regularly",
          "Review policies annually for adequacy"
        ]
      },
      { 
        icon: HeartPulse, 
        title: "Life Insurance", 
        description: "Ensure financial security for your loved ones in your absence with term plans and endowment policies.",
        overview: "Provides financial support to dependents in case of death.",
        guidelines: [
          "Choose term insurance for pure protection",
          "Endowment or ULIP for savings with coverage",
          "Adequate sum assured based on income and liabilities"
        ]
      },
      { 
        icon: LifeBuoy, 
        title: "Health Insurance", 
        description: "Protect yourself and your family from rising medical costs with comprehensive health coverage.",
        overview: "Covers medical expenses including hospitalization and critical illness.",
        guidelines: [
          "Prefer comprehensive policies with cashless network",
          "Disclose all health conditions truthfully",
          "Renew policies timely to avoid lapse"
        ]
      },
      { 
        icon: Umbrella, 
        title: "General Insurance", 
        description: "Safeguard your valuable assets like home, vehicles, and travel against unforeseen events.",
        overview: "Covers non-life assets like home, car, or travel.",
        guidelines: [
          "Evaluate coverage and exclusions clearly",
          "Renew policies annually",
          "Useful for protecting against theft, accidents, and natural disasters"
        ]
      }
    ]
  },
  {
    id: "wealth",
    categoryIcon: TrendingUp,
    categoryTitle: "Wealth & Investment Management",
    categoryDescription: "Strategic investment solutions to grow and preserve your wealth for long-term financial goals.",
    items: [
      { 
        icon: PiggyBank, 
        title: "Retirement Planning", 
        description: "Build a secure financial future post-retirement through dedicated plans and strategies.",
        overview: "Building a financial corpus for post-retirement life.",
        guidelines: [
          "Start early to benefit from compounding",
          "Mix of equity and debt based on age and risk",
          "Consider annuity or pension plans"
        ]
      },
      { 
        icon: GraduationCap, 
        title: "Education Planning", 
        description: "Ensure your children's educational aspirations are met with targeted savings and investment plans.",
        overview: "Fund future educational goals for children.",
        guidelines: [
          "Estimate future costs with inflation",
          "Use goal-based investing with SIPs or child plans",
          "Regular review and top-ups recommended"
        ]
      },
      { 
        icon: ChartBar, 
        title: "Strategic Investment Management", 
        description: "Expert guidance for building and managing a diversified investment portfolio.",
        overview: "Goal-driven investing aligned with risk and timeline.",
        guidelines: [
          "Diversify across asset classes",
          "Periodic rebalancing",
          "Use advisory or PMS for high-net-worth portfolios"
        ]
      },
      { 
        icon: Repeat, 
        title: "Systematic Investment Plan (SIP)", 
        description: "Regular investments in mutual funds for disciplined wealth creation.",
        overview: "Regular investments in mutual funds.",
        guidelines: [
          "Ideal for long-term wealth building",
          "Promotes financial discipline",
          "Choose based on goals and fund performance"
        ]
      },
      { 
        icon: Database, 
        title: "Mutual Funds", 
        description: "Professional management of pooled investments across various asset classes.",
        overview: "Pooled investments managed by professionals.",
        guidelines: [
          "Select fund types based on risk (equity, debt, hybrid)",
          "Check past performance, fund manager, and expense ratio",
          "Suitable for varied goals and horizons"
        ]
      },
      { 
        icon: FileText, 
        title: "Portfolio Management Services (PMS)", 
        description: "Customized investment solutions for high-net-worth individuals.",
        overview: "Customized equity portfolio management.",
        guidelines: [
          "Minimum investment usually ₹50L+",
          "Active management with bespoke strategy",
          "Track performance reports regularly"
        ]
      },
      { 
        icon: Replace, 
        title: "Systematic Withdrawal Plan (SWP)", 
        description: "Generate regular income from your mutual fund investments.",
        overview: "Generate income from mutual fund investments.",
        guidelines: [
          "Useful for retirees or passive income seekers",
          "Choose tax-efficient withdrawal frequency",
          "Monitor fund performance"
        ]
      },
      { 
        icon: CandlestickChart, 
        title: "Stocks (Short & Long Term)", 
        description: "Direct investment in equity markets for capital appreciation.",
        overview: "Direct investment in equity for capital appreciation.",
        guidelines: [
          "Do proper research or consult an advisor",
          "Diversify across sectors",
          "Long-term horizon preferred for compounding"
        ]
      },
      { 
        icon: Banknote, 
        title: "Secure Fixed Deposits", 
        description: "Capital-protected investments with fixed returns.",
        overview: "Capital-protected investments with fixed returns.",
        guidelines: [
          "Ideal for conservative investors",
          "Compare interest rates across banks/NBFCs",
          "Check for premature withdrawal conditions"
        ]
      },
      { 
        icon: Building2, 
        title: "Corporate Fixed Deposits", 
        description: "Higher interest rate FDs offered by companies.",
        overview: "FDs offered by companies at higher interest rates.",
        guidelines: [
          "Ensure high credit-rated companies",
          "Riskier than bank FDs; assess default risk",
          "Understand tenure and lock-in period"
        ]
      }
    ]
  }
]; 