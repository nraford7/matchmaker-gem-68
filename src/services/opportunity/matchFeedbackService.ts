import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { getCurrentUserId, validateUserAuth } from "./baseService";

// Custom event interface for TypeScript
declare global {
  interface WindowEventMap {
    'matchFeedbackChanged': CustomEvent<{opportunityId: string, feedback: 'positive' | 'negative' | 'removed'}>;
  }
}

// Helper function to dispatch feedback event
const dispatchFeedbackEvent = (opportunityId: string, feedback: 'positive' | 'negative' | 'removed') => {
  const event = new CustomEvent('matchFeedbackChanged', {
    detail: { opportunityId, feedback }
  });
  window.dispatchEvent(event);
};

// Submit positive feedback for a match
export const submitPositiveFeedback = async (opportunityId: string): Promise<boolean> => {
  try {
    const userId = await getCurrentUserId();
    if (!validateUserAuth(userId)) {
      return false;
    }

    // Check if there's an existing match record
    const { data: existingMatch, error: fetchError } = await supabase
      .from("matches")
      .select("id, feedback")
      .eq("user_id", userId)
      .eq("opportunity_id", opportunityId)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") { // PGRST116 means no rows returned
      throw fetchError;
    }

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

// Submit negative feedback for a match
export const submitNegativeFeedback = async (opportunityId: string): Promise<boolean> => {
  try {
    const userId = await getCurrentUserId();
    if (!validateUserAuth(userId)) {
      return false;
    }

    // Get opportunity details for the past_deals entry
    const { data: opportunity, error: opportunityError } = await supabase
      .from("opportunities")
      .select("funding_amount")
      .eq("id", opportunityId)
      .single();

    if (opportunityError) throw opportunityError;

    // Check if there's an existing match record
    const { data: existingMatch, error: fetchError } = await supabase
      .from("matches")
      .select("id, feedback")
      .eq("user_id", userId)
      .eq("opportunity_id", opportunityId)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") { // PGRST116 means no rows returned
      throw fetchError;
    }

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

    // Add to past deals with "Not Interested" note
    const { error: pastDealError } = await supabase
      .from("past_deals")
      .insert({
        opportunity_id: opportunityId,
        user_id: userId,
        final_amount: opportunity.funding_amount,
        notes: "Not interested"
      });

    if (pastDealError) throw pastDealError;

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

// Remove feedback for a match
export const removeFeedback = async (opportunityId: string): Promise<boolean> => {
  try {
    const userId = await getCurrentUserId();
    if (!validateUserAuth(userId)) {
      return false;
    }

    // Check if there's an existing match record
    const { data: existingMatch, error: fetchError } = await supabase
      .from("matches")
      .select("id, feedback")
      .eq("user_id", userId)
      .eq("opportunity_id", opportunityId)
      .single();

    if (fetchError) {
      if (fetchError.code === "PGRST116") { // No match found
        return true; // Nothing to remove
      }
      throw fetchError;
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
      const { error: deleteError } = await supabase
        .from("saved_opportunities")
        .delete()
        .eq("user_id", userId)
        .eq("opportunity_id", opportunityId);

      if (deleteError) throw deleteError;
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

// Get feedback status for an opportunity
export const getFeedbackStatus = async (opportunityId: string): Promise<'positive' | 'negative' | null> => {
  try {
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
