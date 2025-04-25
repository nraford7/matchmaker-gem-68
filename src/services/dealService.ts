
import { supabase } from "@/integrations/supabase/client";
import { Deal } from "@/types/deal";
import { uploadFile, deleteFile } from "./file";
import { toast } from "sonner";

export const getDeals = async (): Promise<Deal[]> => {
  try {
    const { data, error } = await supabase.from("deals").select("*");

    if (error) {
      console.error("Error fetching deals:", error);
      throw new Error("Failed to fetch deals");
    }

    // Convert snake_case to camelCase
    return data.map(item => ({
      id: item.id,
      name: item.name,
      description: item.description,
      dealType: item.deal_type,
      checkSizeRequired: item.check_size_required,
      sectorTags: item.sector_tags,
      geographies: item.geographies,
      location: item.location,
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
      createdAt: item.created_at,
      updatedAt: item.updated_at,
      IRR: item.IRR,
      recommendation: item.recommendation,
      introducedById: item.introduced_by_id
    }));
  } catch (error: any) {
    console.error("Error in getDeals:", error.message);
    throw error;
  }
};

export const getDealById = async (id: string): Promise<Deal | null> => {
  try {
    const { data, error } = await supabase
      .from("deals")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching deal by ID:", error);
      return null;
    }

    if (!data) return null;

    // Convert snake_case to camelCase
    return {
      id: data.id,
      name: data.name,
      description: data.description,
      dealType: data.deal_type,
      checkSizeRequired: data.check_size_required,
      sectorTags: data.sector_tags,
      geographies: data.geographies,
      location: data.location,
      stage: data.stage,
      timeHorizon: data.time_horizon,
      esgTags: data.esg_tags,
      involvementModel: data.involvement_model,
      exitStyle: data.exit_style,
      dueDiligenceLevel: data.due_diligence_level,
      decisionConvictionRequired: data.decision_conviction_required,
      investorSpeedRequired: data.investor_speed_required,
      strategyProfile: data.strategy_profile,
      psychologicalFit: data.psychological_fit,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
      IRR: data.IRR,
      recommendation: data.recommendation,
      introducedById: data.introduced_by_id
    };
  } catch (error: any) {
    console.error("Error in getDealById:", error.message);
    return null;
  }
};

export const createDeal = async (deal: Omit<Deal, "id" | "createdAt">): Promise<Deal | null> => {
  try {
    // Convert camelCase to snake_case for database
    const dbDeal = {
      name: deal.name,
      description: deal.description,
      deal_type: deal.dealType,
      check_size_required: deal.checkSizeRequired,
      sector_tags: deal.sectorTags,
      geographies: deal.geographies,
      location: deal.location,
      stage: deal.stage,
      time_horizon: deal.timeHorizon,
      esg_tags: deal.esgTags,
      involvement_model: deal.involvementModel,
      exit_style: deal.exitStyle,
      due_diligence_level: deal.dueDiligenceLevel,
      decision_conviction_required: deal.decisionConvictionRequired,
      investor_speed_required: deal.investorSpeedRequired,
      strategy_profile: deal.strategyProfile,
      psychological_fit: deal.psychologicalFit,
      IRR: deal.IRR,
      recommendation: deal.recommendation,
      introduced_by_id: deal.introducedById
    };

    const { data, error } = await supabase
      .from("deals")
      .insert(dbDeal)
      .select("*")
      .single();

    if (error) {
      console.error("Error creating deal:", error);
      return null;
    }

    if (!data) return null;

    // Convert snake_case back to camelCase
    return {
      id: data.id,
      name: data.name,
      description: data.description,
      dealType: data.deal_type,
      checkSizeRequired: data.check_size_required,
      sectorTags: data.sector_tags,
      geographies: data.geographies,
      location: data.location,
      stage: data.stage,
      timeHorizon: data.time_horizon,
      esgTags: data.esg_tags,
      involvementModel: data.involvement_model,
      exitStyle: data.exit_style,
      dueDiligenceLevel: data.due_diligence_level,
      decisionConvictionRequired: data.decision_conviction_required,
      investorSpeedRequired: data.investor_speed_required,
      strategyProfile: data.strategy_profile,
      psychologicalFit: data.psychological_profile,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
      IRR: data.IRR,
      recommendation: data.recommendation,
      introducedById: data.introduced_by_id
    };
  } catch (error: any) {
    console.error("Error in createDeal:", error.message);
    return null;
  }
};

