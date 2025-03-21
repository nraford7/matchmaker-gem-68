
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { getCurrentUserId, validateUserAuth } from "../baseService";

// Custom event interface for TypeScript
declare global {
  interface WindowEventMap {
    'matchFeedbackChanged': CustomEvent<{opportunityId: string, feedback: 'positive' | 'negative' | 'removed'}>;
  }
}

// Helper function to dispatch feedback event
export const dispatchFeedbackEvent = (opportunityId: string, feedback: 'positive' | 'negative' | 'removed') => {
  const event = new CustomEvent('matchFeedbackChanged', {
    detail: { opportunityId, feedback }
  });
  window.dispatchEvent(event);
};

// Helper to get and validate current user
export const getValidatedUserId = async (): Promise<string | null> => {
  const userId = await getCurrentUserId();
  if (!validateUserAuth(userId)) {
    return null;
  }
  return userId;
};

// Check if there's an existing match record
export const getExistingMatch = async (userId: string, opportunityId: string) => {
  const { data: existingMatch, error: fetchError } = await supabase
    .from("matches")
    .select("id, feedback")
    .eq("user_id", userId)
    .eq("opportunity_id", opportunityId)
    .single();

  if (fetchError && fetchError.code !== "PGRST116") { // PGRST116 means no rows returned
    throw fetchError;
  }

  return existingMatch;
};

// Helper to remove opportunity from saved deals
export const removeFromSavedDeals = async (userId: string, opportunityId: string): Promise<void> => {
  const { error: deleteError } = await supabase
    .from("saved_opportunities")
    .delete()
    .eq("user_id", userId)
    .eq("opportunity_id", opportunityId);

  if (deleteError) {
    console.error("Error removing from saved deals:", deleteError);
  }
};

// Helper to remove opportunity from active deals
export const removeFromActiveDeals = async (userId: string, opportunityId: string): Promise<void> => {
  const { error: deleteError } = await supabase
    .from("active_deals")
    .delete()
    .eq("user_id", userId)
    .eq("opportunity_id", opportunityId);

  if (deleteError) {
    console.error("Error removing from active deals:", deleteError);
  }
};
