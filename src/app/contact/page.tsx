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
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.4476744283436!2d72.90532627518251!3d19.08384251982052!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c62db66000d5%3A0x3c0245cc58b06100!2sNetwealthIndia%20Office!5e0!3m2!1sen!2sin!4v1709799047943!5m2!1sen!2sin"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="NetwealthIndia Office Location"
              className="w-full"
            ></iframe>
          </div>
          
          {/* Location Details Card */}
          <div className="mt-12 bg-gradient-to-r from-teal-50 to-blue-50 rounded-2xl p-8 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-teal-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Building className="h-8 w-8 text-teal-600" />
                </div>
                <h3 className="text-xl font-semibold text-[#002855] mb-2">NetwealthIndia Office</h3>
                <p className="text-slate-600">A-101, Plot No-25/A, Nilkant CHS, 1st Floor, Jethabhai Lane, Near A Ward BMC Office, Ghatkopar (E), Mumbai - 400077</p>
              </div>
              
              <div className="text-center">
                <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <MapPin className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-[#002855] mb-2">Coordinates</h3>
                <p className="text-slate-600">19.0838425, 72.9081277</p>
                <p className="text-sm text-slate-500 mt-1">Ghatkopar East, Mumbai</p>
              </div>
              
              <div className="text-center">
                <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Phone className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-[#002855] mb-2">Get Directions</h3>
                <a 
                  href="https://www.google.com/maps/place/Ghatkopar+Nilkanth+CHSL/@19.0837268,72.9073226,18.57z/data=!4m6!3m5!1s0x3be7c62db66000d5:0x3c0245cc58b06100!8m2!3d19.0838425!4d72.9081277!16s%2Fg%2F11c0xqr314?hl=en&entry=ttu&g_ep=EgoyMDI1MDYzMC4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
                >
                  Open in Google Maps
                  <MapPin className="h-4 w-4" />
                </a>
              </div>
            </div>
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