
import { supabase } from "@/integrations/supabase/client";
import { Deal } from "@/types";
import { parseJsonField } from "../utils/jsonUtils";

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
    console.error("Error in getDealById:", error.message);
    return null;
  }
};
