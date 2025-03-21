
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
  try {
    // Fetch opportunity details
    const opportunityData = await fetchOpportunityDetails(recommendation[opportunityIdField]);
    if (!opportunityData) {
      console.log(`No opportunity data found for ID: ${recommendation[opportunityIdField]}`);
      return null;
    }
    
    // Fetch investor profile
    const investorData = await fetchInvestorProfile(recommendation[investorIdField]);
    if (!investorData) {
      console.log(`No investor data found for ID: ${recommendation[investorIdField]}`);
      return null;
    }
    
    // Create the enhanced recommendation object
    return {
      id: recommendation.id,
      opportunityId: recommendation[opportunityIdField],
      opportunityName: opportunityData.name,
      sector: opportunityData.sector,
      stage: opportunityData.stage,
      fundingAmount: Number(opportunityData.funding_amount),
      location: opportunityData.location || "Unknown", // Add location from opportunity data
      sharedBy: investorData.name,
      avatar: investorData.avatar_url,
      comment: recommendation[commentField],
      sharedAt: recommendation[createdAtField]
    };
  } catch (error) {
    console.error("Error enhancing recommendation:", error);
    return null;
  }
};
