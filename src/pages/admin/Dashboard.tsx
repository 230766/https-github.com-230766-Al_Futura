import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import PropertyTable from "../../components/admin/PropertyTable";
import PropertyForm from "../../components/admin/PropertyForm";
import PropertyDetail from "../../components/admin/PropertyDetail";
import DeleteConfirmDialog from "../../components/admin/DeleteConfirmDialog";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "../../contexts/AuthContext";
import {
  fetchProperties,
  createProperty,
  updateProperty,
  deleteProperty,
} from "../../lib/properties";
import { toast } from "react-hot-toast";
import { supabase } from "../../lib/supabase";
import { Database } from "../../lib/database.types";

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
  is_featured?: boolean;
  created_at: string;
  updated_at: string;
  blockchain?: string;
  marketplace?: string;
  marketplace_url?: string;
  total_nfts?: number;
  min_purchase_nft?: number;
}

interface PropertyFormData {
  id?: string;
  title: string;
  description: string;
  location: string;
  image_url: string;
  additional_images?: string[];
  min_investment: number;
  expected_roi: number;
  funding_progress: number;
  funding_goal: number;
  property_type: string;
  features: string[];
  investment_term: number;
  investment_details: {
    term: string;
    payoutFrequency: string;
    exitStrategy: string;
    investorCount: number;
    marketplace_url?: string;
    blockchain?: string;
    marketplace?: string;
  };
  is_featured?: boolean;
  blockchain?: "Solana" | "Ethereum" | "VeChain" | "Polygon";
  marketplace?: "OpenSea" | "Rarible" | "AlFutura";
  marketplace_url?: string;
  total_nfts?: number;
  min_purchase_nft?: number;
}

// Define view types as string constants instead of enum
const AdminView = {
  LIST: "list",
  ADD: "add",
  EDIT: "edit",
  DETAIL: "detail",
};

// Sample data
const sampleProperties = [
  {
    id: "1",
    title: "Luxury Apartment Complex",
    description:
      "A premium residential complex with high-end amenities in the heart of Downtown Dubai.",
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
    description:
      "Modern office space in Dubai's Business Bay district with excellent connectivity.",
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
    description:
      "Luxury vacation properties with direct beach access and stunning ocean views in Palm Jumeirah.",
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
    description:
      "Strategically located retail space in a high-traffic shopping district in Dubai Marina.",
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
    description:
      "Multi-unit residential building in Jumeirah Lake Towers with strong rental demand.",
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
    description:
      "Modern logistics facility with excellent highway access and state-of-the-art security in Dubai Industrial City.",
    location: "Dubai Industrial City, UAE",
    imageUrl:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80",
    minInvestment: 7300,
    expectedROI: 8.0,
    fundingProgress: 1175000,
    fundingGoal: 1830000,
    propertyType: "Industrial",
  },
];

// Define helper functions locally
const getFeatures = (features: any): string[] => {
  if (Array.isArray(features)) {
    return features as string[];
  }
  return [];
};

