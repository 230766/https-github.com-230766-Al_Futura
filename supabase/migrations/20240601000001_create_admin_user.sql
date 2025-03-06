-- Create admin user if not exists
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'info@alfutura.com') THEN
    INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at)
    VALUES (
      gen_random_uuid(),
      'info@alfutura.com',
      crypt('Longo_1992', gen_salt('bf')),
      now(),
      '{"provider":"email","providers":["email"]}',
      '{"full_name":"Admin User","role":"admin"}',
      now(),
      now()
    );
  ELSE
    -- Update existing user to have admin role
    UPDATE auth.users
    SET raw_user_meta_data = jsonb_set(raw_user_meta_data, '{role}', '"admin"')
    WHERE email = 'info@alfutura.com';
  END IF;

  -- Ensure there's a corresponding entry in public.users table
  IF NOT EXISTS (SELECT 1 FROM public.users WHERE email = 'info@alfutura.com') THEN
    INSERT INTO public.users (id, email, full_name, role, created_at, updated_at)
    SELECT id, email, raw_user_meta_data->>'full_name', raw_user_meta_data->>'role', created_at, updated_at
    FROM auth.users
    WHERE email = 'info@alfutura.com';
  ELSE
    -- Update existing user in public.users table
    UPDATE public.users
    SET role = 'admin'
    WHERE email = 'info@alfutura.com';
  END IF;
END
$$;