
import { supabase } from "@/integrations/supabase/client";
import { getCurrentUserId } from "./baseService";
import { Deal } from "@/types";
import { toast } from "sonner";

// Utility function to map database deal to Deal type
const mapDealFromDb = (dbDeal: any): Deal => {
  return {
    id: dbDeal.id,
    name: dbDeal.name,
    description: dbDeal.description,
    dealType: dbDeal.deal_type,
    checkSizeRequired: dbDeal.check_size_required,
    check_size_required: dbDeal.check_size_required,
    sectorTags: dbDeal.sector_tags,
    sector_tags: dbDeal.sector_tags,
    geographies: dbDeal.geographies,
    stage: dbDeal.stage,
    timeHorizon: dbDeal.time_horizon,
    esgTags: dbDeal.esg_tags,
    involvementModel: dbDeal.involvement_model,
    exitStyle: dbDeal.exit_style,
    dueDiligenceLevel: dbDeal.due_diligence_level,
    decisionConvictionRequired: dbDeal.decision_conviction_required,
    investorSpeedRequired: dbDeal.investor_speed_required,
    strategyProfile: dbDeal.strategy_profile,
    psychologicalFit: dbDeal.psychological_fit,
    createdAt: dbDeal.created_at,
    updatedAt: dbDeal.updated_at
  };
};

// Fetch all opportunities
export const fetchAllOpportunities = async (): Promise<Deal[]> => {
  try {
    const { data, error } = await supabase
      .from("deals")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    // Map the database results to the Deal type
    return (data || []).map(mapDealFromDb);
  } catch (error) {
    console.error("Error fetching all opportunities:", error);
    return [];
  }
};

// Fetch a specific opportunity by ID
export const fetchOpportunityById = async (id: string): Promise<Deal | null> => {
  try {
    const { data, error } = await supabase
      .from("deals")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;

    // Map the database result to the Deal type
    return mapDealFromDb(data);
  } catch (error) {
    console.error(`Error fetching opportunity ${id}:`, error);
    return null;
  }
};

// Fetch featured opportunities 
export const fetchFeaturedOpportunities = async (limit = 3): Promise<Deal[]> => {
  try {
    const { data, error } = await supabase
      .from("deals")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) throw error;

    // Map the database results to the Deal type
    return (data || []).map(mapDealFromDb);
  } catch (error) {
    console.error("Error fetching featured opportunities:", error);
    return [];
  }
};

// Fetch trending opportunities
export const fetchTrendingOpportunities = async (limit = 5): Promise<Deal[]> => {
  try {
    const { data, error } = await supabase
      .from("deals")
      .select("*")
      .order("view_count", { ascending: false })
      .limit(limit);

    if (error) throw error;

    // Map the database results to the Deal type
    return (data || []).map(mapDealFromDb);
  } catch (error) {
    console.error("Error fetching trending opportunities:", error);
    return [];
  }
};

// Fetch opportunities matching user preferences
export const fetchMatchingOpportunities = async (): Promise<Deal[]> => {
  const userId = await getCurrentUserId();
  
  if (!userId) {
    return [];
  }

  try {
    // In a real app, this would query based on user preferences
    // For now, we'll just fetch recent deals
    const { data, error } = await supabase
      .from("deals")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(10);

    if (error) throw error;

    // Map the database results to the Deal type
    const deals = (data || []).map(mapDealFromDb);
    
    // Add mock match scores for demonstration
    const dealsWithMatchScores = deals.map(deal => ({
      ...deal,
      matchScore: Math.random(), // Random score between 0 and 1
      matchExplanation: "Based on your interest in " + (deal.sector || "this sector")
    }));

    return dealsWithMatchScores;
  } catch (error) {
    console.error("Error fetching matching opportunities:", error);
    return [];
  }
};

// Add this for backwards compatibility
export const fetchDeals = fetchAllOpportunities;
