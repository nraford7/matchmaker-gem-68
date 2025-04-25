
import { Button } from "@/components/ui/button";
import { BookmarkPlus, X } from "lucide-react";

interface OriginalDocumentViewProps {
  documentUrl: string | null;
  onCancel: () => void;
  onAnalyze: () => void;
  savedForLater: boolean;
  onSaveForLater: () => void;
}

export const OriginalDocumentView = ({
  documentUrl,
  onCancel,
  onAnalyze,
  savedForLater,
  onSaveForLater,
}: OriginalDocumentViewProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Original Document</h3>
      <div className="bg-card rounded-lg border shadow-sm">
        <div className="p-6">
          {documentUrl ? (
            <iframe
              src={documentUrl}
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
          onClick={onSaveForLater}
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
          <Button onClick={onAnalyze}>
            <FileSearch className="h-4 w-4 mr-2" />
            Analyse with AI
          </Button>
        </div>
      </div>
    </div>
  );
};
