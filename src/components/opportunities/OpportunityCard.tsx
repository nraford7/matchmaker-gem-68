
import { useState } from "react";
import { Link } from "react-router-dom";
import { Opportunity } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { MapPin, MoreHorizontal, Save, Briefcase, Archive, ThumbsUp, ThumbsDown } from "lucide-react";
import { saveDeal } from "@/services/opportunity/savedDealsServices";
import { ActivateDealDialog } from "./ActivateDealDialog";
import { CompleteDealDialog } from "./CompleteDealDialog";

interface OpportunityCardProps {
  opportunity: Opportunity;
  showMatchScore?: boolean;
}

export const OpportunityCard = ({ opportunity, showMatchScore = false }: OpportunityCardProps) => {
  const [activatingId, setActivatingId] = useState<string | null>(null);
  const [completingId, setCompletingId] = useState<string | null>(null);
  
  const handleSave = async (id: string) => {
    await saveDeal(id);
  };

  return (
    <Card key={opportunity.id} className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <Link to={`/deals/${opportunity.id}`} className="hover:underline">
            <CardTitle className="text-lg">{opportunity.name}</CardTitle>
          </Link>
          <div className="flex items-center gap-2">
            <Badge variant="outline">{opportunity.stage}</Badge>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-56" align="end">
                <div className="grid gap-1">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="justify-start gap-2"
                    onClick={() => handleSave(opportunity.id)}
                  >
                    <Save className="h-4 w-4" />
                    Save Deal
                  </Button>
                  
                  <ActivateDealDialog 
                    opportunityId={opportunity.id}
                    isOpen={activatingId === opportunity.id}
                    onOpenChange={(open) => !open && setActivatingId(null)}
                    onActivate={() => setActivatingId(null)}
                    trigger={
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="justify-start gap-2"
                        onClick={() => setActivatingId(opportunity.id)}
                      >
                        <Briefcase className="h-4 w-4" />
                        Add to Active Deals
                      </Button>
                    }
                  />
                  
                  <CompleteDealDialog 
                    opportunity={opportunity}
                    isOpen={completingId === opportunity.id}
                    onOpenChange={(open) => !open && setCompletingId(null)}
                    onComplete={() => setCompletingId(null)}
                    trigger={
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="justify-start gap-2"
                        onClick={() => setCompletingId(opportunity.id)}
                      >
                        <Archive className="h-4 w-4" />
                        Mark as Completed
                      </Button>
                    }
                  />
                </div>
              </PopoverContent>
            </Popover>
          </div>
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
  );
};
