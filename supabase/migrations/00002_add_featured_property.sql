-- Drop and recreate the column
DO $$ 
BEGIN
    ALTER TABLE public.properties DROP COLUMN IF EXISTS is_featured;
    ALTER TABLE public.properties ADD COLUMN is_featured BOOLEAN DEFAULT false;
EXCEPTION
    WHEN others THEN
        NULL;
END $$;

-- Enable RLS
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;

-- Create policy
DROP POLICY IF EXISTS "Enable all access for authenticated users" ON public.properties;
CREATE POLICY "Enable all access for authenticated users"
    ON public.properties
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Force schema refresh
SELECT pg_notify('pgrst', 'reload schema'); 