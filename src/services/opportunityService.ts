
import { supabase } from "@/integrations/supabase/client";
import { Opportunity } from "@/types";
import { toast } from "sonner";

// Fetch all opportunities
export const fetchOpportunities = async (): Promise<Opportunity[]> => {
  try {
    const { data, error } = await supabase
      .from("opportunities")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      throw error;
    }

    return data.map((item) => ({
      id: item.id,
      name: item.name,
      description: item.description,
      sector: item.sector,
      stage: item.stage,
      fundingAmount: Number(item.funding_amount),
      location: item.location,
      pitchDeck: item.pitch_deck,
      createdAt: item.created_at
    }));
  } catch (error) {
    console.error("Error fetching opportunities:", error);
    toast.error("Failed to load opportunities");
    return [];
  }
};

// Fetch active deals for the current user
export const fetchActiveDeals = async (): Promise<Opportunity[]> => {
  try {
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    if (sessionError) throw sessionError;
    
    const userId = sessionData.session?.user.id;
    if (!userId) {
      throw new Error("User not authenticated");
    }

    const { data, error } = await supabase
      .from("active_deals")
      .select(`
        id,
        opportunity_id,
        stage,
        opportunities (
          id,
          name,
          description,
          sector,
          stage,
          funding_amount,
          location,
          pitch_deck,
          created_at
        )
      `)
      .eq("user_id", userId);

    if (error) {
      throw error;
    }

    return data.map((item) => ({
      id: item.opportunities.id,
      name: item.opportunities.name,
      description: item.opportunities.description,
      sector: item.opportunities.sector,
      stage: item.stage || item.opportunities.stage,
      fundingAmount: Number(item.opportunities.funding_amount),
      location: item.opportunities.location,
      pitchDeck: item.opportunities.pitch_deck,
      createdAt: item.opportunities.created_at
    }));
  } catch (error) {
    console.error("Error fetching active deals:", error);
    toast.error("Failed to load active deals");
    return [];
  }
};

// Fetch saved deals for the current user
export const fetchSavedDeals = async (): Promise<Opportunity[]> => {
  try {
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    if (sessionError) throw sessionError;
    
    const userId = sessionData.session?.user.id;
    if (!userId) {
      throw new Error("User not authenticated");
    }

    const { data, error } = await supabase
      .from("saved_opportunities")
      .select(`
        id,
        opportunity_id,
        opportunities (
          id,
          name,
          description,
          sector,
          stage,
          funding_amount,
          location,
          pitch_deck,
          created_at
        )
      `)
      .eq("user_id", userId);

    if (error) {
      throw error;
    }

    return data.map((item) => ({
      id: item.opportunities.id,
      name: item.opportunities.name,
      description: item.opportunities.description,
      sector: item.opportunities.sector,
      stage: item.opportunities.stage,
      fundingAmount: Number(item.opportunities.funding_amount),
      location: item.opportunities.location,
      pitchDeck: item.opportunities.pitch_deck,
      createdAt: item.opportunities.created_at,
      // Simple match score simulation for now
      matchScore: Math.random() * 0.3 + 0.6,
      matchExplanation: "Based on your sector and stage preferences"
    }));
  } catch (error) {
    console.error("Error fetching saved deals:", error);
    toast.error("Failed to load saved deals");
    return [];
  }
};

// Fetch past deals for the current user
export const fetchPastDeals = async (): Promise<Opportunity[]> => {
  try {
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    if (sessionError) throw sessionError;
    
    const userId = sessionData.session?.user.id;
    if (!userId) {
      throw new Error("User not authenticated");
    }

    const { data, error } = await supabase
      .from("past_deals")
      .select(`
        id,
        final_amount,
        opportunity_id,
        completion_date,
        opportunities (
          id,
          name,
          description,
          sector,
          location,
          pitch_deck,
          created_at
        )
      `)
      .eq("user_id", userId);

    if (error) {
      throw error;
    }

    return data.map((item) => ({
      id: item.opportunities.id,
      name: item.opportunities.name,
      description: item.opportunities.description,
      sector: item.opportunities.sector,
      stage: "Closed",
      fundingAmount: Number(item.final_amount),
      location: item.opportunities.location,
      pitchDeck: item.opportunities.pitch_deck,
      createdAt: item.opportunities.created_at
    }));
  } catch (error) {
    console.error("Error fetching past deals:", error);
    toast.error("Failed to load past deals");
    return [];
  }
};

// Add a deal to saved deals
export const saveDeal = async (opportunityId: string): Promise<boolean> => {
  try {
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    if (sessionError) throw sessionError;
    
    const userId = sessionData.session?.user.id;
    if (!userId) {
      toast.error("Please login to save deals");
      return false;
    }

    const { error } = await supabase
      .from("saved_opportunities")
      .insert({ 
        opportunity_id: opportunityId,
        user_id: userId
      });

    if (error) {
      if (error.code === "23505") { // Unique violation
        toast.info("Deal already saved");
        return true;
      }
      throw error;
    }

    toast.success("Deal saved successfully");
    return true;
  } catch (error) {
    console.error("Error saving deal:", error);
    toast.error("Failed to save deal");
    return false;
  }
};

// Add a deal to active deals
export const activateDeal = async (opportunityId: string, stage: string): Promise<boolean> => {
  try {
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    if (sessionError) throw sessionError;
    
    const userId = sessionData.session?.user.id;
    if (!userId) {
      toast.error("Please login to activate deals");
      return false;
    }

    const { error } = await supabase
      .from("active_deals")
      .insert({ 
        opportunity_id: opportunityId,
        stage: stage,
        user_id: userId
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
      .from("saved_opportunities")
      .delete()
      .eq("opportunity_id", opportunityId)
      .eq("user_id", userId);

    toast.success("Deal activated successfully");
    return true;
  } catch (error) {
    console.error("Error activating deal:", error);
    toast.error("Failed to activate deal");
    return false;
  }
};

// Move a deal to past deals
export const completeDeal = async (opportunityId: string, finalAmount: number): Promise<boolean> => {
  try {
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    if (sessionError) throw sessionError;
    
    const userId = sessionData.session?.user.id;
    if (!userId) {
      toast.error("Please login to complete deals");
      return false;
    }

    const { error } = await supabase
      .from("past_deals")
      .insert({ 
        opportunity_id: opportunityId,
        final_amount: finalAmount,
        user_id: userId
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
      .eq("opportunity_id", opportunityId)
      .eq("user_id", userId);

    toast.success("Deal completed successfully");
    return true;
  } catch (error) {
    console.error("Error completing deal:", error);
    toast.error("Failed to complete deal");
    return false;
  }
};

// Create a new opportunity
export const createOpportunity = async (opportunity: Omit<Opportunity, "id" | "createdAt">): Promise<string | null> => {
  try {
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    if (sessionError) throw sessionError;
    
    const userId = sessionData.session?.user.id;
    if (!userId) {
      toast.error("Please login to create opportunities");
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
