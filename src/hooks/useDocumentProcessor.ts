
import { UseFormReturn } from "react-hook-form";
import { OpportunityFormValues } from "@/components/opportunity/types";
import { useFileUpload } from "@/hooks/useFileUpload";
import { useState } from "react";
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

  const cancelProcess = async () => {
    await clearUpload();
    toast.info("Upload cancelled", {
      description: documentUrl ? "Your document was removed" : undefined
    });
  };

  return {
    selectedFile,
    documentUrl,
    uploadProgress,
    isUploading,
    isUploaded,
    error,
    handleFileChange,
    cancelProcess
  };
};

