import React, { useState } from "react";
import { Card } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Input } from "./ui/input";
import { Slider } from "./ui/slider";
import { Search, MapPin, Home, TrendingUp, Users, ChevronLeft, ChevronRight, Wallet, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

// Improved PropertyCard component
interface PropertyCardProps {
  id: string;
  title: string;
  location: string;
  imageUrl: string;
  minInvestment: number;
  expectedROI: number;
  fundingProgress: number;
  fundingGoal: number;
  propertyType: string;
  onClick?: () => void;
}

const PropertyCard = ({
  id = "1",
  title = "Luxury Apartment Complex",
  location = "Madrid, Spain",
  imageUrl = "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
  minInvestment = 500,
  expectedROI = 8.5,
  fundingProgress = 65000,
  fundingGoal = 100000,
  propertyType = "Residential",
  onClick = () => {},
}: PropertyCardProps) => {
  const isNFTProperty = propertyType === "NFT-properties";
  const totalNFTs = isNFTProperty ? Math.floor(fundingGoal / 500) : 0;
  const soldNFTs = isNFTProperty ? Math.floor(fundingProgress / 500) : 0;
  const progressPercentage = isNFTProperty 
    ? Math.min((soldNFTs / totalNFTs) * 100, 100)
    : Math.min((fundingProgress / fundingGoal) * 100, 100);
  const nftCount = isNFTProperty ? Math.floor(minInvestment / 500) : 0;

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
            <p className="text-xs text-gray-500">
              {isNFTProperty ? "Min. Purchase NFTs" : "Min. Investment"}
            </p>
            <p className="font-semibold text-blue-600">
              {isNFTProperty ? `${nftCount} NFT` : `AED ${minInvestment}`}
            </p>
          </div>
          <div className="bg-gray-50 p-2 rounded">
            <p className="text-xs text-gray-500">Expected ROI</p>
            <p className="font-semibold text-green-600">{expectedROI}%</p>
          </div>
        </div>

        <div className="mt-auto">
          <div className="flex justify-between text-sm mb-1">
            <span>{isNFTProperty ? "NFTs Sold" : "Funding Progress"}</span>
            <span className="font-medium">
              {isNFTProperty 
                ? `${soldNFTs}/${totalNFTs} NFTs (${Math.round(progressPercentage)}%)` 
                : `${Math.round(progressPercentage)}%`}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            {isNFTProperty ? (
              <>
                <span>{soldNFTs} NFTs sold</span>
                <span>Total: {totalNFTs} NFTs</span>
              </>
            ) : (
              <>
                <span>AED {(fundingProgress / 1000).toFixed(1)}K raised</span>
                <span>Goal: AED {(fundingGoal / 1000).toFixed(1)}K</span>
              </>
            )}
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

// Filter interface
interface FilterOptions {
  propertyType: string;
  minInvestment: number;
  expectedROI: number;
  location: string;
}

// Main PropertyGrid component
interface PropertyGridProps {
  properties?: PropertyCardProps[];
  title?: string;
  description?: string;
}

const PropertyGrid = ({
  properties = [
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
      title: "Digital Real Estate NFT Collection",
      location: "Metaverse, Virtual Dubai",
      imageUrl:
        "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&q=80",
      minInvestment: 1500,
      expectedROI: 12.5,
      fundingProgress: 180000,
      fundingGoal: 300000,
      propertyType: "NFT-properties",
    },
  ],
  title = "Investment Opportunities",
  description = "Discover high-yield real estate investment opportunities with low minimum investments.",
}: PropertyGridProps) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 6;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Calculate maximum ROI from properties
  const maxROI = Math.ceil(Math.max(...properties.map(p => p.expectedROI)));

  // Filter options
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    propertyType: "all",
    minInvestment: 0,
    expectedROI: 0,
    location: "",
  });

  // Filter properties based on active tab, search query, and filter options
  const filteredProperties = properties.filter((property) => {
    // Filter by tab (property type)
    if (activeTab !== "all" && property.propertyType !== activeTab) {
      return false;
    }

    // Filter by search query
    if (
      searchQuery &&
      !property.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !property.location.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    // Filter by custom filters
    if (
      property.minInvestment < filterOptions.minInvestment ||
      property.expectedROI < filterOptions.expectedROI ||
      (filterOptions.location &&
        !property.location
          .toLowerCase()
          .includes(filterOptions.location.toLowerCase()))
    ) {
      return false;
    }

    return true;
  });

  // Calculate pagination
  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = filteredProperties.slice(indexOfFirstProperty, indexOfLastProperty);
  const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  
  // Go to next page
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  // Go to previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Define fixed property types array
  const propertyTypes = [
    "all",
    "Residential",
    "Commercial",
    "Vacation",
    "Retail",
    "Industrial",
    "NFT-properties"
  ];

  const handlePropertyClick = (propertyId: string) => {
    navigate(`/property/${propertyId}`);
  };

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value === "all" ? "all" : propertyTypes.find(type => type.toLowerCase() === value) || "all");
    setCurrentPage(1); // Reset to first page when tab changes
  };

  // Handle search query change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page when search changes
  };

  // Handle filter changes
  const handleFilterChange = (newFilters: Partial<FilterOptions>) => {
    setFilterOptions({ ...filterOptions, ...newFilters });
    setCurrentPage(1); // Reset to first page when filters change
  };

  return (
    <div className="w-full py-12 px-4 md:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {description}
          </p>
        </div>

        {/* Search and filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              <Input
                type="text"
                placeholder="Search by property name or location"
                className="pl-10"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>

            <div className="flex gap-4">
              <div className="w-40">
                <p className="text-sm text-gray-500 mb-1">Min. Investment</p>
                <div className="px-2">
                  <Slider
                    defaultValue={[filterOptions.minInvestment]}
                    max={2000}
                    step={100}
                    onValueChange={(value) =>
                      handleFilterChange({ minInvestment: value[0] })
                    }
                  />
                </div>
                <p className="text-xs text-right mt-1">
                  AED {filterOptions.minInvestment}
                </p>
              </div>

              <div className="w-40">
                <p className="text-sm text-gray-500 mb-1">Min. Expected ROI</p>
                <div className="px-2">
                  <Slider
                    defaultValue={[filterOptions.expectedROI]}
                    max={maxROI}
                    step={0.5}
                    onValueChange={(value) =>
                      handleFilterChange({ expectedROI: value[0] })
                    }
                  />
                </div>
                <p className="text-xs text-right mt-1">
                  {filterOptions.expectedROI}%
                </p>
              </div>
            </div>
          </div>

          {/* Property type tabs with responsive design */}
          <Tabs
            defaultValue="all"
            value={activeTab.toLowerCase()}
            onValueChange={handleTabChange}
          >
            {/* Desktop TabsList */}
            <TabsList className="mb-6 hidden md:inline-flex">
              {propertyTypes.map((type) => (
                <TabsTrigger key={type} value={type.toLowerCase()} className="capitalize">
                  {type === "all" ? "All Properties" : type}
                  {type === "all" ? (
                    <Home className="ml-2" size={16} />
                  ) : type === "Residential" ? (
                    <Home className="ml-2" size={16} />
                  ) : type === "Commercial" ? (
                    <TrendingUp className="ml-2" size={16} />
                  ) : type === "Vacation" ? (
                    <Users className="ml-2" size={16} />
                  ) : type === "NFT-properties" ? (
                    <Wallet className="ml-2" size={16} />
                  ) : (
                    <Home className="ml-2" size={16} />
                  )}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Mobile Dropdown Menu */}
            <div className="md:hidden mb-6">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full justify-between">
                    <span className="capitalize">
                      {activeTab === "all" ? "All Properties" : activeTab}
                    </span>
                    <Menu className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-full">
                  {propertyTypes.map((type) => (
                    <DropdownMenuItem
                      key={type}
                      onClick={() => handleTabChange(type.toLowerCase())}
                      className="capitalize"
                    >
                      {type === "all" ? "All Properties" : type}
                      {type === "all" ? (
                        <Home className="ml-2" size={16} />
                      ) : type === "Residential" ? (
                        <Home className="ml-2" size={16} />
                      ) : type === "Commercial" ? (
                        <TrendingUp className="ml-2" size={16} />
                      ) : type === "Vacation" ? (
                        <Users className="ml-2" size={16} />
                      ) : type === "NFT-properties" ? (
                        <Wallet className="ml-2" size={16} />
                      ) : (
                        <Home className="ml-2" size={16} />
                      )}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <TabsContent value={activeTab.toLowerCase()} className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentProperties.map((property) => (
                  <PropertyCard
                    key={property.id}
                    {...property}
                    onClick={() => handlePropertyClick(property.id)}
                  />
                ))}
              </div>

              {filteredProperties.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500">
                    No properties match your current filters.
                  </p>
                  <button
                    className="mt-4 text-blue-600 hover:text-blue-800"
                    onClick={() => {
                      setSearchQuery("");
                      handleFilterChange({
                        propertyType: "all",
                        minInvestment: 0,
                        expectedROI: 0,
                        location: "",
                      });
                      handleTabChange("all");
                    }}
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-8">
            <Button
              variant="outline"
              size="sm"
              onClick={prevPage}
              disabled={currentPage === 1}
              className="mr-2"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Prev
            </Button>
            
            <div className="flex space-x-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                <Button
                  key={number}
                  variant={currentPage === number ? "default" : "outline"}
                  size="sm"
                  onClick={() => paginate(number)}
                  className={`w-8 h-8 p-0 ${
                    currentPage === number ? "bg-blue-600 text-white" : "text-gray-700"
                  }`}
                >
                  {number}
                </Button>
              ))}
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className="ml-2"
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        )}

        {/* Results count */}
        <div className="text-sm text-gray-500 mt-6 text-center">
          Showing {currentProperties.length > 0 ? indexOfFirstProperty + 1 : 0} to {Math.min(indexOfLastProperty, filteredProperties.length)} of {filteredProperties.length} properties
        </div>
      </div>
    </div>
  );
};

export default PropertyGrid;
