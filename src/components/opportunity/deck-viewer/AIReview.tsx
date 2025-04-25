
import React, { useState, useEffect } from "react";
import { QuestionsView } from "./components/QuestionsView";
import { SummaryView } from "./components/SummaryView";
import { AnalysisChecklist } from "./components/AnalysisChecklist";
import { useAIReview } from "./hooks/useAIReview";

interface AIReviewProps {
  onNext: () => void;
  onComplete: (responses: Record<string, string>) => void;
  isCompleted: boolean;
}

export const AIReview: React.FC<AIReviewProps> = ({
  onNext,
  onComplete,
  isCompleted
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
    setCurrentQuestionIndex, // Added this line to destructure from the hook
    handleSaveResponse,
    handleSkip,
    handleComplete,
  } = useAIReview(onComplete);

  const handleCancel = () => {
    onNext();
  };

  const handleAnalysisComplete = () => {
    setShowAnalysis(false);
    handleComplete();
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  if (showAnalysis) {
    return <AnalysisChecklist onComplete={handleAnalysisComplete} />;
  }

  if (reviewMode === "questions") {
    const unansweredQuestions = getUnansweredQuestions();

    return (
      <QuestionsView
        currentQuestion={unansweredQuestions[currentQuestionIndex]}
        currentResponse={currentResponse}
        onResponseChange={(value) => setCurrentResponse(value)}
        onSave={handleSaveResponse}
        onSkip={handleBack}
        onCancel={handleCancel}
        currentIndex={currentQuestionIndex}
        totalQuestions={unansweredQuestions.length}
      />
    );
  }

  return (
    <SummaryView
      questions={questions}
      responses={responses}
      onComplete={() => {
        handleComplete();
        onNext();
      }}
    />
  );
};
