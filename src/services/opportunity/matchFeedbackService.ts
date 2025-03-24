
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface MatchDetails {
  opportunity_id: string;
  user_id: string;
  feedback_type: 'positive' | 'negative' | null;
  feedback_date: string | null;
  notes: string | null;
}

// Get feedback status for an opportunity
export const getFeedbackStatus = async (opportunityId: string): Promise<'positive' | 'negative' | null> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return null;
    }
    
    const { data, error } = await supabase
      .from("matches")
      .select("feedback_type")
      .eq("opportunity_id", opportunityId)
      .eq("user_id", user.id)
      .single();
    
    if (error) {
      if (error.code === "PGRST116") { // No rows found
        return null;
      }
      throw error;
    }
    
    return data.feedback_type as 'positive' | 'negative' | null;
  } catch (error) {
    console.error("Error getting feedback status:", error);
    return null;
  }
};
