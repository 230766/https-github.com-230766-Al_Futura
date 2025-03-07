import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Search, Edit, Trash2, Plus, Eye, Star } from "lucide-react";
import { PropertyFormData } from "./PropertyForm";
import { supabase } from "../../lib/supabase";
import { toast } from "sonner";

interface PropertyTableProps {
  properties: PropertyFormData[];
  onView: (property: PropertyFormData) => void;
  onEdit: (property: PropertyFormData) => void;
  onDelete: (propertyId: string) => void;
  onAdd: () => void;
  onRefresh: () => void;
}

const PropertyTable = ({
  properties,
  onView,
  onEdit,
  onDelete,
  onAdd,
  onRefresh,
}: PropertyTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState<string | null>(null);

  const filteredProperties = properties.filter((property) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      property.title.toLowerCase().includes(searchLower) ||
      property.location.toLowerCase().includes(searchLower) ||
      property.propertyType.toLowerCase().includes(searchLower)
    );
  });

  const handleSetFeatured = async (property: PropertyFormData) => {
    try {
      setLoading(property.id || null);
      console.log('Setting property as featured:', property.id);

      // First, unset all featured properties
      const { error: clearError } = await supabase
        .from('properties')
        .update({ 
          is_featured: false,
          updated_at: new Date().toISOString()
        })
        .eq('is_featured', true);

      if (clearError) {
        console.error('Error clearing other featured properties:', clearError);
        throw clearError;
      }

      // Then set this property as featured
      const { error: updateError } = await supabase
        .from('properties')
        .update({ 
          is_featured: true,
          updated_at: new Date().toISOString()
        })
        .eq('id', property.id);

      if (updateError) {
        console.error('Error setting property as featured:', updateError);
        throw updateError;
      }

      console.log('Successfully updated featured status');
      toast.success('Property set as featured');
      onRefresh();
    } catch (error: any) {
      console.error('Error updating featured property:', error);
      toast.error(error?.message || 'Failed to update featured property');
    } finally {
      setLoading(null);
    }
  };

  return (
    <Card className="w-full bg-white">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-bold">Properties</CardTitle>
        <Button
          onClick={onAdd}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Plus className="mr-2 h-4 w-4" /> Add Property
        </Button>
      </CardHeader>
      <CardContent>
        <div className="mb-4 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            placeholder="Search properties..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Property</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Min. Investment</TableHead>
                <TableHead>ROI</TableHead>
                <TableHead>Funding</TableHead>
                <TableHead>Featured</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProperties.length > 0 ? (
                filteredProperties.map((property) => (
                  <TableRow key={property.id}>
                    <TableCell className="font-medium">
                      {property.title}
                    </TableCell>
                    <TableCell>{property.location}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="bg-blue-50 text-blue-700 hover:bg-blue-50"
                      >
                        {property.propertyType}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      AED {property.minInvestment.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-green-600">
                      {property.expectedROI}%
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col space-y-1">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{
                              width: `${Math.min(100, (property.fundingProgress / property.fundingGoal) * 100)}%`,
                            }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-500">
                          AED {property.fundingProgress.toLocaleString()} / 
                          AED {property.fundingGoal.toLocaleString()}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSetFeatured(property)}
                        disabled={loading === property.id}
                        className={property.is_featured ? "bg-yellow-50 text-yellow-800 hover:bg-yellow-100" : ""}
                      >
                        <Star className={`h-4 w-4 mr-1 ${property.is_featured ? "fill-current" : ""}`} />
                        {property.is_featured ? "Featured" : "Set as Featured"}
                      </Button>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onView(property)}
                          className="h-8 w-8 text-gray-500 hover:text-blue-600"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onEdit(property)}
                          className="h-8 w-8 text-gray-500 hover:text-blue-600"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onDelete(property.id || "")}
                          className="h-8 w-8 text-gray-500 hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="text-center py-6 text-gray-500"
                  >
                    {searchTerm
                      ? "No properties match your search"
                      : "No properties found"}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyTable;
