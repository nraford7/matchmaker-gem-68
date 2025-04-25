import React from "react";
import { QuestionsView } from "./QuestionsView";
import { SummaryView } from "./SummaryView";
import { AnalysisChecklist } from "./AnalysisChecklist";
import { AIReview } from "../AIReview";

interface ReviewSectionProps {
  onNext: () => void;
  onComplete: (responses: Record<string, string>) => void;
  isCompleted: boolean;
}

export const ReviewSection: React.FC<ReviewSectionProps> = ({
  onNext,
  onComplete,
  isCompleted
}) => {
  return (
    <div className="space-y-4">
      <div className="bg-card rounded-lg border shadow-sm p-6">
        <AIReview
          onNext={onNext}
          onComplete={onComplete}
          isCompleted={isCompleted}
        />
      </div>
    </div>
  );
};
