
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export type RegistrationStatus = "REGISTERED" | "APPROVED" | "REJECTED";

export interface DealInterestRegistration {
  id: string;
  user_id: string;
  deal_id: string;
  status: RegistrationStatus;
  created_at: string;
  updated_at?: string;
}

// Register interest in a deal
export const registerInterest = async (dealId: string): Promise<boolean> => {
  try {
    // Get current user
    const { data: userData, error: userError } = await supabase.auth.getUser();
    
    if (userError || !userData?.user) {
      toast.error("You must be logged in to register interest");
      return false;
    }

    const userId = userData.user.id;
    
    // Check if already registered
    const { data: existingReg, error: checkError } = await supabase
      .from("deal_interest_registrations")
      .select("*")
      .eq("user_id", userId)
      .eq("deal_id", dealId)
      .single();
      
    if (existingReg) {
      toast.info("You have already registered interest in this deal");
      return true;
    }

    // Get the deal to determine privacy level
    const { data: dealData, error: dealError } = await supabase
      .from("deals")
      .select("privacy_level")
      .eq("id", dealId)
      .single();
      
    if (dealError || !dealData) {
      throw new Error("Could not find deal");
    }

    // Determine initial status based on privacy level
    const initialStatus: RegistrationStatus = 
      dealData.privacy_level === "INVITATION_ONLY" ? "REGISTERED" : "APPROVED";

    // Register interest
    const { error } = await supabase
      .from("deal_interest_registrations")
      .insert({
        user_id: userId,
        deal_id: dealId,
        status: initialStatus
      });

    if (error) {
      throw error;
    }

    if (initialStatus === "REGISTERED") {
      toast.success("Interest registered. Awaiting approval from deal originator.");
    } else {
      toast.success("Interest registered. You now have access to the full details.");
    }
    
    return true;
  } catch (error) {
    console.error("Error registering interest:", error);
    toast.error("Failed to register interest");
    return false;
  }
};

// Check if a user has access to a deal's full details
export const checkDealAccess = async (dealId: string): Promise<{ hasAccess: boolean, status?: RegistrationStatus }> => {
  try {
    // Get current user
    const { data: userData, error: userError } = await supabase.auth.getUser();
    
    if (userError || !userData?.user) {
      return { hasAccess: false };
    }

    const userId = userData.user.id;
    
    // Get deal privacy level
    const { data: dealData, error: dealError } = await supabase
      .from("deals")
      .select("privacy_level, uploaderId")
      .eq("id", dealId)
      .single();
      
    if (dealError || !dealData) {
      throw new Error("Could not find deal");
    }

    // If deal is OPEN, everyone has access
    if (dealData.privacy_level === "OPEN") {
      return { hasAccess: true };
    }
    
    // If user is the uploader, they have access
    if (dealData.uploaderId === userId) {
      return { hasAccess: true };
    }

    // Check if user has registered interest
    const { data: registration, error: regError } = await supabase
      .from("deal_interest_registrations")
      .select("status")
      .eq("user_id", userId)
      .eq("deal_id", dealId)
      .single();

    if (regError || !registration) {
      return { hasAccess: false };
    }

    // If CONFIDENTIAL, any registration gives access
    if (dealData.privacy_level === "CONFIDENTIAL" && registration) {
      return { hasAccess: true, status: registration.status };
    }

    // If INVITATION_ONLY, only APPROVED registrations give access
    if (dealData.privacy_level === "INVITATION_ONLY" && registration.status === "APPROVED") {
      return { hasAccess: true, status: registration.status };
    }

    return { hasAccess: false, status: registration.status };
  } catch (error) {
    console.error("Error checking deal access:", error);
    return { hasAccess: false };
  }
};

// Approve interest registration (for deal originators)
export const approveInterest = async (registrationId: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from("deal_interest_registrations")
      .update({ status: "APPROVED", updated_at: new Date().toISOString() })
      .eq("id", registrationId);

    if (error) {
      throw error;
    }

    toast.success("Interest request approved");
    return true;
  } catch (error) {
    console.error("Error approving interest:", error);
    toast.error("Failed to approve interest request");
    return false;
  }
};

// Reject interest registration (for deal originators)
export const rejectInterest = async (registrationId: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from("deal_interest_registrations")
      .update({ status: "REJECTED", updated_at: new Date().toISOString() })
      .eq("id", registrationId);

    if (error) {
      throw error;
    }

    toast.success("Interest request rejected");
    return true;
  } catch (error) {
    console.error("Error rejecting interest:", error);
    toast.error("Failed to reject interest request");
    return false;
  }
};

// Get pending interest registrations for a deal (for deal originators)
export const getPendingRegistrations = async (dealId: string): Promise<any[]> => {
  try {
    const { data: userData, error: userError } = await supabase.auth.getUser();
    
    if (userError || !userData?.user) {
      return [];
    }

    const { data: deal, error: dealError } = await supabase
      .from("deals")
      .select("uploaderId")
      .eq("id", dealId)
      .single();
      
    if (dealError || !deal || deal.uploaderId !== userData.user.id) {
      // Only the deal uploader can see pending registrations
      return [];
    }

    const { data, error } = await supabase
      .from("deal_interest_registrations")
      .select(`
        *,
        profiles:user_id (
          id,
          name,
          email
        )
      `)
      .eq("deal_id", dealId)
      .eq("status", "REGISTERED");

    if (error) {
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error("Error fetching pending registrations:", error);
    return [];
  }
};
