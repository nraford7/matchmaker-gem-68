
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { getCurrentUserId } from "../baseService";

// Make recommendation to another investor
export const recommendDealToInvestor = async (
  dealId: string, 
  recipientId: string, 
  commentary: string | null = null
): Promise<boolean> => {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      toast.error("You must be logged in to recommend deals");
      return false;
    }

    const { error } = await supabase
      .from("investor_recommendations")
      .insert({
        deal_id: dealId,
        recommender_id: userId,
        recipient_id: recipientId,
        commentary: commentary
      });

    if (error) {
      throw error;
    }

    toast.success("Deal recommended successfully");
    return true;
  } catch (error) {
    console.error("Error recommending deal:", error);
    toast.error("Failed to recommend deal");
    return false;
  }
};

// Share a deal with another investor (alternative method)
export const shareDealWithInvestor = async (
  dealId: string, 
  recipientId: string, 
  comment: string | null = null
): Promise<boolean> => {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      toast.error("You must be logged in to share deals");
      return false;
    }

    const { error } = await supabase
      .from("network_shared_deals")
      .insert({
        deal_id: dealId,
        shared_by_user_id: userId,
        shared_with_user_id: recipientId,
        comment: comment
      });

    if (error) {
      throw error;
    }

    toast.success("Deal shared successfully");
    return true;
  } catch (error) {
    console.error("Error sharing deal:", error);
    toast.error("Failed to share deal");
    return false;
  }
};
