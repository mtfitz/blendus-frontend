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
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      projects: {
        Row: {
          author: string
          blender_version: Database["public"]["Enums"]["blender_version_type"]
          created_at: string | null
          description: string | null
          filename: string | null
          id: string
          modified_at: string | null
          name: string | null
        }
        Insert: {
          author: string
          blender_version?: Database["public"]["Enums"]["blender_version_type"]
          created_at?: string | null
          description?: string | null
          filename?: string | null
          id?: string
          modified_at?: string | null
          name?: string | null
        }
        Update: {
          author?: string
          blender_version?: Database["public"]["Enums"]["blender_version_type"]
          created_at?: string | null
          description?: string | null
          filename?: string | null
          id?: string
          modified_at?: string | null
          name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "projects_author_fkey"
            columns: ["author"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      blender_version_type: "2.46" | "2.83" | "2.93" | "3.3" | "3.6"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
