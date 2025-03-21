
import { supabase } from "@/integrations/supabase/client";

// Fetch opportunity details for a recommendation
export const fetchOpportunityDetails = async (opportunityId: string) => {
  try {
    // Check if the ID is a valid UUID format
    const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidPattern.test(opportunityId)) {
      console.log(`Invalid UUID format for opportunity ID: ${opportunityId}`);
      
      // For demo/sample IDs, return mock data
      if (opportunityId.startsWith('sample-')) {
        return {
          name: `Sample Opportunity ${opportunityId.split('-')[1]}`,
          sector: "SaaS",
          stage: "Seed",
          funding_amount: 1000000,
          location: "San Francisco, CA" // Add location property to sample data
        };
      }
      
      return null;
    }
    
    const { data, error } = await supabase
      .from("opportunities")
      .select("name, sector, stage, funding_amount, location") // Include location in the select
      .eq("id", opportunityId)
      .single();
    
    if (error) {
      console.log("Error fetching opportunity details:", error);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error("Exception in fetchOpportunityDetails:", error);
    return null;
  }
};
