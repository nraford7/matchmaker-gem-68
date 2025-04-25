import React from "react";
import { Button } from "@/components/ui/button";
import { Edit, Download, ArrowRight, Upload } from "lucide-react";
import { Input } from "@/components/ui/input";

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
  const handleReplacePPT = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log("Replacing PPT with:", file);
      // Handle file upload logic here
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h4 className="text-lg font-medium">AI Summary</h4>
        
        <div className="border rounded-md p-6 bg-muted/20">
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
            
            {clarificationResponses.q6 && <div className="space-y-2">
                <h5 className="text-md font-semibold">Use of Funds</h5>
                <p className="text-sm text-muted-foreground">
                  {clarificationResponses.q6}
                </p>
              </div>}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-lg font-medium">AI Generated Presentation</h4>
        <div className="border rounded-md p-6 bg-muted/20 h-[450px] flex flex-col items-center justify-center">
          <div className="text-center space-y-4">
            <div className="text-muted-foreground">
              AI-Generated presentation preview will be displayed here
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <div className="relative">
            <Input
              type="file"
              accept=".ppt,.pptx"
              onChange={handleReplacePPT}
              className="hidden"
              id="ppt-upload"
            />
            <Button 
              size="sm" 
              variant="outline" 
              className="flex items-center gap-1"
              onClick={() => document.getElementById('ppt-upload')?.click()}
            >
              <Upload className="h-4 w-4" />
              Replace PPT
            </Button>
          </div>
          <Button size="sm" variant="outline" className="flex items-center gap-1">
            <Download className="h-4 w-4" />
            Download PPT
          </Button>
        </div>
      </div>

      <div className="flex justify-between gap-2 pt-4 border-t">
        <Button variant="outline" onClick={onBack}>Back</Button>
        <Button onClick={onNext} className="flex items-center gap-1">
          Next
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
