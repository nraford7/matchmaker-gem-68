
import { supabase } from "@/integrations/supabase/client";
import { Opportunity } from "@/types";
import { toast } from "sonner";
import { getCurrentUserId, validateUserAuth } from "./baseService";

// Create a new opportunity
export const createOpportunity = async (opportunity: Omit<Opportunity, "id" | "createdAt">): Promise<string | null> => {
  try {
    const userId = await getCurrentUserId();
    if (!validateUserAuth(userId)) {
      return null;
    }

    const { data, error } = await supabase
      .from("opportunities")
      .insert({
        name: opportunity.name,
        description: opportunity.description,
        sector: opportunity.sector,
        stage: opportunity.stage,
        funding_amount: opportunity.fundingAmount,
        location: opportunity.location,
        pitch_deck: opportunity.pitchDeck,
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
