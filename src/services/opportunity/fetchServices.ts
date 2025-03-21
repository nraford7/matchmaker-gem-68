
import { supabase } from "@/integrations/supabase/client";
import { Opportunity } from "@/types";
import { toast } from "sonner";
import { getCurrentUserId } from "./baseService";

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
    const userId = await getCurrentUserId();
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
    const userId = await getCurrentUserId();
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
    const userId = await getCurrentUserId();
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
