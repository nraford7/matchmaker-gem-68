
import { supabase } from "@/integrations/supabase/client";
import { NetworkSharedDeal } from "@/types";

// Enhance recommendation with opportunity and investor details
export const enhanceRecommendation = async (
  rawRecommendation: any,
  dealIdKey: string,
  investorIdKey: string,
  commentaryKey: string,
  timestampKey: string
): Promise<NetworkSharedDeal | null> => {
  try {
    // Get deal details
    const { data: dealData, error: dealError } = await supabase
      .from("deals")
      .select("id, name, description, sector_tags, stage, check_size_required, geographies")
      .eq("id", rawRecommendation[dealIdKey])
      .single();

    if (dealError) {
      console.error("Error fetching deal details:", dealError);
      return null;
    }

    // Get investor details
    const { data: investorData, error: investorError } = await supabase
      .from("investor_profiles")
      .select("id, name, company, avatar_url")
      .eq("id", rawRecommendation[investorIdKey])
      .single();

    if (investorError) {
      console.error("Error fetching investor details:", investorError);
      return null;
    }

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
      investor: {
        id: investorData.id,
        name: investorData.name,
        company: investorData.company,
        avatar_url: investorData.avatar_url,
        avatar: investorData.avatar_url,
        deal_count: 0 // Default value
      },
      comment: rawRecommendation[commentaryKey],
      sharedAt: rawRecommendation[timestampKey]
    };
  } catch (error) {
    console.error("Error enhancing recommendation:", error);
    return null;
  }
};
