import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import {
  MapPin,
  Home,
  DollarSign,
  TrendingUp,
  Percent,
  ArrowLeft,
  Users,
  Calendar,
} from "lucide-react";
import Navbar from "./Navbar";

interface PropertyDetailProps {
  id?: string;
  property?: any;
}

const PropertyDetail = ({
  id,
  property: propProperty,
}: PropertyDetailProps) => {
  const params = useParams();
  const navigate = useNavigate();
  const propertyId = id || params.id;

  // This would normally come from an API call using the ID
  // For now we'll use sample data
  const sampleProperties = [
    {
      id: "1",
      title: "Luxury Apartment Complex",
      description:
        "A premium residential complex with high-end amenities in the heart of Downtown Dubai. Features include 24/7 security, swimming pool, fitness center, and landscaped gardens. Each unit offers modern finishes, spacious layouts, and balconies with stunning Burj Khalifa views.",
      location: "Downtown Dubai, UAE",
      imageUrl:
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
      minInvestment: 1800,
      expectedROI: 8.5,
      fundingProgress: 240000,
      fundingGoal: 370000,
      propertyType: "Residential",
      additionalImages: [
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
        "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800&q=80",
      ],
      features: [
        "24/7 Security",
        "Swimming Pool",
        "Fitness Center",
        "Landscaped Gardens",
        "Underground Parking",
        "Concierge Service",
      ],
      investmentDetails: {
        term: "5 years",
        payoutFrequency: "Quarterly",
        exitStrategy: "Property sale or refinancing",
        investorCount: 127,
      },
    },
    {
      id: "2",
      title: "Commercial Office Building",
      description:
        "Modern office space in Dubai's Business Bay district with excellent connectivity. The property features open floor plans, high-speed internet infrastructure, meeting rooms, and a rooftop terrace. Located near major transportation hubs and business centers.",
      location: "Business Bay, Dubai",
      imageUrl:
        "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=80",
      minInvestment: 3700,
      expectedROI: 7.2,
      fundingProgress: 440000,
      fundingGoal: 920000,
      propertyType: "Commercial",
      additionalImages: [
        "https://images.unsplash.com/photo-1497215842964-222b430dc094?w=800&q=80",
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80",
        "https://images.unsplash.com/photo-1604328698692-f76ea9498e76?w=800&q=80",
      ],
      features: [
        "Open Floor Plans",
        "High-Speed Internet",
        "Meeting Rooms",
        "Rooftop Terrace",
        "24/7 Access",
        "Parking Facilities",
      ],
      investmentDetails: {
        term: "7 years",
        payoutFrequency: "Monthly",
        exitStrategy: "Long-term lease agreements with corporate tenants",
        investorCount: 89,
      },
    },
    // Add more properties as needed
  ];

  const property =
    propProperty ||
    sampleProperties.find((p) => p.id === propertyId) ||
    sampleProperties[0];

  const progressPercentage =
    (property.fundingProgress / property.fundingGoal) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 pt-24 pb-12">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back to properties
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Property Header */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-3xl font-bold text-gray-900">
                  {property.title}
                </h1>
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                  {property.propertyType}
                </Badge>
              </div>
              <div className="flex items-center text-gray-600">
                <MapPin className="h-5 w-5 mr-2 text-blue-600" />
                <span>{property.location}</span>
              </div>
            </div>

            {/* Main Image */}
            <div className="aspect-video w-full overflow-hidden rounded-lg">
              <img
                src={property.imageUrl}
                alt={property.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Additional Images */}
            {property.additionalImages && (
              <div className="grid grid-cols-3 gap-4">
                {property.additionalImages.map((img, index) => (
                  <div
                    key={index}
                    className="aspect-video overflow-hidden rounded-lg"
                  >
                    <img
                      src={img}
                      alt={`${property.title} - view ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Description */}
            <div>
              <h2 className="text-xl font-semibold mb-4">
                About this property
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {property.description}
              </p>
            </div>

            {/* Features */}
            {property.features && (
              <div>
                <h2 className="text-xl font-semibold mb-4">
                  Property Features
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {property.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-blue-600 mr-2"></div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Investment Details */}
            {property.investmentDetails && (
              <div>
                <h2 className="text-xl font-semibold mb-4">
                  Investment Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex items-center mb-2">
                      <Calendar className="h-5 w-5 text-blue-600 mr-2" />
                      <h3 className="font-medium">Investment Term</h3>
                    </div>
                    <p className="text-gray-700">
                      {property.investmentDetails.term}
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex items-center mb-2">
                      <TrendingUp className="h-5 w-5 text-blue-600 mr-2" />
                      <h3 className="font-medium">Payout Frequency</h3>
                    </div>
                    <p className="text-gray-700">
                      {property.investmentDetails.payoutFrequency}
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex items-center mb-2">
                      <Users className="h-5 w-5 text-blue-600 mr-2" />
                      <h3 className="font-medium">Current Investors</h3>
                    </div>
                    <p className="text-gray-700">
                      {property.investmentDetails.investorCount} investors
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex items-center mb-2">
                      <Home className="h-5 w-5 text-blue-600 mr-2" />
                      <h3 className="font-medium">Exit Strategy</h3>
                    </div>
                    <p className="text-gray-700">
                      {property.investmentDetails.exitStrategy}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Investment Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 bg-white shadow-lg">
              <CardHeader>
                <CardTitle>Investment Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Investment Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center mb-1">
                      <DollarSign className="h-4 w-4 text-blue-600 mr-1" />
                      <span className="text-sm text-gray-500">
                        Min. Investment
                      </span>
                    </div>
                    <p className="text-lg font-semibold">
                      AED {property.minInvestment.toLocaleString()}
                    </p>
                  </div>

                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center mb-1">
                      <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                      <span className="text-sm text-gray-500">
                        Expected ROI
                      </span>
                    </div>
                    <p className="text-lg font-semibold text-green-600">
                      {property.expectedROI}%
                    </p>
                  </div>
                </div>

                {/* Funding Progress */}
                <div>
                  <h3 className="text-sm font-medium mb-2">Funding Progress</h3>
                  <div className="space-y-2">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{
                          width: `${Math.min(100, progressPercentage)}%`,
                        }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        AED {property.fundingProgress.toLocaleString()} raised
                      </span>
                      <span className="font-medium">
                        {Math.round(progressPercentage)}% of AED
                        {property.fundingGoal.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Investment Amount Input */}
                <div>
                  <label
                    htmlFor="investmentAmount"
                    className="block text-sm font-medium mb-2"
                  >
                    Your Investment Amount
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="number"
                      id="investmentAmount"
                      defaultValue={property.minInvestment}
                      min={property.minInvestment}
                      step={100}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Minimum investment: AED {property.minInvestment}
                  </p>
                </div>

                {/* Projected Returns */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium mb-2 text-blue-800">
                    Projected Returns
                  </h3>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-700">Annual Return:</span>
                    <span className="font-semibold text-blue-800">
                      AED
                      {(
                        (property.minInvestment * property.expectedROI) /
                        100
                      ).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">5-Year Return:</span>
                    <span className="font-semibold text-blue-800">
                      AED
                      {(
                        ((property.minInvestment * property.expectedROI) /
                          100) *
                        5
                      ).toLocaleString()}
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Invest Now
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
