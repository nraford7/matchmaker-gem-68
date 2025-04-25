
import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { simulateProgress } from "@/utils/progressSimulation";

export interface Question {
  id: string;
  question: string;
  answered: boolean;
  confidence: number;
  extractedAnswer: string;
}

export const mockQuestions: Question[] = [
  { id: "q1", question: "What is the company's business model?", answered: true, confidence: 0.9, extractedAnswer: "SaaS subscription model with tiered pricing" },
  { id: "q2", question: "What is the target market size?", answered: true, confidence: 0.85, extractedAnswer: "$4.5B with 15% annual growth" },
  { id: "q3", question: "Who are the key competitors?", answered: false, confidence: 0.3, extractedAnswer: "" },
  { id: "q4", question: "What is the current revenue?", answered: true, confidence: 0.95, extractedAnswer: "$85K MRR growing at 22% month-over-month" },
  { id: "q5", question: "What is the funding history?", answered: true, confidence: 0.8, extractedAnswer: "$1.2M seed round completed 8 months ago" },
  { id: "q6", question: "What is the use of funds?", answered: false, confidence: 0.4, extractedAnswer: "" },
  { id: "q7", question: "What is the team composition?", answered: true, confidence: 0.75, extractedAnswer: "15-person team with AI and sales expertise" },
  { id: "q8", question: "What is the valuation expectation?", answered: false, confidence: 0.1, extractedAnswer: "" }
];

export type ReviewMode = "analyzing" | "questions" | "summary";

export const useAIReview = (onComplete: (responses: Record<string, string>) => void) => {
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [questions] = useState<Question[]>(mockQuestions);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [currentResponse, setCurrentResponse] = useState("");
  const [reviewMode, setReviewMode] = useState<ReviewMode>("analyzing");
  const [unansweredQuestions, setUnansweredQuestions] = useState<Question[]>([]);
  
  // Initialize the analysis process
  useEffect(() => {
    if (isAnalyzing) {
      const stopProgress = simulateProgress(setAnalysisProgress, () => {
        setIsAnalyzing(false);
        setReviewMode("questions");
        
        // Pre-populate responses with high-confidence extracted answers
        const initialResponses: Record<string, string> = {};
        const unanswered: Question[] = [];
        
        questions.forEach(q => {
          if (q.answered && q.confidence > 0.7) {
            initialResponses[q.id] = q.extractedAnswer;
          } else {
            unanswered.push(q);
          }
        });
        
        setResponses(initialResponses);
        setUnansweredQuestions(unanswered);
        
      }, 0, 2500);
      
      return () => stopProgress();
    }
  }, [isAnalyzing, questions]);

  // Get unanswered questions or those with low confidence
  const getUnansweredQuestions = useCallback((): Question[] => {
    return questions.filter(q => !q.answered || q.confidence < 0.7);
  }, [questions]);

  // Fix handleSaveResponse to use useCallback and actually save the response
  const handleSaveResponse = useCallback(() => {
    const unanswered = getUnansweredQuestions();
    
    if (!unanswered.length) {
      return;
    }
    
    const currentQuestion = unanswered[currentQuestionIndex];
    
    if (!currentQuestion) {
      return;
    }
    
    // If response is empty, automatically skip
    if (currentResponse.trim() === "") {
      handleSkip();
      return;
    }
    
    // Save the current response
    setResponses(prev => {
      const updated = {
        ...prev,
        [currentQuestion.id]: currentResponse
      };
      
      // Move to the next question or complete
      if (currentQuestionIndex < unanswered.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setCurrentResponse("");
        toast.success("Answer saved");
      } else {
        // Complete when all questions are answered
        const allResponses = { ...updated };
        
        // Add high-confidence extracted answers if not already present
        questions.forEach(q => {
          if (q.answered && q.confidence > 0.7 && !allResponses[q.id]) {
            allResponses[q.id] = q.extractedAnswer;
          }
        });
        
        onComplete(allResponses);
        toast.success("All questions answered");
      }
      
      return updated;
    });
  }, [currentQuestionIndex, currentResponse, getUnansweredQuestions, onComplete, questions]);

  // Fix handleSkip to use useCallback and properly handle the navigation
  const handleSkip = useCallback(() => {
    const unanswered = getUnansweredQuestions();
    
    if (currentQuestionIndex < unanswered.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setCurrentResponse("");
      toast.info("Question skipped");
    } else {
      // All questions have been seen, complete the process
      const allResponses = { ...responses };
      
      // Add high-confidence extracted answers
      questions.forEach(q => {
        if (q.answered && q.confidence > 0.7 && !allResponses[q.id]) {
          allResponses[q.id] = q.extractedAnswer;
        }
      });
      
      onComplete(allResponses);
      toast.info("Review completed");
    }
  }, [currentQuestionIndex, getUnansweredQuestions, onComplete, questions, responses]);

  // Simplified handleComplete function
  const handleComplete = useCallback(() => {
    const allResponses: Record<string, string> = { ...responses };
    
    // Add any missing high-confidence answers
    questions.forEach(q => {
      if (q.answered && q.confidence > 0.7 && !allResponses[q.id]) {
        allResponses[q.id] = q.extractedAnswer;
      }
    });
    
    onComplete(allResponses);
    toast.success("AI review completed");
  }, [onComplete, questions, responses]);

  return {
    isAnalyzing,
    analysisProgress,
    reviewMode,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    currentResponse,
    responses,
    questions,
    unansweredQuestions,
    getUnansweredQuestions,
    setCurrentResponse,
    handleSaveResponse,
    handleSkip,
    handleComplete,
    setReviewMode
  };
};
