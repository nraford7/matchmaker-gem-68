import { useState } from "react";
import { toast } from "sonner";
import { uploadFile, deleteFile } from "@/services/fileUploadService";
import { useAuth } from "@/contexts/AuthContext";

export const useFileUpload = () => {
  const { user } = useAuth();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [documentUrl, setDocumentUrl] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      
      if (documentUrl) {
        try {
          await deleteFile(documentUrl);
        } catch (error) {
          console.error("Error deleting previous file:", error);
        }
      }
      
      setSelectedFile(file);
      setIsUploading(true);
      setUploadProgress(0);
      setError(undefined);
      setDocumentUrl(null);
      
      try {
        const fileUrl = await uploadFile(file);
        
        if (!fileUrl) {
          throw new Error("Failed to upload file to storage");
        }
        
        setUploadProgress(100);
        setDocumentUrl(fileUrl);
        setIsUploading(false);
        setIsUploaded(true);
        
      } catch (error) {
        console.error("Error uploading document:", error);
        setError("Failed to upload document. Please check your connection and try again.");
        setIsUploading(false);
        toast.error("Failed to upload document", {
          description: "There might be an issue with storage permissions"
        });
      }
    }
  };

  const clearUpload = async () => {
    if (documentUrl) {
      try {
        console.log("Attempting to delete file:", documentUrl);
        const deleted = await deleteFile(documentUrl);
        if (deleted) {
          console.log("File was deleted from storage");
        } else {
          console.warn("Could not delete file from storage");
        }
      } catch (error) {
        console.error("Error deleting file:", error);
      }
    }
    
    // Reset all upload-related state variables
    setSelectedFile(null);
    setIsUploading(false);
    setIsUploaded(false);
    setUploadProgress(0);
    setDocumentUrl(null);
  };

  return {
    selectedFile,
    documentUrl,
    uploadProgress,
    isUploading,
    isUploaded,
    error,
    handleFileChange,
    clearUpload,
    setIsUploaded
  };
};
