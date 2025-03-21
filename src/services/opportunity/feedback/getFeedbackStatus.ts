
import { supabase } from "@/integrations/supabase/client";
import { getCurrentUserId } from "../baseService";

// Get feedback status for an opportunity
export const getFeedbackStatus = async (opportunityId: string): Promise<'positive' | 'negative' | null> => {
  try {
    // For sample data, just return null
    if (opportunityId.startsWith('sample-')) {
      return null;
    }
    
    const userId = await getCurrentUserId();
    if (!userId) return null;

    const { data, error } = await supabase
      .from("matches")
      .select("feedback")
      .eq("user_id", userId)
      .eq("opportunity_id", opportunityId)
      .single();

    if (error && error.code !== "PGRST116") { // PGRST116 means no rows returned
      throw error;
    }

    // Use type guard to ensure feedback is one of the valid values
    if (data?.feedback === "positive" || data?.feedback === "negative") {
      return data.feedback;
    }
    
    return null;
  } catch (error) {
    console.error("Error getting feedback status:", error);
    return null;
  }
};
