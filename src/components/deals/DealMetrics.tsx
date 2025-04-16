
import { TrendingUp } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface DealMetricsProps {
  checkSizeRequired?: number;
  IRR?: number;
  matchScore?: number;
}

export const DealMetrics = ({ checkSizeRequired, IRR, matchScore }: DealMetricsProps) => {
  return (
    <div className="flex flex-col space-y-2">
      {checkSizeRequired && (
        <div className="mb-2">
          <p className="text-sm text-muted-foreground">Investment Ask</p>
          <p className="font-medium text-foreground">${formatCurrency(checkSizeRequired)}</p>
        </div>
      )}
      
      {typeof IRR !== 'undefined' && IRR !== null && (
        <div className="mb-2">
          <p className="text-sm text-muted-foreground flex items-center">
            <TrendingUp className="h-3 w-3 mr-1" />
            Estimated IRR
          </p>
          <p className="font-medium text-foreground">{IRR}%</p>
        </div>
      )}
      
      {matchScore && (
        <div>
          <p className="text-sm text-muted-foreground">Match Score</p>
          <div className="w-full bg-muted rounded-full h-2.5 mt-1">
            <div 
              className="bg-primary h-2.5 rounded-full" 
              style={{ width: `${Math.round(matchScore * 100)}%` }}
            ></div>
          </div>
          <p className="text-xs text-right mt-1 text-foreground">{Math.round(matchScore * 100)}%</p>
        </div>
      )}
    </div>
  );
};
