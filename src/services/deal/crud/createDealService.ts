
import { supabase } from "@/integrations/supabase/client";
import { Deal } from "@/types";
import { parseJsonField } from "../utils/jsonUtils";

export const createDeal = async (deal: Omit<Deal, "id" | "createdAt">): Promise<Deal | null> => {
  try {
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
    console.error("Error in createDeal:", error.message);
    return null;
  }
};
