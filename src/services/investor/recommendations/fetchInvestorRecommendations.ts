
import { supabase } from "@/integrations/supabase/client";
import { NetworkSharedDeal } from "@/types";
import { enhanceRecommendation } from "./utils";

// Fetch formal investor recommendations
export const fetchInvestorRecommendations = async (userId: string): Promise<NetworkSharedDeal[]> => {
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

    // Process each recommendation to get full details
    const enhancedRecommendations = await Promise.all(
      recommendations.map(recommendation => 
        enhanceRecommendation(
          recommendation,
          "opportunity_id",
          "recommender_id",
          "commentary",
          "created_at"
        )
      )
    );

    // Filter out any null values from failed enhancements
    return enhancedRecommendations.filter(
      (recommendation): recommendation is NetworkSharedDeal => recommendation !== null
    );
  } catch (error) {
    console.error("Error fetching investor recommendations:", error);
    return [];
  }
};
