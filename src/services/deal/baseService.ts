
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Get current user ID
export const getCurrentUserId = async (): Promise<string | null> => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    return session?.user.id || null;
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
};

// Validate if user is authenticated
export const validateUserAuth = (userId: string | null): boolean => {
  if (!userId) {
    toast.error("You must be logged in to perform this action");
    return false;
  }
  return true;
};
