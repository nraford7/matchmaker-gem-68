
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bookmark, Download, MapPin, Share } from "lucide-react";
import { EnhancedOpportunity } from "@/pages/DealDetails";

interface DealHeaderProps {
  deal: EnhancedOpportunity;
}

const DealHeader = ({ deal }: DealHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
      <div>
        <h1 className="text-3xl font-bold">{deal.name}</h1>
        <div className="flex items-center gap-2 mt-2 flex-wrap">
          <Badge variant="outline">{deal.stage}</Badge>
          <Badge variant="secondary">{deal.sector}</Badge>
          {deal.industry && deal.industry !== deal.sector && (
            <Badge variant="secondary">{deal.industry}</Badge>
          )}
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-3 w-3 mr-1" />
            <span>{deal.location}</span>
          </div>
        </div>
      </div>
      
      <div className="flex gap-2">
        <Button variant="outline" size="sm" className="gap-1">
          <Bookmark className="h-4 w-4" />
          Save
        </Button>
        <Button variant="outline" size="sm" className="gap-1">
          <Share className="h-4 w-4" />
          Share
        </Button>
        {deal.pitchDeckUrl && (
          <Button variant="outline" size="sm" className="gap-1">
            <Download className="h-4 w-4" />
            Download Pitch
          </Button>
        )}
      </div>
    </div>
  );
};

export default DealHeader;
