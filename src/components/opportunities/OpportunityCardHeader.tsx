
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { MoreHorizontal, Save, Briefcase, Archive, MapPin } from "lucide-react";
import { Deal } from "@/types";
import { ActivateDealDialog } from "./ActivateDealDialog";
import { CompleteDealDialog } from "./CompleteDealDialog";

interface OpportunityCardHeaderProps {
  opportunity: Deal;
  onSave: (id: string) => Promise<void>;
  activatingId: string | null;
  completingId: string | null;
  setActivatingId: (id: string | null) => void;
  setCompletingId: (id: string | null) => void;
}

export const OpportunityCardHeader = ({
  opportunity,
  onSave,
  activatingId,
  completingId,
  setActivatingId,
  setCompletingId
}: OpportunityCardHeaderProps) => {
  const handleSave = () => onSave(opportunity.id);

  return (
    <CardHeader className="pb-2">
      <div className="flex justify-between items-start">
        <Link to={`/deals/${opportunity.id}`} className="hover:underline flex-1">
          <CardTitle className="text-lg line-clamp-2">
            {opportunity.name}
          </CardTitle>
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
                  onClick={handleSave}
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
        <span>{opportunity.location || (opportunity.geographies ? opportunity.geographies[0] : "Unknown")}</span>
      </div>
    </CardHeader>
  );
};
