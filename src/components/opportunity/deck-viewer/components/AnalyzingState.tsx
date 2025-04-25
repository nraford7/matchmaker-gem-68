
import React from "react";
import { Progress } from "@/components/ui/progress";

interface AnalyzingStateProps {
  analysisProgress: number;
}

export const AnalyzingState: React.FC<AnalyzingStateProps> = ({ analysisProgress }) => {
  return (
    <div className="space-y-8 py-4">
      <div>
        <h4 className="text-lg font-medium mb-2">Analyzing Pitch Deck</h4>
        <p className="text-muted-foreground mb-4">
          Our AI is reviewing your pitch deck to extract key information...
        </p>
        <Progress value={analysisProgress} className="w-full h-2" />
        <p className="text-sm text-muted-foreground mt-2">
          {analysisProgress}% complete
        </p>
      </div>
    </div>
  );
};
