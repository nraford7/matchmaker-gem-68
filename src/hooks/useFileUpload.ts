import { useState } from "react";
import { toast } from "sonner";
import { uploadFile, deleteFile } from "@/services/fileUploadService";
import { useAuth } from "@/contexts/AuthContext";
import { simulateProgress } from "@/utils/progressSimulation";

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
      
      // If we're replacing a file, don't reset the UI completely
      const isReplacing = documentUrl !== null;
      
      // Delete the previous file if one exists
      if (documentUrl) {
        try {
          console.log("Deleting previously uploaded file before uploading new file");
          await deleteFile(documentUrl);
        } catch (error) {
          console.error("Error deleting previous file:", error);
          // Continue with upload even if delete fails
        }
      }
      
      setSelectedFile(file);
      setIsUploading(true);
      setUploadProgress(0);
      setError(undefined);
      setDocumentUrl(null); // Clear the previous document URL
      
      const stopSimulation = simulateProgress(setUploadProgress, undefined, 0, 1500);
      
      try {
        if (user) {
          console.log("File upload initiated by user:", user.id);
        } else {
          console.log("File upload initiated by anonymous user");
        }
        
        const fileUrl = await uploadFile(file);
        stopSimulation();
        
        if (!fileUrl) {
          setUploadProgress(0);
          throw new Error("Failed to upload file to storage");
        }
        
        setUploadProgress(100);
        setDocumentUrl(fileUrl);
        setIsUploading(false);
        setIsUploaded(true);
        console.log("Document uploaded successfully:", fileUrl);
        
        if (user) {
          console.log("File uploaded by user:", user.id);
        } else {
          console.log("File uploaded by anonymous user");
        }
        
      } catch (error) {
        console.error("Error uploading document:", error);
        stopSimulation();
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
