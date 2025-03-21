
import { NetworkSharedDeal, Opportunity } from "@/types";
import { fetchAllInvestors } from "./investor";
import { fetchSavedDeals } from "./opportunity";
import { fetchNetworkSharedDeals as fetchSharedDeals } from "./investor/sharedDealsServices";

// Fetch top matches for the dashboard
export const fetchTopMatches = async (limit = 3): Promise<Opportunity[]> => {
  // This is currently a simplified implementation
  // Will be enhanced with real match-making logic
  const savedDeals = await fetchSavedDeals();
  
  // Sort by match score (descending)
  const sortedDeals = [...savedDeals].sort((a, b) => 
    (b.matchScore || 0) - (a.matchScore || 0)
  );
  
  return sortedDeals.slice(0, limit);
};

// Fetch network shared deals for the dashboard
export const fetchNetworkSharedDeals = async (): Promise<NetworkSharedDeal[]> => {
  return fetchSharedDeals();
};

// Fetch network metrics for the dashboard
export const fetchNetworkMetrics = async () => {
  const allInvestors = await fetchAllInvestors();
  
  // These would typically come from your database
  return {
    totalConnections: Math.floor(Math.random() * 10) + 1,
    newDealsShared: Math.floor(Math.random() * 5),
    potentialConnections: allInvestors.length,
    activeNetworkRate: Math.round(Math.random() * 100)
  };
};
