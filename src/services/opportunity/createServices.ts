
import { supabase } from "@/integrations/supabase/client";
import { Deal } from "@/types";
import { toast } from "sonner";
import { getCurrentUserId, validateUserAuth } from "./baseService";

// Create a simple avatar (placeholder function for compatibility)
export const createAvatar = async (): Promise<string> => {
  return `https://api.dicebear.com/6.x/initials/svg?seed=${Math.random().toString(36).substring(7)}`;
};

// Create a new opportunity
export const createOpportunity = async (opportunity: Omit<Deal, "id" | "createdAt">): Promise<string | null> => {
  try {
    const userId = await getCurrentUserId();
    if (!validateUserAuth(userId)) {
      return null;
    }

    const { data, error } = await supabase
      .from("deals") // Changed from "opportunities"
      .insert({
        name: opportunity.name,
        description: opportunity.description,
        deal_type: opportunity.dealType,
        stage: opportunity.stage,
        check_size_required: opportunity.checkSizeRequired,
        geographies: opportunity.geographies,
        sector_tags: opportunity.sectorTags,
        user_id: userId
      })
      .select("id")
      .single();

    if (error) {
      throw error;
    }

    toast.success("Opportunity created successfully");
    return data.id;
  } catch (error) {
    console.error("Error creating opportunity:", error);
    toast.error("Failed to create opportunity");
    return null;
  }
};
