
import { supabase } from "@/integrations/supabase/client";
import { NetworkInvestor, Investor } from "@/types";
import { toast } from "sonner";

// Format raw investor data into NetworkInvestor type
export const formatInvestorProfile = (data: any): NetworkInvestor => {
  return {
    id: data.id,
    name: data.name,
    company: data.company || "",
    sector_tags: data.context_sectors || [],
    contextSectors: data.context_sectors || [],
    deal_count: data.deal_count || 0,
    dealCount: data.deal_count || 0,
    avatar_url: data.avatar_url,
    avatar: data.avatar_url, // Alias
    email: data.email,
    role: data.role,
    source_of_wealth: data.source_of_wealth,
    preferred_stages: data.preferred_stages || [],
    preferredStages: data.preferred_stages || [],
    check_size_min: data.check_size_min,
    checkSizeMin: data.check_size_min,
    check_size_max: data.check_size_max,
    checkSizeMax: data.check_size_max,
    preferred_assets: data.preferred_assets,
    preferredAssets: data.preferred_assets,
    values_filter: data.values_filter,
    time_horizon: data.time_horizon,
    timeHorizon: data.time_horizon,
    structure: data.structure,
    aum: data.aum,
    geographic_focus: data.geographic_focus,
    stage_focus: data.stage_focus,
    preferred_geographies: data.preferred_geographies || [],
    preferredGeographies: data.preferred_geographies || [],
    investment_thesis: data.investment_thesis,
    investmentThesis: data.investment_thesis,
    psychological_profile_raw: data.psychological_profile_raw || {},
    psychologicalProfileRaw: data.psychological_profile_raw || {},
    psychological_profile_weighted: data.psychological_profile_weighted || {},
    psychologicalProfileWeighted: data.psychological_profile_weighted || {},
    strategy_profile: data.strategy_profile || {},
    strategyProfile: data.strategy_profile || {},
    weighting_preferences: data.weighting_preferences || {},
    weightingPreferences: data.weighting_preferences || {}
  };
};

// Helper to get current user session
export const getCurrentUserId = async (): Promise<string | null> => {
  try {
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    if (sessionError) throw sessionError;
    
    const userId = sessionData.session?.user.id;
    return userId || null;
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
};
