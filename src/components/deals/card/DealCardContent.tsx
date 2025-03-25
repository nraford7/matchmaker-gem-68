
import { CardContent } from "@/components/ui/card";
import { Deal } from "@/types";
import { Clock, DollarSign, TrendingUp } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface DealCardContentProps {
  deal: Deal;
}

export const DealCardContent = ({ deal }: DealCardContentProps) => {
  return (
    <CardContent className="flex-1 flex flex-col">
      {/* Description */}
      <p className="text-sm text-muted-foreground line-clamp-3 mb-auto">
        {deal.description || "No description available"}
      </p>
      
      {/* Key details with icons */}
      <div className="mt-4 space-y-2 pt-2 border-t border-border">
        {deal.checkSizeRequired && (
          <div className="flex items-center text-sm">
            <DollarSign className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
            <span className="text-muted-foreground mr-2">Investment Ask:</span>
            <span className="font-medium ml-auto">${formatCurrency(deal.checkSizeRequired)}</span>
          </div>
        )}
        
        {deal.IRR !== undefined && deal.IRR !== null && (
          <div className="flex items-center text-sm">
            <TrendingUp className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
            <span className="text-muted-foreground mr-2">Estimated IRR:</span>
            <span className="font-medium ml-auto">{deal.IRR}%</span>
          </div>
        )}
        
        {deal.timeHorizon && (
          <div className="flex items-center text-sm">
            <Clock className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
            <span className="text-muted-foreground mr-2">Estimated Time for Returns:</span>
            <span className="font-medium ml-auto">{deal.timeHorizon}</span>
          </div>
        )}
      </div>
    </CardContent>
  );
};
