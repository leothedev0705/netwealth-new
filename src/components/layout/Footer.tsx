'use client';

import React, { lazy, Suspense } from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';

// Lazy load the logo SVG
const Logo = lazy(() => import('./Logo'));

// Data for footer sections
const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Tools', href: '/tools' },
  { label: 'Contact Us', href: '/contact' },
];

const serviceLinks = [
  { label: 'Protection', href: '/services#protection' },
  { label: 'Investing', href: '/services#investing' },
  { label: 'Borrowing', href: '/services#borrowing' },
];

const contactInfo = [
  {
    icon: <MapPin className="h-4 w-4 text-primary mt-1 flex-shrink-0" />, 
    content: (
      <span>A-101, Plot No-25/A, Nilkant CHS, 1st Floor, Jethabhai Lane, Near A Ward BMC Office, Ghatkopar (E), Mumbai - 400077</span>
    )
  },
  {
    icon: <Phone className="h-4 w-4 text-primary flex-shrink-0" />,
    content: <span>9930777332, 9930115558</span>
  },
  {
    icon: <Mail className="h-4 w-4 text-primary flex-shrink-0" />,
    content: (
      <span className="hover:text-primary transition-colors"><a href="mailto:netwealthindia05@gmail.com">netwealthindia05@gmail.com</a></span>
    )
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
    content: (
      <span className="hover:text-primary transition-colors"><a href="https://www.netwealthindia.in" target="_blank" rel="noopener noreferrer">www.netwealthindia.in</a></span>
    )
  },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 px-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Column 1: Logo & Description */}
        <section className="space-y-4" aria-label="NetWealth India">
          <Link href="/" className="flex items-center space-x-2">
            <Suspense fallback={<div className="h-8 w-8 bg-slate-700 rounded-full animate-pulse" />}>
              <Logo />
            </Suspense>
            <span className="text-2xl font-bold text-white">NetWealth India</span>
          </Link>
          <p className="text-sm text-slate-400">
            Empowering Your Financial Future with Trusted Expertise.
          </p>
        </section>

        {/* Column 2: Quick Links */}
        <nav className="space-y-4" aria-label="Quick Links">
          <h4 className="font-semibold text-white mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            {quickLinks.map(link => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="hover:text-primary transition-colors"
                >{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Column 3: Services Links */}
        <nav className="space-y-4" aria-label="Our Services">
          <h4 className="font-semibold text-white mb-3">Our Services</h4>
          <ul className="space-y-2 text-sm">
            {serviceLinks.map(link => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="hover:text-primary transition-colors"
                >{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Column 4: Contact Info */}
        <address className="not-italic space-y-4" aria-label="Contact Information">
          <h4 className="font-semibold text-white mb-3">Get In Touch</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            {contactInfo.map((item, idx) => (
              <li className="flex items-start gap-3" key={idx}>
                {item.icon}
                {item.content}
            </li>
            ))}
          </ul>
        </address>
      </div>
      {/* GST Number Box */}
      <div className="mt-12 flex justify-center">
        <div className="bg-primary/10 border border-primary/20 rounded-lg px-6 py-3">
          <p className="text-primary font-medium">GST No: 27AAXFN5300R1ZG</p>
        </div>
      </div>
      {/* Bottom Bar */}
      <div className="mt-8 pt-8 border-t border-slate-700/50 text-center text-sm text-slate-500">
        <p>&copy; {currentYear} NetWealth India. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer; 