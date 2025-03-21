
import { supabase } from "@/integrations/supabase/client";
import { NetworkSharedDeal } from "@/types";
import { getCurrentUserId } from "./baseService";
import { toast } from "sonner";

// Fetch recommendations for the current user
export const fetchRecommendationsForUser = async (): Promise<NetworkSharedDeal[]> => {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      console.log("No user ID found");
      return [];
    }
    
    console.log("Fetching recommendations for user:", userId);
    
    // Query both the investor_recommendations and opportunities tables
    const { data, error } = await supabase
      .from("investor_recommendations")
      .select(`
        id,
        commentary,
        opportunity_id,
        recommender_id,
        created_at,
        opportunities(name, sector, stage, funding_amount),
        investor_profiles!recommender_id(name)
      `)
      .eq("recipient_id", userId);
    
    if (error) {
      console.error("Error fetching recommendations:", error);
      return [];
    }
    
    console.log("Raw recommendations data:", data);
    
    if (!data || data.length === 0) {
      console.log("No recommendations found");
      return [];
    }
    
    // Transform the data into the required format
    const recommendations: NetworkSharedDeal[] = data.map(rec => ({
      id: rec.id,
      opportunityId: rec.opportunity_id,
      opportunityName: rec.opportunities.name,
      sector: rec.opportunities.sector,
      stage: rec.opportunities.stage,
      fundingAmount: rec.opportunities.funding_amount,
      sharedBy: rec.investor_profiles?.name || "Unknown Investor",
      sharedAt: rec.created_at,
      comment: rec.commentary || undefined
    }));
    
    return recommendations;
  } catch (error) {
    console.error("Exception in fetchRecommendationsForUser:", error);
    return [];
  }
};

// Recommend a deal to another investor
export const recommendDeal = async (
  opportunityId: string,
  recipientId: string,
  comment?: string
): Promise<boolean> => {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      toast.error("Please log in to recommend deals");
      return false;
    }
    
    // Create a recommendation
    const { error } = await supabase
      .from("investor_recommendations")
      .insert({
        opportunity_id: opportunityId,
        recipient_id: recipientId,
        recommender_id: userId,
        commentary: comment || null
      });
    
    if (error) {
      console.error("Error recommending deal:", error);
      toast.error("Failed to recommend deal");
      return false;
    }
    
    toast.success("Deal recommended successfully");
    return true;
  } catch (error) {
    console.error("Error in recommendDeal:", error);
    toast.error("Failed to recommend deal");
    return false;
  }
};

// Get potential recipients (investors you follow)
export const getPotentialRecipients = async () => {
  try {
    const userId = await getCurrentUserId();
    if (!userId) return [];
    
    const { data, error } = await supabase
      .from("investor_connections")
      .select(`
        following_id,
        investor_profiles!following_id(id, name, company)
      `)
      .eq("follower_id", userId);
    
    if (error) {
      console.error("Error fetching potential recipients:", error);
      return [];
    }
    
    return data.map(connection => ({
      id: connection.investor_profiles.id,
      name: connection.investor_profiles.name,
      company: connection.investor_profiles.company || undefined
    }));
  } catch (error) {
    console.error("Error in getPotentialRecipients:", error);
    return [];
  }
};
