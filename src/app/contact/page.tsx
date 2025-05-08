'use client';

import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Phone, Mail, MapPin, Send, Clock } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Form data:', formData);
    // Add actual form submission logic here
    alert('Form submission not implemented yet.');
  };

  return (
    <>
      {/* Page Hero Section - Light Green Theme */}
      <section className="bg-gradient-to-br from-green-50 to-green-100 py-24 px-6 text-center">
        <div className="container mx-auto">
          <p className="text-primary font-semibold text-sm tracking-wider uppercase mb-2">Contact Us</p>
          <h1 className="text-4xl md:text-5xl font-bold text-green-900 mb-4">Get In Touch</h1>
          <p className="text-lg text-green-700 max-w-3xl mx-auto">
            We&apos;re here to help you navigate your financial future. Reach out to us with any questions or to schedule a consultation.
          </p>
        </div>
      </section>

      {/* Contact Info & Form Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-green-900">Phone</h3>
                <p className="text-green-700">9930777332, 9930115558</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-green-900">Email</h3>
                <p className="text-green-700">netwealthindia05@gmail.com</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-green-900">Address</h3>
                <p className="text-green-700">A-101, Plot No-25/A, Nilkant CHS, 1st Floor, Jethabhai Lane, Near A Ward BMC Office, Ghatkopar (E), Mumbai - 400077</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-green-900">Working Hours</h3>
                <p className="text-green-700">Monday - Friday: 9:00 AM - 6:00 PM</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-green-900 mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-green-900">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="border-green-200 focus:border-primary"
                  suppressHydrationWarning
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-green-900">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="border-green-200 focus:border-primary"
                  suppressHydrationWarning
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject" className="text-green-900">Subject</Label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Subject"
                  className="border-green-200 focus:border-primary"
                  suppressHydrationWarning
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message" className="text-green-900">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message"
                  className="border-green-200 focus:border-primary min-h-[150px]"
                  suppressHydrationWarning
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                suppressHydrationWarning
              >
                <Send className="mr-2 h-4 w-4" />
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage; 