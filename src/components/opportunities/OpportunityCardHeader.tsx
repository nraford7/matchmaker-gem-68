
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { Deal } from "@/types";
import DealActions from "../deals/DealActions";

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
          <DealActions dealId={opportunity.id} dealName={opportunity.name} />
        </div>
      </div>
      <div className="flex items-center text-sm text-muted-foreground gap-1">
        <MapPin className="h-3 w-3" />
        <span>{opportunity.location || (opportunity.geographies ? opportunity.geographies[0] : "Unknown")}</span>
      </div>
    </CardHeader>
  );
};
