
import { supabase } from "@/integrations/supabase/client";
import { Deal } from "@/types";
import { toast } from "sonner";
import { getCurrentUserId } from "./baseService";

// Fetch saved deals for the current user
export const fetchSavedDeals = async (): Promise<Deal[]> => {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      console.log("No authenticated user found");
      throw new Error("User not authenticated");
    }

    console.log("Fetching saved deals for user:", userId);

    const { data, error } = await supabase
      .from("saved_deals")
      .select(`
        id,
        deal_id,
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
          IRR,
          introduced_by_id
        )
      `)
      .eq("user_id", userId);

    if (error) {
      console.error("Supabase error fetching saved deals:", error);
      throw error;
    }

    console.log("Raw saved deals data from Supabase:", data);

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
      stage: item.deals.stage,
      timeHorizon: item.deals.time_horizon,
      esgTags: item.deals.esg_tags,
      createdAt: item.deals.created_at,
      IRR: item.deals.IRR,
      introducedById: item.deals.introduced_by_id,
      // Simple match score simulation for now
      matchScore: Math.random() * 0.3 + 0.6,
      matchExplanation: "Based on your sector and stage preferences"
    }));

    console.log("Processed saved deals:", mappedDeals);
    return mappedDeals;
  } catch (error) {
    console.error("Error fetching saved deals:", error);
    toast.error("Failed to load saved deals");
    return [];
  }
};
