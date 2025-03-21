
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { getCurrentUserId, validateUserAuth } from "./baseService";

// Add a deal to active deals
export const activateDeal = async (opportunityId: string, stage: string): Promise<boolean> => {
  try {
    const userId = await getCurrentUserId();
    if (!validateUserAuth(userId)) {
      return false;
    }

    const { error } = await supabase
      .from("active_deals")
      .insert({ 
        opportunity_id: opportunityId,
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
      .from("saved_opportunities")
      .delete()
      .eq("opportunity_id", opportunityId)
      .eq("user_id", userId);

    toast.success("Deal activated successfully");
    return true;
  } catch (error) {
    console.error("Error activating deal:", error);
    toast.error("Failed to activate deal");
    return false;
  }
};

// Move a deal to past deals
export const completeDeal = async (opportunityId: string, finalAmount: number): Promise<boolean> => {
  try {
    const userId = await getCurrentUserId();
    if (!validateUserAuth(userId)) {
      return false;
    }

    const { error } = await supabase
      .from("past_deals")
      .insert({ 
        opportunity_id: opportunityId,
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
      .eq("opportunity_id", opportunityId)
      .eq("user_id", userId);

    toast.success("Deal completed successfully");
    return true;
  } catch (error) {
    console.error("Error completing deal:", error);
    toast.error("Failed to complete deal");
    return false;
  }
};
