import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Validate and get current user ID
export const getValidatedUserId = async (): Promise<string | null> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast.error("You must be logged in to provide feedback");
      return null;
    }
    
    return user.id;
  } catch (error) {
    console.error("Error getting user:", error);
    return null;
  }
};

// Get existing match record
export const getExistingMatch = async (userId: string, opportunityId: string) => {
  const { data, error } = await supabase
    .from("matches")
    .select("*")
    .eq("user_id", userId)
    .eq("opportunity_id", opportunityId)
    .single();
  
  if (error && error.code !== "PGRST116") { // PGRST116 means no rows returned
    throw error;
  }
  
  return data;
};

// Dispatch feedback event for UI updates
export const dispatchFeedbackEvent = (opportunityId: string, feedbackType: 'positive' | 'negative' | null) => {
  const event = new CustomEvent('feedback-updated', { 
    detail: { opportunityId, feedbackType } 
  });
  window.dispatchEvent(event);
};

// Remove from saved deals
export const removeFromSavedDeals = async (userId: string, opportunityId: string) => {
  const { error } = await supabase
    .from("saved_deals")
    .delete()
    .eq("user_id", userId)
    .eq("deal_id", opportunityId);
  
  if (error) {
    console.error("Error removing from saved deals:", error);
  }
};

// Remove from active deals
export const removeFromActiveDeals = async (userId: string, opportunityId: string) => {
  const { error } = await supabase
    .from("active_deals")
    .delete()
    .eq("user_id", userId)
    .eq("opportunity_id", opportunityId);
  
  if (error) {
    console.error("Error removing from active deals:", error);
  }
};
