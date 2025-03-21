
import { supabase } from "@/integrations/supabase/client";
import { NetworkSharedDeal } from "@/types";
import { enhanceRecommendation } from "./utils";

// Fetch network shared deals
export const fetchNetworkSharedDeals = async (userId: string): Promise<NetworkSharedDeal[]> => {
  try {
    // Fetch shared deals made to the current user
    const { data: sharedDealsData, error: sharedDealsError } = await supabase
      .from("network_shared_deals")
      .select(`
        id,
        comment,
        created_at,
        opportunity_id,
        shared_by_user_id
      `)
      .eq("shared_with_user_id", userId)
      .order("created_at", { ascending: false });

    if (sharedDealsError) {
      console.error("Error fetching network shared deals:", sharedDealsError);
      return [];
    }

    console.log("Raw network shared deals data:", sharedDealsData);

    if (!sharedDealsData || sharedDealsData.length === 0) {
      console.log("No network shared deals found");
      return [];
    }

    // Process each shared deal to get full details
    const enhancedDeals = await Promise.all(
      sharedDealsData.map(deal => 
        enhanceRecommendation(
          deal,
          "opportunity_id",
          "shared_by_user_id",
          "comment",
          "created_at"
        )
      )
    );

    // Filter out any null values from failed enhancements
    return enhancedDeals.filter(
      (deal): deal is NetworkSharedDeal => deal !== null
    );
  } catch (error) {
    console.error("Error fetching network shared deals:", error);
    return [];
  }
};
