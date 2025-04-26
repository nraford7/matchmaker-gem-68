
import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight } from "lucide-react";

interface RecommendationSectionProps {
  recommendation: string;
  onRecommendationChange: (value: string) => void;
  onBack: () => void;
  onNext: () => void;
}

export const RecommendationSection: React.FC<RecommendationSectionProps> = ({
  recommendation,
  onRecommendationChange,
  onBack,
  onNext,
}) => {
  return (
    <div className="space-y-6">
      <Card className="p-4">
        <div className="space-y-4">
          <h5 className="font-medium">Your Recommendation</h5>
          <Textarea
            value={recommendation}
            onChange={(e) => onRecommendationChange(e.target.value)}
            placeholder="Share your reflections on this deal here. It will be shared with each investor you share this deal with."
            className="min-h-[200px]"
          />
        </div>
      </Card>

      <div className="flex justify-between gap-2 pt-4 border-t">
        <Button variant="outline" onClick={onBack}>Back</Button>
        <Button onClick={onNext} className="flex items-center gap-1">
          Next
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
