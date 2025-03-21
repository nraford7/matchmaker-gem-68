
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { dispatchFeedbackEvent, getValidatedUserId, getExistingMatch, removeFromSavedDeals } from "./feedbackUtils";

// Remove feedback for a match
export const removeFeedback = async (opportunityId: string): Promise<boolean> => {
  try {
    const userId = await getValidatedUserId();
    if (!userId) {
      return false;
    }

    // Check if there's an existing match record
    const existingMatch = await getExistingMatch(userId, opportunityId);

    if (!existingMatch) {
      return true; // Nothing to remove
    }

    // Update the match to remove feedback
    const { error: updateError } = await supabase
      .from("matches")
      .update({ feedback: null })
      .eq("id", existingMatch.id);

    if (updateError) throw updateError;

    // If it was a negative feedback, remove from past deals
    if (existingMatch.feedback === "negative") {
      const { error: deleteError } = await supabase
        .from("past_deals")
        .delete()
        .eq("user_id", userId)
        .eq("opportunity_id", opportunityId);

      if (deleteError) throw deleteError;
    }

    // If it was a positive feedback, remove from saved opportunities
    if (existingMatch.feedback === "positive") {
      await removeFromSavedDeals(userId, opportunityId);
    }

    // Dispatch custom event for UI updates
    dispatchFeedbackEvent(opportunityId, 'removed');
    
    toast.success("Feedback removed");
    return true;
  } catch (error) {
    console.error("Error removing feedback:", error);
    toast.error("Failed to remove feedback");
    return false;
  }
};
