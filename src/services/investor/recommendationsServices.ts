
import { supabase } from "@/integrations/supabase/client";
import { NetworkSharedDeal } from "@/types";
import { toast } from "sonner";
import { getCurrentUserId } from "./baseService";

// Fetch recommendations made to the current user
export const fetchRecommendationsForUser = async (): Promise<NetworkSharedDeal[]> => {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      return [];
    }

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
      throw recommendationsError;
    }

    if (!recommendations || recommendations.length === 0) {
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
      }
    }

    return mappedDeals;
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    toast.error("Failed to load recommendations");
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
