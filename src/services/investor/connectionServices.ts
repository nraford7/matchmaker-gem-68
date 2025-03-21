
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { getCurrentUserId } from "./baseService";

// Follow an investor
export const followInvestor = async (investorId: string): Promise<boolean> => {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      toast.error("Please login to follow investors");
      return false;
    }

    const { error } = await supabase
      .from("investor_connections")
      .insert({ 
        follower_id: userId,
        following_id: investorId
      });

    if (error) {
      if (error.code === "23505") { // Unique violation
        toast.info("Already following this investor");
        return true;
      }
      throw error;
    }

    toast.success("Now following investor");
    return true;
  } catch (error) {
    console.error("Error following investor:", error);
    toast.error("Failed to follow investor");
    return false;
  }
};

// Unfollow an investor
export const unfollowInvestor = async (investorId: string): Promise<boolean> => {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      toast.error("Please login to unfollow investors");
      return false;
    }

    const { error } = await supabase
      .from("investor_connections")
      .delete()
      .eq("follower_id", userId)
      .eq("following_id", investorId);

    if (error) {
      throw error;
    }

    toast.success("Unfollowed investor");
    return true;
  } catch (error) {
    console.error("Error unfollowing investor:", error);
    toast.error("Failed to unfollow investor");
    return false;
  }
};

// Check if the current user is following an investor
export const checkFollowingStatus = async (investorId: string): Promise<boolean> => {
  try {
    const userId = await getCurrentUserId();
    if (!userId) return false;

    const { data, error } = await supabase
      .from("investor_connections")
      .select("id")
      .eq("follower_id", userId)
      .eq("following_id", investorId)
      .single();

    if (error && error.code !== "PGRST116") { // PGRST116 means no rows returned
      throw error;
    }

    return !!data;
  } catch (error) {
    console.error("Error checking following status:", error);
    return false;
  }
};
