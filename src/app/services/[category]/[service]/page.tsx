'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import Link from 'next/link';

// Import the service data
import { serviceCategories } from '../../data';

// Helper to generate a URL-safe slug for a service title
function getServiceSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9\s-]/g, '') // remove special chars except space and hyphen
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

const ServicePage = () => {
  const params = useParams();
  const category = params.category as string;
  const serviceName = params.service as string;

  // Find the category and service
  const categoryData = serviceCategories.find(cat => cat.id === category);
  const serviceData = categoryData?.items.find(
    item => getServiceSlug(item.title) === serviceName
  );

  if (!categoryData || !serviceData) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-2xl font-bold text-slate-800 mb-4">Service not found</h1>
        <p className="text-slate-600 mb-8">The service you're looking for doesn't exist.</p>
        <Button asChild>
          <Link href="/services">Back to Services</Link>
        </Button>
      </div>
    );
  }

  // Get related services (other services in the same category)
  const relatedServices = categoryData.items
    .filter(item => item.title !== serviceData.title)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-2 md:px-6 lg:px-0">
      {/* Category Info */}
      <div className="max-w-5xl mx-auto mb-6">
        <div className="flex items-center gap-4 mb-2">
          <div className="bg-primary/10 p-3 rounded-full">
            <categoryData.categoryIcon className="h-7 w-7 text-primary" />
          </div>
          <h2 className="text-xl font-bold text-slate-800">{categoryData.categoryTitle}</h2>
        </div>
        <p className="text-slate-600 text-base mb-2">{categoryData.categoryDescription}</p>
      </div>
      {/* Header */}
      <div className="max-w-5xl mx-auto bg-white border rounded-xl shadow-sm px-6 py-8 mb-10">
          <Link 
            href="/services" 
            className="inline-flex items-center text-sm text-slate-600 hover:text-primary mb-8"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Services
          </Link>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
            <h1 className="text-4xl font-bold text-slate-800 mb-2">{serviceData.title}</h1>
              <p className="text-lg text-slate-600 max-w-2xl">{serviceData.description}</p>
            </div>
          <div className="bg-primary/10 p-4 rounded-full w-fit mx-auto md:mx-0">
            <serviceData.icon className="h-10 w-10 text-primary" />
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Information */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-semibold text-slate-800 mb-6">Key Features</h2>
              <div className="grid gap-4">
                {getServiceFeatures(serviceData.title).map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-slate-800">{feature.title}</h3>
                      <p className="text-slate-600 text-sm">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-semibold text-slate-800 mb-6">Requirements</h2>
              <div className="grid gap-4">
                {getServiceRequirements(serviceData.title).map((req, index) => (
                  <div key={index} className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-amber-500 mt-1 mr-3 flex-shrink-0" />
                    <p className="text-slate-600">{req}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Sidebar */}
        <div className="flex flex-col gap-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-6">Get Started</h2>
              <div className="space-y-4">
                <div className="flex items-center text-sm text-slate-600">
                  <Clock className="h-5 w-5 mr-3 text-primary" />
                  Quick Processing Time
                </div>
                <Button className="w-full" asChild>
                  <Link href="/contact">Apply Now</Link>
                </Button>
              </div>
            </div>
            {/* Related Services */}
            {relatedServices.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-slate-800 mb-6">Related Services</h2>
                <div className="space-y-4">
                  {relatedServices.map((service, index) => (
                    <Link
                      key={index}
                    href={`/services/${category}/${getServiceSlug(service.title)}`}
                      className="block p-4 rounded-lg border border-slate-100 hover:border-primary/30 hover:shadow-sm transition-all"
                    >
                      <div className="flex items-center">
                        <div className="bg-primary/10 p-2 rounded-full mr-4">
                          <service.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium text-slate-800">{service.title}</h3>
                          <p className="text-sm text-slate-500 line-clamp-1">{service.description}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

// Helper function to get service-specific features
function getServiceFeatures(serviceTitle: string) {
  // You can customize these features based on the service
  const defaultFeatures = [
    {
      title: "Competitive Rates",
      description: "Access to market-leading interest rates and flexible terms tailored to your needs."
    },
    {
      title: "Expert Guidance",
      description: "Dedicated relationship managers to guide you through the entire process."
    },
    {
      title: "Quick Processing",
      description: "Streamlined application process with minimal documentation requirements."
    }
  ];

  // Add service-specific features
  switch (serviceTitle.toLowerCase()) {
    case "home loan":
      return [
        {
          title: "Flexible Tenure",
          description: "Choose from a wide range of repayment terms up to 30 years."
        },
        {
          title: "High Loan Amount",
          description: "Up to 80% of the property value with competitive interest rates."
        },
        ...defaultFeatures
      ];
    // Add more cases for other services
    default:
      return defaultFeatures;
  }
}

// Helper function to get service-specific requirements
function getServiceRequirements(serviceTitle: string) {
  const defaultRequirements = [
    "Valid ID proof",
    "Address proof",
    "Income proof (last 6 months bank statements)",
    "Professional details"
  ];

  // Add service-specific requirements
  switch (serviceTitle.toLowerCase()) {
    case "home loan":
      return [
        "Property documents",
        "Income tax returns for last 2 years",
        "Property valuation report",
        ...defaultRequirements
      ];
    // Add more cases for other services
    default:
      return defaultRequirements;
  }
}

export default ServicePage; 