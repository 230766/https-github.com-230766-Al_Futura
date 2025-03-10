export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          full_name: string | null
          role: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          role?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          role?: string
          created_at?: string
          updated_at?: string
        }
      }
      properties: {
        Row: {
          id: string
          title: string
          description: string
          location: string
          image_url: string
          additional_images: string[]
          property_type: string
          min_investment: number
          expected_roi: number
          investment_term: number
          features: string[]
          investment_details: {
            term: string
            payoutFrequency: string
            exitStrategy: string
            investorCount: number
            marketplace_url?: string
            blockchain?: string
            marketplace?: string
          } | null
          funding_progress: number
          funding_goal: number
          created_at: string
          updated_at: string
          is_featured?: boolean
          total_nfts?: number
          min_purchase_nft?: number
          blockchain?: 'Solana' | 'Ethereum' | 'VeChain' | 'Polygon'
          marketplace?: 'OpenSea' | 'Rarible' | 'AlFutura'
          marketplace_url?: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          location: string
          image_url: string
          additional_images?: string[]
          property_type: string
          min_investment: number
          expected_roi: number
          investment_term: number
          features?: string[]
          investment_details?: {
            term: string
            payoutFrequency: string
            exitStrategy: string
            investorCount: number
            marketplace_url?: string
            blockchain?: string
            marketplace?: string
          } | null
          funding_progress?: number
          funding_goal: number
          created_at?: string
          updated_at?: string
          is_featured?: boolean
          total_nfts?: number
          min_purchase_nft?: number
          blockchain?: 'Solana' | 'Ethereum' | 'VeChain' | 'Polygon'
          marketplace?: 'OpenSea' | 'Rarible' | 'AlFutura'
          marketplace_url?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          location?: string
          image_url?: string
          additional_images?: string[]
          property_type?: string
          min_investment?: number
          expected_roi?: number
          investment_term?: number
          features?: string[]
          investment_details?: {
            term: string
            payoutFrequency: string
            exitStrategy: string
            investorCount: number
            marketplace_url?: string
            blockchain?: string
            marketplace?: string
          } | null
          funding_progress?: number
          funding_goal?: number
          created_at?: string
          updated_at?: string
          is_featured?: boolean
          total_nfts?: number
          min_purchase_nft?: number
          blockchain?: 'Solana' | 'Ethereum' | 'VeChain' | 'Polygon'
          marketplace?: 'OpenSea' | 'Rarible' | 'AlFutura'
          marketplace_url?: string
        }
      }
      investments: {
        Row: {
          id: string
          user_id: string
          property_id: string
          amount: number
          created_at: string
          status: string
        }
        Insert: {
          id?: string
          user_id: string
          property_id: string
          amount: number
          created_at?: string
          status?: string
        }
        Update: {
          id?: string
          user_id?: string
          property_id?: string
          amount?: number
          created_at?: string
          status?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T]

// Helpful type aliases
export type Tables = Database['public']['Tables']
export type Property = Tables['properties']['Row']
export type NewProperty = Tables['properties']['Insert']
export type PropertyUpdate = Tables['properties']['Update'] 