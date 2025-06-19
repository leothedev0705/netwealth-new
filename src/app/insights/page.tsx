import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from 'next/link';
import { ArrowRight, Newspaper } from 'lucide-react';
// Comment out the Sparkline import as the file is missing
// import Sparkline from '@/components/ui/Sparkline'; 

// === Placeholder Data for Analysis Posts ===
const analysisPosts = [
  // (Keep the existing posts data - market commentary, tax tips, etc.)
  {
    id: 'market-commentary-may-24',
    title: 'Market Commentary: Navigating Volatility in May 2024',
    date: 'May 30, 2024',
    excerpt: 'A brief overview of recent market trends, key economic indicators, and potential implications for investors...',
    category: 'Market Commentary',
    slug: '/insights/market-commentary-may-24'
  },
  {
    id: 'tax-planning-tips-fy25',
    title: 'Essential Tax Planning Tips for FY 2024-25',
    date: 'May 15, 2024',
    excerpt: 'As the new financial year progresses, proactive tax planning is crucial...',
    category: 'Tax Planning',
    slug: '/insights/tax-planning-tips-fy25'
  },
  {
    id: 'sip-power-long-term',
    title: 'The Power of Systematic Investment Plans (SIPs)',
    date: 'May 1, 2024',
    excerpt: 'Understanding how SIPs work, their benefits like rupee cost averaging and compounding...',
    category: 'Investing',
    slug: '/insights/sip-power-long-term'
  },
];
// =============================================

// === Placeholder Data for News Snippets ===
const newsSnippets = [
  { id: 'news1', headline: "Sensex closes above 74,000 mark amid mixed global cues.", source: "Placeholder News Agency", time: "2h ago" },
  { id: 'news2', headline: "RBI holds repo rate steady, citing inflation concerns.", source: "Placeholder Financial News", time: "5h ago" },
  { id: 'news3', headline: "Tech stocks rally continues; IT sector gains focus.", source: "Placeholder Business Desk", time: "Yesterday" },
  { id: 'news4', headline: "SEBI introduces new framework for Small & Medium REITs.", source: "Placeholder Regulatory Update", time: "Yesterday" },
];
// =============================================

const InsightsPage = () => {
  // Data generation is no longer needed if Sparkline is commented out
  // const graphData1 = generateRandomData(12, 70000, 75000);
  // const graphData2 = generateRandomData(12, 20000, 22500);
  // const graphData3 = generateRandomData(12, 45, 55);
  // const isPositive1 = graphData1[graphData1.length - 1] >= graphData1[0];
  // const isPositive2 = graphData2[graphData2.length - 1] >= graphData2[0];
  // const isPositive3 = graphData3[graphData3.length - 1] < graphData3[0]; 

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-50 to-slate-100 py-24 px-6 text-center">
        <div className="container mx-auto">
          <p className="text-primary font-semibold text-sm tracking-wider uppercase mb-2">Insights & Commentary</p>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">Stay Informed</h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Explore our latest market updates, analysis, and visualizations to help you navigate your financial journey.
          </p>
        </div>
      </section>
      {/* Market News Section */}
      <section className="py-16 md:py-20 px-6 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block bg-primary/10 p-4 rounded-full mb-4">
              <Newspaper className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800">
              Market News & Updates
            </h2>
            <p className="text-sm text-slate-500 mt-2">(Illustrative Sample News - Not Real-Time)</p>
          </div>
          <div className="max-w-4xl mx-auto space-y-4">
            {newsSnippets.map(news => (
              <div key={news.id} className="p-4 border-b border-slate-100 last:border-b-0">
                <h3 className="font-semibold text-slate-700 mb-1">{news.headline}</h3>
                <p className="text-xs text-slate-400">{news.source} - {news.time}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* In-Depth Analysis Section */}
      <section className="py-16 md:py-20 px-6 bg-slate-50">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 text-center mb-12">
            In-Depth Analysis & Commentary
          </h2>
          {analysisPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {analysisPosts.map((post) => (
                <Card key={post.id} className="flex flex-col h-full overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 border border-slate-100 bg-white">
                  <CardHeader>
                    <CardTitle className="text-xl mb-1">{post.title}</CardTitle>
                    <CardDescription className="text-xs text-slate-500">
                      {post.date} {post.category && `| ${post.category}`}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-sm text-slate-600 leading-relaxed">{post.excerpt}</p>
                  </CardContent>
                  <CardFooter>
                    <Link
                      href={post.slug}
                      className="text-sm text-primary font-semibold hover:underline flex items-center group"
                    >
                      Read More <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-slate-500">No analysis published yet. Check back soon!</p>
            </div>
          )}
        </div>
      </section>
      {/* === Market Data & Visualizations Section - Commented Out === */}
      {/* 
      <section className="py-16 md:py-20 px-6 bg-white">
        <div className="container mx-auto text-center">
            <div className="inline-block bg-primary/10 p-4 rounded-full mb-4">
             <BarChart2 className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
                Market Data & Visualizations
            </h2>
             <p className="text-sm text-slate-500 mb-12">(Illustrative Sample Graphs - Not Real-Time Data)</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <div className="p-4 border rounded-lg bg-slate-50/50">
                    <p className="text-sm font-medium text-slate-600 mb-2">Sensex Trend (Illustrative)</p>
                    <Sparkline data={graphData1} isPositive={isPositive1} width={150} height={40} />
                </div>
                 <div className="p-4 border rounded-lg bg-slate-50/50">
                    <p className="text-sm font-medium text-slate-600 mb-2">Nifty 50 Trend (Illustrative)</p>
                    <Sparkline data={graphData2} isPositive={isPositive2} width={150} height={40} />
                </div>
                 <div className="p-4 border rounded-lg bg-slate-50/50">
                    <p className="text-sm font-medium text-slate-600 mb-2">USD/INR (Illustrative)</p>
                    <Sparkline data={graphData3} isPositive={isPositive3} width={150} height={40} />
                </div>
            </div>
        </div>
      </section>
      */}
      {/* === END Market Data Section === */}
    </>
  );
};

export default InsightsPage; 