
import { supabase } from "@/integrations/supabase/client";
import { Deal } from "@/types";
import { toast } from "sonner";
import { getCurrentUserId } from "./baseService";

// Fetch past deals for the current user
export const fetchPastDeals = async (): Promise<Deal[]> => {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      throw new Error("User not authenticated");
    }

    const { data, error } = await supabase
      .from("past_deals")
      .select(`
        id,
        final_amount,
        deal_id,
        completion_date,
        deals (
          id, 
          name, 
          description,
          sector_tags,
          geographies,
          location,
          created_at,
          IRR
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
      sectorTags: item.deals.sector_tags,
      geographies: item.deals.geographies,
      location: item.deals.location,
      stage: "Closed",
      checkSizeRequired: Number(item.final_amount),
      createdAt: item.deals.created_at,
      IRR: item.deals.IRR
    }));
  } catch (error) {
    console.error("Error fetching past deals:", error);
    toast.error("Failed to load past deals");
    return [];
  }
};
