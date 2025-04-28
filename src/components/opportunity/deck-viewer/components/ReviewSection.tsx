
import React from "react";
import { AIReview } from "../AIReview";

interface ReviewSectionProps {
  onNext: () => void;
  onComplete: (responses: Record<string, string>) => void;
  isCompleted: boolean;
  recommendation: string;
  onRecommendationChange: (value: string) => void;
}

export const ReviewSection: React.FC<ReviewSectionProps> = ({
  onNext,
  onComplete,
  isCompleted,
  recommendation,
  onRecommendationChange
}) => {
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
          recommendation={recommendation}
          onRecommendationChange={onRecommendationChange}
        />
      </div>
    </div>
  );
};
