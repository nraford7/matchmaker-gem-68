
import React, { useState } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";
import { TabNavigation } from "./deck-viewer/components/TabNavigation";
import { OriginalDocumentView } from "./deck-viewer/components/OriginalDocumentView";
import { AnalysisProgress } from "./deck-viewer/AnalysisProgress";
import { DetailedSummary } from "./deck-viewer/DetailedSummary";
import { AnonymousSummary } from "./deck-viewer/AnonymousSummary";
import { AIReview } from "./deck-viewer/AIReview";

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

  // Show upload progress while uploading
  if (isUploading) {
    return (
      <AnalysisProgress 
        isUploading={true}
        uploadProgress={uploadProgress}
      />
    );
  }

  // Handle review completion
  const handleReviewComplete = (responses: Record<string, string>) => {
    setClarificationResponses(responses);
    setReviewCompleted(true);
    toast.success("AI review completed successfully");
  };

  // Handle save for later
  const handleSaveForLater = () => {
    setSavedForLater(true);
    toast.success("Saved for later");
  };

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
      <TabNavigation />

      <TabsContent value="original">
        <OriginalDocumentView 
          documentUrl={originalDeckUrl}
          onCancel={onCancel}
          onAnalyze={() => {
            setActiveTab("review");
            toast.info("Starting AI analysis");
          }}
          savedForLater={savedForLater}
          onSaveForLater={handleSaveForLater}
        />
      </TabsContent>

      <TabsContent value="review">
        <div className="space-y-4">
          <div className="bg-card rounded-lg border shadow-sm p-6">
            <AIReview
              onNext={() => {
                setActiveTab("detailed");
                toast.info("Review complete. Viewing AI Summary.");
              }}
              onComplete={handleReviewComplete}
              isCompleted={reviewCompleted}
            />
          </div>
        </div>
      </TabsContent>

      <TabsContent value="detailed">
        <DetailedSummary 
          onBack={() => setActiveTab("review")}
          onNext={() => {
            setActiveTab("anonymous");
            toast.info("Viewing Anonymous Summary");
          }}
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
