
import { UseFormReturn } from "react-hook-form";
import { OpportunityFormValues } from "@/components/opportunity/types";
import { useFileUpload } from "@/hooks/useFileUpload";
import { useDocumentAnalysis } from "@/hooks/useDocumentAnalysis";
import { toast } from "sonner";

export const useDocumentProcessor = (
  form: UseFormReturn<OpportunityFormValues>,
) => {
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
  
  const {
    isProcessing,
    hasProcessed,
    processingProgress,
    startAnalysis,
    resetAnalysisState,
  } = useDocumentAnalysis(form);

  const onStartAnalysis = () => {
    startAnalysis(documentUrl);
  };

  // Start analysis automatically when upload completes
  if (isUploaded && !isProcessing && !hasProcessed) {
    onStartAnalysis();
  }

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
    startAnalysis: onStartAnalysis,
    cancelProcess
  };
};
