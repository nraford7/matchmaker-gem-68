
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { ThumbsUp, ThumbsDown } from "lucide-react";

interface OpportunityCardFooterProps {
  opportunityId: string;
  showMatchScore?: boolean;
  feedback: 'positive' | 'negative' | null;
  isSubmitting: boolean;
  onPositiveFeedback: () => Promise<void>;
  onNegativeFeedback: () => Promise<void>;
}

export const OpportunityCardFooter = ({
  opportunityId,
  showMatchScore = false,
  feedback,
  isSubmitting,
  onPositiveFeedback,
  onNegativeFeedback
}: OpportunityCardFooterProps) => {
  return (
    <CardFooter className="flex justify-between pt-2 mt-auto">
      <Button variant="ghost" size="sm" asChild>
        <Link to={`/deals/${opportunityId}`}>View Details</Link>
      </Button>
      
      {showMatchScore && (
        <div className="flex gap-1">
          <Button 
            variant={feedback === 'positive' ? "default" : "ghost"} 
            size="icon" 
            className="h-8 w-8"
            onClick={onPositiveFeedback}
            disabled={isSubmitting}
          >
            <ThumbsUp className="h-4 w-4" />
          </Button>
          <Button 
            variant={feedback === 'negative' ? "default" : "ghost"} 
            size="icon" 
            className="h-8 w-8"
            onClick={onNegativeFeedback}
            disabled={isSubmitting}
          >
            <ThumbsDown className="h-4 w-4" />
          </Button>
        </div>
      )}
    </CardFooter>
  );
};
