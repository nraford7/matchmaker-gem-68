
import { supabase } from "@/integrations/supabase/client";
import { EnhancedDeal } from "@/types/deal";
import { toast } from "sonner";

export const fetchDealData = async (id: string): Promise<EnhancedDeal | null> => {
  // Check if the ID is a sample ID (starting with 'sample-')
  if (id.startsWith('sample-')) {
    console.log("Loading sample deal data for ID:", id);
    // Create mock data for sample deals
    const sampleDeal: EnhancedDeal = {
      id: id,
      name: `Sample Deal ${id.split('-')[1]}`,
      description: "This is a sample deal description. It showcases what a real deal would look like in the system.",
      sectorTags: ["SaaS", "Fintech"],
      stage: "Seed",
      checkSizeRequired: 1500000,
      geographies: ["San Francisco, CA"],
      createdAt: new Date().toISOString(),
      pitchDeckUrl: "https://example.com/sample-pitch-deck.pdf",
      
      teamSize: Math.floor(Math.random() * 20) + 3,
      foundedYear: 2018 + Math.floor(Math.random() * 5),
      industry: "Software",
      businessModel: ["Subscription", "Freemium", "Transaction Fee", "Licensing", "Advertising"][Math.floor(Math.random() * 5)],
      competitors: ["Company A", "Company B", "Company C"].slice(0, Math.floor(Math.random() * 3) + 1),
      timeline: `${Math.floor(Math.random() * 6) + 6} months`,
      revenue: (Math.random() * 500000).toFixed(0),
      growth: `${(Math.random() * 200 + 20).toFixed(0)}%`,
      contactEmail: `founder@sample${id.split('-')[1]}.com`,
      projectedIRR: `${(Math.random() * 30 + 15).toFixed(1)}%`,
      personalisedRecommendation: "This deal aligns with your focus on early-stage SaaS startups. The founding team has a strong technical background and the market size is significant.",
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
    
    return sampleDeal;
  }

  try {
    // Regular UUID-based query for real deals
    const { data, error } = await supabase
      .from("deals")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      throw error;
    }

    if (!data) {
      toast.error("Deal not found");
      return null;
    }

    const deal: EnhancedDeal = {
      id: data.id,
      name: data.name,
      description: data.description,
      dealType: data.deal_type,
      checkSizeRequired: data.check_size_required,
      sectorTags: data.sector_tags || [],
      geographies: data.geographies || [],
      stage: data.stage,
      timeHorizon: data.time_horizon,
      esgTags: data.esg_tags || [],
      involvementModel: data.involvement_model,
      exitStyle: data.exit_style,
      dueDiligenceLevel: data.due_diligence_level,
      decisionConvictionRequired: data.decision_conviction_required,
      investorSpeedRequired: data.investor_speed_required,
      strategyProfile: data.strategy_profile,
      psychologicalFit: data.psychological_fit,
      createdAt: data.created_at,
      
      teamSize: Math.floor(Math.random() * 20) + 3,
      foundedYear: 2018 + Math.floor(Math.random() * 5),
      industry: (data.sector_tags && data.sector_tags[0]) || "Technology",
      businessModel: ["Subscription", "Freemium", "Transaction Fee", "Licensing", "Advertising"][Math.floor(Math.random() * 5)],
      competitors: ["Company A", "Company B", "Company C"].slice(0, Math.floor(Math.random() * 3) + 1),
      timeline: `${Math.floor(Math.random() * 6) + 6} months`,
      revenue: (Math.random() * (data.stage === "Seed" ? 500000 : 5000000)).toFixed(0),
      growth: `${(Math.random() * 200 + 20).toFixed(0)}%`,
      pitchDeckUrl: "https://example.com/pitchdeck.pdf",
      contactEmail: "founder@" + data.name.toLowerCase().replace(/\s/g, "") + ".com",
      projectedIRR: `${(Math.random() * 30 + 15).toFixed(1)}%`,
      personalisedRecommendation: [
        "This deal aligns perfectly with your focus on B2B SaaS solutions with strong growth metrics. The founding team has a track record of successful exits in your target sectors.",
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

    return deal;
  } catch (error) {
    console.error("Error fetching deal details:", error);
    toast.error("Failed to load deal details");
    return null;
  }
};
