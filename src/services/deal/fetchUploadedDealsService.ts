
import { supabase } from "@/integrations/supabase/client";
import { Deal } from "@/types";
import { toast } from "sonner";
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

    const mappedDeals: Deal[] = data.map((item: any) => ({
      id: item.id,
      name: item.name,
      description: item.description,
      dealType: item.deal_type,
      checkSizeRequired: item.check_size_required,
      sectorTags: item.sector_tags,
      geographies: item.geographies,
      location: item.location,
      stage: item.stage,
      timeHorizon: item.time_horizon,
      esgTags: item.esg_tags,
      createdAt: item.created_at,
      IRR: item.IRR,
      introducedById: item.introduced_by_id
    }));

    console.log("Processed uploaded deals:", mappedDeals);
    return mappedDeals;
  } catch (error) {
    console.error("Error fetching uploaded deals:", error);
    toast.error("Failed to load uploaded deals");
    return [];
  }
};
