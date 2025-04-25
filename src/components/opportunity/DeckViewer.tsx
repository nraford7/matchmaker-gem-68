import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnalysisProgress } from "./deck-viewer/AnalysisProgress";
import { DetailedSummary } from "./deck-viewer/DetailedSummary";
import { AnonymousSummary } from "./deck-viewer/AnonymousSummary";
import { AIReview } from "./deck-viewer/AIReview";

interface DeckViewerProps {
  originalDeckUrl: string | null;
  isAnalyzing: boolean;
  isUploading: boolean;
  uploadProgress: number;
  analysisProgress: number;
}

export const DeckViewer: React.FC<DeckViewerProps> = ({
  originalDeckUrl,
  isUploading,
  uploadProgress,
}) => {
  const [activeTab, setActiveTab] = useState("review");
  const [reviewCompleted, setReviewCompleted] = useState(false);
  const [clarificationResponses, setClarificationResponses] = useState<Record<string, string>>({});

  if (isUploading) {
    return (
      <AnalysisProgress 
        isUploading={true}
        uploadProgress={uploadProgress}
      />
    );
  }

  const handleReviewComplete = (responses: Record<string, string>) => {
    setClarificationResponses(responses);
    setReviewCompleted(true);
  };

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="review">AI Review</TabsTrigger>
        <TabsTrigger value="detailed">AI Summary</TabsTrigger>
        <TabsTrigger value="anonymous">Anonymous AI Summary</TabsTrigger>
      </TabsList>

      <TabsContent value="review">
        <AIReview
          onNext={() => setActiveTab("detailed")}
          onComplete={handleReviewComplete}
          isCompleted={reviewCompleted}
        />
      </TabsContent>

      <TabsContent value="detailed">
        <DetailedSummary 
          onBack={() => setActiveTab("review")}
          onNext={() => setActiveTab("anonymous")}
          clarificationResponses={clarificationResponses}
        />
      </TabsContent>

      <TabsContent value="anonymous">
        <AnonymousSummary 
          onBack={() => setActiveTab("detailed")}
          clarificationResponses={clarificationResponses}
        />
      </TabsContent>
    </Tabs>
  );
};
