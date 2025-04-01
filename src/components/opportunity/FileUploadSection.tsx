
import React, { useRef } from "react";
import { FileText, UploadCloud } from "lucide-react";
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
  // Create a ref to the file input
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleReplaceFile = () => {
    // Using the ref to access the file input element directly
    if (fileInputRef.current) {
      // Reset the value to ensure onChange triggers even if selecting the same file again
      fileInputRef.current.value = "";
      fileInputRef.current.click();
    }
  };

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
            onReplaceFile={handleReplaceFile}
            error={error}
          />
          {/* Hidden file input accessible via ref */}
          <input
            ref={fileInputRef}
            id="pitchDeck"
            type="file"
            accept=".pdf,.ppt,.pptx,.doc,.docx"
            className="hidden"
            onChange={onFileChange}
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
        {!selectedFile ? (
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
        ) : (
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="h-5 w-5 text-primary" />
              <span className="font-medium">{selectedFile.name}</span>
            </div>
            <div className="flex gap-3">
              <Button type="button" onClick={onStartAnalysis}>
                Analyze with AI
              </Button>
              <Button type="button" variant="secondary" onClick={handleReplaceFile}>
                Replace File
              </Button>
              <Button type="button" variant="outline" onClick={onCancelUpload}>
                Cancel
              </Button>
            </div>
            <input
              ref={fileInputRef}
              id="pitchDeck"
              type="file"
              accept=".pdf,.ppt,.pptx,.doc,.docx"
              className="hidden"
              onChange={onFileChange}
            />
          </div>
        )}
      </div>
      <p className="text-sm text-muted-foreground text-center">
        Supported formats: PDF, PowerPoint, Word documents
      </p>
      {hasProcessed && (
        <div className="mt-2 text-sm text-green-600 text-center">
          <span>✓ Document processed successfully. Click "Upload Opportunity" to continue.</span>
        </div>
      )}
    </div>
  );
};
