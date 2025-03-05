import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import {
  MapPin,
  Home,
  DollarSign,
  TrendingUp,
  Percent,
  ArrowLeft,
} from "lucide-react";
import { PropertyFormData } from "./PropertyForm";

interface PropertyDetailProps {
  property: PropertyFormData;
  onBack: () => void;
  onEdit: (property: PropertyFormData) => void;
}

const PropertyDetail = ({ property, onBack, onEdit }: PropertyDetailProps) => {
  const progressPercentage =
    (property.fundingProgress / property.fundingGoal) * 100;

  return (
    <Card className="w-full bg-white">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="h-8 w-8"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <CardTitle className="text-xl font-bold">{property.title}</CardTitle>
        </div>
        <Badge
          variant="outline"
          className="bg-blue-50 text-blue-700 hover:bg-blue-50"
        >
          {property.propertyType}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="aspect-video w-full overflow-hidden rounded-lg">
          <img
            src={property.imageUrl}
            alt={property.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Property Details</h3>
              <div className="flex items-center text-gray-600 mb-2">
                <MapPin className="h-5 w-5 mr-2 text-blue-600" />
                <span>{property.location}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Home className="h-5 w-5 mr-2 text-blue-600" />
                <span>{property.propertyType}</span>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-gray-600">
                {property.description || "No description provided."}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Investment Information
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center mb-1">
                    <DollarSign className="h-4 w-4 text-blue-600 mr-1" />
                    <span className="text-sm text-gray-500">
                      Min. Investment
                    </span>
                  </div>
                  <p className="text-lg font-semibold">
                    ${property.minInvestment.toLocaleString()}
                  </p>
                </div>

                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center mb-1">
                    <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                    <span className="text-sm text-gray-500">Expected ROI</span>
                  </div>
                  <p className="text-lg font-semibold text-green-600">
                    {property.expectedROI}%
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Funding Progress</h3>
              <div className="space-y-2">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${Math.min(100, progressPercentage)}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    ${property.fundingProgress.toLocaleString()} raised
                  </span>
                  <span className="font-medium">
                    {Math.round(progressPercentage)}% of $
                    {property.fundingGoal.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button
          onClick={() => onEdit(property)}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          Edit Property
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PropertyDetail;
