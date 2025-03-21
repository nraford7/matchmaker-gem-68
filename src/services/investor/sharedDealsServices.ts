import { supabase } from "@/integrations/supabase/client";
import { getCurrentUserId } from "./baseService";
import { NetworkSharedDeal } from "@/types";
import { toast } from "sonner";
import { enhanceRecommendation } from "./recommendations/utils/enhancementUtils";

// Sample comments for shared deals
const sampleComments = [
  "This looks like a promising opportunity in your sector!",
  "I've worked with this team before, they're exceptional.",
  "The market potential here is huge, worth taking a look.",
  "Their technology is quite innovative and has a defensible moat.",
  "Strong founding team with relevant industry experience.",
  "They have impressive early traction in this space.",
  "I know the founder personally, very driven entrepreneur.",
  "This aligns well with your investment thesis.",
  "They're solving a real problem with a scalable solution.",
  "Already has interest from several top investors."
];

// Create sample shared deals for demo purposes
export const createSampleSharedDeals = async (): Promise<boolean> => {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      console.error("No user ID found");
      return false;
    }
    
    // First, get some sample investors to be the sharers
    const { data: investors } = await supabase
      .from("investor_profiles")
      .select("id, name")
      .neq("id", userId)
      .limit(5);
      
    if (!investors || investors.length === 0) {
      console.error("No investors found to create sample shared deals");
      return false;
    }
    
    // Get some sample opportunities
    const { data: opportunities } = await supabase
      .from("opportunities")
      .select("id, name")
      .limit(10);
      
    if (!opportunities || opportunities.length === 0) {
      console.error("No opportunities found to create sample shared deals");
      return false;
    }
    
    // Delete existing sample shared deals
    await supabase
      .from("network_shared_deals")
      .delete()
      .eq("shared_with_user_id", userId);
      
    // Create 3-6 sample shared deals
    const numberOfDeals = Math.floor(Math.random() * 4) + 3; // 3-6 deals
    const sharedDeals = [];
    
    for (let i = 0; i < numberOfDeals; i++) {
      const randomInvestor = investors[Math.floor(Math.random() * investors.length)];
      const randomOpportunity = opportunities[Math.floor(Math.random() * opportunities.length)];
      const randomComment = sampleComments[Math.floor(Math.random() * sampleComments.length)];
      
      // Create date between 1-30 days ago
      const daysAgo = Math.floor(Math.random() * 30) + 1;
      const date = new Date();
      date.setDate(date.getDate() - daysAgo);
      
      sharedDeals.push({
        shared_by_user_id: randomInvestor.id,
        shared_with_user_id: userId,
        opportunity_id: randomOpportunity.id,
        comment: randomComment,
        created_at: date.toISOString()
      });
    }
    
    // Insert the sample shared deals
    const { error } = await supabase
      .from("network_shared_deals")
      .insert(sharedDeals);
      
    if (error) {
      console.error("Error creating sample shared deals:", error);
      return false;
    }
    
    console.log(`Created ${numberOfDeals} sample shared deals`);
    return true;
  } catch (error) {
    console.error("Error in createSampleSharedDeals:", error);
    return false;
  }
};

// Fetch network shared deals for the current user
export const fetchNetworkSharedDeals = async (): Promise<NetworkSharedDeal[]> => {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      console.log("No user ID found");
      return [];
    }

    console.log("Fetching network shared deals for user:", userId);
    
    // Fetch shared deals made to the current user
    let { data: sharedDealsData, error: sharedDealsError } = await supabase
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

    // If no deals are found, automatically create sample deals
    if (!sharedDealsData || sharedDealsData.length === 0) {
      console.log("No network shared deals found, creating sample deals");
      await createSampleSharedDeals();
      
      // Fetch again after creating sample deals
      const { data: newDealsData, error: newDealsError } = await supabase
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
        
      if (newDealsError || !newDealsData || newDealsData.length === 0) {
        console.error("Still no deals after creating samples:", newDealsError);
        return [];
      }
      
      sharedDealsData = newDealsData;
    }

    // Process each shared deal to get full details
    const enhancedDeals = await Promise.all(
      sharedDealsData.map(async deal => {
        try {
          return await enhanceRecommendation(
            deal,
            "opportunity_id",
            "shared_by_user_id",
            "comment",
            "created_at"
          );
        } catch (error) {
          console.error("Error enhancing deal:", error, deal);
          return null;
        }
      })
    );

    // Filter out any null values from failed enhancements
    return enhancedDeals.filter(
      (deal): deal is NetworkSharedDeal => deal !== null
    );
  } catch (error) {
    console.error("Error fetching network shared deals:", error);
    return [];
  }
};
