
import { supabase } from "@/integrations/supabase/client";
import { Deal } from "@/types";
import { getCurrentUserId } from "./baseService";

export const fetchUploadedDeals = async (): Promise<Deal[]> => {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      console.log("No authenticated user found");
      throw new Error("User not authenticated");
    }

    console.log("Fetching uploaded deals for user:", userId);

    const { data, error } = await supabase
      .from("deals")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase error fetching uploaded deals:", error);
      throw error;
    }

    console.log("Raw uploaded deals data from Supabase:", data);

    // Map the data to Deal objects without recursive type instantiation
    const mappedDeals: Deal[] = data.map(item => ({
      id: item.id,
      name: item.name,
      description: item.description || "",
      dealType: item.deal_type || "",
      checkSizeRequired: item.check_size_required,
      sectorTags: item.sector_tags || [],
      geographies: item.geographies || [],
      location: item.location || "",
      stage: item.stage || "",
      timeHorizon: item.time_horizon || "",
      esgTags: item.esg_tags || [],
      createdAt: item.created_at || new Date().toISOString(),
      IRR: item.IRR,
      introducedById: item.introduced_by_id,
      strategyProfile: typeof item.strategy_profile === 'string' 
        ? JSON.parse(item.strategy_profile) 
        : (item.strategy_profile || {}),
      psychologicalFit: typeof item.psychological_fit === 'string'
        ? JSON.parse(item.psychological_fit)
        : (item.psychological_fit || {})
    }));

    return mappedDeals;
  } catch (error) {
    console.error("Error fetching uploaded deals:", error);
    return [];
  }
};
