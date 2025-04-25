import { useState } from "react";
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

    let progressInterval: NodeJS.Timeout;
    
    try {
      // Start smooth progress animation
      let simulatedProgress = 0;
      progressInterval = setInterval(() => {
        simulatedProgress += 2;
        if (simulatedProgress < 90) {
          setUploadProgress(simulatedProgress);
        }
      }, 100);

      const fileUrl = await uploadFile(file, "pitch-documents", (progress) => {
        if (progress > 90) {
          setUploadProgress(progress);
        }
      });
      
      clearInterval(progressInterval);
      
      if (!fileUrl) {
        throw new Error("Failed to upload file to storage");
      }
      
      setUploadProgress(100);
      setTimeout(() => {
        setDocumentUrl(fileUrl);
        setIsUploading(false);
        setIsUploaded(true);
      }, 500);
      
    } catch (error) {
      clearInterval(progressInterval);
      console.error("Error uploading document:", error);
      setError("Failed to upload document. Please check your connection and try again.");
      setIsUploading(false);
      setUploadProgress(0);
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
