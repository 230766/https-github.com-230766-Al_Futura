import React, { useState } from "react";
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
  Check,
} from "lucide-react";
import Navbar from "./Navbar";
import { supabase } from "../lib/supabase";
// import type { Property } from "../lib/supabase";
// import type { Json } from "../lib/database.types";
import { useAuth } from "../contexts/AuthContext";
import ImageCarousel from "./ImageCarousel";

// Define Json type locally
type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

// Define Property type with investment_details
interface Property {
  id: string;
  title: string;
  description: string;
  location: string;
  image_url: string;
  additional_images: string[];
  property_type: string;
  min_investment: number;
  expected_roi: number;
  investment_term: number;
  features: string[];
  investment_details: {
    term: string;
    payoutFrequency: string;
    exitStrategy: string;
    investorCount: number;
    marketplace_url?: string;
    blockchain?: string;
    marketplace?: string;
  } | null;
  funding_progress: number;
  funding_goal: number;
  created_at: string;
  updated_at: string;
}

interface InvestmentDetails {
  term: string;
  payoutFrequency: string;
  exitStrategy: string;
  investorCount: number;
  marketplace_url?: string;
  blockchain?: string;
  marketplace?: string;
}

interface PropertyDetailProps {
  id?: string;
  property?: Property;
  hideNavigation?: boolean;
}

