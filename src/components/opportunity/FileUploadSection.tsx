
import React, { useState } from "react";
import { FileText, FileType, Loader2, UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FileUploadSectionProps {
  selectedFile: File | null;
  isProcessing: boolean;
  hasProcessed: boolean;
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FileUploadSection: React.FC<FileUploadSectionProps> = ({
  selectedFile,
  isProcessing,
  hasProcessed,
  onFileChange,
}) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <FileText className="h-5 w-5 text-primary" />
        <FormLabel htmlFor="pitchDeck" className="text-lg font-medium">Upload Pitch Document</FormLabel>
      </div>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
        <div className="flex flex-col items-center">
          <UploadCloud className="h-10 w-10 text-muted-foreground mb-2" />
          <p className="mb-2 text-sm text-muted-foreground">
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
          {selectedFile && (
            <div className="mt-4 text-sm flex items-center gap-2">
              <FileType className="h-4 w-4 text-primary" />
              <span>Selected file: {selectedFile.name}</span>
            </div>
          )}
          {isProcessing && (
            <div className="mt-4 flex items-center gap-2 text-primary">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Processing document...</span>
            </div>
          )}
          {hasProcessed && (
            <div className="mt-4 text-sm text-green-600">
              <span>✓ Document processed. Please review the information below.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

import { FormLabel } from "@/components/ui/form";
