import React from 'react';
// import Image from 'next/image'; // Unused
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// import { AvatarImage } from "@/components/ui/avatar"; // Unused
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"; // Keep CardDescription
import { Button } from "@/components/ui/button";
// Keep required icons, remove unused Building, TrendingUp, Phone, Mail, Briefcase, DollarSign
import { CheckSquare, Users, Award, Check, Target, Compass, ClipboardList, ShieldCheck, BarChart } from 'lucide-react';
import Link from 'next/link';

// Placeholder Team Data
const teamMembers = [
  {
    name: "Shrikant Agarwal",
    title: "Founder & Lead Wealth Advisor",
    imageUrl: "/images/shrikant-agarwal.jpg", // Replace with actual path
    fallback: "SA",
    bio: "With over [Number] years of dedicated experience in financial services and holding [mention certifications like CFP/CFA if applicable, or state 'relevant financial certifications'], Shrikant founded Net Wealth India driven by a passion to provide truly personalized, ethical, and client-centric wealth advisory. He believes in empowering clients through education and building lasting partnerships focused on achieving long-term financial well-being."
  },
  // Add more team members here if needed
  // {
  //   name: "Jane Doe",
  //   title: "Senior Consultant",
  //   imageUrl: "/images/team-2.jpg",
  //   fallback: "JD",
  //   bio: "Specializing in investment portfolio management and risk assessment."
  // },
];

