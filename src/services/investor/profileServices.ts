
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
        company: investor.company,
        avatar_url: investor.avatar_url,
        preferred_stages: investor.preferred_stages,
        preferred_geographies: investor.preferred_geographies,
        check_size_min: investor.check_size_min,
        check_size_max: investor.check_size_max,
        investment_thesis: investor.investment_thesis,
        deal_count: investor.deal_count,
        // Add additional fields from extended type if present
        sector_tags: (investor as any).sector_tags,
        updated_at: new Date().toISOString()
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
