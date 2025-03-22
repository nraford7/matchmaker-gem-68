
import { supabase } from "@/integrations/supabase/client";
import { createSampleSharedDeals } from "@/services/investor";

// Helper function to create active deals for a new user
export const createSampleActiveDeals = async (userId: string) => {
  try {
    console.log("Creating sample active deals for user:", userId);
    
    // Get random opportunities
    const { data: opportunities } = await supabase
      .from("opportunities")
      .select("id, name")
      .limit(10);
      
    if (!opportunities || opportunities.length === 0) {
      console.error("No opportunities found for creating active deals");
      return false;
    }
    
    // Create 3 active deals
    const stages = ["Initial Review", "Due Diligence", "Term Sheet", "Final Negotiation"];
    const sampleNotes = [
      "Interesting technology with strong market potential",
      "Need to verify customer metrics and growth projections",
      "Team has impressive backgrounds, meeting scheduled for next week",
      "Waiting for financial documents and competitive analysis"
    ];
    
    const activeDeals = [];
    
    // Select 3 random opportunities for active deals
    const selectedOpps = opportunities.sort(() => 0.5 - Math.random()).slice(0, 3);
    
    for (let i = 0; i < selectedOpps.length; i++) {
      activeDeals.push({
        user_id: userId,
        opportunity_id: selectedOpps[i].id,
        stage: stages[Math.floor(Math.random() * stages.length)],
        notes: sampleNotes[Math.floor(Math.random() * sampleNotes.length)]
      });
    }
    
    const { error } = await supabase
      .from("active_deals")
      .insert(activeDeals);
      
    if (error) {
      console.error("Error creating sample active deals:", error);
      return false;
    }
    
    console.log(`Created ${activeDeals.length} sample active deals`);
    return true;
  } catch (error) {
    console.error("Error in createSampleActiveDeals:", error);
    return false;
  }
};

// Helper function to create saved opportunities for a new user
export const createSampleSavedDeals = async (userId: string) => {
  try {
    console.log("Creating sample saved deals for user:", userId);
    
    // Get random opportunities (different from active deals if possible)
    const { data: opportunities } = await supabase
      .from("opportunities")
      .select("id")
      .limit(20);
      
    if (!opportunities || opportunities.length === 0) {
      console.error("No opportunities found for creating saved deals");
      return false;
    }
    
    // Create 4 saved opportunities
    const savedDeals = [];
    
    // Select 4 random opportunities for saved deals
    const selectedOpps = opportunities.sort(() => 0.5 - Math.random()).slice(0, 4);
    
    for (let i = 0; i < selectedOpps.length; i++) {
      savedDeals.push({
        user_id: userId,
        opportunity_id: selectedOpps[i].id
      });
    }
    
    const { error } = await supabase
      .from("saved_opportunities")
      .insert(savedDeals);
      
    if (error) {
      console.error("Error creating sample saved deals:", error);
      return false;
    }
    
    console.log(`Created ${savedDeals.length} sample saved deals`);
    return true;
  } catch (error) {
    console.error("Error in createSampleSavedDeals:", error);
    return false;
  }
};

// Helper function to create past deals for a new user
export const createSamplePastDeals = async (userId: string) => {
  try {
    console.log("Creating sample past deals for user:", userId);
    
    // Get random opportunities (different from active and saved if possible)
    const { data: opportunities } = await supabase
      .from("opportunities")
      .select("id, funding_amount")
      .limit(15);
      
    if (!opportunities || opportunities.length === 0) {
      console.error("No opportunities found for creating past deals");
      return false;
    }
    
    // Create 3 past deals
    const pastDeals = [];
    const sampleNotes = [
      "Successfully closed this deal with favorable terms",
      "Great founding team, expecting strong returns",
      "Strategic investment in our core focus area",
      "Co-invested with top-tier VCs"
    ];
    
    // Select 3 random opportunities for past deals
    const selectedOpps = opportunities.sort(() => 0.5 - Math.random()).slice(0, 3);
    
    // Create dates from 1-12 months ago
    for (let i = 0; i < selectedOpps.length; i++) {
      const monthsAgo = Math.floor(Math.random() * 12) + 1;
      const completionDate = new Date();
      completionDate.setMonth(completionDate.getMonth() - monthsAgo);
      
      // Calculate a random investment amount (20-50% of the funding amount)
      const fundingAmount = Number(selectedOpps[i].funding_amount);
      const percentage = (Math.floor(Math.random() * 31) + 20) / 100; // 20-50%
      const investmentAmount = Math.round(fundingAmount * percentage);
      
      pastDeals.push({
        user_id: userId,
        opportunity_id: selectedOpps[i].id,
        final_amount: investmentAmount,
        completion_date: completionDate.toISOString(),
        notes: sampleNotes[Math.floor(Math.random() * sampleNotes.length)]
      });
    }
    
    const { error } = await supabase
      .from("past_deals")
      .insert(pastDeals);
      
    if (error) {
      console.error("Error creating sample past deals:", error);
      return false;
    }
    
    console.log(`Created ${pastDeals.length} sample past deals`);
    return true;
  } catch (error) {
    console.error("Error in createSamplePastDeals:", error);
    return false;
  }
};

// Helper function to make the user follow random investors
export const followRandomInvestors = async (userId: string) => {
  try {
    console.log("Setting up random investor follows for user:", userId);
    
    // Get random investors to follow
    const { data: investors } = await supabase
      .from("investor_profiles")
      .select("id")
      .neq("id", userId)
      .limit(20);
      
    if (!investors || investors.length === 0) {
      console.error("No investors found to follow");
      return false;
    }
    
    // Follow 4-6 random investors
    const followCount = Math.floor(Math.random() * 3) + 4; // 4-6
    const connections = [];
    
    // Select random investors to follow
    const selectedInvestors = investors.sort(() => 0.5 - Math.random()).slice(0, followCount);
    
    for (let i = 0; i < selectedInvestors.length; i++) {
      connections.push({
        follower_id: userId,
        following_id: selectedInvestors[i].id
      });
    }
    
    const { error } = await supabase
      .from("investor_connections")
      .insert(connections);
      
    if (error) {
      console.error("Error following random investors:", error);
      return false;
    }
    
    console.log(`Now following ${connections.length} random investors`);
    return true;
  } catch (error) {
    console.error("Error in followRandomInvestors:", error);
    return false;
  }
};

// Helper function to initialize sample data for a new user
export const initializeSampleData = async (userId: string) => {
  console.log("Creating sample data for new user");
  
  // Execute all sample data creation in parallel
  const [sharedDealsSuccess, activeDealsSuccess, savedDealsSuccess, pastDealsSuccess, followSuccess] = await Promise.all([
    createSampleSharedDeals(),
    createSampleActiveDeals(userId),
    createSampleSavedDeals(userId),
    createSamplePastDeals(userId),
    followRandomInvestors(userId)
  ]);
  
  return sharedDealsSuccess && activeDealsSuccess && savedDealsSuccess && pastDealsSuccess && followSuccess;
};
