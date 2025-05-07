
import { supabase } from "@/integrations/supabase/client";
import { Deal } from "@/types/deal";
import { parseJsonField } from "./utils/jsonUtils";
import { checkDealAccess } from "../deal/interestRegistrationService";
import { anonymizeDeal } from "./anonymizationService";
import { toast } from "sonner";

// Fetch all deals
export const fetchAllDeals = async (): Promise<Deal[]> => {
  try {
    // Fetch all deals
    const { data, error } = await supabase
      .from("deals")
      .select("*")
      .order("created_at", { ascending: false });
      
    if (error) {
      throw new Error(error.message);
    }
    
    if (!data || data.length === 0) {
      return [];
    }

    // Map database columns to our Deal type properties
    const mappedDeals: Deal[] = data.map((item) => ({
      id: item.id,
      name: item.name,
      description: item.description || "",
      dealType: item.deal_type,
      checkSizeRequired: item.check_size_required,
      sectorTags: item.sector_tags || [],
      geographies: item.geographies || [],
      location: item.location,
      stage: item.stage,
      timeHorizon: item.time_horizon,
      esgTags: item.esg_tags,
      involvementModel: item.involvement_model,
      exitStyle: item.exit_style,
      dueDiligenceLevel: item.due_diligence_level,
      decisionConvictionRequired: item.decision_conviction_required,
      investorSpeedRequired: item.investor_speed_required,
      strategyProfile: parseJsonField(item.strategy_profile),
      psychologicalFit: parseJsonField(item.psychological_fit),
      createdAt: item.created_at,
      updatedAt: item.updated_at,
      IRR: item.IRR,
      recommendation: item.recommendation,
      introducedById: item.introduced_by_id,
      uploaderId: item.uploader_id,
      privacyLevel: item.privacy_level || "OPEN"
    }));

    // Process deals to respect privacy levels
    const processedDeals = await Promise.all(mappedDeals.map(async (deal) => {
      // If deal is open, no processing needed
      if (!deal.privacyLevel || deal.privacyLevel === "OPEN") {
        return deal;
      }
      
      // Check if user has access to this deal
      const { hasAccess } = await checkDealAccess(deal.id);
      
      // If user has access, show full details
      if (hasAccess) {
        return deal;
      }
      
      // Otherwise, anonymize the deal based on privacy level
      return anonymizeDeal(deal, deal.privacyLevel);
    }));

    return processedDeals;
  } catch (error) {
    console.error("Error fetching all deals:", error);
    toast.error("Failed to load deals");
    return [];
  }
};
