
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { AnalysisProgress } from "./deck-viewer/AnalysisProgress";
import { DetailedSummary } from "./deck-viewer/DetailedSummary";
import { AnonymousSummary } from "./deck-viewer/AnonymousSummary";
import { AIReview } from "./deck-viewer/AIReview";
import { FileText, FileSearch, X, BookmarkPlus, ArrowLeft, ArrowRight } from "lucide-react";
import { toast } from "sonner";

interface DeckViewerProps {
  originalDeckUrl: string | null;
  isUploading: boolean;
  isAnalyzing: boolean;
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
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Original Document</h3>
          <div className="bg-card rounded-lg border shadow-sm">
            <div className="p-6">
              {originalDeckUrl ? (
                <iframe
                  src={originalDeckUrl}
                  className="w-full h-[600px] border rounded"
                  title="Original Document"
                />
              ) : (
                <div className="flex items-center justify-center h-[600px] text-muted-foreground">
                  No document available
                </div>
              )}
            </div>
          </div>
          
          <div className="flex justify-between pt-4 mt-4">
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={handleSaveForLater}
              disabled={savedForLater}
            >
              <BookmarkPlus className="h-4 w-4" />
              {savedForLater ? 'Saved' : 'Save for Later'}
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" onClick={onCancel}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button 
                onClick={() => {
                  setActiveTab("review");
                  toast.info("Starting AI analysis");
                }}
              >
                <FileSearch className="h-4 w-4 mr-2" />
                Analyse with AI
              </Button>
            </div>
          </div>
        </div>
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
          
          <div className="flex justify-between pt-4">
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={handleSaveForLater}
              disabled={savedForLater}
            >
              <BookmarkPlus className="h-4 w-4" />
              {savedForLater ? 'Saved' : 'Save for Later'}
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setActiveTab("original")}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <Button 
                onClick={() => setActiveTab("detailed")}
                disabled={!reviewCompleted}
              >
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="detailed">
        <div className="space-y-4">
          <div className="bg-card rounded-lg border shadow-sm p-6">
            <DetailedSummary 
              onBack={() => setActiveTab("review")}
              onNext={() => {
                setActiveTab("anonymous");
                toast.info("Viewing Anonymous Summary");
              }}
              clarificationResponses={clarificationResponses}
            />
          </div>
          
          <div className="flex justify-between pt-4">
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={handleSaveForLater}
              disabled={savedForLater}
            >
              <BookmarkPlus className="h-4 w-4" />
              {savedForLater ? 'Saved' : 'Save for Later'}
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setActiveTab("review")}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <Button onClick={() => setActiveTab("anonymous")}>
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="anonymous">
        <div className="space-y-4">
          <div className="bg-card rounded-lg border shadow-sm p-6">
            <AnonymousSummary 
              onBack={() => setActiveTab("detailed")}
              clarificationResponses={clarificationResponses}
            />
          </div>
          
          <div className="flex justify-between pt-4">
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={handleSaveForLater}
              disabled={savedForLater}
            >
              <BookmarkPlus className="h-4 w-4" />
              {savedForLater ? 'Saved' : 'Save for Later'}
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setActiveTab("detailed")}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <Button 
                onClick={() => {
                  onCancel();
                  toast.success("Process completed!");
                }}
              >
                Done
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
};
