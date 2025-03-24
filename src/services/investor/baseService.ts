
import { supabase } from "@/integrations/supabase/client";
import { NetworkInvestor, Investor } from "@/types";
import { toast } from "sonner";

// Format raw investor data into NetworkInvestor type
export const formatInvestorProfile = (data: any): NetworkInvestor => {
  return {
    id: data.id,
    name: data.name,
    company: data.company || "",
    sectors: data.sectors || [],
    dealCount: data.deal_count || 0,
    avatar: data.avatar_url,
    email: data.email,
    preferredStages: data.preferred_stages || [],
    checkSizeMin: data.check_size_min,
    checkSizeMax: data.check_size_max,
    preferredGeographies: data.preferred_geographies || [],
    investmentThesis: data.investment_thesis
  };
};

// Helper to get current user session
export const getCurrentUserId = async (): Promise<string | null> => {
  try {
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    if (sessionError) throw sessionError;
    
    const userId = sessionData.session?.user.id;
    return userId || null;
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
};
