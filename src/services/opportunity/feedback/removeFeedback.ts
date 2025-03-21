
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { dispatchFeedbackEvent, getValidatedUserId } from "./feedbackUtils";

// Remove feedback for an opportunity
export const removeFeedback = async (opportunityId: string): Promise<boolean> => {
  try {
    const userId = await getValidatedUserId();
    if (!userId) {
      return false;
    }

    // Delete the match record
    const { error } = await supabase
      .from("matches")
      .delete()
      .eq("user_id", userId)
      .eq("opportunity_id", opportunityId);

    if (error) throw error;

    // Dispatch custom event for UI updates
    dispatchFeedbackEvent(opportunityId, null);
    
    toast.success("Feedback removed");
    return true;
  } catch (error) {
    console.error("Error removing feedback:", error);
    toast.error("Failed to remove feedback");
    return false;
  }
};
