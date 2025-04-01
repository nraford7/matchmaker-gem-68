
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FileUploadSection } from "@/components/opportunity/FileUploadSection";
import { opportunitySchema, OpportunityFormValues } from "@/components/opportunity/types";
import { useDocumentProcessor } from "@/hooks/useDocumentProcessor";

export const OpportunityForm = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

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
            disabled={isSubmitting || isUploading || isProcessing}
          >
            {isSubmitting ? "Uploading..." : "Upload Opportunity"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
