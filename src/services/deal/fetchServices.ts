
import { supabase } from "@/integrations/supabase/client";
import { Deal } from "@/types";
import { toast } from "sonner";
import { getCurrentUserId } from "./baseService";

// Fetch all deals
export const fetchDeals = async (): Promise<Deal[]> => {
  try {
    const { data, error } = await supabase
      .from("deals")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      throw error;
    }

    return data.map((item) => ({
      id: item.id,
      name: item.name,
      description: item.description,
      dealType: item.deal_type,
      checkSizeRequired: item.check_size_required,
      sectorTags: item.sector_tags,
      geographies: item.geographies,
      stage: item.stage,
      timeHorizon: item.time_horizon,
      esgTags: item.esg_tags,
      involvementModel: item.involvement_model,
      exitStyle: item.exit_style,
      dueDiligenceLevel: item.due_diligence_level,
      decisionConvictionRequired: item.decision_conviction_required,
      investorSpeedRequired: item.investor_speed_required,
      strategyProfile: item.strategy_profile,
      psychologicalFit: item.psychological_fit,
      createdAt: item.created_at
    }));
  } catch (error) {
    console.error("Error fetching deals:", error);
    toast.error("Failed to load deals");
    return [];
  }
};

// Fetch active deals for the current user
export const fetchActiveDeals = async (): Promise<Deal[]> => {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      throw new Error("User not authenticated");
    }

    const { data, error } = await supabase
      .from("active_deals")
      .select(`
        id,
        deal_id,
        stage,
        deals (
          id, 
          name, 
          description, 
          deal_type, 
          check_size_required,
          sector_tags,
          geographies,
          stage,
          time_horizon,
          esg_tags,
          created_at
        )
      `)
      .eq("user_id", userId);

    if (error) {
      throw error;
    }

    return data.map((item) => ({
      id: item.deals.id,
      name: item.deals.name,
      description: item.deals.description,
      dealType: item.deals.deal_type,
      checkSizeRequired: item.deals.check_size_required,
      sectorTags: item.deals.sector_tags,
      geographies: item.deals.geographies,
      stage: item.stage || item.deals.stage,
      timeHorizon: item.deals.time_horizon,
      esgTags: item.deals.esg_tags,
      createdAt: item.deals.created_at
    }));
  } catch (error) {
    console.error("Error fetching active deals:", error);
    toast.error("Failed to load active deals");
    return [];
  }
};

// Fetch saved deals for the current user
export const fetchSavedDeals = async (): Promise<Deal[]> => {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      throw new Error("User not authenticated");
    }

    const { data, error } = await supabase
      .from("saved_deals")
      .select(`
        id,
        deal_id,
        deals (
          id, 
          name, 
          description, 
          deal_type, 
          check_size_required,
          sector_tags,
          geographies,
          stage,
          time_horizon,
          esg_tags,
          created_at
        )
      `)
      .eq("user_id", userId);

    if (error) {
      throw error;
    }

    return data.map((item) => ({
      id: item.deals.id,
      name: item.deals.name,
      description: item.deals.description,
      dealType: item.deals.deal_type,
      checkSizeRequired: item.deals.check_size_required,
      sectorTags: item.deals.sector_tags,
      geographies: item.deals.geographies,
      stage: item.deals.stage,
      timeHorizon: item.deals.time_horizon,
      esgTags: item.deals.esg_tags,
      createdAt: item.deals.created_at,
      // Simple match score simulation for now
      matchScore: Math.random() * 0.3 + 0.6,
      matchExplanation: "Based on your sector and investment preferences"
    }));
  } catch (error) {
    console.error("Error fetching saved deals:", error);
    toast.error("Failed to load saved deals");
    return [];
  }
};

// Fetch past deals for the current user
export const fetchPastDeals = async (): Promise<Deal[]> => {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      throw new Error("User not authenticated");
    }

    const { data, error } = await supabase
      .from("past_deals")
      .select(`
        id,
        final_amount,
        deal_id,
        completion_date,
        deals (
          id, 
          name, 
          description,
          sector_tags,
          geographies,
          created_at
        )
      `)
      .eq("user_id", userId);

    if (error) {
      throw error;
    }

    return data.map((item) => ({
      id: item.deals.id,
      name: item.deals.name,
      description: item.deals.description,
      sectorTags: item.deals.sector_tags,
      geographies: item.deals.geographies,
      stage: "Closed",
      checkSizeRequired: Number(item.final_amount),
      createdAt: item.deals.created_at
    }));
  } catch (error) {
    console.error("Error fetching past deals:", error);
    toast.error("Failed to load past deals");
    return [];
  }
};
