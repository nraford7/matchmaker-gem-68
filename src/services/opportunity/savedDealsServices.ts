
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { getCurrentUserId, validateUserAuth } from "./baseService";

// Add a deal to saved deals
export const saveDeal = async (opportunityId: string): Promise<boolean> => {
  try {
    const userId = await getCurrentUserId();
    if (!validateUserAuth(userId)) {
      return false;
    }

    const { error } = await supabase
      .from("saved_opportunities")
      .insert({ 
        opportunity_id: opportunityId,
        user_id: userId
      });

    if (error) {
      if (error.code === "23505") { // Unique violation
        toast.info("Deal already saved");
        return true;
      }
      throw error;
    }

    toast.success("Deal saved successfully");
    return true;
  } catch (error) {
    console.error("Error saving deal:", error);
    toast.error("Failed to save deal");
    return false;
  }
};
