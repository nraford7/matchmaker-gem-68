import React from "react";
import { Button } from "@/components/ui/button";
import { Edit, Download, ArrowLeft } from "lucide-react";

interface DetailedSummaryProps {
  onBack: () => void;
  onNext: () => void;
  clarificationResponses?: Record<string, string>;
}

export const DetailedSummary: React.FC<DetailedSummaryProps> = ({
  onBack,
  onNext,
  clarificationResponses = {}
}) => {
  console.log("Using clarification responses for summary:", clarificationResponses);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-medium">AI Summary</h4>
        <Button 
          size="sm" 
          variant="outline" 
          className="flex items-center gap-1"
        >
          <Download className="h-4 w-4" />
          Download PPT
        </Button>
      </div>
      
      <div className="border rounded-md p-6 bg-muted/20 h-[450px] overflow-auto">
        <div className="space-y-6">
          <div>
            <h5 className="text-lg font-semibold mb-2">Executive Summary</h5>
            <p className="text-sm text-muted-foreground">
              {Object.keys(clarificationResponses).length > 0 
                ? "Enhanced AI-generated summary incorporating your clarifications."
                : "AI-generated detailed summary of the pitch deck, highlighting key business metrics, market analysis, team composition, and financial projections."}
            </p>
          </div>
          
          <div className="space-y-2">
            <h5 className="text-md font-semibold">Key Metrics</h5>
            <ul className="list-disc pl-5 text-sm space-y-1">
              <li>Current valuation: $12M</li>
              <li>Monthly recurring revenue: {clarificationResponses.q4 || "$85K"}</li>
              <li>Growth rate: 22% month-over-month</li>
              <li>Customer acquisition cost: $450</li>
              <li>Lifetime value: $5,200</li>
            </ul>
          </div>
          
          <div className="space-y-2">
            <h5 className="text-md font-semibold">Market Analysis</h5>
            <p className="text-sm text-muted-foreground">
              The target market is valued at {clarificationResponses.q2 || "$4.5B with an annual growth rate of 15%"}.
              Main competitors include {clarificationResponses.q3 || "established players with 60% market share collectively"},
              leaving significant opportunity for disruption through superior technology.
            </p>
          </div>
          
          <div className="space-y-2">
            <h5 className="text-md font-semibold">Team</h5>
            <p className="text-sm text-muted-foreground">
              {clarificationResponses.q7 || "Founded by serial entrepreneurs with 2 previous successful exits. 15-person team with expertise spanning AI, product development, and enterprise sales."}
            </p>
          </div>
          
          <div className="space-y-2">
            <h5 className="text-md font-semibold">Financials</h5>
            <p className="text-sm text-muted-foreground">
              Projecting $1.2M ARR by end of year, with profitability expected in 18 months.
              Current runway is 14 months at current burn rate of $180K/month.
              {clarificationResponses.q5 && <span> {clarificationResponses.q5}</span>}
            </p>
          </div>
          
          {clarificationResponses.q6 && (
            <div className="space-y-2">
              <h5 className="text-md font-semibold">Use of Funds</h5>
              <p className="text-sm text-muted-foreground">
                {clarificationResponses.q6}
              </p>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex justify-between gap-2 pt-4 border-t">
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => {}}>
            <Edit className="h-4 w-4 mr-1" />
            Edit Summary
          </Button>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
          <Button onClick={onNext}>Next</Button>
        </div>
      </div>
    </div>
  );
};
