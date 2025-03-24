
import { supabase } from "@/integrations/supabase/client";
import { getCurrentUserId, validateUserAuth } from "./baseService";
import { Deal } from "@/types";
import { toast } from "sonner";

// Fetch all opportunities
export const fetchAllOpportunities = async (): Promise<Deal[]> => {
  try {
    const { data, error } = await supabase
      .from("deals")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    // Simplified to avoid deep type instantiation
    const deals = data as Deal[];
    return deals;
  } catch (error) {
    console.error("Error fetching all opportunities:", error);
    return [];
  }
};

// Fetch a specific opportunity by ID
export const fetchOpportunityById = async (id: string): Promise<Deal | null> => {
  try {
    const { data, error } = await supabase
      .from("deals")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;

    // Simplified to avoid deep type instantiation
    return data as Deal;
  } catch (error) {
    console.error(`Error fetching opportunity ${id}:`, error);
    return null;
  }
};

// Fetch featured opportunities 
export const fetchFeaturedOpportunities = async (limit = 3): Promise<Deal[]> => {
  try {
    const { data, error } = await supabase
      .from("deals")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) throw error;

    // Simplified to avoid deep type instantiation
    return data as Deal[];
  } catch (error) {
    console.error("Error fetching featured opportunities:", error);
    return [];
  }
};

// Fetch trending opportunities
export const fetchTrendingOpportunities = async (limit = 5): Promise<Deal[]> => {
  try {
    const { data, error } = await supabase
      .from("deals")
      .select("*")
      .order("view_count", { ascending: false })
      .limit(limit);

    if (error) throw error;

    // Simplified to avoid deep type instantiation
    return data as Deal[];
  } catch (error) {
    console.error("Error fetching trending opportunities:", error);
    return [];
  }
};

// Fetch opportunities matching user preferences
export const fetchMatchingOpportunities = async (): Promise<Deal[]> => {
  const userId = await getCurrentUserId();
  
  if (!validateUserAuth(userId)) {
    return [];
  }

  try {
    // In a real app, this would query based on user preferences
    // For now, we'll just fetch recent deals
    const { data, error } = await supabase
      .from("deals")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(10);

    if (error) throw error;

    // Simplified to avoid deep type instantiation
    const deals = data as Deal[];
    
    // Add mock match scores for demonstration
    const dealsWithMatchScores = deals.map(deal => ({
      ...deal,
      matchScore: Math.random(), // Random score between 0 and 1
      matchExplanation: "Based on your interest in " + (deal.sector || "this sector")
    }));

    return dealsWithMatchScores;
  } catch (error) {
    console.error("Error fetching matching opportunities:", error);
    return [];
  }
};
