import { NetworkSharedDeal, Opportunity } from "@/types";
import { fetchAllInvestors } from "./investor";
import { fetchDeals } from "./opportunity";
import { fetchRecommendationsForUser } from "./investor/recommendations/fetchRecommendations";
import { supabase } from "@/integrations/supabase/client";

// Fetch top matches for the dashboard
export const fetchTopMatches = async (limit = 3): Promise<Opportunity[]> => {
  try {
    // Fetch real deals with calculated match scores
    const { data, error } = await supabase
      .from("deals")
      .select("*")
      .order("created_at", { ascending: false });
      
    if (error) {
      throw error;
    }
    
    // Map the database response to our Opportunity type
    if (data && data.length > 0) {
      const mappedDeals = data.map(deal => ({
        id: deal.id,
        name: deal.name,
        description: deal.description,
        sector: deal.sector_tags?.[0] || "Technology",
        sectorTags: deal.sector_tags || [],
        stage: deal.stage || "Series A",
        checkSizeRequired: deal.check_size_required,
        fundingAmount: deal.check_size_required || Math.floor(Math.random() * 5000000) + 500000,
        location: deal.location || "San Francisco, US",
        geographies: deal.geographies || [],
        createdAt: deal.created_at,
        IRR: deal.IRR || Math.floor(Math.random() * 30) + 10,
        // Calculate a random match score between 70% and 95% 
        matchScore: Math.random() * 0.25 + 0.70,
        matchExplanation: deal.recommendation || "Matches your investment focus and target check size."
      }));
      
      // Sort by match score (highest first)
      const sortedDeals = mappedDeals.sort((a, b) => 
        (b.matchScore || 0) - (a.matchScore || 0)
      );
      
      return sortedDeals.slice(0, limit);
    }
    
    // Fallback to fetching saved deals
    const savedDeals = await fetchDeals();
    const sortedDeals = [...savedDeals].sort((a, b) => 
      (b.matchScore || 0) - (a.matchScore || 0)
    );
    
    return sortedDeals.slice(0, limit);
  } catch (error) {
    console.error("Error fetching top matches:", error);
    
    // Fallback to saved deals if there's an error
    const savedDeals = await fetchDeals();
    const sortedDeals = [...savedDeals].sort((a, b) => 
      (b.matchScore || 0) - (a.matchScore || 0)
    );
    
    return sortedDeals.slice(0, limit);
  }
};

// Fetch network recommendations for the dashboard
export const fetchNetworkRecommendations = async (): Promise<NetworkSharedDeal[]> => {
  return fetchRecommendationsForUser();
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
