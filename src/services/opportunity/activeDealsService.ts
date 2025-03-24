
import { supabase } from "@/integrations/supabase/client";
import { Deal } from "@/types";
import { toast } from "sonner";
import { getCurrentUserId } from "./baseService";

// Fetch active deals for the current user
export const fetchActiveDeals = async (): Promise<Deal[]> => {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      throw new Error("User not authenticated");
    }

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
          stage,
          time_horizon,
          esg_tags,
          created_at
        )
      `)
      .eq("user_id", userId);

    if (error) {
      throw error;
    }

    return data.map((item) => ({
      id: item.deals.id,
      name: item.deals.name,
      description: item.deals.description,
      dealType: item.deals.deal_type,
      checkSizeRequired: item.deals.check_size_required,
      sectorTags: item.deals.sector_tags,
      geographies: item.deals.geographies,
      stage: item.stage || item.deals.stage,
      timeHorizon: item.deals.time_horizon,
      esgTags: item.deals.esg_tags,
      createdAt: item.deals.created_at
    }));
  } catch (error) {
    console.error("Error fetching active deals:", error);
    toast.error("Failed to load active deals");
    return [];
  }
};
