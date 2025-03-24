
import { NetworkSharedDeal } from "@/types";
import { getSharedDealsForUser } from "@/services/opportunity/sharedDealsService";
import { enhanceRecommendation } from "./utils/enhancementUtils";

export const fetchNetworkSharedDeals = async (userId: string): Promise<NetworkSharedDeal[]> => {
  try {
    // Fetch raw shared deals data
    const sharedDeals = await getSharedDealsForUser(userId);
    
    // Convert and enhance each shared deal into NetworkSharedDeal format
    const enhancedDeals = await Promise.all(
      sharedDeals.map(async (rawDeal) => {
        const enhancedDeal = await enhanceRecommendation(
          rawDeal,
          'deal_id',
          'shared_by_user_id',
          'comment',
          'created_at'
        );
        
        return enhancedDeal;
      })
    );
    
    // Filter out any null results from the enhancement process
    return enhancedDeals.filter(Boolean) as NetworkSharedDeal[];
  } catch (error) {
    console.error("Error fetching and enhancing network shared deals:", error);
    return [];
  }
};
