
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

    return data.map((item) => ({
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
      strategyProfile: typeof item.strategy_profile === 'object' ? item.strategy_profile : {},
      psychologicalFit: typeof item.psychological_fit === 'object' ? item.psychological_fit : {},
      createdAt: item.created_at,
      IRR: item.IRR
    }));
  } catch (error) {
    console.error("Error fetching deals:", error);
    toast.error("Failed to load deals");
    return [];
  }
};
