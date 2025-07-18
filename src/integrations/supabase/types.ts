export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      active_deals: {
        Row: {
          created_at: string | null
          deal_id: string | null
          id: string
          notes: string | null
          stage: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          deal_id?: string | null
          id?: string
          notes?: string | null
          stage: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          deal_id?: string | null
          id?: string
          notes?: string | null
          stage?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "active_deals_deal_id_fkey"
            columns: ["deal_id"]
            isOneToOne: false
            referencedRelation: "deals"
            referencedColumns: ["id"]
          },
        ]
      }
      dashboard_metrics: {
        Row: {
          active_deals_count: number
          created_at: string
          id: string
          match_quality_percentage: number
          new_matches: number
          opportunities_viewed: number
          updated_at: string
          user_id: string
        }
        Insert: {
          active_deals_count?: number
          created_at?: string
          id?: string
          match_quality_percentage?: number
          new_matches?: number
          opportunities_viewed?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          active_deals_count?: number
          created_at?: string
          id?: string
          match_quality_percentage?: number
          new_matches?: number
          opportunities_viewed?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      deals: {
        Row: {
          check_size_required: number | null
          created_at: string | null
          deal_type: string | null
          decision_conviction_required: number | null
          description: string | null
          due_diligence_level: string | null
          esg_tags: string[] | null
          exit_style: string | null
          geographies: string[] | null
          id: string
          introduced_by_id: string | null
          investor_speed_required: number | null
          involvement_model: string | null
          IRR: number | null
          location: string | null
          name: string
          psychological_fit: Json | null
          recommendation: string | null
          sector_tags: string[] | null
          stage: string | null
          strategy_profile: Json | null
          time_horizon: string | null
          updated_at: string | null
        }
        Insert: {
          check_size_required?: number | null
          created_at?: string | null
          deal_type?: string | null
          decision_conviction_required?: number | null
          description?: string | null
          due_diligence_level?: string | null
          esg_tags?: string[] | null
          exit_style?: string | null
          geographies?: string[] | null
          id?: string
          introduced_by_id?: string | null
          investor_speed_required?: number | null
          involvement_model?: string | null
          IRR?: number | null
          location?: string | null
          name: string
          psychological_fit?: Json | null
          recommendation?: string | null
          sector_tags?: string[] | null
          stage?: string | null
          strategy_profile?: Json | null
          time_horizon?: string | null
          updated_at?: string | null
        }
        Update: {
          check_size_required?: number | null
          created_at?: string | null
          deal_type?: string | null
          decision_conviction_required?: number | null
          description?: string | null
          due_diligence_level?: string | null
          esg_tags?: string[] | null
          exit_style?: string | null
          geographies?: string[] | null
          id?: string
          introduced_by_id?: string | null
          investor_speed_required?: number | null
          involvement_model?: string | null
          IRR?: number | null
          location?: string | null
          name?: string
          psychological_fit?: Json | null
          recommendation?: string | null
          sector_tags?: string[] | null
          stage?: string | null
          strategy_profile?: Json | null
          time_horizon?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "deals_introduced_by_id_fkey"
            columns: ["introduced_by_id"]
            isOneToOne: false
            referencedRelation: "investor_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      investor_connections: {
        Row: {
          comments: string | null
          created_at: string
          follower_id: string
          following_id: string
          id: string
        }
        Insert: {
          comments?: string | null
          created_at?: string
          follower_id: string
          following_id: string
          id?: string
        }
        Update: {
          comments?: string | null
          created_at?: string
          follower_id?: string
          following_id?: string
          id?: string
        }
        Relationships: []
      }
      investor_profiles: {
        Row: {
          aum: string | null
          avatar_url: string | null
          check_size_max: number | null
          check_size_min: number | null
          company: string | null
          context_sectors: string[]
          created_at: string
          deal_count: number
          email: string | null
          geographic_focus: string | null
          id: string
          investment_thesis: string | null
          name: string
          preferred_assets: string[] | null
          preferred_geographies: string[] | null
          preferred_stages: string[] | null
          psychological_profile_raw: Json | null
          psychological_profile_weighted: Json | null
          role: string | null
          source_of_wealth: string[] | null
          stage_focus: string | null
          strategy_profile: Json | null
          structure: string | null
          time_horizon: string | null
          updated_at: string
          user_id: string | null
          values_filter: string[] | null
          weighting_preferences: Json | null
        }
        Insert: {
          aum?: string | null
          avatar_url?: string | null
          check_size_max?: number | null
          check_size_min?: number | null
          company?: string | null
          context_sectors?: string[]
          created_at?: string
          deal_count?: number
          email?: string | null
          geographic_focus?: string | null
          id: string
          investment_thesis?: string | null
          name: string
          preferred_assets?: string[] | null
          preferred_geographies?: string[] | null
          preferred_stages?: string[] | null
          psychological_profile_raw?: Json | null
          psychological_profile_weighted?: Json | null
          role?: string | null
          source_of_wealth?: string[] | null
          stage_focus?: string | null
          strategy_profile?: Json | null
          structure?: string | null
          time_horizon?: string | null
          updated_at?: string
          user_id?: string | null
          values_filter?: string[] | null
          weighting_preferences?: Json | null
        }
        Update: {
          aum?: string | null
          avatar_url?: string | null
          check_size_max?: number | null
          check_size_min?: number | null
          company?: string | null
          context_sectors?: string[]
          created_at?: string
          deal_count?: number
          email?: string | null
          geographic_focus?: string | null
          id?: string
          investment_thesis?: string | null
          name?: string
          preferred_assets?: string[] | null
          preferred_geographies?: string[] | null
          preferred_stages?: string[] | null
          psychological_profile_raw?: Json | null
          psychological_profile_weighted?: Json | null
          role?: string | null
          source_of_wealth?: string[] | null
          stage_focus?: string | null
          strategy_profile?: Json | null
          structure?: string | null
          time_horizon?: string | null
          updated_at?: string
          user_id?: string | null
          values_filter?: string[] | null
          weighting_preferences?: Json | null
        }
        Relationships: []
      }
      investor_recommendations: {
        Row: {
          commentary: string | null
          created_at: string | null
          deal_id: string | null
          id: string
          recipient_id: string
          recommender_id: string
        }
        Insert: {
          commentary?: string | null
          created_at?: string | null
          deal_id?: string | null
          id?: string
          recipient_id: string
          recommender_id: string
        }
        Update: {
          commentary?: string | null
          created_at?: string | null
          deal_id?: string | null
          id?: string
          recipient_id?: string
          recommender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "investor_recommendations_deal_id_fkey"
            columns: ["deal_id"]
            isOneToOne: false
            referencedRelation: "deals"
            referencedColumns: ["id"]
          },
        ]
      }
      matches: {
        Row: {
          created_at: string | null
          deal_id: string | null
          feedback: string | null
          id: string
          score: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          deal_id?: string | null
          feedback?: string | null
          id?: string
          score?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          deal_id?: string | null
          feedback?: string | null
          id?: string
          score?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "matches_deal_id_fkey"
            columns: ["deal_id"]
            isOneToOne: false
            referencedRelation: "deals"
            referencedColumns: ["id"]
          },
        ]
      }
      network_shared_deals: {
        Row: {
          comment: string | null
          created_at: string | null
          deal_id: string | null
          id: string
          shared_by_user_id: string
          shared_with_user_id: string
        }
        Insert: {
          comment?: string | null
          created_at?: string | null
          deal_id?: string | null
          id?: string
          shared_by_user_id: string
          shared_with_user_id: string
        }
        Update: {
          comment?: string | null
          created_at?: string | null
          deal_id?: string | null
          id?: string
          shared_by_user_id?: string
          shared_with_user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "network_shared_deals_deal_id_fkey"
            columns: ["deal_id"]
            isOneToOne: false
            referencedRelation: "deals"
            referencedColumns: ["id"]
          },
        ]
      }
      past_deals: {
        Row: {
          completion_date: string | null
          created_at: string | null
          deal_id: string | null
          final_amount: number
          id: string
          notes: string | null
          user_id: string
        }
        Insert: {
          completion_date?: string | null
          created_at?: string | null
          deal_id?: string | null
          final_amount: number
          id?: string
          notes?: string | null
          user_id: string
        }
        Update: {
          completion_date?: string | null
          created_at?: string | null
          deal_id?: string | null
          final_amount?: number
          id?: string
          notes?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "past_deals_deal_id_fkey"
            columns: ["deal_id"]
            isOneToOne: false
            referencedRelation: "deals"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          company: string | null
          created_at: string
          full_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          company?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          company?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      saved_deals: {
        Row: {
          created_at: string | null
          deal_id: string | null
          id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          deal_id?: string | null
          id?: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          deal_id?: string | null
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "saved_deals_deal_id_fkey"
            columns: ["deal_id"]
            isOneToOne: false
            referencedRelation: "deals"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      insert_fake_investor_profiles: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      insert_realistic_investors: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      match_score: {
        Args: {
          investor_id: string
          opportunity_id: string
        }
        Returns: number
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
