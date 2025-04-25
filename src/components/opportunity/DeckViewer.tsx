import React, { useState } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { TabNavigation } from "./deck-viewer/components/TabNavigation";
import { OriginalDocumentView } from "./deck-viewer/components/OriginalDocumentView";
import { AnalysisProgress } from "./deck-viewer/AnalysisProgress";
import { ReviewSection } from "./deck-viewer/components/ReviewSection";
import { SummarySection } from "./deck-viewer/components/SummarySection";

interface DeckViewerProps {
  originalDeckUrl: string | null;
  isUploading: boolean;
  uploadProgress: number;
  onCancel: () => void;
}

export const DeckViewer: React.FC<DeckViewerProps> = ({
  originalDeckUrl,
  isUploading,
  uploadProgress,
  onCancel,
}) => {
  const [activeTab, setActiveTab] = useState("original");
  const [reviewCompleted, setReviewCompleted] = useState(false);
  const [clarificationResponses, setClarificationResponses] = useState<Record<string, string>>({});
  const [savedForLater, setSavedForLater] = useState(false);

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

  const handleSaveForLater = () => {
    setSavedForLater(true);
  };

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
      <TabNavigation />

      <TabsContent value="original">
        <OriginalDocumentView 
          documentUrl={originalDeckUrl}
          onCancel={onCancel}
          onAnalyze={() => setActiveTab("review")}
          savedForLater={savedForLater}
          onSaveForLater={handleSaveForLater}
        />
      </TabsContent>

      <TabsContent value="review">
        <ReviewSection 
          onNext={() => setActiveTab("detailed")}
          onComplete={handleReviewComplete}
          isCompleted={reviewCompleted}
        />
      </TabsContent>

      <TabsContent value="detailed">
        <SummarySection 
          activeTab="detailed"
          clarificationResponses={clarificationResponses}
          onBack={() => setActiveTab("review")}
          onNext={() => setActiveTab("anonymous")}
        />
      </TabsContent>

      <TabsContent value="anonymous">
        <SummarySection 
          activeTab="anonymous"
          clarificationResponses={clarificationResponses}
          onBack={() => setActiveTab("detailed")}
          onNext={() => {}}
        />
      </TabsContent>
    </Tabs>
  );
};
