
import React, { useRef, useEffect } from "react";
import { FileText, UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormLabel } from "@/components/ui/form";

interface FileUploadSectionProps {
  selectedFile: File | null;
  isProcessing: boolean;
  hasProcessed: boolean;
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  uploadProgress: number;
  isUploading: boolean;
  isAnalyzing: boolean;
  analysisProgress: number;
  error?: string;
  onCancelUpload: () => void;
  onStartAnalysis: () => void;
}

export const FileUploadSection: React.FC<FileUploadSectionProps> = ({
  selectedFile,
  isProcessing,
  hasProcessed,
  onFileChange,
  uploadProgress,
  isUploading,
  isAnalyzing,
  analysisProgress,
  error,
  onCancelUpload,
  onStartAnalysis
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isUploading && selectedFile && !isProcessing && !hasProcessed) {
      onStartAnalysis();
    }
  }, [isUploading, selectedFile, isProcessing, hasProcessed, onStartAnalysis]);

  const handleReplaceFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      fileInputRef.current.click();
    }
  };

  // Show initial upload UI if no file selected or if there's an error
  if (!selectedFile || error) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          <FormLabel htmlFor="pitchDeck" className="text-lg font-medium">Upload Pitch Document</FormLabel>
        </div>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <div className="flex flex-col items-center">
            <UploadCloud className="h-12 w-12 text-muted-foreground mb-3" />
            <p className="mb-3 text-muted-foreground">
              Drag and drop your pitch document (PDF, PPT, or Word), or
            </p>
            <Button type="button" variant="outline" onClick={handleReplaceFile}>
              Browse files
            </Button>
            <input
              ref={fileInputRef}
              id="pitchDeck"
              type="file"
              accept=".pdf,.ppt,.pptx,.doc,.docx"
              className="hidden"
              onChange={onFileChange}
            />
          </div>
          {error && (
            <p className="mt-4 text-sm text-destructive">
              {error}
            </p>
          )}
        </div>
        <p className="text-sm text-muted-foreground text-center">
          Supported formats: PDF, PowerPoint, Word documents
        </p>
      </div>
    );
  }

  return null;
};

