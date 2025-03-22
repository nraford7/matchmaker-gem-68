
import { supabase } from "@/integrations/supabase/client";
import { Investor } from "@/types";

// Function to fetch the current user's investor profile
export const fetchCurrentInvestorProfile = async (): Promise<Investor | null> => {
  try {
    const { data: session } = await supabase.auth.getSession();
    if (!session.session?.user) {
      console.error("No authenticated user found");
      return null;
    }

    const { data, error } = await supabase
      .from("investor_profiles")
      .select("*")
      .eq("id", session.session.user.id)
      .single();

    if (error) {
      console.error("Error fetching investor profile:", error);
      return null;
    }

    return data as Investor;
  } catch (error) {
    console.error("Error in fetchCurrentInvestorProfile:", error);
    return null;
  }
};

// Function to update an investor's profile
export const updateInvestorProfile = async (profile: Omit<Investor, "id">): Promise<boolean> => {
  try {
    const { data: session } = await supabase.auth.getSession();
    if (!session.session?.user) {
      console.error("No authenticated user found");
      return false;
    }

    const { error } = await supabase
      .from("investor_profiles")
      .update({
        name: profile.name,
        email: profile.email,
        company: profile.company,
        biography: profile.biography,
        preferredSectors: profile.preferredSectors,
        preferredStages: profile.preferredStages,
        checkSizeMin: profile.checkSizeMin,
        checkSizeMax: profile.checkSizeMax,
        preferredGeographies: profile.preferredGeographies,
        investmentThesis: profile.investmentThesis
      })
      .eq("id", session.session.user.id);

    if (error) {
      console.error("Error updating investor profile:", error);
      return false;
    }

    // If email or name was updated, update the user's metadata as well
    if (profile.name || profile.email) {
      const { error: updateError } = await supabase.auth.updateUser({
        email: profile.email,
        data: { 
          full_name: profile.name,
          company: profile.company 
        }
      });

      if (updateError) {
        console.error("Error updating user metadata:", updateError);
        return false;
      }
    }

    return true;
  } catch (error) {
    console.error("Error in updateInvestorProfile:", error);
    return false;
  }
};

// Function to fetch an investor profile by ID
export const fetchInvestorProfileById = async (id: string): Promise<Investor | null> => {
  try {
    const { data, error } = await supabase
      .from("investor_profiles")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching investor profile:", error);
      return null;
    }

    return data as Investor;
  } catch (error) {
    console.error("Error in fetchInvestorProfileById:", error);
    return null;
  }
};
