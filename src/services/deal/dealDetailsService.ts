
import { supabase } from "@/integrations/supabase/client";
import { EnhancedDeal } from "@/types/deal";
import { parseJsonField } from "./utils/jsonUtils";

export const fetchDealData = async (id: string): Promise<EnhancedDeal | null> => {
  try {
    const { data, error } = await supabase
      .from("deals")
      .select("*")
      .eq("id", id)
      .single();
      
    if (error) {
      throw new Error(error.message);
    }
    
    if (!data) {
      return null;
    }

    // Map database columns to our EnhancedDeal type properties
    const enhancedDeal: EnhancedDeal = {
      id: data.id,
      name: data.name,
      description: data.description || "",
      dealType: data.deal_type,
      checkSizeRequired: data.check_size_required,
      sectorTags: data.sector_tags || [],
      geographies: data.geographies || [],
      location: data.location,
      stage: data.stage,
      timeHorizon: data.time_horizon,
      esgTags: data.esg_tags,
      involvementModel: data.involvement_model,
      exitStyle: data.exit_style,
      dueDiligenceLevel: data.due_diligence_level,
      decisionConvictionRequired: data.decision_conviction_required,
      investorSpeedRequired: data.investor_speed_required,
      strategyProfile: parseJsonField(data.strategy_profile),
      psychologicalFit: parseJsonField(data.psychological_fit),
      createdAt: data.created_at,
      updatedAt: data.updated_at,
      IRR: data.IRR,
      recommendation: data.recommendation,
      introducedById: data.introduced_by_id,
      privacyLevel: data.privacy_level || "OPEN",
      uploaderId: data.uploader_id,
      
      // Enhanced fields - use mock data if the fields don't exist in the database
      teamSize: data.team_size || 5,
      foundedYear: data.founded_year || 2020,
      industry: data.industry || data.sector_tags?.[0] || "Technology",
      businessModel: data.business_model || "SaaS",
      competitors: data.competitors || [],
      timeline: data.timeline || "12-18 months",
      revenue: data.revenue_info || "$500K - $1M",
      growth: data.growth_info || "40% YoY",
      pitchDeckUrl: data.pitch_deck_url || null,
      contactEmail: data.contact_email || null,
      projectedIRR: data.projected_irr || null,
      personalisedRecommendation: data.personalised_recommendation || 
        "This opportunity aligns with your investment focus.",
      
      // Mock team, use_of_funds, milestones if they don't exist in the database
      team: data.team_members || [
        { name: "John Smith", role: "CEO" },
        { name: "Emily Wong", role: "CTO" },
        { name: "David Garcia", role: "CFO" }
      ],
      use_of_funds: data.use_of_funds || [
        { category: "Product Development", percentage: 40 },
        { category: "Marketing", percentage: 30 },
        { category: "Operations", percentage: 20 },
        { category: "Legal & Admin", percentage: 10 }
      ],
      milestones: data.milestones || [
        { description: "Product Launch", timeline: "Q2 2023" },
        { description: "Series A Funding", timeline: "Q4 2023" },
        { description: "Market Expansion", timeline: "Q2 2024" }
      ]
    };

    return enhancedDeal;
  } catch (error) {
    console.error("Error fetching deal:", error);
    return null;
  }
};
