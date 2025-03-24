
import { supabase } from "@/integrations/supabase/client";
import { Deal } from "@/types";
import { toast } from "sonner";

// Fetch all deals
export const fetchAllDeals = async (): Promise<Deal[]> => {
  try {
    const { data, error } = await supabase
      .from("deals")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      throw error;
    }

    // Process the data to ensure JSON fields are properly parsed
    const processedDeals = data.map(deal => {
      // Convert string JSON to objects if needed
      const strategyProfile = typeof deal.strategy_profile === 'string' 
        ? JSON.parse(deal.strategy_profile) 
        : deal.strategy_profile;
      
      const psychologicalFit = typeof deal.psychological_fit === 'string'
        ? JSON.parse(deal.psychological_fit)
        : deal.psychological_fit;
        
      return {
        ...deal,
        strategy_profile: strategyProfile,
        psychological_fit: psychologicalFit
      } as Deal;
    });

    return processedDeals;
  } catch (error) {
    console.error("Error fetching deals:", error);
    toast.error("Failed to load deals");
    return [];
  }
};

// Fetch a specific deal by ID
export const fetchDealById = async (id: string): Promise<Deal | null> => {
  try {
    const { data, error } = await supabase
      .from("deals")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      throw error;
    }

    if (!data) {
      return null;
    }

    // Convert string JSON to objects if needed
    const strategyProfile = typeof data.strategy_profile === 'string' 
      ? JSON.parse(data.strategy_profile) 
      : data.strategy_profile;
    
    const psychologicalFit = typeof data.psychological_fit === 'string'
      ? JSON.parse(data.psychological_fit)
      : data.psychological_fit;
      
    return {
      ...data,
      strategy_profile: strategyProfile,
      psychological_fit: psychologicalFit
    } as Deal;

  } catch (error) {
    console.error("Error fetching deal:", error);
    toast.error("Failed to load deal details");
    return null;
  }
};

// Fetch deals created by the current user
export const fetchUserDeals = async (): Promise<Deal[]> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast.error("You must be logged in to view your deals");
      return [];
    }

    const { data, error } = await supabase
      .from("deals")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      throw error;
    }

    // Process the data to ensure JSON fields are properly parsed
    const processedDeals = data.map(deal => {
      // Convert string JSON to objects if needed
      const strategyProfile = typeof deal.strategy_profile === 'string' 
        ? JSON.parse(deal.strategy_profile) 
        : deal.strategy_profile;
      
      const psychologicalFit = typeof deal.psychological_fit === 'string'
        ? JSON.parse(deal.psychological_fit)
        : deal.psychological_fit;
        
      return {
        ...deal,
        strategy_profile: strategyProfile,
        psychological_fit: psychologicalFit
      } as Deal;
    });

    return processedDeals;
  } catch (error) {
    console.error("Error fetching user deals:", error);
    toast.error("Failed to load your deals");
    return [];
  }
};
