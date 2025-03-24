
import { supabase } from "@/integrations/supabase/client";
import { Deal } from "@/types";
import { toast } from "sonner";

// Add a deal to active deals
export const addToActiveDeals = async (dealId: string, notes: string = ""): Promise<boolean> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast.error("You must be logged in to track deals");
      return false;
    }
    
    // Check if already in active deals
    const { data: existingDeal, error: checkError } = await supabase
      .from("active_deals")
      .select("id")
      .eq("deal_id", dealId)
      .eq("user_id", user.id)
      .single();
    
    if (checkError && checkError.code !== "PGRST116") { // PGRST116 means no rows returned
      throw checkError;
    }
    
    if (existingDeal) {
      // Already in active deals, update notes if provided
      if (notes) {
        const { error: updateError } = await supabase
          .from("active_deals")
          .update({ notes })
          .eq("id", existingDeal.id);
        
        if (updateError) throw updateError;
      }
      
      toast.info("Deal is already in your active deals");
      return true;
    }

    // Remove from saved deals if present
    try {
      await supabase
        .from("saved_deals")
        .delete()
        .eq("deal_id", dealId)
        .eq("user_id", user.id);
    } catch (error) {
      console.error("Error removing from saved deals:", error);
      // Continue even if this fails
    }
    
    // Add to active deals
    const { error } = await supabase
      .from("active_deals")
      .insert({
        deal_id: dealId,
        user_id: user.id,
        notes,
        stage: "Evaluating" // Default stage
      });
    
    if (error) {
      throw error;
    }
    
    toast.success("Deal added to active deals");
    return true;
  } catch (error) {
    console.error("Error adding to active deals:", error);
    toast.error("Failed to add deal to active deals");
    return false;
  }
};

// Remove a deal from active deals
export const removeFromActiveDeals = async (dealId: string): Promise<boolean> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast.error("You must be logged in to manage deals");
      return false;
    }
    
    const { error } = await supabase
      .from("active_deals")
      .delete()
      .eq("deal_id", dealId)
      .eq("user_id", user.id);
    
    if (error) {
      throw error;
    }
    
    toast.success("Deal removed from active deals");
    return true;
  } catch (error) {
    console.error("Error removing from active deals:", error);
    toast.error("Failed to remove deal from active deals");
    return false;
  }
};

// Update the stage of an active deal
export const updateActiveDealStage = async (dealId: string, stage: string): Promise<boolean> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast.error("You must be logged in to update deals");
      return false;
    }
    
    const { error } = await supabase
      .from("active_deals")
      .update({ stage })
      .eq("deal_id", dealId)
      .eq("user_id", user.id);
    
    if (error) {
      throw error;
    }
    
    toast.success(`Deal stage updated to ${stage}`);
    return true;
  } catch (error) {
    console.error("Error updating deal stage:", error);
    toast.error("Failed to update deal stage");
    return false;
  }
};

// Update notes for an active deal
export const updateActiveDealNotes = async (dealId: string, notes: string): Promise<boolean> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast.error("You must be logged in to update deals");
      return false;
    }
    
    const { error } = await supabase
      .from("active_deals")
      .update({ notes })
      .eq("deal_id", dealId)
      .eq("user_id", user.id);
    
    if (error) {
      throw error;
    }
    
    toast.success("Deal notes updated");
    return true;
  } catch (error) {
    console.error("Error updating deal notes:", error);
    toast.error("Failed to update deal notes");
    return false;
  }
};
