
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Function to get the current feedback status for an opportunity
export const getFeedbackStatus = async (opportunityId: string): Promise<'positive' | 'negative' | null> => {
  // For sample data, just return null
  if (opportunityId.startsWith('sample-')) {
    return null;
  }

  try {
    const { data, error } = await supabase
      .from('opportunity_feedback')
      .select('feedback')
      .eq('opportunity_id', opportunityId)
      .single();

    if (error) {
      console.error('Error fetching feedback status:', error);
      return null;
    }

    return data?.feedback || null;
  } catch (error) {
    console.error('Error in getFeedbackStatus:', error);
    return null;
  }
};

// Function to submit positive feedback for an opportunity
export const submitPositiveFeedback = async (opportunityId: string): Promise<boolean> => {
  // For sample data, just return success
  if (opportunityId.startsWith('sample-')) {
    toast.success("Feedback recorded");
    return true;
  }

  try {
    // First, check if feedback already exists
    const { data: existingFeedback } = await supabase
      .from('opportunity_feedback')
      .select('*')
      .eq('opportunity_id', opportunityId)
      .single();

    if (existingFeedback) {
      // Update existing feedback
      const { error } = await supabase
        .from('opportunity_feedback')
        .update({ feedback: 'positive' })
        .eq('opportunity_id', opportunityId);

      if (error) {
        throw error;
      }
    } else {
      // Insert new feedback
      const { error } = await supabase
        .from('opportunity_feedback')
        .insert([{ opportunity_id: opportunityId, feedback: 'positive' }]);

      if (error) {
        throw error;
      }
    }

    toast.success("Feedback recorded");
    return true;
  } catch (error) {
    console.error('Error submitting positive feedback:', error);
    toast.error("Failed to record feedback");
    return false;
  }
};

// Function to submit negative feedback for an opportunity
export const submitNegativeFeedback = async (opportunityId: string): Promise<boolean> => {
  // For sample data, just return success
  if (opportunityId.startsWith('sample-')) {
    toast.success("Feedback recorded");
    return true;
  }

  try {
    // First, check if feedback already exists
    const { data: existingFeedback } = await supabase
      .from('opportunity_feedback')
      .select('*')
      .eq('opportunity_id', opportunityId)
      .single();

    if (existingFeedback) {
      // Update existing feedback
      const { error } = await supabase
        .from('opportunity_feedback')
        .update({ feedback: 'negative' })
        .eq('opportunity_id', opportunityId);

      if (error) {
        throw error;
      }
    } else {
      // Insert new feedback
      const { error } = await supabase
        .from('opportunity_feedback')
        .insert([{ opportunity_id: opportunityId, feedback: 'negative' }]);

      if (error) {
        throw error;
      }
    }

    toast.success("Feedback recorded");
    return true;
  } catch (error) {
    console.error('Error submitting negative feedback:', error);
    toast.error("Failed to record feedback");
    return false;
  }
};
