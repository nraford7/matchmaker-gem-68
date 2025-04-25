
import React from "react";
import { AnalyzingState } from "./components/AnalyzingState";
import { QuestionsView } from "./components/QuestionsView";
import { SummaryView } from "./components/SummaryView";
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
  const {
    isAnalyzing,
    analysisProgress,
    reviewMode,
    currentQuestionIndex,
    currentResponse,
    responses,
    questions,
    getUnansweredQuestions,
    setCurrentResponse,
    handleSaveResponse,
    handleSkip,
    handleComplete,
  } = useAIReview(onComplete);

  if (isAnalyzing) {
    return <AnalyzingState analysisProgress={analysisProgress} />;
  }

  if (reviewMode === "questions") {
    const unansweredQuestions = getUnansweredQuestions();

    return (
      <QuestionsView
        currentQuestion={unansweredQuestions[currentQuestionIndex]}
        currentResponse={currentResponse}
        onResponseChange={(value) => setCurrentResponse(value)}
        onSave={handleSaveResponse}
        onSkip={handleSkip}
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
