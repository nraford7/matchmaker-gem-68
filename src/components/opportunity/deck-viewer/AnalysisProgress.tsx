
import React from "react";
import { FileSearch } from "lucide-react";

interface AnalysisProgressProps {
  progress: number;
}

export const AnalysisProgress: React.FC<AnalysisProgressProps> = ({ progress }) => {
  return (
    <div className="space-y-4 mt-6 border rounded-lg p-6">
      <div className="flex items-center gap-2">
        <FileSearch className="h-5 w-5 animate-pulse text-primary" />
        <h3 className="text-lg font-medium">Analysing and Creating Summary Deck with AI</h3>
      </div>
      <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary transition-all duration-300" 
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-sm text-muted-foreground">
        Our AI is analyzing your pitch deck and creating detailed and anonymous summaries.
        This may take a few minutes.
      </p>
    </div>
  );
};
