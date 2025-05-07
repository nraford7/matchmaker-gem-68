
import { Button } from "@/components/ui/button";
import { EnhancedDeal } from "@/types/deal";
import { ArrowLeft, MapPin, Calendar } from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { PrivacyBadge } from "./PrivacyBadge";

interface DealDetailsHeaderProps {
  deal: EnhancedDeal;
  onGoBack: () => void;
}

const DealDetailsHeader = ({ deal, onGoBack }: DealDetailsHeaderProps) => {
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM d, yyyy');
    } catch (e) {
      return 'Unknown date';
    }
  };

  return (
    <div className="mb-6 space-y-4">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          className="gap-1"
          onClick={onGoBack}
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      </div>
      
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">{deal.name}</h1>
          <div className="flex items-center flex-wrap gap-2 mt-2">
            <Badge variant="outline">{deal.stage || "Unknown Stage"}</Badge>
            
            {deal.location && (
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="h-3 w-3 mr-1" />
                <span>{deal.location}</span>
              </div>
            )}
            
            {deal.createdAt && (
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="h-3 w-3 mr-1" />
                <span>Added {formatDate(deal.createdAt)}</span>
              </div>
            )}
            
            {deal.privacyLevel && (
              <PrivacyBadge privacyLevel={deal.privacyLevel} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealDetailsHeader;
