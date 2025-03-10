import { supabase } from "./supabase";
import { PropertyFormData } from "../components/admin/PropertyForm";

export const fetchProperties = async () => {
  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching properties:", error);
    throw error;
  }

  return data;
};

export const fetchPropertyById = async (id: string) => {
  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(`Error fetching property with id ${id}:`, error);
    throw error;
  }

  return data;
};

export const createProperty = async (property: PropertyFormData) => {
  // Ensure we have valid data
  if (!property.title || !property.location || !property.image_url) {
    throw new Error("Missing required property fields");
  }

  console.log('Creating property in database:', property);

  // Ensure investorCount is included in the investment_details
  const investmentDetails = {
    term: property.investment_details?.term || "5 years",
    payoutFrequency: property.investment_details?.payoutFrequency || "Quarterly",
    exitStrategy: property.investment_details?.exitStrategy || "Property sale or refinancing",
    investorCount: property.investment_details?.investorCount || 0
  };

  // Add NFT-specific fields to investment_details if it's an NFT property
  if (property.property_type === "NFT-properties") {
    Object.assign(investmentDetails, {
      blockchain: property.blockchain || property.investment_details?.blockchain || "Ethereum",
      marketplace: property.marketplace || property.investment_details?.marketplace || "AlFutura",
      marketplace_url: property.marketplace_url || property.investment_details?.marketplace_url || ""
    });
  }

  // Create new property data without investment_term field
  const newProperty = {
    title: property.title,
    description: property.description,
    location: property.location,
    image_url: property.image_url,
    additional_images: property.additional_images || [],
    min_investment: property.min_investment,
    expected_roi: property.expected_roi,
    funding_progress: property.funding_progress || 0,
    funding_goal: property.funding_goal,
    property_type: property.property_type,
    features: property.features || [],
    // Remove investment_term field as it doesn't exist in the database
    investment_details: investmentDetails,
    created_at: new Date(),
    updated_at: new Date()
  };

  // Add NFT-specific fields only if it's an NFT property
  if (property.property_type === "NFT-properties") {
    Object.assign(newProperty, {
      blockchain: property.blockchain || "Ethereum",
      marketplace: property.marketplace || "AlFutura",
      marketplace_url: property.marketplace_url || "",
      min_purchase_nft: property.min_purchase_nft || 1,
      total_nfts: property.total_nfts || Math.floor(property.funding_goal / 500)
    });
  }

  console.log('Final new property data:', newProperty);

  const { data, error } = await supabase
    .from("properties")
    .insert(newProperty)
    .select();

  if (error) {
    console.error("Error creating property:", error);
    throw error;
  }

  return data[0];
};

export const updateProperty = async (property: PropertyFormData) => {
  if (!property.id) {
    throw new Error("Property ID is required for update");
  }

  // Ensure we have valid data
  if (!property.title || !property.location || !property.image_url) {
    throw new Error("Missing required property fields");
  }

  console.log('Updating property in database:', property);

  // Ensure investorCount is included in the investment_details
  const investmentDetails = {
    term: property.investment_details?.term || "5 years",
    payoutFrequency: property.investment_details?.payoutFrequency || "Quarterly",
    exitStrategy: property.investment_details?.exitStrategy || "Property sale or refinancing",
    investorCount: property.investment_details?.investorCount || 0
  };

  // Add NFT-specific fields to investment_details if it's an NFT property
  if (property.property_type === "NFT-properties") {
    Object.assign(investmentDetails, {
      blockchain: property.blockchain || property.investment_details?.blockchain || "Ethereum",
      marketplace: property.marketplace || property.investment_details?.marketplace || "AlFutura",
      marketplace_url: property.marketplace_url || property.investment_details?.marketplace_url || ""
    });
  }

  // Create update data without investment_term field
  const updateData = {
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
    // Remove investment_term field as it doesn't exist in the database
    investment_details: investmentDetails,
    updated_at: new Date()
  };

  // Add NFT-specific fields only if it's an NFT property
  if (property.property_type === "NFT-properties") {
    Object.assign(updateData, {
      blockchain: property.blockchain || "Ethereum",
      marketplace: property.marketplace || "AlFutura",
      marketplace_url: property.marketplace_url || "",
      min_purchase_nft: property.min_purchase_nft || 1,
      total_nfts: property.total_nfts || Math.floor(property.funding_goal / 500)
    });
  }

  console.log('Final update data:', updateData);

  const { data, error } = await supabase
    .from("properties")
    .update(updateData)
    .eq("id", property.id)
    .select();

  if (error) {
    console.error(`Error updating property with id ${property.id}:`, error);
    throw error;
  }

  return data[0];
};

export const deleteProperty = async (id: string) => {
  if (!id) {
    throw new Error("Property ID is required for deletion");
  }

  const { error } = await supabase.from("properties").delete().eq("id", id);

  if (error) {
    console.error(`Error deleting property with id ${id}:`, error);
    throw error;
  }

  return true;
};
