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
          created_at: string
          subscription_status: string
          subscription_end_date: string | null
          quiz_completed: boolean
        }
        Insert: {
          id?: string
          email: string
          created_at?: string
          subscription_status?: string
          subscription_end_date?: string | null
          quiz_completed?: boolean
        }
        Update: {
          id?: string
          email?: string
          created_at?: string
          subscription_status?: string
          subscription_end_date?: string | null
          quiz_completed?: boolean
        }
      }
      quiz_responses: {
        Row: {
          id: string
          user_id: string
          created_at: string
          responses: Json
        }
        Insert: {
          id?: string
          user_id: string
          created_at?: string
          responses: Json
        }
        Update: {
          id?: string
          user_id?: string
          created_at?: string
          responses?: Json
        }
      }
      exercises: {
        Row: {
          id: string
          title: string
          description: string
          level: string
          category: string
          image_url: string
          video_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          level: string
          category: string
          image_url: string
          video_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          level?: string
          category?: string
          image_url?: string
          video_url?: string | null
          created_at?: string
        }
      }
    }
  }
}