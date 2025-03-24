
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Simple type for investor recipient
export interface InvestorRecipient {
  id: string;
  name: string;
  email: string;
  company?: string;
  avatarUrl?: string;
}

// Get a list of investors who can receive shared deals (simplified version)
export const getPotentialRecipients = async (): Promise<InvestorRecipient[]> => {
  try {
    const { data, error } = await supabase
      .from("investor_profiles")
      .select("id, name, email, company, avatar_url")
      .limit(50);

    if (error) {
      throw error;
    }

    return data.map(investor => ({
      id: investor.id,
      name: investor.name,
      email: investor.email,
      company: investor.company,
      avatarUrl: investor.avatar_url
    }));
  } catch (error) {
    console.error("Error fetching potential recipients:", error);
    toast.error("Failed to load investors for sharing");
    return [];
  }
};

// Find an investor by email
export const findInvestorByEmail = async (email: string): Promise<InvestorRecipient | null> => {
  try {
    const { data, error } = await supabase
      .from("investor_profiles")
      .select("id, name, email, company, avatar_url")
      .eq("email", email)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // Not found
        toast.error("No investor found with this email");
        return null;
      }
      throw error;
    }

    return {
      id: data.id,
      name: data.name,
      email: data.email,
      company: data.company,
      avatarUrl: data.avatar_url
    };
  } catch (error) {
    console.error("Error finding investor by email:", error);
    toast.error("Failed to find investor");
    return null;
  }
};
