import React from 'react';
import Image from 'next/image';
// import Link from 'next/link'; // Unused import
import { Button } from "@/components/ui/button";
import { Shield, TrendingUp, Home, LifeBuoy, Banknote, PiggyBank, FileText, Umbrella, Library, HeartPulse, ShieldCheck, Briefcase, GraduationCap } from 'lucide-react'; // Removed unused Phone, LayoutGrid

const servicesDetails = [
  {
    id: "protection",
    icon: Shield,
    title: "Protection Planning",
    headline: "The Foundation of Financial Security: Comprehensive Protection Planning",
    description: "Protection planning is the bedrock upon which all other financial strategies are built. While growing wealth through investments and managing assets efficiently are crucial, none of it stands secure without a robust shield against life's inherent uncertainties and potential financial shocks. Think of it as building the foundation and walls of your financial house before decorating the rooms. Unexpected events – a critical illness, a disabling accident, property damage, or premature death – can instantly derail even the best-laid financial plans, potentially wiping out savings, jeopardizing family lifestyle, and preventing long-term goals from being achieved.\n\nOur approach to protection planning is meticulous and deeply personalized. We don't just sell policies; we conduct a thorough risk assessment and needs analysis based on your unique circumstances – your income, assets, liabilities, family structure, lifestyle, and future aspirations. The goal is to create a comprehensive, cost-effective safety net that provides essential liquidity and financial support precisely when it's needed most, allowing you and your loved ones to navigate challenging times with dignity and security. This proactive risk management provides invaluable peace of mind, knowing your financial future is protected.",
    subpoints: [
      { icon: LifeBuoy, text: "Life Insurance: The Cornerstone of Family Security. Provides a tax-free lump sum or income stream to replace lost earnings, cover debts (like mortgages or loans), fund children's education, and ensure dependents maintain their standard of living in the event of premature demise. Essential for anyone with financial dependents." },
      { icon: PiggyBank, text: "Health Insurance: Guarding Against Medical Costs. Covers hospitalization expenses, diagnostic tests, pre/post-hospitalization care, and increasingly, daycare procedures. Crucial in an era of high medical inflation to prevent savings depletion during health emergencies. We help navigate complexities like network hospitals, deductibles, and co-pays." },
      { icon: ShieldCheck, text: "Disability Income Protection: Insuring Your Earning Ability. Often overlooked, yet statistically more likely than premature death during working years. Provides a regular income stream if you're unable to work due to illness or injury, protecting your most valuable asset – your ability to earn." },
      { icon: HeartPulse, text: "Critical Illness Cover: Financial Buffer for Major Health Crises. Provides a lump sum payout upon diagnosis of specific major illnesses (e.g., cancer, stroke, heart attack). This helps cover treatment costs not fully addressed by health insurance, replaces lost income during recovery, and allows for necessary lifestyle adjustments without financial strain." },
      { icon: Umbrella, text: "General Insurance (Property & Casualty): Protecting Your Assets & Liabilities. Safeguards valuable physical assets like your home (structure and contents) and vehicles against damage or loss from events like fire, theft, or natural disasters. Also includes liability coverage to protect you financially if you're deemed responsible for injury or damage to others." },
      { icon: FileText, text: "Tailored Solutions & Riders: Enhancing Your Coverage. Beyond core policies, we assess the need for specific riders (e.g., accidental death benefit, waiver of premium) and specialized policies (e.g., personal accident cover, travel insurance, professional indemnity) to create a truly bespoke protection plan aligned with your complete risk profile." }
    ],
    imagePlaceholder: "(Protection Image)",
  },
  {
    id: "investing",
    icon: TrendingUp,
    title: "Investment Management",
    headline: "Strategic Investment Management for Long-Term Growth",
    description: "Building sustainable wealth requires more than just saving; it demands a disciplined and strategic approach to investing. In today's complex global markets, navigating investment choices can be overwhelming. Our Investment Management services provide clarity and direction, focusing on achieving your specific financial objectives – whether it's planning for retirement, funding education, or generating supplementary income – while carefully managing risk.\n\nOur process begins with a deep understanding of your financial situation, risk tolerance, investment horizon, and life goals. Based on this, we craft a personalized asset allocation strategy, balancing potential returns with acceptable risk levels across different asset classes. We then meticulously select investment vehicles, constantly monitor market conditions and portfolio performance, and make strategic adjustments as needed. Our aim is to deliver consistent, risk-adjusted returns over the long term, helping you grow your wealth purposefully.",
    subpoints: [
      { icon: Banknote, text: "Mutual Funds: Diversification & Professional Management. Access diversified portfolios across equities, debt, or hybrid assets, managed by professional fund managers. Ideal for core portfolio building and various risk appetites." },
      { icon: Library, text: "Corporate Fixed Deposits: Predictable Income & Stability. Offers potentially higher interest rates than traditional bank FDs, providing stable, predictable returns for the conservative portion of your portfolio. We guide selection based on credit ratings and tenure." },
      { icon: FileText, text: "Portfolio Management Services (PMS): Customized Equity Strategies. For sophisticated investors seeking personalized equity portfolio management with higher customization and direct stock ownership, managed actively by expert portfolio managers." },
      { icon: TrendingUp, text: "Alternative Investment Funds (AIF) & Tax Planning: Specialized Opportunities & Efficiency. Access to specialized investment avenues like private equity, real estate funds, or hedge funds (subject to eligibility). We integrate tax considerations across all investments to optimize your post-tax returns." }
    ],
    imagePlaceholder: "(Investing Image)",
  },
  {
    id: "borrowing",
    icon: Home,
    title: "Lending Solutions",
    headline: "Strategic Lending Solutions for Financial Flexibility",
    description: "Borrowing, when used judiciously, can be a powerful tool for achieving significant financial milestones or unlocking liquidity from existing assets without disrupting long-term investments. Whether you're acquiring your dream home, funding a major expense, or seeking capital for business expansion, navigating the lending landscape requires careful planning and expert guidance.\n\nWe act as your trusted advisor in the borrowing process, analyzing your needs, evaluating your financial profile, and identifying the most suitable lending products from a range of institutions. Our focus is on securing favourable terms (interest rates, tenure, processing fees) and ensuring the loan structure aligns seamlessly with your overall financial plan and repayment capacity. We simplify the application process and help you understand all associated terms and conditions.",
    subpoints: [
      { icon: Home, text: "Home Loans: Financing Your Dream Property. Guidance through various home loan options (purchase, construction, renovation), helping you compare interest rates, understand eligibility, and manage documentation for a smooth acquisition process." },
      { icon: Library, text: "Loans Against Property (LAP): Unlocking Asset Value. Utilize the equity built up in your residential or commercial property to access significant funds for business needs, education, weddings, or debt consolidation, often at competitive interest rates." },
      { icon: Banknote, text: "Loans Against Shares & Securities: Liquidity Without Selling. Borrow against your portfolio of eligible shares, mutual funds, or bonds to meet short-term financial requirements without needing to liquidate potentially profitable long-term investments." },
      { icon: Briefcase, text: "Business & Working Capital Finance: Fueling Growth. Structured financing solutions for business expansion, operational needs, machinery purchase, or managing cash flow cycles, tailored to your enterprise."},
      { icon: GraduationCap, text: "Education Loan Advisory: Investing in Future Generations. Assistance in navigating and securing education loans for higher studies in India or abroad, ensuring financial barriers don't hinder educational aspirations." }
    ],
    imagePlaceholder: "(Borrowing Image)",
  },
];

