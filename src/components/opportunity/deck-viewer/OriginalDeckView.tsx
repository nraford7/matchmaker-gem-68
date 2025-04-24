
import React from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { FileText, Download } from "lucide-react";

interface OriginalDeckViewProps {
  originalDeckUrl: string | null;
  onDownload: () => void;
}

export const OriginalDeckView: React.FC<OriginalDeckViewProps> = ({
  originalDeckUrl,
  onDownload,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h4 className="text-lg font-medium">Original Pitch Deck</h4>
        <Button 
          size="sm" 
          variant="outline" 
          className="flex items-center gap-1"
          onClick={onDownload}
          disabled={!originalDeckUrl}
        >
          <Download className="h-4 w-4" />
          Download
        </Button>
      </div>
      
      {originalDeckUrl ? (
        <div className="border rounded-md h-[500px] overflow-hidden">
          <iframe
            src={originalDeckUrl}
            className="w-full h-full"
            title="Original Pitch Deck"
          />
        </div>
      ) : (
        <Alert>
          <AlertDescription>
            The original deck is not available for preview. Please upload a deck first.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};
