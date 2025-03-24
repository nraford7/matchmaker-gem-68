
import { supabase } from "@/integrations/supabase/client";
import { NetworkInvestor } from "@/types";
import { toast } from "sonner";

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
    const recipients = (data as unknown[])
      .filter((item: any) => item && item.following)
      .map((item: any) => ({
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

    return recipients as NetworkInvestor[];
  } catch (error) {
    console.error("Error fetching connections:", error);
    toast.error("Failed to load connections");
    return [];
  }
};
