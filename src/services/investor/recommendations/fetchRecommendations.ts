
import { NetworkSharedDeal } from "@/types";
import { toast } from "sonner";
import { getCurrentUserId } from "../baseService";
import { fetchNetworkSharedDeals } from "./fetchNetworkSharedDeals";

// Fetch shared deals made to the current user (only network_shared_deals)
export const fetchRecommendationsForUser = async (): Promise<NetworkSharedDeal[]> => {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      console.log("No user ID found");
      return [];
    }

    console.log("Fetching network shared deals for user:", userId);
    
    // Only fetch network_shared_deals
    const networkSharedDeals = await fetchNetworkSharedDeals(userId);
    console.log("Network shared deals:", networkSharedDeals.length);

    // Sort by created_at
    const sortedDeals = networkSharedDeals.sort((a, b) => 
      new Date(b.sharedAt).getTime() - new Date(a.sharedAt).getTime()
    );

    console.log("Sorted deals count:", sortedDeals.length);
    return sortedDeals;
  } catch (error) {
    console.error("Error fetching network shared deals:", error);
    toast.error("Failed to load shared deals");
    return [];
  }
};
