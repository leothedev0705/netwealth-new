'use client';

import React, { useState, useRef } from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Phone, Mail, MapPin, Send, Clock, CheckCircle2 } from 'lucide-react';

const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const searchParams = new URLSearchParams();
    formData.forEach((value, key) => {
      searchParams.append(key, value.toString());
    });

    try {
      await fetch(
        'https://docs.google.com/forms/d/e/1FAIpQLSfnOt3Pbfp49KNTmMlfv0G25rMk5SxhA8zf4O6uNqb6NTCoXA/formResponse',
        {
          method: 'POST',
          body: searchParams,
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      form.reset();
      setShowSuccess(true);
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
    } catch (error) {
      // Google Forms will always throw a CORS error, but the form will still submit
      form.reset();
      setShowSuccess(true);
      
      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
    }

    setIsSubmitting(false);
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
                <p className="text-green-700">netwealthindia.official@gmail.com</p>
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
            {showSuccess && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-green-800">
                <CheckCircle2 className="h-5 w-5" />
                <p>Message received! We will get back to you soon.</p>
              </div>
            )}
            <form 
              ref={formRef}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div className="space-y-2">
                <Label htmlFor="name" className="text-green-900">Name *</Label>
                <Input
                  id="name"
                  name="entry.2005620554"
                  placeholder="Your name"
                  className="border-green-200 focus:border-primary"
                  required
                  type="text"
                  autoComplete="name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-green-900">Email *</Label>
                <Input
                  id="email"
                  name="entry.1045781291"
                  type="email"
                  placeholder="your@email.com"
                  className="border-green-200 focus:border-primary"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject" className="text-green-900">Subject</Label>
                <Input
                  id="subject"
                  name="entry.1166974658"
                  placeholder="Subject"
                  className="border-green-200 focus:border-primary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message" className="text-green-900">Message</Label>
                <Textarea
                  id="message"
                  name="entry.839337160"
                  placeholder="Your message"
                  className="border-green-200 focus:border-primary min-h-[150px]"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                disabled={isSubmitting}
              >
                <Send className="mr-2 h-4 w-4" />
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage; 