import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { EnhancedDeal } from "@/types/deal";

// Fetch enhanced deal data by ID
export const fetchDealData = async (dealId: string): Promise<EnhancedDeal | null> => {
  try {
    const { data, error } = await supabase
      .from("deals")
      .select("*")
      .eq("id", dealId)
      .single();

    if (error) {
      toast.error("Failed to fetch deal data");
      console.error("Error fetching deal:", error);
      return null;
    }

    if (!data) {
      return null;
    }

    // Convert the raw data to our EnhancedDeal type
    // Cast JSON fields properly to Record<string, any>
    const deal: EnhancedDeal = {
      id: data.id,
      name: data.name,
      description: data.description,
      dealType: data.deal_type,
      checkSizeRequired: data.check_size_required,
      sectorTags: data.sector_tags,
      geographies: data.geographies,
      stage: data.stage,
      timeHorizon: data.time_horizon,
      esgTags: data.esg_tags,
      involvementModel: data.involvement_model,
      exitStyle: data.exit_style,
      dueDiligenceLevel: data.due_diligence_level,
      decisionConvictionRequired: data.decision_conviction_required,
      investorSpeedRequired: data.investor_speed_required,
      // Type conversion for JSON fields
      strategyProfile: data.strategy_profile ? (typeof data.strategy_profile === 'string' 
        ? JSON.parse(data.strategy_profile as string) 
        : data.strategy_profile as Record<string, any>),
      psychologicalFit: data.psychological_fit ? (typeof data.psychological_fit === 'string'
        ? JSON.parse(data.psychological_fit as string)
        : data.psychological_fit as Record<string, any>),
      createdAt: data.created_at,
      updatedAt: data.updated_at,
      
      // Add mock data for now - this can be updated later
      teamSize: 5,
      foundedYear: 2020,
      industry: data.sector_tags?.[0] || "Technology",
      businessModel: "SaaS",
      timeline: "12-18 months",
      revenue: "$500K - $1M",
      growth: "40% YoY",
      personalisedRecommendation: "This opportunity aligns with your investment focus in technology startups with strong growth potential.",
      
      // Mock team
      team: [
        { name: "John Smith", role: "CEO" },
        { name: "Emily Wong", role: "CTO" },
        { name: "David Garcia", role: "CFO" }
      ],
      
      // Mock use of funds
      use_of_funds: [
        { category: "Product Development", percentage: 40 },
        { category: "Marketing", percentage: 30 },
        { category: "Operations", percentage: 20 },
        { category: "Legal & Admin", percentage: 10 }
      ],
      
      // Mock milestones
      milestones: [
        { description: "Product Launch", timeline: "Q2 2023" },
        { description: "Series A Funding", timeline: "Q4 2023" },
        { description: "Market Expansion", timeline: "Q2 2024" }
      ],
      
      // Additional fields
      contactEmail: "contact@example.com",
      pitchDeckUrl: "https://example.com/pitch"
    };

    return deal;
  } catch (error) {
    console.error("Error in fetchDealData:", error);
    toast.error("Failed to load deal details");
    return null;
  }
};
