
import { EnhancedDeal } from "@/types/deal";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";

interface DealHeaderProps {
  deal: EnhancedDeal;
}

const DealHeader = ({ deal }: DealHeaderProps) => {
  return (
    <div>
      <h1 className="text-3xl font-bold">{deal.name}</h1>
      
      <div className="flex flex-wrap gap-2 mt-3">
        {deal.sectorTags && deal.sectorTags.map((sector, index) => (
          <Badge key={index} variant="secondary">
            {sector}
          </Badge>
        ))}
        
        {deal.stage && (
          <Badge variant="outline">{deal.stage}</Badge>
        )}
        
        {deal.dealType && (
          <Badge variant="outline">{deal.dealType}</Badge>
        )}
      </div>
      
      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Check Size</p>
          <p className="font-medium">{deal.checkSizeRequired ? formatCurrency(deal.checkSizeRequired) : "Not specified"}</p>
        </div>
        
        <div>
          <p className="text-sm text-muted-foreground">Location</p>
          <p className="font-medium">{deal.location || "Global"}</p>
        </div>
        
        <div>
          <p className="text-sm text-muted-foreground">Time Horizon</p>
          <p className="font-medium">{deal.timeHorizon || "Not specified"}</p>
        </div>
        
        {deal.decisionConvictionRequired && (
          <div>
            <p className="text-sm text-muted-foreground">Decision Conviction</p>
            <p className="font-medium">{deal.decisionConvictionRequired}/5</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DealHeader;
