
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

// Activate a deal (for compatibility with existing components)
export const activateDeal = async (dealId: string, stage: string): Promise<boolean> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast.error("You must be logged in to activate deals");
      return false;
    }

    const { error } = await supabase
      .from("active_deals")
      .insert({ 
        deal_id: dealId,
        stage: stage,
        user_id: user.id
      });

    if (error) {
      if (error.code === "23505") { // Unique violation
        toast.info("Deal already active");
        return true;
      }
      throw error;
    }

    // Remove from saved deals if it was saved
    await supabase
      .from("saved_deals")
      .delete()
      .eq("deal_id", dealId)
      .eq("user_id", user.id);

    toast.success("Deal activated successfully");
    return true;
  } catch (error) {
    console.error("Error activating deal:", error);
    toast.error("Failed to activate deal");
    return false;
  }
};

// Complete a deal (for compatibility with existing components)
export const completeDeal = async (dealId: string, finalAmount: number): Promise<boolean> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast.error("You must be logged in to complete deals");
      return false;
    }

    const { error } = await supabase
      .from("past_deals")
      .insert({ 
        deal_id: dealId,
        final_amount: finalAmount,
        user_id: user.id
      });

    if (error) {
      if (error.code === "23505") { // Unique violation
        toast.info("Deal already completed");
        return true;
      }
      throw error;
    }

    // Remove from active deals
    await supabase
      .from("active_deals")
      .delete()
      .eq("deal_id", dealId)
      .eq("user_id", user.id);

    toast.success("Deal completed successfully");
    return true;
  } catch (error) {
    console.error("Error completing deal:", error);
    toast.error("Failed to complete deal");
    return false;
  }
};
