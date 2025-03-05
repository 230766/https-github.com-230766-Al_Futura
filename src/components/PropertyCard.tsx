import React from "react";
import { Card } from "./ui/card";
import { MapPin, Home } from "lucide-react";

interface PropertyCardProps {
  id?: string;
  title?: string;
  location?: string;
  imageUrl?: string;
  minInvestment?: number;
  expectedROI?: number;
  fundingProgress?: number;
  fundingGoal?: number;
  propertyType?: string;
  onClick?: () => void;
}

const PropertyCard = ({
  id = "1",
  title = "Luxury Apartment Complex",
  location = "Downtown Dubai, UAE",
  imageUrl = "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
  minInvestment = 1800,
  expectedROI = 8.5,
  fundingProgress = 240000,
  fundingGoal = 370000,
  propertyType = "Residential",
  onClick,
}: PropertyCardProps) => {
  const progressPercentage = (fundingProgress / fundingGoal) * 100;

  return (
    <Card className="overflow-hidden h-full flex flex-col bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
        <div className="absolute top-3 right-3 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
          {propertyType}
        </div>
      </div>

      <div className="p-4 flex-grow flex flex-col">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>

        <div className="flex items-center text-gray-600 mb-3">
          <MapPin size={16} className="mr-1" />
          <span className="text-sm">{location}</span>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="bg-gray-50 p-2 rounded">
            <p className="text-xs text-gray-500">Min. Investment</p>
            <p className="font-semibold text-blue-600">AED {minInvestment}</p>
          </div>
          <div className="bg-gray-50 p-2 rounded">
            <p className="text-xs text-gray-500">Expected ROI</p>
            <p className="font-semibold text-green-600">{expectedROI}%</p>
          </div>
        </div>

        <div className="mt-auto">
          <div className="flex justify-between text-sm mb-1">
            <span>Funding Progress</span>
            <span className="font-medium">
              {Math.round(progressPercentage)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>AED {(fundingProgress / 1000).toFixed(1)}K raised</span>
            <span>Goal: AED {(fundingGoal / 1000).toFixed(1)}K</span>
          </div>
        </div>

        <button
          onClick={onClick}
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition-colors duration-300"
        >
          View Details
        </button>
      </div>
    </Card>
  );
};

export default PropertyCard;
