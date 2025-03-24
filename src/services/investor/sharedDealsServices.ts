
import { supabase } from "@/integrations/supabase/client";
import { getCurrentUserId } from "./baseService";
import { Deal, InvestorConnection } from "@/types";
import { toast } from "sonner";

// Get deals shared with the current user
export const getSharedDeals = async (): Promise<Deal[]> => {
  const userId = await getCurrentUserId();
  
  if (!userId) {
    return [];
  }

  try {
    // This is a simplified query that would need to be adjusted based on your actual database schema
    // In a real app, you'd have a table that tracks shared deals
    const { data, error } = await supabase
      .from("network_shared_deals")
      .select("*, deals(*)")
      .eq("shared_with_user_id", userId);

    if (error) throw error;

    // Extract the deal data from the response
    const deals = data?.map(item => {
      const deal = item.deals;
      return {
        ...deal,
        id: deal.id,
        name: deal.name,
        description: deal.description,
        dealType: deal.deal_type,
        checkSizeRequired: deal.check_size_required,
        sectorTags: deal.sector_tags,
        sector_tags: deal.sector_tags,
        geographies: deal.geographies,
        stage: deal.stage,
        timeHorizon: deal.time_horizon,
        esgTags: deal.esg_tags,
        involvementModel: deal.involvement_model,
        exitStyle: deal.exit_style,
        dueDiligenceLevel: deal.due_diligence_level,
        decisionConvictionRequired: deal.decision_conviction_required,
        investorSpeedRequired: deal.investor_speed_required,
        strategyProfile: deal.strategy_profile,
        psychologicalFit: deal.psychological_fit,
        createdAt: deal.created_at,
        updatedAt: deal.updated_at
      };
    }) || [];
    
    return deals;
  } catch (error) {
    console.error("Error fetching shared deals:", error);
    return [];
  }
};

// Share a deal with connections
export const shareDealWithConnections = async (
  dealId: string, 
  connectionIds: string[]
): Promise<boolean> => {
  const userId = await getCurrentUserId();
  
  if (!userId) {
    return false;
  }

  try {
    // Build an array of records to insert
    const sharedRecords = connectionIds.map(connectionId => ({
      deal_id: dealId,
      shared_by_user_id: userId,
      shared_with_user_id: connectionId,
      created_at: new Date().toISOString()
    }));

    // Insert the sharing records
    const { error } = await supabase
      .from("network_shared_deals")
      .insert(sharedRecords);

    if (error) throw error;
    
    toast.success(`Deal shared with ${connectionIds.length} connections`);
    return true;
  } catch (error: any) {
    console.error("Error sharing deal:", error);
    toast.error(error.message || "Failed to share deal");
    return false;
  }
};

// Get user's network connections
export const getUserConnections = async (): Promise<InvestorConnection[]> => {
  const userId = await getCurrentUserId();
  
  if (!userId) {
    return [];
  }

  try {
    // Note: Adjust this query based on your actual database schema
    const { data, error } = await supabase
      .from("investor_connections")
      .select(`
        id,
        follower_id,
        following_id,
        created_at,
        investor_profiles:following_id(id, name, email, company, avatar_url)
      `)
      .eq("follower_id", userId);

    if (error) throw error;

    // Transform the data to the expected format
    const connections = data.map(connection => {
      const profile = connection.investor_profiles;
      return {
        id: connection.id,
        userId: connection.follower_id,
        connectionId: connection.following_id,
        status: "connected", // Assuming all connections are 'connected'
        createdAt: connection.created_at,
        connectionUser: {
          id: profile?.id,
          name: profile?.name,
          email: profile?.email,
          company: profile?.company,
          avatarUrl: profile?.avatar_url
        }
      };
    }) as InvestorConnection[];

    return connections;
  } catch (error) {
    console.error("Error fetching user connections:", error);
    return [];
  }
};
