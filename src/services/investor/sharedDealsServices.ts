
import { supabase } from "@/integrations/supabase/client";
import { NetworkSharedDeal } from "@/types";
import { toast } from "sonner";
import { getCurrentUserId } from "./baseService";

// Share a deal with another investor
export const shareDealWithInvestor = async (
  opportunityId: string, 
  sharedWithUserId: string, 
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
        shared_with_user_id: sharedWithUserId,
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

// Create sample shared deals (for demo purposes)
export const createSampleSharedDeals = async (): Promise<boolean> => {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      toast.error("You must be logged in to create sample shared deals");
      return false;
    }
    
    // Fetch opportunities to create mock deals with
    const { data: opportunities, error: opportunitiesError } = await supabase
      .from("opportunities")
      .select("id, name, sector, stage, funding_amount")
      .limit(3);
    
    if (opportunitiesError || !opportunities || opportunities.length < 3) {
      console.error("Error fetching opportunities:", opportunitiesError);
      toast.error("Not enough opportunities found to create sample shared deals");
      return false;
    }
    
    // Fetch real investor profiles for more realistic data
    const { data: investors, error: investorsError } = await supabase
      .from("investor_profiles")
      .select("id, name")
      .order("name")
      .limit(3);
      
    if (investorsError || !investors || investors.length === 0) {
      console.error("Error fetching investors:", investorsError);
      // Fallback to default mock investors if no real ones are found
      const mockInvestors = [
        { id: userId, name: "Alex Thompson" },
        { id: userId, name: "Maya Singh" },
        { id: userId, name: "Jordan Chen" }
      ];
      investors = mockInvestors;
    }
    
    const comments = [
      "I've worked with this founding team before - they're exceptional. Highly recommend taking a look.",
      "This fits your investment thesis perfectly. The team has great traction with enterprise customers.",
      "The CEO comes highly recommended by several in my network. Their approach to this market is unique."
    ];
    
    // Create the shared deals directly in memory for display
    // Instead of inserting into the database, we'll simulate the deals
    const sharedDeals = [];
    
    for (let i = 0; i < 3; i++) {
      // Insert directly as the current user being both the sharer and recipient
      // This complies with RLS policies
      const { error } = await supabase
        .from("network_shared_deals")
        .insert({
          opportunity_id: opportunities[i].id,
          shared_by_user_id: userId, // Current user as the sender
          shared_with_user_id: userId, // Current user as the recipient
          comment: comments[i]
        });
      
      if (error) {
        console.error(`Error inserting shared deal ${i}:`, error);
        throw error;
      }
    }
    
    toast.success("Sample shared deals created successfully");
    return true;
  } catch (error) {
    console.error("Error creating sample shared deals:", error);
    toast.error("Failed to create sample shared deals");
    return false;
  }
};

// Fetch network shared deals for the current user
export const fetchNetworkSharedDeals = async (): Promise<NetworkSharedDeal[]> => {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      return [];
    }

    // First, get the shared deal records
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
      throw sharedDealsError;
    }

    if (!sharedDealsData || sharedDealsData.length === 0) {
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
      }
    }

    return mappedDeals;
  } catch (error) {
    console.error("Error fetching shared deals:", error);
    toast.error("Failed to load shared deals");
    return [];
  }
};
