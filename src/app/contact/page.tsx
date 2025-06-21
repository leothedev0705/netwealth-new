'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Phone,
  Mail,
  MapPin,
  Send,
  Building,
  Clock,
  CheckCircle2,
} from 'lucide-react';
import { motion } from 'framer-motion';
import LottieAnimation from '@/components/animations/LottieAnimation';
import PhoneLottie from '@/../public/assets/lotties/phone.json';

const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Mock submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setShowSuccess(true);
    (e.target as HTMLFormElement).reset();
    setTimeout(() => setShowSuccess(false), 5000);
  };

  return (
    <div className="bg-slate-50">
      {/* Hero Section */}
      <section className="bg-white py-24 sm:py-32 relative overflow-hidden">
        <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-100/40 rounded-full -z-0"></div>
        <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-blue-100/40 rounded-full -z-0"></div>

        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left"
            >
              <div className="inline-block rounded-full bg-teal-100 px-4 py-1.5 text-sm font-semibold text-[#00b894]">
                Let's Connect
              </div>
              <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-[#002855] sm:text-6xl">
                Get in Touch
              </h1>
              <p className="mt-6 max-w-xl mx-auto lg:mx-0 text-lg text-slate-600">
                We're here to help you navigate your financial future. Reach out
                with any questions or to schedule a consultation.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative -mt-12 h-80 w-full lg:-mt-0 lg:h-96"
            >
              <LottieAnimation animationData={PhoneLottie} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Form and Info Section */}
      <section className="py-24 sm:py-32">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
            {/* Left Column: Contact Info */}
            <div className="space-y-8">
              <InfoBlock
                icon={Mail}
                title="Email Us"
                content="netwealthindia05@gmail.com"
              />
              <InfoBlock
                icon={Phone}
                title="Call Us"
                content="9930777332 / 9930115558"
              />
              <InfoBlock
                icon={Clock}
                title="Working Hours"
                content="Mon - Fri: 9:00 AM - 6:00 PM"
              />
              <InfoBlock
                icon={MapPin}
                title="Our Address"
                content="A-101, Plot No-25/A, Nilkant CHS, 1st Floor, Jethabhai Lane, Near A Ward BMC Office, Ghatkopar (E), Mumbai - 400077"
              />
            </div>

            {/* Right Column: Form */}
            <div className="rounded-2xl bg-white p-8 shadow-lg sm:p-12">
              <h2 className="text-3xl font-bold text-[#002855]">
                Send Us a Message
              </h2>
              {showSuccess && (
                <div className="mt-6 flex items-center gap-3 rounded-lg bg-green-50 p-4 text-green-700">
                  <CheckCircle2 className="h-5 w-5" />
                  <p className="text-sm font-medium">
                    Message received! We will be in touch soon.
                  </p>
                </div>
              )}
              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="name" className="text-slate-700">
                      Name
                    </Label>
                    <Input
                      id="name"
                      name="entry.2005620554"
                      required
                      className="mt-2"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-slate-700">
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="entry.1045781291"
                      type="email"
                      required
                      className="mt-2"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="subject" className="text-slate-700">
                    Subject
                  </Label>
                  <Input
                    id="subject"
                    name="entry.1166974658"
                    className="mt-2"
                    placeholder="How can we help?"
                  />
                </div>
                <div>
                  <Label htmlFor="message" className="text-slate-700">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    name="entry.839337160"
                    rows={5}
                    className="mt-2"
                    placeholder="Your message..."
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  size="lg"
                  className="w-full bg-[#002855] text-white hover:bg-blue-900"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                  <Send className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="bg-white">
        <div className="container mx-auto px-6 py-24 sm:py-32">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-[#002855] sm:text-4xl">
              Visit Our Office
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">
              We're located in the heart of Ghatkopar, Mumbai. Feel free to stop by during business hours.
            </p>
          </div>
          <div className="mt-12 rounded-2xl overflow-hidden shadow-xl border-4 border-white">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d941.7219128738456!2d72.90721127507825!3d19.077241282276453!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c7c8c0c7b605%3A0x9edc0c7c94687a89!2sNilkant%20CHS%2C%20Jethabhai%20Ln%2C%20Ghatkopar%20East%2C%20Mumbai%2C%20Maharashtra%20400077!5e0!3m2!1sen!2sin!4v1709799047943!5m2!1sen!2sin"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Office Location"
              className="w-full"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

const InfoBlock = ({
  icon: Icon,
  title,
  content,
}: {
  icon: React.ElementType;
  title: string;
  content: string;
}) => (
  <div className="flex items-start gap-5">
    <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-blue-100">
      <Icon className="h-7 w-7 text-[#002855]" />
    </div>
    <div>
      <h3 className="text-xl font-bold text-[#002855]">{title}</h3>
      <p className="mt-1 text-slate-600">{content}</p>
    </div>
  </div>
);

export default ContactPage; 