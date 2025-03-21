
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { NetworkSharedDeal } from "@/types";

// Interface for dashboard metrics
interface DashboardMetrics {
  newMatches: number;
  opportunitiesViewed: number;
  matchQualityPercentage: number;
  activeDealsCount: number;
}

// Fetch dashboard metrics for the current user
export const fetchDashboardMetrics = async (): Promise<DashboardMetrics> => {
  try {
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    if (sessionError) throw sessionError;
    
    const userId = sessionData.session?.user.id;
    if (!userId) {
      throw new Error("User not authenticated");
    }

    // First check if the user has metrics already
    const { data, error } = await supabase
      .from('dashboard_metrics')
      .select("*")
      .eq("user_id", userId)
      .single();

    if (error && error.code !== "PGRST116") { // PGRST116 means no rows returned
      throw error;
    }

    // If no metrics exist, create default metrics
    if (!data) {
      // Count active deals for the user
      const { count: activeDealsCount, error: countError } = await supabase
        .from("active_deals")
        .select("*", { count: "exact", head: true })
        .eq("user_id", userId);
        
      if (countError) throw countError;

      // Create default metrics
      const defaultMetrics = {
        user_id: userId,
        new_matches: 0,
        opportunities_viewed: 0,
        match_quality_percentage: 0,
        active_deals_count: activeDealsCount || 0
      };

      const { data: newData, error: insertError } = await supabase
        .from('dashboard_metrics')
        .insert(defaultMetrics)
        .select()
        .single();

      if (insertError) throw insertError;

      return {
        newMatches: newData.new_matches,
        opportunitiesViewed: newData.opportunities_viewed,
        matchQualityPercentage: newData.match_quality_percentage,
        activeDealsCount: newData.active_deals_count
      };
    }

    // Return existing metrics
    return {
      newMatches: data.new_matches,
      opportunitiesViewed: data.opportunities_viewed,
      matchQualityPercentage: data.match_quality_percentage,
      activeDealsCount: data.active_deals_count
    };
  } catch (error) {
    console.error("Error fetching dashboard metrics:", error);
    toast.error("Failed to load dashboard metrics");
    return {
      newMatches: 0,
      opportunitiesViewed: 0,
      matchQualityPercentage: 0,
      activeDealsCount: 0
    };
  }
};

// Update dashboard metrics
export const updateDashboardMetrics = async (metrics: Partial<DashboardMetrics>): Promise<boolean> => {
  try {
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    if (sessionError) throw sessionError;
    
    const userId = sessionData.session?.user.id;
    if (!userId) {
      throw new Error("User not authenticated");
    }

    // Convert from camelCase to snake_case
    const updateData: any = {};
    if (metrics.newMatches !== undefined) updateData.new_matches = metrics.newMatches;
    if (metrics.opportunitiesViewed !== undefined) updateData.opportunities_viewed = metrics.opportunitiesViewed;
    if (metrics.matchQualityPercentage !== undefined) updateData.match_quality_percentage = metrics.matchQualityPercentage;
    if (metrics.activeDealsCount !== undefined) updateData.active_deals_count = metrics.activeDealsCount;
    
    // Add updated_at timestamp
    updateData.updated_at = new Date().toISOString();

    const { error } = await supabase
      .from('dashboard_metrics')
      .update(updateData)
      .eq("user_id", userId);

    if (error) throw error;

    return true;
  } catch (error) {
    console.error("Error updating dashboard metrics:", error);
    toast.error("Failed to update dashboard metrics");
    return false;
  }
};

// Fetch network shared deals for display on dashboard
export const fetchNetworkSharedDeals = async (): Promise<NetworkSharedDeal[]> => {
  try {
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    if (sessionError) throw sessionError;
    
    const userId = sessionData.session?.user.id;
    if (!userId) {
      throw new Error("User not authenticated");
    }

    const { data, error } = await supabase
      .from('network_shared_deals')
      .select(`
        id,
        comment,
        created_at,
        shared_by_user_id,
        shared_with_user_id,
        opportunities (
          id,
          name,
          sector,
          stage,
          funding_amount
        ),
        investor_profiles!investor_profiles_shared_by_user_id_fkey (
          name,
          avatar_url
        )
      `)
      .eq("shared_with_user_id", userId)
      .order("created_at", { ascending: false })
      .limit(5);

    if (error) throw error;

    return data.map((item: any) => ({
      id: item.id,
      opportunityId: item.opportunities.id,
      opportunityName: item.opportunities.name,
      sector: item.opportunities.sector,
      stage: item.opportunities.stage,
      fundingAmount: item.opportunities.funding_amount,
      sharedBy: item.investor_profiles?.name || "Unknown Investor",
      avatar: item.investor_profiles?.avatar_url,
      comment: item.comment,
      sharedAt: item.created_at
    }));
  } catch (error) {
    console.error("Error fetching network shared deals:", error);
    toast.error("Failed to load shared deals");
    return [];
  }
};
