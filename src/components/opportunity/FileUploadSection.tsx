
import React, { useState } from "react";
import { FileText, FileType, UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormLabel } from "@/components/ui/form";
import { FileUploadProgress } from "./FileUploadProgress";

interface FileUploadSectionProps {
  selectedFile: File | null;
  isProcessing: boolean;
  hasProcessed: boolean;
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  uploadProgress: number;
  isUploading: boolean;
  isUploaded: boolean;
  processingProgress: number;
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
  isUploaded,
  processingProgress,
  error,
  onCancelUpload,
  onStartAnalysis
}) => {
  if (selectedFile && (isUploading || isUploaded || isProcessing)) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          <FormLabel htmlFor="pitchDeck" className="text-lg font-medium">Upload Pitch Document</FormLabel>
        </div>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
          <FileUploadProgress
            fileName={selectedFile.name}
            uploadProgress={uploadProgress}
            isUploading={isUploading}
            isUploaded={isUploaded}
            isProcessing={isProcessing}
            processingProgress={processingProgress}
            onCancel={onCancelUpload}
            onStartAnalysis={onStartAnalysis}
            error={error}
          />
        </div>
      </div>
    );
  }

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
          <Button type="button" variant="outline" onClick={() => document.getElementById("pitchDeck")?.click()}>
            Browse files
          </Button>
          <input
            id="pitchDeck"
            type="file"
            accept=".pdf,.ppt,.pptx,.doc,.docx"
            className="hidden"
            onChange={onFileChange}
          />
          {hasProcessed && (
            <div className="mt-4 text-sm text-green-600">
              <span>✓ Document processed successfully. Click "Upload Opportunity" to continue.</span>
            </div>
          )}
        </div>
      </div>
      <p className="text-sm text-muted-foreground text-center">
        Supported formats: PDF, PowerPoint, Word documents
      </p>
    </div>
  );
};
