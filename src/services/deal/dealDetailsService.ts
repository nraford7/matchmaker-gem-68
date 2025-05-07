
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
    return {
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
      // Enhanced fields
      teamSize: data.team_size,
      foundedYear: data.founded_year,
      industry: data.industry,
      businessModel: data.business_model,
      competitors: data.competitors,
      timeline: data.timeline,
      revenue: data.revenue_info,
      growth: data.growth_info,
      pitchDeckUrl: data.pitch_deck_url,
      contactEmail: data.contact_email,
      projectedIRR: data.projected_irr,
      personalisedRecommendation: data.personalised_recommendation,
      team: data.team_members,
      use_of_funds: data.use_of_funds,
      milestones: data.milestones
    };
  } catch (error) {
    console.error("Error fetching deal:", error);
    return null;
  }
};
