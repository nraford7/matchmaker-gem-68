
import { NetworkSharedDeal } from "@/types";
import { fetchOpportunityDetails } from "./opportunityUtils";
import { fetchInvestorProfile } from "./investorUtils";

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
