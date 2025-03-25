
import { Link, useLocation } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Deal } from "@/types";

interface DealItemProps {
  deal: Deal;
  introducerName: string | null;
  introducerId: string | null;
}

export const DealItem = ({ deal, introducerName, introducerId }: DealItemProps) => {
  const location = useLocation();
  
  return (
    <Link 
      key={deal.id} 
      to={`/deals/${deal.id}`}
      state={{ from: location.pathname }}
      className="block group"
    >
      <div className="flex justify-between items-center py-2 px-4 rounded-lg hover:bg-accent transition-colors">
        <div>
          <p className="font-medium group-hover:text-primary transition-colors">{deal.name}</p>
          {introducerId && (
            <div className="text-xs text-muted-foreground">
              Introduced by: <Link to={`/investor/${introducerId}`} className="font-medium hover:text-primary transition-colors">{introducerName || "Unknown Investor"}</Link>
            </div>
          )}
          <div className="flex gap-2 mt-1">
            {deal.sectorTags && deal.sectorTags[0] && (
              <Badge variant="outline" className="text-xs">
                {deal.sectorTags[0]}
              </Badge>
            )}
            {deal.stage && (
              <Badge variant="secondary" className="text-xs">
                {deal.stage}
              </Badge>
            )}
          </div>
        </div>
        <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
      </div>
    </Link>
  );
};
