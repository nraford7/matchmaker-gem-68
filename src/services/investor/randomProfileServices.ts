
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
export const generateRandomProfile = (customData?: Partial<Omit<Investor, "id" | "name" | "email">>): Omit<Investor, "id" | "name" | "email"> => {
  const check_size_min = customData?.check_size_min || [50000, 100000, 250000, 500000, 1000000][Math.floor(Math.random() * 5)];
  const check_size_max = customData?.check_size_max || check_size_min * (Math.floor(Math.random() * 5) + 2);
  
  return {
    // Use snake_case property names for the Investor type
    sector_tags: customData?.sector_tags || getRandomItems(sectors, 2, 5),
    preferred_stages: customData?.preferred_stages || getRandomItems(stages, 1, 3),
    preferred_geographies: customData?.preferred_geographies || getRandomItems(geographies, 1, 3),
    check_size_min,
    check_size_max,
    investment_thesis: customData?.investment_thesis || theses[Math.floor(Math.random() * theses.length)],
    deal_count: 0 // Adding the required property
  };
};

// Create random investor profile for a user
export const createRandomInvestorProfile = async (
  userId: string, 
  name: string, 
  email: string, 
  customData?: Partial<Omit<Investor, "id" | "name" | "email">>
): Promise<boolean> => {
  try {
    console.log("Creating investor profile for user:", userId);
    
    const profile = generateRandomProfile(customData);
    
    const { error } = await supabase
      .from("investor_profiles")
      .upsert({
        id: userId,
        name: name,
        email: email,
        context_sectors: profile.sector_tags,
        preferred_stages: profile.preferred_stages,
        check_size_min: profile.check_size_min,
        check_size_max: profile.check_size_max,
        preferred_geographies: profile.preferred_geographies,
        investment_thesis: profile.investment_thesis,
        deal_count: Math.floor(Math.random() * 10) + 1 // Random deal count between 1-10
      });

    if (error) {
      console.error("Error creating investor profile:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error in createRandomInvestorProfile:", error);
    return false;
  }
};
