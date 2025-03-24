
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Investor } from "@/types";

// Sample data for random assignments
const sectors = ["Fintech", "Health Tech", "SaaS", "AI/ML", "Cybersecurity", 
  "EdTech", "CleanTech", "E-commerce", "Gaming", "IoT", 
  "Consumer Tech", "Enterprise Software"];

const stages = ["Pre-seed", "Seed", "Series A", "Series B", "Series C", "Growth"];

const geographies = ["United States", "Europe", "Asia", "Latin America", "Canada", 
  "United Kingdom", "Germany", "India", "Australia", "Japan"];

const theses = [
  "Investing in early-stage startups with strong technical founders and clear market vision.",
  "Focus on B2B SaaS companies that serve enterprise clients with innovative solutions.",
  "Looking for companies leveraging AI and machine learning to solve significant industry problems.",
  "Supporting founders building climate tech and sustainable solutions for a better future.",
  "Interested in healthcare innovations that improve patient outcomes and reduce costs.",
  "Backing companies that are reimagining financial services for underserved populations.",
  "Investing in technologies that enhance productivity and efficiency in traditional industries."
];

// Helper to get random items from an array
const getRandomItems = (array: string[], min: number, max: number): string[] => {
  const count = Math.floor(Math.random() * (max - min + 1)) + min;
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Generate random investor preferences
export const generateRandomProfile = (): Omit<Investor, "id" | "name" | "email"> => {
  const checkSizeMin = [50000, 100000, 250000, 500000, 1000000][Math.floor(Math.random() * 5)];
  const checkSizeMax = checkSizeMin * (Math.floor(Math.random() * 5) + 2);
  
  return {
    contextSectors: getRandomItems(sectors, 2, 5),
    preferredStages: getRandomItems(stages, 1, 3),
    preferredGeographies: getRandomItems(geographies, 1, 3),
    checkSizeMin,
    checkSizeMax,
    investmentThesis: theses[Math.floor(Math.random() * theses.length)]
  };
};

// Create random investor profile for a user
export const createRandomInvestorProfile = async (userId: string, name: string, email: string): Promise<boolean> => {
  try {
    console.log("Creating random investor profile for user:", userId);
    
    const profile = generateRandomProfile();
    
    const { error } = await supabase
      .from("investor_profiles")
      .upsert({
        id: userId,
        name: name,
        email: email,
        context_sectors: profile.contextSectors,
        preferred_stages: profile.preferredStages,
        check_size_min: profile.checkSizeMin,
        check_size_max: profile.checkSizeMax,
        preferred_geographies: profile.preferredGeographies,
        investment_thesis: profile.investmentThesis,
        deal_count: Math.floor(Math.random() * 10) + 1 // Random deal count between 1-10
      });

    if (error) {
      console.error("Error creating random investor profile:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error in createRandomInvestorProfile:", error);
    return false;
  }
};