const AboutPage = () => {
  return (
    <>
      {/* Page Hero Section */}
      <section className="bg-gradient-to-r from-slate-50 to-slate-100 py-28 px-6 text-center">
        <div className="container mx-auto">
          <p className="text-primary font-semibold text-sm tracking-wider uppercase mb-3">About Net Wealth India</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 mb-5">Your Trusted Partner in Financial Growth</h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            We are dedicated to building lasting relationships by providing financial solutions tailored to empower your future with trust, guidance, and personal care.
          </p>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="space-y-8">
             <div>
                <h2 className="text-3xl font-bold text-slate-800 mb-4">Our Mission</h2>
                <p className="text-slate-600 leading-relaxed">To empower individuals and families with the financial freedom and confidence to achieve their life goals through expert guidance, personalized strategies, and unwavering commitment.</p>
             </div>
             <div>
                <h2 className="text-3xl font-bold text-slate-800 mb-4">Our Vision</h2>
                <p className="text-slate-600 leading-relaxed">To be the most trusted and sought-after wealth advisory firm, known for our integrity, expertise, and the tangible success we bring to our clients.</p>
             </div>
          </div>
          <div className="relative h-80 md:h-96 rounded-lg overflow-hidden shadow-lg">
             <div className="bg-gradient-to-br from-primary/20 to-emerald-300/30 w-full h-full flex items-center justify-center text-slate-500 italic">
                (Image illustrating growth/partnership)
             </div>
          </div>
        </div>
      </section>

      {/* === NEW Section: Our Story === */}
      <section className="py-20 px-6 bg-slate-50"> 
        <div className="container mx-auto text-center max-w-4xl">
          <div className="inline-block bg-primary/10 p-4 rounded-full mb-6">
             <Users className="h-8 w-8 text-primary" /> 
          </div>
          <h2 className="text-3xl font-bold text-slate-800 mb-5">Our Story: Founded on Trust</h2>
          <p className="text-slate-600 leading-relaxed">
            Net Wealth India was born from a simple observation: too many individuals navigate their financial lives without a truly dedicated partner focused solely on their best interests. We saw a need for objective, personalized guidance grounded in trust and transparency, free from conflicts of interest. Our foundation is built on the principle of forging long-term relationships, understanding your unique journey, and celebrating your financial milestones alongside you.
          </p>
        </div>
      </section>
      {/* === END NEW Section: Our Story === */}

      {/* === NEW Section: Our Guiding Philosophy === */}
      <section className="py-20 px-6 bg-white"> 
        <div className="container mx-auto text-center">
          <div className="inline-block bg-primary/10 p-4 rounded-full mb-6">
             <Compass className="h-8 w-8 text-primary" /> 
          </div>
          <h2 className="text-3xl font-bold text-slate-800 mb-12">Our Guiding Philosophy</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Philosophy 1: Personalization */}
            <Card className="text-center shadow-sm hover:shadow-md transition-shadow border-slate-100">
              <CardHeader>
                <CardTitle className="text-xl">Personalized Strategy</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-relaxed">
                  Your financial life is unique. We dedicate time to understanding your goals, values, and concerns to craft truly bespoke financial plans.
                </CardDescription>
              </CardContent>
            </Card>
            {/* Philosophy 2: Holistic Approach */}
            <Card className="text-center shadow-sm hover:shadow-md transition-shadow border-slate-100">
              <CardHeader>
                <CardTitle className="text-xl">Holistic Approach</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-relaxed">
                  We look at your entire financial picture – protection, investments, liabilities, goals – ensuring all pieces work together harmoniously.
                </CardDescription>
              </CardContent>
            </Card>
            {/* Philosophy 3: Long-Term Partnership */}
            <Card className="text-center shadow-sm hover:shadow-md transition-shadow border-slate-100">
              <CardHeader>
                <CardTitle className="text-xl">Long-Term Partnership</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-relaxed">
                  Wealth creation is a journey, not a destination. We build lasting relationships, adapting your strategy as your life evolves.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      {/* === END NEW Section: Our Guiding Philosophy === */}

      {/* Core Values Section */}
       <section className="py-20 px-6 bg-slate-50">
         <div className="container mx-auto text-center">
           <h2 className="text-3xl font-bold text-slate-800 mb-12">Our Core Values</h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
             {/* Value 1: Integrity */}
             <Card className="text-center bg-white shadow-sm hover:shadow-md transition-shadow border-transparent">
               <CardHeader className="items-center">
                 <div className="bg-primary/10 p-3 rounded-full mb-3 w-fit">
                   <Check className="h-6 w-6 text-primary" />
                 </div>
                 <CardTitle className="text-xl">Integrity</CardTitle>
               </CardHeader>
               <CardContent>
                 <CardDescription className="text-sm">Upholding the highest ethical standards in every interaction.</CardDescription>
               </CardContent>
             </Card>
             {/* Value 2: Client-Centric */}
             <Card className="text-center bg-white shadow-sm hover:shadow-md transition-shadow border-transparent">
               <CardHeader className="items-center">
                 <div className="bg-primary/10 p-3 rounded-full mb-3 w-fit">
                   <Target className="h-6 w-6 text-primary" />
                 </div>
                 <CardTitle className="text-xl">Client-Centric</CardTitle>
               </CardHeader>
               <CardContent>
                 <CardDescription className="text-sm">Putting your needs and financial well-being first, always.</CardDescription>
               </CardContent>
             </Card>
             {/* Value 3: Expertise */}
             <Card className="text-center bg-white shadow-sm hover:shadow-md transition-shadow border-transparent">
               <CardHeader className="items-center">
                 <div className="bg-primary/10 p-3 rounded-full mb-3 w-fit">
                   <Award className="h-6 w-6 text-primary" />
                 </div>
                 <CardTitle className="text-xl">Expertise</CardTitle>
               </CardHeader>
               <CardContent>
                 <CardDescription className="text-sm">Leveraging deep knowledge and experience for optimal results.</CardDescription>
               </CardContent>
             </Card>
           </div>
         </div>
       </section>

      {/* === INSERT NEW SECTION HERE === */}
      <section className="py-20 px-6 bg-white"> 
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">Deep Dive into Stock Market Expertise</h2>
          <p className="text-slate-600 mb-12 max-w-2xl mx-auto">We combine in-depth market analysis with disciplined strategies to help you navigate the complexities of the stock market and achieve your investment objectives.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left"> 
            {/* Expertise Item 1: Market Analysis */}
            <Card className="bg-slate-50/50 p-6 rounded-lg shadow-sm hover:shadow-lg hover:border-primary/30 transition-all duration-300 border border-transparent">
              <div className="flex items-center mb-4">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                  <BarChart className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-slate-700">Market Analysis</h3>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed">Utilizing both fundamental and technical analysis to identify opportunities and understand market trends.</p>
            </Card>

            {/* Expertise Item 2: Portfolio Construction */}
            <Card className="bg-slate-50/50 p-6 rounded-lg shadow-sm hover:shadow-lg hover:border-primary/30 transition-all duration-300 border border-transparent">
              <div className="flex items-center mb-4">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                  <ClipboardList className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-slate-700">Portfolio Construction</h3>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed">Building diversified portfolios tailored to your risk tolerance, time horizon, and financial goals.</p>
            </Card>

            {/* Expertise Item 3: Risk Management */}
            <Card className="bg-slate-50/50 p-6 rounded-lg shadow-sm hover:shadow-lg hover:border-primary/30 transition-all duration-300 border border-transparent">
              <div className="flex items-center mb-4">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                  <ShieldCheck className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-slate-700">Risk Management</h3>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed">Implementing strategies to mitigate potential downsides and protect your capital during market volatility.</p>
            </Card>
          </div>
        </div>
      </section>
      {/* === END OF NEW SECTION === */}

      {/* Team Section */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">Meet the Founder & Lead Advisor</h2>
          <p className="text-slate-600 mb-12 max-w-2xl mx-auto">Led by experienced professionals dedicated to your financial success. We are committed to continuous learning and staying abreast of market trends and regulatory changes.</p>
          <div className="flex justify-center">
            {teamMembers.map((member, index) => (
              <Card key={index} className="w-full max-w-2xl p-6 md:p-8 shadow-lg border-gray-200 bg-white overflow-hidden">
                <CardContent className="grid md:grid-cols-3 gap-6 items-center text-center md:text-left">
                  <div className="md:col-span-1 flex flex-col items-center">
                    <Avatar className="h-32 w-32 mb-4 border-4 border-primary/30">
                      <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-500 text-lg font-medium">(Pic)</div>
                      <AvatarFallback className="bg-primary/10 text-primary text-2xl font-semibold">{member.fallback}</AvatarFallback>
                    </Avatar>
                    <h3 className="text-xl font-bold text-slate-800 mt-2">{member.name}</h3>
                    <p className="text-primary font-medium text-sm">{member.title}</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-slate-500 text-sm leading-relaxed">{member.bio}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

       {/* CTA Section */}
       <section className="py-20 px-6 bg-gradient-to-r from-slate-800 to-slate-900 text-white">
         <div className="container mx-auto text-center">
           <h2 className="text-3xl font-bold mb-6 text-slate-100">Ready to Start Your Financial Journey?</h2>
           <p className="mb-8 max-w-xl mx-auto text-slate-300">Let&apos;s discuss how Net Wealth India can help you achieve your financial goals. Reach out today for a personalized consultation.</p>
           <Button 
             size="lg" 
             asChild 
             variant="outline"
             className="
               font-semibold 
               border-2 border-white text-white
               hover:bg-white/10 hover:text-white
               hover:scale-105 transition-transform duration-200
             "
            >
             <Link href="/contact">Contact Us Now</Link>
           </Button>
         </div>
       </section>

       {/* Why Choose Us Section (Similar to Homepage, adjust content if needed) */}
       <section className="py-16 md:py-24 px-6 bg-white">
           {/* ... section title ... */}
           <div className="text-center mb-12">
               <div className="inline-block bg-primary/10 p-3 rounded-full mb-3">
                  <Award className="h-6 w-6 text-primary" />
                </div>
               <h2 className="text-3xl md:text-4xl font-bold text-slate-800">Why Partner With Us?</h2>
               <p className="text-lg text-slate-500 mt-2 max-w-2xl mx-auto">Experience the Net Wealth India difference.</p>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
               {/* Feature 1 */}
               <div className="p-6 bg-slate-50/50 rounded-lg border border-slate-100 text-center">
                  <CheckSquare className="h-8 w-8 text-primary mx-auto mb-3"/>
                  <h3 className="text-lg font-semibold text-slate-700 mb-1">Holistic Approach</h3>
                  <p className="text-sm text-slate-500">Comprehensive planning covering all aspects of your financial life.</p>
               </div>
                {/* Feature 2 */}
               <div className="p-6 bg-slate-50/50 rounded-lg border border-slate-100 text-center">
                   <Users className="h-8 w-8 text-primary mx-auto mb-3"/>
                   <h3 className="text-lg font-semibold text-slate-700 mb-1">Client-First Philosophy</h3>
                    {/* Fixed quote */}
                   <p className="text-sm text-slate-500">Your interests always come first. We build relationships based on trust.</p>
                </div>
                 {/* Feature 3 */}
                <div className="p-6 bg-slate-50/50 rounded-lg border border-slate-100 text-center">
                    <Award className="h-8 w-8 text-primary mx-auto mb-3"/>
                    <h3 className="text-lg font-semibold text-slate-700 mb-1">Proven Expertise</h3>
                    <p className="text-sm text-slate-500">Decades of combined experience navigating complex financial landscapes.</p>
                </div>
           </div>
       </section>
    </>
  );
};

export default AboutPage; 