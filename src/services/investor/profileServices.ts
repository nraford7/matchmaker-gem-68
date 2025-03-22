
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
        sectors: investor.preferredSectors,
        preferred_stages: investor.preferredStages,
        check_size_min: investor.checkSizeMin,
        check_size_max: investor.checkSizeMax,
        preferred_geographies: investor.preferredGeographies,
        investment_thesis: investor.investmentThesis
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
