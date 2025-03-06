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
  if (!property.title || !property.location || !property.imageUrl) {
    throw new Error("Missing required property fields");
  }

  const { data, error } = await supabase
    .from("properties")
    .insert([
      {
        title: property.title,
        description: property.description,
        location: property.location,
        image_url: property.imageUrl,
        additional_images: property.additionalImages || [],
        min_investment: property.minInvestment,
        expected_roi: property.expectedROI,
        funding_progress: property.fundingProgress || 0,
        funding_goal: property.fundingGoal,
        property_type: property.propertyType,
        features: property.features || [],
        investment_details: property.investmentDetails || {
          term: "5 years",
          payoutFrequency: "Quarterly",
          exitStrategy: "Property sale or refinancing",
          investorCount: 0,
        },
      },
    ])
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
  if (!property.title || !property.location || !property.imageUrl) {
    throw new Error("Missing required property fields");
  }

  const { data, error } = await supabase
    .from("properties")
    .update({
      title: property.title,
      description: property.description,
      location: property.location,
      image_url: property.imageUrl,
      additional_images: property.additionalImages || [],
      min_investment: property.minInvestment,
      expected_roi: property.expectedROI,
      funding_progress: property.fundingProgress,
      funding_goal: property.fundingGoal,
      property_type: property.propertyType,
      features: property.features || [],
      investment_details: property.investmentDetails || {
        term: "5 years",
        payoutFrequency: "Quarterly",
        exitStrategy: "Property sale or refinancing",
        investorCount: 0,
      },
      updated_at: new Date(),
    })
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
