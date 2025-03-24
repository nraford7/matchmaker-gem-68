
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Deal } from "@/types";

interface OpportunityCardContentProps {
  opportunity: Deal;
  showMatchScore?: boolean;
}

export const OpportunityCardContent = ({ 
  opportunity,
  showMatchScore = false
}: OpportunityCardContentProps) => {
  return (
    <CardContent className="flex-grow pb-2">
      <Link to={`/deals/${opportunity.id}`} className="block hover:text-primary transition-colors">
        <p className="text-sm line-clamp-3 mb-3 min-h-[4.5rem]">
          {opportunity.description}
        </p>
      </Link>
      
      <div className="flex flex-wrap gap-1 mb-3">
        <Badge variant="secondary">{opportunity.sector || (opportunity.sectorTags ? opportunity.sectorTags[0] : "Other")}</Badge>
        <Badge variant="secondary">
          ${(opportunity.fundingAmount || opportunity.checkSizeRequired || 0 / 1000000).toFixed(1)}M
        </Badge>
      </div>

      {showMatchScore && opportunity.matchScore !== undefined && (
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span>Match Score</span>
            <span className="font-medium">{Math.round(opportunity.matchScore * 100)}%</span>
          </div>
          <Progress value={opportunity.matchScore * 100} className="h-2" />
          {opportunity.matchExplanation && (
            <p className="text-xs text-muted-foreground mt-1">{opportunity.matchExplanation}</p>
          )}
        </div>
      )}
    </CardContent>
  );
};
