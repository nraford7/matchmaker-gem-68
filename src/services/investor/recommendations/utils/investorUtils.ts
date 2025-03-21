
import { supabase } from "@/integrations/supabase/client";

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
