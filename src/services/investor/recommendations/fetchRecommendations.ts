
import { NetworkSharedDeal } from "@/types";
import { toast } from "sonner";
import { getCurrentUserId } from "../baseService";
import { fetchNetworkSharedDeals } from "./fetchNetworkSharedDeals";

export const fetchRecommendationsForUser = async (): Promise<NetworkSharedDeal[]> => {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      console.log("No user ID found");
      return [];
    }

    const networkSharedDeals = await fetchNetworkSharedDeals(userId);
    
    // Sort by created_at (newest first)
    return networkSharedDeals.sort((a, b) => 
      new Date(b.sharedAt).getTime() - new Date(a.sharedAt).getTime()
    );
  } catch (error) {
    console.error("Error fetching network shared deals:", error);
    toast.error("Failed to load shared deals");
    return [];
  }
};
