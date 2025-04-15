
import { MapPin, DollarSign, TrendingUp } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface MatchMetricsProps {
  location?: string;
  checkSizeRequired?: number;
  fundingAmount?: number;
  IRR?: number;
}

export const MatchMetrics = ({ 
  location, 
  checkSizeRequired, 
  fundingAmount, 
  IRR 
}: MatchMetricsProps) => {
  return (
    <div className="grid grid-cols-2 gap-1 text-xs mt-auto">
      {location && (
        <div className="flex items-center text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
          <span className="truncate">{location}</span>
        </div>
      )}
      
      {(checkSizeRequired || fundingAmount) && (
        <div className="flex items-center text-muted-foreground">
          <DollarSign className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
          <span>${formatCurrency(checkSizeRequired || fundingAmount || 0)}</span>
        </div>
      )}
      
      {IRR !== undefined && (
        <div className="flex items-center text-muted-foreground">
          <TrendingUp className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
          <span>{IRR}% IRR</span>
        </div>
      )}
    </div>
  );
};
