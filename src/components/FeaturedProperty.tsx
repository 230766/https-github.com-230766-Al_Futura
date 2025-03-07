import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Database } from '../lib/database.types';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Star, MapPin, Home, DollarSign, Percent } from 'lucide-react';
import { Dialog, DialogContent } from './ui/dialog';
import PropertyDetail from './PropertyDetail';

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
  } | null;
  funding_progress: number;
  funding_goal: number;
  created_at: string;
  updated_at: string;
}

export const FeaturedProperty = () => {
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const fetchFeaturedProperty = async () => {
    try {
      console.log('Fetching featured property...');
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('is_featured', true)
        .single();

      if (error) {
        console.error('Error fetching featured property:', error);
        throw error;
      }

      console.log('Featured property data:', data);
      setProperty(data);
    } catch (error) {
      console.error('Error in fetchFeaturedProperty:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeaturedProperty();

    // Subscribe to changes in the properties table
    const channel = supabase
      .channel('featured-property-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'properties',
          filter: 'is_featured=true'
        },
        (payload) => {
          console.log('Received real-time update:', payload);
          fetchFeaturedProperty();
        }
      )
      .subscribe((status) => {
        console.log('Subscription status:', status);
      });

    // Cleanup subscription
    return () => {
      console.log('Cleaning up subscription');
      channel.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!property) {
    return (
      <Card className="w-full overflow-hidden">
        <CardContent className="p-8 text-center text-gray-500">
          No featured property selected
        </CardContent>
      </Card>
    );
  }

  const handleViewDetails = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <Card className="w-full overflow-hidden bg-white shadow-2xl rounded-xl transform transition-transform hover:scale-[1.02]">
        <div className="relative h-[220px] w-full">
          <img
            src={property.image_url}
            alt={property.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          <Badge className="absolute top-4 left-4 bg-yellow-500/90 backdrop-blur-sm">
            <Star className="w-4 h-4 mr-1" />
            Featured Property
          </Badge>
        </div>
        <CardHeader className="pb-2 pt-6 px-6">
          <CardTitle className="text-2xl font-bold">{property.title}</CardTitle>
          <CardDescription className="flex items-center gap-2 text-base mt-2">
            <MapPin className="w-4 h-4" />
            {property.location}
          </CardDescription>
        </CardHeader>
        <CardContent className="px-6 pb-6">
          <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-8">
            <div className="flex items-center gap-3">
              <Home className="w-5 h-5 text-blue-600" />
              <span className="font-medium">{property.property_type}</span>
            </div>
            <div className="flex items-center gap-3">
              <DollarSign className="w-5 h-5 text-blue-600" />
              <span className="font-medium">AED {property.min_investment.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-3">
              <Percent className="w-5 h-5 text-green-600" />
              <span className="font-medium text-green-600">{property.expected_roi}% ROI</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, (property.funding_progress / property.funding_goal) * 100)}%` }}
                ></div>
              </div>
              <span className="font-medium text-blue-600 min-w-[40px] text-right">
                {Math.round((property.funding_progress / property.funding_goal) * 100)}%
              </span>
            </div>
          </div>
          <Button 
            onClick={handleViewDetails} 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold h-12"
          >
            View Details
          </Button>
        </CardContent>
      </Card>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent 
          className="max-w-4xl max-h-[90vh] overflow-y-auto p-0"
          aria-describedby="property-details-description"
        >
          <div id="property-details-description" className="sr-only">
            Detailed information about {property.title}, including property features, investment details, and funding progress.
          </div>
          <PropertyDetail property={property} hideNavigation />
        </DialogContent>
      </Dialog>
    </>
  );
}; 