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
import { Search, Edit, Trash2, Plus, Eye } from "lucide-react";
import { PropertyFormData } from "./PropertyForm";

interface PropertyTableProps {
  properties: PropertyFormData[];
  onView: (property: PropertyFormData) => void;
  onEdit: (property: PropertyFormData) => void;
  onDelete: (propertyId: string) => void;
  onAdd: () => void;
}

const PropertyTable = ({
  properties,
  onView,
  onEdit,
  onDelete,
  onAdd,
}: PropertyTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProperties = properties.filter((property) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      property.title.toLowerCase().includes(searchLower) ||
      property.location.toLowerCase().includes(searchLower) ||
      property.propertyType.toLowerCase().includes(searchLower)
    );
  });

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
                    colSpan={7}
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
