import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { AnalysisProgress } from "./deck-viewer/AnalysisProgress";
import { DetailedSummary } from "./deck-viewer/DetailedSummary";
import { AnonymousSummary } from "./deck-viewer/AnonymousSummary";
import { AIReview } from "./deck-viewer/AIReview";
import { FileText, FileSearch, X } from "lucide-react";

interface DeckViewerProps {
  originalDeckUrl: string | null;
  isAnalyzing: boolean;
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
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="original" className="flex items-center gap-2">
          <FileText className="h-4 w-4" />
          Original Deck
        </TabsTrigger>
        <TabsTrigger value="review" className="flex items-center gap-2">
          <FileSearch className="h-4 w-4" />
          AI Review
        </TabsTrigger>
        <TabsTrigger value="detailed">AI Summary</TabsTrigger>
        <TabsTrigger value="anonymous">Anonymous AI Summary</TabsTrigger>
      </TabsList>

      <TabsContent value="original">
        <h3 className="text-lg font-medium mb-4">Original Document</h3>
        <div className="bg-card rounded-lg border shadow-sm">
          <div className="p-6">
            {originalDeckUrl && (
              <iframe
                src={originalDeckUrl}
                className="w-full h-[600px] border rounded"
                title="Original Document"
              />
            )}
          </div>
          
          <hr className="border-border" />
          
          <div className="p-6 flex justify-end gap-2">
            <Button variant="outline" onClick={onCancel}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button onClick={() => setActiveTab("review")}>
              <FileSearch className="h-4 w-4 mr-2" />
              Analyse with AI
            </Button>
          </div>
        </div>
      </TabsContent>

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
