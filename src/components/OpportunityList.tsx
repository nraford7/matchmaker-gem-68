import { Opportunity } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ThumbsUp, ThumbsDown, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

interface OpportunityListProps {
  opportunities: Opportunity[];
  showMatchScore?: boolean;
}

export const OpportunityList = ({ opportunities, showMatchScore = false }: OpportunityListProps) => {
  if (opportunities.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-muted-foreground">No opportunities found</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {opportunities.map((opportunity) => (
        <Card key={opportunity.id} className="overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <Link to={`/deals/${opportunity.id}`} className="hover:underline">
                <CardTitle className="text-lg">{opportunity.name}</CardTitle>
              </Link>
              <Badge variant="outline">{opportunity.stage}</Badge>
            </div>
            <div className="flex items-center text-sm text-muted-foreground gap-1">
              <MapPin className="h-3 w-3" />
              <span>{opportunity.location}</span>
            </div>
          </CardHeader>
          <CardContent className="pb-2">
            <Link to={`/deals/${opportunity.id}`} className="block hover:text-primary transition-colors">
              <p className="text-sm line-clamp-3 mb-3">{opportunity.description}</p>
            </Link>
            
            <div className="flex flex-wrap gap-1 mb-3">
              <Badge variant="secondary">{opportunity.sector}</Badge>
              <Badge variant="secondary">
                ${(opportunity.fundingAmount / 1000000).toFixed(1)}M
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
          <CardFooter className="flex justify-between pt-2">
            <Button variant="ghost" size="sm" asChild>
              <Link to={`/deals/${opportunity.id}`}>View Details</Link>
            </Button>
            
            {showMatchScore && (
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ThumbsUp className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ThumbsDown className="h-4 w-4" />
                </Button>
              </div>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
