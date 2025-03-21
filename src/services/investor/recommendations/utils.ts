
import { supabase } from "@/integrations/supabase/client";
import { NetworkSharedDeal } from "@/types";

// Fetch opportunity details for a recommendation
export const fetchOpportunityDetails = async (opportunityId: string) => {
  const { data, error } = await supabase
    .from("opportunities")
    .select("name, sector, stage, funding_amount")
    .eq("id", opportunityId)
    .single();
  
  if (error) {
    console.log("Error fetching opportunity details:", error);
    return null;
  }
  
  return data;
};

// Fetch investor profile details
export const fetchInvestorProfile = async (investorId: string) => {
  const { data, error } = await supabase
    .from("investor_profiles")
    .select("name, avatar_url")
    .eq("id", investorId)
    .single();
  
  if (error) {
    console.log("Error fetching investor details:", error);
    return null;
  }
  
  return data;
};

// Enhance recommendation with opportunity and investor details
export const enhanceRecommendation = async (
  recommendation: any, 
  opportunityIdField: string,
  investorIdField: string,
  commentField: string,
  createdAtField: string
): Promise<NetworkSharedDeal | null> => {
  const opportunityData = await fetchOpportunityDetails(recommendation[opportunityIdField]);
  const investorData = await fetchInvestorProfile(recommendation[investorIdField]);
  
  if (!opportunityData || !investorData) {
    return null;
  }
  
  return {
    id: recommendation.id,
    opportunityId: recommendation[opportunityIdField],
    opportunityName: opportunityData.name,
    sector: opportunityData.sector,
    stage: opportunityData.stage,
    fundingAmount: Number(opportunityData.funding_amount),
    sharedBy: investorData.name,
    avatar: investorData.avatar_url,
    comment: recommendation[commentField],
    sharedAt: recommendation[createdAtField]
  };
};
