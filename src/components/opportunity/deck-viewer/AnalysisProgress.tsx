
import React from "react";
import { FileSearch, Upload } from "lucide-react";

interface AnalysisProgressProps {
  isUploading: boolean;
  uploadProgress: number;
  isAnalyzing: boolean;
  analysisProgress: number;
}

export const AnalysisProgress: React.FC<AnalysisProgressProps> = ({ 
  isUploading, 
  uploadProgress, 
  isAnalyzing,
  analysisProgress 
}) => {
  const progress = isUploading ? uploadProgress : analysisProgress;
  const status = isUploading ? "Uploading Document" : "Analysing and Creating Summary Deck with AI";
  const description = isUploading 
    ? "Uploading your pitch document securely..."
    : "Our AI is analyzing your pitch deck and creating detailed and anonymous summaries.";

  return (
    <div className="space-y-4 mt-6 border rounded-lg p-6">
      <div className="flex items-center gap-2">
        {isUploading ? (
          <Upload className="h-5 w-5 animate-pulse text-primary" />
        ) : (
          <FileSearch className="h-5 w-5 animate-pulse text-primary" />
        )}
        <h3 className="text-lg font-medium">{status}</h3>
      </div>
      <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary transition-all duration-300" 
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-sm text-muted-foreground">
        {description}
      </p>
    </div>
  );
};

