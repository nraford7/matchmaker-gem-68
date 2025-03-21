
import { supabase } from "@/integrations/supabase/client";

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
