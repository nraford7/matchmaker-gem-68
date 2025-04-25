
import { supabase } from "@/integrations/supabase/client";
import { Deal } from "@/types";
import { parseJsonField } from "../utils/jsonUtils";

export const getDeals = async (): Promise<Deal[]> => {
  try {
    const { data, error } = await supabase.from("deals").select("*");

    if (error) {
      console.error("Error fetching deals:", error);
      throw new Error("Failed to fetch deals");
    }

    return data.map(item => {
      // Parse JSON fields
      const strategyProfile = parseJsonField(item.strategy_profile);
      const psychologicalFit = parseJsonField(item.psychological_fit);
      
      return {
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
        strategyProfile,
        psychologicalFit,
        createdAt: item.created_at,
        updatedAt: item.updated_at,
        IRR: item.IRR,
        recommendation: item.recommendation,
        introducedById: item.introduced_by_id
      };
    });
  } catch (error: any) {
    console.error("Error in getDeals:", error.message);
    return [];
  }
};
