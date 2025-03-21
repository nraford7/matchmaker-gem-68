
import { NetworkSharedDeal, Opportunity } from "@/types";
import { fetchAllInvestors } from "./investor";
import { fetchSavedDeals } from "./opportunity";
import { fetchNetworkSharedDeals as fetchSharedDeals } from "./investor/sharedDealsServices";
import { supabase } from "@/integrations/supabase/client";

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

// Fetch dashboard metrics 
export const fetchDashboardMetrics = async () => {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      return {
        newMatches: 0,
        opportunitiesViewed: 0,
        matchQualityPercentage: 0,
        activeDealsCount: 0
      };
    }
    
    // In a real app, fetch actual metrics from the database
    // For now, using mock data
    return {
      newMatches: Math.floor(Math.random() * 5) + 1,
      opportunitiesViewed: Math.floor(Math.random() * 20) + 5,
      matchQualityPercentage: Math.floor(Math.random() * 30) + 60,  // 60-90%
      activeDealsCount: Math.floor(Math.random() * 8) + 1
    };
  } catch (error) {
    console.error("Error fetching dashboard metrics:", error);
    return {
      newMatches: 0,
      opportunitiesViewed: 0,
      matchQualityPercentage: 0,
      activeDealsCount: 0
    };
  }
};

// Helper function to get current user ID
const getCurrentUserId = async (): Promise<string | null> => {
  try {
    const { data: sessionData } = await supabase.auth.getSession();
    return sessionData.session?.user.id || null;
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
};
