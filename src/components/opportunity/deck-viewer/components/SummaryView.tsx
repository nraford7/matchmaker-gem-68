
import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MessageSquare, CheckCircle } from "lucide-react";
import type { mockQuestions } from "../hooks/useAIReview";

interface SummaryViewProps {
  questions: typeof mockQuestions;
  responses: Record<string, string>;
  onComplete: () => void;
}

export const SummaryView: React.FC<SummaryViewProps> = ({
  questions,
  responses,
  onComplete,
}) => {
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

      <div className="flex justify-end pt-4 border-t">
        <Button onClick={onComplete} className="flex items-center gap-1">
          <MessageSquare className="h-4 w-4 mr-1" />
          Complete Review & Generate Summary
        </Button>
      </div>
    </div>
  );
};
