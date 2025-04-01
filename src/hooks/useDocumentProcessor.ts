
import { useState } from "react";
import { toast } from "sonner";
import { uploadFile, triggerMakeAutomation } from "@/services/fileUploadService";
import { UseFormReturn } from "react-hook-form";
import { MAKE_WEBHOOK_URL, OpportunityFormValues, Stakeholder } from "@/components/opportunity/types";

export const useDocumentProcessor = (
  form: UseFormReturn<OpportunityFormValues>,
  setStakeholders: React.Dispatch<React.SetStateAction<Stakeholder[]>>,
  setSelectedSectors: React.Dispatch<React.SetStateAction<string[]>>
) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasProcessed, setHasProcessed] = useState(false);
  const [documentUrl, setDocumentUrl] = useState<string | null>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setSelectedFile(file);
      
      await processDocument(file);
    }
  };

  const processDocument = async (file: File) => {
    setIsProcessing(true);
    
    try {
      const fileUrl = await uploadFile(file);
      if (!fileUrl) {
        throw new Error("Failed to upload file to storage");
      }
      
      setDocumentUrl(fileUrl);
      console.log("Document uploaded successfully:", fileUrl);
      
      const extractedData = await triggerMakeAutomation(fileUrl, MAKE_WEBHOOK_URL);
      
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
      });
      
      if (extractedData.stakeholders && Array.isArray(extractedData.stakeholders)) {
        setStakeholders(extractedData.stakeholders);
      }
      
      if (extractedData.sectors && Array.isArray(extractedData.sectors)) {
        setSelectedSectors(extractedData.sectors);
      }
      
      toast.success("Document processed successfully", {
        description: "We've analyzed your document and filled out the form. Please review and make any necessary corrections."
      });
      
      setHasProcessed(true);
    } catch (error) {
      console.error("Error processing document:", error);
      toast.error("Failed to process document", {
        description: "Please fill out the form manually"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    selectedFile,
    isProcessing,
    hasProcessed,
    documentUrl,
    handleFileChange
  };
};
