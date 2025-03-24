
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";

interface OpportunityCardFooterProps {
  opportunityId: string;
  showMatchScore?: boolean;
}

export const OpportunityCardFooter = ({
  opportunityId,
  showMatchScore = false
}: OpportunityCardFooterProps) => {
  return (
    <CardFooter className="flex justify-between pt-2 mt-auto">
      <Button variant="ghost" size="sm" asChild>
        <Link to={`/deals/${opportunityId}`}>View Details</Link>
      </Button>
    </CardFooter>
  );
};
