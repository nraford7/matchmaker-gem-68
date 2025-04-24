
import { UseFormReturn } from "react-hook-form";
import { OpportunityFormValues } from "@/components/opportunity/types";
import { useFileUpload } from "@/hooks/useFileUpload";
import { useState } from "react";
import { toast } from "sonner";

export const useDocumentProcessor = (
  form: UseFormReturn<OpportunityFormValues>,
) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasProcessed, setHasProcessed] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);

  const { 
    selectedFile,
    documentUrl,
    uploadProgress,
    isUploading,
    isUploaded,
    error,
    handleFileChange,
    clearUpload,
  } = useFileUpload();

  const resetAnalysisState = () => {
    setIsProcessing(false);
    setHasProcessed(false);
    setProcessingProgress(0);
  };

  const cancelProcess = async () => {
    await clearUpload();
    resetAnalysisState();
    
    toast.info("Upload cancelled", {
      description: documentUrl ? "Your document was removed" : undefined
    });
  };

  return {
    selectedFile,
    isProcessing,
    hasProcessed,
    documentUrl,
    uploadProgress,
    isUploading,
    isUploaded,
    processingProgress,
    error,
    handleFileChange,
    cancelProcess,
    resetAnalysisState
  };
};
