
import { supabase } from "@/integrations/supabase/client";
import { NetworkInvestor } from "@/types";
import { toast } from "sonner";

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
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    if (sessionError) throw sessionError;
    
    const userId = sessionData.session?.user.id;
    if (!userId) {
      throw new Error("User not authenticated");
    }

    const { data, error } = await supabase
      .from("investor_connections")
      .select(`
        following_id,
        investor_profiles!investor_profiles(*)
      `)
      .eq("follower_id", userId);

    if (error) {
      throw error;
    }

    return data.map(item => formatInvestorProfile(item.investor_profiles));
  } catch (error) {
    console.error("Error fetching followed investors:", error);
    toast.error("Failed to load followed investors");
    return [];
  }
};

// Follow an investor
export const followInvestor = async (investorId: string): Promise<boolean> => {
  try {
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    if (sessionError) throw sessionError;
    
    const userId = sessionData.session?.user.id;
    if (!userId) {
      toast.error("Please login to follow investors");
      return false;
    }

    const { error } = await supabase
      .from("investor_connections")
      .insert({ 
        follower_id: userId,
        following_id: investorId
      });

    if (error) {
      if (error.code === "23505") { // Unique violation
        toast.info("Already following this investor");
        return true;
      }
      throw error;
    }

    toast.success("Now following investor");
    return true;
  } catch (error) {
    console.error("Error following investor:", error);
    toast.error("Failed to follow investor");
    return false;
  }
};

// Unfollow an investor
export const unfollowInvestor = async (investorId: string): Promise<boolean> => {
  try {
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    if (sessionError) throw sessionError;
    
    const userId = sessionData.session?.user.id;
    if (!userId) {
      toast.error("Please login to unfollow investors");
      return false;
    }

    const { error } = await supabase
      .from("investor_connections")
      .delete()
      .eq("follower_id", userId)
      .eq("following_id", investorId);

    if (error) {
      throw error;
    }

    toast.success("Unfollowed investor");
    return true;
  } catch (error) {
    console.error("Error unfollowing investor:", error);
    toast.error("Failed to unfollow investor");
    return false;
  }
};

// Check if the current user is following an investor
export const checkFollowingStatus = async (investorId: string): Promise<boolean> => {
  try {
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    if (sessionError) throw sessionError;
    
    const userId = sessionData.session?.user.id;
    if (!userId) return false;

    const { data, error } = await supabase
      .from("investor_connections")
      .select("id")
      .eq("follower_id", userId)
      .eq("following_id", investorId)
      .single();

    if (error && error.code !== "PGRST116") { // PGRST116 means no rows returned
      throw error;
    }

    return !!data;
  } catch (error) {
    console.error("Error checking following status:", error);
    return false;
  }
};

// Format raw investor data into NetworkInvestor type
const formatInvestorProfile = (data: any): NetworkInvestor => {
  return {
    id: data.id,
    name: data.name,
    company: data.company || "",
    sectors: data.sectors || [],
    dealCount: data.deal_count || 0,
    avatar: data.avatar_url,
    email: data.email,
    preferredStages: data.preferred_stages || [],
    checkSizeMin: data.check_size_min,
    checkSizeMax: data.check_size_max,
    preferredGeographies: data.preferred_geographies || [],
    investmentThesis: data.investment_thesis
  };
};
