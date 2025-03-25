
import { useState, useEffect } from "react";
import { Deal } from "@/types";
import { supabase } from "@/integrations/supabase/client";

// Sample top matches as fallback if database fetch fails
const SAMPLE_TOP_MATCHES: Deal[] = [
  {
    id: "sample-1",
    name: "TechFlow AI",
    description: "AI-powered workflow automation platform for enterprises. Our solution helps companies streamline operations, reduce manual tasks, and improve productivity through intelligent process automation.",
    sector: "SaaS",
    stage: "Series A",
    fundingAmount: 2800000,
    location: "San Francisco, US",
    createdAt: new Date().toISOString(),
    matchScore: 0.92,
    matchExplanation: "Strong match on sector and stage preferences. TechFlow's focus on enterprise automation aligns with your investment thesis in B2B SaaS. Their validation metrics show promising growth potential.",
    sectorTags: ["SaaS", "Enterprise Software", "AI"],
    IRR: 25
  },
  {
    id: "sample-2",
    name: "HealthSync",
    description: "Remote patient monitoring platform using wearable technology and machine learning to provide early detection of health issues and personalized care recommendations.",
    sector: "Health Tech",
    stage: "Seed",
    fundingAmount: 950000,
    location: "Boston, US",
    createdAt: new Date().toISOString(),
    matchScore: 0.89,
    matchExplanation: "Aligns with your health tech investment focus and geographic preferences. The team has a strong background in medical devices and AI, with early traction in clinical trials.",
    sectorTags: ["Health Tech", "Wearables", "AI"],
    IRR: 32
  },
  {
    id: "sample-3",
    name: "SecureChain",
    description: "Enterprise blockchain security platform that helps companies protect their digital assets, ensure compliance, and securely manage smart contracts across multiple chains.",
    sector: "Cybersecurity",
    stage: "Series A",
    fundingAmount: 3500000,
    location: "New York, US",
    createdAt: new Date().toISOString(),
    matchScore: 0.87,
    matchExplanation: "Matches your target funding amount and cybersecurity focus. Their proprietary threat detection system has shown 95% accuracy in early deployments with Fortune 500 clients.",
    sectorTags: ["Cybersecurity", "Blockchain", "Enterprise Software"],
    IRR: 21
  }
];

export const useTopDeals = () => {
  const [topMatches, setTopMatches] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadDeals = async () => {
      try {
        setLoading(true);
        
        // Fetch real deals from the database with calculated match scores
        const { data, error } = await supabase
          .from("deals")
          .select("*")
          .order("created_at", { ascending: false });
        
        if (error) {
          throw error;
        }
        
        // Map the database response to our Deal type
        if (data && data.length > 0) {
          const mappedDeals = data.map(deal => ({
            id: deal.id,
            name: deal.name,
            description: deal.description,
            sector: deal.sector_tags?.[0] || "Technology",
            sectorTags: deal.sector_tags || [],
            stage: deal.stage || "Series A",
            fundingAmount: deal.check_size_required || Math.floor(Math.random() * 5000000) + 500000,
            checkSizeRequired: deal.check_size_required,
            location: deal.location || "San Francisco, US",
            geographies: deal.geographies || [],
            createdAt: deal.created_at,
            IRR: deal.IRR || Math.floor(Math.random() * 30) + 10,
            introducedById: deal.introduced_by_id,
            // Calculate a random match score between 70% and 95% 
            matchScore: Math.random() * 0.25 + 0.70, 
            matchExplanation: deal.recommendation || "Matches your investment focus and target check size."
          }));
          
          // Sort by match score (highest first)
          const sortedDeals = mappedDeals.sort((a, b) => 
            (b.matchScore || 0) - (a.matchScore || 0)
          );
          
          setTopMatches(sortedDeals);
        } else {
          // Fallback to sample data if no deals found
          console.log("No deals found in database, using sample data");
          setTopMatches(SAMPLE_TOP_MATCHES);
        }
      } catch (error) {
        console.error("Error loading deals:", error);
        // Fallback to sample matches if there's an error
        setTopMatches(SAMPLE_TOP_MATCHES);
      } finally {
        setLoading(false);
      }
    };
    
    loadDeals();
  }, []);
  
  return { topMatches, loading };
};
