
import { useState } from "react";
import { triggerMakeAutomation } from "@/services/file";
import { UseFormReturn } from "react-hook-form";
import { MAKE_WEBHOOK_URL } from "@/config/constants";
import { OpportunityFormValues } from "@/components/opportunity/types";

interface AnalysisResult {
  name?: string;
  description?: string;
  sectors?: string[];
  stage?: string;
  fundingAmount?: number;
  location?: string;
  stakeholders?: Array<{ name: string; role: string; organization?: string }>;
}

export const useDocumentAnalysis = (
  form: UseFormReturn<OpportunityFormValues>,
) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasProcessed, setHasProcessed] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  
  const updateProgress = (targetProgress: number, duration: number = 2000) => {
    const startTime = Date.now();
    const startProgress = processingProgress;
    
    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progressRatio = Math.min(1, elapsed / duration);
      const newProgress = startProgress + (targetProgress - startProgress) * progressRatio;
      
      setProcessingProgress(Math.round(newProgress));
      
      if (progressRatio >= 1) {
        clearInterval(progressInterval);
      }
    }, 100);
    
    return () => clearInterval(progressInterval);
  };

  const startAnalysis = async (documentUrl: string | null) => {
    if (!documentUrl) {
      setAnalysisError("No document URL provided");
      return;
    }
    
    setIsProcessing(true);
    setProcessingProgress(0);
    setAnalysisError(null);
    
    const stopProgress = updateProgress(80);
    
    try {
      const extractedData = await triggerMakeAutomation(documentUrl, MAKE_WEBHOOK_URL) as AnalysisResult;
      stopProgress();
      setProcessingProgress(100);
      
      if (!extractedData) {
        setAnalysisError("Failed to extract data from document");
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
      
      setHasProcessed(true);
      setIsProcessing(false);
      
    } catch (error) {
      console.error("Error processing document:", error);
      stopProgress();
      setProcessingProgress(0);
      setAnalysisError("Failed to process document");
      setIsProcessing(false);
    }
  };

  const resetAnalysisState = () => {
    setIsProcessing(false);
    setHasProcessed(false);
    setProcessingProgress(0);
    setAnalysisError(null);
  };

  return {
    isProcessing,
    hasProcessed,
    processingProgress,
    analysisError,
    startAnalysis,
    resetAnalysisState,
    setHasProcessed
  };
};
