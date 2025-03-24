
import { supabase } from "@/integrations/supabase/client";

// Get feedback status for an opportunity
export const getFeedbackStatus = async (opportunityId: string): Promise<'positive' | 'negative' | null> => {
  try {
    // For sample data, just return null
    if (opportunityId.startsWith('sample-')) {
      return null;
    }
    
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data, error } = await supabase
      .from("matches")
      .select("feedback")
      .eq("user_id", user.id)
      .eq("opportunity_id", opportunityId)
      .maybeSingle();

    if (error) {
      console.error("Error getting feedback status:", error);
      return null;
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
