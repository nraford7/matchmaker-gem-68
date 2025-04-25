
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { simulateProgress } from "@/utils/progressSimulation";

export const mockQuestions = [
  { id: "q1", question: "What is the company's business model?", answered: true, confidence: 0.9, extractedAnswer: "SaaS subscription model with tiered pricing" },
  { id: "q2", question: "What is the target market size?", answered: true, confidence: 0.85, extractedAnswer: "$4.5B with 15% annual growth" },
  { id: "q3", question: "Who are the key competitors?", answered: false, confidence: 0.3, extractedAnswer: "" },
  { id: "q4", question: "What is the current revenue?", answered: true, confidence: 0.95, extractedAnswer: "$85K MRR growing at 22% month-over-month" },
  { id: "q5", question: "What is the funding history?", answered: true, confidence: 0.8, extractedAnswer: "$1.2M seed round completed 8 months ago" },
  { id: "q6", question: "What is the use of funds?", answered: false, confidence: 0.4, extractedAnswer: "" },
  { id: "q7", question: "What is the team composition?", answered: true, confidence: 0.75, extractedAnswer: "15-person team with AI and sales expertise" },
  { id: "q8", question: "What is the valuation expectation?", answered: false, confidence: 0.1, extractedAnswer: "" }
];

export const useAIReview = (onComplete: (responses: Record<string, string>) => void) => {
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [questions] = useState(mockQuestions);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [currentResponse, setCurrentResponse] = useState("");
  const [reviewMode, setReviewMode] = useState<"analyzing" | "questions" | "summary">("analyzing");

  useEffect(() => {
    if (isAnalyzing) {
      const stopProgress = simulateProgress(setAnalysisProgress, () => {
        setIsAnalyzing(false);
        setReviewMode("questions");
        
        const initialResponses: Record<string, string> = {};
        questions.forEach(q => {
          if (q.answered && q.confidence > 0.7) {
            initialResponses[q.id] = q.extractedAnswer;
          }
        });
        setResponses(initialResponses);
        
      }, 0, 2500);
      
      return () => stopProgress();
    }
  }, [isAnalyzing, questions]);

  const getUnansweredQuestions = () => {
    return questions.filter(q => !q.answered || q.confidence < 0.7);
  };

  const handleSaveResponse = () => {
    const currentQuestion = getUnansweredQuestions()[currentQuestionIndex];
    if (!currentQuestion) return;
    
    if (currentResponse.trim() === "") {
      toast.error("Please provide an answer or skip this question");
      return;
    }
    
    setResponses(prev => ({
      ...prev,
      [currentQuestion.id]: currentResponse
    }));
    
    toast.success("Response saved");
    
    if (currentQuestionIndex < getUnansweredQuestions().length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setCurrentResponse("");
    } else {
      setReviewMode("summary");
    }
  };

  const handleSkip = () => {
    if (currentQuestionIndex < getUnansweredQuestions().length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setCurrentResponse("");
    } else {
      setReviewMode("summary");
    }
    
    toast.info("Question skipped");
  };

  const handleComplete = () => {
    const allResponses: Record<string, string> = {};
    
    questions.forEach(q => {
      if (q.answered && q.confidence > 0.7) {
        allResponses[q.id] = q.extractedAnswer;
      }
    });
    
    Object.keys(responses).forEach(id => {
      allResponses[id] = responses[id];
    });
    
    onComplete(allResponses);
    toast.success("AI review completed");
  };

  return {
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
  };
};
