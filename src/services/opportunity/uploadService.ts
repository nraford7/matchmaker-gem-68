
import { supabase } from "@/integrations/supabase/client";
import { Deal } from "@/types/deal";
import { toast } from "sonner";
import { getCurrentUserId, validateUserAuth } from "./baseService";
import { uploadFile } from "../fileUploadService";

/**
 * Upload an opportunity with document processing
 */
export const uploadOpportunityWithDocument = async (
  opportunity: Omit<Deal, "id" | "createdAt">,
  document: File | null,
  makeWebhookUrl?: string
): Promise<string | null> => {
  try {
    const userId = await getCurrentUserId();
    if (!validateUserAuth(userId)) {
      return null;
    }

    // If document is provided, upload it to the pitch-documents bucket
    let documentUrl = null;
    if (document) {
      documentUrl = await uploadFile(document, "pitch-documents");
    }

    // Add the document URL to the opportunity
    const opportunityWithDoc = {
      ...opportunity,
      pitchDeck: documentUrl,
      user_id: userId
    };

    // Insert the opportunity into the database
    const { data, error } = await supabase
      .from("deals")
      .insert({
        name: opportunityWithDoc.name,
        description: opportunityWithDoc.description,
        deal_type: opportunityWithDoc.dealType,
        stage: opportunityWithDoc.stage,
        check_size_required: opportunityWithDoc.checkSizeRequired,
        geographies: opportunityWithDoc.geographies,
        sector_tags: opportunityWithDoc.sectorTags,
        pitch_deck: opportunityWithDoc.pitchDeck,
        user_id: userId
      })
      .select("id")
      .single();

    if (error) {
      throw error;
    }

    toast.success("Opportunity created successfully");
    return data.id;
  } catch (error) {
    console.error("Error creating opportunity:", error);
    toast.error("Failed to create opportunity");
    return null;
  }
};
