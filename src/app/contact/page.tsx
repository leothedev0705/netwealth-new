// TODO: Implement form state handling and submission logic (e.g., using react-hook-form and an API route/server action)
'use client'; // Mark as client component for form handling

import React from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Phone, Mail, MapPin, Send, Clock } from 'lucide-react';

const ContactPage = () => {
  // Basic handler for placeholder
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert('Form submission not implemented yet.');
    // Add actual form submission logic here
  };

  return (
    <>
      {/* Page Hero Section - Major Sky Blue Theme */}
      <section className="bg-gradient-to-br from-sky-400 to-sky-200 py-24 px-6 text-center">
        <div className="container mx-auto">
          <p className="text-white font-semibold text-sm tracking-wider uppercase mb-2 opacity-90">Contact Us</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Get In Touch</h1>
          <p className="text-lg text-sky-100 max-w-3xl mx-auto">
            We're here to help you navigate your financial future. Reach out to us with any questions or to schedule a consultation.
          </p>
        </div>
      </section>

      {/* Contact Info & Form Section - Major Sky Blue Theme */}
      <section className="py-20 px-6 bg-sky-50">
        <div className="container mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-start">
          {/* Contact Details */}
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold text-slate-900 mb-6">Contact Information</h2>
            <div className="space-y-4">
              {/* Address */}
              <div className="flex items-start gap-4 p-4 rounded-md">
                <div className="bg-sky-600 text-white p-3 rounded-full flex-shrink-0 shadow">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-700 mb-1">Our Office</h4>
                  <p className="text-slate-500 text-sm italic">
                    123 Finance Street, Suite 456,<br/>
                    Wealth City, ST 78910
                  </p>
                </div>
              </div>
              {/* Phone */}
              <div className="flex items-start gap-4 p-4 rounded-md">
                <div className="bg-sky-600 text-white p-3 rounded-full flex-shrink-0 shadow">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-700 mb-1">Phone</h4>
                  <p className="text-slate-500 text-sm hover:text-sky-700 transition-colors">
                    <a href="tel:+919949474099">99494 74099</a>, <a href="tel:+917981290540">79812 90540</a>
                   </p>
                </div>
              </div>
              {/* Email */}
              <div className="flex items-start gap-4 p-4 rounded-md">
                <div className="bg-sky-600 text-white p-3 rounded-full flex-shrink-0 shadow">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-700 mb-1">Email</h4>
                   <p className="text-slate-500 text-sm hover:text-sky-700 transition-colors italic">
                    <a href="mailto:info@netwealthindia.com">info@netwealthindia.com</a>
                   </p>
                </div>
              </div>
               {/* Office Hours */} 
              <div className="flex items-start gap-4 p-4 rounded-md">
                 <div className="bg-sky-600 text-white p-3 rounded-full flex-shrink-0 shadow">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-700 mb-1">Office Hours</h4>
                   <p className="text-slate-500 text-sm">
                     Monday - Friday: 9:00 AM - 6:00 PM<br/>
                     Saturday: 10:00 AM - 2:00 PM<br/>
                     Sunday: Closed
                   </p>
                </div>
              </div>
            </div>
             {/* Map Placeholder */}
             <div className="mt-8 aspect-video bg-white rounded-lg flex items-center justify-center text-slate-500 border border-slate-300">
                 (Map Placeholder)
             </div>
          </div>

          {/* Contact Form - Major Sky Blue Theme */}
          <div className="bg-white p-8 md:p-10 rounded-lg shadow-xl border border-slate-200">
            <h2 className="text-3xl font-semibold text-sky-700 mb-6">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-sm font-medium text-slate-800">Full Name</Label>
                <Input id="name" type="text" placeholder="Your Name" required className="mt-1 bg-white focus-visible:ring-1 focus-visible:ring-sky-500 focus-visible:ring-offset-0 hover:border-sky-400 transition-colors" />
              </div>
              <div>
                <Label htmlFor="email" className="text-sm font-medium text-slate-800">Email Address</Label>
                <Input id="email" type="email" placeholder="your.email@example.com" required className="mt-1 bg-white focus-visible:ring-1 focus-visible:ring-sky-500 focus-visible:ring-offset-0 hover:border-sky-400 transition-colors" />
              </div>
               <div>
                <Label htmlFor="phone" className="text-sm font-medium text-slate-800">Phone Number (Optional)</Label>
                <Input id="phone" type="tel" placeholder="(+91) ..." className="mt-1 bg-white focus-visible:ring-1 focus-visible:ring-sky-500 focus-visible:ring-offset-0 hover:border-sky-400 transition-colors" />
              </div>
              <div>
                <Label htmlFor="subject" className="text-sm font-medium text-slate-800">Subject</Label>
                <Input id="subject" type="text" placeholder="Reason for contacting" required className="mt-1 bg-white focus-visible:ring-1 focus-visible:ring-sky-500 focus-visible:ring-offset-0 hover:border-sky-400 transition-colors" />
              </div>
              <div>
                <Label htmlFor="message" className="text-sm font-medium text-slate-800">Message</Label>
                <Textarea id="message" placeholder="Your message details..." required rows={5} className="mt-1 bg-white focus-visible:ring-1 focus-visible:ring-sky-500 focus-visible:ring-offset-0 hover:border-sky-400 transition-colors" />
              </div>
              <div>
                <Button type="submit" size="lg" className="w-full bg-sky-600 hover:bg-sky-700 text-white transition-all duration-200 hover:scale-[1.02]">
                  <Send className="mr-2 h-4 w-4" /> Send Message
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage; 