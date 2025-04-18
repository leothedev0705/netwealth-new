export interface StockData {
  symbol: string;
  price: string;
  change: string;
  changePercent: string;
}

const STOCK_SYMBOLS = [
  // Large Cap Companies
  'RELIANCE.BO',    // Reliance Industries
  'TCS.BO',         // Tata Consultancy Services
  'HDFCBANK.BO',    // HDFC Bank
  'INFY.BO',        // Infosys
  'ICICIBANK.BO',   // ICICI Bank
  'HINDUNILVR.BO',  // Hindustan Unilever
  'SBIN.BO',        // State Bank of India
  'BHARTIARTL.BO',  // Bharti Airtel
  'ITC.BO',         // ITC Limited
  'KOTAKBANK.BO',   // Kotak Mahindra Bank

  // IT & Technology
  'WIPRO.BO',       // Wipro
  'HCLTECH.BO',     // HCL Technologies
  'TECHM.BO',       // Tech Mahindra
  'MINDTREE.BO',    // Mindtree
  'LTIM.BO',        // L&T Infotech

  // Manufacturing & Industrial
  'LT.BO',          // Larsen & Toubro
  'TATAMOTORS.BO',  // Tata Motors
  'MARUTI.BO',      // Maruti Suzuki
  'TATASTEEL.BO',   // Tata Steel
  'ULTRACEMCO.BO',  // UltraTech Cement

  // Financial Services
  'AXISBANK.BO',    // Axis Bank
  'BAJFINANCE.BO',  // Bajaj Finance
  'HDFCLIFE.BO',    // HDFC Life Insurance
  'SBILIFE.BO',     // SBI Life Insurance
  'BAJAJFINSV.BO',  // Bajaj Finserv

  // Consumer Goods
  'ASIANPAINT.BO',  // Asian Paints
  'TITAN.BO',       // Titan Company
  'NESTLEIND.BO',   // Nestle India
  'BRITANNIA.BO',   // Britannia Industries
  'DABUR.BO',       // Dabur India

  // Energy & Power
  'POWERGRID.BO',   // Power Grid Corporation
  'NTPC.BO',        // NTPC Limited
  'ONGC.BO',        // Oil & Natural Gas Corporation
  'ADANIGREEN.BO',  // Adani Green Energy
  'TATAPOWER.BO',   // Tata Power

  // Pharmaceuticals
  'SUNPHARMA.BO',   // Sun Pharmaceutical
  'DRREDDY.BO',     // Dr. Reddy's Laboratories
  'DIVISLAB.BO',    // Divi's Laboratories
  'CIPLA.BO',       // Cipla
  'BIOCON.BO',      // Biocon

  // Telecommunications & Media
  'ZEEL.BO',        // Zee Entertainment
  'PVRINOX.BO',     // PVR Inox
  'NAUKRI.BO',      // Info Edge (Naukri)
  'IRCTC.BO',       // Indian Railway Catering
  'INDIAMART.BO',   // IndiaMART

  // Real Estate & Infrastructure
  'GODREJPROP.BO',  // Godrej Properties
  'DMART.BO',       // Avenue Supermarts (D-Mart)
  'DLF.BO',         // DLF Limited
  'LODHA.BO',       // Macrotech Developers
  'PHOENIXLTD.BO'   // The Phoenix Mills
];

export async function getStockData(): Promise<StockData[]> {
  try {
    const response = await fetch('/api/stocks');
    if (!response.ok) {
      throw new Error('Failed to fetch stock data');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching stock data:', error);
    return [];
  }
}

// Cache for 15 seconds to avoid too many requests while maintaining near real-time data
let cachedData: StockData[] | null = null;
let lastFetchTime = 0;
const CACHE_DURATION = 15000; // 15 seconds in milliseconds

export async function getCachedStockData(): Promise<StockData[]> {
  const now = Date.now();
  if (!cachedData || now - lastFetchTime > CACHE_DURATION) {
    cachedData = await getStockData();
    lastFetchTime = now;
  }
  return cachedData;
} 