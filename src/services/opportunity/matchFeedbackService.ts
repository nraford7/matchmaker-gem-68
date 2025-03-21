
import { supabase } from "@/integrations/supabase/client";
import { getCurrentUserId } from "./baseService";
import { toast } from "sonner";

// Get feedback status for a specific opportunity
export const getFeedbackStatus = async (opportunityId: string): Promise<'positive' | 'negative' | null> => {
  try {
    // Check if the ID is a sample/demo ID
    if (opportunityId.startsWith('sample-')) {
      // For demo purposes, return a random feedback or null
      const randomFeedback = [null, 'positive', 'negative'][Math.floor(Math.random() * 3)];
      return randomFeedback as 'positive' | 'negative' | null;
    }
    
    const userId = await getCurrentUserId();
    if (!userId) {
      return null;
    }

    const { data, error } = await supabase
      .from("matches")
      .select("feedback")
      .eq("user_id", userId)
      .eq("opportunity_id", opportunityId)
      .maybeSingle();

    if (error) {
      console.error("Error getting feedback status:", error);
      return null;
    }

    if (!data || !data.feedback) {
      return null;
    }

    return data.feedback === "positive" ? "positive" : "negative";
  } catch (error) {
    console.error("Error getting feedback status:", error);
    return null;
  }
};

// Submit positive feedback for an opportunity
export const submitPositiveFeedback = async (opportunityId: string): Promise<boolean> => {
  try {
    // Check if the ID is a sample/demo ID
    if (opportunityId.startsWith('sample-')) {
      // For demo purposes, just show a success toast
      toast.success("Interest recorded successfully");
      return true;
    }
    
    const userId = await getCurrentUserId();
    if (!userId) {
      toast.error("You must be logged in to provide feedback");
      return false;
    }

    // Check if a match record already exists
    const { data: existingMatch, error: matchError } = await supabase
      .from("matches")
      .select("id, feedback")
      .eq("user_id", userId)
      .eq("opportunity_id", opportunityId)
      .maybeSingle();

    if (matchError) {
      console.error("Error checking existing match:", matchError);
      toast.error("Failed to record interest");
      return false;
    }

    if (existingMatch) {
      // If the record exists but has different feedback, update it
      if (existingMatch.feedback !== "positive") {
        const { error: updateError } = await supabase
          .from("matches")
          .update({ feedback: "positive" })
          .eq("id", existingMatch.id);

        if (updateError) {
          console.error("Error updating feedback:", updateError);
          toast.error("Failed to update interest");
          return false;
        }
      } else {
        // If it's already positive, remove the feedback
        const { error: updateError } = await supabase
          .from("matches")
          .update({ feedback: null })
          .eq("id", existingMatch.id);

        if (updateError) {
          console.error("Error removing feedback:", updateError);
          toast.error("Failed to update interest");
          return false;
        }
      }
    } else {
      // If no match record exists, create a new one
      const { error: insertError } = await supabase
        .from("matches")
        .insert([
          { user_id: userId, opportunity_id: opportunityId, feedback: "positive" }
        ]);

      if (insertError) {
        console.error("Error inserting feedback:", insertError);
        toast.error("Failed to record interest");
        return false;
      }
    }

    toast.success("Interest recorded successfully");
    return true;
  } catch (error) {
    console.error("Error submitting positive feedback:", error);
    toast.error("Failed to record interest");
    return false;
  }
};

// Submit negative feedback for an opportunity
export const submitNegativeFeedback = async (opportunityId: string): Promise<boolean> => {
  try {
    // Check if the ID is a sample/demo ID
    if (opportunityId.startsWith('sample-')) {
      // For demo purposes, just show a success toast
      toast.success("Feedback recorded successfully");
      return true;
    }
    
    const userId = await getCurrentUserId();
    if (!userId) {
      toast.error("You must be logged in to provide feedback");
      return false;
    }

    // Check if a match record already exists
    const { data: existingMatch, error: matchError } = await supabase
      .from("matches")
      .select("id, feedback")
      .eq("user_id", userId)
      .eq("opportunity_id", opportunityId)
      .maybeSingle();

    if (matchError) {
      console.error("Error checking existing match:", matchError);
      toast.error("Failed to record feedback");
      return false;
    }

    if (existingMatch) {
      // If the record exists but has different feedback, update it
      if (existingMatch.feedback !== "negative") {
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
        // If it's already negative, remove the feedback
        const { error: updateError } = await supabase
          .from("matches")
          .update({ feedback: null })
          .eq("id", existingMatch.id);

        if (updateError) {
          console.error("Error removing feedback:", updateError);
          toast.error("Failed to update feedback");
          return false;
        }
      }
    } else {
      // If no match record exists, create a new one
      const { error: insertError } = await supabase
        .from("matches")
        .insert([
          { user_id: userId, opportunity_id: opportunityId, feedback: "negative" }
        ]);

      if (insertError) {
        console.error("Error inserting feedback:", insertError);
        toast.error("Failed to record feedback");
        return false;
      }
    }

    toast.success("Feedback recorded successfully");
    return true;
  } catch (error) {
    console.error("Error submitting negative feedback:", error);
    toast.error("Failed to record feedback");
    return false;
  }
};
