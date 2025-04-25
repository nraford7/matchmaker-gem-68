
import { useState } from "react";
// Removed toast import
import { uploadFile, deleteFile } from "@/services/file";
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
    if (!files || files.length === 0) return;
    
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
      const fileUrl = await uploadFile(file, "pitch-documents", (progress) => {
        setUploadProgress(progress);
      });
      
      if (!fileUrl) {
        throw new Error("Failed to upload file to storage");
      }
      
      setUploadProgress(100);
      setTimeout(() => {
        setDocumentUrl(fileUrl);
        setIsUploading(false);
        setIsUploaded(true);
        // Removed success toast
      }, 500);
      
    } catch (error) {
      console.error("Error uploading document:", error);
      setError("Failed to upload document. Please check your connection and try again.");
      setIsUploading(false);
      setUploadProgress(0);
      // Removed error toast
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
    
    setSelectedFile(null);
    setDocumentUrl(null);
    setUploadProgress(0);
    setIsUploading(false);
    setIsUploaded(false);
    setError(undefined);
    
    // Removed info toast
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
