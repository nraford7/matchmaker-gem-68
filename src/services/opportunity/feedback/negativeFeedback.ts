import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { 
  dispatchFeedbackEvent, 
  getValidatedUserId, 
  getExistingMatch,
  removeFromSavedDeals,
  removeFromActiveDeals
} from "./feedbackUtils";
import { removeFeedback } from "./removeFeedback";

// Submit negative feedback for a match
export const submitNegativeFeedback = async (opportunityId: string): Promise<boolean> => {
  // For sample data, just return success
  if (opportunityId.startsWith('sample-')) {
    toast.success("Feedback recorded");
    return true;
  }
  
  try {
    const userId = await getValidatedUserId();
    if (!userId) {
      return false;
    }

    // Get opportunity details for the past_deals entry
    const { data: opportunity, error: opportunityError } = await supabase
      .from("deals")
      .select("check_size_required")
      .eq("id", opportunityId)
      .single();

    if (opportunityError && !opportunityId.startsWith('sample-')) throw opportunityError;

    // Check if there's an existing match record
    const existingMatch = await getExistingMatch(userId, opportunityId);

    // If feedback is already negative, remove it (toggle behavior)
    if (existingMatch && existingMatch.feedback === "negative") {
      return removeFeedback(opportunityId);
    }

    if (existingMatch) {
      // Update existing match
      const { error: updateError } = await supabase
        .from("matches")
        .update({ feedback: "negative" })
        .eq("id", existingMatch.id);

      if (updateError) throw updateError;
    } else {
      // Insert new match
      const { error: insertError } = await supabase
        .from("matches")
        .insert({
          user_id: userId,
          opportunity_id: opportunityId,
          feedback: "negative",
          score: 0.8 // Default score since we don't have a real score yet
        });

      if (insertError) throw insertError;
    }

    // Remove from saved deals if present
    await removeFromSavedDeals(userId, opportunityId);

    // Remove from active deals if present
    await removeFromActiveDeals(userId, opportunityId);

    // Add to past deals with "Not Interested" note if we have opportunity details
    if (opportunity) {
      const { error: pastDealError } = await supabase
        .from("past_deals")
        .insert({
          deal_id: opportunityId,
          user_id: userId,
          final_amount: opportunity.check_size_required,
          notes: "Not interested"
        });

      if (pastDealError) throw pastDealError;
    }

    // Dispatch custom event for UI updates
    dispatchFeedbackEvent(opportunityId, 'negative');
    
    toast.success("Moved to past deals");
    return true;
  } catch (error) {
    console.error("Error submitting negative feedback:", error);
    toast.error("Failed to submit feedback");
    return false;
  }
};
