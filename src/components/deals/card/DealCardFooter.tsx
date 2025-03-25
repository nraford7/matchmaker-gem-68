
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { Bookmark, CheckCircle } from "lucide-react";

interface DealCardFooterProps {
  showActions: boolean;
  onSave?: (e: React.MouseEvent) => void;
  onActivate?: (e: React.MouseEvent) => void;
}

export const DealCardFooter = ({ 
  showActions, 
  onSave, 
  onActivate 
}: DealCardFooterProps) => {
  if (!showActions || (!onSave && !onActivate)) {
    return null;
  }

  return (
    <CardFooter className="pt-0">
      <div className="w-full flex items-center justify-end gap-2">
        {onSave && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onSave}
            className="gap-1 hover:shadow-sm hover:border-primary/20"
          >
            <Bookmark className="h-4 w-4" />
            <span className="sr-only md:not-sr-only md:inline">Save</span>
          </Button>
        )}
        
        {onActivate && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onActivate}
            className="gap-1 hover:shadow-sm hover:border-primary/20"
          >
            <CheckCircle className="h-4 w-4" />
            <span className="sr-only md:not-sr-only md:inline">Activate</span>
          </Button>
        )}
      </div>
    </CardFooter>
  );
};
