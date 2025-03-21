
import { NetworkSharedDeal } from "@/types";
import { toast } from "sonner";
import { getCurrentUserId } from "../baseService";
import { fetchInvestorRecommendations } from "./fetchInvestorRecommendations";
import { fetchNetworkSharedDeals } from "./fetchNetworkSharedDeals";

// Fetch recommendations made to the current user (combining both recommendation types)
export const fetchRecommendationsForUser = async (): Promise<NetworkSharedDeal[]> => {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      console.log("No user ID found");
      return [];
    }

    console.log("Fetching recommendations for user:", userId);
    const recommendations = await Promise.all([
      fetchInvestorRecommendations(userId),
      fetchNetworkSharedDeals(userId)
    ]);

    // Combine both types of recommendations and sort by created_at
    const combinedRecommendations = [
      ...recommendations[0],
      ...recommendations[1]
    ].sort((a, b) => 
      new Date(b.sharedAt).getTime() - new Date(a.sharedAt).getTime()
    );

    console.log("Combined recommendations count:", combinedRecommendations.length);
    return combinedRecommendations;
  } catch (error) {
    console.error("Error fetching combined recommendations:", error);
    toast.error("Failed to load recommendations");
    return [];
  }
};
