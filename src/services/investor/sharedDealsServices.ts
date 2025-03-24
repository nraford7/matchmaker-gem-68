
import { supabase } from "@/integrations/supabase/client";
import { Deal, NetworkDeal, NetworkInvestor } from "@/types";
import { toast } from "sonner";

interface SharedDeal {
  id: string;
  deal_id: string;
  shared_by_user_id: string;
  shared_with_user_id: string;
  comment: string;
  created_at: string;
  // Joined fields
  deal?: NetworkDeal;
  shared_by_user?: NetworkInvestor;
}

// Define a type that accepts the actual structure returned by Supabase
type DatabaseConnectionResult = {
  following_id: string;
  following: {
    id: string;
    name: string;
    email: string | null;
    company: string | null;
    avatar_url: string | null;
  } | null;
};

// Get all deals shared with the current user
export const getSharedDealsForUser = async (userId: string): Promise<SharedDeal[]> => {
  try {
    const { data, error } = await supabase
      .from("network_shared_deals")
      .select(`
        id,
        deal_id,
        shared_by_user_id,
        shared_with_user_id,
        comment,
        created_at,
        deal:deal_id (
          id,
          name,
          description,
          deal_type,
          stage,
          check_size_required,
          sector_tags,
          geographies,
          created_at
        ),
        shared_by_user:shared_by_user_id (
          id,
          name,
          email,
          company,
          avatar_url
        )
      `)
      .eq("shared_with_user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      throw error;
    }

    // Handle null values and ensure proper typing
    return (data || []).map(item => {
      if (!item) return null;
      
      // If deal is null, provide default values
      if (!item.deal) {
        return {
          ...item,
          deal: {
            id: "deleted",
            name: "Deleted Deal",
            description: "This deal has been deleted",
            stage: "Unavailable",
            check_size_required: 0,
            sector_tags: [],
            geographies: [],
            created_at: item.created_at
          } as NetworkDeal
        };
      }

      // If shared_by_user is null, provide default values
      if (!item.shared_by_user) {
        return {
          ...item,
          shared_by_user: {
            id: "deleted",
            name: "Unknown User",
            email: "",
            company: "",
            avatar_url: ""
          } as NetworkInvestor
        };
      }

      return item;
    }).filter(Boolean) as SharedDeal[];
  } catch (error) {
    console.error("Error fetching shared deals:", error);
    toast.error("Failed to load shared deals");
    return [];
  }
};

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

// Get potential deal recipients (your connections)
export const getPotentialDealRecipients = async (): Promise<NetworkInvestor[]> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast.error("You must be logged in to view connections");
      return [];
    }

    const { data, error } = await supabase
      .from("investor_connections")
      .select(`
        following_id,
        following:following_id (
          id,
          name,
          email,
          company,
          avatar_url
        )
      `)
      .eq("follower_id", user.id);

    if (error) {
      throw error;
    }

    // Map and filter out any null values or connections where following is null
    const recipients = (data as DatabaseConnectionResult[])
      .filter((item) => item && item.following)
      .map((item) => ({
        id: item.following!.id,
        name: item.following!.name || "Unknown",
        email: item.following!.email || "",
        company: item.following!.company || "",
        avatar_url: item.following!.avatar_url || "",
        // Add other required fields with defaults
        sector_tags: [],
        preferred_stages: [],
        preferred_geographies: [],
        deal_count: 0,
        investment_thesis: ""
      }));

    return recipients;
  } catch (error) {
    console.error("Error fetching connections:", error);
    toast.error("Failed to load connections");
    return [];
  }
};

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
