CREATE TABLE IF NOT EXISTS public.properties (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    title text NOT NULL,
    description text,
    location text NOT NULL,
    image_url text NOT NULL,
    additional_images text[] DEFAULT '{}'::text[],
    min_investment integer NOT NULL,
    expected_roi numeric NOT NULL,
    funding_progress integer DEFAULT 0 NOT NULL,
    funding_goal integer NOT NULL,
    property_type text NOT NULL,
    features text[] DEFAULT '{}'::text[],
    investment_details jsonb DEFAULT '{"term": "5 years", "payoutFrequency": "Quarterly", "exitStrategy": "Property sale or refinancing", "investorCount": 0}'::jsonb
);

-- Enable realtime for the properties table
alter publication supabase_realtime add table properties;
