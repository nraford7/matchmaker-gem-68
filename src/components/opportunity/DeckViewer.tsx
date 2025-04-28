
import React, { useState } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { TabNavigation } from "./deck-viewer/components/TabNavigation";
import { AnalysisProgress } from "./deck-viewer/AnalysisProgress";
import { ReviewSection } from "./deck-viewer/components/ReviewSection";
import { SummarySection } from "./deck-viewer/components/SummarySection";
import { SharingSettings } from "./deck-viewer/components/SharingSettings";

interface DeckViewerProps {
  originalDeckUrl: string | null;
  isUploading: boolean;
  uploadProgress: number;
  onCancel: () => void;
  dealId?: string;
}

export const DeckViewer: React.FC<DeckViewerProps> = ({
  isUploading,
  uploadProgress,
  dealId,
}) => {
  const [activeTab, setActiveTab] = useState("review");
  const [reviewCompleted, setReviewCompleted] = useState(false);
  const [clarificationResponses, setClarificationResponses] = useState<Record<string, string>>({});
  const [recommendation, setRecommendation] = useState("");

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
      <TabNavigation activeTab={activeTab} onChange={setActiveTab} />

      <TabsContent value="review">
        <ReviewSection 
          onNext={() => setActiveTab("detailed")}
          onComplete={handleReviewComplete}
          isCompleted={reviewCompleted}
          recommendation={recommendation}
          onRecommendationChange={setRecommendation}
        />
      </TabsContent>

      <TabsContent value="detailed">
        <SummarySection 
          activeTab="detailed"
          clarificationResponses={clarificationResponses}
          onBack={() => setActiveTab("review")}
          onNext={() => setActiveTab("sharing")}
        />
      </TabsContent>

      <TabsContent value="sharing">
        <SharingSettings 
          onBack={() => setActiveTab("detailed")}
          dealId={dealId || "temp-deal-id"}
          recommendation={recommendation}
        />
      </TabsContent>
    </Tabs>
  );
};
