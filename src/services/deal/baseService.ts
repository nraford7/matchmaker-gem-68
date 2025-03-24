
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Helper to get current user session
export const getCurrentUserId = async (): Promise<string | null> => {
  try {
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    if (sessionError) {
      console.error("Error getting user session:", sessionError);
      throw sessionError;
    }
    
    const userId = sessionData.session?.user.id;
    if (!userId) {
      console.log("No user found in session");
      return null;
    }
    
    console.log("Current user ID:", userId);
    return userId;
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
};

// Helper to validate user authentication
export const validateUserAuth = (userId: string | null): boolean => {
  if (!userId) {
    console.log("User authentication validation failed");
    toast.error("Please login to continue");
    return false;
  }
  return true;
};
