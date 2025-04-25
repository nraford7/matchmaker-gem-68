
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
  // This function should be called when the review process is completed
  const handleReviewComplete = (responses: Record<string, string>) => {
    onComplete(responses);
  };

  return (
    <div className="space-y-4">
      <div className="bg-card rounded-lg border shadow-sm p-6">
        <AIReview
          onNext={onNext}
          onComplete={handleReviewComplete}
          isCompleted={isCompleted}
        />
      </div>
    </div>
  );
};
