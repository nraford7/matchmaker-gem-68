
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Submit positive feedback for a deal
export const submitPositiveFeedback = async (dealId: string): Promise<boolean> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast.error("You must be logged in to submit feedback");
      return false;
    }
    
    // Check if feedback already exists
    const { data, error: checkError } = await supabase
      .from("matches")
      .select("id, feedback")
      .eq("deal_id", dealId)
      .eq("user_id", user.id)
      .maybeSingle();
    
    if (checkError) {
      throw checkError;
    }
    
    // If feedback already exists, update it
    if (data) {
      // If already positive, remove it (toggle off)
      if (data.feedback === 'positive') {
        const { error } = await supabase
          .from("matches")
          .delete()
          .eq("id", data.id);
          
        if (error) throw error;
        toast.info("Feedback removed");
        return true;
      }
      
      // If negative, update to positive
      const { error } = await supabase
        .from("matches")
        .update({ feedback: 'positive' })
        .eq("id", data.id);
        
      if (error) throw error;
      toast.success("Feedback updated");
      return true;
    }
    
    // Create new positive feedback
    const { error } = await supabase
      .from("matches")
      .insert({
        deal_id: dealId,
        user_id: user.id,
        feedback: 'positive',
        score: 0.8 // Default match score
      });
      
    if (error) throw error;
    toast.success("Positive feedback submitted");
    return true;
    
  } catch (error) {
    console.error("Error submitting positive feedback:", error);
    toast.error("Failed to submit feedback");
    return false;
  }
};

// Submit negative feedback for a deal
export const submitNegativeFeedback = async (dealId: string): Promise<boolean> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast.error("You must be logged in to submit feedback");
      return false;
    }
    
    // Check if feedback already exists
    const { data, error: checkError } = await supabase
      .from("matches")
      .select("id, feedback")
      .eq("deal_id", dealId)
      .eq("user_id", user.id)
      .maybeSingle();
    
    if (checkError) {
      throw checkError;
    }
    
    // If feedback already exists, update it
    if (data) {
      // If already negative, remove it (toggle off)
      if (data.feedback === 'negative') {
        const { error } = await supabase
          .from("matches")
          .delete()
          .eq("id", data.id);
          
        if (error) throw error;
        toast.info("Feedback removed");
        return true;
      }
      
      // If positive, update to negative
      const { error } = await supabase
        .from("matches")
        .update({ feedback: 'negative' })
        .eq("id", data.id);
        
      if (error) throw error;
      toast.success("Feedback updated");
      return true;
    }
    
    // Create new negative feedback
    const { error } = await supabase
      .from("matches")
      .insert({
        deal_id: dealId,
        user_id: user.id,
        feedback: 'negative',
        score: 0.2 // Default low match score for negative feedback
      });
      
    if (error) throw error;
    toast.success("Negative feedback submitted");
    return true;
    
  } catch (error) {
    console.error("Error submitting negative feedback:", error);
    toast.error("Failed to submit feedback");
    return false;
  }
};

// Get feedback status for a deal
export const getFeedbackStatus = async (dealId: string): Promise<'positive' | 'negative' | null> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return null;
    }
    
    const { data, error } = await supabase
      .from("matches")
      .select("feedback")
      .eq("deal_id", dealId)
      .eq("user_id", user.id)
      .maybeSingle();
    
    if (error) {
      throw error;
    }
    
    return data?.feedback as 'positive' | 'negative' | null;
  } catch (error) {
    console.error("Error getting feedback status:", error);
    return null;
  }
};
