import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import PropertyGrid from "../components/PropertyGrid";
import { fetchProperties } from "../lib/properties";

const Properties = () => {
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
    {
      id: "7",
      title: "Luxury Villa Development",
      location: "Emirates Hills, Dubai",
      imageUrl:
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
      minInvestment: 5500,
      expectedROI: 8.8,
      fundingProgress: 890000,
      fundingGoal: 1500000,
      propertyType: "Residential",
    },
    {
      id: "8",
      title: "Boutique Hotel",
      location: "Jumeirah Beach, Dubai",
      imageUrl:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
      minInvestment: 8200,
      expectedROI: 9.5,
      fundingProgress: 1250000,
      fundingGoal: 2200000,
      propertyType: "Vacation",
    },
    {
      id: "9",
      title: "Mixed-Use Development",
      location: "Dubai Silicon Oasis, UAE",
      imageUrl:
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
      minInvestment: 3100,
      expectedROI: 7.8,
      fundingProgress: 520000,
      fundingGoal: 980000,
      propertyType: "Commercial",
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
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-20">
        <PropertyGrid
          properties={properties}
          title="All Investment Properties"
          description="Browse our complete collection of high-yield real estate investment opportunities in Dubai."
        />
      </div>
    </div>
  );
};

export default Properties;
