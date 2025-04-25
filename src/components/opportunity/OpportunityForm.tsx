
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { FileUploadSection } from "@/components/opportunity/FileUploadSection";
import { DeckViewer } from "@/components/opportunity/DeckViewer";
import { opportunitySchema, OpportunityFormValues } from "@/components/opportunity/types";
import { useDocumentProcessor } from "@/hooks/useDocumentProcessor";
import { toast } from "sonner";

export const OpportunityForm = () => {
  const [analysisCompleted, setAnalysisCompleted] = useState(false);
  
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

  const handleCancelUpload = () => {
    cancelProcess();
    toast.info("Process cancelled");
  };

  const handleAnalysisComplete = () => {
    setAnalysisCompleted(true);
    toast.success("Analysis completed");
  };

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
            onCancelUpload={handleCancelUpload}
            onStartAnalysis={() => {}}
          />
        )}

        {(isUploading || isUploaded) && (
          <DeckViewer 
            originalDeckUrl={documentUrl}
            isAnalyzing={false}
            isUploading={isUploading}
            uploadProgress={uploadProgress}
            onCancel={handleCancelUpload}
          />
        )}

        {/* We'll show form fields here after analysis if needed */}
        {analysisCompleted && (
          <div className="mt-8 text-center text-sm text-muted-foreground">
            Analysis complete. You can now create your opportunity.
          </div>
        )}
      </form>
    </Form>
  );
};
