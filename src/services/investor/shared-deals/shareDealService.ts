
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Share a deal with another user
export const shareDealWithUser = async (
  dealId: string,
  targetUserId: string,
  message: string = ""
): Promise<boolean> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast.error("You must be logged in to share deals");
      return false;
    }

    // Check if already shared
    const { data: existingShares, error: checkError } = await supabase
      .from("network_shared_deals")
      .select("id")
      .eq("deal_id", dealId)
      .eq("shared_by_user_id", user.id)
      .eq("shared_with_user_id", targetUserId)
      .single();

    if (checkError && checkError.code !== "PGRST116") { // PGRST116 means no rows returned
      throw checkError;
    }

    if (existingShares) {
      toast.info("You've already shared this deal with this user");
      return true; // Already shared, so we consider this a success
    }

    // Share the deal
    const { error } = await supabase
      .from("network_shared_deals")
      .insert({
        deal_id: dealId,
        shared_by_user_id: user.id,
        shared_with_user_id: targetUserId,
        comment: message
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
