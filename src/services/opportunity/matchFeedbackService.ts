
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
      .select("feedback")
      .eq("deal_id", opportunityId)
      .eq("user_id", user.id)
      .single();
    
    if (error) {
      if (error.code === "PGRST116") { // No rows found
        return null;
      }
      throw error;
    }
    
    // Check for valid feedback values
    if (data.feedback === "positive" || data.feedback === "negative") {
      return data.feedback;
    }
    
    return null;
  } catch (error) {
    console.error("Error getting feedback status:", error);
    return null;
  }
};

// Submit positive feedback
export const submitPositiveFeedback = async (opportunityId: string): Promise<boolean> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast.error("You must be logged in to provide feedback");
      return false;
    }
    
    // Check if there's an existing match record
    const { data, error: matchError } = await supabase
      .from("matches")
      .select("id, feedback")
      .eq("deal_id", opportunityId)
      .eq("user_id", user.id)
      .single();
    
    if (matchError && matchError.code !== "PGRST116") { // PGRST116 means no rows returned
      throw matchError;
    }
    
    // If feedback is already positive, remove it (toggle behavior)
    if (data && data.feedback === "positive") {
      const { error: removeError } = await supabase
        .from("matches")
        .delete()
        .eq("id", data.id);
      
      if (removeError) throw removeError;
      
      toast.success("Feedback removed");
      return true;
    }
    
    // Insert or update the match record
    if (data) {
      // Update existing match
      const { error: updateError } = await supabase
        .from("matches")
        .update({ feedback: "positive" })
        .eq("id", data.id);
      
      if (updateError) throw updateError;
    } else {
      // Insert new match
      const { error: insertError } = await supabase
        .from("matches")
        .insert({
          deal_id: opportunityId,
          user_id: user.id,
          feedback: "positive"
        });
      
      if (insertError) throw insertError;
    }
    
    // Save the deal to saved deals if positive feedback
    await supabase
      .from("saved_deals")
      .upsert({ 
        deal_id: opportunityId,
        user_id: user.id
      }, { onConflict: 'deal_id,user_id' });
    
    toast.success("Marked as interested");
    return true;
  } catch (error) {
    console.error("Error submitting positive feedback:", error);
    toast.error("Failed to submit feedback");
    return false;
  }
};

// Submit negative feedback
export const submitNegativeFeedback = async (opportunityId: string): Promise<boolean> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast.error("You must be logged in to provide feedback");
      return false;
    }
    
    // Check if there's an existing match record
    const { data, error: matchError } = await supabase
      .from("matches")
      .select("id, feedback")
      .eq("deal_id", opportunityId)
      .eq("user_id", user.id)
      .single();
    
    if (matchError && matchError.code !== "PGRST116") { // PGRST116 means no rows returned
      throw matchError;
    }
    
    // If feedback is already negative, remove it (toggle behavior)
    if (data && data.feedback === "negative") {
      const { error: removeError } = await supabase
        .from("matches")
        .delete()
        .eq("id", data.id);
      
      if (removeError) throw removeError;
      
      toast.success("Feedback removed");
      return true;
    }
    
    // Insert or update the match record
    if (data) {
      // Update existing match
      const { error: updateError } = await supabase
        .from("matches")
        .update({ feedback: "negative" })
        .eq("id", data.id);
      
      if (updateError) throw updateError;
    } else {
      // Insert new match
      const { error: insertError } = await supabase
        .from("matches")
        .insert({
          deal_id: opportunityId,
          user_id: user.id,
          feedback: "negative"
        });
      
      if (insertError) throw insertError;
    }
    
    // Remove from saved deals if present
    await supabase
      .from("saved_deals")
      .delete()
      .eq("deal_id", opportunityId)
      .eq("user_id", user.id);
    
    toast.success("Marked as not interested");
    return true;
  } catch (error) {
    console.error("Error submitting negative feedback:", error);
    toast.error("Failed to submit feedback");
    return false;
  }
};
