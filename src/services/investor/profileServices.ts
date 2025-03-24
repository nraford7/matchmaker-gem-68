
import { supabase } from "@/integrations/supabase/client";
import { Investor } from "@/types";
import { toast } from "sonner";
import { getCurrentUserId } from "./baseService";

// Create or update investor profile
export const updateInvestorProfile = async (investor: Omit<Investor, "id">): Promise<boolean> => {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      toast.error("Please login to update your profile");
      return false;
    }

    const { error } = await supabase
      .from("investor_profiles")
      .upsert({
        id: userId,
        name: investor.name,
        email: investor.email,
        role: investor.role,
        source_of_wealth: investor.sourceOfWealth,
        context_sectors: investor.contextSectors,
        preferred_stages: investor.preferredStages,
        check_size_min: investor.checkSizeMin,
        check_size_max: investor.checkSizeMax,
        preferred_assets: investor.preferredAssets,
        values_filter: investor.valuesFilter,
        time_horizon: investor.timeHorizon,
        structure: investor.structure,
        aum: investor.aum,
        geographic_focus: investor.geographicFocus,
        stage_focus: investor.stageFocus,
        preferred_geographies: investor.preferredGeographies,
        investment_thesis: investor.investmentThesis,
        psychological_profile_raw: investor.psychologicalProfileRaw,
        psychological_profile_weighted: investor.psychologicalProfileWeighted,
        strategy_profile: investor.strategyProfile,
        weighting_preferences: investor.weightingPreferences
      });

    if (error) {
      throw error;
    }

    toast.success("Profile updated successfully");
    return true;
  } catch (error) {
    console.error("Error updating investor profile:", error);
    toast.error("Failed to update profile");
    return false;
  }
};
