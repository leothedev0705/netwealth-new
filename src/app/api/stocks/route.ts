import { NextResponse } from 'next/server';

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
  // ... add more symbols as needed
] as const;

type StockSymbol = typeof STOCK_SYMBOLS[number];

interface StockData {
  price: number;
  change: number;
  changePercent: number;
}

// Mock data for fallback
const mockStockData: Record<StockSymbol, StockData> = {
  'RELIANCE.BO': { price: 2450.75, change: 12.50, changePercent: 0.51 },
  'TCS.BO': { price: 3450.25, change: -15.75, changePercent: -0.45 },
  'HDFCBANK.BO': { price: 1589.60, change: 8.40, changePercent: 0.53 },
  'INFY.BO': { price: 1478.25, change: 5.75, changePercent: 0.39 },
  'ICICIBANK.BO': { price: 925.80, change: -4.20, changePercent: -0.45 },
  'HINDUNILVR.BO': { price: 2450.00, change: 10.50, changePercent: 0.43 },
  'SBIN.BO': { price: 625.45, change: 3.25, changePercent: 0.52 },
  'BHARTIARTL.BO': { price: 867.30, change: -2.70, changePercent: -0.31 },
  'ITC.BO': { price: 438.90, change: -1.50, changePercent: -0.34 },
  'KOTAKBANK.BO': { price: 1750.25, change: 7.75, changePercent: 0.44 },
};

export async function GET() {
  try {
    const stockDataPromises = STOCK_SYMBOLS.map(async (symbol) => {
      try {
        // Try to fetch from Yahoo Finance API
        const response = await fetch(
          `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1d&range=1d`,
          {
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            },
            next: { revalidate: 60 } // Cache for 60 seconds
          }
        );
        
        if (!response.ok) {
          // If API fails, use mock data
          const mockData = mockStockData[symbol];
          return {
            symbol: symbol.split('.')[0],
            price: mockData.price.toFixed(2),
            change: mockData.change.toFixed(2),
            changePercent: mockData.changePercent.toFixed(2)
          };
        }

        const data = await response.json();
        
        if (data.chart?.result?.[0]?.meta && data.chart?.result?.[0]?.indicators?.quote?.[0]) {
          const meta = data.chart.result[0].meta;
          const quote = data.chart.result[0].indicators.quote[0];
          const lastIndex = quote.close.length - 1;
          
          const currentPrice = quote.close[lastIndex] || meta.regularMarketPrice;
          const previousClose = meta.chartPreviousClose;
          const change = (currentPrice - previousClose).toFixed(2);
          const changePercent = ((currentPrice - previousClose) / previousClose * 100).toFixed(2);

          return {
            symbol: symbol.split('.')[0],
            price: currentPrice.toFixed(2),
            change: change,
            changePercent: changePercent
          };
        }

        // If data structure is invalid, use mock data
        const mockData = mockStockData[symbol];
        return {
          symbol: symbol.split('.')[0],
          price: mockData.price.toFixed(2),
          change: mockData.change.toFixed(2),
          changePercent: mockData.changePercent.toFixed(2)
        };
      } catch (error) {
        console.error(`Error fetching data for ${symbol}:`, error);
        // Use mock data as fallback
        const mockData = mockStockData[symbol];
        return {
          symbol: symbol.split('.')[0],
          price: mockData.price.toFixed(2),
          change: mockData.change.toFixed(2),
          changePercent: mockData.changePercent.toFixed(2)
        };
      }
    });

    const results = await Promise.all(stockDataPromises);
    return NextResponse.json(results);
  } catch (error) {
    console.error('Error fetching stock data:', error);
    // Return mock data for all symbols in case of complete failure
    const mockResults = STOCK_SYMBOLS.map(symbol => {
      const mockData = mockStockData[symbol];
      return {
        symbol: symbol.split('.')[0],
        price: mockData.price.toFixed(2),
        change: mockData.change.toFixed(2),
        changePercent: mockData.changePercent.toFixed(2)
      };
    });
    return NextResponse.json(mockResults);
  }
} 