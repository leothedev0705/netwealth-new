'use client';

import React, { useEffect, useState } from 'react';
import { getCachedStockData, type StockData } from '@/lib/stockData';

export default function Ticker() {
  const [stockData, setStockData] = useState<StockData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCachedStockData();
        setStockData(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching stock data:', error);
        setIsLoading(false);
      }
    };

    // Initial fetch
    fetchData();

    // Update every 15 seconds to match cache duration
    const interval = setInterval(fetchData, 15000);

    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div className="bg-slate-800 text-slate-300 overflow-hidden whitespace-nowrap border-b border-t border-slate-700/50">
        <div className="animate-pulse flex space-x-8 p-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-4 w-32 bg-slate-700 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  const TickerItem = ({ symbol, price, change, changePercent }: StockData) => {
    const isPositive = parseFloat(change) >= 0;
    return (
      <div className="flex items-center space-x-2 px-4 py-1 border-r border-slate-700 last:border-r-0 flex-shrink-0">
        <span className="font-semibold text-sm text-slate-400">{symbol}</span>
        <span className="text-sm font-medium text-slate-300">₹{price}</span>
        <span className={`text-xs font-medium ${isPositive ? 'text-emerald-500' : 'text-red-500'}`}>
          {isPositive ? '↑' : '↓'} {Math.abs(parseFloat(change))}
        </span>
        <span className={`text-xs ${isPositive ? 'text-emerald-500' : 'text-red-500'}`}>
          ({Math.abs(parseFloat(changePercent))}%)
        </span>
      </div>
    );
  };

  return (
    <div className="bg-slate-800 text-slate-300 overflow-hidden whitespace-nowrap border-b border-t border-slate-700/50">
      <div className="animate-marquee flex">
        {[...stockData, ...stockData].map((stock, index) => (
          <TickerItem key={`${stock.symbol}-${index}`} {...stock} />
        ))}
      </div>
    </div>
  );
} 