
import React, { useState } from "react";
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
    setCurrentQuestionIndex,
    handleSaveResponse,
    handleComplete,
    handleSkip
  } = useAIReview(onComplete);

  // Handle completion of the analysis phase
  const handleAnalysisComplete = () => {
    setShowAnalysis(false);
  };

  // Handle the next button click in questions view
  const handleNextQuestion = () => {
    handleSaveResponse();
    // The navigation to summary or next question is handled in handleSaveResponse
  };

  // If we're still in the analysis phase
  if (showAnalysis) {
    return <AnalysisChecklist onComplete={handleAnalysisComplete} />;
  }

  // If we're in the questions phase
  if (reviewMode === "questions") {
    const unansweredQuestions = getUnansweredQuestions();
    
    if (unansweredQuestions.length === 0) {
      // If there are no unanswered questions, move to summary
      setTimeout(() => handleComplete(), 0);
      return null;
    }

    return (
      <QuestionsView
        currentQuestion={unansweredQuestions[currentQuestionIndex]}
        currentResponse={currentResponse}
        onResponseChange={(value) => setCurrentResponse(value)}
        onSave={handleNextQuestion}
        currentIndex={currentQuestionIndex}
        totalQuestions={unansweredQuestions.length}
      />
    );
  }

  // If we're in the summary phase
  return (
    <SummaryView
      questions={questions}
      responses={responses}
      onComplete={() => {
        handleComplete();
        onNext(); // This will move to the next tab
      }}
    />
  );
};
