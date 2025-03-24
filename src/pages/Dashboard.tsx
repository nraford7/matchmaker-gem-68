
import { useState, useEffect } from "react";
import { Opportunity } from "@/types";
import { DashboardHeader } from "@/components/DashboardHeader";
import { fetchDeals } from "@/services/opportunity";
import { TopMatches, PerformanceMetricsSection } from "@/components/dashboard";
import { NetworkHighlights } from "@/components/network/NetworkHighlights";

// Sample top matches to display when no matches are found in the database
const SAMPLE_TOP_MATCHES: Opportunity[] = [
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

const Dashboard = () => {
  const [topMatches, setTopMatches] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  
  const loadDeals = async () => {
    try {
      // Fetch deals which include match scores
      const deals = await fetchDeals();
      
      // Filter for top matches
      const matches = deals.filter(o => (o.matchScore || 0) > 0.7);
      
      // If no top matches found in the database, use the sample matches
      if (matches.length === 0) {
        setTopMatches(SAMPLE_TOP_MATCHES);
      } else {
        setTopMatches(matches);
      }
    } catch (error) {
      console.error("Error loading deals:", error);
      // Fallback to sample matches if there's an error
      setTopMatches(SAMPLE_TOP_MATCHES);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    loadDeals();
  }, []);
  
  return (
    <div className="container mx-auto py-6">
      <DashboardHeader />
      
      <div className="grid gap-6 mb-6">
        <TopMatches topMatches={topMatches} loading={loading} />
        
        <NetworkHighlights />
      </div>
      
      <PerformanceMetricsSection />
    </div>
  );
};

export default Dashboard;
