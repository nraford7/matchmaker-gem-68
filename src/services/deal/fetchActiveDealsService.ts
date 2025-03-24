
import { supabase } from "@/integrations/supabase/client";
import { Deal } from "@/types";
import { toast } from "sonner";
import { getCurrentUserId } from "./baseService";

// Fetch active deals for the current user
export const fetchActiveDeals = async (): Promise<Deal[]> => {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      console.log("No authenticated user found");
      throw new Error("User not authenticated");
    }

    console.log("Fetching active deals for user:", userId);

    const { data, error } = await supabase
      .from("active_deals")
      .select(`
        id,
        deal_id,
        stage,
        deals (
          id, 
          name, 
          description, 
          deal_type, 
          check_size_required,
          sector_tags,
          geographies,
          location,
          stage,
          time_horizon,
          esg_tags,
          created_at,
          IRR
        )
      `)
      .eq("user_id", userId);

    if (error) {
      console.error("Supabase error fetching active deals:", error);
      throw error;
    }

    console.log("Raw active deals data from Supabase:", data);

    // Filter out any null entries
    const validDeals = data.filter(item => item.deals);
    
    const mappedDeals = validDeals.map((item) => ({
      id: item.deals.id,
      name: item.deals.name,
      description: item.deals.description,
      dealType: item.deals.deal_type,
      checkSizeRequired: item.deals.check_size_required,
      sectorTags: item.deals.sector_tags,
      geographies: item.deals.geographies,
      location: item.deals.location,
      stage: item.stage || item.deals.stage,
      timeHorizon: item.deals.time_horizon,
      esgTags: item.deals.esg_tags,
      createdAt: item.deals.created_at,
      IRR: item.deals.IRR
    }));

    console.log("Processed active deals:", mappedDeals);
    return mappedDeals;
  } catch (error) {
    console.error("Error fetching active deals:", error);
    toast.error("Failed to load active deals");
    return [];
  }
};
