import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { FeaturedProperty } from "./FeaturedProperty";

interface HeroSectionProps {
  headline?: string;
  subheadline?: string;
  ctaText?: string;
  backgroundImage?: string;
}

const HeroSection = ({
  headline = "Premium Dubai Real Estate Investments",
  subheadline = "Access exclusive property investments in Dubai starting from just AED 1,800. Earn passive income and grow your wealth with Al Futura.",
  ctaText = "Start Investing Now",
  backgroundImage = "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&q=80",
}: HeroSectionProps) => {
  return (
    <section className="relative w-full bg-white">
      <div className="h-[85vh] pt-16 md:pt-20">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50"></div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col items-start justify-start pt-12">
          <div className="max-w-2xl text-white mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{headline}</h1>
            <p className="text-lg md:text-xl mb-8 text-gray-200">{subheadline}</p>

            <Link to="/properties">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold"
              >
                {ctaText} <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>

          {/* Featured Property Card */}
          <div className="relative max-w-lg w-full md:w-[480px] mx-auto md:mx-0 -mb-48">
            <FeaturedProperty />
          </div>
        </div>
      </div>
      {/* Spacer div to create gap between sections */}
      <div className="h-48 bg-white"></div>
    </section>
  );
};

export default HeroSection;
