
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { FileUploadSection } from "@/components/opportunity/FileUploadSection";
import { DeckViewer } from "@/components/opportunity/DeckViewer";
import { opportunitySchema, OpportunityFormValues } from "@/components/opportunity/types";
import { useDocumentProcessor } from "@/hooks/useDocumentProcessor";

export const OpportunityForm = () => {
  const form = useForm<OpportunityFormValues>({
    resolver: zodResolver(opportunitySchema),
    defaultValues: {
      name: "",
      description: "",
      sectors: [],
      stage: "",
      fundingAmount: 0,
      location: "",
      stakeholders: [],
    },
  });

  const { 
    selectedFile, 
    documentUrl,
    uploadProgress,
    isUploading,
    isUploaded,
    error,
    handleFileChange,
    cancelProcess
  } = useDocumentProcessor(form);

  return (
    <Form {...form}>
      <form className="space-y-6">
        {!isUploaded && (
          <FileUploadSection
            selectedFile={selectedFile}
            isProcessing={false}
            hasProcessed={isUploaded}
            onFileChange={handleFileChange}
            uploadProgress={uploadProgress}
            isUploading={isUploading}
            isAnalyzing={false}
            analysisProgress={0}
            error={error}
            onCancelUpload={cancelProcess}
            onStartAnalysis={() => {}}
          />
        )}

        {(isUploading || isUploaded) && (
          <DeckViewer 
            originalDeckUrl={documentUrl}
            isAnalyzing={false}
            isUploading={isUploading}
            uploadProgress={uploadProgress}
          />
        )}
      </form>
    </Form>
  );
};

