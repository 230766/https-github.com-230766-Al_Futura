import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import PropertyGrid from "./PropertyGrid";
import InvestmentCalculator from "./InvestmentCalculator";
import Footer from "./Footer";
import { fetchProperties } from "../lib/properties";

const Home = () => {
  // Sample featured property data
  const featuredProperty = {
    title: "Luxury Apartments in Downtown Dubai",
    location: "Downtown Dubai, UAE",
    roi: "8.5% annual",
    fundingProgress: 67,
    minInvestment: "AED 1,800",
  };

  const [properties, setProperties] = useState([
    // Default sample properties in case API fails
    {
      id: "1",
      title: "Luxury Apartment Complex",
      location: "Downtown Dubai, UAE",
      imageUrl:
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
      minInvestment: 1800,
      expectedROI: 8.5,
      fundingProgress: 240000,
      fundingGoal: 370000,
      propertyType: "Residential",
    },
    {
      id: "2",
      title: "Commercial Office Building",
      location: "Business Bay, Dubai",
      imageUrl:
        "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=80",
      minInvestment: 3700,
      expectedROI: 7.2,
      fundingProgress: 440000,
      fundingGoal: 920000,
      propertyType: "Commercial",
    },
    {
      id: "3",
      title: "Beachfront Vacation Rentals",
      location: "Palm Jumeirah, Dubai",
      imageUrl:
        "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&q=80",
      minInvestment: 2750,
      expectedROI: 9.1,
      fundingProgress: 325000,
      fundingGoal: 550000,
      propertyType: "Vacation",
    },
    {
      id: "4",
      title: "Modern Retail Center",
      location: "Dubai Marina, UAE",
      imageUrl:
        "https://images.unsplash.com/photo-1555636222-cae831e670b3?w=800&q=80",
      minInvestment: 4400,
      expectedROI: 6.8,
      fundingProgress: 770000,
      fundingGoal: 1100000,
      propertyType: "Retail",
    },
    {
      id: "5",
      title: "Urban Apartment Building",
      location: "Jumeirah Lake Towers, Dubai",
      imageUrl:
        "https://images.unsplash.com/photo-1460317442991-0ec209397118?w=800&q=80",
      minInvestment: 2200,
      expectedROI: 7.5,
      fundingProgress: 285000,
      fundingGoal: 660000,
      propertyType: "Residential",
    },
    {
      id: "6",
      title: "Industrial Warehouse Complex",
      location: "Dubai Industrial City, UAE",
      imageUrl:
        "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80",
      minInvestment: 7300,
      expectedROI: 8.0,
      fundingProgress: 1175000,
      fundingGoal: 1830000,
      propertyType: "Industrial",
    },
  ]);

  useEffect(() => {
    const loadProperties = async () => {
      try {
        const propertiesData = await fetchProperties();
        // Convert from snake_case to camelCase
        const formattedProperties = propertiesData.map((p) => ({
          id: p.id,
          title: p.title,
          location: p.location,
          imageUrl: p.image_url,
          minInvestment: p.min_investment,
          expectedROI: p.expected_roi,
          fundingProgress: p.funding_progress,
          fundingGoal: p.funding_goal,
          propertyType: p.property_type,
        }));
        setProperties(formattedProperties);
      } catch (error) {
        console.error("Error loading properties:", error);
        // Keep the sample data if there's an error
      }
    };

    loadProperties();
  }, []);

  return (
    <div className="bg-white min-h-screen">
      {/* Navigation */}
      <Navbar transparent={true} />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <section id="hero">
          <HeroSection
            headline="Premium Dubai Real Estate Investments"
            subheadline="Access exclusive property investments in Dubai starting from just AED 1,800. Earn passive income and grow your wealth with Al Futura."
            ctaText="Start Investing Now"
            backgroundImage="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&q=80"
            featuredProperty={featuredProperty}
          />
        </section>

        {/* Property Grid Section */}
        <section id="properties" className="pt-20">
          <PropertyGrid
            properties={properties}
            title="Investment Opportunities"
            description="Discover high-yield real estate investment opportunities with low minimum investments."
          />
        </section>

        {/* Investment Calculator Section */}
        <section id="calculator" className="py-20 px-4">
          <InvestmentCalculator
            initialAmount={5000}
            minAmount={500}
            maxAmount={100000}
            defaultYears={5}
            expectedAnnualReturn={8.5}
            comparisonInvestments={[
              { name: "Savings Account", annualReturn: 1.5, color: "#94a3b8" },
              { name: "Stock Market", annualReturn: 7.0, color: "#64748b" },
              { name: "Real Estate", annualReturn: 8.5, color: "#0ea5e9" },
            ]}
          />
        </section>

        {/* Call to Action Section */}
        <section className="bg-blue-600 py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Start Your Investment Journey?
            </h2>
            <p className="text-blue-100 mb-8 text-lg">
              Join thousands of investors who are already growing their wealth
              through real estate crowdfunding.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/signup">
                <button className="bg-white text-blue-600 hover:bg-blue-50 font-semibold py-3 px-6 rounded-md transition-colors duration-300">
                  Create Account
                </button>
              </Link>
              <Link to="/how-it-works">
                <button className="bg-transparent border-2 border-white text-white hover:bg-blue-700 font-semibold py-3 px-6 rounded-md transition-colors duration-300">
                  Learn More
                </button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer>
        <div className="bg-gray-900 text-white py-12 px-4">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Al Futura</h3>
              <p className="text-gray-400 mb-4">
                The leading real estate investment platform in Europe. Invest in
                properties with small amounts and earn passive income.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Facebook</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Twitter</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Instagram</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    How It Works
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Team
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Press
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Guides
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Cookie Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Investor Protection
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Risk Disclosure
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="bg-gray-950 py-6 px-4">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Al Futura. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-500 hover:text-gray-400 text-sm">
                Privacy
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-400 text-sm">
                Terms
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-400 text-sm">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
