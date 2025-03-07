import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Check, User, Search, DollarSign, TrendingUp, Building } from 'lucide-react';

const HowItWorksPage = () => {
  const steps = [
    {
      icon: <User className="w-12 h-12 text-blue-600" />,
      title: "Create an Account",
      description: "Sign up in minutes with our simple verification process. We'll need some basic information to verify your identity."
    },
    {
      icon: <Search className="w-12 h-12 text-blue-600" />,
      title: "Browse Properties",
      description: "Explore our curated selection of premium properties. Each listing includes detailed information, photos, and investment projections."
    },
    {
      icon: <DollarSign className="w-12 h-12 text-blue-600" />,
      title: "Start Investing",
      description: "Choose your investment amount and complete the transaction securely through our platform. Minimum investment starts at AED 500."
    },
    {
      icon: <Building className="w-12 h-12 text-blue-600" />,
      title: "Own Real Estate",
      description: "Become a property owner. Your investment is secured by real estate and registered with relevant authorities."
    },
    {
      icon: <TrendingUp className="w-12 h-12 text-blue-600" />,
      title: "Track & Earn",
      description: "Monitor your investment performance in real-time and receive regular returns based on rental income and property appreciation."
    }
  ];

  const benefits = [
    "Low minimum investment amount",
    "Professional property management",
    "Diversified portfolio options",
    "Regular rental income",
    "Property value appreciation",
    "Fully digital process",
    "Transparent fee structure",
    "Expert market insights"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-24">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">How It Works</h1>
        
        <div className="mb-16">
          <p className="text-xl text-gray-600 max-w-3xl mb-12">
            Al Futura makes real estate investment simple and accessible. Follow these easy steps to start building your property portfolio.
          </p>

          <div className="space-y-12">
            {steps.map((step, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-8">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    {step.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {index + 1}. {step.title}
                    </h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-8 mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Benefits of Investing with Al Futura
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-3">
                <Check className="w-5 h-5 text-blue-600" />
                <span className="text-gray-700">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Is my investment secure?
              </h3>
              <p className="text-gray-600">
                Yes, your investment is backed by real estate assets and protected by robust legal frameworks. We maintain full compliance with UAE regulations and implement strict security measures.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How do I earn returns?
              </h3>
              <p className="text-gray-600">
                Returns come from two sources: regular rental income distributed monthly or quarterly, and potential capital appreciation when the property value increases.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Can I sell my investment?
              </h3>
              <p className="text-gray-600">
                Yes, you can sell your investment through our secondary market platform once the minimum holding period has passed, subject to market conditions and buyer availability.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HowItWorksPage; 