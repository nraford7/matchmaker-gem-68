
import { supabase } from "@/integrations/supabase/client";
import { Deal } from "@/types";
import { toast } from "sonner";

// Fetch all deals
export const fetchAllDeals = async (): Promise<Deal[]> => {
  try {
    const { data, error } = await supabase
      .from("deals")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      throw error;
    }

    // Process the data to ensure JSON fields are properly parsed and map DB fields to Deal type
    return data.map(deal => {
      // Convert string JSON to objects if needed
      const strategyProfile = typeof deal.strategy_profile === 'string' 
        ? JSON.parse(deal.strategy_profile) 
        : deal.strategy_profile || {};
      
      const psychologicalFit = typeof deal.psychological_fit === 'string'
        ? JSON.parse(deal.psychological_fit)
        : deal.psychological_fit || {};
        
      return {
        id: deal.id,
        name: deal.name,
        description: deal.description,
        dealType: deal.deal_type,
        checkSizeRequired: deal.check_size_required,
        sectorTags: deal.sector_tags,
        geographies: deal.geographies,
        stage: deal.stage,
        timeHorizon: deal.time_horizon,
        esgTags: deal.esg_tags,
        involvementModel: deal.involvement_model,
        exitStyle: deal.exit_style,
        dueDiligenceLevel: deal.due_diligence_level,
        decisionConvictionRequired: deal.decision_conviction_required,
        investorSpeedRequired: deal.investor_speed_required,
        strategyProfile: strategyProfile,
        psychologicalFit: psychologicalFit,
        createdAt: deal.created_at,
        updatedAt: deal.updated_at
      } as Deal;
    });
  } catch (error) {
    console.error("Error fetching deals:", error);
    toast.error("Failed to load deals");
    return [];
  }
};

// Fetch a specific deal by ID
export const fetchDealById = async (id: string): Promise<Deal | null> => {
  try {
    const { data, error } = await supabase
      .from("deals")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      throw error;
    }

    if (!data) {
      return null;
    }

    // Convert string JSON to objects if needed
    const strategyProfile = typeof data.strategy_profile === 'string' 
      ? JSON.parse(data.strategy_profile) 
      : data.strategy_profile || {};
    
    const psychologicalFit = typeof data.psychological_fit === 'string'
      ? JSON.parse(data.psychological_fit)
      : data.psychological_fit || {};
      
    return {
      id: data.id,
      name: data.name,
      description: data.description,
      dealType: data.deal_type,
      checkSizeRequired: data.check_size_required,
      sectorTags: data.sector_tags,
      geographies: data.geographies,
      stage: data.stage,
      timeHorizon: data.time_horizon,
      esgTags: data.esg_tags,
      involvementModel: data.involvement_model,
      exitStyle: data.exit_style,
      dueDiligenceLevel: data.due_diligence_level,
      decisionConvictionRequired: data.decision_conviction_required,
      investorSpeedRequired: data.investor_speed_required,
      strategyProfile: strategyProfile,
      psychologicalFit: psychologicalFit,
      createdAt: data.created_at,
      updatedAt: data.updated_at
    } as Deal;
  } catch (error) {
    console.error("Error fetching deal:", error);
    toast.error("Failed to load deal details");
    return null;
  }
};

// Fetch deals created by the current user
export const fetchUserDeals = async (): Promise<Deal[]> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast.error("You must be logged in to view your deals");
      return [];
    }

    const { data, error } = await supabase
      .from("deals")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      throw error;
    }

    // Process the data to ensure JSON fields are properly parsed
    return data.map(deal => {
      // Convert string JSON to objects if needed
      const strategyProfile = typeof deal.strategy_profile === 'string' 
        ? JSON.parse(deal.strategy_profile) 
        : deal.strategy_profile || {};
      
      const psychologicalFit = typeof deal.psychological_fit === 'string'
        ? JSON.parse(deal.psychological_fit)
        : deal.psychological_fit || {};
        
      return {
        id: deal.id,
        name: deal.name,
        description: deal.description,
        dealType: deal.deal_type,
        checkSizeRequired: deal.check_size_required,
        sectorTags: deal.sector_tags,
        geographies: deal.geographies,
        stage: deal.stage,
        timeHorizon: deal.time_horizon,
        esgTags: deal.esg_tags,
        involvementModel: deal.involvement_model,
        exitStyle: deal.exit_style,
        dueDiligenceLevel: deal.due_diligence_level,
        decisionConvictionRequired: deal.decision_conviction_required,
        investorSpeedRequired: deal.investor_speed_required,
        strategyProfile: strategyProfile,
        psychologicalFit: psychologicalFit,
        createdAt: deal.created_at,
        updatedAt: deal.updated_at
      } as Deal;
    });
  } catch (error) {
    console.error("Error fetching user deals:", error);
    toast.error("Failed to load your deals");
    return [];
  }
};

// Define fetchDeals as alias for fetchAllDeals (so we can export it as fetchSavedDeals)
export const fetchDeals = fetchAllDeals;
