
import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight } from "lucide-react";
import { Question } from "../hooks/useAIReview";

interface QuestionsViewProps {
  currentQuestion: Question | null;
  currentResponse: string;
  onResponseChange: (value: string) => void;
  onSave: () => void;
  currentIndex: number;
  totalQuestions: number;
}

export const QuestionsView: React.FC<QuestionsViewProps> = ({
  currentQuestion,
  currentResponse,
  onResponseChange,
  onSave,
  currentIndex,
  totalQuestions
}) => {
  if (!currentQuestion) return null;
  
  const handleNextClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent default form submission
    onSave();
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-medium">AI Review</h4>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            Question {currentIndex + 1} of {totalQuestions}
          </span>
        </div>
      </div>

      <p className="text-sm text-muted-foreground">
        This deck is great but there's a few questions we have which will help us pitch this. Could you clarify a few questions below, please?
      </p>

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
          onChange={e => onResponseChange(e.target.value)} 
          className="min-h-[100px]"
        />
      </Card>

      <div className="flex justify-end">
        <Button 
          onClick={handleNextClick}
          className="flex items-center gap-2"
          type="button"
        >
          {currentIndex === totalQuestions - 1 ? 'Complete' : 'Next'}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
