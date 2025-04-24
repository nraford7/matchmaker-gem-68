import React from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Loader2, FileText, CheckCircle2, XCircle } from "lucide-react";

interface FileUploadProgressProps {
  fileName: string;
  uploadProgress: number;
  isUploading: boolean;
  isUploaded: boolean;
  isProcessing: boolean;
  processingProgress: number;
  onCancel: () => void;
  error?: string;
}

export const FileUploadProgress: React.FC<FileUploadProgressProps> = ({
  fileName,
  uploadProgress,
  isUploading,
  isUploaded,
  isProcessing,
  processingProgress,
  onCancel,
  error,
}) => {
  // Show upload progress
  if (isUploading) {
    return (
      <div className="space-y-4 animate-fade-in">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin text-primary" />
            <span className="font-medium">Uploading {fileName}</span>
          </div>
          <span className="text-sm text-muted-foreground">{uploadProgress}%</span>
        </div>
        <Progress value={uploadProgress} className="h-2" />
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="space-y-4 animate-fade-in">
        <div className="flex items-center gap-2 text-destructive">
          <XCircle className="h-5 w-5" />
          <span className="font-medium">Upload failed</span>
        </div>
        <p className="text-sm text-muted-foreground">{error}</p>
        <Button variant="outline" onClick={onCancel}>Try Again</Button>
      </div>
    );
  }

  // Show analysis progress after upload
  if (isUploaded) {
    return (
      <div className="space-y-4 animate-fade-in">
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-green-600" />
          <span className="font-medium text-green-600">{fileName}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin text-primary" />
            <span className="font-medium">Analysing and Creating Summary Deck with AI</span>
          </div>
          <span className="text-sm text-muted-foreground">{processingProgress}%</span>
        </div>
        <Progress value={processingProgress} className="h-2" />
        <Button variant="outline" onClick={onCancel} className="mt-4">Cancel</Button>
      </div>
    );
  }

  return null;
};