const getInvestmentDetails = (details: any): any => {
  if (details && typeof details === 'object' && !Array.isArray(details)) {
    return details;
  }
  return null;
};

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, isAdmin, isLoading } = useAuth();
  const [properties, setProperties] = useState<PropertyFormData[]>([]);
  const [currentView, setCurrentView] = useState(AdminView.LIST);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState(null);
  const [activeTab, setActiveTab] = useState("properties");

  // Check if user is authenticated and is admin
  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        navigate("/login");
      } else if (!isAdmin) {
        navigate("/");
      } else {
        // Load properties from Supabase
        loadProperties();
      }
    }
  }, [user, isAdmin, isLoading, navigate]);

  // Load properties from Supabase
  const loadProperties = async () => {
    try {
      const { data: properties, error } = await supabase
        .from('properties')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching properties:', error);
        throw error;
      }

      console.log('Raw properties from database:', properties);

      const formattedProperties = (properties as Property[]).map(property => {
        // Ensure investment_details is properly handled
        const investmentDetails = property.investment_details || {
          term: '5 years',
          payoutFrequency: 'Quarterly',
          exitStrategy: 'Property sale or refinancing',
          investorCount: 0
        };

        console.log(`Property ${property.id} investment_details:`, property.investment_details);
        
        // Create a property object with snake_case property names
        const formattedProperty: PropertyFormData = {
          id: property.id,
          title: property.title,
          description: property.description,
          location: property.location,
          image_url: property.image_url,
          additional_images: property.additional_images || [],
          min_investment: property.min_investment,
          expected_roi: property.expected_roi,
          funding_progress: property.funding_progress,
          funding_goal: property.funding_goal,
          property_type: property.property_type,
          features: property.features || [],
          investment_term: property.investment_term,
          investment_details: {
            term: investmentDetails.term,
            payoutFrequency: investmentDetails.payoutFrequency,
            exitStrategy: investmentDetails.exitStrategy,
            investorCount: investmentDetails.investorCount
          },
          is_featured: Boolean(property.is_featured)
        };

        // Add NFT-specific fields if it's an NFT property
        if (property.property_type === "NFT-properties") {
          // Cast to the correct type for blockchain and marketplace
          formattedProperty.blockchain = (property.blockchain || "Ethereum") as "Ethereum" | "Solana" | "VeChain" | "Polygon";
          formattedProperty.marketplace = (property.marketplace || "AlFutura") as "OpenSea" | "Rarible" | "AlFutura";
          formattedProperty.marketplace_url = property.marketplace_url || "";
          formattedProperty.min_purchase_nft = property.min_purchase_nft || 1;
          formattedProperty.total_nfts = property.total_nfts || Math.floor(property.funding_goal / 500);
          
          // Add NFT-specific fields to investment_details
          formattedProperty.investment_details.blockchain = property.blockchain || "Ethereum";
          formattedProperty.investment_details.marketplace = property.marketplace || "AlFutura";
          formattedProperty.investment_details.marketplace_url = property.marketplace_url || "";
        }

        return formattedProperty;
      });

      console.log('Formatted properties:', formattedProperties);
      setProperties(formattedProperties);
    } catch (error) {
      console.error('Error loading properties:', error);
      toast.error('Failed to load properties');
    }
  };

  const handleAddProperty = () => {
    setSelectedProperty(null);
    setCurrentView(AdminView.ADD);
  };

  const handleViewProperty = (property) => {
    setSelectedProperty(property);
    setCurrentView(AdminView.DETAIL);
  };

  const handleEditProperty = (property) => {
    setSelectedProperty(property);
    setCurrentView(AdminView.EDIT);
  };

  const handleDeleteProperty = (propertyId) => {
    setPropertyToDelete(propertyId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (propertyToDelete) {
      try {
        await deleteProperty(propertyToDelete);
        setProperties(properties.filter((p) => p.id !== propertyToDelete));
        setDeleteDialogOpen(false);
        setPropertyToDelete(null);
        alert("Property deleted successfully!");
      } catch (error) {
        console.error("Error deleting property:", error);
        alert(`Error deleting property: ${error.message || "Unknown error"}`);
      }
    }
  };

  const cancelDelete = () => {
    setDeleteDialogOpen(false);
    setPropertyToDelete(null);
  };

  const handlePropertyUpdate = async (updatedProperty: any) => {
    try {
      setIsFormLoading(true);
      console.log('Original update data:', updatedProperty);
      console.log('Original investment details:', {
        investment_details: updatedProperty.investment_details,
        investorCount: updatedProperty.investment_details?.investorCount
      });

      // Transform the data to match the database structure
      const propertyData: PropertyFormData = {
        id: updatedProperty.id,
        title: updatedProperty.title,
        description: updatedProperty.description,
        location: updatedProperty.location,
        image_url: updatedProperty.image_url,
        additional_images: updatedProperty.additional_images || [],
        min_investment: updatedProperty.min_investment,
        expected_roi: updatedProperty.expected_roi,
        funding_progress: updatedProperty.funding_progress,
        funding_goal: updatedProperty.funding_goal,
        property_type: updatedProperty.property_type,
        features: updatedProperty.features || [],
        investment_term: updatedProperty.investment_term,
        investment_details: {
          term: updatedProperty.investment_details?.term || "5 years",
          payoutFrequency: updatedProperty.investment_details?.payoutFrequency || "Quarterly",
          exitStrategy: updatedProperty.investment_details?.exitStrategy || "Property sale or refinancing",
          investorCount: updatedProperty.investment_details?.investorCount || 0
        },
        is_featured: updatedProperty.is_featured
      };

      // Add NFT-specific fields if it's an NFT property
      if (updatedProperty.property_type === "NFT-properties") {
        // Cast to the correct type for blockchain and marketplace
        propertyData.blockchain = (updatedProperty.blockchain || "Ethereum") as "Ethereum" | "Solana" | "VeChain" | "Polygon";
        propertyData.marketplace = (updatedProperty.marketplace || "AlFutura") as "OpenSea" | "Rarible" | "AlFutura";
        propertyData.marketplace_url = updatedProperty.marketplace_url || "";
        propertyData.min_purchase_nft = updatedProperty.min_purchase_nft || 1;
        propertyData.total_nfts = updatedProperty.total_nfts || Math.floor(updatedProperty.funding_goal / 500);
        
        // Add NFT-specific fields to investment_details
        propertyData.investment_details.blockchain = updatedProperty.blockchain || "Ethereum";
        propertyData.investment_details.marketplace = updatedProperty.marketplace || "AlFutura";
        propertyData.investment_details.marketplace_url = updatedProperty.marketplace_url || "";
      }

      console.log('Transformed property data:', propertyData);
      console.log('Transformed investment details:', propertyData.investment_details);

      const result = await updateProperty(propertyData);
      console.log('Update result:', result);
      
      // Refresh the properties list with the updated data
      await loadProperties();
      
      setCurrentView(AdminView.LIST);
      toast.success("Property updated successfully!");
    } catch (error) {
      console.error("Error updating property:", error);
      toast.error("Failed to update property");
    } finally {
      setIsFormLoading(false);
    }
  };

  const handleFormSubmit = async (formData: PropertyFormData) => {
    try {
      setIsFormLoading(true);
      console.log('Form data received:', formData);

      // Convert the NewProperty to PropertyFormData
      const propertyData: PropertyFormData = {
        id: formData.id,
        title: formData.title,
        description: formData.description,
        location: formData.location,
        image_url: formData.image_url,
        additional_images: formData.additional_images || [],
        min_investment: formData.min_investment,
        expected_roi: formData.expected_roi,
        funding_progress: formData.funding_progress || 0,
        funding_goal: formData.funding_goal,
        property_type: formData.property_type,
        features: formData.features || [],
        investment_term: formData.investment_term,
        investment_details: {
          term: formData.investment_details?.term || "5 years",
          payoutFrequency: formData.investment_details?.payoutFrequency || "Quarterly",
          exitStrategy: formData.investment_details?.exitStrategy || "Property sale or refinancing",
          investorCount: formData.investment_details?.investorCount || 0
        },
        is_featured: formData.is_featured
      };

      // Add NFT-specific fields if it's an NFT property
      if (formData.property_type === "NFT-properties") {
        // Cast to the correct type for blockchain and marketplace
        propertyData.blockchain = (formData.blockchain || "Ethereum") as "Ethereum" | "Solana" | "VeChain" | "Polygon";
        propertyData.marketplace = (formData.marketplace || "AlFutura") as "OpenSea" | "Rarible" | "AlFutura";
        propertyData.marketplace_url = formData.marketplace_url || "";
        propertyData.min_purchase_nft = formData.min_purchase_nft || 1;
        propertyData.total_nfts = formData.total_nfts || Math.floor(formData.funding_goal / 500);
        
        // Add NFT-specific fields to investment_details
        propertyData.investment_details.blockchain = formData.blockchain || "Ethereum";
        propertyData.investment_details.marketplace = formData.marketplace || "AlFutura";
        propertyData.investment_details.marketplace_url = formData.marketplace_url || "";
      }

      console.log('Transformed property data for submission:', propertyData);

      if (currentView === AdminView.ADD) {
        const newProperty = await createProperty(propertyData);
        console.log('New property created:', newProperty);
        
        // Format the new property for the UI
        const formattedProperty: PropertyFormData = {
          id: newProperty.id,
          title: newProperty.title,
          description: newProperty.description,
          location: newProperty.location,
          image_url: newProperty.image_url,
          additional_images: newProperty.additional_images || [],
          min_investment: newProperty.min_investment,
          expected_roi: newProperty.expected_roi,
          funding_progress: newProperty.funding_progress,
          funding_goal: newProperty.funding_goal,
          property_type: newProperty.property_type,
          features: newProperty.features || [],
          investment_term: newProperty.investment_term,
          investment_details: {
            term: newProperty.investment_details?.term || "5 years",
            payoutFrequency: newProperty.investment_details?.payoutFrequency || "Quarterly",
            exitStrategy: newProperty.investment_details?.exitStrategy || "Property sale or refinancing",
            investorCount: newProperty.investment_details?.investorCount || 0
          },
          is_featured: Boolean(newProperty.is_featured)
        };

        // Add NFT-specific fields if it's an NFT property
        if (newProperty.property_type === "NFT-properties") {
          // Cast to the correct type for blockchain and marketplace
          formattedProperty.blockchain = (newProperty.blockchain || "Ethereum") as "Ethereum" | "Solana" | "VeChain" | "Polygon";
          formattedProperty.marketplace = (newProperty.marketplace || "AlFutura") as "OpenSea" | "Rarible" | "AlFutura";
          formattedProperty.marketplace_url = newProperty.marketplace_url || "";
          formattedProperty.min_purchase_nft = newProperty.min_purchase_nft || 1;
          formattedProperty.total_nfts = newProperty.total_nfts || Math.floor(newProperty.funding_goal / 500);
          
          // Add NFT-specific fields to investment_details
          formattedProperty.investment_details.blockchain = newProperty.blockchain || "Ethereum";
          formattedProperty.investment_details.marketplace = newProperty.marketplace || "AlFutura";
          formattedProperty.investment_details.marketplace_url = newProperty.marketplace_url || "";
        }

        setProperties([formattedProperty, ...properties]);
        toast.success("Property added successfully!");
      } else {
        await handlePropertyUpdate(propertyData);
      }

      setCurrentView(AdminView.LIST);
    } catch (error) {
      console.error("Error submitting property form:", error);
      toast.error("Failed to submit property");
    } finally {
      setIsFormLoading(false);
    }
  };

  const handleFormCancel = () => {
    setCurrentView(AdminView.LIST);
  };

  const handleBackToList = () => {
    setCurrentView(AdminView.LIST);
  };

  const handleRefreshProperties = async () => {
    await loadProperties();
  };

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">
            Manage your real estate investment platform
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="properties">Properties</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="investments">Investments</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="properties" className="space-y-6">
            {currentView === AdminView.LIST && (
              <PropertyTable
                properties={properties}
                onView={handleViewProperty}
                onEdit={handleEditProperty}
                onDelete={handleDeleteProperty}
                onAdd={handleAddProperty}
                onRefresh={handleRefreshProperties}
              />
            )}

            {(currentView === AdminView.ADD ||
              currentView === AdminView.EDIT) && (
              <PropertyForm
                initialData={
                  currentView === AdminView.EDIT
                    ? selectedProperty || undefined
                    : undefined
                }
                onSubmit={handleFormSubmit}
                onCancel={handleFormCancel}
                isLoading={isFormLoading}
              />
            )}

            {currentView === AdminView.DETAIL && selectedProperty && (
              <PropertyDetail
                property={selectedProperty}
                onBack={handleBackToList}
                onEdit={() => handleEditProperty(selectedProperty)}
              />
            )}
          </TabsContent>

          <TabsContent value="users">
            <div className="bg-white p-8 rounded-lg shadow text-center">
              <h2 className="text-xl font-semibold mb-4">User Management</h2>
              <p className="text-gray-600">
                User management functionality coming soon.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="investments">
            <div className="bg-white p-8 rounded-lg shadow text-center">
              <h2 className="text-xl font-semibold mb-4">
                Investment Tracking
              </h2>
              <p className="text-gray-600">
                Investment tracking functionality coming soon.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="bg-white p-8 rounded-lg shadow text-center">
              <h2 className="text-xl font-semibold mb-4">
                Analytics Dashboard
              </h2>
              <p className="text-gray-600">Analytics dashboard coming soon.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <DeleteConfirmDialog
        isOpen={deleteDialogOpen}
        title="Delete Property"
        description="Are you sure you want to delete this property? This action cannot be undone."
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
};

export default Dashboard;
