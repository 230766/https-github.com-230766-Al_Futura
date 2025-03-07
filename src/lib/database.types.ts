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
          funding_progress: number
          funding_goal: number
          features: string[]
          is_featured: boolean
          created_at: string
          updated_at: string
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
          funding_progress?: number
          funding_goal: number
          features?: string[]
          is_featured?: boolean
          created_at?: string
          updated_at?: string
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
          funding_progress?: number
          funding_goal?: number
          features?: string[]
          is_featured?: boolean
          created_at?: string
          updated_at?: string
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