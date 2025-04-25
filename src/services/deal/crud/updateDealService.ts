
import { supabase } from "@/integrations/supabase/client";
import { Deal } from "@/types";
import { parseJsonField } from "../utils/jsonUtils";

export const updateDeal = async (id: string, updates: Partial<Deal>): Promise<Deal | null> => {
  try {
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

    // Parse JSON fields
    const strategyProfile = parseJsonField(data.strategy_profile);
    const psychologicalFit = parseJsonField(data.psychological_fit);

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
      strategyProfile,
      psychologicalFit,
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
