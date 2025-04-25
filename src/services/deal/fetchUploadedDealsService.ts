
import { supabase } from "@/integrations/supabase/client";
import { Deal } from "@/types/deal";
import { parseJsonField } from "./utils/jsonUtils";

export const fetchUploadedDeals = async (): Promise<Deal[]> => {
  try {
    // Fetch deals uploaded by the current user
    const { data: userData, error: userError } = await supabase.auth.getUser();
    
    if (userError || !userData?.user) {
      throw new Error("User not authenticated");
    }
    
    const { data, error } = await supabase
      .from("deals")
      .select("*")
      .eq("uploaderId", userData.user.id);
      
    if (error) {
      throw new Error(error.message);
    }
    
    // Map database columns to our Deal type properties
    return (data || []).map(item => ({
      id: item.id,
      name: item.name,
      description: item.description || "",
      dealType: item.deal_type,
      checkSizeRequired: item.check_size_required,
      check_size_required: item.check_size_required,
      sectorTags: item.sector_tags || [],
      sector_tags: item.sector_tags || [],
      geographies: item.geographies || [],
      location: item.location,
      stage: item.stage,
      timeHorizon: item.time_horizon,
      esgTags: item.esg_tags,
      involvementModel: item.involvement_model,
      exitStyle: item.exit_style,
      dueDiligenceLevel: item.due_diligence_level,
      decisionConvictionRequired: item.decision_conviction_required,
      investorSpeedRequired: item.investor_speed_required,
      strategyProfile: parseJsonField(item.strategy_profile),
      psychologicalFit: parseJsonField(item.psychological_fit),
      createdAt: item.created_at,
      updatedAt: item.updated_at,
      IRR: item.IRR,
      recommendation: item.recommendation,
      introducedById: item.introduced_by_id
    }));
  } catch (error) {
    console.error("Error fetching uploaded deals:", error);
    return [];
  }
};
