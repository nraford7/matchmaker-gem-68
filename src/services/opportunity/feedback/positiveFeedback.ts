
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Submit positive feedback for a match
export const submitPositiveFeedback = async (opportunityId: string): Promise<boolean> => {
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

    // If feedback is already positive, remove it (toggle behavior)
    if (existingMatch && existingMatch.feedback === "positive") {
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
        .update({ feedback: "positive" })
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
          feedback: "positive",
          score: 0.8 // Default score since we don't have a real score yet
        });

      if (insertError) {
        console.error("Error inserting feedback:", insertError);
        toast.error("Failed to submit feedback");
        return false;
      }
    }

    // Save the deal to saved deals if positive feedback
    await supabase
      .from("saved_deals")
      .upsert({ 
        deal_id: opportunityId,
        user_id: user.id
      }, { onConflict: 'deal_id,user_id' });

    // Dispatch custom event for UI updates
    const event = new CustomEvent('feedback-updated', { 
      detail: { opportunityId, feedbackType: 'positive' } 
    });
    window.dispatchEvent(event);
    
    toast.success("Marked as interested");
    return true;
  } catch (error) {
    console.error("Error submitting positive feedback:", error);
    toast.error("Failed to submit feedback");
    return false;
  }
};
