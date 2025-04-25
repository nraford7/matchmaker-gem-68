
import React from "react";
import { Progress } from "@/components/ui/progress";
import { AnalyzingState } from "./components/AnalyzingState";
import { QuestionsView } from "./components/QuestionsView";
import { SummaryView } from "./components/SummaryView";
import { useAIReview } from "./hooks/useAIReview";
import { Button } from "@/components/ui/button";

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
    setReviewMode
  } = useAIReview(onComplete);

  if (isAnalyzing) {
    return <AnalyzingState analysisProgress={analysisProgress} />;
  }

  if (reviewMode === "questions") {
    const unansweredQuestions = getUnansweredQuestions();
    const progress = (Object.keys(responses).length / questions.length) * 100;

    return (
      <>
        <QuestionsView
          currentQuestion={unansweredQuestions[currentQuestionIndex]}
          currentResponse={currentResponse}
          onResponseChange={(value) => setCurrentResponse(value)}
          onSave={handleSaveResponse}
          onSkip={handleSkip}
          progress={progress}
          currentIndex={currentQuestionIndex}
          totalQuestions={unansweredQuestions.length}
        />
        <div className="flex justify-end pt-4 border-t">
          <Button onClick={() => setReviewMode("summary")}>Review Summary</Button>
        </div>
      </>
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
