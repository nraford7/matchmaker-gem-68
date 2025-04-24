
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FileUploadSection } from "@/components/opportunity/FileUploadSection";
import { DeckViewer } from "@/components/opportunity/DeckViewer";
import { opportunitySchema, OpportunityFormValues } from "@/components/opportunity/types";
import { useDocumentProcessor } from "@/hooks/useDocumentProcessor";

export const OpportunityForm = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    isProcessing, 
    hasProcessed, 
    documentUrl,
    uploadProgress,
    isUploading,
    isUploaded,
    processingProgress,
    error,
    handleFileChange,
    startAnalysis,
    cancelProcess
  } = useDocumentProcessor(form);

  const onSubmit = async (data: OpportunityFormValues) => {
    if (!selectedFile) {
      toast.error("Please select a file to upload");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      if (documentUrl) {
        console.log("Including document URL in submission:", documentUrl);
      }
      
      console.log("Form data:", data);
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success("Opportunity successfully uploaded", {
        description: "Your deal has been added to the platform",
      });
      
      navigate("/dashboard");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to upload opportunity", {
        description: "Please try again later",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Function to start deck analysis after document processing is complete
  const handleStartDeckAnalysis = () => {
    setIsAnalyzingDeck(true);
    setDeckAnalysisProgress(0);
    
    // Simulate progress for deck analysis
    const interval = setInterval(() => {
      setDeckAnalysisProgress(prev => {
        const newProgress = prev + Math.random() * 5;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsAnalyzingDeck(false);
            setIsDeckAnalysisComplete(true);
          }, 500);
          return 100;
        }
        return newProgress;
      });
    }, 300);
  };

  // After document processing, offer to analyze the deck for summaries
  const renderPostProcessingOptions = () => {
    if (!hasProcessed) return null;
    
    if (!isDeckAnalysisComplete && !isAnalyzingDeck) {
      return (
        <div className="mt-4 p-4 border border-primary/20 rounded-lg bg-primary/5">
          <h3 className="text-lg font-medium mb-2">Document Processed Successfully</h3>
          <p className="mb-4 text-sm text-muted-foreground">
            Would you like to create AI-powered summaries of your pitch deck?
          </p>
          <div className="flex gap-3">
            <Button 
              type="button" 
              onClick={handleStartDeckAnalysis}
              variant="default"
            >
              Create Deck Summaries
            </Button>
            <Button 
              type="button" 
              variant="outline"
              onClick={() => setIsDeckAnalysisComplete(true)}
            >
              Skip This Step
            </Button>
          </div>
        </div>
      );
    }
    
    return null;
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FileUploadSection
          selectedFile={selectedFile}
          isProcessing={isProcessing}
          hasProcessed={hasProcessed}
          onFileChange={handleFileChange}
          uploadProgress={uploadProgress}
          isUploading={isUploading}
          isUploaded={isUploaded}
          processingProgress={processingProgress}
          error={error}
          onCancelUpload={cancelProcess}
          onStartAnalysis={startAnalysis}
        />

        {renderPostProcessingOptions()}

        {(isAnalyzingDeck || isDeckAnalysisComplete) && (
          <DeckViewer 
            originalDeckUrl={documentUrl} 
            isAnalyzing={isAnalyzingDeck}
            analysisProgress={deckAnalysisProgress}
          />
        )}

        {hasProcessed && (
          <div className="flex justify-end gap-4 pt-4 border-t">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => navigate("/dashboard")}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting}
            >
              {isSubmitting ? "Uploading..." : "Upload Opportunity"}
            </Button>
          </div>
        )}
      </form>
    </Form>
  );
};