const PropertyDetail = ({ id, property: propProperty, hideNavigation = false }: PropertyDetailProps) => {
  const params = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const propertyId = id || params.id;
  const [property, setProperty] = React.useState<Property | null>(null);
  const [loading, setLoading] = React.useState(true);
  
  // Image carousel state
  const [carouselOpen, setCarouselOpen] = useState(false);
  const [initialImageIndex, setInitialImageIndex] = useState(0);
  
  // Helper function to open the carousel with a specific image
  const openCarousel = (index: number) => {
    setInitialImageIndex(index);
    setCarouselOpen(true);
  };

  // Helper function to safely type check and cast JSON fields
  const getFeatures = (features: Property['features']): string[] => {
    if (Array.isArray(features)) {
      return features as string[];
    }
    return [];
  };

  const getInvestmentDetails = (details: Property['investment_details']): InvestmentDetails | null => {
    if (details && typeof details === 'object' && !Array.isArray(details)) {
      const d = details as { [key: string]: Json };
      return {
        term: String(d.term || ''),
        payoutFrequency: String(d.payoutFrequency || ''),
        exitStrategy: String(d.exitStrategy || ''),
        investorCount: Number(d.investorCount || 0),
        marketplace_url: d.marketplace_url as string,
        blockchain: d.blockchain as string,
        marketplace: d.marketplace as string
      };
    }
    return null;
  };

  const handleInvestClick = () => {
    if (!user) {
      navigate('/login', { state: { returnTo: `/properties/${propertyId}` } });
      return;
    }
    // If user is logged in, proceed with investment flow
    navigate(`/invest/${propertyId}`);
  };

  React.useEffect(() => {
    if (propProperty) {
      setProperty(propProperty);
      setLoading(false);
      return;
    }

    async function fetchProperty() {
      try {
        const { data, error } = await supabase
          .from('properties')
          .select('*')
          .eq('id', propertyId)
          .single();

        if (error) throw error;
        setProperty(data);
      } catch (error) {
        console.error('Error fetching property:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProperty();
  }, [propertyId, propProperty]);

  if (loading) {
    return (
      <div className={hideNavigation ? "bg-white" : "min-h-screen bg-gray-50"}>
        {!hideNavigation && <Navbar />}
        <div className="container mx-auto px-4 pt-24 pb-12">
          <div className="text-center">Loading property details...</div>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className={hideNavigation ? "bg-white" : "min-h-screen bg-gray-50"}>
        {!hideNavigation && <Navbar />}
        <div className="container mx-auto px-4 pt-24 pb-12">
          <div className="text-center">Property not found</div>
        </div>
      </div>
    );
  }

  const progressPercentage = (property.funding_progress / property.funding_goal) * 100;
  const features = getFeatures(property.features);
  const investmentDetails = getInvestmentDetails(property.investment_details);

  return (
    <div className={hideNavigation ? "bg-white" : "min-h-screen bg-gray-50"}>
      {!hideNavigation && <Navbar />}

      <div className={`container mx-auto px-4 ${hideNavigation ? 'py-6' : 'pt-24 pb-12'}`}>
        {!hideNavigation && (
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-6 flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Properties
          </Button>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : property ? (
          <div className="max-w-6xl mx-auto">
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
                      {property.property_type}
                    </Badge>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-5 w-5 mr-2 text-blue-600" />
                    <span>{property.location}</span>
                  </div>
                </div>

                {/* Main Image */}
                <div 
                  className="aspect-video w-full overflow-hidden rounded-lg cursor-pointer"
                  onClick={() => openCarousel(0)}
                >
                  <img
                    src={property.image_url}
                    alt={property.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Additional Images */}
                {property.additional_images && property.additional_images.length > 0 && (
                  <div className="grid grid-cols-3 gap-4">
                    {property.additional_images.map((img, index) => (
                      <div
                        key={index}
                        className="aspect-video overflow-hidden rounded-lg cursor-pointer"
                        onClick={() => openCarousel(index + 1)}
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
                {features.length > 0 && (
                  <div>
                    <h2 className="text-xl font-semibold mb-4">
                      Property Features
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {features.map((feature, index) => (
                        <div key={index} className="flex items-center">
                          <Check className="h-5 w-5 text-blue-600 mr-2" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Investment Details Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-white p-6 rounded-lg shadow-lg sticky top-24 space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Investment Summary</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="flex items-center mb-1">
                          <DollarSign className="h-4 w-4 text-blue-600 mr-1" />
                          <span className="text-sm text-gray-500">
                            {property.property_type === "NFT-properties" ? "NFT Price" : "Min. Investment"}
                          </span>
                        </div>
                        <p className="text-lg font-semibold">
                          {property.property_type === "NFT-properties" 
                            ? "AED 500 per NFT"
                            : `AED ${property.min_investment.toLocaleString()}`}
                        </p>
                      </div>

                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="flex items-center mb-1">
                          <Percent className="h-4 w-4 text-green-600 mr-1" />
                          <span className="text-sm text-gray-500">
                            Expected ROI
                          </span>
                        </div>
                        <p className="text-lg font-semibold text-green-600">
                          {property.expected_roi}%
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Funding Progress */}
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">
                        {property.property_type === "NFT-properties" ? "NFTs Sold" : "Funding Progress"}
                      </span>
                      <span className="font-medium text-blue-600">
                        {property.property_type === "NFT-properties"
                          ? `${Math.floor(property.funding_progress / 500)}/${Math.floor(property.funding_goal / 500)} NFTs`
                          : `${Math.round(progressPercentage)}%`}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${progressPercentage}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      {property.property_type === "NFT-properties" ? (
                        <>
                          <span>{Math.floor(property.funding_progress / 500)} NFTs sold</span>
                          <span>Total: {Math.floor(property.funding_goal / 500)} NFTs</span>
                        </>
                      ) : (
                        <>
                          <span>AED {(property.funding_progress / 1000).toFixed(1)}K raised</span>
                          <span>Goal: AED {(property.funding_goal / 1000).toFixed(1)}K</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Investment Details */}
                  {investmentDetails && (
                    <div className="space-y-4">
                      {property.property_type === "NFT-properties" && (
                        <>
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <div className="flex items-center mb-1">
                              <DollarSign className="h-4 w-4 text-blue-600 mr-1" />
                              <span className="text-sm text-gray-500">
                                Minimum Purchase
                              </span>
                            </div>
                            <p className="text-gray-700">1 NFT (AED 500)</p>
                          </div>

                          <div className="bg-gray-50 p-3 rounded-lg">
                            <div className="flex items-center mb-1">
                              <TrendingUp className="h-4 w-4 text-blue-600 mr-1" />
                              <span className="text-sm text-gray-500">
                                Blockchain Network
                              </span>
                            </div>
                            <p className="text-gray-700">
                              {investmentDetails.blockchain || "Ethereum"}
                            </p>
                          </div>

                          <div className="bg-gray-50 p-3 rounded-lg">
                            <div className="flex items-center mb-1">
                              <Home className="h-4 w-4 text-blue-600 mr-1" />
                              <span className="text-sm text-gray-500">
                                NFT Marketplace
                              </span>
                            </div>
                            <p className="text-gray-700">
                              {investmentDetails.marketplace || "OpenSea"}
                            </p>
                          </div>

                          <Button
                            onClick={() => {
                              const url = investmentDetails?.marketplace_url;
                              if (url) {
                                window.open(url, '_blank');
                              }
                            }}
                            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold h-10 mb-2"
                            disabled={!investmentDetails?.marketplace_url}
                          >
                            {investmentDetails?.marketplace_url 
                              ? `View on ${investmentDetails.marketplace || 'Marketplace'} →`
                              : 'No marketplace URL available'}
                          </Button>
                        </>
                      )}

                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="flex items-center mb-1">
                          <Calendar className="h-4 w-4 text-blue-600 mr-1" />
                          <span className="text-sm text-gray-500">
                            {property.property_type === "NFT-properties" ? "NFT Term" : "Investment Term"}
                          </span>
                        </div>
                        <p className="text-gray-700">{investmentDetails.term}</p>
                      </div>

                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="flex items-center mb-1">
                          <TrendingUp className="h-4 w-4 text-blue-600 mr-1" />
                          <span className="text-sm text-gray-500">
                            {property.property_type === "NFT-properties" ? "NFT Returns" : "Payout Frequency"}
                          </span>
                        </div>
                        <p className="text-gray-700">
                          {investmentDetails.payoutFrequency}
                        </p>
                      </div>

                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="flex items-center mb-1">
                          <Users className="h-4 w-4 text-blue-600 mr-1" />
                          <span className="text-sm text-gray-500">
                            {property.property_type === "NFT-properties" ? "NFT Holders" : "Current Investors"}
                          </span>
                        </div>
                        <p className="text-gray-700">
                          {investmentDetails.investorCount} {property.property_type === "NFT-properties" ? "holders" : "investors"}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Invest Button */}
                  <Button
                    onClick={handleInvestClick}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold h-12"
                  >
                    {property.property_type === "NFT-properties" ? "Purchase NFTs" : "Invest Now"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Property Not Found
            </h2>
            <p className="text-gray-600 mb-8">
              The property you're looking for doesn't exist or has been removed.
            </p>
            <Button onClick={() => navigate("/properties")}>
              Browse Properties
            </Button>
          </div>
        )}
      </div>
      
      {/* Image Carousel */}
      {property && (
        <ImageCarousel
          images={[property.image_url, ...(property.additional_images || [])]}
          initialIndex={initialImageIndex}
          isOpen={carouselOpen}
          onClose={() => setCarouselOpen(false)}
          title={property.title}
        />
      )}
    </div>
  );
};

export default PropertyDetail;
