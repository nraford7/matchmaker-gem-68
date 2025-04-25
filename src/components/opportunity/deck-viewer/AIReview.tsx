import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, MessageSquare, Save, SkipForward, CheckCircle } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { simulateProgress } from "@/utils/progressSimulation";

const mockQuestions = [
  { id: "q1", question: "What is the company's business model?", answered: true, confidence: 0.9, extractedAnswer: "SaaS subscription model with tiered pricing" },
  { id: "q2", question: "What is the target market size?", answered: true, confidence: 0.85, extractedAnswer: "$4.5B with 15% annual growth" },
  { id: "q3", question: "Who are the key competitors?", answered: false, confidence: 0.3, extractedAnswer: "" },
  { id: "q4", question: "What is the current revenue?", answered: true, confidence: 0.95, extractedAnswer: "$85K MRR growing at 22% month-over-month" },
  { id: "q5", question: "What is the funding history?", answered: true, confidence: 0.8, extractedAnswer: "$1.2M seed round completed 8 months ago" },
  { id: "q6", question: "What is the use of funds?", answered: false, confidence: 0.4, extractedAnswer: "" },
  { id: "q7", question: "What is the team composition?", answered: true, confidence: 0.75, extractedAnswer: "15-person team with AI and sales expertise" },
  { id: "q8", question: "What is the valuation expectation?", answered: false, confidence: 0.1, extractedAnswer: "" }
];

interface AIReviewProps {
  onBack: () => void;
  onNext: () => void;
  onComplete: (responses: Record<string, string>) => void;
  isCompleted: boolean;
}

export const AIReview: React.FC<AIReviewProps> = ({
  onBack,
  onNext,
  onComplete,
  isCompleted
}) => {
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [questions, setQuestions] = useState(mockQuestions);
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
  }, [isAnalyzing]);

  const getUnansweredQuestions = () => {
    return questions.filter(q => !q.answered || q.confidence < 0.7);
  };

  const totalQuestions = getUnansweredQuestions().length;
  const currentQuestion = getUnansweredQuestions()[currentQuestionIndex] || null;
  const progress = (Object.keys(responses).length / questions.length) * 100;

  const handleSaveResponse = () => {
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
    if (!currentQuestion) return;
    
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
    onNext();
  };

  if (isAnalyzing) {
    return (
      <div className="space-y-8 py-4">
        <div className="text-center">
          <h4 className="text-lg font-medium mb-2">Analyzing Pitch Deck</h4>
          <p className="text-muted-foreground mb-4">
            Our AI is reviewing your pitch deck to extract key information...
          </p>
          <Progress value={analysisProgress} className="w-full h-2" />
          <p className="text-sm text-muted-foreground mt-2">
            {analysisProgress}% complete
          </p>
        </div>
      </div>
    );
  }

  if (reviewMode === "questions") {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-medium">AI Review</h4>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Question {currentQuestionIndex + 1} of {totalQuestions}
            </span>
          </div>
        </div>

        <Progress value={progress} className="w-full h-2" />
        
        <p className="text-sm text-muted-foreground text-center">
          This deck is great but there's a few questions we have which will help us pitch this. Could you clarify a few questions below, please?
        </p>

        {currentQuestion && (
          <Card className="p-4 space-y-4">
            <div>
              <h5 className="font-medium mb-1">{currentQuestion.question}</h5>
              {!currentQuestion.answered && (
                <p className="text-sm text-amber-600">
                  We couldn't find this information in your deck.
                </p>
              )}
              {currentQuestion.answered && currentQuestion.confidence < 0.7 && (
                <p className="text-sm text-amber-600">
                  We found this information but have low confidence. Please verify:
                  <br />
                  <span className="italic">{currentQuestion.extractedAnswer}</span>
                </p>
              )}
            </div>

            <Textarea
              placeholder="Your answer..."
              value={currentResponse}
              onChange={(e) => setCurrentResponse(e.target.value)}
              className="min-h-[100px]"
            />

            <div className="flex justify-between pt-2">
              <Button variant="outline" onClick={handleSkip} className="flex items-center gap-1">
                <SkipForward className="h-4 w-4" />
                Skip
              </Button>
              <Button onClick={handleSaveResponse} className="flex items-center gap-1">
                <Save className="h-4 w-4" />
                Save & Continue
              </Button>
            </div>
          </Card>
        )}

        <div className="flex justify-between pt-4 border-t">
          <Button variant="outline" onClick={onBack} className="flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <Button onClick={() => setReviewMode("summary")}>Review Summary</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-medium">Review Summary</h4>
        <div className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-green-500" />
          <span className="text-sm text-green-600">
            {Object.keys(responses).length} of {questions.length} questions answered
          </span>
        </div>
      </div>

      <Card className="p-4 divide-y">
        {questions.map((q) => {
          const hasResponse = responses[q.id] !== undefined;
          const isExtracted = q.answered && q.confidence > 0.7 && !hasResponse;
          
          return (
            <div key={q.id} className="py-3 first:pt-0 last:pb-0">
              <h5 className="font-medium mb-1">{q.question}</h5>
              {(hasResponse || isExtracted) ? (
                <p className="text-sm">
                  {isExtracted ? q.extractedAnswer : responses[q.id]}
                </p>
              ) : (
                <p className="text-sm text-muted-foreground italic">
                  Not provided
                </p>
              )}
            </div>
          );
        })}
      </Card>

      <div className="flex justify-between pt-4 border-t">
        <Button variant="outline" onClick={() => setReviewMode("questions")} className="flex items-center gap-1">
          <ArrowLeft className="h-4 w-4" />
          Back to Questions
        </Button>
        <Button onClick={handleComplete} className="flex items-center gap-1">
          <MessageSquare className="h-4 w-4 mr-1" />
          Complete Review & Generate Summary
        </Button>
      </div>
    </div>
  );
};
