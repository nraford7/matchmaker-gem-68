
import { supabase } from "@/integrations/supabase/client";
import { NetworkSharedDeal } from "@/types";
import { toast } from "sonner";
import { getCurrentUserId } from "./baseService";

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

// Fetch formal investor recommendations
const fetchInvestorRecommendations = async (userId: string): Promise<NetworkSharedDeal[]> => {
  try {
    // Fetch recommendations made to the current user
    const { data: recommendations, error: recommendationsError } = await supabase
      .from("investor_recommendations")
      .select(`
        id,
        commentary,
        created_at,
        opportunity_id,
        recommender_id
      `)
      .eq("recipient_id", userId)
      .order("created_at", { ascending: false });

    if (recommendationsError) {
      console.error("Error fetching investor recommendations:", recommendationsError);
      return [];
    }

    console.log("Raw investor recommendations data:", recommendations);

    if (!recommendations || recommendations.length === 0) {
      console.log("No investor recommendations found");
      return [];
    }

    // Create a mapped result with placeholders
    const mappedDeals: NetworkSharedDeal[] = recommendations.map(recommendation => ({
      id: recommendation.id,
      opportunityId: recommendation.opportunity_id,
      opportunityName: "", // To be populated
      sector: "", // To be populated
      stage: "", // To be populated
      fundingAmount: 0, // To be populated
      sharedBy: "", // To be populated
      avatar: null,
      comment: recommendation.commentary,
      sharedAt: recommendation.created_at
    }));

    // For each recommendation, fetch opportunity details
    for (let i = 0; i < mappedDeals.length; i++) {
      const recommendation = recommendations[i];
      
      // Fetch opportunity details
      const { data: opportunityData, error: opportunityError } = await supabase
        .from("opportunities")
        .select("name, sector, stage, funding_amount")
        .eq("id", recommendation.opportunity_id)
        .single();
      
      if (!opportunityError && opportunityData) {
        mappedDeals[i].opportunityName = opportunityData.name;
        mappedDeals[i].sector = opportunityData.sector;
        mappedDeals[i].stage = opportunityData.stage;
        mappedDeals[i].fundingAmount = Number(opportunityData.funding_amount);
      } else {
        console.log("Error or no data for opportunity:", recommendation.opportunity_id, opportunityError);
      }
      
      // Fetch recommender details
      const { data: investorData, error: investorError } = await supabase
        .from("investor_profiles")
        .select("name, avatar_url")
        .eq("id", recommendation.recommender_id)
        .single();
      
      if (!investorError && investorData) {
        mappedDeals[i].sharedBy = investorData.name;
        mappedDeals[i].avatar = investorData.avatar_url;
      } else {
        console.log("Error or no data for recommender:", recommendation.recommender_id, investorError);
      }
    }

    return mappedDeals;
  } catch (error) {
    console.error("Error fetching investor recommendations:", error);
    return [];
  }
};

// Fetch network shared deals
const fetchNetworkSharedDeals = async (userId: string): Promise<NetworkSharedDeal[]> => {
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

    // Create a mapped result with placeholders
    const mappedDeals: NetworkSharedDeal[] = sharedDealsData.map(deal => ({
      id: deal.id,
      opportunityId: deal.opportunity_id,
      opportunityName: "", // To be populated
      sector: "", // To be populated
      stage: "", // To be populated
      fundingAmount: 0, // To be populated
      sharedBy: "", // To be populated
      avatar: null,
      comment: deal.comment,
      sharedAt: deal.created_at
    }));

    // For each shared deal, fetch opportunity details
    for (let i = 0; i < mappedDeals.length; i++) {
      const deal = sharedDealsData[i];
      
      // Fetch opportunity details
      const { data: opportunityData, error: opportunityError } = await supabase
        .from("opportunities")
        .select("name, sector, stage, funding_amount")
        .eq("id", deal.opportunity_id)
        .single();
      
      if (!opportunityError && opportunityData) {
        mappedDeals[i].opportunityName = opportunityData.name;
        mappedDeals[i].sector = opportunityData.sector;
        mappedDeals[i].stage = opportunityData.stage;
        mappedDeals[i].fundingAmount = Number(opportunityData.funding_amount);
      } else {
        console.log("Error or no data for opportunity:", deal.opportunity_id, opportunityError);
      }
      
      // Fetch sharer details
      const { data: investorData, error: investorError } = await supabase
        .from("investor_profiles")
        .select("name, avatar_url")
        .eq("id", deal.shared_by_user_id)
        .single();
      
      if (!investorError && investorData) {
        mappedDeals[i].sharedBy = investorData.name;
        mappedDeals[i].avatar = investorData.avatar_url;
      } else {
        console.log("Error or no data for sharer:", deal.shared_by_user_id, investorError);
      }
    }

    return mappedDeals;
  } catch (error) {
    console.error("Error fetching network shared deals:", error);
    return [];
  }
};

// Make recommendation to another investor
export const recommendDealToInvestor = async (
  opportunityId: string, 
  recipientId: string, 
  commentary: string | null = null
): Promise<boolean> => {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      toast.error("You must be logged in to recommend deals");
      return false;
    }

    const { error } = await supabase
      .from("investor_recommendations")
      .insert({
        opportunity_id: opportunityId,
        recommender_id: userId,
        recipient_id: recipientId,
        commentary: commentary
      });

    if (error) {
      throw error;
    }

    toast.success("Deal recommended successfully");
    return true;
  } catch (error) {
    console.error("Error recommending deal:", error);
    toast.error("Failed to recommend deal");
    return false;
  }
};

// Share a deal with another investor (alternative method)
export const shareDealWithInvestor = async (
  opportunityId: string, 
  recipientId: string, 
  comment: string | null = null
): Promise<boolean> => {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      toast.error("You must be logged in to share deals");
      return false;
    }

    const { error } = await supabase
      .from("network_shared_deals")
      .insert({
        opportunity_id: opportunityId,
        shared_by_user_id: userId,
        shared_with_user_id: recipientId,
        comment: comment
      });

    if (error) {
      throw error;
    }

    toast.success("Deal shared successfully");
    return true;
  } catch (error) {
    console.error("Error sharing deal:", error);
    toast.error("Failed to share deal");
    return false;
  }
};
