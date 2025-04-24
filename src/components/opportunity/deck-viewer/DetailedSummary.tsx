
import React from "react";
import { Button } from "@/components/ui/button";
import { Download, FileSearch } from "lucide-react";

interface DetailedSummaryProps {
  onDownload: () => void;
}

export const DetailedSummary: React.FC<DetailedSummaryProps> = ({ onDownload }) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h4 className="text-lg font-medium">AI Summary</h4>
        <Button 
          size="sm" 
          variant="outline" 
          className="flex items-center gap-1"
          onClick={onDownload}
        >
          <Download className="h-4 w-4" />
          Download
        </Button>
      </div>
      
      <div className="border rounded-md p-6 bg-muted/20 h-[500px] overflow-auto">
        <div className="space-y-6">
          <div>
            <h5 className="text-lg font-semibold mb-2">Executive Summary</h5>
            <p className="text-sm text-muted-foreground">
              AI-generated detailed summary of the pitch deck, highlighting key business metrics,
              market analysis, team composition, and financial projections.
            </p>
          </div>
          
          <div className="space-y-2">
            <h5 className="text-md font-semibold">Key Metrics</h5>
            <ul className="list-disc pl-5 text-sm space-y-1">
              <li>Current valuation: $12M</li>
              <li>Monthly recurring revenue: $85K</li>
              <li>Growth rate: 22% month-over-month</li>
              <li>Customer acquisition cost: $450</li>
              <li>Lifetime value: $5,200</li>
            </ul>
          </div>
          
          <div className="space-y-2">
            <h5 className="text-md font-semibold">Market Analysis</h5>
            <p className="text-sm text-muted-foreground">
              The target market is valued at $4.5B with an annual growth rate of 15%.
              Main competitors include established players with 60% market share collectively,
              leaving significant opportunity for disruption through superior technology.
            </p>
          </div>
          
          <div className="space-y-2">
            <h5 className="text-md font-semibold">Team</h5>
            <p className="text-sm text-muted-foreground">
              Founded by serial entrepreneurs with 2 previous successful exits.
              15-person team with expertise spanning AI, product development, and enterprise sales.
            </p>
          </div>
          
          <div className="space-y-2">
            <h5 className="text-md font-semibold">Financials</h5>
            <p className="text-sm text-muted-foreground">
              Projecting $1.2M ARR by end of year, with profitability expected in 18 months.
              Current runway is 14 months at current burn rate of $180K/month.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
