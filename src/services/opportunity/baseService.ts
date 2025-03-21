
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Helper to get current user session
export const getCurrentUserId = async (): Promise<string | null> => {
  try {
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    if (sessionError) throw sessionError;
    
    const userId = sessionData.session?.user.id;
    if (!userId) {
      return null;
    }
    
    return userId;
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
};

// Helper to validate user authentication
export const validateUserAuth = (userId: string | null): boolean => {
  if (!userId) {
    toast.error("Please login to continue");
    return false;
  }
  return true;
};
