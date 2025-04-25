
import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Save, SkipForward } from "lucide-react";
import type { mockQuestions } from "../hooks/useAIReview";

interface QuestionsViewProps {
  currentQuestion: typeof mockQuestions[0] | null;
  currentResponse: string;
  onResponseChange: (value: string) => void;
  onSave: () => void;
  onSkip: () => void;
  progress: number;
  currentIndex: number;
  totalQuestions: number;
}

export const QuestionsView: React.FC<QuestionsViewProps> = ({
  currentQuestion,
  currentResponse,
  onResponseChange,
  onSave,
  onSkip,
  progress,
  currentIndex,
  totalQuestions,
}) => {
  if (!currentQuestion) return null;

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

      <Progress value={progress} className="w-full h-2" />
      
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
          onChange={(e) => onResponseChange(e.target.value)}
          className="min-h-[100px]"
        />

        <div className="flex justify-between pt-2">
          <Button variant="outline" onClick={onSkip} className="flex items-center gap-1">
            <SkipForward className="h-4 w-4" />
            Skip
          </Button>
          <Button onClick={onSave} className="flex items-center gap-1">
            <Save className="h-4 w-4" />
            Save & Continue
          </Button>
        </div>
      </Card>
    </div>
  );
};