const ServicesPage = () => {
  return (
    <>
      {/* Page Hero Section */}
      <section className="bg-gradient-to-r from-slate-50 to-slate-100 py-24 px-6 text-center">
        <div className="container mx-auto">
          <p className="text-primary font-semibold text-sm tracking-wider uppercase mb-2">Our Wealth Advisory Services</p>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">Comprehensive Solutions for Your Financial Needs</h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            From protection and investments to borrowing, we offer a wide array of products and tailored solutions designed for your long-term success.
          </p>
        </div>
      </section>

      {/* Heading section with box styling */}
      <div className="container mx-auto px-6 pt-16 pb-0">
        <h2 className="
          text-3xl md:text-4xl font-bold text-slate-800 
          bg-slate-100 shadow-md rounded-lg
          border border-black
          py-3 px-6 
          w-fit mx-auto 
          text-center
          mb-12
        ">
          Our Core Service Pillars
        </h2>
      </div>

      {/* === INSERT IMAGE HERE === */}
      <div className="container mx-auto px-6 mb-16 text-center"> {/* Centering container with bottom margin */} 
        <div className="relative w-full max-w-4xl h-64 mx-auto rounded-lg overflow-hidden shadow-lg bg-gradient-to-r from-emerald-50 to-cyan-100"> {/* Sized, styled container */} 
          {/* Replace src with your actual image path */}
          {/* <Image 
            src="/images/services-overview-banner.jpg" // EXAMPLE PATH 
            alt="Overview of Financial Services"
            layout="fill"
            objectFit="cover" // Or 'contain' based on image
          /> */}
           <div className="w-full h-full flex items-center justify-center text-slate-500 italic">
             (Placeholder for Services Overview Image)
           </div>
        </div>
      </div>
      {/* === END IMAGE INSERT === */}

      {/* Services Details Sections */}
      {servicesDetails.map((service, index) => (
        <section
          key={service.id}
          id={service.id}
          className={`py-8 md:py-12 px-6 ${index % 2 === 0 ? 'bg-white' : 'bg-teal-50'}`}
        >
          <div className={`container mx-auto grid md:grid-cols-2 gap-12 items-center ${index % 2 !== 0 ? 'md:grid-flow-row-dense' : ''}`}>
            {/* Text Content - Order changes based on index */}
            <div className={`${index % 2 !== 0 ? 'md:col-start-2' : ''}`}> 
              {/* Centered Icon */}
              <div className="flex justify-center md:justify-start mb-4">
                <div className="bg-primary/10 p-3 rounded-full w-fit">
                    <service.icon className="h-8 w-8 text-primary" /> 
                 </div>
              </div>
                 
              {/* Styled Title Box */}
              <h2 className="text-3xl font-bold text-primary bg-primary/10 py-2 px-5 rounded-md w-fit mx-auto md:mx-0 text-center md:text-left mb-6">
                {service.title}
              </h2>
              
              {/* Headline - Add margin top */}
              <h3 className="text-xl font-semibold text-primary/90 mb-4 mt-8 md:mt-0">{service.headline}</h3>
              <p className="text-slate-600 leading-relaxed mb-6">{service.description}</p>
              <ul className="space-y-3">
                {service.subpoints.map((point, pIndex) => (
                  <li key={pIndex} className="flex items-center gap-3 text-slate-700">
                    <point.icon className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>{point.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Image Content - Order changes based on index */}
            <div className={`relative h-96 rounded-lg overflow-hidden shadow-lg ${index % 2 !== 0 ? 'md:col-start-1' : ''}`}> 
              {service.id === 'protection' ? (
                 <Image 
                   src="/assets/protection.png" // Path to the protection image
                   alt={service.title}
                   fill // Use fill to cover the container
                   style={{ objectFit: 'cover' }} // Ensure image covers the area
                   priority={true} // Prioritize loading if it's potentially above the fold
                 />
              ) : (
                 // Keep placeholder for other services
                 <div className="bg-gradient-to-br from-slate-300 to-slate-400 w-full h-full flex items-center justify-center text-slate-600">
                   {service.imagePlaceholder}
                 </div>
              )}
            </div>
          </div>
        </section>
      ))}

      {/* CTA Section (Reused from About) */}
      <section className="py-20 px-6 bg-gradient-to-r from-slate-800 to-slate-900 text-white"> 
         <div className="container mx-auto text-center">
           <h2 className="text-3xl font-bold mb-6 text-slate-100">Explore How Our Services Can Benefit You</h2> 
           <p className="mb-8 max-w-xl mx-auto text-slate-300">Contact us today for a detailed discussion on how our protection, investment, and borrowing solutions can be tailored to your unique financial situation.</p>
           <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"> 
             Get Personalized Advice
           </Button>
         </div>
      </section>
    </>
  );
};

export default ServicesPage; 