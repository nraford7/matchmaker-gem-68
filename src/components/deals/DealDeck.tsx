
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EnhancedDeal } from "@/types/deal";
import { FileText, FileSearch } from "lucide-react";

interface DealDeckProps {
  deal: EnhancedDeal;
}

const DealDeck = ({ deal }: DealDeckProps) => {
  // Sample investment summary points - in a real app, these would come from the deal data
  const investmentSummary = [
    "Revolutionary AI-powered platform targeting the fintech sector with significant growth potential.",
    "Experienced founding team with previous successful exits and deep industry expertise.",
    "Demonstrated product-market fit with 30% month-over-month growth in the past quarter.",
    "Seeking $5M in Series A funding to scale operations and expand market reach.",
    "Projected 3x return on investment within 5 years based on conservative growth estimates."
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Investment Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <ul className="space-y-2 list-disc pl-6">
            {investmentSummary.map((point, index) => (
              <li key={index} className="text-sm font-bold">
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8">
          <Tabs defaultValue="ai-summary" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="ai-summary" className="flex items-center gap-1">
                <FileSearch className="h-4 w-4" />
                AI Summary
              </TabsTrigger>
              <TabsTrigger value="original-deck" className="flex items-center gap-1">
                <FileText className="h-4 w-4" />
                Original Deck
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="ai-summary">
              <div className="border rounded-md p-4 h-[600px] flex flex-col items-center justify-center bg-muted/20">
                <div className="text-center space-y-4">
                  <FileSearch className="h-16 w-16 mx-auto text-muted-foreground" />
                  <h3 className="text-lg font-medium">AI Generated Summary</h3>
                  <p className="text-sm text-muted-foreground max-w-md">
                    An AI-generated summary of the investment deck would be displayed here, 
                    highlighting key metrics, market analysis, and growth projections.
                  </p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="original-deck">
              <div className="border rounded-md p-4 h-[600px] flex flex-col items-center justify-center bg-muted/20">
                <div className="text-center space-y-4">
                  <FileText className="h-16 w-16 mx-auto text-muted-foreground" />
                  <h3 className="text-lg font-medium">Original Investment Deck</h3>
                  <p className="text-sm text-muted-foreground max-w-md">
                    The original investment deck PDF would be embedded here, 
                    allowing investors to review the complete presentation materials.
                  </p>
                  {deal.pitchDeckUrl && (
                    <a 
                      href={deal.pitchDeckUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-primary hover:underline"
                    >
                      View Pitch Deck
                    </a>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  );
};

export default DealDeck;
