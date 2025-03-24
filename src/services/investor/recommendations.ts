
import { supabase } from "@/integrations/supabase/client";
import { NetworkInvestor } from "@/types";
import { toast } from "sonner";
import { createRandomInvestorProfile } from "./randomProfileServices";

// Function to fetch recommendations for a specific user
export const fetchRecommendationsForUser = async (userId: string): Promise<NetworkInvestor[]> => {
  try {
    // Implementation details would go here for fetching actual recommendations
    // This is a placeholder that would be implemented based on application needs
    return [];
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    return [];
  }
};

// Function to generate 50 random investor profiles
export const generateRandomInvestors = async (): Promise<boolean> => {
  try {
    // Fetch existing profiles to ensure we're not creating duplicates
    const { data: existingProfiles } = await supabase
      .from("investor_profiles")
      .select("id")
      .limit(1000);
    
    const existingCount = existingProfiles?.length || 0;
    console.log(`Found ${existingCount} existing investor profiles`);
    
    // Generate 50 random profiles
    const targetCount = 50;
    let successCount = 0;
    let failCount = 0;
    
    toast.info(`Generating ${targetCount} random investor profiles...`);
    
    for (let i = 0; i < targetCount; i++) {
      // Generate a random UUID for each new investor
      const randomId = crypto.randomUUID();
      const randomName = `Investor ${existingCount + i + 1}`;
      const randomEmail = `investor${existingCount + i + 1}@example.com`;
      
      // Create the random profile
      const success = await createRandomInvestorProfile(
        randomId,
        randomName, 
        randomEmail
      );
      
      if (success) {
        successCount++;
      } else {
        failCount++;
      }
      
      // Add a small delay to avoid overloading the database
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    console.log(`Successfully created ${successCount} random investor profiles. Failed: ${failCount}`);
    toast.success(`Created ${successCount} random investor profiles!`);
    
    return successCount > 0;
  } catch (error) {
    console.error("Error generating random investors:", error);
    toast.error("Failed to create random investors");
    return false;
  }
};
