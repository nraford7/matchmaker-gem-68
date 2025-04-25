
import { supabase } from "@/integrations/supabase/client";

export const deleteDeal = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase.from("deals").delete().eq("id", id);

    if (error) {
      console.error("Error deleting deal:", error);
      return false;
    }

    return true;
  } catch (error: any) {
    console.error("Error in deleteDeal:", error.message);
    return false;
  }
};
