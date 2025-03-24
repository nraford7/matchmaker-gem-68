
import { supabase } from "@/integrations/supabase/client";
import { NetworkSharedDeal } from "@/types";

export const enhanceRecommendation = async (
  rawRecommendation: any,
  dealIdKey: string,
  investorIdKey: string,
  commentaryKey: string,
  timestampKey: string
): Promise<NetworkSharedDeal | null> => {
  try {
    // Parallel fetching of deal and investor details
    const [dealResponse, investorResponse] = await Promise.all([
      supabase
        .from("deals")
        .select("id, name, description, sector_tags, stage, check_size_required, geographies")
        .eq("id", rawRecommendation[dealIdKey])
        .single(),
      
      supabase
        .from("investor_profiles")
        .select("id, name, company, avatar_url")
        .eq("id", rawRecommendation[investorIdKey])
        .single()
    ]);

    // Check for errors
    if (dealResponse.error) {
      console.error("Error fetching deal details:", dealResponse.error);
      return null;
    }

    if (investorResponse.error) {
      console.error("Error fetching investor details:", investorResponse.error);
      return null;
    }

    const dealData = dealResponse.data;
    const investorData = investorResponse.data;

    return {
      id: rawRecommendation.id,
      deal: {
        id: dealData.id,
        name: dealData.name,
        description: dealData.description,
        sector_tags: dealData.sector_tags,
        sectorTags: dealData.sector_tags,
        stage: dealData.stage,
        check_size_required: dealData.check_size_required,
        checkSizeRequired: dealData.check_size_required,
        geographies: dealData.geographies
      },
      deal_id: dealData.id, // Adding deal_id for compatibility
      investor: {
        id: investorData.id,
        name: investorData.name,
        company: investorData.company,
        avatar_url: investorData.avatar_url,
        avatar: investorData.avatar_url,
        deal_count: 0 // Default value
      },
      comment: rawRecommendation[commentaryKey],
      sharedAt: rawRecommendation[timestampKey],
      // Adding backward compatibility fields
      sharedBy: investorData.name,
      avatar: investorData.avatar_url,
      sector: dealData.sector_tags?.[0] || '',
      stage: dealData.stage,
      fundingAmount: dealData.check_size_required,
      opportunityId: dealData.id,
      opportunityName: dealData.name
    };
  } catch (error) {
    console.error("Error enhancing recommendation:", error);
    return null;
  }
};
