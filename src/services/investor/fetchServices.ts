
import { supabase } from "@/integrations/supabase/client";
import { NetworkInvestor } from "@/types";
import { toast } from "sonner";
import { formatInvestorProfile, getCurrentUserId } from "./baseService";

// Fetch all investors
export const fetchAllInvestors = async (): Promise<NetworkInvestor[]> => {
  try {
    const { data, error } = await supabase
      .from("investor_profiles")
      .select("*")
      .order("name");

    if (error) {
      throw error;
    }

    return data.map(formatInvestorProfile);
  } catch (error) {
    console.error("Error fetching investors:", error);
    toast.error("Failed to load investors");
    return [];
  }
};

// Fetch investor by ID
export const fetchInvestorById = async (id: string): Promise<NetworkInvestor | null> => {
  try {
    const { data, error } = await supabase
      .from("investor_profiles")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      throw error;
    }

    return formatInvestorProfile(data);
  } catch (error) {
    console.error("Error fetching investor:", error);
    toast.error("Failed to load investor profile");
    return null;
  }
};

// Get followed investors for the current user
export const fetchFollowedInvestors = async (): Promise<NetworkInvestor[]> => {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      throw new Error("User not authenticated");
    }

    // First, get the list of investor IDs that the current user follows
    const { data: connections, error: connectionsError } = await supabase
      .from("investor_connections")
      .select("following_id")
      .eq("follower_id", userId);

    if (connectionsError) {
      throw connectionsError;
    }

    // If no connections found, return empty array
    if (!connections || connections.length === 0) {
      return [];
    }

    // Extract the IDs of followed investors
    const followingIds = connections.map(connection => connection.following_id);

    // Then fetch the complete investor profiles for these IDs
    const { data: profiles, error: profilesError } = await supabase
      .from("investor_profiles")
      .select("*")
      .in("id", followingIds);

    if (profilesError) {
      throw profilesError;
    }

    return profiles.map(formatInvestorProfile);
  } catch (error) {
    console.error("Error fetching followed investors:", error);
    toast.error("Failed to load followed investors");
    return [];
  }
};
