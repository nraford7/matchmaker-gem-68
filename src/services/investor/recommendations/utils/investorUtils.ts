
import { supabase } from "@/integrations/supabase/client";

// Fetch investor profile details
export const fetchInvestorProfile = async (investorId: string) => {
  // Check if the ID is a valid UUID format
  const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (!uuidPattern.test(investorId)) {
    console.log(`Invalid UUID format for investor ID: ${investorId}`);
    
    // For demo/sample IDs, return mock data
    if (investorId.startsWith('sample-')) {
      return {
        name: `Sample Investor ${investorId.split('-')[1]}`,
        avatar_url: null
      };
    }
    
    return null;
  }
  
  try {
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
  } catch (error) {
    console.error("Exception in fetchInvestorProfile:", error);
    return null;
  }
};
