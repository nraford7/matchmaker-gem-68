
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { FileUploadSection } from "@/components/opportunity/FileUploadSection";
import { DeckViewer } from "@/components/opportunity/DeckViewer";
import { opportunitySchema, OpportunityFormValues } from "@/components/opportunity/types";
import { useDocumentProcessor } from "@/hooks/useDocumentProcessor";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid"; // Add UUID for temporary deal IDs

export const OpportunityForm = () => {
  const [analysisCompleted, setAnalysisCompleted] = useState(false);
  const [tempDealId] = useState(() => uuidv4()); // Generate temporary deal ID
  
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
    processingState,
    uploadError,
    handleFileChange,
    cancelProcess
  } = useDocumentProcessor(form);

  const handleCancelUpload = () => {
    cancelProcess();
    toast.info("Process cancelled");
  };

  return (
    <Form {...form}>
      <form className="space-y-6">
        {processingState === 'idle' && (
          <FileUploadSection
            selectedFile={selectedFile}
            isProcessing={false}
            hasProcessed={analysisCompleted}
            onFileChange={handleFileChange}
            uploadProgress={uploadProgress}
            isUploading={false}
            isAnalyzing={false}
            analysisProgress={0}
            error={uploadError}
            onCancelUpload={handleCancelUpload}
            onStartAnalysis={() => {}}
          />
        )}

        {processingState !== 'idle' && (
          <DeckViewer 
            originalDeckUrl={documentUrl}
            isUploading={processingState === 'uploading'}
            uploadProgress={uploadProgress}
            onCancel={handleCancelUpload}
            dealId={tempDealId} // Pass the temporary deal ID
          />
        )}

        {analysisCompleted && (
          <div className="mt-8 text-center text-sm text-muted-foreground">
            Analysis complete. You can now create your opportunity.
          </div>
        )}
      </form>
    </Form>
  );
};
