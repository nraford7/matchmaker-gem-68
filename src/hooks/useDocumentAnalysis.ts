
import { useState } from "react";
import { toast } from "sonner";
import { triggerMakeAutomation } from "@/services/fileUploadService";
import { UseFormReturn } from "react-hook-form";
import { MAKE_WEBHOOK_URL, OpportunityFormValues } from "@/components/opportunity/types";
import { simulateProgress } from "@/utils/progressSimulation";

export const useDocumentAnalysis = (
  form: UseFormReturn<OpportunityFormValues>,
) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasProcessed, setHasProcessed] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);

  const startAnalysis = async (documentUrl: string | null) => {
    if (!documentUrl) return;
    
    setIsProcessing(true);
    setProcessingProgress(0);
    
    const stopSimulation = simulateProgress(setProcessingProgress, undefined, 0, 5000);
    
    try {
      const extractedData = await triggerMakeAutomation(documentUrl, MAKE_WEBHOOK_URL);
      stopSimulation();
      setProcessingProgress(100);
      
      if (!extractedData) {
        toast.error("Failed to extract data from document", {
          description: "Please fill out the form manually"
        });
        setIsProcessing(false);
        return;
      }
      
      form.reset({
        name: extractedData.name || "",
        description: extractedData.description || "",
        sectors: extractedData.sectors || [],
        stage: extractedData.stage || "",
        fundingAmount: extractedData.fundingAmount || 0,
        location: extractedData.location || "",
        stakeholders: extractedData.stakeholders || [],
      });
      
      toast.success("Document processed successfully", {
        description: "We've analyzed your document and filled out the form."
      });
      
      setHasProcessed(true);
      setIsProcessing(false);
      
    } catch (error) {
      console.error("Error processing document:", error);
      stopSimulation();
      toast.error("Failed to process document", {
        description: "Please fill out the form manually"
      });
      setIsProcessing(false);
      setProcessingProgress(0);
    }
  };

  const resetAnalysisState = () => {
    setIsProcessing(false);
    setHasProcessed(false);
    setProcessingProgress(0);
  };

  return {
    isProcessing,
    hasProcessed,
    processingProgress,
    startAnalysis,
    resetAnalysisState,
    setHasProcessed
  };
};
