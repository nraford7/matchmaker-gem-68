
import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MessageSquare, CheckCircle } from "lucide-react";
import { Question } from "../hooks/useAIReview";

interface SummaryViewProps {
  questions: Question[];
  responses: Record<string, string>;
  onComplete: () => void;
}

export const SummaryView: React.FC<SummaryViewProps> = ({
  questions,
  responses,
  onComplete,
}) => {
  // Count answered questions
  const answeredCount = Object.keys(responses).length;
  const totalQuestions = questions.length;
  const percentageAnswered = Math.round((answeredCount / totalQuestions) * 100);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-medium">Review Summary</h4>
        <div className="flex items-center gap-2">
          <CheckCircle className={`h-5 w-5 ${answeredCount === totalQuestions ? 'text-green-500' : 'text-amber-500'}`} />
          <span className={`text-sm ${answeredCount === totalQuestions ? 'text-green-600' : 'text-amber-600'}`}>
            {answeredCount} of {totalQuestions} questions answered ({percentageAnswered}%)
          </span>
        </div>
      </div>

      <Card className="p-4 divide-y">
        {questions.map((q) => {
          const hasResponse = responses[q.id] !== undefined;
          const isExtracted = q.answered && q.confidence > 0.7 && !hasResponse;
          const responseText = hasResponse ? responses[q.id] : (isExtracted ? q.extractedAnswer : "");
          
          return (
            <div key={q.id} className="py-3 first:pt-0 last:pb-0">
              <h5 className="font-medium mb-1">{q.question}</h5>
              {responseText ? (
                <p className="text-sm">{responseText}</p>
              ) : (
                <p className="text-sm text-muted-foreground italic">
                  Not provided
                </p>
              )}
            </div>
          );
        })}
      </Card>

      <div className="flex justify-end pt-4 border-t">
        <Button 
          onClick={onComplete} 
          className="flex items-center gap-1"
          variant="default"
        >
          <MessageSquare className="h-4 w-4 mr-1" />
          Complete Review & Generate Summary
        </Button>
      </div>
    </div>
  );
};
