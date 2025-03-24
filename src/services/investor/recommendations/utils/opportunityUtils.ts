
import { supabase } from "@/integrations/supabase/client";
import { Deal } from "@/types";

/**
 * Retrieves deal details by ID
 */
export const getOpportunityById = async (opportunityId: string): Promise<Deal | null> => {
  try {
    // If it's a sample opportunity, return null to trigger the sample data path
    if (opportunityId.startsWith('sample-')) {
      return null;
    }
    
    console.log("Fetching opportunity details for ID:", opportunityId);
    
    // Use 'deals' instead of 'opportunities'
    const { data, error } = await supabase
      .from("deals")
      .select("*")
      .eq("id", opportunityId)
      .single();
    
    if (error) {
      console.error("Error fetching opportunity:", error);
      return null;
    }
    
    if (!data) {
      console.log("No opportunity found with ID:", opportunityId);
      return null;
    }
    
    // Convert to our frontend type
    const opportunity: Deal = {
      id: data.id,
      name: data.name,
      description: data.description,
      dealType: data.deal_type,
      checkSizeRequired: data.check_size_required,
      sectorTags: data.sector_tags,
      geographies: data.geographies,
      stage: data.stage,
      timeHorizon: data.time_horizon,
      esgTags: data.esg_tags,
      createdAt: data.created_at,
      // For backward compatibility
      sector: data.sector_tags?.[0],
      location: data.geographies?.[0],
      fundingAmount: data.check_size_required
    };
    
    return opportunity;
  } catch (error) {
    console.error("Error in getOpportunityById:", error);
    return null;
  }
};

// Function to safely handle JSON parsing
export const safeJsonParse = (json: any, defaultValue: any = {}): any => {
  if (!json) return defaultValue;
  try {
    return typeof json === 'string' ? JSON.parse(json) : json;
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return defaultValue;
  }
};
