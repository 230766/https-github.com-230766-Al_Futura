-- Enable Row Level Security
ALTER TABLE IF EXISTS public.projects ENABLE ROW LEVEL SECURITY;

-- Create users table to store additional user information
CREATE TABLE IF NOT EXISTS public.users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  role TEXT DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create properties table
CREATE TABLE IF NOT EXISTS public.properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  location TEXT NOT NULL,
  image_url TEXT NOT NULL,
  min_investment INTEGER NOT NULL,
  expected_roi DECIMAL(5,2) NOT NULL,
  funding_progress INTEGER NOT NULL DEFAULT 0,
  funding_goal INTEGER NOT NULL,
  property_type TEXT NOT NULL,
  features JSONB,
  investment_details JSONB,
  additional_images TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create investments table to track user investments
CREATE TABLE IF NOT EXISTS public.investments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  property_id UUID REFERENCES public.properties(id) NOT NULL,
  amount INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  status TEXT DEFAULT 'active' NOT NULL
);

-- Set up RLS policies
-- Properties table - anyone can read
CREATE POLICY "Properties are viewable by everyone" 
  ON public.properties FOR SELECT USING (true);

-- Properties table - only admins can insert/update/delete
CREATE POLICY "Properties are editable by admins only" 
  ON public.properties FOR ALL 
  USING (auth.jwt() ->> 'role' = 'admin');

-- Investments table - users can see their own investments
CREATE POLICY "Users can view their own investments" 
  ON public.investments FOR SELECT 
  USING (auth.uid() = user_id);

-- Investments table - users can create their own investments
CREATE POLICY "Users can create their own investments" 
  ON public.investments FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Investments table - admins can see all investments
CREATE POLICY "Admins can view all investments" 
  ON public.investments FOR SELECT 
  USING (auth.jwt() ->> 'role' = 'admin');

-- Enable realtime for all tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.properties;
ALTER PUBLICATION supabase_realtime ADD TABLE public.investments;
ALTER PUBLICATION supabase_realtime ADD TABLE public.users;

-- Create a function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name, role)
  VALUES (new.id, new.email, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'role');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a trigger to call the function when a new user is created
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user(); 