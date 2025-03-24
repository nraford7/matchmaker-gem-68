
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Remove feedback for an opportunity
export const removeFeedback = async (opportunityId: string): Promise<boolean> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast.error("You must be logged in to remove feedback");
      return false;
    }

    // Delete the match record
    const { error } = await supabase
      .from("matches")
      .delete()
      .eq("user_id", user.id)
      .eq("opportunity_id", opportunityId);

    if (error) {
      console.error("Error removing feedback:", error);
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
  } catch (error) {
    console.error("Error removing feedback:", error);
    toast.error("Failed to remove feedback");
    return false;
  }
};
