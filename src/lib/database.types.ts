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
          description: string | null
          location: string
          image_url: string
          min_investment: number
          expected_roi: number
          funding_progress: number
          funding_goal: number
          property_type: string
          features: Json | null
          investment_details: Json | null
          additional_images: string[] | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          location: string
          image_url: string
          min_investment: number
          expected_roi: number
          funding_progress?: number
          funding_goal: number
          property_type: string
          features?: Json | null
          investment_details?: Json | null
          additional_images?: string[] | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          location?: string
          image_url?: string
          min_investment?: number
          expected_roi?: number
          funding_progress?: number
          funding_goal?: number
          property_type?: string
          features?: Json | null
          investment_details?: Json | null
          additional_images?: string[] | null
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