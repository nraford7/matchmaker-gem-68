
import { supabase } from "@/integrations/supabase/client";
import { NetworkInvestor, Investor } from "@/types";
import { toast } from "sonner";

// Format raw investor data into NetworkInvestor type
export const formatInvestorProfile = (data: any): NetworkInvestor => {
  return {
    id: data.id,
    name: data.name,
    company: data.company || "",
    contextSectors: data.context_sectors || [],
    dealCount: data.deal_count || 0,
    avatar: data.avatar_url,
    email: data.email,
    role: data.role,
    sourceOfWealth: data.source_of_wealth,
    preferredStages: data.preferred_stages || [],
    checkSizeMin: data.check_size_min,
    checkSizeMax: data.check_size_max,
    preferredAssets: data.preferred_assets,
    valuesFilter: data.values_filter,
    timeHorizon: data.time_horizon,
    structure: data.structure,
    aum: data.aum,
    geographicFocus: data.geographic_focus,
    stageFocus: data.stage_focus,
    preferredGeographies: data.preferred_geographies || [],
    investmentThesis: data.investment_thesis,
    psychologicalProfileRaw: data.psychological_profile_raw,
    psychologicalProfileWeighted: data.psychological_profile_weighted,
    strategyProfile: data.strategy_profile,
    weightingPreferences: data.weighting_preferences
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
