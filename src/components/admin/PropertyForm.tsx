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

// Add a simple Json type definition
type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface PropertyFormData {
  id?: string;
  title: string;
  description: string;
  location: string;
  imageUrl: string;
  additionalImages: string[];
  minInvestment: number;
  expectedROI: number;
  fundingProgress: number;
  fundingGoal: number;
  propertyType: string;
  features: string[];
  investmentDetails: {
    term: string;
    payoutFrequency: string;
    exitStrategy: string;
    investorCount: number;
  };
  is_featured?: boolean;
}

interface PropertyFormProps {
  initialData?: PropertyFormData;
  onSubmit: (data: PropertyFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const defaultProperty: PropertyFormData = {
  title: "",
  description: "",
  location: "",
  imageUrl: "",
  additionalImages: [],
  minInvestment: 500,
  expectedROI: 7.5,
  fundingProgress: 0,
  fundingGoal: 100000,
  propertyType: "Residential",
  features: [],
  investmentDetails: {
    term: "5 years",
    payoutFrequency: "Quarterly",
    exitStrategy: "Property sale or refinancing",
    investorCount: 0,
  },
};

const propertyTypes = [
  "Residential",
  "Commercial",
  "Vacation",
  "Retail",
  "Industrial",
];

const PropertyForm = ({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
}: PropertyFormProps) => {
  const [formData, setFormData] = useState<PropertyFormData>(
    initialData || defaultProperty,
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [singleImageUrl, setSingleImageUrl] = useState("");

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "minInvestment" ||
        name === "expectedROI" ||
        name === "fundingProgress" ||
        name === "fundingGoal"
          ? parseFloat(value) || 0
          : value,
    }));

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      propertyType: value,
    }));
  };

  const handleAdditionalImagesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const urls = e.target.value.split("\n").filter((url) => url.trim() !== "");
    setFormData((prev) => ({
      ...prev,
      additionalImages: urls,
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
        additionalImages: urls,
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
        additionalImages: urls,
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

    if (!formData.imageUrl.trim()) {
      newErrors.imageUrl = "Image URL is required";
    }

    if (formData.minInvestment <= 0) {
      newErrors.minInvestment = "Minimum investment must be greater than 0";
    }

    if (formData.expectedROI <= 0) {
      newErrors.expectedROI = "Expected ROI must be greater than 0";
    }

    if (formData.fundingGoal <= 0) {
      newErrors.fundingGoal = "Funding goal must be greater than 0";
    }

    if (formData.fundingProgress < 0) {
      newErrors.fundingProgress = "Funding progress cannot be negative";
    }

    if (formData.fundingProgress > formData.fundingGoal) {
      newErrors.fundingProgress = "Funding progress cannot exceed the goal";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
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
            <Label htmlFor="imageUrl">Main Image URL</Label>
            <Input
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
            />
            {errors.imageUrl && (
              <p className="text-sm text-red-500">{errors.imageUrl}</p>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="additionalImages">
                Additional Images (One URL per line)
              </Label>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">
                  {formData.additionalImages.length} image{formData.additionalImages.length !== 1 ? 's' : ''}
                </span>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  onClick={() => setFormData(prev => ({ ...prev, additionalImages: [] }))}
                >
                  Clear All
                </Button>
              </div>
            </div>
            <Textarea
              id="additionalImages"
              name="additionalImages"
              value={formData.additionalImages?.join("\n") || ""}
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
                        additionalImages: [...prev.additionalImages, singleImageUrl.trim()]
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
                      additionalImages: [...prev.additionalImages, singleImageUrl.trim()]
                    }));
                    setSingleImageUrl('');
                  }
                }}
                disabled={!singleImageUrl.trim().startsWith('http')}
              >
                Add
              </Button>
            </div>
            
            {formData.additionalImages.length > 0 && (
              <div className="mt-4 space-y-2">
                <p className="text-sm font-medium">Current Images:</p>
                <div className="space-y-2 max-h-[200px] overflow-y-auto p-2 border rounded-md">
                  {formData.additionalImages.map((url, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                      <div className="text-sm truncate max-w-[80%]" title={url}>
                        {url}
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          const newImages = [...formData.additionalImages];
                          newImages.splice(index, 1);
                          setFormData(prev => ({ ...prev, additionalImages: newImages }));
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
              <Label htmlFor="minInvestment">Minimum Investment</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">AED </span>
                <Input
                  id="minInvestment"
                  name="minInvestment"
                  type="number"
                  value={formData.minInvestment}
                  onChange={handleChange}
                  placeholder="500"
                  className="pl-16"
                />
              </div>
              {errors.minInvestment && (
                <p className="text-sm text-red-500">{errors.minInvestment}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="expectedROI">Expected ROI (%)</Label>
              <div className="relative">
                <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  id="expectedROI"
                  name="expectedROI"
                  type="number"
                  step="0.1"
                  value={formData.expectedROI}
                  onChange={handleChange}
                  placeholder="7.5"
                  className="pl-10"
                />
              </div>
              {errors.expectedROI && (
                <p className="text-sm text-red-500">{errors.expectedROI}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="fundingGoal">Funding Goal</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">AED </span>
                <Input
                  id="fundingGoal"
                  name="fundingGoal"
                  type="number"
                  value={formData.fundingGoal}
                  onChange={handleChange}
                  placeholder="100000"
                  className="pl-16"
                />
              </div>
              {errors.fundingGoal && (
                <p className="text-sm text-red-500">{errors.fundingGoal}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="fundingProgress">Current Funding</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">AED </span>
                <Input
                  id="fundingProgress"
                  name="fundingProgress"
                  type="number"
                  value={formData.fundingProgress}
                  onChange={handleChange}
                  placeholder="0"
                  className="pl-16"
                />
              </div>
              {errors.fundingProgress && (
                <p className="text-sm text-red-500">{errors.fundingProgress}</p>
              )}
            </div>
          </div>

          <div className="space-y-4 border-t pt-4 mt-4">
            <h3 className="font-semibold">Investment Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="investmentTerm">Investment Term</Label>
                <Input
                  id="investmentTerm"
                  value={formData.investmentDetails?.term || ""}
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      investmentDetails: {
                        ...prev.investmentDetails,
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
                  value={formData.investmentDetails?.payoutFrequency || ""}
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      investmentDetails: {
                        ...prev.investmentDetails,
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
                  value={formData.investmentDetails?.exitStrategy || ""}
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      investmentDetails: {
                        ...prev.investmentDetails,
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
                  value={formData.investmentDetails?.investorCount || 0}
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      investmentDetails: {
                        ...prev.investmentDetails,
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
            <Label htmlFor="propertyType">Property Type</Label>
            <Select
              value={formData.propertyType}
              onValueChange={handleSelectChange}
            >
              <SelectTrigger>
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
