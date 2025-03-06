import React from "react";
import Navbar from "../components/Navbar";
import { Card, CardContent } from "../components/ui/card";
import {
  Search,
  Building,
  CreditCard,
  TrendingUp,
  ArrowRight,
} from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: <Search className="h-10 w-10 text-blue-600" />,
      title: "Browse Properties",
      description:
        "Explore our curated selection of premium real estate investment opportunities in Dubai.",
    },
    {
      icon: <Building className="h-10 w-10 text-blue-600" />,
      title: "Choose Your Investment",
      description:
        "Select the property that aligns with your investment goals and risk tolerance.",
    },
    {
      icon: <CreditCard className="h-10 w-10 text-blue-600" />,
      title: "Invest Securely",
      description:
        "Invest with as little as AED 1,800 through our secure payment platform.",
    },
    {
      icon: <TrendingUp className="h-10 w-10 text-blue-600" />,
      title: "Track & Earn",
      description:
        "Monitor your investment performance and receive regular returns based on the property's performance.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            How Al Futura Works
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Investing in real estate has never been easier. Follow these simple
            steps to start building your real estate portfolio.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => (
            <Card
              key={index}
              className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-blue-50 p-4 rounded-full mb-4">
                    {step.icon}
                  </div>
                  <div className="bg-blue-600 text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center mb-4">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="bg-gray-50 rounded-xl p-8 mb-16">
          <h2 className="text-2xl font-bold mb-6">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">
                What is real estate crowdfunding?
              </h3>
              <p className="text-gray-600">
                Real estate crowdfunding allows multiple investors to pool their
                money together to invest in properties that would otherwise be
                too expensive for individual investors.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">
                How much can I invest?
              </h3>
              <p className="text-gray-600">
                You can start investing with as little as AED 1,800, depending
                on the property. There's no upper limit to how much you can
                invest.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">
                How do I earn returns?
              </h3>
              <p className="text-gray-600">
                You earn returns through rental income (distributed quarterly or
                monthly) and potential property value appreciation when the
                property is sold.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Is my investment secure?
              </h3>
              <p className="text-gray-600">
                All investments are secured by the underlying real estate asset.
                We also conduct thorough due diligence on all properties before
                listing them on our platform.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-blue-600 rounded-xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">
            Ready to Start Your Investment Journey?
          </h2>
          <p className="text-blue-100 mb-6">
            Join thousands of investors who are already growing their wealth
            through real estate crowdfunding.
          </p>
          <button className="bg-white text-blue-600 hover:bg-blue-50 font-semibold py-3 px-6 rounded-md transition-colors duration-300 inline-flex items-center">
            Create Your Account <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
