
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { dispatchFeedbackEvent, getValidatedUserId, getExistingMatch } from "./feedbackUtils";
import { removeFeedback } from "./removeFeedback";

// Submit positive feedback for a match
export const submitPositiveFeedback = async (opportunityId: string): Promise<boolean> => {
  try {
    const userId = await getValidatedUserId();
    if (!userId) {
      return false;
    }

    // Check if there's an existing match record
    const existingMatch = await getExistingMatch(userId, opportunityId);

    // If feedback is already positive, remove it (toggle behavior)
    if (existingMatch && existingMatch.feedback === "positive") {
      return removeFeedback(opportunityId);
    }

    if (existingMatch) {
      // Update existing match
      const { error: updateError } = await supabase
        .from("matches")
        .update({ feedback: "positive" })
        .eq("id", existingMatch.id);

      if (updateError) throw updateError;
    } else {
      // Insert new match
      const { error: insertError } = await supabase
        .from("matches")
        .insert({
          user_id: userId,
          opportunity_id: opportunityId,
          feedback: "positive",
          score: 0.8 // Default score since we don't have a real score yet
        });

      if (insertError) throw insertError;
    }

    // Save the deal to saved deals if positive feedback
    await supabase
      .from("saved_opportunities")
      .upsert({ 
        opportunity_id: opportunityId,
        user_id: userId
      }, { onConflict: 'opportunity_id,user_id' });

    // Dispatch custom event for UI updates
    dispatchFeedbackEvent(opportunityId, 'positive');
    
    toast.success("Marked as interested");
    return true;
  } catch (error) {
    console.error("Error submitting positive feedback:", error);
    toast.error("Failed to submit feedback");
    return false;
  }
};
