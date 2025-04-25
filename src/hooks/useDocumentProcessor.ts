
import { UseFormReturn } from "react-hook-form";
import { OpportunityFormValues } from "@/components/opportunity/types";
import { useFileUpload } from "@/hooks/useFileUpload";
import { useDocumentAnalysis } from "@/hooks/useDocumentAnalysis";
import { useState, useEffect } from "react";
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
    error: uploadError,
    handleFileChange,
    clearUpload,
  } = useFileUpload();

  const {
    isProcessing,
    hasProcessed,
    processingProgress,
    analysisError,
    startAnalysis,
    resetAnalysisState,
  } = useDocumentAnalysis(form);

  // Track the overall state of the document processing
  const [processingState, setProcessingState] = useState<
    'idle' | 'uploading' | 'analyzing' | 'completed' | 'error'
  >('idle');

  // Update the processing state based on the component states
  useEffect(() => {
    if (uploadError || analysisError) {
      setProcessingState('error');
    } else if (isUploading) {
      setProcessingState('uploading');
    } else if (isProcessing) {
      setProcessingState('analyzing');
    } else if (isUploaded && hasProcessed) {
      setProcessingState('completed');
    } else if (isUploaded && !isProcessing) {
      // Document is uploaded but analysis hasn't started yet
      startAnalysis(documentUrl);
      setProcessingState('analyzing');
    } else {
      setProcessingState('idle');
    }
  }, [
    isUploading,
    isUploaded,
    isProcessing,
    hasProcessed,
    uploadError,
    analysisError,
    documentUrl,
    startAnalysis
  ]);

  // Handle cancellation of the entire process
  const cancelProcess = async () => {
    await clearUpload();
    resetAnalysisState();
    setProcessingState('idle');
    toast.info("Process cancelled", {
      description: "You can upload a new document or fill out the form manually."
    });
  };

  return {
    selectedFile,
    documentUrl,
    uploadProgress,
    processingProgress,
    processingState,
    uploadError,
    analysisError,
    handleFileChange,
    cancelProcess,
    isUploaded
  };
};
