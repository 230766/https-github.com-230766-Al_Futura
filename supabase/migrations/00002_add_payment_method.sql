-- Add payment_method column to investments table
ALTER TABLE public.investments
ADD COLUMN payment_method TEXT;

-- Update existing rows to have a default value
UPDATE public.investments
SET payment_method = 'card'
WHERE payment_method IS NULL; 