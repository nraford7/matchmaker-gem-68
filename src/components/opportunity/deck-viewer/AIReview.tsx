
import React, { useState } from "react";
import { QuestionsView } from "./components/QuestionsView";
import { useAIReview } from "./hooks/useAIReview";
import { AnalysisChecklist } from "./components/AnalysisChecklist";

interface AIReviewProps {
  onNext: () => void;
  onComplete: (responses: Record<string, string>) => void;
  isCompleted: boolean;
  recommendation?: string;
  onRecommendationChange?: (value: string) => void;
}

export const AIReview: React.FC<AIReviewProps> = ({
  onNext,
  onComplete,
  isCompleted,
  recommendation = "",
  onRecommendationChange
}) => {
  const [showAnalysis, setShowAnalysis] = useState(true);
  
  const {
    isAnalyzing,
    reviewMode,
    currentQuestionIndex,
    currentResponse,
    responses,
    questions,
    getUnansweredQuestions,
    setCurrentResponse,
    setCurrentQuestionIndex,
    handleSaveResponse,
    handleComplete,
    handleSkip
  } = useAIReview((finalResponses) => {
    onComplete(finalResponses);
    onNext(); // Move to AI Summary tab directly
  });

  // Handle completion of the analysis phase
  const handleAnalysisComplete = () => {
    setShowAnalysis(false);
  };

  // If we're still in the analysis phase
  if (showAnalysis) {
    return <AnalysisChecklist onComplete={handleAnalysisComplete} />;
  }

  // If we're in the questions phase
  const unansweredQuestions = getUnansweredQuestions();
  
  if (unansweredQuestions.length === 0) {
    // Move to AI Summary tab immediately when no questions remain
    handleComplete();
    return null;
  }

  return (
    <QuestionsView
      currentQuestion={unansweredQuestions[currentQuestionIndex]}
      currentResponse={currentResponse}
      onResponseChange={(value) => {
        setCurrentResponse(value);
        // If this is the recommendation question and we have the handler, call it
        if (unansweredQuestions[currentQuestionIndex]?.id === "recommendation" && onRecommendationChange) {
          onRecommendationChange(value);
        }
      }}
      onSave={handleSaveResponse}
      onSkip={handleSkip}
      currentIndex={currentQuestionIndex}
      totalQuestions={unansweredQuestions.length}
    />
  );
};
