
import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { FileText, FileSearch, Shield } from "lucide-react";
import { OriginalDeckView } from "./deck-viewer/OriginalDeckView";
import { DetailedSummary } from "./deck-viewer/DetailedSummary";
import { AnonymousSummary } from "./deck-viewer/AnonymousSummary";
import { AnalysisProgress } from "./deck-viewer/AnalysisProgress";

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
    return <AnalysisProgress progress={analysisProgress} />;
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
        
        <TabsContent value="original">
          <OriginalDeckView 
            originalDeckUrl={originalDeckUrl} 
            onDownload={() => handleDownload("original")} 
          />
        </TabsContent>
        
        <TabsContent value="detailed">
          <DetailedSummary onDownload={() => handleDownload("detailed")} />
        </TabsContent>
        
        <TabsContent value="anonymous">
          <AnonymousSummary onDownload={() => handleDownload("anonymous")} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