export const updateDeal = async (id: string, updates: Partial<Deal>): Promise<Deal | null> => {
  try {
    // Convert camelCase to snake_case for database
    const dbUpdates: Record<string, any> = {};
    
    if (updates.name !== undefined) dbUpdates.name = updates.name;
    if (updates.description !== undefined) dbUpdates.description = updates.description;
    if (updates.dealType !== undefined) dbUpdates.deal_type = updates.dealType;
    if (updates.checkSizeRequired !== undefined) dbUpdates.check_size_required = updates.checkSizeRequired;
    if (updates.sectorTags !== undefined) dbUpdates.sector_tags = updates.sectorTags;
    if (updates.geographies !== undefined) dbUpdates.geographies = updates.geographies;
    if (updates.location !== undefined) dbUpdates.location = updates.location;
    if (updates.stage !== undefined) dbUpdates.stage = updates.stage;
    if (updates.timeHorizon !== undefined) dbUpdates.time_horizon = updates.timeHorizon;
    if (updates.esgTags !== undefined) dbUpdates.esg_tags = updates.esgTags;
    if (updates.involvementModel !== undefined) dbUpdates.involvement_model = updates.involvementModel;
    if (updates.exitStyle !== undefined) dbUpdates.exit_style = updates.exitStyle;
    if (updates.dueDiligenceLevel !== undefined) dbUpdates.due_diligence_level = updates.dueDiligenceLevel;
    if (updates.decisionConvictionRequired !== undefined) dbUpdates.decision_conviction_required = updates.decisionConvictionRequired;
    if (updates.investorSpeedRequired !== undefined) dbUpdates.investor_speed_required = updates.investorSpeedRequired;
    if (updates.strategyProfile !== undefined) dbUpdates.strategy_profile = updates.strategyProfile;
    if (updates.psychologicalFit !== undefined) dbUpdates.psychological_fit = updates.psychologicalFit;
    if (updates.IRR !== undefined) dbUpdates.IRR = updates.IRR;
    if (updates.recommendation !== undefined) dbUpdates.recommendation = updates.recommendation;
    if (updates.introducedById !== undefined) dbUpdates.introduced_by_id = updates.introducedById;

    const { data, error } = await supabase
      .from("deals")
      .update(dbUpdates)
      .eq("id", id)
      .select("*")
      .single();

    if (error) {
      console.error("Error updating deal:", error);
      return null;
    }

    if (!data) return null;

    // Convert snake_case back to camelCase
    return {
      id: data.id,
      name: data.name,
      description: data.description,
      dealType: data.deal_type,
      checkSizeRequired: data.check_size_required,
      sectorTags: data.sector_tags,
      geographies: data.geographies,
      location: data.location,
      stage: data.stage,
      timeHorizon: data.time_horizon,
      esgTags: data.esg_tags,
      involvementModel: data.involvement_model,
      exitStyle: data.exit_style,
      dueDiligenceLevel: data.due_diligence_level,
      decisionConvictionRequired: data.decision_conviction_required,
      investorSpeedRequired: data.investor_speed_required,
      strategyProfile: data.strategy_profile,
      psychologicalFit: data.psychological_fit,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
      IRR: data.IRR,
      recommendation: data.recommendation,
      introducedById: data.introduced_by_id
    };
  } catch (error: any) {
    console.error("Error in updateDeal:", error.message);
    return null;
  }
};

export const deleteDeal = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase.from("deals").delete().eq("id", id);

    if (error) {
      console.error("Error deleting deal:", error);
      return false;
    }

    return true;
  } catch (error: any) {
    console.error("Error in deleteDeal:", error.message);
    return false;
  }
};
