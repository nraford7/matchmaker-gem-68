
import { useState, useEffect } from "react";
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
  const [isNavigating, setIsNavigating] = useState(false);

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
  const getUnansweredQuestions = (): Question[] => {
    return questions.filter(q => !q.answered || q.confidence < 0.7);
  };

  // Save the current response and move to the next question
  const handleSaveResponse = () => {
    // Prevent multiple rapid calls while navigation is happening
    if (isNavigating) return;
    setIsNavigating(true);
    
    const unanswered = getUnansweredQuestions();
    
    if (!unanswered.length) {
      setIsNavigating(false);
      return;
    }
    
    const currentQuestion = unanswered[currentQuestionIndex];
    
    if (!currentQuestion) {
      setIsNavigating(false);
      return;
    }
    
    if (currentResponse.trim() === "") {
      toast.error("Please provide an answer or skip this question");
      setIsNavigating(false);
      return;
    }
    
    // Save the response
    setResponses(prev => ({
      ...prev,
      [currentQuestion.id]: currentResponse
    }));
    
    // Move to the next question or summary
    if (currentQuestionIndex < unanswered.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setCurrentResponse("");
      toast.success("Answer saved");
      
      // Reset navigation flag after state updates
      setTimeout(() => {
        setIsNavigating(false);
      }, 50);
    } else {
      setReviewMode("summary");
      toast.success("All questions answered");
      setIsNavigating(false);
    }
  };

  // Skip the current question and move to the next
  const handleSkip = () => {
    if (isNavigating) return;
    setIsNavigating(true);
    
    const unanswered = getUnansweredQuestions();
    
    if (currentQuestionIndex < unanswered.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setCurrentResponse("");
      toast.info("Question skipped");
      
      setTimeout(() => {
        setIsNavigating(false);
      }, 50);
    } else {
      setReviewMode("summary");
      toast.info("No more questions to answer");
      setIsNavigating(false);
    }
  };

  // Complete the review process
  const handleComplete = () => {
    const allResponses: Record<string, string> = {};
    
    // Combine extracted answers with user responses
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
