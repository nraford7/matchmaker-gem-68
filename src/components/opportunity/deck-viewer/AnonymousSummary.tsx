import React from "react";
import { Button } from "@/components/ui/button";
import { Edit, Download, ArrowLeft } from "lucide-react";

interface AnonymousSummaryProps {
  onBack: () => void;
}

export const AnonymousSummary: React.FC<AnonymousSummaryProps> = ({
  onBack,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-medium">Anonymous AI Summary</h4>
        <div className="flex gap-2">
          <Button 
            size="sm" 
            variant="outline" 
            className="flex items-center gap-1"
          >
            <Edit className="h-4 w-4" />
            Edit
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            className="flex items-center gap-1"
          >
            <Download className="h-4 w-4" />
            Download PPT
          </Button>
        </div>
      </div>
      
      <div className="border rounded-md p-6 bg-muted/20 h-[500px] overflow-auto">
        <div className="space-y-6">
          <div>
            <h5 className="text-lg font-semibold mb-2">Confidential Investment Opportunity</h5>
            <p className="text-sm text-muted-foreground">
              AI-generated anonymous summary of the pitch deck, removing specific company and founder
              details while preserving key investment information.
            </p>
          </div>
          
          <div className="space-y-2">
            <h5 className="text-md font-semibold">Business Overview</h5>
            <p className="text-sm text-muted-foreground">
              Technology company operating in the B2B SaaS space, providing cloud-based 
              solutions for enterprise customers. The company has demonstrated product-market 
              fit with positive customer feedback and steady growth metrics.
            </p>
          </div>
          
          <div className="space-y-2">
            <h5 className="text-md font-semibold">Market Opportunity</h5>
            <p className="text-sm text-muted-foreground">
              Addressing a multi-billion dollar market with a differentiated technology 
              approach that solves critical pain points for enterprise customers.
              Current solutions in the market are outdated and inefficient.
            </p>
          </div>
          
          <div className="space-y-2">
            <h5 className="text-md font-semibold">Team Background</h5>
            <p className="text-sm text-muted-foreground">
              Founded by experienced entrepreneurs with relevant industry expertise.
              Technical team includes specialists in artificial intelligence and 
              enterprise software development.
            </p>
          </div>
          
          <div className="space-y-2">
            <h5 className="text-md font-semibold">Investment Highlights</h5>
            <ul className="list-disc pl-5 text-sm space-y-1">
              <li>Seeking Series A funding</li>
              <li>Strong unit economics with 80% gross margins</li>
              <li>Proven sales model with repeatable customer acquisition</li>
              <li>Proprietary technology with pending patents</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end gap-2 pt-4 border-t">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
      </div>
    </div>
  );
};
