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

// Create exactly 3 sample shared deals for demo purposes
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
      
    // Create exactly 3 sample shared deals
    const numberOfDeals = 3;
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

// Fetch network shared deals for the current user, always ensuring there are 3 deals
export const fetchNetworkSharedDeals = async (): Promise<NetworkSharedDeal[]> => {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      console.log("No user ID found");
      return [];
    }

    console.log("Fetching network shared deals for user:", userId);
    
    // Always delete existing shared deals first to ensure fresh samples each time
    await supabase
      .from("network_shared_deals")
      .delete()
      .eq("shared_with_user_id", userId);
    
    // Create fresh sample deals
    await createSampleSharedDeals();
    
    // Fetch the newly created shared deals
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

    if (sharedDealsError || !sharedDealsData || sharedDealsData.length === 0) {
      console.error("Error fetching network shared deals:", sharedDealsError);
      return [];
    }

    console.log("Raw network shared deals data:", sharedDealsData);

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

// Fetch a specific shared deal by ID
export const fetchSharedDealById = async (sharedDealId: string) => {
  try {
    const { data, error } = await supabase
      .from("network_shared_deals")
      .select(`
        *,
        shared_by:shared_by_user_id (
          id,
          name,
          email,
          company,
          avatar_url
        ),
        deal:deal_id (*)
      `)
      .eq("id", sharedDealId)
      .single();

    if (error) {
      console.error("Error fetching shared deal:", error);
      return null;
    }

    // Use the deals table instead of opportunities
    if (!data || !data.deal) {
      return null;
    }

    const deal = data.deal;
    const sharedBy = data.shared_by;

    // Convert to our NetworkSharedDeal type
    return {
      id: data.id,
      sharedAt: data.created_at,
      comment: data.comment,
      investor: {
        id: sharedBy.id,
        name: sharedBy.name,
        email: sharedBy.email,
        company: sharedBy.company,
        avatar_url: sharedBy.avatar_url,
        deal_count: 0 // Required field
      },
      deal: {
        id: deal.id,
        name: deal.name,
        description: deal.description,
        sectorTags: deal.sector_tags,
        sector_tags: deal.sector_tags,
        stage: deal.stage,
        check_size_required: deal.check_size_required,
        checkSizeRequired: deal.check_size_required,
        geographies: deal.geographies
      },
      // Backward compatibility fields
      sharedBy: sharedBy.name,
      avatar: sharedBy.avatar_url,
      sector: deal.sector_tags?.[0],
      stage: deal.stage,
      fundingAmount: deal.check_size_required,
      opportunityId: deal.id,
      opportunityName: deal.name
    };
  } catch (error) {
    console.error("Error in fetchSharedDealById:", error);
    return null;
  }
};
