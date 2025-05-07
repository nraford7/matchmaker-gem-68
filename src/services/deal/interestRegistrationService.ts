
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
    
    // Check if already registered - using RPC call to avoid direct table access issues
    const { data: existingReg, error: checkError } = await supabase
      .rpc('check_interest_registration', {
        user_id_param: userId,
        deal_id_param: dealId
      });
      
    if (existingReg && existingReg.length > 0) {
      toast.info("You have already registered interest in this deal");
      return true;
    }

    // Get the deal to determine privacy level - using RPC call
    const { data: dealData, error: dealError } = await supabase
      .rpc('get_deal_privacy_level', {
        deal_id_param: dealId
      });
      
    if (dealError || !dealData) {
      throw new Error("Could not find deal");
    }

    // Determine initial status based on privacy level
    const initialStatus: RegistrationStatus = 
      dealData.privacy_level === "INVITATION_ONLY" ? "REGISTERED" : "APPROVED";

    // Register interest - using RPC call
    const { error } = await supabase
      .rpc('register_interest_in_deal', {
        user_id_param: userId,
        deal_id_param: dealId,
        status_param: initialStatus
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
    
    // Get deal privacy level using RPC call
    const { data: dealData, error: dealError } = await supabase
      .rpc('get_deal_with_privacy', {
        deal_id_param: dealId
      });
      
    if (dealError || !dealData) {
      throw new Error("Could not find deal");
    }

    // If deal is OPEN, everyone has access
    if (dealData.privacy_level === "OPEN") {
      return { hasAccess: true };
    }
    
    // If user is the uploader, they have access
    if (dealData.uploader_id === userId) {
      return { hasAccess: true };
    }

    // Check if user has registered interest using RPC call
    const { data: registration, error: regError } = await supabase
      .rpc('check_interest_status', {
        user_id_param: userId,
        deal_id_param: dealId
      });

    if (regError || !registration || registration.length === 0) {
      return { hasAccess: false };
    }

    const registrationStatus = registration[0].status as RegistrationStatus;

    // If CONFIDENTIAL, any registration gives access
    if (dealData.privacy_level === "CONFIDENTIAL" && registration) {
      return { hasAccess: true, status: registrationStatus };
    }

    // If INVITATION_ONLY, only APPROVED registrations give access
    if (dealData.privacy_level === "INVITATION_ONLY" && registrationStatus === "APPROVED") {
      return { hasAccess: true, status: registrationStatus };
    }

    return { hasAccess: false, status: registrationStatus };
  } catch (error) {
    console.error("Error checking deal access:", error);
    return { hasAccess: false };
  }
};

// The remaining functions (approveInterest, rejectInterest, getPendingRegistrations)
// need similar changes to use RPC calls instead of direct table access.
// For this patch, we'll focus on the core functionality first.

// Approve interest registration (for deal originators) - via RPC
export const approveInterest = async (registrationId: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .rpc('approve_interest_registration', {
        registration_id_param: registrationId
      });

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

// Reject interest registration (for deal originators) - via RPC
export const rejectInterest = async (registrationId: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .rpc('reject_interest_registration', {
        registration_id_param: registrationId
      });

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

// Get pending interest registrations for a deal (for deal originators) - via RPC
export const getPendingRegistrations = async (dealId: string): Promise<any[]> => {
  try {
    const { data: userData, error: userError } = await supabase.auth.getUser();
    
    if (userError || !userData?.user) {
      return [];
    }

    // Check if current user is the deal uploader
    const { data: dealData, error: dealError } = await supabase
      .rpc('check_deal_ownership', {
        deal_id_param: dealId,
        user_id_param: userData.user.id
      });
      
    if (dealError || !dealData || !dealData.is_owner) {
      // Only the deal uploader can see pending registrations
      return [];
    }

    // Get pending registrations
    const { data, error } = await supabase
      .rpc('get_pending_registrations', {
        deal_id_param: dealId
      });

    if (error) {
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error("Error fetching pending registrations:", error);
    return [];
  }
};
