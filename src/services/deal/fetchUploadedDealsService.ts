
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
    
    // Cast the data to the Deal type
    const dealsData = data as unknown as Deal[];
    
    return dealsData || [];
  } catch (error) {
    console.error("Error fetching uploaded deals:", error);
    return [];
  }
};
