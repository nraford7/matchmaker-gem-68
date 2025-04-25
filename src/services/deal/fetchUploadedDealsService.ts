
import { supabase } from "@/integrations/supabase/client";
import { Deal } from "@/types/deal";

export const fetchUploadedDeals = async (): Promise<Deal[]> => {
  try {
    // Fetch deals uploaded by the current user
    const { data: userData, error: userError } = await supabase.auth.getUser();
    
    if (userError || !userData?.user) {
      throw new Error("User not authenticated");
    }
    
    const { data, error } = await supabase
      .from("deals")
      .select("*")
      .eq("uploaderId", userData.user.id);
      
    if (error) {
      throw new Error(error.message);
    }
    
    // Fix the type casting to avoid excessive depth error
    return (data || []) as Deal[];
  } catch (error) {
    console.error("Error fetching uploaded deals:", error);
    return [];
  }
};
