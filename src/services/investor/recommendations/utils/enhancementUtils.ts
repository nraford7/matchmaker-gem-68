import { NetworkInvestor, NetworkSharedDeal, Opportunity } from "@/types";

// Convert from database format to frontend format
export const enhanceNetworkInvestor = (investor: any): NetworkInvestor => {
  return {
    id: investor.id,
    name: investor.name || "Unknown Investor",
    company: investor.company || "Independent",
    sectors: investor.sectors || [],
    dealCount: investor.deal_count || 0,
    avatar: investor.avatar_url,
    email: investor.email,
    preferredStages: investor.preferred_stages,
    checkSizeMin: investor.check_size_min,
    checkSizeMax: investor.check_size_max,
    preferredGeographies: investor.preferred_geographies,
    investmentThesis: investor.investment_thesis
  };
};

// Create a shared deal object with needed properties
export const createSharedDeal = (deal: any): NetworkSharedDeal => {
  return {
    id: deal.id,
    opportunityId: deal.opportunity_id,
    opportunityName: deal.opportunity_name || "Unnamed Opportunity",
    sector: deal.sector || "Technology",
    stage: deal.stage || "Seed",
    fundingAmount: deal.funding_amount || 1000000,
    sharedBy: deal.shared_by || "Anonymous Investor",
    avatar: deal.avatar_url || "",
    comment: deal.comment,
    sharedAt: deal.created_at,
    location: deal.location || "Unknown" // Add location property
  };
};

// Format opportunity data for the frontend
export const enhanceOpportunity = (opportunity: any): Opportunity => {
  return {
    id: opportunity.id,
    name: opportunity.name,
    description: opportunity.description,
    sector: opportunity.sector,
    stage: opportunity.stage,
    fundingAmount: opportunity.funding_amount,
    location: opportunity.location,
    pitchDeck: opportunity.pitch_deck,
    createdAt: opportunity.created_at,
    matchScore: opportunity.match_score,
    matchExplanation: opportunity.match_explanation,
  };
};
