'use client';

import React, { lazy, Suspense } from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';

// Lazy load the logo SVG
const Logo = lazy(() => import('./Logo'));

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 px-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Column 1: Logo & Description */}
        <div className="space-y-4">
          <Link href="/" className="flex items-center space-x-2">
            <Suspense fallback={<div className="h-8 w-8 bg-slate-700 rounded-full animate-pulse" />}>
              <Logo />
            </Suspense>
            <span className="text-2xl font-bold text-white">Net Wealth India</span>
          </Link>
          <p className="text-sm text-slate-400">
            Empowering Your Financial Future with Trusted Expertise.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div className="space-y-4">
          <h4 className="font-semibold text-white mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
            <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
            <li><Link href="/services" className="hover:text-primary transition-colors">Services</Link></li>
            <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
          </ul>
        </div>

        {/* Column 3: Services Links */}
        <div className="space-y-4">
          <h4 className="font-semibold text-white mb-3">Our Services</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/services#protection" className="hover:text-primary transition-colors">Protection</Link></li>
            <li><Link href="/services#investing" className="hover:text-primary transition-colors">Investing</Link></li>
            <li><Link href="/services#borrowing" className="hover:text-primary transition-colors">Borrowing</Link></li>
          </ul>
        </div>

        {/* Column 4: Contact Info */}
        <div className="space-y-4">
          <h4 className="font-semibold text-white mb-3">Get In Touch</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li className="flex items-start gap-3">
              <MapPin className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
              <span>A-101, Plot No-25/A, Nilkant CHS, 1st Floor, Jethabhai Lane, Near A Ward BMC Office, Ghatkopar (E), Mumbai - 400077</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-primary flex-shrink-0" />
              <span>9930777332, 9930115558</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-primary flex-shrink-0" />
              <span className="hover:text-primary transition-colors"><a href="mailto:netwealthindia05@gmail.com">netwealthindia05@gmail.com</a></span>
            </li>
            <li className="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
              <span className="hover:text-primary transition-colors"><a href="https://www.netwealthindia.in" target="_blank" rel="noopener noreferrer">www.netwealthindia.in</a></span>
            </li>
          </ul>
        </div>
      </div>

      {/* GST Number Box */}
      <div className="mt-12 flex justify-center">
        <div className="bg-primary/10 border border-primary/20 rounded-lg px-6 py-3">
          <p className="text-primary font-medium">GST No: 27AAXFN5300R1ZG</p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-8 pt-8 border-t border-slate-700/50 text-center text-sm text-slate-500">
        <p>&copy; {currentYear} Net Wealth India. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer; 