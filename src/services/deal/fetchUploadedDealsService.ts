
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
    
    // Fetch deals with explicit type casting to avoid type instantiation issues
    const { data, error } = await supabase
      .from("deals")
      .select("*")
      .eq("uploaderId", userData.user.id);
      
    if (error) {
      throw new Error(error.message);
    }
    
    // Use a mapped type approach to avoid deep instantiation
    return (data || []).map((item: Record<string, any>) => {
      // Parse JSON fields separately
      const strategyProfile = parseJsonField(item.strategy_profile);
      const psychologicalFit = parseJsonField(item.psychological_fit);
      
      // Construct a Deal object with explicit property assignments
      return {
        id: item.id,
        name: item.name,
        description: item.description || "",
        dealType: item.deal_type,
        checkSizeRequired: item.check_size_required,
        sectorTags: item.sector_tags || [],
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
        strategyProfile,
        psychologicalFit,
        createdAt: item.created_at,
        updatedAt: item.updated_at,
        IRR: item.IRR,
        recommendation: item.recommendation,
        introducedById: item.introduced_by_id,
        uploaderId: item.uploaderId
      } as Deal;
    });
  } catch (error) {
    console.error("Error fetching uploaded deals:", error);
    return [];
  }
};
