
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
  onStartAnalysis: () => void;
  onReplaceFile: () => void;
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
  onStartAnalysis,
  onReplaceFile,
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

  // Show uploaded state waiting for analysis
  if (isUploaded && !isProcessing) {
    return (
      <div className="space-y-4 animate-fade-in">
        <div className="flex items-center gap-2 text-green-600">
          <CheckCircle2 className="h-5 w-5" />
          <span className="font-medium">File uploaded successfully</span>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <FileText className="h-4 w-4 text-primary" />
          <span className="text-sm">{fileName}</span>
        </div>
        <div className="flex gap-3 mt-4">
          <Button onClick={onStartAnalysis}>Analyze with AI</Button>
          <Button variant="secondary" onClick={onReplaceFile}>
            Replace File
          </Button>
          <Button variant="outline" onClick={onCancel}>Cancel</Button>
        </div>
      </div>
    );
  }

  // Show analysis in progress
  if (isProcessing) {
    return (
      <div className="space-y-4 animate-fade-in">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Loader2 className="h-5 w-5 animate-spin text-primary" />
            <span className="font-medium text-lg">Analysing the Pitch With AI</span>
          </div>
          <span className="text-sm text-muted-foreground">{processingProgress}%</span>
        </div>
        <Progress value={processingProgress} className="h-2" />
        <p className="text-sm text-muted-foreground">
          Our AI is extracting key information from your pitch document.
        </p>
        <Button variant="outline" onClick={onCancel}>Cancel Analysis</Button>
      </div>
    );
  }

  return null;
};
