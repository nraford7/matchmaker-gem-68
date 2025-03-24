
import { supabase } from "@/integrations/supabase/client";
import { getCurrentUserId, validateUserAuth } from "./baseService";
import { Deal, InvestorConnection } from "@/types";
import { toast } from "sonner";

// Get deals shared with the current user
export const getSharedDeals = async (): Promise<Deal[]> => {
  const userId = await getCurrentUserId();
  
  if (!validateUserAuth(userId)) {
    return [];
  }

  try {
    // This is a simplified query that would need to be adjusted based on your actual database schema
    // In a real app, you'd have a table that tracks shared deals
    const { data, error } = await supabase
      .from("shared_deals")
      .select("*, deals(*)")
      .eq("shared_with", userId);

    if (error) throw error;

    // Extract the deal data from the response
    const deals = data?.map(item => item.deals) || [];
    return deals as Deal[];
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
  
  if (!validateUserAuth(userId)) {
    return false;
  }

  try {
    // Build an array of records to insert
    const sharedRecords = connectionIds.map(connectionId => ({
      deal_id: dealId,
      shared_by: userId,
      shared_with: connectionId,
      created_at: new Date().toISOString()
    }));

    // Insert the sharing records
    const { error } = await supabase
      .from("shared_deals")
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
  
  if (!validateUserAuth(userId)) {
    return [];
  }

  try {
    // Note: Adjust this query based on your actual database schema
    const { data, error } = await supabase
      .from("investor_connections")
      .select(`
        id,
        user_id,
        connection_id,
        status,
        created_at,
        profiles:connection_id(id, full_name, email, company, avatar_url)
      `)
      .eq("user_id", userId)
      .eq("status", "connected");

    if (error) throw error;

    // Transform the data to the expected format
    const connections = data.map(connection => {
      const profile = connection.profiles;
      return {
        id: connection.id,
        userId: connection.user_id,
        connectionId: connection.connection_id,
        status: connection.status,
        createdAt: connection.created_at,
        connectionUser: {
          id: profile?.id,
          name: profile?.full_name,
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
