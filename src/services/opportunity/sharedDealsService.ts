
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { SharedDeal } from "./types";

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

    // Use type assertion to address the type mismatch
    return (data as unknown as SharedDeal[]).map(item => {
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
          }
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
          }
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
