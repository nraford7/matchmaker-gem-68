
import { useState } from "react";
import { toast } from "sonner";
import { uploadFile, triggerMakeAutomation } from "@/services/fileUploadService";
import { UseFormReturn } from "react-hook-form";
import { MAKE_WEBHOOK_URL, OpportunityFormValues } from "@/components/opportunity/types";

export const useDocumentProcessor = (
  form: UseFormReturn<OpportunityFormValues>,
) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasProcessed, setHasProcessed] = useState(false);
  const [documentUrl, setDocumentUrl] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [error, setError] = useState<string | undefined>(undefined);

  const simulateProgress = (
    setProgressFn: React.Dispatch<React.SetStateAction<number>>, 
    onComplete?: () => void,
    startAt: number = 0,
    duration: number = 3000
  ) => {
    let start = startAt;
    const interval = 100;
    const increment = (100 - startAt) / (duration / interval);
    
    const timer = setInterval(() => {
      start += increment;
      const roundedProgress = Math.min(Math.round(start), 99);
      setProgressFn(roundedProgress);
      
      if (roundedProgress >= 99) {
        clearInterval(timer);
        if (onComplete) onComplete();
      }
    }, interval);
    
    return () => clearInterval(timer);
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setSelectedFile(file);
      setIsUploading(true);
      setUploadProgress(0);
      setError(undefined);
      
      // Simulate initial upload progress
      const stopSimulation = simulateProgress(setUploadProgress, undefined, 0, 1500);
      
      try {
        // Simulate additional progress while actually uploading
        const fileUrl = await uploadFile(file);
        stopSimulation();
        setUploadProgress(100);
        
        if (!fileUrl) {
          throw new Error("Failed to upload file to storage");
        }
        
        setDocumentUrl(fileUrl);
        setIsUploading(false);
        setIsUploaded(true);
        console.log("Document uploaded successfully:", fileUrl);
        
        toast.success("Document uploaded successfully", {
          description: "You can now analyze it with AI"
        });
        
      } catch (error) {
        console.error("Error uploading document:", error);
        stopSimulation();
        setError("Failed to upload document. Please try again.");
        setIsUploading(false);
        toast.error("Failed to upload document", {
          description: "Please try again later"
        });
      }
    }
  };

  const startAnalysis = async () => {
    if (!documentUrl) return;
    
    setIsProcessing(true);
    setProcessingProgress(0);
    
    // Simulate processing progress
    const stopSimulation = simulateProgress(setProcessingProgress, undefined, 0, 5000);
    
    try {
      const extractedData = await triggerMakeAutomation(documentUrl, MAKE_WEBHOOK_URL);
      stopSimulation();
      setProcessingProgress(100);
      
      if (!extractedData) {
        toast.error("Failed to extract data from document", {
          description: "Please fill out the form manually"
        });
        setIsProcessing(false);
        return;
      }
      
      form.reset({
        name: extractedData.name || "",
        description: extractedData.description || "",
        sectors: extractedData.sectors || [],
        stage: extractedData.stage || "",
        fundingAmount: extractedData.fundingAmount || 0,
        location: extractedData.location || "",
        stakeholders: extractedData.stakeholders || [],
      });
      
      toast.success("Document processed successfully", {
        description: "We've analyzed your document and filled out the form."
      });
      
      setHasProcessed(true);
      setIsProcessing(false);
      
    } catch (error) {
      console.error("Error processing document:", error);
      stopSimulation();
      toast.error("Failed to process document", {
        description: "Please fill out the form manually"
      });
      setIsProcessing(false);
      setProcessingProgress(0);
    }
  };

  const cancelProcess = () => {
    setSelectedFile(null);
    setIsUploading(false);
    setIsUploaded(false);
    setIsProcessing(false);
    setUploadProgress(0);
    setProcessingProgress(0);
    setError(undefined);
    
    if (documentUrl) {
      toast.info("Upload cancelled", {
        description: "Your document was saved but not analyzed"
      });
    } else {
      toast.info("Upload cancelled");
    }
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
    startAnalysis,
    cancelProcess
  };
};
