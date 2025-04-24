
import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { FileText, Download, FileSearch, Shield } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface DeckViewerProps {
  originalDeckUrl: string | null;
  isAnalyzing: boolean;
  analysisProgress: number;
}

export const DeckViewer: React.FC<DeckViewerProps> = ({
  originalDeckUrl,
  isAnalyzing,
  analysisProgress,
}) => {
  const [selectedTab, setSelectedTab] = useState("original");
  
  // Handle download for each version
  const handleDownload = (version: string) => {
    let fileUrl = "";
    let fileName = "";
    
    switch (version) {
      case "original":
        fileUrl = originalDeckUrl || "";
        fileName = "original-pitch-deck.pdf";
        break;
      case "detailed":
        fileUrl = originalDeckUrl || ""; // In a real app, this would be the detailed summary URL
        fileName = "detailed-summary-deck.pdf";
        break;
      case "anonymous":
        fileUrl = originalDeckUrl || ""; // In a real app, this would be the anonymous summary URL
        fileName = "anonymous-summary-deck.pdf";
        break;
      default:
        return;
    }
    
    if (fileUrl) {
      const a = document.createElement("a");
      a.href = fileUrl;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  if (isAnalyzing) {
    return (
      <div className="space-y-4 mt-6 border rounded-lg p-6">
        <div className="flex items-center gap-2">
          <FileSearch className="h-5 w-5 animate-pulse text-primary" />
          <h3 className="text-lg font-medium">Analysing and Creating Summary Deck with AI</h3>
        </div>
        <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-300" 
            style={{ width: `${analysisProgress}%` }}
          ></div>
        </div>
        <p className="text-sm text-muted-foreground">
          Our AI is analyzing your pitch deck and creating detailed and anonymous summaries.
          This may take a few minutes.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 mt-6 border rounded-lg p-6">
      <h3 className="text-xl font-medium mb-4">Pitch Deck Versions</h3>
      
      <Tabs defaultValue="original" className="w-full" value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="mb-4 w-full justify-start">
          <TabsTrigger value="original" className="flex items-center gap-1">
            <FileText className="h-4 w-4" />
            Original Deck
          </TabsTrigger>
          <TabsTrigger value="detailed" className="flex items-center gap-1">
            <FileSearch className="h-4 w-4" />
            Detailed Summary
          </TabsTrigger>
          <TabsTrigger value="anonymous" className="flex items-center gap-1">
            <Shield className="h-4 w-4" />
            Anonymous Summary
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="original" className="space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="text-lg font-medium">Original Pitch Deck</h4>
            <Button 
              size="sm" 
              variant="outline" 
              className="flex items-center gap-1"
              onClick={() => handleDownload("original")}
              disabled={!originalDeckUrl}
            >
              <Download className="h-4 w-4" />
              Download
            </Button>
          </div>
          
          {originalDeckUrl ? (
            <div className="border rounded-md h-[500px] overflow-hidden">
              <iframe
                src={originalDeckUrl}
                className="w-full h-full"
                title="Original Pitch Deck"
              />
            </div>
          ) : (
            <Alert>
              <AlertDescription>
                The original deck is not available for preview. Please upload a deck first.
              </AlertDescription>
            </Alert>
          )}
        </TabsContent>
        
        <TabsContent value="detailed" className="space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="text-lg font-medium">Detailed Summary</h4>
            <Button 
              size="sm" 
              variant="outline" 
              className="flex items-center gap-1"
              onClick={() => handleDownload("detailed")}
            >
              <Download className="h-4 w-4" />
              Download
            </Button>
          </div>
          
          {/* This would be replaced with the actual detailed summary in a real implementation */}
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
        </TabsContent>
        
        <TabsContent value="anonymous" className="space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="text-lg font-medium">Anonymous Summary</h4>
            <Button 
              size="sm" 
              variant="outline" 
              className="flex items-center gap-1"
              onClick={() => handleDownload("anonymous")}
            >
              <Download className="h-4 w-4" />
              Download
            </Button>
          </div>
          
          {/* This would be replaced with the actual anonymous summary in a real implementation */}
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
        </TabsContent>
      </Tabs>
    </div>
  );
};
