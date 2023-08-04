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
          created_at: string | null
          id: number
          modified_at: string | null
          name: string | null
          status: number | null
          user_id: string | null
          values: Json | null
          version: number | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          modified_at?: string | null
          name?: string | null
          status?: number | null
          user_id?: string | null
          values?: Json | null
          version?: number | null
        }
        Update: {
          created_at?: string | null
          id?: number
          modified_at?: string | null
          name?: string | null
          status?: number | null
          user_id?: string | null
          values?: Json | null
          version?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "config_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
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
          status: string | null
          user_id: string | null
        }
        Insert: {
          coverletter?: string | null
          created_at?: string | null
          id?: number
          modified_at?: string | null
          name?: string | null
          status?: string | null
          user_id?: string | null
        }
        Update: {
          coverletter?: string | null
          created_at?: string | null
          id?: number
          modified_at?: string | null
          name?: string | null
          status?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "coverletter_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      jobdetails: {
        Row: {
          applied: boolean | null
          created_at: string | null
          generatedCoverLetter: string | null
          id: number
          job_header: number | null
          job_id: number | null
          modified_at: string | null
          status: string | null
        }
        Insert: {
          applied?: boolean | null
          created_at?: string | null
          generatedCoverLetter?: string | null
          id?: number
          job_header?: number | null
          job_id?: number | null
          modified_at?: string | null
          status?: string | null
        }
        Update: {
          applied?: boolean | null
          created_at?: string | null
          generatedCoverLetter?: string | null
          id?: number
          job_header?: number | null
          job_id?: number | null
          modified_at?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "jobdetails_job_header_fkey"
            columns: ["job_header"]
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
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
          user_id: string | null
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
          user_id?: string | null
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
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "jobs_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
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
          file: string | null
          id: number
          isdeleted: boolean | null
          name: string | null
          path: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          file?: string | null
          id?: number
          isdeleted?: boolean | null
          name?: string | null
          path?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          file?: string | null
          id?: number
          isdeleted?: boolean | null
          name?: string | null
          path?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "resume_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      users: {
        Row: {
          active: boolean | null
          code: string | null
          created_at: string | null
          email: string | null
          fullname: string | null
          id: number
          last_login: string | null
          status: string | null
          subscription: string | null
          user_id: string | null
        }
        Insert: {
          active?: boolean | null
          code?: string | null
          created_at?: string | null
          email?: string | null
          fullname?: string | null
          id?: number
          last_login?: string | null
          status?: string | null
          subscription?: string | null
          user_id?: string | null
        }
        Update: {
          active?: boolean | null
          code?: string | null
          created_at?: string | null
          email?: string | null
          fullname?: string | null
          id?: number
          last_login?: string | null
          status?: string | null
          subscription?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "users_user_id_fkey"
            columns: ["user_id"]
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
