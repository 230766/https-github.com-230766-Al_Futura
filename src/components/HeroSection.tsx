import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { ArrowRight, Home, TrendingUp, Percent } from "lucide-react";

interface HeroSectionProps {
  headline?: string;
  subheadline?: string;
  ctaText?: string;
  backgroundImage?: string;
  featuredProperty?: {
    title: string;
    location: string;
    roi: string;
    fundingProgress: number;
    minInvestment: string;
  };
}

const HeroSection = ({
  headline = "Premium Dubai Real Estate Investments",
  subheadline = "Access exclusive property investments in Dubai starting from just AED 1,800. Earn passive income and grow your wealth with Al Futura.",
  ctaText = "Start Investing Now",
  backgroundImage = "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&q=80",
  featuredProperty = {
    title: "Luxury Apartments in Downtown Dubai",
    location: "Downtown Dubai, UAE",
    roi: "8.5% annual",
    fundingProgress: 67,
    minInvestment: "AED 1,800",
  },
}: HeroSectionProps) => {
  return (
    <div className="relative w-full h-[700px] bg-white overflow-hidden pt-24 md:pt-28">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center">
        <div className="max-w-2xl text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{headline}</h1>
          <p className="text-lg md:text-xl mb-8">{subheadline}</p>

          <Link to="/properties">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold"
            >
              {ctaText} <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>

        {/* Featured Investment Card */}
        <div className="mt-8 bg-white rounded-lg shadow-xl p-6 max-w-md z-10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-800">
              Featured Opportunity
            </h3>
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
              HOT
            </span>
          </div>

          <h4 className="text-lg font-semibold text-gray-800 mb-2">
            {featuredProperty.title}
          </h4>

          <div className="flex items-center mb-2">
            <Home className="h-4 w-4 text-gray-500 mr-2" />
            <span className="text-gray-600">{featuredProperty.location}</span>
          </div>

          <div className="flex items-center mb-2">
            <TrendingUp className="h-4 w-4 text-green-500 mr-2" />
            <span className="text-green-600 font-medium">
              {featuredProperty.roi}
            </span>
          </div>

          <div className="flex items-center mb-4">
            <Percent className="h-4 w-4 text-blue-500 mr-2" />
            <span className="text-gray-600">
              Min. investment: {featuredProperty.minInvestment}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${featuredProperty.fundingProgress}%` }}
            ></div>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Funding Progress</span>
            <span className="font-medium">
              {featuredProperty.fundingProgress}%
            </span>
          </div>

          <Link to="/property/1">
            <Button
              variant="outline"
              className="w-full mt-4 border-blue-600 text-blue-600 hover:bg-blue-50"
            >
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
