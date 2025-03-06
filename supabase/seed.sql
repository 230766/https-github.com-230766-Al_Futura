-- Insert sample properties data
INSERT INTO public.properties (
  title, 
  description, 
  location, 
  image_url, 
  min_investment, 
  expected_roi, 
  funding_progress, 
  funding_goal, 
  property_type,
  features,
  investment_details,
  additional_images
) VALUES 
(
  'Luxury Apartment Complex',
  'A premium residential complex with high-end amenities in the heart of Madrid. Features include 24/7 security, swimming pool, fitness center, and landscaped gardens. Each unit offers modern finishes, spacious layouts, and balconies with city views.',
  'Madrid, Spain',
  'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
  500,
  8.5,
  65000,
  100000,
  'Residential',
  '["24/7 Security", "Swimming Pool", "Fitness Center", "Landscaped Gardens", "Underground Parking", "Concierge Service"]',
  '{"term": "5 years", "payoutFrequency": "Quarterly", "exitStrategy": "Property sale or refinancing", "investorCount": 127}',
  ARRAY['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80', 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80', 'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800&q=80']
),
(
  'Commercial Office Building',
  'Modern office space in Barcelona''s business district with excellent connectivity. The property features open floor plans, high-speed internet infrastructure, meeting rooms, and a rooftop terrace. Located near major transportation hubs and business centers.',
  'Barcelona, Spain',
  'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=80',
  1000,
  7.2,
  120000,
  250000,
  'Commercial',
  '["Open Floor Plans", "High-Speed Internet", "Meeting Rooms", "Rooftop Terrace", "24/7 Access", "Parking Facilities"]',
  '{"term": "7 years", "payoutFrequency": "Monthly", "exitStrategy": "Long-term lease agreements with corporate tenants", "investorCount": 89}',
  ARRAY['https://images.unsplash.com/photo-1497215842964-222b430dc094?w=800&q=80', 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80', 'https://images.unsplash.com/photo-1604328698692-f76ea9498e76?w=800&q=80']
),
(
  'Beachfront Vacation Rentals',
  'Luxury vacation properties with direct beach access and stunning ocean views. Perfect for short-term rentals with high occupancy rates during tourist seasons.',
  'Valencia, Spain',
  'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&q=80',
  750,
  9.1,
  89000,
  150000,
  'Vacation',
  '["Beach Access", "Ocean Views", "Swimming Pool", "Modern Furnishings", "Air Conditioning", "Tourist Area"]',
  '{"term": "4 years", "payoutFrequency": "Quarterly", "exitStrategy": "Property sale at market appreciation", "investorCount": 103}',
  ARRAY['https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80', 'https://images.unsplash.com/photo-1562184552-997c461abbe6?w=800&q=80', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80']
); 