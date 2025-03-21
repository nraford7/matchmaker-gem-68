
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { getCurrentUserId, validateUserAuth } from "./baseService";

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
      .select("id")
      .eq("user_id", userId)
      .eq("opportunity_id", opportunityId)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") { // PGRST116 means no rows returned
      throw fetchError;
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
      .select("id")
      .eq("user_id", userId)
      .eq("opportunity_id", opportunityId)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") { // PGRST116 means no rows returned
      throw fetchError;
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

    toast.success("Moved to past deals");
    return true;
  } catch (error) {
    console.error("Error submitting negative feedback:", error);
    toast.error("Failed to submit feedback");
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
