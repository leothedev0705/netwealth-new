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
];

export async function GET() {
  try {
    const stockDataPromises = STOCK_SYMBOLS.map(async (symbol) => {
      try {
        // First try to get detailed data
        const response = await fetch(
          `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1d&range=1d`,
          {
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
          }
        );
        
        if (!response.ok) {
          throw new Error('Primary data fetch failed');
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

        // Fallback to basic quote data
        const backupResponse = await fetch(
          `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${symbol}`,
          {
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
          }
        );

        if (!backupResponse.ok) {
          throw new Error('Backup data fetch failed');
        }

        const backupData = await backupResponse.json();
        const quote = backupData.quoteResponse?.result?.[0];
        
        if (quote) {
          return {
            symbol: symbol.split('.')[0],
            price: quote.regularMarketPrice.toFixed(2),
            change: quote.regularMarketChange.toFixed(2),
            changePercent: quote.regularMarketChangePercent.toFixed(2)
          };
        }

        throw new Error('No valid data found');
      } catch (error) {
        console.error(`Error fetching data for ${symbol}:`, error);
        return {
          symbol: symbol.split('.')[0],
          price: '0.00',
          change: '0.00',
          changePercent: '0.00'
        };
      }
    });

    const results = await Promise.all(stockDataPromises);
    return NextResponse.json(results);
  } catch (error) {
    console.error('Error fetching stock data:', error);
    return NextResponse.json({ error: 'Failed to fetch stock data' }, { status: 500 });
  }
} 