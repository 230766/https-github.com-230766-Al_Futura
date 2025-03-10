import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { MapPin, Home, DollarSign, Percent, X } from "lucide-react";
import type { NewProperty, PropertyUpdate } from "../../lib/database.types";

// Add a simple Json type definition
type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface PropertyFormData {
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

interface PropertyFormProps {
  initialData?: NewProperty;
  onSubmit: (data: NewProperty) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const defaultProperty: NewProperty = {
  title: "",
  description: "",
  location: "",
  image_url: "",
  additional_images: [],
  min_investment: 500,
  expected_roi: 7.5,
  funding_progress: 0,
  funding_goal: 100000,
  property_type: "Residential",
  features: [],
  investment_term: 5,
  investment_details: {
    term: "5 years",
    payoutFrequency: "Quarterly",
    exitStrategy: "Property sale or refinancing",
    investorCount: 0
  }
};

const propertyTypes = [
  "Residential",
  "Commercial",
  "Vacation",
  "Retail",
  "Industrial",
  "NFT-properties"
] as const;

const blockchainOptions = ["Solana", "Ethereum", "VeChain", "Polygon"] as const;
const marketplaceOptions = ["OpenSea", "Rarible", "AlFutura"] as const;

const PropertyForm = ({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
}: PropertyFormProps) => {
  const [formData, setFormData] = useState<NewProperty>(() => {
    if (initialData) {
      // Ensure property type is correctly initialized from initialData
      const propertyType = initialData.property_type || "Residential";
      console.log('Initializing form with property type:', propertyType);
      
      // Create base data
      const baseData = {
        ...defaultProperty,
        id: initialData.id,
        title: initialData.title || "",
        description: initialData.description || "",
        location: initialData.location || "",
        image_url: initialData.image_url || "",
        additional_images: initialData.additional_images || [],
        min_investment: initialData.min_investment || 500,
        expected_roi: initialData.expected_roi || 7.5,
        funding_progress: initialData.funding_progress || 0,
        funding_goal: initialData.funding_goal || 100000,
        property_type: propertyType,
        features: initialData.features || [],
        investment_term: initialData.investment_term || 5,
        investment_details: {
          term: initialData.investment_details?.term || "5 years",
          payoutFrequency: initialData.investment_details?.payoutFrequency || "Quarterly",
          exitStrategy: initialData.investment_details?.exitStrategy || "Property sale or refinancing",
          investorCount: initialData.investment_details?.investorCount || 0
        }
      };

      // If it's an NFT property, add NFT-specific fields
      if (propertyType === "NFT-properties") {
        const nftData = {
          ...baseData,
          blockchain: initialData.blockchain || "Ethereum",
          marketplace: initialData.marketplace || "AlFutura",
          marketplace_url: initialData.marketplace_url || "",
          min_purchase_nft: initialData.min_purchase_nft || 1,
          total_nfts: initialData.total_nfts || Math.floor((initialData.funding_goal || 100000) / 500),
          investment_details: {
            ...baseData.investment_details,
            marketplace_url: initialData.marketplace_url || "",
            blockchain: initialData.blockchain || "Ethereum",
            marketplace: initialData.marketplace || "AlFutura"
          }
        };
        
        return nftData;
      }

      return baseData;
    }
    return defaultProperty;
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [singleImageUrl, setSingleImageUrl] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    
    // Convert camelCase to snake_case for field names
    const fieldName = name.replace(/([A-Z])/g, "_$1").toLowerCase();
    
    if (name === "min_investment" || name === "min_investment") {
      setFormData((prev) => ({
        ...prev,
        min_investment: parseInt(value) || 0,
      }));
    } else if (name === "expected_roi" || name === "expected_roi") {
      setFormData((prev) => ({
        ...prev,
        expected_roi: parseFloat(value) || 0,
      }));
    } else if (name === "funding_progress" || name === "funding_progress") {
      setFormData((prev) => ({
        ...prev,
        funding_progress: parseInt(value) || 0,
      }));
    } else if (name === "funding_goal" || name === "funding_goal") {
      setFormData((prev) => ({
        ...prev,
        funding_goal: parseInt(value) || 0,
      }));
    } else if (name === "investment_term" || name === "investment_term") {
      setFormData((prev) => ({
        ...prev,
        investment_term: parseInt(value) || 0,
      }));
    } else if (name === "term") {
      setFormData((prev) => ({
        ...prev,
        investment_details: {
          ...prev.investment_details,
          term: value,
        },
      }));
    } else if (name === "payoutFrequency") {
      setFormData((prev) => ({
        ...prev,
        investment_details: {
          ...prev.investment_details,
          payoutFrequency: value,
        },
      }));
    } else if (name === "exitStrategy") {
      setFormData((prev) => ({
        ...prev,
        investment_details: {
          ...prev.investment_details,
          exitStrategy: value,
        },
      }));
    } else if (name === "investorCount") {
      setFormData((prev) => ({
        ...prev,
        investment_details: {
          ...prev.investment_details,
          investorCount: parseInt(value) || 0,
        },
      }));
    } else if (name === "marketplace_url") {
      setFormData((prev) => ({
        ...prev,
        marketplace_url: value,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [fieldName]: value,
      }));
    }

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSelectChange = (value: string) => {
    console.log('Changing property type to:', value);
    
    setFormData((prev) => {
      // Create new base data without NFT-specific fields
      const baseData = {
        ...prev,
        property_type: value // Ensure property type is set
      };

      // If switching to NFT-properties, add NFT-specific fields
      if (value === "NFT-properties") {
        return {
          ...baseData,
          blockchain: "Ethereum" as "Ethereum",
          marketplace: "AlFutura" as "AlFutura",
          marketplace_url: "",
          min_purchase_nft: 1,
          total_nfts: Math.floor(prev.funding_goal / 500),
          investment_details: {
            ...baseData.investment_details,
            marketplace_url: "",
            blockchain: "Ethereum",
            marketplace: "AlFutura"
          }
        };
      }

      // For non-NFT properties, remove NFT-specific fields
      const {
        blockchain,
        marketplace,
        marketplace_url,
        min_purchase_nft,
        total_nfts,
        ...rest
      } = baseData;

      // Remove NFT fields from investment_details
      const { marketplace_url: _, blockchain: __, marketplace: ___, ...cleanInvestmentDetails } = baseData.investment_details;

      return {
        ...rest,
        investment_details: cleanInvestmentDetails
      };
    });
  };

  const handleAdditionalImagesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const urls = e.target.value.split("\n").filter((url) => url.trim() !== "");
    setFormData((prev) => ({
      ...prev,
      additional_images: urls,
    }));

    // Automatically adjust textarea height
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // If Enter key is pressed
    if (e.key === 'Enter') {
      // Get current cursor position
      const textarea = e.currentTarget;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      
      // Get current value
      const currentValue = textarea.value;
      
      // Insert newline at cursor position
      const newValue = 
        currentValue.substring(0, start) + 
        '\n' + 
        currentValue.substring(end);
      
      // Update form data
      const urls = newValue.split("\n").filter((url) => url.trim() !== "");
      setFormData((prev) => ({
        ...prev,
        additional_images: urls,
      }));
      
      // Set cursor position after the inserted newline
      const newPosition = start + 1;
      setTimeout(() => {
        textarea.setSelectionRange(newPosition, newPosition);
        
        // Adjust textarea height
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
      }, 0);
      
      // Prevent default Enter behavior
      e.preventDefault();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    // Get current cursor position
    const textarea = e.currentTarget;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    
    // Get pasted content
    const pastedText = e.clipboardData.getData('text');
    
    // Check if pasted content is a URL and doesn't already end with a newline
    if (pastedText.trim().startsWith('http') && !pastedText.endsWith('\n')) {
      // Prevent default paste
      e.preventDefault();
      
      // Get current value
      const currentValue = textarea.value;
      
      // Insert pasted text with a newline at cursor position
      const newValue = 
        currentValue.substring(0, start) + 
        pastedText + 
        '\n' + 
        currentValue.substring(end);
      
      // Update form data
      const urls = newValue.split("\n").filter((url) => url.trim() !== "");
      setFormData((prev) => ({
        ...prev,
        additional_images: urls,
      }));
      
      // Update textarea value
      textarea.value = newValue;
      
      // Set cursor position after the inserted text + newline
      const newPosition = start + pastedText.length + 1;
      setTimeout(() => {
        textarea.setSelectionRange(newPosition, newPosition);
        
        // Adjust textarea height
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
      }, 0);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
    }

    if (!formData.image_url.trim()) {
      newErrors.image_url = "Image URL is required";
    }

    if (formData.min_investment <= 0) {
      newErrors.min_investment = "Minimum investment must be greater than 0";
    }

    if (formData.expected_roi <= 0) {
      newErrors.expected_roi = "Expected ROI must be greater than 0";
    }

    if (formData.funding_goal <= 0) {
      newErrors.funding_goal = "Funding goal must be greater than 0";
    }

    if (formData.funding_progress < 0) {
      newErrors.funding_progress = "Funding progress cannot be negative";
    }

    if (formData.funding_progress > formData.funding_goal) {
      newErrors.funding_progress = "Funding progress cannot exceed the goal";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Submitting form with property type:', formData.property_type);
      
      // Create base submission data
      const submissionData: NewProperty = {
        ...(formData.id ? { id: formData.id } : {}),
        title: formData.title,
        description: formData.description,
        location: formData.location,
        image_url: formData.image_url,
        additional_images: formData.additional_images,
        min_investment: formData.min_investment,
        expected_roi: formData.expected_roi,
        funding_progress: formData.funding_progress,
        funding_goal: formData.funding_goal,
        property_type: formData.property_type, // Ensure this is included
        features: formData.features,
        investment_term: formData.investment_term,
        investment_details: {
          term: formData.investment_details.term,
          payoutFrequency: formData.investment_details.payoutFrequency,
          exitStrategy: formData.investment_details.exitStrategy,
          investorCount: formData.investment_details.investorCount // Ensure this is included
        }
      };

      // If switching from NFT-properties to another type, explicitly remove NFT fields
      if (formData.property_type !== "NFT-properties") {
        delete submissionData.blockchain;
        delete submissionData.marketplace;
        delete submissionData.marketplace_url;
        delete submissionData.min_purchase_nft;
        delete submissionData.total_nfts;
        delete submissionData.investment_details.marketplace_url;
        delete submissionData.investment_details.blockchain;
        delete submissionData.investment_details.marketplace;
      } else {
        // Add NFT-specific fields if it's an NFT property
        submissionData.total_nfts = Math.floor(formData.funding_goal / 500);
        submissionData.min_purchase_nft = 1;
        submissionData.blockchain = formData.blockchain;
        submissionData.marketplace = formData.marketplace;
        submissionData.marketplace_url = formData.marketplace_url;
        
        // Add NFT details to investment_details
        submissionData.investment_details = {
          ...submissionData.investment_details,
          marketplace_url: formData.marketplace_url,
          blockchain: formData.blockchain,
          marketplace: formData.marketplace
        };
      }

      console.log('Final submission data:', submissionData);
      onSubmit(submissionData);
    }
  };

  const handleBlockchainChange = (value: "Solana" | "Ethereum" | "VeChain" | "Polygon") => {
    setFormData((prev) => ({
      ...prev,
      blockchain: value,
    }));
  };

  const handleMarketplaceChange = (value: "OpenSea" | "Rarible" | "AlFutura") => {
    setFormData((prev) => ({
      ...prev,
      marketplace: value,
    }));
  };

  return (
    <Card className="w-full bg-white">
      <CardHeader>
        <CardTitle className="text-xl font-bold">
          {initialData ? "Edit Property" : "Add New Property"}
        </CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Property Title</Label>
            <div className="relative">
              <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Luxury Apartment Complex"
                className="pl-10"
              />
            </div>
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Detailed description of the property..."
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Madrid, Spain"
                className="pl-10"
              />
            </div>
            {errors.location && (
              <p className="text-sm text-red-500">{errors.location}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="image_url">Main Image URL</Label>
            <Input
              id="image_url"
              name="image_url"
              value={formData.image_url}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
            />
            {errors.image_url && (
              <p className="text-sm text-red-500">{errors.image_url}</p>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="additional_images">
              Additional Images (One URL per line)
            </Label>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">
                  {formData.additional_images?.length || 0} image{formData.additional_images?.length !== 1 ? 's' : ''}
                </span>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  onClick={() => setFormData(prev => ({ ...prev, additional_images: [] }))}
                >
                  Clear All
                </Button>
              </div>
            </div>
            <Textarea
              id="additional_images"
              name="additional_images"
              value={formData.additional_images?.join("\n") || ""}
              onChange={handleAdditionalImagesChange}
              onKeyDown={handleKeyDown}
              onPaste={handlePaste}
              placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg&#10;https://example.com/image3.jpg"
              rows={5}
              className="min-h-[120px] resize-y"
              style={{ whiteSpace: 'pre-wrap' }}
            />
            <p className="text-sm text-gray-500">
              Add multiple image URLs, one per line. URLs will be automatically separated when you paste them.
            </p>
            
            <div className="mt-4 flex space-x-2">
              <Input
                type="text"
                placeholder="https://example.com/image.jpg"
                value={singleImageUrl}
                onChange={(e) => setSingleImageUrl(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && singleImageUrl.trim()) {
                    e.preventDefault();
                    if (singleImageUrl.trim().startsWith('http')) {
                      setFormData(prev => ({
                  ...prev,
                        additional_images: [...prev.additional_images, singleImageUrl.trim()]
                      }));
                      setSingleImageUrl('');
                    }
                  }
                }}
              />
              <Button
                type="button"
                onClick={() => {
                  if (singleImageUrl.trim().startsWith('http')) {
                    setFormData(prev => ({
                      ...prev,
                      additional_images: [...prev.additional_images, singleImageUrl.trim()]
                    }));
                    setSingleImageUrl('');
                  }
                }}
                disabled={!singleImageUrl.trim().startsWith('http')}
              >
                Add
              </Button>
            </div>
            
            {formData.additional_images?.length > 0 && (
              <div className="mt-4 space-y-2">
                <p className="text-sm font-medium">Current Images:</p>
                <div className="space-y-2 max-h-[200px] overflow-y-auto p-2 border rounded-md">
                  {formData.additional_images.map((url, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                      <div className="text-sm truncate max-w-[80%]" title={url}>
                        {url}
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          const newImages = [...formData.additional_images];
                          newImages.splice(index, 1);
                          setFormData(prev => ({ ...prev, additional_images: newImages }));
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="features">
              Property Features (One feature per line)
            </Label>
            <Textarea
              id="features"
              name="features"
              value={formData.features?.join("\n") || ""}
              onChange={(e) => {
                const features = e.target.value
                  .split("\n")
                  .filter((feature) => feature.trim() !== "");
                setFormData((prev) => ({
                  ...prev,
                  features: features,
                }));
              }}
              placeholder="24/7 Security\nSwimming Pool\nFitness Center"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="min_investment">Minimum Investment</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">AED </span>
                <Input
                  id="min_investment"
                  name="min_investment"
                  type="number"
                  value={formData.min_investment}
                  onChange={handleChange}
                  placeholder="500"
                  className="pl-16"
                />
              </div>
              {errors.min_investment && (
                <p className="text-sm text-red-500">{errors.min_investment}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="expected_roi">Expected ROI (%)</Label>
              <div className="relative">
                <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  id="expected_roi"
                  name="expected_roi"
                  type="number"
                  step="0.1"
                  value={formData.expected_roi}
                  onChange={handleChange}
                  placeholder="7.5"
                  className="pl-10"
                />
              </div>
              {errors.expected_roi && (
                <p className="text-sm text-red-500">{errors.expected_roi}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="funding_goal">Funding Goal</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">AED </span>
                <Input
                  id="funding_goal"
                  name="funding_goal"
                  type="number"
                  value={formData.funding_goal}
                  onChange={handleChange}
                  placeholder="100000"
                  className="pl-16"
                />
              </div>
              {errors.funding_goal && (
                <p className="text-sm text-red-500">{errors.funding_goal}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="funding_progress">Current Funding</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">AED </span>
                <Input
                  id="funding_progress"
                  name="funding_progress"
                  type="number"
                  value={formData.funding_progress}
                  onChange={handleChange}
                  placeholder="0"
                  className="pl-16"
                />
              </div>
              {errors.funding_progress && (
                <p className="text-sm text-red-500">{errors.funding_progress}</p>
              )}
            </div>
          </div>

          <div className="space-y-4 border-t pt-4 mt-4">
            <h3 className="font-semibold">Investment Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="investment_term">Investment Term</Label>
                <Input
                  id="investment_term"
                  value={formData.investment_details?.term || ""}
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      investment_details: {
                        ...prev.investment_details,
                        term: e.target.value,
                      },
                    }));
                  }}
                  placeholder="5 years"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="payoutFrequency">Payout Frequency</Label>
                <Input
                  id="payoutFrequency"
                  value={formData.investment_details?.payoutFrequency || ""}
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      investment_details: {
                        ...prev.investment_details,
                        payoutFrequency: e.target.value,
                      },
                    }));
                  }}
                  placeholder="Quarterly"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="exitStrategy">Exit Strategy</Label>
                <Input
                  id="exitStrategy"
                  value={formData.investment_details?.exitStrategy || ""}
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      investment_details: {
                        ...prev.investment_details,
                        exitStrategy: e.target.value,
                      },
                    }));
                  }}
                  placeholder="Property sale or refinancing"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="investorCount">Current Investor Count</Label>
                <Input
                  id="investorCount"
                  type="number"
                  value={formData.investment_details?.investorCount || 0}
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      investment_details: {
                        ...prev.investment_details,
                        investorCount: parseInt(e.target.value) || 0,
                      },
                    }));
                  }}
                  placeholder="0"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="property_type">Property Type</Label>
            <Select
              value={formData.property_type}
              onValueChange={handleSelectChange}
              defaultValue={formData.property_type}
            >
              <SelectTrigger id="property_type">
                <SelectValue placeholder="Select property type" />
              </SelectTrigger>
              <SelectContent>
                {propertyTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {formData.property_type === "NFT-properties" && (
            <div className="space-y-4 border-t pt-4 mt-4">
              <h3 className="font-semibold">NFT Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="total_nfts">Total NFTs</Label>
                  <Input
                    id="total_nfts"
                    type="number"
                    value={Math.floor(formData.funding_goal / 500)}
                    disabled
                    className="bg-gray-50"
                  />
                  <p className="text-sm text-gray-500">Automatically calculated (AED Price / 500)</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="min_purchase_nft">Minimum Purchase NFTs</Label>
                  <Input
                    id="min_purchase_nft"
                    type="number"
                    value={1}
                    disabled
                    className="bg-gray-50"
                  />
                  <p className="text-sm text-gray-500">Fixed at 1 NFT (500 AED)</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="blockchain">Blockchain</Label>
                  <Select
                    value={formData.blockchain || "Solana"}
                    onValueChange={handleBlockchainChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select blockchain" />
                    </SelectTrigger>
                    <SelectContent>
                      {blockchainOptions.map((blockchain) => (
                        <SelectItem key={blockchain} value={blockchain}>
                          {blockchain}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="marketplace">Marketplace</Label>
                  <Select
                    value={formData.marketplace || "AlFutura"}
                    onValueChange={handleMarketplaceChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select marketplace" />
                    </SelectTrigger>
                    <SelectContent>
                      {marketplaceOptions.map((marketplace) => (
                        <SelectItem key={marketplace} value={marketplace}>
                          {marketplace}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="marketplace_url">Marketplace URL</Label>
                  <Input
                    id="marketplace_url"
                    name="marketplace_url"
                    placeholder="https://marketplace.com/nft/..."
                    value={formData.marketplace_url || ""}
                    onChange={handleChange}
                  />
                  <p className="text-sm text-gray-500">Enter the URL where the NFT is listed</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
          >
            <X className="mr-2 h-4 w-4" /> Cancel
          </Button>
          <Button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white"
            disabled={isLoading}
          >
            {isLoading
              ? "Saving..."
              : initialData
                ? "Update Property"
                : "Add Property"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default PropertyForm;
