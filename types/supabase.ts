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
      config: {
        Row: {
          config: Json | null
          created_at: string | null
          id: number
          modified_at: string
          name: string
          user_id: number
        }
        Insert: {
          config?: Json | null
          created_at?: string | null
          id?: number
          modified_at?: string
          name: string
          user_id: number
        }
        Update: {
          config?: Json | null
          created_at?: string | null
          id?: number
          modified_at?: string
          name?: string
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "config_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "user_info"
            referencedColumns: ["id"]
          }
        ]
      }
      coverletter: {
        Row: {
          coverletter: string | null
          created_at: string | null
          id: number
          modified_at: string | null
          name: string | null
          user_id: string | null
        }
        Insert: {
          coverletter?: string | null
          created_at?: string | null
          id?: number
          modified_at?: string | null
          name?: string | null
          user_id?: string | null
        }
        Update: {
          coverletter?: string | null
          created_at?: string | null
          id?: number
          modified_at?: string | null
          name?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      jobdetails: {
        Row: {
          applied: boolean | null
          created_at: string | null
          generatedCoverLetter: string | null
          id: number
          job_id: number | null
          modified_at: string | null
          status: string | null
        }
        Insert: {
          applied?: boolean | null
          created_at?: string | null
          generatedCoverLetter?: string | null
          id?: number
          job_id?: number | null
          modified_at?: string | null
          status?: string | null
        }
        Update: {
          applied?: boolean | null
          created_at?: string | null
          generatedCoverLetter?: string | null
          id?: number
          job_id?: number | null
          modified_at?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "jobdetails_job_id_fkey"
            columns: ["job_id"]
            referencedRelation: "jobs_masterlist"
            referencedColumns: ["id"]
          }
        ]
      }
      jobs: {
        Row: {
          appliedJobCount: number | null
          coverletter_id: number | null
          created_at: string | null
          email_sending_schedule: string | null
          id: number
          jobCount: number | null
          keyword: string | null
          modified_at: string | null
          name: string
          resume_id: number | null
          search_texts: Json | null
          setup_id: number | null
          status: string | null
        }
        Insert: {
          appliedJobCount?: number | null
          coverletter_id?: number | null
          created_at?: string | null
          email_sending_schedule?: string | null
          id?: number
          jobCount?: number | null
          keyword?: string | null
          modified_at?: string | null
          name: string
          resume_id?: number | null
          search_texts?: Json | null
          setup_id?: number | null
          status?: string | null
        }
        Update: {
          appliedJobCount?: number | null
          coverletter_id?: number | null
          created_at?: string | null
          email_sending_schedule?: string | null
          id?: number
          jobCount?: number | null
          keyword?: string | null
          modified_at?: string | null
          name?: string
          resume_id?: number | null
          search_texts?: Json | null
          setup_id?: number | null
          status?: string | null
        }
        Relationships: []
      }
      jobs_masterlist: {
        Row: {
          created_at: string | null
          details: Json | null
          details_version: string | null
          id: number
          jobid: string | null
          jobname: string | null
          jobverified: boolean | null
          source: string | null
          source_site: string | null
          tags: string | null
          url: string | null
        }
        Insert: {
          created_at?: string | null
          details?: Json | null
          details_version?: string | null
          id?: number
          jobid?: string | null
          jobname?: string | null
          jobverified?: boolean | null
          source?: string | null
          source_site?: string | null
          tags?: string | null
          url?: string | null
        }
        Update: {
          created_at?: string | null
          details?: Json | null
          details_version?: string | null
          id?: number
          jobid?: string | null
          jobname?: string | null
          jobverified?: boolean | null
          source?: string | null
          source_site?: string | null
          tags?: string | null
          url?: string | null
        }
        Relationships: []
      }
      resume: {
        Row: {
          created_at: string | null
          filepath: string
          id: number
          name: string
          user_id: number
        }
        Insert: {
          created_at?: string | null
          filepath: string
          id?: number
          name: string
          user_id: number
        }
        Update: {
          created_at?: string | null
          filepath?: string
          id?: number
          name?: string
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "resume_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "user_info"
            referencedColumns: ["id"]
          }
        ]
      }
      user_info: {
        Row: {
          active_subscription: boolean | null
          active_subscription_id: number | null
          created_at: string | null
          email: string
          fullname: string
          id: number
          is_active: boolean | null
          mobile_no: string | null
          userid: string
        }
        Insert: {
          active_subscription?: boolean | null
          active_subscription_id?: number | null
          created_at?: string | null
          email: string
          fullname: string
          id?: number
          is_active?: boolean | null
          mobile_no?: string | null
          userid: string
        }
        Update: {
          active_subscription?: boolean | null
          active_subscription_id?: number | null
          created_at?: string | null
          email?: string
          fullname?: string
          id?: number
          is_active?: boolean | null
          mobile_no?: string | null
          userid?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_info_userid_fkey"
            columns: ["userid"]
            referencedRelation: "users"
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
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
