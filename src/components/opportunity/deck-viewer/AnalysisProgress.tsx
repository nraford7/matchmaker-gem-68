
import React from "react";
import { FileText, Upload } from "lucide-react";

interface AnalysisProgressProps {
  isUploading: boolean;
  uploadProgress: number;
}

export const AnalysisProgress: React.FC<AnalysisProgressProps> = ({ 
  isUploading, 
  uploadProgress,
}) => {
  return (
    <div className="space-y-4 mt-6 border rounded-lg p-6">
      <div className="flex items-center gap-2">
        <Upload className="h-5 w-5 animate-pulse text-primary" />
        <h3 className="text-lg font-medium">Uploading Document</h3>
      </div>
      <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary transition-all duration-300" 
          style={{ width: `${uploadProgress}%` }}
        />
      </div>
      <p className="text-sm text-muted-foreground">
        Uploading your pitch document securely...
      </p>
    </div>
  );
};
