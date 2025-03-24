
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { getCurrentUserId, validateUserAuth } from "./baseService";

// Add a deal to active deals
export const activateDeal = async (dealId: string, stage: string): Promise<boolean> => {
  try {
    const userId = await getCurrentUserId();
    if (!validateUserAuth(userId)) {
      return false;
    }

    const { error } = await supabase
      .from("active_deals")
      .insert({ 
        deal_id: dealId,
        stage: stage,
        user_id: userId
      });

    if (error) {
      if (error.code === "23505") { // Unique violation
        toast.info("Deal already active");
        return true;
      }
      throw error;
    }

    // Remove from saved deals if it was saved
    await supabase
      .from("saved_deals")
      .delete()
      .eq("deal_id", dealId)
      .eq("user_id", userId);

    toast.success("Deal activated successfully");
    return true;
  } catch (error) {
    console.error("Error activating deal:", error);
    toast.error("Failed to activate deal");
    return false;
  }
};

// Remove a deal from active deals
export const deactivateDeal = async (dealId: string): Promise<boolean> => {
  try {
    const userId = await getCurrentUserId();
    if (!validateUserAuth(userId)) {
      return false;
    }

    const { error } = await supabase
      .from("active_deals")
      .delete()
      .eq("deal_id", dealId)
      .eq("user_id", userId);

    if (error) {
      throw error;
    }

    return true;
  } catch (error) {
    console.error("Error deactivating deal:", error);
    toast.error("Failed to remove from active deals");
    return false;
  }
};

// Move a deal to past deals
export const completeDeal = async (dealId: string, finalAmount: number): Promise<boolean> => {
  try {
    const userId = await getCurrentUserId();
    if (!validateUserAuth(userId)) {
      return false;
    }

    const { error } = await supabase
      .from("past_deals")
      .insert({ 
        deal_id: dealId,
        final_amount: finalAmount,
        user_id: userId
      });

    if (error) {
      if (error.code === "23505") { // Unique violation
        toast.info("Deal already completed");
        return true;
      }
      throw error;
    }

    // Remove from active deals
    await supabase
      .from("active_deals")
      .delete()
      .eq("deal_id", dealId)
      .eq("user_id", userId);

    toast.success("Deal completed successfully");
    return true;
  } catch (error) {
    console.error("Error completing deal:", error);
    toast.error("Failed to complete deal");
    return false;
  }
};
