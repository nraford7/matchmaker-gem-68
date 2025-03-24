
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Delete a shared deal
export const deleteSharedDeal = async (sharedDealId: string): Promise<boolean> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast.error("You must be logged in to perform this action");
      return false;
    }

    // Check if the user has permission (either the sender or recipient)
    const { data: sharedDeal, error: checkError } = await supabase
      .from("network_shared_deals")
      .select("shared_by_user_id, shared_with_user_id")
      .eq("id", sharedDealId)
      .single();

    if (checkError) {
      throw checkError;
    }

    if (sharedDeal.shared_by_user_id !== user.id && sharedDeal.shared_with_user_id !== user.id) {
      toast.error("You don't have permission to delete this shared deal");
      return false;
    }

    // Delete the shared deal
    const { error } = await supabase
      .from("network_shared_deals")
      .delete()
      .eq("id", sharedDealId);

    if (error) {
      throw error;
    }

    toast.success("Shared deal removed");
    return true;
  } catch (error) {
    console.error("Error deleting shared deal:", error);
    toast.error("Failed to remove shared deal");
    return false;
  }
};
