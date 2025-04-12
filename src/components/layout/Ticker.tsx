import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import Sparkline from '@/components/ui/Sparkline';

const tickerData = [
  { name: 'DOW', value: '39563', change: '+940', percent: '(3.14%)', positive: true },
  { name: 'SILVER', value: '100200', change: '+4200', percent: '(4.19%)', positive: true },
  { name: 'NASDAQ', value: '16562.78', change: '+175.46', percent: '(1.06%)', positive: true },
  { name: 'FTSE', value: '7964.18', change: '+50.93', percent: '(0.64%)', positive: true },
  { name: 'Nikkei', value: '33585.58', change: '-1023.42', percent: '(-3.09%)', positive: false },
  { name: 'Crude', value: '5273', change: '+24', percent: '(0.46%)', positive: true },
  { name: 'EURO', value: '97.7027', change: '-0.07', percent: '(-0.07%)', positive: false },
];

const TickerItem = ({ name, value, change, percent, positive }: typeof tickerData[0]) => (
  <div className="flex items-center space-x-2 px-4 py-1 border-r border-slate-700 last:border-r-0 flex-shrink-0">
    <span className="font-semibold text-sm text-slate-400">{name}</span>
    <span className="text-sm font-medium text-slate-300">{value}</span>
    <span className={`text-xs font-medium ${positive ? 'text-emerald-500' : 'text-red-500'}`}>
      {positive ? '↑' : '↓'} {change}
    </span>
    <span className={`text-xs ${positive ? 'text-emerald-500' : 'text-red-500'}`}>{percent}</span>
  </div>
);

const Ticker = () => {
  return (
    <div className="bg-slate-800 text-slate-300 overflow-hidden whitespace-nowrap border-b border-t border-slate-700/50">
      <div className="animate-marquee flex">
        {[...tickerData, ...tickerData].map((item, index) => (
          <TickerItem key={`${item.name}-${index}`} {...item} />
        ))}
      </div>
    </div>
  );
};

export default Ticker; 