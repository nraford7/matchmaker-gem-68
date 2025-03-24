
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Submit negative feedback for a match
export const submitNegativeFeedback = async (opportunityId: string): Promise<boolean> => {
  // For sample data, just return success
  if (opportunityId.startsWith('sample-')) {
    toast.success("Feedback recorded");
    return true;
  }
  
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast.error("You must be logged in to provide feedback");
      return false;
    }

    // Get opportunity details for the past_deals entry
    const { data: opportunity, error: opportunityError } = await supabase
      .from("deals")
      .select("check_size_required")
      .eq("id", opportunityId)
      .single();

    if (opportunityError && !opportunityId.startsWith('sample-')) {
      console.error("Error fetching opportunity:", opportunityError);
      toast.error("Failed to fetch opportunity details");
      return false;
    }

    // Check if there's an existing match record
    const { data: existingMatch, error: matchError } = await supabase
      .from("matches")
      .select("*")
      .eq("user_id", user.id)
      .eq("opportunity_id", opportunityId)
      .maybeSingle();

    if (matchError) {
      console.error("Error fetching match:", matchError);
      toast.error("Failed to check existing feedback");
      return false;
    }

    // If feedback is already negative, remove it (toggle behavior)
    if (existingMatch && existingMatch.feedback === "negative") {
      const { error: deleteError } = await supabase
        .from("matches")
        .delete()
        .eq("id", existingMatch.id);

      if (deleteError) {
        console.error("Error removing feedback:", deleteError);
        toast.error("Failed to remove feedback");
        return false;
      }
      
      // Dispatch custom event for UI updates
      const event = new CustomEvent('feedback-updated', { 
        detail: { opportunityId, feedbackType: null } 
      });
      window.dispatchEvent(event);
      
      toast.success("Feedback removed");
      return true;
    }

    if (existingMatch) {
      // Update existing match
      const { error: updateError } = await supabase
        .from("matches")
        .update({ feedback: "negative" })
        .eq("id", existingMatch.id);

      if (updateError) {
        console.error("Error updating feedback:", updateError);
        toast.error("Failed to update feedback");
        return false;
      }
    } else {
      // Insert new match
      const { error: insertError } = await supabase
        .from("matches")
        .insert({
          user_id: user.id,
          opportunity_id: opportunityId,
          feedback: "negative",
          score: 0.8 // Default score since we don't have a real score yet
        });

      if (insertError) {
        console.error("Error inserting feedback:", insertError);
        toast.error("Failed to submit feedback");
        return false;
      }
    }

    // Remove from saved deals if present
    const { error: savedDealError } = await supabase
      .from("saved_deals")
      .delete()
      .eq("user_id", user.id)
      .eq("deal_id", opportunityId);

    if (savedDealError) {
      console.error("Error removing from saved deals:", savedDealError);
    }

    // Remove from active deals if present
    const { error: activeDealError } = await supabase
      .from("active_deals")
      .delete()
      .eq("user_id", user.id)
      .eq("deal_id", opportunityId);

    if (activeDealError) {
      console.error("Error removing from active deals:", activeDealError);
    }

    // Add to past deals with "Not Interested" note if we have opportunity details
    if (opportunity) {
      const { error: pastDealError } = await supabase
        .from("past_deals")
        .insert({
          deal_id: opportunityId,
          user_id: user.id,
          final_amount: opportunity.check_size_required,
          notes: "Not interested"
        });

      if (pastDealError) {
        console.error("Error adding to past deals:", pastDealError);
      }
    }

    // Dispatch custom event for UI updates
    const event = new CustomEvent('feedback-updated', { 
      detail: { opportunityId, feedbackType: 'negative' } 
    });
    window.dispatchEvent(event);
    
    toast.success("Moved to past deals");
    return true;
  } catch (error) {
    console.error("Error submitting negative feedback:", error);
    toast.error("Failed to submit feedback");
    return false;
  }
};
