import { supabase } from "@/integrations/supabase/client";
import { Deal } from "@/types/deal";
import { toast } from "sonner";
import { getCurrentUserId, validateUserAuth } from "./baseService";
import { uploadFile } from "../file";

/**
 * Upload an opportunity with document processing
 */
export const uploadOpportunityWithDocument = async (
  opportunity: Omit<Deal, "id" | "createdAt">,
  document: File | null,
  makeWebhookUrl?: string
): Promise<string | null> => {
  try {
    // Validate authentication
    const userId = await getCurrentUserId();
    if (!userId) {
      toast.error("Authentication required to upload opportunities");
      return null;
    }

    console.log("Uploading opportunity for user:", userId);
    let documentUrl = null;

    // Handle document upload if provided
    if (document) {
      // First verify authentication
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData.session) {
        toast.error("Authentication required to upload documents");
        return null;
      }
      
      // Upload to pitch-documents bucket with progress tracking
      toast.info("Uploading document...");
      documentUrl = await uploadFile(
        document, 
        "pitch-documents", 
        (progress) => console.log(`Upload progress: ${progress}%`)
      );
      
      if (!documentUrl) {
        toast.error("Document upload failed");
        return null;
      }
      
      toast.success("Document uploaded successfully");
    }

    // Prepare opportunity data with document URL
    const opportunityData = {
      name: opportunity.name,
      description: opportunity.description,
      deal_type: opportunity.dealType,
      stage: opportunity.stage,
      check_size_required: opportunity.checkSizeRequired,
      geographies: opportunity.geographies,
      sector_tags: opportunity.sectorTags,
      pitch_deck: documentUrl,
      user_id: userId,
      location: opportunity.location,
      esg_tags: opportunity.esgTags,
      time_horizon: opportunity.timeHorizon
    };

    // Insert opportunity into database
    const { data, error } = await supabase
      .from("deals")
      .insert(opportunityData)
      .select("id")
      .single();

    if (error) {
      console.error("Error inserting opportunity:", error);
      toast.error("Failed to create opportunity");
      return null;
    }

    toast.success("Opportunity created successfully", {
      description: "Your opportunity is now visible to relevant investors"
    });
    
    return data.id;
  } catch (error) {
    console.error("Error creating opportunity:", error);
    toast.error("Failed to create opportunity");
    return null;
  }
};
