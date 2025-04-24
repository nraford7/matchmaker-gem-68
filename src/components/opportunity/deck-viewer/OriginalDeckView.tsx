import React from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";

interface OriginalDeckViewProps {
  originalDeckUrl: string | null;
  onNext: () => void;
}

export const OriginalDeckView: React.FC<OriginalDeckViewProps> = ({
  originalDeckUrl,
  onNext,
}) => {
  const handleReupload = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.pdf,.ppt,.pptx,.doc,.docx';
    fileInput.click();
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h4 className="text-lg font-medium">Original Pitch Deck</h4>
        <div className="flex gap-2">
          <Button 
            size="sm" 
            variant="outline" 
            className="flex items-center gap-1"
            onClick={handleReupload}
          >
            <Edit className="h-4 w-4" />
            Reupload File
          </Button>
        </div>
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

      <div className="flex justify-end">
        <Button onClick={onNext}>Next</Button>
      </div>
    </div>
  );
};
