
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Opportunity } from "@/types";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import DealHeader from "@/components/deals/DealHeader";
import DealOverview from "@/components/deals/DealOverview";
import DealTeam from "@/components/deals/DealTeam";
import DealFundsUsage from "@/components/deals/DealFundsUsage";
import DealMilestones from "@/components/deals/DealMilestones";
import DealSidebar from "@/components/deals/DealSidebar";
import DealRecommendation from "@/components/deals/DealRecommendation";
import NotFoundState from "@/components/deals/NotFoundState";

export type EnhancedOpportunity = Opportunity & {
  teamSize?: number;
  foundedYear?: number;
  industry?: string;
  businessModel?: string;
  competitors?: string[];
  timeline?: string;
  revenue?: string;
  growth?: string;
  pitchDeckUrl?: string;
  contactEmail?: string;
  projectedIRR?: string;
  personalisedRecommendation?: string;
  team?: { name: string; role: string }[];
  use_of_funds?: { category: string; percentage: number }[];
  milestones?: { description: string; timeline: string }[];
};

const DealDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [dealData, setDealData] = useState<EnhancedOpportunity | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      navigate('/deals');
      return;
    }

    const fetchDealData = async () => {
      setIsLoading(true);
      try {
        // Check if the ID is a demo ID (starting with 'sample-')
        if (id.startsWith('sample-')) {
          console.log("Loading sample deal data for ID:", id);
          // Create mock data for sample deals
          const sampleDeal: EnhancedOpportunity = {
            id: id,
            name: `Sample Opportunity ${id.split('-')[1]}`,
            description: "This is a sample opportunity description. It showcases what a real opportunity would look like in the system.",
            sector: "SaaS",
            stage: "Seed",
            fundingAmount: 1500000,
            location: "San Francisco, CA",
            createdAt: new Date().toISOString(),
            pitchDeck: "https://example.com/sample-pitch-deck.pdf",
            
            teamSize: Math.floor(Math.random() * 20) + 3,
            foundedYear: 2018 + Math.floor(Math.random() * 5),
            industry: "Software",
            businessModel: ["Subscription", "Freemium", "Transaction Fee", "Licensing", "Advertising"][Math.floor(Math.random() * 5)],
            competitors: ["Company A", "Company B", "Company C"].slice(0, Math.floor(Math.random() * 3) + 1),
            timeline: `${Math.floor(Math.random() * 6) + 6} months`,
            revenue: (Math.random() * 500000).toFixed(0),
            growth: `${(Math.random() * 200 + 20).toFixed(0)}%`,
            pitchDeckUrl: "https://example.com/pitchdeck.pdf",
            contactEmail: `founder@sample${id.split('-')[1]}.com`,
            projectedIRR: `${(Math.random() * 30 + 15).toFixed(1)}%`,
            personalisedRecommendation: "This opportunity aligns with your focus on early-stage SaaS startups. The founding team has a strong technical background and the market size is significant.",
            team: [
              { name: "John Smith", role: "CEO & Co-founder" },
              { name: "Sarah Johnson", role: "CTO & Co-founder" },
              { name: "Michael Brown", role: "Head of Product" },
            ],
            use_of_funds: [
              { category: "Product Development", percentage: 40 },
              { category: "Marketing", percentage: 30 },
              { category: "Operations", percentage: 20 },
              { category: "Other", percentage: 10 }
            ],
            milestones: [
              { description: "Product Launch", timeline: "Q2 2023" },
              { description: "1,000 Customers", timeline: "Q4 2023" },
              { description: "$1M ARR", timeline: "Q2 2024" }
            ]
          };
          
          setDealData(sampleDeal);
          setIsLoading(false);
          return;
        }

        // Regular UUID-based query for real deals
        const { data, error } = await supabase
          .from("opportunities")
          .select("*")
          .eq("id", id)
          .single();

        if (error) {
          throw error;
        }

        if (!data) {
          toast.error("Deal not found");
          navigate('/deals');
          return;
        }

        const opportunity: any = {
          id: data.id,
          name: data.name,
          description: data.description,
          sector: data.sector,
          stage: data.stage,
          fundingAmount: Number(data.funding_amount),
          location: data.location,
          createdAt: data.created_at,
          pitchDeck: data.pitch_deck,
          
          teamSize: Math.floor(Math.random() * 20) + 3,
          foundedYear: 2018 + Math.floor(Math.random() * 5),
          industry: data.sector,
          businessModel: ["Subscription", "Freemium", "Transaction Fee", "Licensing", "Advertising"][Math.floor(Math.random() * 5)],
          competitors: ["Company A", "Company B", "Company C"].slice(0, Math.floor(Math.random() * 3) + 1),
          timeline: `${Math.floor(Math.random() * 6) + 6} months`,
          revenue: (Math.random() * (data.stage === "Seed" ? 500000 : 5000000)).toFixed(0),
          growth: `${(Math.random() * 200 + 20).toFixed(0)}%`,
          pitchDeckUrl: data.pitch_deck || "https://example.com/pitchdeck.pdf",
          contactEmail: "founder@" + data.name.toLowerCase().replace(/\s/g, "") + ".com",
          projectedIRR: `${(Math.random() * 30 + 15).toFixed(1)}%`,
          personalisedRecommendation: [
            "This opportunity aligns perfectly with your focus on B2B SaaS solutions with strong growth metrics. The founding team has a track record of successful exits in your target sectors.",
            "Based on your investment thesis around fintech infrastructure, this company's innovative approach to financial analytics creates strong synergies with your existing portfolio.",
            "The company's approach to healthcare technology matches your interest in digital health solutions. Their market timing and positioning could provide the returns you're looking for in this sector.",
            "With your stated interest in SaaS companies targeting enterprise customers, this opportunity offers an attractive entry point with its proven traction and reasonable valuation.",
            "This fits your geographical focus and stage preferences. Their business model aligns with your portfolio strategy of investing in recurring revenue businesses with clear paths to profitability."
          ][Math.floor(Math.random() * 5)],
          team: [
            { name: "John Smith", role: "CEO & Co-founder" },
            { name: "Sarah Johnson", role: "CTO & Co-founder" },
            { name: "Michael Brown", role: "Head of Product" },
          ].slice(0, Math.floor(Math.random() * 3) + 1),
          use_of_funds: [
            { category: "Product Development", percentage: Math.floor(Math.random() * 40) + 30 },
            { category: "Marketing", percentage: Math.floor(Math.random() * 30) + 20 },
            { category: "Operations", percentage: Math.floor(Math.random() * 20) + 10 },
            { category: "Other", percentage: Math.floor(Math.random() * 10) + 5 }
          ],
          milestones: [
            { description: "Product Launch", timeline: `Q${Math.floor(Math.random() * 4) + 1} 202${Math.floor(Math.random() * 3) + 3}` },
            { description: "1,000 Customers", timeline: `Q${Math.floor(Math.random() * 4) + 1} 202${Math.floor(Math.random() * 3) + 3}` },
            { description: "$1M ARR", timeline: `Q${Math.floor(Math.random() * 4) + 1} 202${Math.floor(Math.random() * 3) + 4}` }
          ].slice(0, Math.floor(Math.random() * 3) + 1)
        };

        setDealData(opportunity);
      } catch (error) {
        console.error("Error fetching deal details:", error);
        toast.error("Failed to load deal details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDealData();
  }, [id, navigate]);

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 max-w-6xl">
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2">Loading deal details...</span>
        </div>
      </div>
    );
  }

  if (!dealData) {
    return <NotFoundState />;
  }

  return (
    <div className="container mx-auto py-6 max-w-6xl">
      <div className="mb-6">
        <Button variant="ghost" size="sm" asChild className="mb-2">
          <Link to="/deals" className="flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" />
            Back to Deals
          </Link>
        </Button>
        
        <DealHeader deal={dealData} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <DealOverview deal={dealData} />
          
          {dealData.personalisedRecommendation && (
            <DealRecommendation recommendation={dealData.personalisedRecommendation} />
          )}
          
          {dealData.team && dealData.team.length > 0 && (
            <DealTeam team={dealData.team} />
          )}
          
          {dealData.use_of_funds && dealData.use_of_funds.length > 0 && (
            <DealFundsUsage useOfFunds={dealData.use_of_funds} />
          )}
          
          {dealData.milestones && dealData.milestones.length > 0 && (
            <DealMilestones milestones={dealData.milestones} />
          )}
        </div>
        
        <div className="space-y-6">
          <DealSidebar deal={dealData} />
        </div>
      </div>
    </div>
  );
};

export default DealDetails;
