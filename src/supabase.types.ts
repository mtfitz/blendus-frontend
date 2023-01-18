export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
      }
      projects: {
        Row: {
          author: string
          created_at: string | null
          description: string | null
          filename: string | null
          id: string
          modified_at: string | null
          name: string | null
        }
        Insert: {
          author: string
          created_at?: string | null
          description?: string | null
          filename?: string | null
          id?: string
          modified_at?: string | null
          name?: string | null
        }
        Update: {
          author?: string
          created_at?: string | null
          description?: string | null
          filename?: string | null
          id?: string
          modified_at?: string | null
          name?: string | null
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
