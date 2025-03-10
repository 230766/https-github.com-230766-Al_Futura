import { createClient } from '@supabase/supabase-js'
import type { Database } from './database.types'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

// Type-safe helpers
export const getProperties = () => 
  supabase.from('properties').select('*')

export const getPropertyById = (id: string) => 
  supabase.from('properties').select('*').eq('id', id).single()

export const createProperty = (property: Database['public']['Tables']['properties']['Insert']) => 
  supabase.from('properties').insert(property)

export const updateProperty = (id: string, updates: Database['public']['Tables']['properties']['Update']) => 
  supabase.from('properties').update(updates).eq('id', id)

export const deleteProperty = (id: string) => 
  supabase.from('properties').delete().eq('id', id)

// Helper types for database tables
export type User = Database['public']['Tables']['users']['Row']
export type Property = Database['public']['Tables']['properties']['Row']
export type Investment = Database['public']['Tables']['investments']['Row']

// Helper type for property types
export type PropertyType = 'Residential' | 'Commercial' | 'Vacation' | 'Retail' | 'Industrial'

// Helper function to test the connection
export async function testConnection() {
  try {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .limit(1);
    
    if (error) {
      throw error;
    }
    
    console.log('Successfully connected to Supabase');
    return true;
  } catch (error) {
    console.error('Failed to connect to Supabase:', error);
    return false;
  }
}
