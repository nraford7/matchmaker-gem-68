
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { FileUploadSection } from "@/components/opportunity/FileUploadSection";
import { DeckViewer } from "@/components/opportunity/DeckViewer";
import { opportunitySchema, OpportunityFormValues } from "@/components/opportunity/types";
import { useDocumentProcessor } from "@/hooks/useDocumentProcessor";
import { simulateProgress } from "@/utils/progressSimulation";

export const OpportunityForm = () => {
  const [isDeckAnalysisComplete, setIsDeckAnalysisComplete] = useState(false);
  const [isAnalyzingDeck, setIsAnalyzingDeck] = useState(false);
  const [deckAnalysisProgress, setDeckAnalysisProgress] = useState(0);

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

  useEffect(() => {
    if (isUploaded && !isAnalyzingDeck && !isDeckAnalysisComplete) {
      setIsAnalyzingDeck(true);
      simulateProgress(setDeckAnalysisProgress, () => {
        setIsAnalyzingDeck(false);
        setIsDeckAnalysisComplete(true);
      }, 0, 3000);
    }
  }, [isUploaded, isAnalyzingDeck, isDeckAnalysisComplete]);

  return (
    <Form {...form}>
      <form className="space-y-6">
        {!isDeckAnalysisComplete && (
          <FileUploadSection
            selectedFile={selectedFile}
            isProcessing={isAnalyzingDeck}
            hasProcessed={isDeckAnalysisComplete}
            onFileChange={handleFileChange}
            uploadProgress={uploadProgress}
            isUploading={isUploading}
            isAnalyzing={isAnalyzingDeck}
            analysisProgress={deckAnalysisProgress}
            error={error}
            onCancelUpload={cancelProcess}
            onStartAnalysis={() => {}}
          />
        )}

        {(isUploading || isAnalyzingDeck || isDeckAnalysisComplete) && (
          <DeckViewer 
            originalDeckUrl={documentUrl}
            isAnalyzing={isAnalyzingDeck}
            isUploading={isUploading}
            uploadProgress={uploadProgress}
            analysisProgress={deckAnalysisProgress}
          />
        )}
      </form>
    </Form>
  );
};
