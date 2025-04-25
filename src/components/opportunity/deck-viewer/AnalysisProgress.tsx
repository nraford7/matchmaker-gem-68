
import React from "react";
import { Upload } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface AnalysisProgressProps {
  isUploading: boolean;
  uploadProgress: number;
}

export const AnalysisProgress: React.FC<AnalysisProgressProps> = ({ 
  isUploading, 
  uploadProgress,
}) => {
  return (
    <div className="space-y-4 mt-6 border rounded-lg p-6 animate-fade-in">
      <div className="flex items-center gap-2">
        <Upload className="h-5 w-5 animate-pulse text-primary" />
        <h3 className="text-lg font-medium">Uploading Document</h3>
      </div>
      <Progress value={uploadProgress} className="h-2" />
      <p className="text-sm text-muted-foreground">
        Uploading your pitch document securely... {Math.round(uploadProgress)}%
      </p>
    </div>
  );
};
