
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnalysisProgress } from "./deck-viewer/AnalysisProgress";
import { OriginalDeckView } from "./deck-viewer/OriginalDeckView";
import { DetailedSummary } from "./deck-viewer/DetailedSummary";
import { AnonymousSummary } from "./deck-viewer/AnonymousSummary";

interface DeckViewerProps {
  originalDeckUrl: string | null;
  isAnalyzing: boolean;
  isUploading: boolean;
  uploadProgress: number;
  analysisProgress: number;
}

export const DeckViewer: React.FC<DeckViewerProps> = ({
  originalDeckUrl,
  isAnalyzing,
  isUploading,
  uploadProgress,
  analysisProgress,
}) => {
  const [activeTab, setActiveTab] = useState("original");

  if (isUploading || isAnalyzing) {
    return (
      <AnalysisProgress 
        isUploading={isUploading}
        uploadProgress={uploadProgress}
        isAnalyzing={isAnalyzing}
        analysisProgress={analysisProgress}
      />
    );
  }

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="original">Original Deck</TabsTrigger>
        <TabsTrigger value="detailed">AI Summary</TabsTrigger>
        <TabsTrigger value="anonymous">Anonymous AI Summary</TabsTrigger>
      </TabsList>

      <TabsContent value="original">
        <OriginalDeckView originalDeckUrl={originalDeckUrl} />
      </TabsContent>

      <TabsContent value="detailed">
        <DetailedSummary 
          onBack={() => setActiveTab("original")}
          onNext={() => setActiveTab("anonymous")}
        />
      </TabsContent>

      <TabsContent value="anonymous">
        <AnonymousSummary 
          onBack={() => setActiveTab("detailed")}
        />
      </TabsContent>
    </Tabs>
  );
};
