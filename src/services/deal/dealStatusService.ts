
import { supabase } from "@/integrations/supabase/client";
import { getCurrentUserId } from "./baseService";

/**
 * Check if a deal is already saved by the current user
 */
export const checkDealIsSaved = async (dealId: string): Promise<boolean> => {
  try {
    const userId = await getCurrentUserId();
    if (!userId) return false;

    const { data, error } = await supabase
      .from("saved_deals")
      .select("id")
      .eq("deal_id", dealId)
      .eq("user_id", userId)
      .single();

    if (error && error.code !== "PGRST116") { // PGRST116 is "no rows returned"
      console.error("Error checking saved status:", error);
      return false;
    }

    return !!data;
  } catch (error) {
    console.error("Error checking if deal is saved:", error);
    return false;
  }
};

/**
 * Check if a deal is already in the active deals of the current user
 */
export const checkDealIsActive = async (dealId: string): Promise<boolean> => {
  try {
    const userId = await getCurrentUserId();
    if (!userId) return false;

    const { data, error } = await supabase
      .from("active_deals")
      .select("id")
      .eq("deal_id", dealId)
      .eq("user_id", userId)
      .single();

    if (error && error.code !== "PGRST116") { // PGRST116 is "no rows returned"
      console.error("Error checking active status:", error);
      return false;
    }

    return !!data;
  } catch (error) {
    console.error("Error checking if deal is active:", error);
    return false;
  }
};
